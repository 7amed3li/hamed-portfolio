"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const { lang } = useLang();
  const tr = t[lang].contact;

  const handleCopyCurl = () => {
    navigator.clipboard.writeText("curl -X POST https://www.hamedmohamed.dev/api/contact -H 'Content-Type: application/json' -d '{\"message\": \"Let\\'s build something.\"}'");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      _captcha: false // disable formsubmit's visual captcha
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/hamed.m.abdelalim@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setFormState('success');
      } else {
        setFormState('error');
      }
    } catch (err) {
      setFormState('error');
    }
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
            {tr.label}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-tight text-foreground">
            {tr.heading1}<br />
            <span className="accent-text">{tr.heading2}</span>
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
              {tr.desc}
            </p>

            <div className="space-y-6">
              {tr.info.map(({ label, value, href }) => (
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
                  {copied ? tr.copied : tr.copyHint}
                </span>
              </div>
              <div className="pt-8 overflow-x-auto">
                <p>
                  <span className="text-accent">curl</span> -X POST https://www.hamedmohamed.dev/api/contact \
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
                href="https://www.linkedin.com/in/hamed-abdelalim"
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
            {formState === 'success' ? (
              <div className="h-full flex items-center justify-center flex-col gap-4 text-center py-16">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-accent bg-accent/10">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10l4 4 8-8" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold accent-text">{tr.form.successTitle}</h3>
                <p className="text-sm text-muted-foreground">{tr.form.successSub}</p>
              </div>
            ) : formState === 'error' ? (
              <div className="h-full flex items-center justify-center flex-col gap-4 text-center py-16">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-red-500 bg-red-500/10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" className="text-red-500" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-500">{tr.form.errorTitle}</h3>
                <p className="text-sm text-muted-foreground mb-6">{tr.form.errorSub}</p>
                <button
                  onClick={() => setFormState('idle')}
                  className="px-6 py-2 text-xs font-mono uppercase tracking-widest transition-colors border border-border text-foreground hover:border-accent hover:text-accent"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { id: "name", label: tr.form.nameLabel, type: "text", placeholder: tr.form.namePlaceholder },
                  { id: "email", label: tr.form.emailLabel, type: "email", placeholder: tr.form.emailPlaceholder },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-xs font-mono uppercase tracking-widest mb-2 text-muted-foreground">
                      {label}
                    </label>
                    <input
                      id={id}
                      name={id}
                      type={type}
                      required
                      disabled={formState === 'submitting'}
                      placeholder={placeholder}
                      className="w-full px-4 py-3 text-sm outline-none transition-colors bg-surface border border-border text-foreground focus:border-accent disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="block text-xs font-mono uppercase tracking-widest mb-2 text-muted-foreground">
                    {tr.form.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    disabled={formState === 'submitting'}
                    placeholder={tr.form.messagePlaceholder}
                    className="w-full px-4 py-3 text-sm outline-none resize-none transition-colors bg-surface border border-border text-foreground focus:border-accent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full py-4 text-sm flex items-center justify-center font-mono uppercase tracking-widest font-bold transition-colors bg-accent text-black hover:bg-foreground disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formState === 'submitting' ? (
                    <span className="flex items-center gap-3">
                      <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {tr.form.submitting}
                    </span>
                  ) : tr.form.submit}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-28 pt-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border">
          <span className="text-xs font-mono text-muted-foreground">
            © {new Date().getFullYear()} Hamed Mohamed · {tr.footerLeft}
          </span>
          <span className="text-xs font-mono text-muted-foreground">
            {tr.footerRight}
          </span>
        </div>
      </div>
    </section>
  );
}
