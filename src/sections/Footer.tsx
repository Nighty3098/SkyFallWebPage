import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { INSTALL_COMMAND, useCopyInstallCommand } from "@/lib/install";
import styles from "./Footer.module.css";
import RevealText from "@/components/RevealText";

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  const { copied, copy } = useCopyInstallCommand();

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
          Available for unix & windows on github
        </span>
        <header className={styles.header}>
          <RevealText
            as="h2"
            className="section-title"
            lines={["Install"]}
            scrollTrigger
          />
        </header>
        <div className={styles.install} data-footer-fade>
          <span className={styles.prompt} aria-hidden="true">
            $
          </span>
          <code className={styles.code}>{INSTALL_COMMAND}</code>
          <button
            type="button"
            className={styles.copy}
            onClick={copy}
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
