#!/usr/bin/env python3
"""Generate presentation backgrounds via Google AI Studio (Gemini image models)."""
from __future__ import annotations

import base64
import json
import os
import time
import urllib.error
import urllib.request

API_KEY = os.environ.get("GOOGLE_API_KEY", "").strip()
if not API_KEY:
    raise SystemExit(
        "Defina GOOGLE_API_KEY com sua chave do Google AI Studio "
        "(a cota de imagem precisa estar ativa / billing)."
    )
OUT_DIR = os.path.join(os.path.dirname(__file__), "bg")
MODELS = [
    "gemini-3.1-flash-image",
    "gemini-3.1-flash-lite-image",
    "gemini-2.5-flash-image",
    "gemini-3-pro-image-preview",
]

PROMPTS = [
    {
        "id": "bg-cover",
        "prompt": (
            "Ultra-wide cinematic presentation backdrop, deep pure black void, "
            "subtle crimson red and electric yellow energy ribbons flowing like liquid glass, "
            "soft volumetric fog, industrial elegance, abstract only, no text, no logos, no people, "
            "high resolution wallpaper atmosphere"
        ),
    },
    {
        "id": "bg-industrial",
        "prompt": (
            "Dark industrial atmosphere backdrop for slides, charcoal black, "
            "soft red neon edge glow and amber yellow highlights, brushed metal reflections, "
            "liquid glass morph blobs out of focus, cinematic bokeh, no text, no logos"
        ),
    },
    {
        "id": "bg-energy",
        "prompt": (
            "Abstract electric energy field on black background, thin lightning veins in red and yellow, "
            "soft glow, liquid glass refraction layers, premium dark UI wallpaper, no text, no icons"
        ),
    },
    {
        "id": "bg-glass",
        "prompt": (
            "Liquid glass morphism abstract background, translucent frosted panels floating in dark space, "
            "subtle red and gold light refraction, soft blur gradients, luxurious dark presentation backdrop, "
            "no text, no logos"
        ),
    },
    {
        "id": "bg-koru",
        "prompt": (
            "Dark premium SaaS presentation backdrop, deep navy-black, soft violet purple and cyan glows, "
            "liquid glass orbs and flowing light ribbons, abstract only, no text, no logos, cinematic"
        ),
    },
    {
        "id": "bg-mesh",
        "prompt": (
            "Soft gradient mesh wallpaper, black base with deep crimson to amber yellow color bleed, "
            "painterly blur, liquid glass sheen, elegant minimal atmosphere for business slides, no text"
        ),
    },
    {
        "id": "bg-funnel",
        "prompt": (
            "Abstract dark tunnel of light converging forward, red and yellow light streaks, "
            "depth of field, liquid glass reflections, cinematic presentation background, no text no logos"
        ),
    },
    {
        "id": "bg-close",
        "prompt": (
            "Triumphant dark closing slide atmosphere, black canvas with warm yellow and red soft flares, "
            "liquid glass highlight arcs, premium brand presentation wallpaper, no text, no logos"
        ),
    },
]


def call_model(model: str, prompt: str) -> bytes | None:
    url = (
        f"https://generativelanguage.googleapis.com/v1beta/models/"
        f"{model}:generateContent?key={API_KEY}"
    )
    body = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseModalities": ["TEXT", "IMAGE"]},
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=180) as resp:
        data = json.load(resp)
    parts = data["candidates"][0]["content"]["parts"]
    for part in parts:
        inline = part.get("inlineData") or part.get("inline_data")
        if inline and inline.get("data"):
            return base64.b64decode(inline["data"])
    return None


def generate_one(item: dict) -> str | None:
    os.makedirs(OUT_DIR, exist_ok=True)
    last_err = None
    for model in MODELS:
        try:
            print(f"  trying {model} for {item['id']}...")
            blob = call_model(model, item["prompt"])
            if not blob:
                print(f"  no image from {model}")
                continue
            path = os.path.join(OUT_DIR, f"{item['id']}.png")
            with open(path, "wb") as f:
                f.write(blob)
            print(f"  saved {path} ({len(blob)} bytes) via {model}")
            return path
        except urllib.error.HTTPError as e:
            raw = e.read().decode("utf-8", errors="replace")
            last_err = raw
            print(f"  FAIL {model}: HTTP {e.code}")
            if e.code == 429:
                # retry-after hint
                wait = 45
                if "retry in" in raw.lower():
                    try:
                        frag = raw.lower().split("retry in")[1].split("s")[0].strip()
                        wait = max(20, min(90, float(frag)))
                    except Exception:
                        pass
                print(f"  waiting {wait:.0f}s for quota...")
                time.sleep(wait)
            else:
                print(raw[:400])
                time.sleep(2)
        except Exception as e:
            last_err = str(e)
            print(f"  FAIL {model}: {e}")
            time.sleep(2)
    print(f"  FAILED {item['id']}: {str(last_err)[:300]}")
    return None


def main() -> None:
    print("Generating backgrounds ->", OUT_DIR)
    ok = 0
    for item in PROMPTS:
        print(f"\n=== {item['id']} ===")
        if generate_one(item):
            ok += 1
        time.sleep(3)
    print(f"\nDone: {ok}/{len(PROMPTS)} images")


if __name__ == "__main__":
    main()
