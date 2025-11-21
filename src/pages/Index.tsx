import { useState } from "react";
import { ResumeData, ResumeTemplate } from "@/types/resume";
import ResumeForm from "@/components/resume/ResumeForm";
import ResumePreview from "@/components/resume/ResumePreview";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const initialData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
    summary: "",
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
};

export default function Index() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [template, setTemplate] = useState<ResumeTemplate>("modern");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-resume", {
        body: { resumeData },
      });

      if (error) throw error;

      const { suggestions, missingSections, keywords, improvements } = data;

      let message = "";
      if (suggestions?.length > 0) {
        message += `Suggestions: ${suggestions.join(", ")}\n\n`;
      }
      if (missingSections?.length > 0) {
        message += `Missing Sections: ${missingSections.join(", ")}\n\n`;
      }
      if (keywords?.length > 0) {
        message += `Keywords to Add: ${keywords.join(", ")}\n\n`;
      }
      if (improvements?.length > 0) {
        message += `Improvements: ${improvements.join(", ")}`;
      }

      toast({
        title: "AI Analysis Complete",
        description: message || "Your resume looks great!",
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExport = async () => {
    try {
      const element = document.getElementById("resume-preview");
      if (!element) throw new Error("Resume preview not found");

      toast({
        title: "Generating PDF...",
        description: "Please wait while we create your resume.",
      });

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("resume.pdf");

      toast({
        title: "PDF Generated!",
        description: "Your resume has been downloaded.",
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export Failed",
        description: "Unable to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8" />
            <h1 className="text-4xl md:text-5xl font-bold">Smart Resume Generator</h1>
          </div>
          <p className="text-lg md:text-xl opacity-90">
            Create professional resumes with AI-powered suggestions
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="space-y-6">
            <ResumeForm
              data={resumeData}
              onUpdate={setResumeData}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />
          </div>

          {/* Right: Preview */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <ResumePreview
              data={resumeData}
              template={template}
              onTemplateChange={setTemplate}
              onExport={handleExport}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
