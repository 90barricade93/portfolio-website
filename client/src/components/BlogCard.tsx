import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { BlogPost } from "@db/schema";
import { useSettings } from "@/lib/settings";

interface BlogCardProps {
  post: BlogPost;
  onEdit?: (post: BlogPost) => void;
}

export function BlogCard({ post, onEdit }: BlogCardProps) {
  if (!post) return null;
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const { t } = useSettings();
  const queryClient = useQueryClient();
  const deletePost = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/blog/${post.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete post");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      toast({ description: t('blog.postDeleted') });
    },
    onError: () => {
      toast({ 
        variant: "destructive",
        description: t('blog.errorDeleting')
      });
    },
  });

  const handleDelete = () => {
    if (window.confirm(t('blog.confirmDelete'))) {
      deletePost.mutate();
    }
  };

  return (
    <Card className="p-4 hover:border-primary transition-colors">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold truncate">{post.title}</h3>
          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{post.summary}</p>
        </div>
        {isAuthenticated && (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit?.(post)}
              className="justify-center w-full sm:w-auto"
            >
              {t('blog.edit')}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={deletePost.isPending}
              className="justify-center w-full sm:w-auto"
            >
              {deletePost.isPending ? t('blog.deleting') : t('blog.delete')}
            </Button>
          </div>
        )}
      </div>
      
      {post.coverImage && (
        <div className="relative w-full h-40 mt-4 rounded-md overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      
      <div className="text-xs text-muted-foreground mt-4">
        {new Date(post.publishedAt || new Date()).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
    </Card>
  );
}
