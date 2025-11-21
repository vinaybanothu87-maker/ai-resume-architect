import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { ResumeData, Skill } from "@/types/resume";

interface SkillsStepProps {
  data: ResumeData;
  onUpdate: (data: ResumeData) => void;
}

export default function SkillsStep({ data, onUpdate }: SkillsStepProps) {
  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'intermediate',
    };
    onUpdate({
      ...data,
      skills: [...data.skills, newSkill],
    });
  };

  const removeSkill = (id: string) => {
    onUpdate({
      ...data,
      skills: data.skills.filter((skill) => skill.id !== id),
    });
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    onUpdate({
      ...data,
      skills: data.skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    });
  };

  return (
    <div className="space-y-6">
      {data.skills.map((skill, index) => (
        <div key={skill.id} className="flex items-end gap-4">
          <div className="flex-1 space-y-2">
            <Label>Skill {index + 1} *</Label>
            <Input
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
              placeholder="e.g., JavaScript, Project Management"
            />
          </div>
          <div className="w-40 space-y-2">
            <Label>Level *</Label>
            <Select
              value={skill.level}
              onValueChange={(value) => updateSkill(skill.id, 'level', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={() => removeSkill(skill.id)}
            variant="ghost"
            size="icon"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button onClick={addSkill} variant="outline" className="w-full gap-2">
        <Plus className="h-4 w-4" />
        Add Skill
      </Button>
    </div>
  );
}
