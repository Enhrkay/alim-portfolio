import type { Project } from "@/lib/types";
import { deleteProject, saveProject } from "@/app/admin/projects/actions";
import { MediaUrlField } from "@/components/MediaUrlField";

export function ProjectEditor({ project }: { project?: Project }) {
  return (
    <form action={saveProject} className="form-grid">
      {project && <input type="hidden" name="id" value={project.id} />}

      <label>Title<input name="title" defaultValue={project?.title || ""} required /></label>
      <label>Category<input name="category" defaultValue={project?.category || ""} placeholder="AI Automation" /></label>
      <label>Year<input name="year" defaultValue={project?.year || ""} /></label>
      <label>Sort Order<input name="sort_order" type="number" defaultValue={project?.sort_order ?? 0} /></label>

      <label className="wide">Description<textarea name="description" rows={4} defaultValue={project?.description || ""} /></label>
      <label className="wide">Problem<textarea name="problem" rows={3} defaultValue={project?.problem || ""} /></label>
      <label className="wide">Solution<textarea name="solution" rows={3} defaultValue={project?.solution || ""} /></label>

      <label className="wide">Tools — comma separated<input name="tools" defaultValue={(project?.tools || []).join(", ")} /></label>

      <MediaUrlField name="image_url" label="Screenshot / Project Image" defaultValue={project?.image_url || ""} />
      <label>Vercel / Live URL<input name="live_url" defaultValue={project?.live_url || ""} /></label>
      <label>YouTube Demo URL<input name="video_url" defaultValue={project?.video_url || ""} /></label>
      <label>GitHub URL<input name="github_url" defaultValue={project?.github_url || ""} /></label>

      <label>
        Preview Mode
        <select name="preview_mode" defaultValue={project?.preview_mode || "image"}>
          <option value="image">Screenshot</option>
          <option value="live">Live Website</option>
          <option value="none">No preview</option>
        </select>
      </label>

      <label>
        Status
        <select name="status" defaultValue={project?.status || "draft"}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </label>

      <label className="check">
        <input name="featured" type="checkbox" defaultChecked={project?.featured || false} />
        Featured
      </label>

      <div className="wide">
        <button className="button button-primary">
          {project ? "Save Changes" : "Add Project"}
        </button>
      </div>
    </form>
  );
}

export function DeleteProject({ id }: { id: string }) {
  return (
    <form action={deleteProject} className="danger-zone">
      <input type="hidden" name="id" value={id} />
      <button>Delete project</button>
    </form>
  );
}
