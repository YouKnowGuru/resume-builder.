import React from 'react';
import { User } from 'lucide-react';
import { EditorSection } from './EditorSection';
import { useResumeStore } from '../../store/useResumeStore';

export const PersonalEditor: React.FC = () => {
    const { resume, updatePersonal, setPhotoLayout } = useResumeStore();
    const { personal } = resume;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        updatePersonal({ [name]: value });
    };

    const handleAvatarUpload = async (file?: File | null) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) return;

        // Store as data URL so preview/export works without external hosting.
        const dataUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result || ''));
            reader.onerror = () => reject(new Error('Failed to read image'));
            reader.readAsDataURL(file);
        });

        updatePersonal({ avatar: dataUrl });
        // Convenience: if user uploads a photo, enable the half-right layout by default.
        setPhotoLayout('half-left');
    };

    return (
        <EditorSection title="Personal Information" icon={User}>
            <div className="form-grid">
                <div className="form-group full-width">
                    <label>Photo (optional)</label>
                    <div className="avatar-row">
                        <div className="avatar-preview" aria-label="Photo preview">
                            {personal.avatar ? (
                                <img src={personal.avatar} alt="Profile photo" />
                            ) : (
                                <span className="avatar-placeholder">No photo</span>
                            )}
                        </div>

                        <div className="avatar-actions">
                            <label className="btn-outline avatar-upload">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleAvatarUpload(e.target.files?.[0])}
                                />
                                Upload photo
                            </label>
                            {personal.avatar && (
                                <button
                                    type="button"
                                    className="btn-outline avatar-remove"
                                    onClick={() => updatePersonal({ avatar: undefined })}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    </div>
                    <small className="help-text">
                        Tip: use a clear headshot; it will be placed on the left when “Half photo” is enabled.
                    </small>
                </div>

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

        .avatar-row {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .avatar-preview {
          width: 84px;
          height: 84px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid var(--border);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
        }

        body.dark .avatar-preview {
          background: rgba(20, 20, 20, 0.5);
        }

        .avatar-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .avatar-placeholder {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .avatar-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .avatar-upload input[type="file"] {
          display: none;
        }

        .help-text {
          color: var(--text-muted);
          font-size: 0.75rem;
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
