import { ResumeData } from "@/types/resume";

interface ProfessionalTemplateProps {
  data: ResumeData;
}

export default function ProfessionalTemplate({ data }: ProfessionalTemplateProps) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="text-gray-900">
      {/* Header */}
      <div className="bg-gray-900 text-white p-6 -m-8 mb-6">
        <h1 className="text-3xl font-bold">{personalInfo.fullName || "Your Name"}</h1>
        <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
          {personalInfo.email && <div>Email: {personalInfo.email}</div>}
          {personalInfo.phone && <div>Phone: {personalInfo.phone}</div>}
          {personalInfo.location && <div>Location: {personalInfo.location}</div>}
          {personalInfo.linkedin && <div>LinkedIn: {personalInfo.linkedin}</div>}
          {personalInfo.website && <div>Website: {personalInfo.website}</div>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase mb-2 pb-1 border-b-2 border-gray-900">
            Professional Summary
          </h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase mb-2 pb-1 border-b-2 border-gray-900">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{exp.position}</h3>
                    <p className="text-gray-600 text-sm">{exp.company}</p>
                  </div>
                  <p className="text-sm text-gray-500 whitespace-nowrap ml-4">
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
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase mb-2 pb-1 border-b-2 border-gray-900">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-600 text-sm">{edu.school}</p>
                  {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                </div>
                <p className="text-sm text-gray-500 whitespace-nowrap ml-4">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase mb-2 pb-1 border-b-2 border-gray-900">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {skills.map((skill) => (
              <div key={skill.id} className="flex justify-between">
                <span className="text-sm">{skill.name}</span>
                <span className="text-sm text-gray-500 capitalize">{skill.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 uppercase mb-2 pb-1 border-b-2 border-gray-900">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold">{project.name}</h3>
                <p className="text-sm text-gray-700 mt-1">{project.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Technologies: {project.technologies.join(", ")}
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
