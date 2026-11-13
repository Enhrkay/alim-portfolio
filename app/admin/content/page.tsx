import { AdminShell } from "@/components/AdminShell";
import { MediaUploader } from "@/components/MediaUploader";
import { requireAdmin } from "@/lib/auth";
import type { Playlist, Profile } from "@/lib/types";
import { savePlaylist, saveProfile } from "./actions";

export default async function ContentPage() {
  const { supabase } = await requireAdmin();

  const [{ data: profileData }, { data: playlistData }] = await Promise.all([
    supabase.from("profile").select("*").limit(1).maybeSingle(),
    supabase.from("playlists").select("*").order("sort_order"),
  ]);

  const profile = profileData as Profile | null;
  const playlists = (playlistData as Playlist[] | null) ?? [];

  return (
    <AdminShell title="Content" subtitle="Manage your identity, links, media and playlists.">
      <section className="admin-card">
        <p className="eyebrow">MEDIA UPLOAD</p>
        <h2>Upload images without touching the code.</h2>
        <p>Upload your logo, headshot or project screenshot, then copy the generated URL.</p>
        <MediaUploader />
      </section>

      <section className="admin-card">
        <h2>Profile</h2>

        <form action={saveProfile} className="form-grid">
          <label>Full Name<input name="full_name" defaultValue={profile?.full_name || "Alim Abdulwasiu"} /></label>
          <label>Professional Role<input name="role" defaultValue={profile?.role || "AI Automation Engineer & Data Strategy Consultant"} /></label>

          <label className="wide">Hero Statement<textarea name="tagline" rows={4} defaultValue={profile?.tagline || ""} /></label>
          <label className="wide">Biography<textarea name="bio" rows={6} defaultValue={profile?.bio || ""} /></label>

          <label>Email<input name="email" type="email" defaultValue={profile?.email || ""} /></label>
          <label>LinkedIn<input name="linkedin_url" defaultValue={profile?.linkedin_url || ""} /></label>
          <label>GitHub<input name="github_url" defaultValue={profile?.github_url || ""} /></label>
          <label>YouTube<input name="youtube_url" defaultValue={profile?.youtube_url || ""} /></label>
          <label>CV URL<input name="cv_url" defaultValue={profile?.cv_url || ""} /></label>
          <label>Logo URL<input name="logo_url" defaultValue={profile?.logo_url || ""} /></label>
          <label className="wide">Headshot URL<input name="headshot_url" defaultValue={profile?.headshot_url || ""} /></label>

          <div className="wide"><button className="button button-primary">Save Profile</button></div>
        </form>
      </section>

      <details className="admin-card add-panel">
        <summary>+ Add Playlist / Media Collection</summary>

        <form action={savePlaylist} className="form-grid">
          <label>
            Section
            <select name="type">
              <option value="training">Training</option>
              <option value="student">Student Work</option>
            </select>
          </label>

          <label>Label<input name="label" placeholder="Student Testimonials" /></label>
          <label className="wide">Title<input name="title" required /></label>
          <label className="wide">Description<textarea name="description" rows={4} /></label>
          <label className="wide">YouTube Playlist URL<input name="playlist_url" /></label>
          <label>Sort Order<input name="sort_order" type="number" defaultValue={0} /></label>

          <label>
            Status
            <select name="status">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>

          <div className="wide"><button className="button button-primary">Save Collection</button></div>
        </form>
      </details>

      <div className="editor-list">
        {playlists.map((item) => (
          <details className="editor-card" key={item.id}>
            <summary>
              <div><strong>{item.title}</strong><span>{item.type}</span></div>
              <span className={`status-chip ${item.status}`}>{item.status}</span>
            </summary>

            <form action={savePlaylist} className="form-grid">
              <input type="hidden" name="id" value={item.id} />

              <label>
                Section
                <select name="type" defaultValue={item.type}>
                  <option value="training">Training</option>
                  <option value="student">Student Work</option>
                </select>
              </label>

              <label>Label<input name="label" defaultValue={item.label} /></label>
              <label className="wide">Title<input name="title" defaultValue={item.title} /></label>
              <label className="wide">Description<textarea name="description" rows={4} defaultValue={item.description} /></label>
              <label className="wide">Playlist URL<input name="playlist_url" defaultValue={item.playlist_url || ""} /></label>
              <label>Sort Order<input name="sort_order" type="number" defaultValue={item.sort_order} /></label>

              <label>
                Status
                <select name="status" defaultValue={item.status}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </label>

              <div className="wide"><button className="button button-primary">Save Changes</button></div>
            </form>
          </details>
        ))}
      </div>
    </AdminShell>
  );
}
