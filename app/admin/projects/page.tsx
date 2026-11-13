import { AdminShell } from "@/components/AdminShell";
import { DeleteProject, ProjectEditor } from "@/components/ProjectEditor";
import { requireAdmin } from "@/lib/auth";
import type { Project } from "@/lib/types";

export default async function ProjectsPage() {
  const { supabase } = await requireAdmin();

  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order");

  const projects = (data as Project[] | null) ?? [];

  return (
    <AdminShell title="Projects" subtitle="Add, edit, reorder, preview and publish your work.">
      <details className="admin-card add-panel">
        <summary>+ Add New Project</summary>
        <ProjectEditor />
      </details>

      <div className="editor-list">
        {projects.map((project) => (
          <details className="editor-card" key={project.id}>
            <summary>
              <div>
                <strong>{project.title}</strong>
                <span>{project.category}</span>
              </div>
              <span className={`status-chip ${project.status}`}>{project.status}</span>
            </summary>

            <ProjectEditor project={project} />
            <DeleteProject id={project.id} />
          </details>
        ))}
      </div>
    </AdminShell>
  );
}
