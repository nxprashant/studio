import type { ServiceInput } from "../schema";

/** Himanshu — Ink. Each entry becomes a page at /services/<slug>/ */
const publishingServices: ServiceInput[] = [
  {
    slug: "epublishing",
    title: "End-to-end ePublishing",
    seller: "himanshu",
    icon: "book",
    featured: true,
    summary:
      "From manuscript to every major eBook store: conversion, design, accessibility checks and distribution-ready files.",
    description: [
      "One partner for the whole digital publishing pipeline. I take your manuscript and deliver validated files for Amazon Kindle, Apple Books, Google Play Books, Kobo and print.",
      "Metadata, ISBN placement and retailer requirements are handled for you.",
    ],
    deliverables: [
      "EPUB 3 and Kindle files",
      "Print-ready PDF",
      "Retailer metadata (ONIX-ready)",
      "EPUBCheck validation report",
    ],
    tools: ["InDesign", "Sigil", "EPUBCheck", "Kindle Previewer"],
    faqs: [
      {
        q: "Which stores will my book work on?",
        a: "Amazon Kindle, Apple Books, Google Play Books, Kobo, Barnes & Noble and library platforms like OverDrive.",
      },
    ],
  },
  {
    slug: "ebook-conversion",
    title: "eBook Conversion",
    seller: "himanshu",
    icon: "file-code",
    featured: true,
    summary:
      "Word, PDF, InDesign or scanned books converted into clean, validated EPUB 3, Kindle and fixed-layout eBooks.",
    description: [
      "Hand-coded, clean EPUB conversion from any source: Word, PDF, InDesign, or even scanned print books with OCR.",
      "Reflowable and fixed-layout formats for novels, textbooks, children's books and cookbooks.",
    ],
    deliverables: [
      "Reflowable or fixed-layout EPUB 3",
      "Kindle (KPF / KF8) file",
      "Linked table of contents and navigation",
      "EPUBCheck-validated output",
    ],
    tools: ["EPUB 3", "Sigil", "Kindle Create", "ABBYY FineReader"],
  },
  {
    slug: "typesetting",
    title: "Typesetting",
    seller: "himanshu",
    icon: "type",
    summary:
      "Professional typesetting for books and journals: perfect hyphenation, widows and orphans handled, math-ready with LaTeX.",
    description: [
      "Print-quality typesetting for trade books, academic titles and journals, with careful attention to rhythm, hyphenation and page balance.",
      "LaTeX workflows are available for math and science content.",
    ],
    deliverables: ["Print-ready PDF (PDF/X)", "Styled InDesign or LaTeX source", "Proof rounds with tracked corrections"],
    tools: ["Adobe InDesign", "LaTeX", "Adobe Acrobat"],
  },
  {
    slug: "layout-design",
    title: "Layout Design",
    seller: "himanshu",
    icon: "layout",
    summary:
      "Interior book and magazine layouts with a clear typographic system, grids and styles your team can reuse.",
    description: [
      "Custom interior designs for books, magazines, reports and workbooks, built on reusable paragraph and character styles.",
      "Templates are delivered so future editions stay consistent.",
    ],
    deliverables: ["Interior design concept", "Master pages and style sheets", "Reusable InDesign template"],
    tools: ["Adobe InDesign", "Affinity Publisher"],
  },
  {
    slug: "cover-design",
    title: "Cover Design",
    seller: "himanshu",
    icon: "palette",
    summary:
      "Genre-aware eBook and print covers that stand out as thumbnails and meet every retailer's size specs.",
    description: [
      "Covers designed to read clearly at thumbnail size on store pages and to look great on the shelf.",
      "Full print wraps include spine and back cover, sized to your printer's template.",
    ],
    deliverables: ["eBook front cover", "Print wrap (front, spine, back)", "3D mockups for marketing"],
    tools: ["Adobe Photoshop", "Adobe Illustrator", "Figma"],
  },
  {
    slug: "accessible-ebooks",
    title: "Accessible eBooks",
    seller: "himanshu",
    icon: "accessibility",
    featured: true,
    summary:
      "EPUB Accessibility 1.1 and WCAG-conformant eBooks with alt text, semantic structure and accessibility metadata.",
    description: [
      "Born-accessible eBooks and remediation of existing files, ready for the European Accessibility Act and library requirements.",
      "Image descriptions, reading order, semantic markup, MathML and accessibility metadata, verified with Ace by DAISY.",
    ],
    deliverables: [
      "Accessible EPUB 3",
      "Alt text and extended image descriptions",
      "Accessibility metadata and summary",
      "Ace by DAISY conformance report",
    ],
    tools: ["Ace by DAISY", "EPUBCheck", "MathML", "WCAG 2.2"],
    faqs: [
      {
        q: "Does this help with the European Accessibility Act?",
        a: "Yes. Files meet EPUB Accessibility 1.1 and WCAG 2.x AA, the conformance targets referenced for the EAA.",
      },
    ],
  },
  {
    slug: "xml-conversion",
    title: "XML Conversion Services",
    seller: "himanshu",
    icon: "file-text",
    summary:
      "Content converted to structured XML (JATS, BITS, DocBook, DITA or custom DTDs) for archives, journals and multi-format publishing.",
    description: [
      "Structured XML conversion for journals, books and documentation, validated against your DTD or schema.",
      "Single-source XML lets you publish to print, web and eBook from the same content.",
    ],
    deliverables: ["Validated XML (JATS / BITS / DocBook / DITA)", "XSLT transformations", "Conversion QA report"],
    tools: ["XML", "XSLT", "Oxygen XML Editor", "JATS", "DocBook"],
  },
];

export default publishingServices;
