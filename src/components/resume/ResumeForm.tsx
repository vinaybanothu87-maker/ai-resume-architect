import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { ResumeData } from "@/types/resume";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import ExperienceStep from "./steps/ExperienceStep";
import EducationStep from "./steps/EducationStep";
import SkillsStep from "./steps/SkillsStep";
import ProjectsStep from "./steps/ProjectsStep";

interface ResumeFormProps {
  data: ResumeData;
  onUpdate: (data: ResumeData) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

const steps = [
  { id: 1, title: "Personal Info", component: PersonalInfoStep },
  { id: 2, title: "Experience", component: ExperienceStep },
  { id: 3, title: "Education", component: EducationStep },
  { id: 4, title: "Skills", component: SkillsStep },
  { id: 5, title: "Projects", component: ProjectsStep },
];

export default function ResumeForm({ data, onUpdate, onAnalyze, isAnalyzing }: ResumeFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">
            Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
          </h3>
          <Button
            onClick={onAnalyze}
            disabled={isAnalyzing}
            size="sm"
            className="gap-2"
          >
            <Sparkles className="h-4 w-4" />
            {isAnalyzing ? "Analyzing..." : "AI Suggestions"}
          </Button>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="p-6">
        <CurrentStepComponent data={data} onUpdate={onUpdate} />
      </Card>

      <div className="flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          variant="outline"
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentStep === steps.length}
          className="gap-2"
        >
          Next
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
