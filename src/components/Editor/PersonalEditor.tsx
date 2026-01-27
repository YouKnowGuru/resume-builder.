import React from 'react';
import { User } from 'lucide-react';
import { EditorSection } from './EditorSection';
import { useResumeStore } from '../../store/useResumeStore';

export const PersonalEditor: React.FC = () => {
    const { resume, updatePersonal } = useResumeStore();
    const { personal } = resume;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        updatePersonal({ [name]: value });
    };

    return (
        <EditorSection title="Personal Information" icon={User}>
            <div className="form-grid">
                <div className="form-group full-width">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={personal.fullName}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                    />
                </div>

                <div className="form-group">
                    <label>Professional Title</label>
                    <input
                        type="text"
                        name="title"
                        value={personal.title}
                        onChange={handleChange}
                        placeholder="e.g. Senior Software Engineer"
                    />
                </div>

                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={personal.email}
                        onChange={handleChange}
                        placeholder="e.g. john@example.com"
                    />
                </div>

                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        name="phone"
                        value={personal.phone}
                        onChange={handleChange}
                        placeholder="e.g. +1 (555) 000-0000"
                    />
                </div>

                <div className="form-group">
                    <label>Location</label>
                    <input
                        type="text"
                        name="location"
                        value={personal.location}
                        onChange={handleChange}
                        placeholder="e.g. San Francisco, CA"
                    />
                </div>

                <div className="form-group">
                    <label>LinkedIn</label>
                    <input
                        type="text"
                        name="linkedin"
                        value={personal.linkedin}
                        onChange={handleChange}
                        placeholder="linkedin.com/in/username"
                    />
                </div>

                <div className="form-group">
                    <label>GitHub / Portfolio</label>
                    <input
                        type="text"
                        name="website"
                        value={personal.website}
                        onChange={handleChange}
                        placeholder="github.com/username"
                    />
                </div>
            </div>

            <style>{`
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .form-group input, 
        .form-group textarea {
          padding: 0.75rem 1rem;
          background: var(--bg-main);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          font-size: 0.9375rem;
          transition: all 0.2s;
        }

        .form-group input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px var(--primary-glow);
          background: var(--bg-card);
        }
      `}</style>
        </EditorSection>
    );
};
