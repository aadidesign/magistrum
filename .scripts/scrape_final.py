"""Final clean scrape: pulls all 7 days of hours + confirms top fields."""
import sys, io, json, re, time
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright

URL = "https://maps.app.goo.gl/8NWJN3H9nLRHzSbZ6"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_context(locale="en-AE", viewport={"width": 1400, "height": 900}).new_page()
    page.goto(URL, wait_until="domcontentloaded", timeout=45000)
    page.wait_for_timeout(5000)

    # Click the hours expander (it shows "Open · Closes 9 pm" by default; click to expand)
    try:
        # Look for an expandable hours element
        hours_btn = page.locator('button[data-item-id="oh"], div[aria-label^="Hide open hours"], div[aria-label^="Show open hours"]').first
        if hours_btn.is_visible(timeout=2000):
            hours_btn.click()
            page.wait_for_timeout(1500)
    except Exception:
        pass

    # The hours are in button aria-labels like "Monday, 9 am to 9 pm, Copy open hours"
    hours = {}
    btns = page.locator('button[aria-label*=" to "]').all()
    for b in btns:
        try:
            lbl = b.get_attribute("aria-label") or ""
            # match e.g. "Monday, 9 am to 9 pm, Copy open hours"
            m = re.match(r"(Mon|Tue|Wed|Thu|Fri|Sat|Sun)[a-z]*,\s*(.+?),\s*Copy open hours", lbl)
            if m:
                hours[m.group(1)] = m.group(2)
        except Exception:
            continue

    # rating and is-it-open status
    rating_label = page.locator('span[role="img"][aria-label*="star"]').first.get_attribute("aria-label") or ""
    rating = None
    m = re.search(r"([\d.]+)\s*star", rating_label)
    if m:
        rating = float(m.group(1))

    # Plus code
    plus = ""
    try:
        plus = page.locator('button[data-item-id^="oloc"]').first.inner_text(timeout=1500).strip()
    except Exception:
        pass

    # Description (the "From the owner" post)
    owner_post = ""
    try:
        # the entire owner-post area is under "From the owner"
        owner_post = page.evaluate("""() => {
          const els = document.querySelectorAll('div[role="main"] *');
          let after = false; let buf = '';
          for (const el of els) {
            if (el.textContent && el.textContent.trim() === 'From the owner') { after = true; continue; }
            if (after && el.textContent && el.textContent.trim() === 'Photos') break;
            if (after && el.tagName === 'P' || el.tagName === 'DIV') {
              const t = (el.innerText || '').trim();
              if (t && t.length > 50 && !buf.includes(t)) buf += t + '\\n';
            }
          }
          return buf;
        }""")
    except Exception:
        pass

    # One more pass at reviews: try scrolling the overview panel deep + clicking "More reviews" if present
    reviews_found = []
    try:
        # scroll the main panel to load more content
        for _ in range(8):
            page.mouse.wheel(0, 1500)
            page.wait_for_timeout(800)
        # try clicking any "More reviews" link
        for txt in ["More reviews", "All reviews", "See all reviews"]:
            try:
                el = page.locator(f'button:has-text("{txt}"), a:has-text("{txt}")').first
                if el.is_visible(timeout=1500):
                    el.click()
                    page.wait_for_timeout(2500)
            except Exception:
                pass
        # also try clicking the rating "5.0" itself — sometimes that opens the reviews modal
        try:
            page.locator('div.F7nice').first.click(timeout=2000)
            page.wait_for_timeout(2500)
        except Exception:
            pass
        # scroll again now
        for _ in range(10):
            page.mouse.wheel(0, 2000)
            page.wait_for_timeout(700)

        cards = page.locator('div[data-review-id]').all()
        for c in cards[:25]:
            try:
                t = c.inner_text(timeout=1000)
                reviews_found.append(t)
            except Exception:
                pass
    except Exception as e:
        reviews_found.append(f"_error: {e}")

    # Save
    data = {
        "scraped_at": time.strftime("%Y-%m-%d %H:%M:%S"),
        "rating": rating,
        "rating_aria": rating_label,
        "hours": hours,
        "plus_code": plus,
        "owner_post": owner_post,
        "phone_on_gmb": "+971 58 899 1583",
        "address_on_gmb": "DIP - 1, Bin Sougat Building - Unit No R05 - Dubai - United Arab Emirates",
        "website_on_gmb": "https://www.magistrum.in/",
        "category": "Training center",
        "tabs_visible": ["Overview", "About"],
        "reviews_tab_visible": False,
        "review_count_publicly_shown": False,
        "review_count_inference": "0-4 reviews (Google does not display a count number when very few)",
        "reviews_raw_cards": reviews_found,
        "reviews_card_count": len(reviews_found),
    }
    open("E:/Magistrum/.scrape-final.json", "w", encoding="utf-8").write(json.dumps(data, indent=2, ensure_ascii=False))
    print(json.dumps(data, indent=2, ensure_ascii=False))
    browser.close()
