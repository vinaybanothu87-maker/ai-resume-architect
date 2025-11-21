import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { ResumeData, Experience } from "@/types/resume";

interface ExperienceStepProps {
  data: ResumeData;
  onUpdate: (data: ResumeData) => void;
}

export default function ExperienceStep({ data, onUpdate }: ExperienceStepProps) {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onUpdate({
      ...data,
      experience: [...data.experience, newExperience],
    });
  };

  const removeExperience = (id: string) => {
    onUpdate({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    });
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onUpdate({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  return (
    <div className="space-y-6">
      {data.experience.map((exp, index) => (
        <div key={exp.id} className="space-y-4 p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Experience {index + 1}</h4>
            <Button
              onClick={() => removeExperience(exp.id)}
              variant="ghost"
              size="icon"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Company *</Label>
              <Input
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                placeholder="Company Name"
              />
            </div>
            <div className="space-y-2">
              <Label>Position *</Label>
              <Input
                value={exp.position}
                onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                placeholder="Job Title"
              />
            </div>
            <div className="space-y-2">
              <Label>Start Date *</Label>
              <Input
                type="month"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="month"
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                disabled={exp.current}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`current-${exp.id}`}
              checked={exp.current}
              onCheckedChange={(checked) =>
                updateExperience(exp.id, 'current', checked)
              }
            />
            <Label htmlFor={`current-${exp.id}`} className="cursor-pointer">
              I currently work here
            </Label>
          </div>
          <div className="space-y-2">
            <Label>Description *</Label>
            <Textarea
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
              placeholder="Describe your responsibilities and achievements..."
              rows={4}
            />
          </div>
        </div>
      ))}
      <Button onClick={addExperience} variant="outline" className="w-full gap-2">
        <Plus className="h-4 w-4" />
        Add Experience
      </Button>
    </div>
  );
}
