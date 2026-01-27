import React from 'react';
import { AlignLeft } from 'lucide-react';
import { EditorSection } from './EditorSection';
import { useResumeStore } from '../../store/useResumeStore';

export const FooterEditor: React.FC = () => {
    const { resume, updateFooter } = useResumeStore();

    return (
        <EditorSection title="Footer" icon={AlignLeft}>
            <div className="form-group full-width">
                <label>Footer Text (e.g. References, Signature)</label>
                <textarea
                    rows={3}
                    value={resume.footer || ''}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateFooter(e.target.value)}
                    placeholder="Write anything you want at the very bottom of the resume..."
                />
            </div>
        </EditorSection>
    );
};
