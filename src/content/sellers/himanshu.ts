import type { SellerInput } from "../schema";

// TODO: replace placeholder bio, years and experience with real details.
const himanshu: SellerInput = {
  slug: "himanshu",
  name: "Himanshu",
  role: "ePublishing Specialist",
  discipline: "pub",
  chapter: "Ink",
  headline: "Manuscripts turned into beautiful, accessible, store-ready books.",
  bio: [
    "I help publishers and authors take a manuscript to print and to every eBook store: conversion, typesetting, layout and covers.",
    "I specialise in accessible EPUB 3 and XML workflows, so books work for every reader and pass retailer and accessibility checks first time.",
  ],
  location: "India · Remote",
  yearsExperience: 6,
  socials: [{ label: "LinkedIn", href: "https://www.linkedin.com/" }],
  skills: [
    "EPUB 2 & 3",
    "Kindle (KF8 / KPF)",
    "Fixed-layout eBooks",
    "Adobe InDesign",
    "LaTeX",
    "XML / XSLT",
    "JATS & DocBook",
    "WCAG & EPUB Accessibility 1.1",
    "Ace by DAISY",
    "Cover design",
  ],
  experience: [
    {
      period: "2022 — Now",
      title: "Freelance ePublishing Specialist",
      org: "Inkcode Labs",
      summary: "Conversion, typesetting and accessibility remediation for publishers and self-published authors.",
    },
    {
      period: "2019 — 2022",
      title: "Production Associate",
      org: "Publishing services company (placeholder)",
      summary: "Produced EPUB, Kindle and print-ready files for trade and academic titles.",
    },
  ],
};

export default himanshu;
