import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <p className="brand-mark brand-mark--footer">
            <span className="brand-mark__name">Dylanrych</span>
            <span className="brand-mark__tld">.id</span>
          </p>
          <p className="muted">Extrait de Parfum · 35 ml · termasuk 1 tester</p>
        </div>
        <div className="site-footer__links">
          <a href="mailto:info@dylanrych.id">info@dylanrych.id</a>
          <a
            href="https://wa.me/6285171172193"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <a
            href="https://www.tokopedia.com/dylanrychid"
            target="_blank"
            rel="noreferrer"
          >
            Tokopedia
          </a>
          <Link href="/admin">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
