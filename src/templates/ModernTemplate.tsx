import React from 'react';
import type { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personal, summary, experience, education, skills, languages, certifications, footer } = data;
  const { themeColor, fontSize, spacing } = data.metadata;
  const photoLayout = data.metadata.photoLayout || 'none';
  const showHalfRightPhoto = photoLayout === 'half-right' && !!personal.avatar;

  return (
    <div
      className="modern-template"
      style={{
        '--accent-color': themeColor,
        '--font-size': `${fontSize}pt`,
        '--line-spacing': spacing
      } as any}
    >
      <header className={`resume-header ${showHalfRightPhoto ? 'with-photo' : ''}`}>
        <div className="header-left">
          <h1 className="name">{personal.fullName}</h1>
          <p className="title">{personal.title}</p>

          <div className="contact-info">
            {personal.email && (
              <div className="info-item">
                <Mail size={14} />
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="info-item info-phone">
                <Phone size={14} />
                <span className="phone-big">{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="info-item">
                <MapPin size={14} />
                <span>{personal.location}</span>
              </div>
            )}
            {personal.website && (
              <div className="info-item">
                <Globe size={14} />
                <span>{personal.website}</span>
              </div>
            )}
          </div>
        </div>

        {showHalfRightPhoto && (
          <div className="header-photo">
            <img src={personal.avatar} alt={`${personal.fullName} photo`} />
          </div>
        )}
      </header>

      <div className="resume-content">
        <section className="resume-section">
          <h2 className="section-title">Professional Summary</h2>
          <p className="summary-text">{summary}</p>
        </section>

        <section className="resume-section">
          <h2 className="section-title">Work Experience</h2>
          <div className="experience-list">
            {experience.map((exp) => (
              <div key={exp.id} className="experience-item">
                <div className="item-header">
                  <div className="header-left">
                    <h3 className="position">{exp.position}</h3>
                    <p className="company">{exp.company}</p>
                  </div>
                  <div className="header-right">
                    <p className="date">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </p>
                    <p className="location">{exp.location}</p>
                  </div>
                </div>
                <div className="description">
                  {exp.description.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid-2-col">
          <section className="resume-section">
            <h2 className="section-title">Education</h2>
            {education.map(edu => (
              <div key={edu.id} className="education-item">
                <h3 className="position">{edu.degree}</h3>
                <p className="company">{edu.institution}</p>
                <p className="date">{edu.startDate} — {edu.endDate}</p>
              </div>
            ))}
          </section>

          <section className="resume-section">
            <h2 className="section-title">Skills</h2>
            <div className="skills-grid">
              {skills.map((skill) => (
                <div key={skill.id} className="skill-tag">
                  {skill.name}
                </div>
              ))}
            </div>
          </section>
        </div>

        {languages.length > 0 && (
          <section className="resume-section">
            <h2 className="section-title">Languages</h2>
            <div className="skills-grid">
              {languages.map(lang => (
                <div key={lang.id} className="skill-tag">
                  {lang.name} ({lang.level})
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section className="resume-section">
            <h2 className="section-title">Certifications</h2>
            <div className="experience-list">
              {certifications.map(cert => (
                <div key={cert.id} className="certification-item">
                  <div className="item-header">
                    <div className="header-left">
                      <h3 className="position">{cert.name}</h3>
                      <p className="company">{cert.issuer}</p>
                    </div>
                    <span className="date">{cert.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {footer && (
          <footer className="resume-footer">
            <p>{footer}</p>
          </footer>
        )}
      </div>

      <style>{`
        .modern-template {
          padding: 40px;
          color: #1a1a1a;
          line-height: clamp(1.2, var(--line-spacing), 1.8);
          font-family: 'Inter', sans-serif;
          background: white;
          height: 100%;
          font-size: var(--font-size);
        }

        .resume-header {
          border-bottom: 2px solid var(--accent-color);
          padding-bottom: 20px;
          margin-bottom: 30px;
        }

        .resume-header.with-photo {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10mm;
        }

        .header-left {
          min-width: 0;
          flex: 1 1 auto;
        }

        .header-photo {
          width: 32mm;
          height: 42mm;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid rgba(0,0,0,0.08);
          flex: 0 0 auto;
        }

        .header-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .name {
          font-size: 2.2em;
          font-weight: 800;
          margin: 0;
          color: #000;
          text-transform: uppercase;
          letter-spacing: -0.5px;
        }

        .title {
          font-size: 1.25em;
          color: var(--accent-color);
          font-weight: 600;
          margin: 5px 0 15px 0;
        }

        .contact-info {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          font-size: 0.85em;
          color: #666;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .info-item.info-phone {
          font-weight: 800;
          color: #111;
        }

        .phone-big {
          font-size: 1.05em;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }

        .resume-section {
          margin-bottom: calc(20px * var(--line-spacing));
        }

        .section-title {
          font-size: 1em;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--accent-color);
          margin-bottom: 12px;
          border-bottom: 1px solid #eee;
          padding-bottom: 4px;
        }

        .summary-text {
          font-size: 0.95em;
          color: #333;
          line-height: 1.6;
          margin: 0;
        }

        .experience-item {
          margin-bottom: 25px;
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }

        .position {
          font-size: 1.1em;
          font-weight: 700;
          margin: 0;
        }

        .company {
          font-size: 0.95em;
          font-weight: 500;
          color: #444;
          margin: 0;
        }

        .date {
          font-size: 0.85em;
          font-weight: 600;
          color: #666;
        }

        .description {
          font-size: 0.9em;
          color: #444;
          margin-top: 8px;
          line-height: 1.6;
        }

        .description p {
           margin-bottom: 6px;
        }

        .grid-2-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skill-tag {
          background: #f0f0f0;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.8em;
          font-weight: 600;
          color: #333;
        }

        .education-item {
          margin-bottom: 12px;
        }

        .resume-footer {
          margin-top: 30px;
          padding-top: 15px;
          border-top: 1px solid #eee;
          text-align: center;
          font-style: italic;
          font-size: 0.85em;
          color: #666;
        }
      `}</style>
    </div>
  );
};
