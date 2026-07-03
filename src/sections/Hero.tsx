import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./Hero.module.css";

interface TagData {
  text: string;
  radius: number;
  angle: number;
  size: number;
  preview?: string;
}

const tagData: TagData[] = [
  { text: "osint", radius: 0.32, angle: 0, size: 1.4 },
  { text: "threat intel", radius: 0.4, angle: 28, size: 0.9 },
  { text: "reconnaissance", radius: 0.26, angle: 55, size: 1.1 },
  { text: "forensics", radius: 0.34, angle: 82, size: 0.85 },
  { text: "telegram osint", radius: 0.42, angle: 115, size: 1.15, preview: "/assets/imgs/tg.png" },
  { text: "blockchain", radius: 0.23, angle: 145, size: 0.8 },
  { text: "github recon", radius: 0.29, angle: 175, size: 1.0, preview: "/assets/imgs/github.png" },
  { text: "dorking", radius: 0.36, angle: 205, size: 0.9, preview: "/assets/imgs/dorks.png" },
  { text: "email osint", radius: 0.27, angle: 235, size: 0.95, preview: "/assets/imgs/mail.png" },
  { text: "username search", radius: 0.38, angle: 265, size: 1.05, preview: "/assets/imgs/username.png" },
  { text: "graph analytics", radius: 0.31, angle: 295, size: 0.85, preview: "/assets/imgs/graph.png" },
  { text: "open source", radius: 0.21, angle: 325, size: 0.75 },
];

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [activePreview, setActivePreview] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDims({ w: rect.width, h: rect.height });
        setReady(true);
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!ready || dims.w === 0) return;

    const center = centerRef.current;
    const svg = svgRef.current;
    const tags = tagRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (!center || !svg) return;

    const lines = svg.querySelectorAll("line");

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      center,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.9, ease: "back.out(1.7)" },
    );

    if (lines.length > 0) {
      tl.fromTo(
        lines,
        { strokeDashoffset: 4000 },
        {
          strokeDashoffset: 0,
          duration: 1,
          stagger: 0.02,
          ease: "power2.inOut",
        },
        "-=0.4",
      );
    }

    tl.fromTo(
      tags,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.04, ease: "power3.out" },
      "-=0.6",
    );

    return () => {
      tl.kill();
      gsap.killTweensOf(center);
    };
  }, [ready, dims]);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    if (activePreview) {
      gsap.fromTo(el, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" });
    }
  }, [activePreview]);

  const showPreview = (src: string, e: React.MouseEvent) => {
    const el = previewRef.current;
    if (!el) return;
    setActivePreview(src);
    el.style.left = `${e.clientX + 22}px`;
    el.style.top = `${e.clientY - 14}px`;
  };

  const movePreview = (e: React.MouseEvent) => {
    const el = previewRef.current;
    if (!el || !activePreview) return;
    el.style.left = `${e.clientX + 22}px`;
    el.style.top = `${e.clientY - 14}px`;
  };

  const hidePreview = () => {
    setActivePreview(null);
  };

  if (!ready || dims.w === 0) {
    return <section className={styles.container} ref={containerRef} />;
  }

  const cx = dims.w / 2;
  const cy = dims.h / 2;
  const maxR = Math.max(...tagData.map((t) => t.radius));
  const spanRatio = 0.4 / maxR;
  const scaleX = dims.w * spanRatio;
  const scaleY = dims.h * spanRatio;

  const positions = tagData.map((t) => ({
    x: cx + scaleX * t.radius * Math.cos((t.angle * Math.PI) / 180),
    y: cy + scaleY * t.radius * Math.sin((t.angle * Math.PI) / 180),
  }));

  return (
    <section className={styles.container} ref={containerRef}>
      <svg
        ref={svgRef}
        className={styles.svg}
        width={dims.w}
        height={dims.h}
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {positions.map((pos, i) => (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={pos.x}
            y2={pos.y}
            className={styles.synapse}
          />
        ))}
      </svg>

      <div ref={centerRef} className={styles.centerNode}>
        <div className={styles.centerImage}>
          <img src="/skyfall.jpg" alt="SkyFall" />
          <span className={styles.centerText}>SkyFall</span>
        </div>
      </div>

      {tagData.map((tag, i) => {
        const pos = positions[i];
        return (
          <span
            key={i}
            ref={(el) => {
              tagRefs.current[i] = el;
            }}
            className={styles.neuralTag}
            style={{
              left: pos.x,
              top: pos.y,
            }}
            onMouseEnter={(e) => tag.preview && showPreview(tag.preview, e)}
            onMouseMove={movePreview}
            onMouseLeave={hidePreview}
            onClick={() => tag.preview && window.open(tag.preview, "_blank")}
          >
            {tag.text}
          </span>
        );
      })}

      <div ref={previewRef} className={styles.preview}>
        {activePreview && <img src={activePreview} alt="" />}
      </div>

      <p className={styles.identity} aria-hidden="true">
        OSINT Intelligence Platform
      </p>
    </section>
  );
}

export default Hero;
