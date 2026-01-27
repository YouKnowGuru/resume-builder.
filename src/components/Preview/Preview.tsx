import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { ModernTemplate } from '../../templates/ModernTemplate';
import { CorporateTemplate } from '../../templates/CorporateTemplate';
import { CreativeTemplate } from '../../templates/CreativeTemplate';

export const Preview: React.FC = () => {
    const { resume } = useResumeStore();

    const renderTemplate = () => {
        switch (resume.metadata.template) {
            case 'corporate':
                return <CorporateTemplate data={resume} />;
            case 'creative':
                return <CreativeTemplate data={resume} />;
            case 'modern':
            default:
                return <ModernTemplate data={resume} />;
        }
    };

    return (
        <div className="preview-content">
            {renderTemplate()}

            <style>{`
        .preview-content {
          width: 100%;
          height: 100%;
        }
      `}</style>
        </div>
    );
};
