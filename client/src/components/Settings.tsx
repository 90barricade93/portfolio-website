import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon } from "lucide-react";
import { useSettings } from "@/lib/settings";

export function Settings() {
  const { theme, language, toggleTheme, setLanguage } = useSettings();

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === "dark" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
      </Button>
      
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as "en" | "nl")}
        className="bg-transparent border rounded px-2 py-1 text-sm"
      >
        <option value="en">EN</option>
        <option value="nl">NL</option>
      </select>
    </div>
  );
}
