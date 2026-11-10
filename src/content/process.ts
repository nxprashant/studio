import type { ProcessStepInput } from "./schema";

/** The shared 4-step process shown on the home page and service pages. */
const process: ProcessStepInput[] = [
  {
    title: "Brief",
    body: "Tell us what you need. We reply within one business day with questions and a recommended approach.",
    icon: "message",
  },
  {
    title: "Quote",
    body: "A fixed scope, timeline and price, with no surprises. Work starts only once you approve.",
    icon: "file-text",
  },
  {
    title: "Build",
    body: "We work in short cycles with regular previews, so you always know where things stand.",
    icon: "hammer",
  },
  {
    title: "Deliver",
    body: "Validated, documented deliverables plus a support window after handover.",
    icon: "send",
  },
];

export default process;
