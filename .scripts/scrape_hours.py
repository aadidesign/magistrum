"""Click the hours expander and read the full week."""
import sys, io, json, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright

URL = "https://maps.app.goo.gl/8NWJN3H9nLRHzSbZ6"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_context(locale="en-AE", viewport={"width": 1400, "height": 900}).new_page()
    page.goto(URL, wait_until="domcontentloaded", timeout=45000)
    page.wait_for_timeout(5000)

    # Aggressively try every selector that might expand hours
    tried = []
    for sel in [
        'div[aria-label^="Show open hours"]',
        'div[aria-label*="Hide open hours"]',
        'span:has-text("Open ·")',
        'div:has-text("Open · Closes")',
        '[role="button"][aria-label*="hours"]',
        'button:has-text("Open")',
    ]:
        try:
            el = page.locator(sel).first
            if el.count() and el.is_visible(timeout=1200):
                el.click(timeout=2000)
                tried.append(f"clicked: {sel}")
                page.wait_for_timeout(1800)
                break
            else:
                tried.append(f"not-visible: {sel}")
        except Exception as e:
            tried.append(f"err {sel}: {type(e).__name__}")
    print("Tried:", tried)

    # After expansion, search for all weekday buttons
    hours = {}
    btns = page.locator('button[aria-label*="Copy open hours"]').all()
    print(f"hour buttons after click: {len(btns)}")
    for b in btns:
        try:
            lbl = b.get_attribute("aria-label") or ""
            m = re.match(r"(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),\s*(.+?),\s*Copy open hours", lbl)
            if m:
                hours[m.group(1)] = m.group(2)
        except Exception:
            continue

    # Fallback: search all aria-labels matching day patterns
    if len(hours) < 3:
        all_btns = page.locator('button').all()
        for b in all_btns:
            try:
                lbl = b.get_attribute("aria-label") or ""
                m = re.match(r"(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),\s*(.+?)(?:,|$)", lbl)
                if m and m.group(2).strip():
                    hours.setdefault(m.group(1), m.group(2).strip())
            except Exception:
                continue

    # Fallback: dump main panel after click, look for day-time lines
    if len(hours) < 3:
        txt = page.locator('div[role="main"]').inner_text(timeout=3000)
        for line in txt.split("\n"):
            m = re.match(r"(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s*[:\-]?\s*(.+)$", line.strip())
            if m:
                hours.setdefault(m.group(1), m.group(2).strip())
        open("E:/Magistrum/.scrape-mainpanel-2.txt", "w", encoding="utf-8").write(txt)

    print("hours:", hours)
    open("E:/Magistrum/.scrape-hours.json", "w", encoding="utf-8").write(json.dumps(hours, indent=2))
    browser.close()
