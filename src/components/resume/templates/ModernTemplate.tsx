import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

interface ModernTemplateProps {
  data: ResumeData;
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="space-y-6 text-gray-900">
      {/* Header */}
      <div className="border-b-4 border-blue-600 pb-4">
        <h1 className="text-4xl font-bold text-gray-900">{personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {personalInfo.location}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-4 w-4" />
              {personalInfo.linkedin}
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              {personalInfo.website}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div>
          <h2 className="text-xl font-bold text-blue-600 mb-2">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-blue-600 mb-3">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </p>
                </div>
                <p className="mt-2 text-gray-700 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-blue-600 mb-3">Education</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-600">{edu.school}</p>
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
          <h2 className="text-xl font-bold text-blue-600 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-blue-600 mb-3">Projects</h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold text-gray-900">{project.name}</h3>
                <p className="text-gray-700 mt-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.url && (
                  <a href={project.url} className="text-sm text-blue-600 hover:underline mt-1 inline-block">
                    View Project
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
