import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { useSettings } from "@/lib/settings";
import type { Hobby } from "@db/schema";
import { LucideIcon, Camera, Gamepad2, Mountain, BookOpen, Music, Utensils } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  camera: Camera,
  gamepad2: Gamepad2,
  "mountain-snow": Mountain,
  "book-open": BookOpen,
  music: Music,
  utensils: Utensils,
};

export function HobbiesSection() {
  const { t } = useSettings();
  const { data: hobbies, isLoading } = useQuery<Hobby[]>({
    queryKey: ["hobbies"],
    queryFn: async () => {
      const response = await fetch("/api/hobbies");
      return response.json();
    },
  });

  return (
    <Card className="p-4">
      <h2 className="text-xl font-mono mb-4">{t('hobbies.title')}</h2>
      <ScrollArea className="h-[300px] md:h-[400px]">
        <div className="grid gap-4">
          {isLoading ? (
            <p>{t('hobbies.loading')}</p>
          ) : hobbies?.length ? (
            hobbies.map((hobby) => {
              const Icon = hobby.icon ? iconMap[hobby.icon] : null;
              return (
                <div key={hobby.id} className="flex items-start gap-3 group">
                  {Icon && (
                    <div className="mt-1">
                      <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium group-hover:text-primary transition-colors">
                      {hobby.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {hobby.description}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-muted-foreground">{t('hobbies.noHobbies')}</p>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}
