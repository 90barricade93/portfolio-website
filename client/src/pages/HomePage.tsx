import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Terminal } from "@/components/Terminal";
import { BlogSection } from "@/components/BlogSection";
import { ProjectCard } from "@/components/ProjectCard";
import { GithubStats } from "@/components/GithubStats";
import { LinkedInProfile } from "@/components/LinkedInProfile";
import { useQuery } from "@tanstack/react-query";
import type { Project, Skill } from "@db/schema";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SkillCard } from "@/components/SkillCard";
import { useSettings } from "@/lib/settings";

export default function HomePage() {
  const { t } = useSettings();
  const { data: skills } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const response = await fetch("/api/skills");
      return response.json();
    },
  });

  const { data: projects } = useQuery<(Project & { technologies: string[] })[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await fetch("/api/projects");
      const data = await response.json();
      return data.map((project: any) => ({
        ...project,
        technologies: Array.isArray(project.technologies) 
          ? project.technologies 
          : []
      }));
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile section - full width on mobile */}
          <div className="col-span-1 md:col-span-2">
            <LinkedInProfile />
          </div>

          {/* Left column */}
          <div className="space-y-6">
            <GithubStats />
            
            <Card className="p-4">
              <h2 className="text-xl font-mono mb-4">{t('skills.title')}</h2>
              <ScrollArea className="h-[300px] md:h-[400px]">
                <div className="grid gap-4">
                  {skills?.map((skill: Skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <Terminal />
            
            <BlogSection />
            
            <section>
              <h2 className="text-xl font-mono mb-4">{t('projects.title')}</h2>
              <div className="grid gap-4">
                {projects?.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
