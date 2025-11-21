import { ResumeData } from "@/types/resume";

interface MinimalTemplateProps {
  data: ResumeData;
}

export default function MinimalTemplate({ data }: MinimalTemplateProps) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="space-y-8 text-gray-900 font-serif">
      {/* Header */}
      <div className="text-center border-b border-gray-300 pb-4">
        <h1 className="text-3xl font-light tracking-wide">{personalInfo.fullName || "Your Name"}</h1>
        <div className="mt-2 text-sm text-gray-600 space-x-3">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
        </div>
        {(personalInfo.linkedin || personalInfo.website) && (
          <div className="mt-1 text-sm text-gray-600 space-x-3">
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.website && <span>• {personalInfo.website}</span>}
          </div>
        )}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div>
          <p className="text-gray-700 text-center italic">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <h2 className="text-lg font-light uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{exp.position}</p>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </p>
                </div>
                <p className="mt-2 text-sm text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <h2 className="text-lg font-light uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <p className="font-medium">{edu.degree} in {edu.field}</p>
                  <p className="text-sm text-gray-600">{edu.school}</p>
                  {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                </div>
                <p className="text-sm text-gray-500">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-lg font-light uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
            Skills
          </h2>
          <p className="text-sm text-gray-700">
            {skills.map((skill) => skill.name).join(" • ")}
          </p>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <h2 className="text-lg font-light uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <p className="font-medium">{project.name}</p>
                <p className="text-sm text-gray-700 mt-1">{project.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {project.technologies.join(" • ")}
                </p>
                {project.url && (
                  <a href={project.url} className="text-xs text-gray-600 hover:underline">
                    {project.url}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
