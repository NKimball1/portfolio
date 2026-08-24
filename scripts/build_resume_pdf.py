"""
Render the resume PDF served at /Nicholas-Kimball-Resume.pdf.

Source of truth is the .docx; this script only reads its text and lays it out
so the site never serves a stale resume. Run it after editing the docx:

    python scripts/build_resume_pdf.py "C:/path/to/Nicholas_Kimball.docx"

If you'd rather ship the Word formatting, export a PDF from Word/Google Docs
straight to public/Nicholas-Kimball-Resume.pdf and ignore this script.
"""

import re
import sys
import zipfile
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_JUSTIFY
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Flowable,
    Frame,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
)

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_DOCX = Path.home() / "Downloads" / "Nicholas_Kimball.docx"
OUT = ROOT / "public" / "Nicholas-Kimball-Resume.pdf"

INK = HexColor("#111114")
BODY = HexColor("#2c2c33")
MUTED = HexColor("#6b6b74")
RULE = HexColor("#c9c9d0")
ACCENT = HexColor("#a4762a")

# Headings that mark a new section in the docx, in the order they appear.
SECTIONS = (
    "SUMMARY",
    "SELECTED PROJECT",
    "PROFESSIONAL EXPERIENCE",
    "SKILLS",
    "EDUCATION",
)


def read_docx_lines(path):
    """Pull the document's visible text out of the .docx as a list of lines."""
    with zipfile.ZipFile(path) as archive:
        xml = archive.read("word/document.xml").decode("utf-8")

    # Paragraph and tab boundaries become separators; everything else is markup.
    xml = re.sub(r"</w:p>", "\n", xml)
    xml = re.sub(r"<w:tab[^>]*/>", "\t", xml)
    text = re.sub(r"<[^>]+>", "", xml)

    for entity, char in (("&amp;", "&"), ("&lt;", "<"), ("&gt;", ">"), ("&apos;", "'"), ("&quot;", '"')):
        text = text.replace(entity, char)

    return [line.strip() for line in text.split("\n") if line.strip()]


def parse(lines):
    """Split the flat line list into a header block plus named sections."""
    header, sections, current = [], {}, None

    for line in lines:
        heading = next((s for s in SECTIONS if line.upper().startswith(s)), None)
        if heading:
            current = line.upper()
            sections[current] = []
        elif current:
            sections[current].append(line)
        else:
            header.append(line)

    return header, sections


class Rule(Flowable):
    """Full-width hairline under a section heading."""

    def __init__(self, width, color=RULE, thickness=0.6):
        super().__init__()
        self.width, self.color, self.thickness = width, color, thickness
        self.height = thickness

    def draw(self):
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(self.thickness)
        self.canv.line(0, 0, self.width, 0)


def styles():
    base = dict(fontName="Helvetica", textColor=BODY, leading=10.7)
    return {
        "name": ParagraphStyle(
            "name", fontName="Helvetica-Bold", fontSize=19, leading=21,
            textColor=INK, spaceAfter=2, tracking=0,
        ),
        "role": ParagraphStyle(
            "role", fontName="Helvetica", fontSize=9.8, leading=12,
            textColor=ACCENT, spaceAfter=4,
        ),
        "contact": ParagraphStyle(
            "contact", fontName="Helvetica", fontSize=8.2, leading=10,
            textColor=MUTED, spaceAfter=10,
        ),
        "heading": ParagraphStyle(
            "heading", fontName="Helvetica-Bold", fontSize=7.8, leading=9.4,
            textColor=INK, spaceBefore=7, spaceAfter=3,
        ),
        "jobline": ParagraphStyle(
            "jobline", fontName="Helvetica-Bold", fontSize=9.1, leading=11,
            textColor=INK, spaceBefore=5, spaceAfter=1,
        ),
        "note": ParagraphStyle(
            "note", fontName="Helvetica-Oblique", fontSize=8, leading=9.8,
            textColor=MUTED, spaceAfter=2.5,
        ),
        "body": ParagraphStyle("body", fontSize=8.5, spaceAfter=2.5, alignment=TA_JUSTIFY, **base),
        "bullet": ParagraphStyle(
            "bullet", fontSize=8.5, spaceAfter=2, leftIndent=9.5,
            bulletIndent=1.5, alignment=TA_JUSTIFY,
            fontName="Helvetica", textColor=BODY, leading=10.7,
        ),
    }


def is_job_header(line):
    """Job headers carry a tab-separated date range; bullets never do."""
    return "\t" in line


def build(docx_path, out_path):
    header, sections = parse(read_docx_lines(docx_path))
    st = styles()

    frame_width = LETTER[0] - 1.36 * inch
    doc = BaseDocTemplate(
        str(out_path),
        pagesize=LETTER,
        leftMargin=0.68 * inch, rightMargin=0.68 * inch,
        topMargin=0.5 * inch, bottomMargin=0.45 * inch,
        title="Nicholas Kimball — Résumé",
        author="Nicholas Kimball",
    )
    doc.addPageTemplates(
        PageTemplate(
            id="body",
            frames=[Frame(doc.leftMargin, doc.bottomMargin, frame_width, doc.height, id="f")],
        )
    )

    flow = [Paragraph(header[0], st["name"])]
    if len(header) > 1:
        flow.append(Paragraph(header[1].upper(), st["role"]))
    if len(header) > 2:
        # The docx separates contact fields with ❖; a middot reads better in print.
        contact = header[2].replace("❖", "·")
        flow.append(Paragraph(contact, st["contact"]))
    flow.append(Rule(frame_width, color=INK, thickness=1.1))

    for heading, lines in sections.items():
        block = [Paragraph(heading, st["heading"]), Rule(frame_width), Spacer(1, 4)]

        for line in lines:
            if is_job_header(line):
                role, _, period = line.partition("\t")
                block.append(
                    Paragraph(
                        f"{role.strip()}<font color='#6b6b74'> &nbsp;·&nbsp; {period.strip()}</font>",
                        st["jobline"],
                    )
                )
            elif line.startswith(("Enterprise shipping", "Remote")):
                block.append(Paragraph(line, st["note"]))
            elif heading == "SUMMARY":
                block.append(Paragraph(line, st["body"]))
            elif heading == "SKILLS" and ":" in line:
                label, _, rest = line.partition(":")
                block.append(
                    Paragraph(f"<b>{label.strip()}:</b> {rest.strip()}", st["body"])
                )
            else:
                block.append(Paragraph(line, st["bullet"], bulletText="—"))

        # Keep a heading from stranding itself at the foot of the page.
        flow.append(KeepTogether(block[:4]))
        flow.extend(block[4:])

    doc.build(flow)
    return out_path


if __name__ == "__main__":
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_DOCX
    if not src.exists():
        sys.exit(f"resume docx not found: {src}")
    print(f"built {build(src, OUT)}")
