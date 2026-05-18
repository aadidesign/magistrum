"""GMB scraper for Magistrum Corpserve Solutions LLC.
Headless Chromium via Playwright. Extracts what Google renders client-side that
WebFetch can't see (rating, review_count, hours, full address, reviews, photos).
"""
import json, re, sys, time, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")
from pathlib import Path
from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout

GMB_URL = "https://maps.app.goo.gl/8NWJN3H9nLRHzSbZ6"
OUT_RAW = Path("E:/Magistrum/.scrape-raw.json")
OUT_DATA = Path("E:/Magistrum/.gmb-data.json")


def safe(fn, default=None):
    try:
        return fn()
    except Exception as e:
        return default


def text_or_none(loc):
    try:
        return loc.first.inner_text(timeout=2000).strip()
    except Exception:
        return None


def attr_or_none(loc, attr):
    try:
        return loc.first.get_attribute(attr, timeout=2000)
    except Exception:
        return None


def scrape():
    out = {"_scraped_at": time.strftime("%Y-%m-%d %H:%M:%S"), "_source_url": GMB_URL}
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(
            locale="en-AE",
            viewport={"width": 1400, "height": 900},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        )
        page = ctx.new_page()
        print(f"[1/6] Loading {GMB_URL}", flush=True)
        page.goto(GMB_URL, wait_until="domcontentloaded", timeout=45000)
        page.wait_for_timeout(4000)
        out["final_url"] = page.url
        print(f"      Resolved → {page.url[:100]}", flush=True)

        # consent / cookie banners
        for sel in ['button:has-text("Accept all")', 'button:has-text("Accept")', 'button[aria-label*="Accept"]']:
            try:
                if page.locator(sel).first.is_visible(timeout=1500):
                    page.locator(sel).first.click()
                    page.wait_for_timeout(1500)
                    break
            except Exception:
                pass

        # wait for the business panel to render
        try:
            page.wait_for_selector('h1', timeout=15000)
        except PWTimeout:
            pass
        page.wait_for_timeout(2500)

        print("[2/6] Extracting core fields", flush=True)
        out["name"] = text_or_none(page.locator('h1'))

        # rating + review count — Google uses span role="img" aria-label="X.X stars"
        out["rating"] = None
        out["review_count"] = None
        rating_el = page.locator('div[role="img"][aria-label*="stars"], span[role="img"][aria-label*="stars"]').first
        rating_label = attr_or_none(rating_el, "aria-label")
        if rating_label:
            m = re.search(r"([\d.]+)\s*stars?", rating_label)
            if m:
                out["rating"] = float(m.group(1))
        # review count is usually next to the rating, e.g. "(12)"
        rc = text_or_none(page.locator('button[aria-label*="reviews"], button[aria-label*="review"]'))
        if rc:
            m = re.search(r"([\d,]+)", rc)
            if m:
                out["review_count"] = int(m.group(1).replace(",", ""))
        if out["review_count"] is None:
            # fallback: look at the aria-label of the reviews button
            rb = attr_or_none(page.locator('button[aria-label*="review"]').first, "aria-label")
            if rb:
                m = re.search(r"([\d,]+)\s*review", rb)
                if m:
                    out["review_count"] = int(m.group(1).replace(",", ""))

        # category — small text near the top
        cat = text_or_none(page.locator('button[jsaction*="category"]'))
        out["category"] = cat

        # address, phone, website, plus_code from data-item-id buttons
        out["address"] = text_or_none(page.locator('button[data-item-id="address"]'))
        out["phone"] = text_or_none(page.locator('button[data-item-id^="phone"]'))
        out["website"] = attr_or_none(page.locator('a[data-item-id="authority"]'), "href")
        out["plus_code"] = text_or_none(page.locator('button[data-item-id^="oloc"]'))

        # hours — click the hours expander if present, then read the table
        out["hours"] = None
        try:
            hours_btn = page.locator('div[aria-label*="hours"], button[aria-label*="hours"], button[data-item-id="oh"]').first
            if hours_btn.is_visible(timeout=2000):
                hours_btn.click()
                page.wait_for_timeout(1500)
                rows = page.locator('table tbody tr').all()
                hours = {}
                for r in rows[:8]:
                    try:
                        day = r.locator('td').nth(0).inner_text(timeout=1000).strip()
                        val = r.locator('td').nth(1).inner_text(timeout=1000).strip()
                        if day:
                            hours[day] = val
                    except Exception:
                        continue
                if hours:
                    out["hours"] = hours
        except Exception:
            pass

        # description
        out["description"] = text_or_none(page.locator('div[aria-label*="About"]'))

        print("[3/6] Extracting services / service-areas if visible", flush=True)
        # services tab — sometimes a tab labeled "Services"
        out["services"] = []
        try:
            svc_tab = page.locator('button[aria-label*="Services"], button:has-text("Services")').first
            if svc_tab.is_visible(timeout=2000):
                svc_tab.click()
                page.wait_for_timeout(2500)
                items = page.locator('div[role="list"] [role="listitem"]').all_inner_texts()
                out["services"] = [s.strip() for s in items if s and len(s.strip()) > 1][:30]
        except Exception:
            pass

        print("[4/6] Extracting photos", flush=True)
        out["photo_urls"] = []
        try:
            imgs = page.locator('img[src*="googleusercontent"]').all()
            seen = set()
            for img in imgs[:30]:
                src = img.get_attribute("src")
                if src and src not in seen:
                    seen.add(src)
                    out["photo_urls"].append(src)
        except Exception:
            pass

        print("[5/6] Opening reviews panel and scrolling", flush=True)
        out["reviews"] = []
        try:
            # click the "Reviews" tab
            for sel in ['button[aria-label*="Reviews for"]', 'button:has-text("Reviews")', 'button[aria-label^="Reviews"]']:
                try:
                    rb = page.locator(sel).first
                    if rb.is_visible(timeout=2000):
                        rb.click()
                        page.wait_for_timeout(2500)
                        break
                except Exception:
                    continue

            # find scrollable reviews container and scroll it
            scroller = page.locator('div[aria-label*="reviews"], div[aria-label^="Reviews"]').filter(has=page.locator('div[data-review-id]')).first
            for _ in range(8):
                try:
                    if scroller.is_visible(timeout=1000):
                        scroller.evaluate('el => el.scrollBy(0, 2000)')
                except Exception:
                    page.mouse.wheel(0, 2000)
                page.wait_for_timeout(1200)

            # expand "More" buttons inside reviews
            for btn in page.locator('button:has-text("More")').all()[:30]:
                try:
                    btn.click(timeout=800)
                except Exception:
                    pass
            page.wait_for_timeout(800)

            cards = page.locator('div[data-review-id]').all()
            for c in cards[:25]:
                try:
                    name = safe(lambda: c.locator('div.d4r55, div[class*="d4r55"]').first.inner_text(timeout=800))
                    if not name:
                        name = safe(lambda: c.locator('button[aria-label]').first.get_attribute("aria-label"))
                    date = safe(lambda: c.locator('span.rsqaWe, span[class*="rsqaWe"]').first.inner_text(timeout=800))
                    stars_label = safe(lambda: c.locator('span[role="img"]').first.get_attribute("aria-label"))
                    body = safe(lambda: c.locator('span.wiI7pd, span[class*="wiI7pd"]').first.inner_text(timeout=800))
                    if not (name or body):
                        # try a broader text dump
                        body = c.inner_text(timeout=800)[:1000]
                    out["reviews"].append({
                        "reviewer_first_name": (name or "").split()[0] if name else None,
                        "reviewer_full": name,
                        "date": date,
                        "stars_label": stars_label,
                        "text": body,
                    })
                except Exception as e:
                    out["reviews"].append({"_parse_error": str(e)})
        except Exception as e:
            out["_reviews_error"] = str(e)

        print(f"[6/6] Done. Reviews captured: {len(out['reviews'])}", flush=True)
        # full-page snapshot of left panel for forensic verification
        out["panel_text"] = safe(lambda: page.locator('div[role="main"]').first.inner_text(timeout=2000))[:5000]
        browser.close()
    return out


if __name__ == "__main__":
    data = scrape()
    OUT_RAW.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\nWrote {OUT_RAW}")
    print(f"  name:         {data.get('name')}")
    print(f"  rating:       {data.get('rating')}")
    print(f"  review_count: {data.get('review_count')}")
    print(f"  category:     {data.get('category')}")
    print(f"  address:      {data.get('address')}")
    print(f"  phone:        {data.get('phone')}")
    print(f"  website:      {data.get('website')}")
    print(f"  hours:        {data.get('hours')}")
    print(f"  reviews:      {len(data.get('reviews', []))}")
    print(f"  photos:       {len(data.get('photo_urls', []))}")
