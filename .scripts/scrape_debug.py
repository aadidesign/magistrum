"""Debug dump: print every aria-label and tab so we can pick stable selectors."""
import sys, io, time, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
from playwright.sync_api import sync_playwright

URL = "https://maps.app.goo.gl/8NWJN3H9nLRHzSbZ6"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_context(locale="en-AE", viewport={"width": 1400, "height": 900}).new_page()
    page.goto(URL, wait_until="domcontentloaded", timeout=45000)
    page.wait_for_timeout(5000)
    print("URL:", page.url[:140])
    print()

    # Dump all tabs (role="tab")
    print("=== TABS ===")
    tabs = page.locator('[role="tab"]').all()
    for t in tabs:
        try:
            label = t.get_attribute("aria-label") or t.inner_text(timeout=600)
            print(f"  TAB: {label[:120]}")
        except Exception:
            pass

    # Dump buttons containing review/hour/photo/about keywords
    print("\n=== KEY BUTTONS ===")
    for kw in ["review", "Reviews", "hour", "Hours", "Photo", "About", "Updates", "Overview", "Menu"]:
        btns = page.locator(f'button[aria-label*="{kw}"]').all()
        for b in btns[:5]:
            try:
                lbl = b.get_attribute("aria-label")
                print(f"  BTN[{kw}]: {lbl[:160]}")
            except Exception:
                pass

    # Look at the top of the panel for the rating row text
    print("\n=== RATING ROW CANDIDATES ===")
    for sel in ['div.F7nice', 'div[class*="F7nice"]', 'div.fontDisplayLarge', 'span[role="img"][aria-label*="star"]']:
        for el in page.locator(sel).all()[:3]:
            try:
                lbl = el.get_attribute("aria-label") or ""
                txt = el.inner_text(timeout=600) or ""
                print(f"  {sel}: aria='{lbl[:80]}' text='{txt[:80]}'")
            except Exception:
                pass

    # try clicking the Reviews tab via several strategies
    print("\n=== TRY CLICK REVIEWS ===")
    clicked = False
    for sel in ['button[aria-label^="Reviews for"]', 'button[role="tab"][aria-label*="Reviews"]',
                'button:has-text("Reviews")', '[role="tab"]:has-text("Reviews")']:
        try:
            el = page.locator(sel).first
            if el.is_visible(timeout=1500):
                print(f"  clicking: {sel}")
                el.click(timeout=2000)
                page.wait_for_timeout(2500)
                clicked = True
                break
        except Exception as e:
            print(f"  skip {sel}: {type(e).__name__}")
    print(f"  clicked: {clicked}")
    page.wait_for_timeout(2000)

    # how many review cards now
    cards = page.locator('div[data-review-id]').all()
    print(f"\n=== REVIEW CARDS visible: {len(cards)} ===")
    for c in cards[:3]:
        try:
            txt = c.inner_text(timeout=800)
            print("  ----")
            print("  " + txt[:400].replace("\n", " | "))
        except Exception:
            pass

    # scroll the reviews panel
    print("\n=== SCROLLING REVIEW PANEL ===")
    # find a scrollable container that holds review cards
    scroll_js = """() => {
      const all = document.querySelectorAll('div');
      for (const d of all) {
        if (d.querySelector('div[data-review-id]')) {
          let s = d;
          while (s && s !== document.body) {
            const cs = getComputedStyle(s);
            if (cs.overflowY === 'auto' || cs.overflowY === 'scroll') {
              return s.getAttribute('aria-label') || s.className || 'unlabeled';
            }
            s = s.parentElement;
          }
        }
      }
      return null;
    }"""
    container_label = page.evaluate(scroll_js)
    print(f"  container: {container_label}")

    for i in range(10):
        page.evaluate("""() => {
          const all = document.querySelectorAll('div');
          for (const d of all) {
            if (d.querySelector('div[data-review-id]')) {
              let s = d;
              while (s && s !== document.body) {
                const cs = getComputedStyle(s);
                if (cs.overflowY === 'auto' || cs.overflowY === 'scroll') {
                  s.scrollBy(0, 2000);
                  return;
                }
                s = s.parentElement;
              }
            }
          }
        }""")
        page.wait_for_timeout(1000)
    page.wait_for_timeout(1500)

    cards = page.locator('div[data-review-id]').all()
    print(f"\n=== REVIEW CARDS after scroll: {len(cards)} ===")
    sample = []
    for c in cards[:25]:
        try:
            sample.append(c.inner_text(timeout=800))
        except Exception:
            pass
    open("E:/Magistrum/.scrape-reviews-debug.txt", "w", encoding="utf-8").write("\n\n----CARD----\n\n".join(sample))
    print(f"  Saved {len(sample)} review card dumps to .scrape-reviews-debug.txt")

    # also dump the full main panel text
    full = page.locator('div[role="main"]').inner_text(timeout=3000)
    open("E:/Magistrum/.scrape-mainpanel.txt", "w", encoding="utf-8").write(full)
    print(f"\n  main panel saved ({len(full)} chars)")

    browser.close()
