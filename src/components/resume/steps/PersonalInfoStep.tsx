import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ResumeData } from "@/types/resume";

interface PersonalInfoStepProps {
  data: ResumeData;
  onUpdate: (data: ResumeData) => void;
}

export default function PersonalInfoStep({ data, onUpdate }: PersonalInfoStepProps) {
  const updateField = (field: keyof ResumeData['personalInfo'], value: string) => {
    onUpdate({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={data.personalInfo.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={data.personalInfo.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="john@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            value={data.personalInfo.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="+1 (555) 000-0000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={data.personalInfo.location}
            onChange={(e) => updateField('location', e.target.value)}
            placeholder="San Francisco, CA"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
          <Input
            id="linkedin"
            value={data.personalInfo.linkedin}
            onChange={(e) => updateField('linkedin', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website (Optional)</Label>
          <Input
            id="website"
            value={data.personalInfo.website}
            onChange={(e) => updateField('website', e.target.value)}
            placeholder="johndoe.com"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary (Optional)</Label>
        <Textarea
          id="summary"
          value={data.personalInfo.summary}
          onChange={(e) => updateField('summary', e.target.value)}
          placeholder="A brief summary of your professional background and goals..."
          rows={4}
        />
      </div>
    </div>
  );
}
