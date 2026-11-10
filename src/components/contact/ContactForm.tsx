"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import type { Discipline } from "@/content";
import { cn } from "@/lib/cn";

type Topic = { id: Discipline; label: string; who: string };
type TopicId = Discipline | "any";
type Errors = Partial<Record<"topic" | "name" | "email" | "message", string>>;

/** The routing option for visitors who don't know who they need, or need more than one person. */
const ANY: { id: "any"; label: string; who: string } = { id: "any", label: "Not sure / several", who: "" };

const noopSubscribe = () => () => {};
/** ?topic=dev (links from other pages) or #brief-dev (links on the home page). */
const readTopicFromUrl = () =>
  new URLSearchParams(window.location.search).get("topic") ??
  window.location.hash.match(/^#brief-([a-z]+)$/)?.[1] ??
  null;

/**
 * Static-site friendly contact form.
 * - With `endpoint` (Formspree, Web3Forms, …): POSTs JSON.
 * - Without: opens the visitor's email app with a pre-filled message.
 * Visitors pick the person they want to talk to (or "Not sure"); there is no default,
 * so a brief is never silently filed under the wrong specialist.
 * Anchors with href="#brief-<topic>" anywhere on the page preselect that person.
 */
export function ContactForm({ email, endpoint, topics }: { email: string; endpoint?: string; topics: Topic[] }) {
  const options = [...topics, ANY];
  const isTopic = (v: string | null | undefined): v is TopicId => options.some((o) => o.id === v);

  const [errors, setErrors] = useState<Errors>({});
  const urlTopic = useSyncExternalStore(noopSubscribe, readTopicFromUrl, () => null);
  const [picked, setPicked] = useState<TopicId | null>(null);
  const topic: TopicId | null = picked ?? (isTopic(urlTopic) ? urlTopic : null);
  const setTopic = (t: TopicId) => {
    setPicked(t);
    setErrors((e) => ({ ...e, topic: undefined }));
  };

  // "Brief Himanshu" links: preselect on every click (hashchange alone misses repeat clicks).
  useEffect(() => {
    const onClick = (ev: MouseEvent) => {
      const a = (ev.target as Element | null)?.closest?.('a[href^="#brief-"]');
      const id = a?.getAttribute("href")?.slice("#brief-".length);
      if (isTopic(id)) {
        setPicked(id);
        setErrors((e) => ({ ...e, topic: undefined }));
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  const validate = (data: FormData): Errors => {
    const e: Errors = {};
    if (!topic) e.topic = "Pick who you’d like to talk to, or choose “Not sure / several” and we’ll route it.";
    if (!String(data.get("name") ?? "").trim()) e.name = "Please tell us your name.";
    const mail = String(data.get("email") ?? "").trim();
    if (!mail) e.email = "We need an email address to reply.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) e.email = "That email address doesn’t look right (e.g. name@company.com).";
    if (String(data.get("message") ?? "").trim().length < 20)
      e.message = "A couple of sentences about your project helps us reply with a useful plan (20+ characters).";
    return e;
  };

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const chosen = options.find((t) => t.id === topic)!;
    const payload = {
      name: String(data.get("name")),
      email: String(data.get("email")),
      company: String(data.get("company") ?? ""),
      budget: String(data.get("budget") ?? ""),
      topic: chosen.label,
      message: String(data.get("message")),
    };

    if (endpoint) {
      setStatus("sending");
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus("sent");
        formRef.current?.reset();
      } catch {
        setStatus("error");
      }
      return;
    }

    const subject = `[${chosen.label}] Project enquiry from ${payload.name}`;
    const body = [
      payload.message,
      "",
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      payload.company && `Company: ${payload.company}`,
      payload.budget && `Budget: ${payload.budget}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("mailto");
  };

  const field = (name: keyof Errors) => ({
    id: `${uid}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${uid}-${name}-error` : undefined,
  });

  const errorText = (name: keyof Errors) =>
    errors[name] ? (
      <p id={`${uid}-${name}-error`} className="mt-2 text-sm text-danger">
        {errors[name]}
      </p>
    ) : null;

  const chosenTopic = options.find((t) => t.id === topic);
  const person = topics.find((t) => t.id === topic);

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      data-discipline={person?.id}
      className="ink-transition grid gap-6"
    >
      <fieldset aria-describedby={errors.topic ? `${uid}-topic-error` : undefined}>
        <legend className="mb-3 font-semibold">Who do you want to talk to?</legend>
        <div className="grid grid-cols-2 gap-3">
          {options.map((t) => {
            const selected = topic === t.id;
            const isPerson = t.id !== "any";
            return (
              <label
                key={t.id}
                id={`brief-${t.id}`}
                data-discipline={isPerson ? t.id : undefined}
                className={cn(
                  "card flex min-h-11 cursor-pointer flex-col gap-0.5 rounded-2xl p-4 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
                  selected && "border-accent shadow-[var(--glow)]",
                  !selected && errors.topic && "border-danger",
                )}
              >
                <input
                  type="radio"
                  name="topic"
                  value={t.id}
                  checked={selected}
                  onChange={() => setTopic(t.id)}
                  className="sr-only"
                />
                <span className="flex items-center justify-between gap-2 font-semibold">
                  {isPerson ? t.who : "Not sure yet"}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-4 w-4 shrink-0 rounded-full border-2 transition-colors",
                      selected ? "border-accent bg-accent" : "border-border",
                    )}
                  />
                </span>
                <span className="text-sm text-muted-foreground">{isPerson ? t.label : "or more than one"}</span>
              </label>
            );
          })}
        </div>
        {errors.topic ? (
          <p id={`${uid}-topic-error`} className="mt-3 text-sm text-danger">
            {errors.topic}
          </p>
        ) : (
          chosenTopic && (
            <p className="mt-3 text-sm text-muted-foreground">
              {person
                ? `${person.who} reads your brief personally and replies within one business day.`
                : "We’ll read it together and route it to the right person within one business day."}
            </p>
          )
        )}
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className="mb-2 block text-sm font-semibold">
            Your name
          </label>
          <input {...field("name")} type="text" autoComplete="name" className="input" />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className="mb-2 block text-sm font-semibold">
            Email
          </label>
          <input {...field("email")} type="email" autoComplete="email" inputMode="email" className="input" />
          {errorText("email")}
        </div>
        <div>
          <label htmlFor={`${uid}-company`} className="mb-2 block text-sm font-semibold">
            Company <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input id={`${uid}-company`} name="company" type="text" autoComplete="organization" className="input" />
        </div>
        <div>
          <label htmlFor={`${uid}-budget`} className="mb-2 block text-sm font-semibold">
            Budget <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <select id={`${uid}-budget`} name="budget" className="input" defaultValue="">
            <option value="">Not sure yet</option>
            <option>Under $1,000</option>
            <option>$1,000 – $5,000</option>
            <option>$5,000 – $15,000</option>
            <option>$15,000+</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${uid}-message`} className="mb-2 block text-sm font-semibold">
          About your project
        </label>
        <p id={`${uid}-message-help`} className="mb-2 text-sm text-muted-foreground">
          Goals, timeline, links, file formats: whatever helps us understand the job.
        </p>
        <textarea
          {...field("message")}
          aria-describedby={[`${uid}-message-help`, errors.message && `${uid}-message-error`].filter(Boolean).join(" ")}
          rows={5}
          className="input min-h-36 resize-y"
        />
        {errorText("message")}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-accent" disabled={status === "sending"}>
          {status === "sending" ? (
            <Loader2 size={18} aria-hidden="true" className="animate-spin" />
          ) : (
            <ArrowRight size={18} aria-hidden="true" />
          )}
          {status === "sending" ? "Sending…" : "Send brief"}
        </button>
        <p className="text-sm text-muted-foreground">
          Or email{" "}
          <a href={`mailto:${email}`} className="link-underline font-semibold text-foreground">
            {email}
          </a>
        </p>
      </div>

      <div aria-live="polite" className="min-h-6">
        {status === "sent" && (
          <p className="flex items-center gap-2 font-semibold text-accent">
            <CheckCircle2 size={18} aria-hidden="true" /> Thanks! We&rsquo;ll reply within one business day.
          </p>
        )}
        {status === "mailto" && (
          <p className="text-muted-foreground">Your email app should open with the message ready. Just press send.</p>
        )}
        {status === "error" && (
          <p className="text-danger">Something went wrong sending the form. Please email us directly at {email}.</p>
        )}
      </div>
    </form>
  );
}
