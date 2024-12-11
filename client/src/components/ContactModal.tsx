import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MailIcon, CopyIcon, CheckIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSettings } from "@/lib/settings";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const { toast } = useToast();
  const { t } = useSettings();
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const handleOpenContact = () => {
      onOpenChange(true);
    };
    window.addEventListener('open-contact', handleOpenContact);
    return () => window.removeEventListener('open-contact', handleOpenContact);
  }, [onOpenChange]);

  const email = "raymond.devries@example.com";  // TODO: Update with actual email when provided

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    toast({
      description: t('contact.copied'),
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('contact.title')}</DialogTitle>
          <DialogDescription>
            {t('contact.description')}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center space-x-2">
            <MailIcon className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">{email}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopyEmail}
              className="ml-auto"
            >
              {copied ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button asChild className="w-full">
            <a href={`mailto:${email}`}>
              <MailIcon className="h-4 w-4 mr-2" />
              {t('contact.sendEmail')}
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
