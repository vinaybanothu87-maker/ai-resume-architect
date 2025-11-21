import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { ResumeData, Education } from "@/types/resume";

interface EducationStepProps {
  data: ResumeData;
  onUpdate: (data: ResumeData) => void;
}

export default function EducationStep({ data, onUpdate }: EducationStepProps) {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
    onUpdate({
      ...data,
      education: [...data.education, newEducation],
    });
  };

  const removeEducation = (id: string) => {
    onUpdate({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onUpdate({
      ...data,
      education: data.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  return (
    <div className="space-y-6">
      {data.education.map((edu, index) => (
        <div key={edu.id} className="space-y-4 p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Education {index + 1}</h4>
            <Button
              onClick={() => removeEducation(edu.id)}
              variant="ghost"
              size="icon"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>School *</Label>
              <Input
                value={edu.school}
                onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                placeholder="University Name"
              />
            </div>
            <div className="space-y-2">
              <Label>Degree *</Label>
              <Input
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                placeholder="Bachelor of Science"
              />
            </div>
            <div className="space-y-2">
              <Label>Field of Study *</Label>
              <Input
                value={edu.field}
                onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                placeholder="Computer Science"
              />
            </div>
            <div className="space-y-2">
              <Label>GPA (Optional)</Label>
              <Input
                value={edu.gpa}
                onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                placeholder="3.8/4.0"
              />
            </div>
            <div className="space-y-2">
              <Label>Start Date *</Label>
              <Input
                type="month"
                value={edu.startDate}
                onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>End Date *</Label>
              <Input
                type="month"
                value={edu.endDate}
                onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
      <Button onClick={addEducation} variant="outline" className="w-full gap-2">
        <Plus className="h-4 w-4" />
        Add Education
      </Button>
    </div>
  );
}
