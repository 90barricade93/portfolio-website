import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Skill } from "@db/schema";
import { useSettings } from "@/lib/settings";

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  const { t } = useSettings();
  return (
    <Card className="p-2 hover:border-primary transition-colors bg-background/50">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-sm">{skill.name}</h3>
        <span className="text-xs text-muted-foreground">{skill.yearsOfExperience}+ {t('skills.yearsExperience')}</span>
      </div>
      <Progress value={skill.proficiency * 20} className="h-1 mt-1.5" />
      <div className="text-xs text-muted-foreground mt-1">{skill.category}</div>
    </Card>
  );
}
