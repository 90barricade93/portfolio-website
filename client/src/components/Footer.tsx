import { Link } from "wouter";
import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";
import { useSettings } from "@/lib/settings";

export function Footer() {
  const { t } = useSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About section */}
          <div className="space-y-2">
            <h3 className="font-semibold">{t('footer.about')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('footer.aboutText')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h3 className="font-semibold">{t('footer.quickLinks')}</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.home')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.blog')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-2">
            <h3 className="font-semibold">{t('footer.connect')}</h3>
            <div className="flex flex-col space-y-1">
              <a
                href="https://github.com/90barricade93"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
              >
                <GithubIcon className="h-4 w-4 mr-2" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/raymond-de-vries76/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
              >
                <LinkedinIcon className="h-4 w-4 mr-2" />
                LinkedIn
              </a>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
              >
                <MailIcon className="h-4 w-4 mr-2" />
                {t('footer.contact')}
              </button>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2">
            <h3 className="font-semibold">{t('footer.techStack')}</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>React + TypeScript</p>
              <p>Node.js + Express</p>
              <p>PostgreSQL + Drizzle</p>
              <p>Tailwind CSS</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
