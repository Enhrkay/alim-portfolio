"use client";

import { useEffect, useState } from "react";

export function PublicNav({
  name,
  logoUrl,
}: {
  name: string;
  logoUrl?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClassName = scrolled ? "site-nav is-scrolled" : "site-nav";

  return (
    <header className={navClassName}>
      <div className="container site-nav-inner">
        <a className="brand" href="#top" aria-label={`${name} home`}>
          {logoUrl ? <img src={logoUrl} alt="" /> : <span className="brand-mark">AA</span>}
          <div>
            <strong>{name}</strong>
            <small>AI AUTOMATION / DATA / TRAINING</small>
          </div>
        </a>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span />
          <span />
        </button>

        <nav className={open ? "open" : ""}>
          <a href="#work" onClick={() => setOpen(false)}>Work</a>
          <a href="#data" onClick={() => setOpen(false)}>Data Intelligence</a>
          <a href="#process" onClick={() => setOpen(false)}>Process</a>
          <a href="#showcase" onClick={() => setOpen(false)}>Showcase</a>
          <a href="#about" onClick={() => setOpen(false)}>Profile</a>
          <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>Let&apos;s Talk</a>
        </nav>
      </div>
    </header>
  );
}
