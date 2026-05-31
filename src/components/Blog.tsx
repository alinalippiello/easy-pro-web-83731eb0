import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/hooks/useLanguage";
import { useAdmin } from "@/hooks/useAdmin";
import type { Language } from "@/contexts/language";
import { toast } from "@/hooks/use-toast";

type Status = "draft" | "published";
const CATEGORIES = ["riflessione", "articolo", "progetto", "appunto"] as const;
type Category = (typeof CATEGORIES)[number];

interface BlogPost {
  id: string;
  slug: string;
  category: Category;
  status: Status;
  cover_url: string | null;
  title_it: string; title_en: string; title_es: string;
  excerpt_it: string; excerpt_en: string; excerpt_es: string;
  content_it: string; content_en: string; content_es: string;
  published_at: string | null;
  created_at: string;
}

const emptyPost = (): BlogPost => ({
  id: "",
  slug: "",
  category: "riflessione",
  status: "draft",
  cover_url: null,
  title_it: "", title_en: "", title_es: "",
  excerpt_it: "", excerpt_en: "", excerpt_es: "",
  content_it: "", content_en: "", content_es: "",
  published_at: null,
  created_at: new Date().toISOString(),
});

const pick = (post: BlogPost, lang: Language, field: "title" | "excerpt" | "content"): string => {
  const key = `${field}_${lang}` as keyof BlogPost;
  const value = post[key] as string;
  if (value && value.trim()) return value;
  // Fallback in this order: it -> en -> es
  return (post[`${field}_it` as keyof BlogPost] as string)
    || (post[`${field}_en` as keyof BlogPost] as string)
    || (post[`${field}_es` as keyof BlogPost] as string)
    || "";
};

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);

const Blog = () => {
  const { t, language } = useLanguage();
  const { isAdmin } = useAdmin();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [reading, setReading] = useState<BlogPost | null>(null);
  const [editing, setEditing] = useState<BlogPost | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    let q = supabase.from("blog_posts").select("*");
    if (!isAdmin) q = q.eq("status", "published");
    const { data, error } = await q.order("published_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });
    if (error) {
      console.error(error);
      toast({ title: "Errore", description: error.message, variant: "destructive" });
    } else {
      setPosts((data ?? []) as BlogPost[]);
    }
    setLoading(false);
  }, [isAdmin]);

  useEffect(() => { load(); }, [load]);

  const startNew = () => setEditing(emptyPost());

  const onSave = async (draft: BlogPost, publish?: boolean) => {
    const slug = draft.slug?.trim() || slugify(draft.title_it || draft.title_en || draft.title_es || "post");
    const status: Status = publish === undefined ? draft.status : publish ? "published" : "draft";
    const payload = {
      slug,
      category: draft.category,
      status,
      cover_url: draft.cover_url,
      title_it: draft.title_it, title_en: draft.title_en, title_es: draft.title_es,
      excerpt_it: draft.excerpt_it, excerpt_en: draft.excerpt_en, excerpt_es: draft.excerpt_es,
      content_it: draft.content_it, content_en: draft.content_en, content_es: draft.content_es,
      published_at: status === "published" ? (draft.published_at ?? new Date().toISOString()) : null,
    };

    let error;
    if (draft.id) {
      ({ error } = await supabase.from("blog_posts").update(payload).eq("id", draft.id));
    } else {
      ({ error } = await supabase.from("blog_posts").insert(payload));
    }
    if (error) {
      toast({ title: "Errore", description: error.message, variant: "destructive" });
      return;
    }
    setEditing(null);
    await load();
  };

  const onDelete = async (id: string) => {
    if (!confirm(t("blog.confirmDelete"))) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      toast({ title: "Errore", description: error.message, variant: "destructive" });
      return;
    }
    await load();
  };

  const visiblePosts = posts;

  return (
    <section id="blog" className="py-20 md:py-28 border-t border-border">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3 text-center">
            {t("blog.title")}
          </h2>
          <p className="font-body text-sm text-muted-foreground mb-8 text-center">
            {t("blog.subtitle")}
          </p>
          {isAdmin && (
            <div className="flex justify-center mb-12">
              <button
                onClick={startNew}
                className="font-body text-xs tracking-widest uppercase underline underline-offset-4 hover:opacity-60"
              >
                + {t("blog.new")}
              </button>
            </div>
          )}

          {loading ? (
            <p className="font-body text-sm text-muted-foreground text-center">…</p>
          ) : visiblePosts.length === 0 ? (
            <p className="font-body text-sm text-muted-foreground text-center">{t("blog.empty")}</p>
          ) : (
            <ul className="divide-y divide-border border-t border-border">
              {visiblePosts.map((post) => {
                const title = pick(post, language, "title") || "—";
                const excerpt = pick(post, language, "excerpt");
                const date = post.published_at ?? post.created_at;
                return (
                  <li key={post.id} className="group relative">
                    <button
                      type="button"
                      onClick={() => setReading(post)}
                      aria-label={title}
                      className="block text-left w-full px-4 md:px-6 -mx-4 md:-mx-6 py-8 md:py-10 transition-smooth hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:outline-none cursor-pointer"
                    >
                      <div className="grid grid-cols-12 gap-6 md:gap-10 items-baseline">
                        <p className="col-span-12 md:col-span-3 font-body text-xs tracking-widest uppercase text-muted-foreground">
                          <time>
                            {new Date(date).toLocaleDateString(language, { year: "numeric", month: "long", day: "numeric" })}
                          </time>
                          <span className="mx-2">·</span>
                          {t(`blog.cat.${post.category}`)}
                          {post.status === "draft" && (
                            <span className="ml-2 px-1.5 py-0.5 text-[10px] uppercase tracking-wider border border-border">
                              {t("blog.draft")}
                            </span>
                          )}
                        </p>
                        <div className="col-span-12 md:col-span-9">
                          <h3 className="font-display text-2xl md:text-3xl font-normal leading-tight mb-3 transition-smooth group-hover:opacity-70">
                            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-no-repeat bg-left-bottom transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                              {title}
                            </span>
                            <span aria-hidden className="inline-block ml-3 translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-60 text-muted-foreground text-base align-middle">→</span>
                          </h3>
                          {excerpt && (
                            <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
                              {excerpt}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                    {isAdmin && (
                      <div className="flex gap-4 pb-6 text-xs">
                        <button
                          onClick={() => setEditing(post)}
                          className="font-body uppercase tracking-widest underline underline-offset-4 hover:opacity-60"
                        >
                          {t("blog.edit")}
                        </button>
                        <button
                          onClick={() => onDelete(post.id)}
                          className="font-body uppercase tracking-widest underline underline-offset-4 hover:opacity-60 text-destructive"
                        >
                          {t("blog.delete")}
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {reading && (
        <BlogReader post={reading} onClose={() => setReading(null)} />
      )}
      {editing && isAdmin && (
        <BlogEditor
          initial={editing}
          onCancel={() => setEditing(null)}
          onSave={onSave}
        />
      )}
    </section>
  );
};

const BlogReader = ({ post, onClose }: { post: BlogPost; onClose: () => void }) => {
  const { t, language } = useLanguage();
  const title = pick(post, language, "title");
  const content = pick(post, language, "content");
  const date = post.published_at ?? post.created_at;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-background overflow-y-auto animate-fade-in">
      <div className="container py-12 md:py-20 max-w-3xl">
        <button
          onClick={onClose}
          className="font-body text-xs tracking-widest uppercase underline underline-offset-4 hover:opacity-60 mb-8"
        >
          ← {t("blog.back")}
        </button>
        <p className="font-body text-xs text-muted-foreground mb-3">
          {new Date(date).toLocaleDateString(language, { year: "numeric", month: "long", day: "numeric" })}
          {" · "}
          {t(`blog.cat.${post.category}`)}
        </p>
        <h1 className="font-display text-3xl md:text-5xl leading-tight mb-8">{title}</h1>
        {post.cover_url && (
          <img
            src={post.cover_url}
            alt={title}
            className="w-full h-auto mb-10 rounded-sm"
          />
        )}
        <div className="font-body text-base md:text-lg leading-relaxed whitespace-pre-line">
          {content}
        </div>
      </div>
    </div>
  );
};

const BlogEditor = ({
  initial,
  onCancel,
  onSave,
}: {
  initial: BlogPost;
  onCancel: () => void;
  onSave: (draft: BlogPost, publish?: boolean) => void | Promise<void>;
}) => {
  const { t } = useLanguage();
  const [draft, setDraft] = useState<BlogPost>(initial);
  const [activeLang, setActiveLang] = useState<Language>("it");
  const [uploading, setUploading] = useState(false);
  const set = <K extends keyof BlogPost>(k: K, v: BlogPost[K]) => setDraft((d) => ({ ...d, [k]: v }));

  const uploadCover = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from("blog").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });
    if (error) {
      toast({ title: "Errore caricamento", description: error.message, variant: "destructive" });
    } else {
      const { data } = supabase.storage.from("blog").getPublicUrl(path);
      set("cover_url", data.publicUrl);
    }
    setUploading(false);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-background overflow-y-auto">
      <div className="container py-8 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-body text-xs tracking-[0.3em] uppercase">
            {draft.id ? t("blog.edit") : t("blog.new")}
          </h2>
          <button onClick={onCancel} className="font-body text-xs uppercase tracking-widest underline underline-offset-4">
            {t("blog.cancel")}
          </button>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">{t("blog.category")}</span>
              <select
                className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm"
                value={draft.category}
                onChange={(e) => set("category", e.target.value as Category)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{t(`blog.cat.${c}`)}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">{t("blog.slug")}</span>
              <input
                className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm"
                value={draft.slug}
                onChange={(e) => set("slug", slugify(e.target.value))}
                placeholder="auto"
              />
            </label>
          </div>

          <div>
            <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">{t("blog.cover")}</span>
            <div className="mt-1 flex items-center gap-4">
              {draft.cover_url && (
                <img src={draft.cover_url} alt="" className="w-24 h-24 object-cover rounded-sm" />
              )}
              <label className="cursor-pointer font-body text-xs uppercase tracking-widest underline underline-offset-4">
                {uploading ? "…" : t("blog.uploadCover")}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadCover(f);
                  }}
                />
              </label>
              {draft.cover_url && (
                <button
                  onClick={() => set("cover_url", null)}
                  className="font-body text-xs uppercase tracking-widest underline underline-offset-4 text-destructive"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <div className="flex gap-2 border-b border-border">
            {(["it", "en", "es"] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setActiveLang(l)}
                className={`px-3 py-2 font-body text-xs uppercase tracking-widest ${
                  activeLang === l ? "border-b-2 border-foreground -mb-px" : "text-muted-foreground"
                }`}
              >
                {t(`blog.lang.${l}`)}
              </button>
            ))}
          </div>

          {(["it", "en", "es"] as Language[]).map((l) => (
            <div key={l} className={activeLang === l ? "space-y-4" : "hidden"}>
              <label className="block">
                <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">{t("blog.titleField")}</span>
                <input
                  className="mt-1 w-full border border-border bg-background px-3 py-2 text-base"
                  value={draft[`title_${l}` as keyof BlogPost] as string}
                  onChange={(e) => set(`title_${l}` as keyof BlogPost, e.target.value as never)}
                />
              </label>
              <label className="block">
                <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">{t("blog.excerpt")}</span>
                <textarea
                  rows={3}
                  className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm"
                  value={draft[`excerpt_${l}` as keyof BlogPost] as string}
                  onChange={(e) => set(`excerpt_${l}` as keyof BlogPost, e.target.value as never)}
                />
              </label>
              <label className="block">
                <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">{t("blog.content")}</span>
                <textarea
                  rows={14}
                  className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm font-body leading-relaxed"
                  value={draft[`content_${l}` as keyof BlogPost] as string}
                  onChange={(e) => set(`content_${l}` as keyof BlogPost, e.target.value as never)}
                />
              </label>
            </div>
          ))}

          <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
            <button
              onClick={() => onSave(draft)}
              className="px-4 py-2 border border-foreground font-body text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-smooth"
            >
              {t("blog.save")}
            </button>
            {draft.status !== "published" ? (
              <button
                onClick={() => onSave(draft, true)}
                className="px-4 py-2 bg-foreground text-background font-body text-xs uppercase tracking-widest hover:opacity-80 transition-smooth"
              >
                {t("blog.publish")}
              </button>
            ) : (
              <button
                onClick={() => onSave(draft, false)}
                className="px-4 py-2 border border-border font-body text-xs uppercase tracking-widest hover:bg-muted transition-smooth"
              >
                {t("blog.unpublish")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
