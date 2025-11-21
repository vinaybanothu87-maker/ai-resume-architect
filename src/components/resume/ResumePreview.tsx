import { ResumeData, ResumeTemplate } from "@/types/resume";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from "lucide-react";

interface ResumePreviewProps {
  data: ResumeData;
  template: ResumeTemplate;
  onTemplateChange: (template: ResumeTemplate) => void;
  onExport: () => void;
}

export default function ResumePreview({
  data,
  template,
  onTemplateChange,
  onExport,
}: ResumePreviewProps) {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'minimal':
        return <MinimalTemplate data={data} />;
      case 'professional':
        return <ProfessionalTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Select value={template} onValueChange={(value: ResumeTemplate) => onTemplateChange(value)}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="modern">Modern</SelectItem>
            <SelectItem value="minimal">Minimal</SelectItem>
            <SelectItem value="professional">Professional</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={onExport} className="gap-2">
          <Download className="h-4 w-4" />
          Export PDF
        </Button>
      </div>
      <Card className="p-8 bg-white" id="resume-preview">
        {renderTemplate()}
      </Card>
    </div>
  );
}
