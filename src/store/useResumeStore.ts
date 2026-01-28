import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
    ResumeData,
    PersonalInfo,
    Experience,
    Education,
    Skill,
    Project,
    Language,
    Certification
} from '../types/resume';
import { initialResumeState } from './initialState';

interface ResumeStore {
    resume: ResumeData;
    setResume: (resume: ResumeData) => void;
    updatePersonal: (personal: Partial<PersonalInfo>) => void;
    updateSummary: (summary: string) => void;
    updateFooter: (footer: string) => void;

    // Experience
    addExperience: () => void;
    updateExperience: (id: string, experience: Partial<Experience>) => void;
    removeExperience: (id: string) => void;

    // Education
    addEducation: () => void;
    updateEducation: (id: string, education: Partial<Education>) => void;
    removeEducation: (id: string) => void;

    // Skills
    addSkill: () => void;
    updateSkill: (id: string, skill: Partial<Skill>) => void;
    removeSkill: (id: string) => void;

    // Projects
    addProject: () => void;
    updateProject: (id: string, project: Partial<Project>) => void;
    removeProject: (id: string) => void;

    // Languages
    addLanguage: () => void;
    updateLanguage: (id: string, language: Partial<Language>) => void;
    removeLanguage: (id: string) => void;

    // Certifications
    addCertification: () => void;
    updateCertification: (id: string, certification: Partial<Certification>) => void;
    removeCertification: (id: string) => void;

    // Settings
    setTemplate: (template: string) => void;
    setThemeColor: (color: string) => void;
    setFontSize: (size: number) => void;
    setSpacing: (spacing: number) => void;
    setPhotoLayout: (layout: 'none' | 'half-right') => void;

    // App Theme
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

export const useResumeStore = create<ResumeStore>()(
    persist(
        (set) => ({
            resume: initialResumeState,

            setResume: (resume: ResumeData) => set({ resume }),

            updatePersonal: (personal: Partial<PersonalInfo>) => set((state: ResumeStore) => ({
                resume: {
                    ...state.resume,
                    personal: { ...state.resume.personal, ...personal }
                }
            })),

            updateSummary: (summary: string) => set((state: ResumeStore) => ({
                resume: { ...state.resume, summary }
            })),

            updateFooter: (footer: string) => set((state: ResumeStore) => ({
                resume: { ...state.resume, footer }
            })),

            addExperience: () => set((state: ResumeStore) => ({
                resume: {
                    ...state.resume,
                    experience: [
                        ...state.resume.experience,
                        { id: crypto.randomUUID(), company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: '' }
                    ]
                }
            })),

            updateExperience: (id: string, exp: Partial<Experience>) => set((state: ResumeStore) => ({
                resume: {
                    ...state.resume,
                    experience: state.resume.experience.map((e: Experience) => e.id === id ? { ...e, ...exp } : e)
                }
            })),

            removeExperience: (id: string) => set((state: ResumeStore) => ({
                resume: {
                    ...state.resume,
                    experience: state.resume.experience.filter((e: Experience) => e.id !== id)
                }
            })),

            addEducation: () => set((state: ResumeStore) => ({
                resume: {
                    ...state.resume,
                    education: [
                        ...state.resume.education,
                        { id: crypto.randomUUID(), institution: '', degree: '', field: '', location: '', startDate: '', endDate: '', gpa: '' }
                    ]
                }
            })),

            updateEducation: (id: string, edu: Partial<Education>) => set((state: ResumeStore) => ({
                resume: {
                    ...state.resume,
                    education: state.resume.education.map((e: Education) => e.id === id ? { ...e, ...edu } : e)
                }
            })),

            removeEducation: (id: string) => set((state: ResumeStore) => ({
                resume: {
                    ...state.resume,
                    education: state.resume.education.filter((e: Education) => e.id !== id)
                }
            })),

            addSkill: () => set((state: ResumeStore) => ({
                resume: {
                    ...state.resume,
                    skills: [
                        ...state.resume.skills,
                        { id: crypto.randomUUID(), name: '', level: 50 }
                    ]
                }
            })),

            updateSkill: (id: string, skill: Partial<Skill>) => set((state: ResumeStore) => ({
                resume: {
                    ...state.resume,
                    skills: state.resume.skills.map((s: Skill) => s.id === id ? { ...s, ...skill } : s)
                }
            })),

            removeSkill: (id: string) => set((state: ResumeStore) => ({
                resume: {
                    ...state.resume,
                    skills: state.resume.skills.filter((s: Skill) => s.id !== id)
                }
            })),

            addProject: () => set((state: ResumeStore) => ({
                resume: {
                    ...state.resume,
                    projects: [
                        ...state.resume.projects,
                        { id: crypto.randomUUID(), name: '', description: '', technologies: [] }
                    ]
                }
            })),

            updateProject: (id: string, project: Partial<Project>) => set((state: ResumeStore) => ({
                resume: {
                    ...state.resume,
                    projects: state.resume.projects.map((p: Project) => p.id === id ? { ...p, ...project } : p)
                }
            })),

            removeProject: (id: string) => set((state: ResumeStore) => ({
                resume: {
                    ...state.resume,
                    projects: state.resume.projects.filter((p: Project) => p.id !== id)
                }
            })),

            addLanguage: () => set((state: ResumeStore) => ({
                resume: {
                    ...state.resume,
                    languages: [
                        ...state.resume.languages,
                        { id: crypto.randomUUID(), name: '', level: 'Intermediate' }
                    ]
                }
            })),

            updateLanguage: (id: string, lang: Partial<Language>) => set((state: ResumeStore) => ({
                resume: {
                    ...state.resume,
                    languages: state.resume.languages.map((l: Language) => l.id === id ? { ...l, ...lang } : l)
                }
            })),

            removeLanguage: (id: string) => set((state: ResumeStore) => ({
                resume: {
                    ...state.resume,
                    languages: state.resume.languages.filter((l: Language) => l.id !== id)
                }
            })),

            addCertification: () => set((state: ResumeStore) => ({
                resume: {
                    ...state.resume,
                    certifications: [
                        ...state.resume.certifications,
                        { id: crypto.randomUUID(), name: '', issuer: '', date: '' }
                    ]
                }
            })),

            updateCertification: (id: string, cert: Partial<Certification>) => set((state: ResumeStore) => ({
                resume: {
                    ...state.resume,
                    certifications: state.resume.certifications.map((c: Certification) => c.id === id ? { ...c, ...cert } : c)
                }
            })),

            removeCertification: (id: string) => set((state: ResumeStore) => ({
                resume: {
                    ...state.resume,
                    certifications: state.resume.certifications.filter((c: Certification) => c.id !== id)
                }
            })),

            setTemplate: (template: string) => set((state: ResumeStore) => ({
                resume: {
                    ...state.resume,
                    metadata: { ...state.resume.metadata, template }
                }
            })),

            setThemeColor: (color: string) => set((state: ResumeStore) => ({
                resume: {
                    ...state.resume,
                    metadata: { ...state.resume.metadata, themeColor: color }
                }
            })),

            setFontSize: (fontSize: number) => set((state: ResumeStore) => ({
                resume: {
                    ...state.resume,
                    metadata: { ...state.resume.metadata, fontSize }
                }
            })),

            setSpacing: (spacing: number) => set((state: ResumeStore) => ({
                resume: {
                    ...state.resume,
                    metadata: { ...state.resume.metadata, spacing }
                }
            })),

            setPhotoLayout: (photoLayout: 'none' | 'half-right') => set((state: ResumeStore) => ({
                resume: {
                    ...state.resume,
                    metadata: { ...state.resume.metadata, photoLayout }
                }
            })),

            isDarkMode: false,
            toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
        }),
        {
            name: 'resume-storage',
            version: 2,
            migrate: (persistedState: any, version: number) => {
                if (version === 0) {
                    // Migration from version 0 to 1
                    return {
                        ...persistedState,
                        resume: {
                            ...persistedState.resume,
                            footer: persistedState.resume.footer || 'References available upon request.',
                            metadata: {
                                ...persistedState.resume.metadata,
                                fontSize: persistedState.resume.metadata.fontSize || 11,
                                spacing: persistedState.resume.metadata.spacing || 1.0,
                            }
                        }
                    };
                }
                if (version === 1) {
                    // Migration from version 1 to 2: add photoLayout default
                    return {
                        ...persistedState,
                        resume: {
                            ...persistedState.resume,
                            metadata: {
                                ...persistedState.resume.metadata,
                                photoLayout: persistedState.resume.metadata.photoLayout || 'none',
                            },
                        },
                    };
                }
                return persistedState;
            }
        }
    )
);
