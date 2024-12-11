import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { LoginDialog } from "./LoginDialog";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { BlogCard } from "./BlogCard";
import { BlogEditor } from "./BlogEditor";
import type { BlogPost } from "@db/schema";
import { useSettings } from "@/lib/settings";

export function BlogSection() {
  const [showEditor, setShowEditor] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | undefined>();
  const { isAuthenticated } = useAuth();
  const { t } = useSettings();
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const response = await fetch("/api/blog");
      return response.json();
    },
  });

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setShowEditor(true);
  };

  const handleClose = () => {
    setShowEditor(false);
    setSelectedPost(undefined);
  };

  return (
    <Card className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4">
        <h2 className="text-xl font-mono">{t('blog.title')}</h2>
        <Button
          variant="outline"
          size="sm"
          className="w-full sm:w-auto"
          onClick={() => isAuthenticated ? setShowEditor(!showEditor) : setShowLogin(true)}
        >
          {showEditor ? '✕' : t('blog.create')}
        </Button>
      </div>
      <LoginDialog open={showLogin} onOpenChange={setShowLogin} />
      {showEditor && (
        <div className="mb-4">
          <BlogEditor post={selectedPost} onClose={handleClose} />
        </div>
      )}
      <ScrollArea className="h-[400px]">
        <div className="grid gap-4">
          {isLoading ? (
            <p>{t('blog.loading')}</p>
          ) : posts?.length ? (
            posts.map((post) => (
              <BlogCard key={post.id} post={post} onEdit={handleEdit} />
            ))
          ) : (
            <p className="text-muted-foreground">{t('blog.noPostsYet')}</p>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}
