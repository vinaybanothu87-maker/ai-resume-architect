import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { ResumeData, Project } from "@/types/resume";

interface ProjectsStepProps {
  data: ResumeData;
  onUpdate: (data: ResumeData) => void;
}

export default function ProjectsStep({ data, onUpdate }: ProjectsStepProps) {
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      url: '',
    };
    onUpdate({
      ...data,
      projects: [...data.projects, newProject],
    });
  };

  const removeProject = (id: string) => {
    onUpdate({
      ...data,
      projects: data.projects.filter((proj) => proj.id !== id),
    });
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onUpdate({
      ...data,
      projects: data.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    });
  };

  return (
    <div className="space-y-6">
      {data.projects.map((project, index) => (
        <div key={project.id} className="space-y-4 p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Project {index + 1}</h4>
            <Button
              onClick={() => removeProject(project.id)}
              variant="ghost"
              size="icon"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label>Project Name *</Label>
              <Input
                value={project.name}
                onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                placeholder="My Awesome Project"
              />
            </div>
            <div className="space-y-2">
              <Label>Description *</Label>
              <Textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                placeholder="Describe what the project does and your role..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Technologies (comma-separated) *</Label>
              <Input
                value={project.technologies.join(', ')}
                onChange={(e) =>
                  updateProject(
                    project.id,
                    'technologies',
                    e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                  )
                }
                placeholder="React, Node.js, PostgreSQL"
              />
            </div>
            <div className="space-y-2">
              <Label>Project URL (Optional)</Label>
              <Input
                value={project.url}
                onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                placeholder="https://github.com/username/project"
              />
            </div>
          </div>
        </div>
      ))}
      <Button onClick={addProject} variant="outline" className="w-full gap-2">
        <Plus className="h-4 w-4" />
        Add Project
      </Button>
    </div>
  );
}
