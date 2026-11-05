import { motion } from "framer-motion";
import { ArrowUpRight, CornerDownLeft, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useApp } from "../lib/app";
import { GithubIcon, WhatsAppIcon } from "./icons";
import { CopyEmail, Reveal, SectionHead } from "./ui";

export default function Contact() {
  const { profile, notify } = useApp();
  const waDigits = profile.whatsapp.replace(/[^0-9]/g, "");
  const waLink = `https://wa.me/${waDigits}?text=${encodeURIComponent(
    "Hi Talha — I found your portfolio (talhadev-pk.github.io) and would like to connect about an opportunity."
  )}`;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Please add your name and a short message.");
      return;
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("That reply-to email doesn't look valid.");
      return;
    }
    setError(null);
    const subject = encodeURIComponent(`Portfolio inquiry — ${name.trim()}`);
    const body = encodeURIComponent(
      `${message.trim()}\n\n— ${name.trim()}${email.trim() ? ` (${email.trim()})` : ""}\nSent from ${profile.siteUrl}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    notify("Opening your mail client…");
  };

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden border-t border-line-soft py-24 md:py-36" aria-label="Contact">
      <div
        className="absolute left-1/2 top-0 h-[360px] w-[560px] -translate-x-1/2 rounded-full bg-accent opacity-[0.09] blur-[130px]"
        aria-hidden
      />
      <SectionHead
        index="05"
        eyebrow="Contact"
        title={
          <>
            Let's engineer
            <br />
            something <span className="text-gradient italic">useful.</span>
          </>
        }
        lede="Questions about a project, a collaboration, or the code behind anything here — my inbox is open."
      />

      <div className="mx-auto mt-14 grid w-full max-w-6xl gap-6 px-6 md:px-10 lg:grid-cols-12">
        {/* left: direct channels */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          <Reveal>
            <div className="card card-hover p-6">
              <p className="kicker mb-4 flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" aria-hidden /> Email
              </p>
              <p className="break-all font-display text-xl font-semibold tracking-tight sm:text-2xl">
                {profile.email}
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <CopyEmail email={profile.email} className="!px-5 !py-2.5 !text-[13px]" />
                <a
                  href={`mailto:${profile.email}?subject=${encodeURIComponent("Hello Talha")}`}
                  className="btn-primary !px-5 !py-2.5 !text-[13px]"
                >
                  <Send className="h-4 w-4" aria-hidden /> Write an email
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer noopener"
              className="card card-hover group flex items-center gap-4 p-6"
            >
              <span className="glass hairline relative grid h-12 w-12 place-items-center rounded-xl text-[#25D366]">
                <WhatsAppIcon className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#25D366]" />
                </span>
              </span>
              <span>
                <span className="block font-display text-base font-semibold">{profile.whatsapp}</span>
                <span className="block text-xs text-muted">
                  WhatsApp — official number, available anytime
                </span>
              </span>
              <ArrowUpRight
                className="ml-auto h-4 w-4 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                aria-hidden
              />
            </a>
          </Reveal>

          <Reveal delay={0.12}>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="card card-hover group flex items-center gap-4 p-6"
            >
              <span className="glass hairline grid h-12 w-12 place-items-center rounded-xl">
                <GithubIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-base font-semibold">github.com/{profile.githubUser}</span>
                <span className="block text-xs text-muted">Six public repositories, full source &amp; READMEs</span>
              </span>
              <ArrowUpRight
                className="ml-auto h-4 w-4 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                aria-hidden
              />
            </a>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="card flex items-center gap-4 p-6">
              <span className="glass hairline grid h-12 w-12 place-items-center rounded-xl text-accent-2">
                <MapPin className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-base font-semibold">Remote-friendly</p>
                <p className="text-xs text-muted">Working across time zones, async-first</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* right: mail composer */}
        <Reveal delay={0.1} className="lg:col-span-7">
          <form onSubmit={submit} className="card relative h-full overflow-hidden p-6 sm:p-8" noValidate={false}>
            <div className="flex items-center justify-between">
              <p className="kicker">Compose a message</p>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                opens your mail client
              </span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-muted">Your name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Ada Lovelace"
                  className="glass hairline h-11 w-full rounded-xl px-4 text-sm placeholder:text-faint focus:border-accent focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-muted">Reply-to email (optional)</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="glass hairline h-11 w-full rounded-xl px-4 text-sm placeholder:text-faint focus:border-accent focus:outline-none"
                />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="mb-1.5 block text-xs font-medium text-muted">Message</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                placeholder="Tell me about the product, system or problem you're working on…"
                className="glass hairline w-full resize-y rounded-xl px-4 py-3 text-sm leading-relaxed placeholder:text-faint focus:border-accent focus:outline-none"
              />
            </label>
            {error ? (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-xs font-medium text-red-400"
                role="alert"
              >
                {error}
              </motion.p>
            ) : null}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <p className="max-w-xs text-[11px] leading-relaxed text-faint">
                No backend, no tracking: submitting opens a pre-filled email in your own mail app.
                Nothing is stored or sent elsewhere.
              </p>
              <button type="submit" className="btn-primary">
                Send via email <CornerDownLeft className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
