export type Profile = {
  id: string;
  full_name: string;
  role: string;
  tagline: string;
  bio: string;
  email: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  youtube_url: string | null;
  cv_url: string | null;
  logo_url: string | null;
  headshot_url: string | null;
};

export type Theme = {
  id: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  background_color: string;
  surface_color: string;
  text_color: string;
  muted_color: string;
  border_color: string;
  heading_font: string;
  body_font: string;
  radius: "square" | "soft" | "rounded";
  card_style: "flat" | "soft" | "glass" | "elevated";
  animation_level: "minimal" | "elegant" | "dynamic";
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  year: string | null;
  description: string;
  problem: string | null;
  solution: string | null;
  tools: string[];
  image_url: string | null;
  live_url: string | null;
  video_url: string | null;
  github_url: string | null;
  preview_mode: "image" | "live" | "none";
  featured: boolean;
  status: "draft" | "published";
  sort_order: number;
};

export type Playlist = {
  id: string;
  type: "training" | "student";
  label: string;
  title: string;
  description: string;
  playlist_url: string | null;
  status: "draft" | "published";
  sort_order: number;
};

export type AnalyticsProject = {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  business_question: string | null;
  data_context: string | null;
  key_insight: string | null;
  tools: string[];
  image_url: string | null;
  embed_url: string | null;
  live_url: string | null;
  status: "draft" | "published";
  featured: boolean;
  sort_order: number;
};

export type ShowcaseMedia = {
  id: string;
  title: string;
  caption: string | null;
  image_url: string;
  category: string;
  status: "draft" | "published";
  sort_order: number;
};

export type SectionSetting = {
  id: string;
  section_key: string;
  enabled: boolean;
  sort_order: number;
  title_override: string | null;
};
