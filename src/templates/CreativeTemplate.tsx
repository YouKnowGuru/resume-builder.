import React from 'react';
import type { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Award } from 'lucide-react';

interface TemplateProps {
    data: ResumeData;
}

export const CreativeTemplate: React.FC<TemplateProps> = ({ data }) => {
    const { personal, summary, experience, education, skills, languages, certifications, footer } = data;
    const { themeColor, fontSize, spacing } = data.metadata;

    return (
        <div
            className="creative-template"
            style={{
                '--theme-color': themeColor,
                '--font-size': `${fontSize}pt`,
                '--line-spacing': spacing
            } as any}
        >
            <div className="sidebar-decor"></div>

            <div className="main-grid">
                <aside className="left-panel">
                    <header className="header-block">
                        <h1 className="name">{personal.fullName}</h1>
                        <p className="title">{personal.title}</p>
                    </header>

                    <section className="side-section">
                        <h2 className="side-title">Contact</h2>
                        <div className="contact-list">
                            <div className="contact-item">
                                <Mail size={14} /> <span>{personal.email}</span>
                            </div>
                            <div className="contact-item">
                                <Phone size={14} /> <span>{personal.phone}</span>
                            </div>
                            <div className="contact-item">
                                <MapPin size={14} /> <span>{personal.location}</span>
                            </div>
                            {personal.website && (
                                <div className="contact-item">
                                    <Globe size={14} /> <span>{personal.website}</span>
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="side-section">
                        <h2 className="side-title">Skills</h2>
                        <div className="skills-tags">
                            {skills.map(skill => (
                                <div key={skill.id} className="skill-bubble">
                                    {skill.name}
                                </div>
                            ))}
                        </div>
                    </section>

                    {languages.length > 0 && (
                        <section className="side-section">
                            <h2 className="side-title">Languages</h2>
                            {languages.map(lang => (
                                <div key={lang.id} className="detail-item">
                                    <span className="detail-label">{lang.name}</span>
                                    <span className="detail-value">{lang.level}</span>
                                </div>
                            ))}
                        </section>
                    )}
                </aside>

                <main className="right-panel">
                    <section className="body-section">
                        <h2 className="body-title">About Me</h2>
                        <p className="summary-text">{summary}</p>
                    </section>

                    <section className="body-section">
                        <h2 className="body-title">Experience</h2>
                        <div className="timeline">
                            {experience.map(exp => (
                                <div key={exp.id} className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <div className="timeline-header">
                                            <h3>{exp.position}</h3>
                                            <span className="timeline-date">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                                        </div>
                                        <p className="timeline-company">{exp.company}</p>
                                        <div className="timeline-desc">
                                            {exp.description.split('\n').map((line, i) => (
                                                <p key={i}>{line}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="body-section">
                        <h2 className="body-title">Education</h2>
                        {education.map(edu => (
                            <div key={edu.id} className="edu-block">
                                <h3>{edu.degree} in {edu.field}</h3>
                                <p>{edu.institution}</p>
                                <span className="edu-date">{edu.startDate} - {edu.endDate}</span>
                            </div>
                        ))}
                    </section>

                    {certifications.length > 0 && (
                        <section className="body-section">
                            <h2 className="body-title">Certifications</h2>
                            <div className="cert-grid">
                                {certifications.map(cert => (
                                    <div key={cert.id} className="cert-card">
                                        <Award size={16} className="cert-icon" />
                                        <div>
                                            <h4>{cert.name}</h4>
                                            <p>{cert.issuer} | {cert.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {footer && (
                        <footer className="resume-footer-creative">
                            <p>{footer}</p>
                        </footer>
                    )}
                </main>
            </div>

            <style>{`
        .creative-template {
          --sidebar-width: 240px;
          position: relative;
          background: #fff;
          color: #2d3436;
          font-family: 'Poppins', 'Inter', sans-serif;
          font-size: var(--font-size);
          line-height: clamp(1.2, var(--line-spacing), 1.8);
          min-height: 100%;
          overflow: hidden;
        }

        .sidebar-decor {
          position: absolute;
          top: 0;
          left: 0;
          width: 8px;
          height: 100%;
          background: var(--theme-color);
        }

        .main-grid {
          display: grid;
          grid-template-columns: var(--sidebar-width) 1fr;
          min-height: 100%;
        }

        .left-panel {
          background: #f8f9fa;
          padding: 40px 30px;
          border-right: 1px solid #edf2f7;
        }

        .right-panel {
          padding: 40px 40px;
          background: #fff;
        }

        .header-block {
          margin-bottom: 40px;
        }

        .name {
          font-size: 2.5em;
          font-weight: 800;
          line-height: 1.1;
          color: #1a202c;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: -1px;
        }

        .title {
          font-size: 1.1em;
          color: var(--theme-color);
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .side-section {
          margin-bottom: 35px;
        }

        .side-title {
          font-size: 0.85em;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #718096;
          margin-bottom: 15px;
          font-weight: 700;
        }

        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85em;
          color: #4a5568;
        }

        .skill-bubble {
          display: inline-block;
          padding: 6px 12px;
          background: #edf2f7;
          border-radius: 20px;
          font-size: 0.8em;
          font-weight: 600;
          margin-right: 8px;
          margin-bottom: 8px;
          color: #2d3748;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.85em;
          margin-bottom: 8px;
        }

        .detail-label { font-weight: 600; color: #2d3748; }
        .detail-value { color: #718096; }

        .body-title {
          font-size: 1.1em;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #1a202c;
          margin-bottom: 25px;
          font-weight: 800;
          position: relative;
        }

        .body-title::after {
          content: "";
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 40px;
          height: 3px;
          background: var(--theme-color);
        }

        .body-section {
          margin-bottom: 45px;
        }

        .summary-text {
          color: #4a5568;
          font-size: 0.95em;
          line-height: 1.6;
        }

        .timeline {
          position: relative;
          padding-left: 20px;
          border-left: 2px solid #edf2f7;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 45px;
        }

        .timeline-dot {
          position: absolute;
          left: -27px;
          top: 6px;
          width: 12px;
          height: 12px;
          background: #fff;
          border: 3px solid var(--theme-color);
          border-radius: 50%;
        }

        .timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 5px;
        }

        .timeline-header h3 {
          font-size: 1.1em;
          font-weight: 700;
          color: #2d3748;
        }

        .timeline-date {
          font-size: 0.8em;
          font-weight: 600;
          color: var(--theme-color);
        }

        .timeline-company {
          font-size: 0.9em;
          font-weight: 600;
          color: #718096;
          margin-bottom: 10px;
        }

        .timeline-desc {
          font-size: 0.9em;
          color: #4a5568;
          line-height: 1.6;
          margin-top: 5px;
        }

        .timeline-desc p {
           margin-bottom: 5px;
        }

        .edu-block {
          margin-bottom: 30px;
        }

        .edu-block h3 { font-size: 1em; font-weight: 700; color: #2d3748; }
        .edu-block p { font-size: 0.9em; color: #4a5568; }
        .edu-date { font-size: 0.8em; color: #718096; }

        .cert-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .cert-card {
          display: flex;
          gap: 12px;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .cert-icon { color: var(--theme-color); flex-shrink: 0; }
        .cert-card h4 { font-size: 0.85em; font-weight: 700; color: #2d3748; margin-bottom: 2px; }
        .cert-card p { font-size: 0.75em; color: #718096; }

        .resume-footer-creative {
          margin-top: 50px;
          padding: 20px;
          border-top: 2px dashed #edf2f7;
          text-align: center;
          font-style: italic;
          font-size: 0.9em;
          color: #718096;
          background: #f8f9fa;
          border-radius: 12px;
        }
      `}</style>
        </div>
    );
};
