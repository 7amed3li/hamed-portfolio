"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyCurl = () => {
    navigator.clipboard.writeText("curl -X POST https://api.hamed.dev/contact -H 'Content-Type: application/json' -d '{\"message\": \"Let\\'s build something.\"}'");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-40 px-8 md:px-20 lg:px-28 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-28"
        >
          <p className="section-label mb-8">
            <span className="section-line" />
            Get in Touch
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-tight text-foreground">
            Let&apos;s build<br />
            <span className="accent-text">something secure.</span>
          </h2>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <p className="text-base leading-relaxed text-muted-foreground">
              If you need someone to fix your backend performance, secure your infrastructure, or build a scalable system from scratch, send me an email.
            </p>

            <div className="space-y-6">
              {[
                { label: "Email", value: "hamed.m.abdelalim@gmail.com", href: "mailto:hamed.m.abdelalim@gmail.com" },
                { label: "Phone", value: "+90 506 045 3906", href: "tel:+905060453906" },
                { label: "Location", value: "Tokat, Turkey · Open to KSA", href: null },
                { label: "Available", value: "Full-time from August 2026", href: null },
              ].map(({ label, value, href }) => (
                <div key={label} className="flex gap-8 py-5 border-b border-border">
                  <span className="text-xs font-mono uppercase tracking-widest w-20 flex-shrink-0 mt-0.5 text-muted-foreground">{label}</span>
                  {href ? (
                    <a href={href} className="text-sm transition-colors text-foreground hover:text-accent">
                      {value}
                    </a>
                  ) : (
                    <span className="text-sm text-foreground">{value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Geek Touch: Curl Command */}
            <div 
              onClick={handleCopyCurl}
              className="mt-10 p-5 rounded-lg bg-[#0a0a0a] border border-border font-mono text-xs text-muted-foreground relative group cursor-pointer hover:border-accent/50 transition-colors"
            >
              <div className="absolute top-0 left-0 w-full h-8 bg-surface-2 border-b border-border rounded-t-lg flex items-center px-4 justify-between">
                <div className="flex gap-2 items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-border" />
                  <div className="w-2.5 h-2.5 rounded-full bg-border" />
                  <div className="w-2.5 h-2.5 rounded-full bg-border" />
                  <span className="ml-2 text-[10px] uppercase tracking-widest opacity-50">Terminal</span>
                </div>
                <span className={`text-[10px] uppercase tracking-widest transition-colors ${copied ? 'text-accent' : 'opacity-0 group-hover:opacity-50'}`}>
                  {copied ? 'Copied!' : 'Click to copy'}
                </span>
              </div>
              <div className="pt-8 overflow-x-auto">
                <p>
                  <span className="text-accent">curl</span> -X POST https://api.hamed.dev/contact \
                </p>
                <p className="pl-4">
                  -H <span className="text-foreground">"Content-Type: application/json"</span> \
                </p>
                <p className="pl-4">
                  -d <span className="text-foreground">'&#123;"message": "Let&apos;s build something."&#125;'</span>
                </p>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              <a
                href="https://github.com/7amed3li"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 text-xs font-mono uppercase tracking-widest transition-colors border border-border text-muted-foreground hover:border-accent hover:text-accent"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/hamed-abdelalim"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 text-xs font-mono uppercase tracking-widest transition-colors border border-border text-muted-foreground hover:border-accent hover:text-accent"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {sent ? (
              <div className="h-full flex items-center justify-center flex-col gap-4 text-center py-16">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-accent bg-accent/10">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10l4 4 8-8" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold accent-text">Message Sent!</h3>
                <p className="text-sm text-muted-foreground">I&apos;ll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { id: "name", label: "Your Name", type: "text", placeholder: "Ahmed Mohamed" },
                  { id: "email", label: "Email Address", type: "email", placeholder: "ahmed@example.com" },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-xs font-mono uppercase tracking-widest mb-2 text-muted-foreground">
                      {label}
                    </label>
                    <input
                      id={id}
                      type={type}
                      required
                      placeholder={placeholder}
                      className="w-full px-4 py-3 text-sm outline-none transition-colors bg-surface border border-border text-foreground focus:border-accent"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="block text-xs font-mono uppercase tracking-widest mb-2 text-muted-foreground">
                    How can I help?
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 text-sm outline-none resize-none transition-colors bg-surface border border-border text-foreground focus:border-accent"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 text-sm font-mono uppercase tracking-widest font-bold transition-colors bg-accent text-black hover:bg-foreground"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-28 pt-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border">
          <span className="text-xs font-mono text-muted-foreground">
            © {new Date().getFullYear()} Hamed Mohamed · All rights reserved
          </span>
          <span className="text-xs font-mono text-muted-foreground">
            Performance + Security Engineer
          </span>
        </div>
      </div>
    </section>
  );
}
