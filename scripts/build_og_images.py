"""
Render the Open Graph preview images LinkedIn, Slack, iMessage etc. show when
the site is linked. 1200x630 — the 1.91:1 ratio every platform crops to.

    python scripts/build_og_images.py

Writes public/og.png (the site) and public/og-playlists.png (the eval report).
Rerun after changing the headline numbers. Fonts are Windows system fonts,
chosen to sit close to the site's Inter + JetBrains Mono.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public"
FONTS = Path("C:/Windows/Fonts")

W, H = 1200, 630
INK = (8, 8, 10)
TEXT = (237, 237, 238)
MUTED = (139, 139, 147)
FAINT = (90, 90, 98)
ACCENT = (229, 165, 75)
MARGIN = 88


def font(name, size):
    return ImageFont.truetype(str(FONTS / name), size)


def base_canvas():
    """Near-black ground with a soft amber bloom, like the site's hero."""
    img = Image.new("RGB", (W, H), INK)

    bloom = Image.new("RGB", (W, H), INK)
    draw = ImageDraw.Draw(bloom)
    draw.ellipse((W * 0.45, -H * 0.55, W * 1.25, H * 0.55), fill=(46, 33, 16))
    bloom = bloom.filter(ImageFilter.GaussianBlur(160))
    img = Image.blend(img, bloom, 0.9)

    # Hairline rule at the top, accent-colored, like the section rules.
    ImageDraw.Draw(img).rectangle((MARGIN, 64, MARGIN + 72, 66), fill=ACCENT)
    return img


def draw_mono_label(draw, xy, text, fill):
    """Uppercase monospace label with the site's wide letter-spacing."""
    x, y = xy
    f = font("consola.ttf", 22)
    for ch in text.upper():
        draw.text((x, y), ch, font=f, fill=fill)
        x += f.getlength(ch) + 4


def site_card():
    img = base_canvas()
    d = ImageDraw.Draw(img)

    draw_mono_label(d, (MARGIN, 96), "Madison, WI  ·  Open to remote & relocation", FAINT)

    light = font("segoeuil.ttf", 150)
    d.text((MARGIN - 8, 150), "Nicholas", font=light, fill=TEXT)
    d.text((MARGIN - 8, 290), "Kimball", font=light, fill=MUTED)

    draw_mono_label(d, (MARGIN, 484), "Software Engineer  ·  Integrations & AI Systems", ACCENT)

    body = font("segoeui.ttf", 26)
    d.text(
        (MARGIN, 526),
        "End-to-end ownership from requirements to production.",
        font=body,
        fill=MUTED,
    )
    d.text(
        (MARGIN, 562),
        "I build and deploy LLM-powered systems myself.",
        font=body,
        fill=MUTED,
    )

    draw_mono_label(d, (W - MARGIN - 300, 580), "nicholaskimball.com", FAINT)
    return img


def playlists_card():
    img = base_canvas()
    d = ImageDraw.Draw(img)

    draw_mono_label(d, (MARGIN, 96), "Eval report  ·  Better AI Playlists", ACCENT)

    big = font("segoeuil.ttf", 176)
    d.text((MARGIN - 10, 130), "99%", font=big, fill=TEXT)

    body = font("segoeui.ttf", 30)
    d.text((MARGIN + 380, 190), "hard-constraint checks passed,", font=body, fill=TEXT)
    d.text((MARGIN + 380, 232), "vs 57.6% for a one-shot LLM", font=body, fill=MUTED)

    sub = font("segoeui.ttf", 26)
    lines = [
        "A Spotify playlist agent that honors “only songs I’ve liked” —",
        "constraints compiled to a typed spec and enforced by a validator,",
        "not a prompt. Measured on a 30-prompt golden set.",
    ]
    y = 360
    for line in lines:
        d.text((MARGIN, y), line, font=sub, fill=MUTED)
        y += 38

    draw_mono_label(d, (MARGIN, 540), "Nicholas Kimball  ·  Software Engineer", FAINT)
    draw_mono_label(d, (W - MARGIN - 300, 580), "nicholaskimball.com", FAINT)
    return img


if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    for name, render in (("og.png", site_card), ("og-playlists.png", playlists_card)):
        path = OUT / name
        render().save(path, optimize=True)
        print(f"wrote {path.relative_to(ROOT)}  ({path.stat().st_size // 1024} KB)")
