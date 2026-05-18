"use client";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X, Sparkles, ShieldCheck, Headset } from "lucide-react";
import { business } from "@/lib/business";

type Msg = { role: "user" | "assistant"; content: string };

const QUICK_REPLIES = [
  "What does Magistrum do?",
  "How much does Zoho implementation cost?",
  "Do you offer Zoho training?",
  "Book a free discovery call",
];

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [showLauncherTip, setShowLauncherTip] = useState(true);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm the Magistrum assistant. Ask me about Zoho, training, pricing, or anything about how Magistrum works, and I can book you a free discovery call when you're ready.",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sessionId] = useState(() =>
    typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2),
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 99999, behavior: "smooth" });
  }, [msgs, open]);

  useEffect(() => {
    if (open) {
      // Defer focus so iOS doesn't auto-zoom before the panel is in place.
      const t = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 150);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Lock body scroll on mobile while the panel is open so the page behind doesn't scroll.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!open) return;
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    if (!isMobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const t = setTimeout(() => setShowLauncherTip(false), 8000);
    return () => clearTimeout(t);
  }, []);

  async function send(message?: string) {
    const text = (message ?? input).trim();
    if (!text || sending) return;
    const userMsg: Msg = { role: "user", content: text };
    setMsgs((m) => [...m, userMsg, { role: "assistant", content: "" }]);
    setInput("");
    setSending(true);
    const apiUrl = process.env.NEXT_PUBLIC_CHATBOT_API_URL || "http://localhost:8000";
    try {
      const r = await fetch(`${apiUrl}/chat`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: text }),
      });
      if (!r.ok || !r.body) throw new Error("Chat API error");
      const reader = r.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMsgs((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (e) {
      setMsgs((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content:
            "Sorry, I couldn't get a reply just now. Please WhatsApp us on " +
            business.phone.primary.display +
            " or email " +
            business.email.general +
            " and our team will get back to you within a working day.",
        };
        return copy;
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* Launcher — hidden on mobile when the panel is open (panel is fullscreen there and has its own close button) */}
      <div
        className={`fixed bottom-4 right-3 sm:right-4 lg:bottom-6 lg:right-6 z-40 flex items-end gap-2 ${
          open ? "hidden sm:flex" : "flex"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {showLauncherTip && !open ? (
          <div className="hidden sm:block relative max-w-[220px] bg-surface-elevated border border-border rounded-2xl rounded-br-sm shadow-lg px-3 py-2 text-sm text-ink animate-in fade-in slide-in-from-bottom-2 duration-base">
            <div className="font-semibold text-navy-800 text-xs flex items-center gap-1.5">
              <Sparkles size={12} className="text-gold-600" aria-hidden /> Got a Zoho question?
            </div>
            <div className="text-xs text-ink-secondary mt-0.5">I can answer in plain English, or book you a call.</div>
            <button
              onClick={() => setShowLauncherTip(false)}
              className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-surface-elevated border border-border text-ink-muted hover:text-ink shadow-sm cursor-pointer flex items-center justify-center"
              aria-label="Dismiss tooltip"
            >
              <X size={12} aria-hidden />
            </button>
          </div>
        ) : null}

        <button
          type="button"
          aria-label={open ? "Close chat" : "Open chat with Magistrum assistant"}
          aria-expanded={open}
          onClick={() => {
            setOpen((o) => !o);
            setShowLauncherTip(false);
          }}
          className="relative w-[72px] h-[72px] sm:w-[72px] sm:h-[72px] rounded-full bg-navy-800 text-gold-400 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-base ease-out-quart cursor-pointer flex items-center justify-center group border-[3px] border-gold-400 ring-4 ring-navy-800/10"
        >
          <span className={`absolute -inset-0.5 rounded-full bg-gold-400/40 ${!open ? "chatbot-pulse" : ""}`} aria-hidden />
          <span className="relative">
            {open ? <X size={28} aria-hidden /> : <Headset size={30} aria-hidden strokeWidth={1.8} />}
          </span>
          {!open ? (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-surface chatbot-blink" aria-hidden />
          ) : null}
        </button>
      </div>

      {/* Backdrop — mobile only, dims the page behind the panel */}
      {open ? (
        <div
          className="fixed inset-0 z-30 bg-navy-900/40 backdrop-blur-[2px] sm:hidden animate-in fade-in duration-base"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      ) : null}

      {/* Panel */}
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Magistrum assistant"
          className="
            fixed z-40 bg-surface-elevated flex flex-col overflow-hidden
            inset-x-0 bottom-0 h-[82vh] max-h-[640px]
            sm:inset-auto sm:right-4 sm:bottom-28 lg:bottom-28 lg:right-6
            sm:w-[calc(100vw-2rem)] sm:max-w-[420px] lg:max-w-[440px]
            sm:h-[80vh] sm:max-h-[720px]
            rounded-t-3xl sm:rounded-2xl lg:rounded-3xl
            border-t-2 border-x-2 border-navy-800 sm:border-2 sm:ring-4 sm:ring-gold-200/40
            shadow-2xl
            animate-in fade-in slide-in-from-bottom-4 duration-base
          "
        >
          {/* Drag handle — visible cue that this is a bottom sheet on mobile */}
          <div className="sm:hidden flex justify-center pt-2 pb-1 bg-gradient-to-br from-navy-800 to-navy-900" aria-hidden>
            <span className="w-10 h-1 rounded-full bg-surface/30" />
          </div>
          {/* Header */}
          <div
            className="relative px-4 py-3 sm:py-3.5 bg-gradient-to-br from-navy-800 to-navy-900 text-surface"
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-400/30 flex items-center justify-center">
                  <span className="font-serif text-gold-400 font-semibold text-lg leading-none">M</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-serif text-base font-semibold flex items-center gap-1.5">
                  Magistrum Assistant
                  <ShieldCheck size={13} className="text-gold-400" aria-hidden />
                </div>
                <div className="text-[11px] text-surface/70">
                  Online · Replies in seconds
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-surface/80 hover:text-surface transition-colors cursor-pointer w-10 h-10 -mr-1 rounded-lg hover:bg-surface/10 flex items-center justify-center"
              >
                <X size={20} aria-hidden />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto overscroll-contain px-3 sm:px-4 py-4 space-y-3 bg-gradient-to-b from-surface-warm/20 to-surface scrollbar-thin"
          >
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-1 duration-fast`}
              >
                {m.role === "assistant" ? (
                  <div className="flex items-end gap-1.5 max-w-[85%]">
                    <div
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-navy-800 text-gold-400 flex items-center justify-center text-[10px] font-serif font-semibold mb-1"
                      aria-hidden
                    >
                      M
                    </div>
                    <div className="bg-surface-elevated border border-border text-ink rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-sm leading-relaxed shadow-sm">
                      {m.content ||
                        (sending && i === msgs.length - 1 ? (
                          <span className="inline-flex items-center gap-1" aria-label="Assistant is typing">
                            <span className="w-1.5 h-1.5 rounded-full bg-ink-muted animate-bounce" style={{ animationDelay: "0ms" }} aria-hidden />
                            <span className="w-1.5 h-1.5 rounded-full bg-ink-muted animate-bounce" style={{ animationDelay: "150ms" }} aria-hidden />
                            <span className="w-1.5 h-1.5 rounded-full bg-ink-muted animate-bounce" style={{ animationDelay: "300ms" }} aria-hidden />
                          </span>
                        ) : null)}
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[85%] bg-navy-800 text-surface rounded-2xl rounded-br-sm px-3.5 py-2.5 text-sm leading-relaxed shadow-sm">
                    {m.content}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick replies */}
          {msgs.length <= 2 ? (
            <div className="px-3 py-2 border-t border-border bg-surface-elevated">
              <div className="text-[10px] uppercase tracking-widest text-ink-muted font-semibold mb-1.5 px-1">
                Quick start
              </div>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    disabled={sending}
                    className="text-xs px-3 py-1.5 rounded-full border border-border bg-surface hover:bg-navy-50 hover:border-navy-200 active:bg-navy-100 transition-all duration-fast cursor-pointer text-ink-secondary disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="border-t border-border bg-surface-elevated p-3 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              enterKeyHint="send"
              autoComplete="off"
              className="flex-1 min-w-0 px-4 py-2.5 bg-surface rounded-full text-base sm:text-sm text-ink placeholder:text-ink-muted border border-border focus:border-navy-600 focus:ring-2 focus:ring-navy-100 outline-none transition-colors duration-fast"
              aria-label="Type your message"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="flex-shrink-0 w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-gold-500 text-navy-900 hover:bg-gold-600 active:bg-gold-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-base ease-out-quart cursor-pointer flex items-center justify-center shadow-sm hover:shadow-md"
              aria-label="Send message"
            >
              <Send size={16} aria-hidden />
            </button>
          </form>

          {/* Footer hint */}
          <div
            className="px-3 sm:px-4 py-2.5 bg-surface-warm/60 border-t border-border flex items-center justify-between gap-2 text-xs"
            style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
          >
            <span className="text-ink-muted">Prefer to talk to a person?</span>
            <a
              href={business.whatsapp.link()}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#1ebe57] active:bg-[#179049] transition-colors cursor-pointer shadow-sm whitespace-nowrap"
            >
              <MessageCircle size={14} aria-hidden /> WhatsApp
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
