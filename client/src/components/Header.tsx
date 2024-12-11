import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon, MailIcon, Menu as MenuIcon } from "lucide-react";
import { ContactModal } from "./ContactModal";
import { Settings } from "./Settings";
import { useSettings } from "@/lib/settings";

export function Header() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useSettings();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex-1 flex items-center">
          <div className="mr-4 flex font-mono">
            <span className="text-primary">~/portfolio</span>
            <span className="animate-blink">_</span>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <MenuIcon className="h-4 w-4" />
        </Button>
        
        <nav className={`${
          isMenuOpen 
            ? "fixed top-14 right-0 w-1/2 border-l border-b bg-gray-100 dark:bg-zinc-900 p-4 flex-col space-y-2 shadow-lg z-[100]" 
            : "hidden"
          } md:flex md:flex-row md:static md:space-y-0 md:space-x-4 md:items-center md:justify-end md:flex-1`}
        >
          <Settings />
          <Button variant="ghost" size="sm" asChild className="w-full md:w-auto justify-start">
            <a
              href="https://github.com/90barricade93"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="h-4 w-4 mr-2" />
              {t('navigation.github')}
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild className="w-full md:w-auto justify-start">
            <a
              href="https://linkedin.com/in/raymond-de-vries76/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon className="h-4 w-4 mr-2" />
              {t('navigation.linkedin')}
            </a>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowContactModal(true);
              setIsMenuOpen(false);
            }}
            className="w-full md:w-auto justify-start"
          >
            <MailIcon className="h-4 w-4 mr-2" />
            {t('navigation.contact')}
          </Button>
        </nav>
      </div>

      <ContactModal
        open={showContactModal}
        onOpenChange={setShowContactModal}
      />
    </header>
  );
}
