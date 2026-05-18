"""Run evals.yaml against /chat. Outputs evals-report.md.
Usage: python -m chatbot.eval (run from /chatbot dir as: python eval.py)
Requires server running on http://localhost:8000.
"""
import _ssl_patch  # noqa: F401 — must be first
import yaml, json, httpx, sys
from pathlib import Path

CASES_PATH = Path(__file__).parent / "evals.yaml"
REPORT_PATH = Path(__file__).parent / "evals-report.md"
SERVER = "http://localhost:8000"


def score_case(case, answer: str) -> tuple[bool, list[str]]:
    issues = []
    must = case.get("must_contain", []) or []
    must_not = case.get("must_not_contain", []) or []
    text = answer.lower()
    for m in must:
        if m.lower() not in text:
            issues.append(f"missing required term: '{m}'")
    for m in must_not:
        if m.lower() in text:
            issues.append(f"contains forbidden term: '{m}'")
    if len(answer) > 700:
        issues.append(f"too long ({len(answer)} chars)")
    if len(answer) < 30:
        issues.append("too short to be useful")
    return (len(issues) == 0, issues)


def main():
    cases = yaml.safe_load(open(CASES_PATH, encoding="utf-8"))["cases"]
    results = []
    for i, c in enumerate(cases):
        sid = f"eval-{i}"
        try:
            with httpx.stream("POST", f"{SERVER}/chat", json={"session_id": sid, "message": c["question"]}, timeout=30.0) as r:
                answer = "".join(chunk for chunk in r.iter_text())
        except Exception as e:
            answer = ""
            results.append({"id": c["id"], "q": c["question"], "answer": f"[error: {e}]", "passed": False, "issues": [str(e)]})
            continue
        passed, issues = score_case(c, answer)
        results.append({"id": c["id"], "q": c["question"], "answer": answer, "passed": passed, "issues": issues})

    passed_count = sum(1 for r in results if r["passed"])
    lines = [f"# Chatbot eval report\n", f"**Passed: {passed_count}/{len(results)}**\n"]
    for r in results:
        lines.append(f"\n## Case {r['id']} — {'PASS' if r['passed'] else 'FAIL'}")
        lines.append(f"\n**Q:** {r['q']}")
        lines.append(f"\n**A:** {r['answer'][:600]}")
        if r["issues"]:
            lines.append(f"\n**Issues:**")
            for i in r["issues"]:
                lines.append(f"- {i}")
    REPORT_PATH.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {REPORT_PATH} — {passed_count}/{len(results)} passed")
    sys.exit(0 if passed_count >= 13 else 1)


if __name__ == "__main__":
    main()
