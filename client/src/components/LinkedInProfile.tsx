import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getLinkedInProfile } from "@/lib/linkedin";
import { useSettings } from "@/lib/settings";

export function LinkedInProfile() {
  const { t } = useSettings();
  const { data, isLoading } = useQuery({
    queryKey: ["linkedin-profile"],
    queryFn: getLinkedInProfile,
  });

  if (isLoading) {
    return <Card className="p-4">Loading profile...</Card>;
  }

  return (
    <Card className="p-4">
      <div className="flex items-start gap-4">
        <Avatar className="h-20 w-20">
          <img src={data?.profilePicture} alt={data?.name} />
        </Avatar>
        
        <div>
          <h1 className="text-2xl font-bold">{data?.name}</h1>
          <p className="text-muted-foreground">{data?.headline}</p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {data?.skills?.map((skill) => (
              <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
          </div>
        </div>
      </div>
      
      <div className="space-y-4 mt-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">{t('experience.title')}</h2>
          <div className="space-y-2">
            {data?.experience?.map((exp, i) => (
              <div key={i} className="text-sm">
                <div className="font-medium">{exp.title}</div>
                <div className="text-muted-foreground">{exp.company}</div>
                <div className="text-muted-foreground">{exp.duration}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">{t('experience.certifications')}</h2>
          <div className="space-y-2">
            {data?.certificates?.map((cert, i) => (
              <div key={i} className="text-sm">
                <div className="font-medium">{cert.name}</div>
                <div className="text-muted-foreground">{cert.issuer}</div>
                <div className="text-muted-foreground">{t('experience.completed')}: {cert.completedDate}</div>
                {cert.credentialUrl && (
                  <a 
                    href={cert.credentialUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline text-xs"
                  >
                    {t('experience.viewCertificate')}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
