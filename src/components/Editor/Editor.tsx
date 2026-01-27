import React from 'react';
import { PersonalEditor } from './PersonalEditor';
import { ExperienceEditor } from './ExperienceEditor';
import { EducationEditor } from './EducationEditor';
import { SkillsEditor } from './SkillsEditor';
import { LanguagesEditor } from './LanguagesEditor';
import { CertificationsEditor } from './CertificationsEditor';
import { FooterEditor } from './FooterEditor';
import { useResumeStore } from '../../store/useResumeStore';
import { Type } from 'lucide-react';
import { EditorSection } from './EditorSection';
import { AIAssistant } from './AIAssistant';

export const Editor: React.FC = () => {
    const { resume, updateSummary } = useResumeStore();

    return (
        <div className="editor-container">
            <div id="editor-personal">
                <PersonalEditor />
            </div>

            <div id="editor-summary">
                <EditorSection title="Professional Summary" icon={Type}>
                    <div className="form-group full-width">
                        <textarea
                            rows={5}
                            value={resume.summary}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateSummary(e.target.value)}
                            placeholder="Write a brief overview of your professional background and goals..."
                        />
                        <AIAssistant
                            type="summary"
                            onApply={updateSummary}
                        />
                    </div>
                </EditorSection>
            </div>

            <div id="editor-experience">
                <ExperienceEditor />
            </div>

            <div id="editor-education">
                <EducationEditor />
            </div>

            <div id="editor-skills">
                <SkillsEditor />
            </div>

            <div id="editor-languages">
                <LanguagesEditor />
            </div>

            <div id="editor-certifications">
                <CertificationsEditor />
            </div>

            <div id="editor-footer">
                <FooterEditor />
            </div>

            <style>{`
        .editor-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-bottom: 5rem;
          scroll-behavior: smooth;
        }
      `}</style>
        </div>
    );
};
