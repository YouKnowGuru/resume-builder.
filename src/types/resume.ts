export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  website?: string;
  github?: string;
  linkedin?: string;
  avatar?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5 or percentage
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
  technologies: string[];
}

export interface Language {
  id: string;
  name: string;
  level: string; // e.g., Native, Fluent, Intermediate
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export type SectionType =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'languages'
  | 'certifications'
  | 'custom';

export interface ResumeSection {
  id: string;
  type: SectionType;
  title: string;
  visible: boolean;
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  languages: Language[];
  certifications: Certification[];
  footer: string;
  sections: ResumeSection[];
  metadata: {
    template: string;
    themeColor: string;
    fontFamily: string;
    fontSize: number; // in pt or px
    spacing: number;  // multiplier
    updatedAt: number;
  };
}
