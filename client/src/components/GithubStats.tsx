import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getGithubStats } from "@/lib/github";
import { useSettings } from "@/lib/settings";

export function GithubStats() {
  const { t } = useSettings();
  const { data, isLoading } = useQuery({
    queryKey: ["github-stats"],
    queryFn: getGithubStats,
  });

  return (
    <Card className="p-4">
      <h2 className="text-xl font-mono mb-4">{t('github.title')}</h2>
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-20" />
          <Skeleton className="h-[120px]" />
        </div>
      ) : data ? (
        <>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold">{data.publicRepos}</div>
              <div className="text-sm text-muted-foreground">{t('github.publicRepos')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{data.privateRepos}</div>
              <div className="text-sm text-muted-foreground">{t('github.privateRepos')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{data.totalContributions}</div>
              <div className="text-sm text-muted-foreground">{t('github.contributions')}</div>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">{t('github.recentActivity')}</h3>
            <div className="space-y-2">
              {data.recentCommits?.map((commit, i) => (
                <div key={i} className="text-sm">
                  <span className="text-primary">{commit.repo}</span>: {commit.message}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="text-sm text-muted-foreground">
          Unable to load GitHub stats. Please ensure GitHub credentials are configured correctly.
        </div>
      )}
    </Card>
  );
}
