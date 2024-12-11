import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GithubIcon, ExternalLinkIcon } from "lucide-react";
import type { Project } from "@db/schema";
import { useSettings } from "@/lib/settings";

interface ProjectCardProps {
  project: Project & {
    technologies: string[];
  };
}



export function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useSettings();
  return (
    <Card className="p-4 hover:border-primary transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <p className="text-muted-foreground mt-1">
            {project.description}
          </p>
          {project.technologies.length > 0 && (
            <div className="text-xs text-muted-foreground mt-2">
              {t('projects.technologiesUsed')}:
            </div>
          )}
        </div>
      </div>
      
      <div className="flex gap-2 mt-4 flex-wrap">
        {project.technologies.map((tech) => (
          <Badge key={tech} variant="secondary">{tech}</Badge>
        ))}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        {project.githubUrl && (
          <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <GithubIcon className="h-4 w-4 mr-2" />
              {t('projects.viewCode')}
            </a>
          </Button>
        )}
        {project.liveUrl && (
          <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLinkIcon className="h-4 w-4 mr-2" />
              {t('projects.viewDemo')}
            </a>
          </Button>
        )}
      </div>
    </Card>
  );
}
