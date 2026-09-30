import Link from "next/link";
import AmbientLight from "./ambient-light";

const navigation = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Notes", href: "/notes" },
];

export default function Home() {
  return (
    <main className="site-shell">
      <AmbientLight />
      <div className="page-frame">
        <header className="site-header">
          <Link className="wordmark" href="/" aria-label="Jiacheng Yang, home">
            Jiacheng<span aria-hidden="true">.</span>
          </Link>

          <nav aria-label="Main navigation" className="site-nav">
            {navigation.map((item) => (
              <Link href={item.href} key={item.label}>
                {item.label}
              </Link>
            ))}
            <a
              className="github-link"
              href="https://github.com/JohnYang8866"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </header>

        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-content">
            <p className="eyebrow"><span aria-hidden="true" className="eyebrow-line" /> A space for work and thought</p>
            <h1 id="hero-title">Jiacheng Yang<span className="title-period">.</span></h1>
            <p className="hero-statement">
              I build software and explore ideas through technology.
            </p>
            <p className="hero-disciplines">
              Computer Science <span aria-hidden="true">·</span> Software Engineering <span aria-hidden="true">·</span> AI
            </p>
            <Link className="primary-link" href="/work">
              Explore my work <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="hero-footer">
            <p className="location"><span className="location-dot" aria-hidden="true" /> Sydney, Australia</p>
            <p className="scroll-cue" aria-hidden="true"><span className="scroll-line" /> Scroll to explore</p>
            <p className="hero-index" aria-hidden="true">01 / 01</p>
          </div>
        </section>
      </div>
    </main>
  );
}
