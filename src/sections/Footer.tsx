import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import styles from "./Footer.module.css";

const installCommand =
  "curl -fsSL https://raw.githubusercontent.com/Nighty3098/SkyFall/main/install.sh | bash";

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll("[data-footer-fade]"),
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root, start: "top 60%", once: true },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <footer className={styles.footer} id="contacts" ref={rootRef}>
      <div className={styles.center}>
        <span className={styles.label} data-footer-fade>
          Install
        </span>
        <div className={styles.install} data-footer-fade>
          <span className={styles.prompt} aria-hidden="true">
            $
          </span>
          <code className={styles.code}>{installCommand}</code>
          <button
            type="button"
            className={styles.copy}
            onClick={handleCopy}
            aria-label="Copy install command"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <p className={styles.copyright} data-footer-fade>
        ©2026 SkyFall Project · Coded by Nighty3098
      </p>
    </footer>
  );
}
