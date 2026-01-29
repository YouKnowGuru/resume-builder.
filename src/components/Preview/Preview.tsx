import React, { useEffect } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { ModernTemplate } from '../../templates/ModernTemplate';
import { CorporateTemplate } from '../../templates/CorporateTemplate';
import { CreativeTemplate } from '../../templates/CreativeTemplate';
import { RoyalBhutanTemplate } from '../../templates/RoyalBhutanTemplate';
import { WatermarkOverlay } from './WatermarkOverlay';

export const Preview: React.FC = () => {
    const { resume } = useResumeStore();

    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent PrintScreen, Ctrl+P, Ctrl+S, Ctrl+C
            if (
                e.key === 'PrintScreen' ||
                (e.ctrlKey && (e.key === 'p' || e.key === 's' || e.key === 'c' || e.key === 'u')) || // u = view source
                (e.metaKey && (e.key === 'p' || e.key === 's' || e.key === 'c')) // Mac
            ) {
                e.preventDefault();
                // Optional: Show a warning toast or alert could go here
            }
        };

        const handleCopy = (e: ClipboardEvent) => {
            e.preventDefault();
        };

        const handleDragStart = (e: DragEvent) => {
            e.preventDefault();
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('copy', handleCopy);
        document.addEventListener('dragstart', handleDragStart);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('copy', handleCopy);
            document.removeEventListener('dragstart', handleDragStart);
        };
    }, []);

    const renderTemplate = () => {
        switch (resume.metadata.template) {
            case 'corporate':
                return <CorporateTemplate data={resume} />;
            case 'creative':
                return <CreativeTemplate data={resume} />;
            case 'royal-bhutan':
                return <RoyalBhutanTemplate data={resume} />;
            case 'modern':
            default:
                return <ModernTemplate data={resume} />;
        }
    };

    return (
        <div className="preview-content restricted-area">
            {renderTemplate()}
            <WatermarkOverlay />

            <style>{`
        .preview-content {
          width: 100%;
          height: auto;
          min-height: 100%;
          position: relative; /* Needed for absolute positioning of watermark */
        }
        .restricted-area {
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        }
        @media print {
            body {
                display: none !important;
            }
        }
      `}</style>
        </div>
    );
};
