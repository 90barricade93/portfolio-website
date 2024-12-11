import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useSettings } from "@/lib/settings";
import { insertBlogPostSchema, type InsertBlogPost, type BlogPost } from "@db/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface BlogEditorProps {
  post?: BlogPost;
  onClose?: () => void;
}

export function BlogEditor({ post, onClose }: BlogEditorProps) {
  const { toast } = useToast();
  const { t } = useSettings();
  const queryClient = useQueryClient();
  const isEditing = !!post;
  
  const form = useForm<InsertBlogPost>({
    resolver: zodResolver(insertBlogPostSchema),
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      summary: post?.summary || "",
    },
  });

  const createPost = useMutation({
    mutationFn: async (data: InsertBlogPost) => {
      const url = isEditing ? `/api/blog/${post.id}` : "/api/blog";
      const method = isEditing ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(isEditing ? "Failed to update blog post" : "Failed to create blog post");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      toast({
        description: isEditing ? t('blog.postUpdated') : t('blog.postCreated'),
      });
      form.reset();
      onClose?.();
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: isEditing ? t('blog.errorUpdating') : t('blog.errorCreating'),
      });
    },
  });

  const onSubmit = (data: InsertBlogPost) => {
    createPost.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('blog.titleLabel')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('blog.summaryLabel')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('blog.contentLabel')}</FormLabel>
              <FormControl>
                <Textarea {...field} className="min-h-[200px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        

        <Button 
          type="submit" 
          disabled={createPost.isPending}
          className="w-full"
        >
          {createPost.isPending ? t('blog.creating') : t('blog.create')}
        </Button>
      </form>
    </Form>
  );
}
