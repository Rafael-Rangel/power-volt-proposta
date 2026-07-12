#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(r"C:\Users\GC1\Downloads\Powe Proposta")


def summarize(path: Path) -> dict:
    d = json.load(path.open(encoding="utf-8"))
    audits = d["audits"]
    cats = {k: int(round(v["score"] * 100)) for k, v in d["categories"].items()}
    metrics = {}
    for key in [
        "first-contentful-paint",
        "largest-contentful-paint",
        "total-blocking-time",
        "cumulative-layout-shift",
        "speed-index",
        "interactive",
    ]:
        a = audits[key]
        metrics[key] = {
            "title": a.get("title"),
            "display": a.get("displayValue"),
            "score": a.get("score"),
        }
    opps = []
    for aid, a in audits.items():
        det = a.get("details") or {}
        if det.get("type") == "opportunity" and a.get("score") is not None and a["score"] < 1:
            opps.append(
                {
                    "id": aid,
                    "title": a.get("title"),
                    "display": a.get("displayValue"),
                    "score": a.get("score"),
                    "savingsMs": det.get("overallSavingsMs") or 0,
                }
            )
    opps.sort(key=lambda x: x["savingsMs"], reverse=True)
    weak = []
    for aid, a in audits.items():
        sc = a.get("score")
        if sc is None or sc >= 0.9:
            continue
        if a.get("scoreDisplayMode") not in ("numeric", "binary", "metricSavings"):
            continue
        weak.append(
            {
                "id": aid,
                "title": a.get("title"),
                "display": a.get("displayValue") or "",
                "score": sc,
            }
        )
    weak.sort(key=lambda x: x["score"])
    return {"scores": cats, "metrics": metrics, "opportunities": opps[:10], "weak": weak[:20]}


def main() -> None:
    mobile = summarize(ROOT / "lighthouse-mobile.json")
    out = {"mobile": mobile, "source": "Lighthouse local (equiv. PageSpeed Insights)", "url": "https://powervoltinstalacoes.com.br/"}
    desk = ROOT / "lighthouse-desktop.json"
    if desk.exists():
        out["desktop"] = summarize(desk)
    (ROOT / "pagespeed-summary.json").write_text(
        json.dumps(out, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    print("MOBILE SCORES", mobile["scores"])
    for k, v in mobile["metrics"].items():
        print(f"  {k}: {v['display']} (score {v['score']})")
    print("TOP OPPORTUNITIES")
    for o in mobile["opportunities"][:8]:
        print(f"  {o['savingsMs']:.0f}ms | {o['title']} | {o['display']}")
    print("WEAK")
    for w in mobile["weak"][:12]:
        print(f"  {w['score']:.2f} | {w['title']} | {w['display']}")


if __name__ == "__main__":
    main()
