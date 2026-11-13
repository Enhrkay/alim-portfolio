import { createClient } from "@/lib/supabase/server";
import type {
  AnalyticsProject,
  Playlist,
  Profile,
  Project,
  SectionSetting,
  ShowcaseMedia,
  Theme,
} from "@/lib/types";
import { PublicPortfolio } from "@/components/PublicPortfolio";

const fallbackProfile: Profile = {
  id: "fallback",
  full_name: "Alim Abdulwasiu",
  role: "AI Automation Engineer & Data Strategy Consultant",
  tagline: "I design intelligent automation systems, digital products and data-driven solutions that help organisations reduce manual work, make better decisions and scale operations.",
  bio: "I work at the intersection of automation, data and practical learning. My work includes end-to-end automation, AI-enabled workflows, process design, digital products, analytics and practical technical training.",
  email: null,
  linkedin_url: null,
  github_url: null,
  youtube_url: null,
  cv_url: null,
  logo_url: null,
  headshot_url: null,
};

export default async function Home() {
  const supabase = await createClient();

  const [
    { data: profileData },
    { data: themeData },
    { data: projectData },
    { data: playlistData },
    { data: analyticsData },
    { data: showcaseData },
    { data: sectionData },
  ] = await Promise.all([
    supabase.from("profile").select("*").limit(1).maybeSingle(),
    supabase.from("theme").select("*").limit(1).maybeSingle(),
    supabase.from("projects").select("*").eq("status", "published").order("sort_order"),
    supabase.from("playlists").select("*").eq("status", "published").order("sort_order"),
    supabase.from("analytics_projects").select("*").eq("status", "published").order("sort_order"),
    supabase.from("showcase_media").select("*").eq("status", "published").order("sort_order"),
    supabase.from("section_settings").select("*").order("sort_order"),
  ]);

  return (
    <PublicPortfolio
      profile={(profileData as Profile | null) ?? fallbackProfile}
      theme={(themeData as Theme | null) ?? null}
      projects={(projectData as Project[] | null) ?? []}
      playlists={(playlistData as Playlist[] | null) ?? []}
      analytics={(analyticsData as AnalyticsProject[] | null) ?? []}
      showcase={(showcaseData as ShowcaseMedia[] | null) ?? []}
      sections={(sectionData as SectionSetting[] | null) ?? []}
    />
  );
}
