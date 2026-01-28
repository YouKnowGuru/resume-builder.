import React from 'react';
import type { ResumeData } from '../types/resume';

interface TemplateProps {
  data: ResumeData;
}

export const CorporateTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personal, summary, experience, education, skills, languages, certifications, footer } = data;
  const { themeColor, fontSize, spacing } = data.metadata;
  const photoLayout = data.metadata.photoLayout || 'none';
  const showHalfRightPhoto = photoLayout === 'half-right' && !!personal.avatar;

  return (
    <div
      className="corporate-template"
      style={{
        '--font-size': `${fontSize}pt`,
        '--line-spacing': spacing
      } as any}
    >
      <header className={`resume-header ${showHalfRightPhoto ? 'with-photo' : ''}`} style={{ borderTop: `8px solid ${themeColor}` }}>
        <div className="header-main">
          <h1 className="name">{personal.fullName}</h1>
          <p className="title">{personal.title}</p>
        </div>
        <div className="contact-grid">
          <p>{personal.location} | <span className="phone-big">{personal.phone}</span> | {personal.email}</p>
          <p>{personal.linkedin} | {personal.website} | {personal.github}</p>
        </div>
        {showHalfRightPhoto && (
          <div className="header-photo">
            <img src={personal.avatar} alt={`${personal.fullName} photo`} />
          </div>
        )}
      </header>

      <div className="resume-content">
        <section className="resume-section">
          <h2 className="section-title">Professional Profile</h2>
          <p className="summary-text">{summary}</p>
        </section>

        <section className="resume-section">
          <h2 className="section-title">Experience</h2>
          <div className="experience-list">
            {experience.map((exp) => (
              <div key={exp.id} className="experience-item">
                <div className="item-header">
                  <span className="company">{exp.company}</span>
                  <span className="date">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="item-sub-header">
                  <span className="position">{exp.position}</span>
                  <span className="location">{exp.location}</span>
                </div>
                <ul className="description">
                  {exp.description.split('\n').map((line, i) => (
                    <li key={i}>{line.replace('• ', '')}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="resume-section">
          <h2 className="section-title">Education</h2>
          <div className="experience-list">
            {education.map(edu => (
              <div key={edu.id} className="experience-item">
                <div className="item-header">
                  <span className="company">{edu.institution}</span>
                  <span className="date">{edu.startDate} — {edu.endDate}</span>
                </div>
                <div className="item-sub-header">
                  <span className="position">{edu.degree} in {edu.field}</span>
                  <span className="location">{edu.location}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="resume-section">
          <h2 className="section-title">Core Competencies</h2>
          <div className="skills-grid">
            {skills.map((skill) => (
              <span key={skill.id} className="skill-item">{skill.name}</span>
            ))}
          </div>
        </section>

        {languages.length > 0 && (
          <section className="resume-section">
            <h2 className="section-title">Languages</h2>
            <div className="skills-grid">
              {languages.map(lang => (
                <span key={lang.id} className="skill-item">{lang.name} ({lang.level})</span>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section className="resume-section">
            <h2 className="section-title">Certifications</h2>
            {certifications.map(cert => (
              <div key={cert.id} className="cert-row">
                <strong>{cert.name}</strong> - {cert.issuer} ({cert.date})
              </div>
            ))}
          </section>
        )}

        {footer && (
          <footer className="resume-footer">
            <p>{footer}</p>
          </footer>
        )}
      </div>

      <style>{`
        .corporate-template {
          padding: 50px;
          color: #222;
          font-family: 'Times New Roman', serif;
          background: white;
          height: 100%;
          font-size: var(--font-size);
          line-height: clamp(1.2, var(--line-spacing), 1.8);
        }

        .resume-header {
          text-align: center;
          margin-bottom: 30px;
          padding-top: 20px;
        }

        .resume-header.with-photo {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10mm;
          text-align: left;
        }

        .header-photo {
          width: 32mm;
          height: 42mm;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid rgba(0,0,0,0.12);
          background: #fff;
          flex: 0 0 auto;
        }

        .header-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .phone-big {
          font-size: 1.05em;
          font-weight: 800;
          white-space: nowrap;
        }

        .name {
          font-size: 2.2em;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .title {
          font-size: 1.1em;
          font-style: italic;
          color: #555;
          margin-bottom: 15px;
        }

        .contact-grid {
          font-size: 0.8em;
          color: #333;
        }

        .section-title {
          font-size: 1.1em;
          font-weight: bold;
          text-transform: uppercase;
          border-bottom: 2px solid #333;
          margin-bottom: 15px;
          padding-bottom: 2px;
        }

        .resume-section {
          margin-bottom: calc(20px * var(--line-spacing));
        }

        .summary-text {
          font-size: 0.95em;
          line-height: 1.6;
          margin-bottom: 5px;
        }

        .experience-item {
          margin-bottom: 20px;
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
          font-size: 1em;
        }

        .item-sub-header {
          display: flex;
          justify-content: space-between;
          font-style: italic;
          font-size: 0.9em;
          margin-bottom: 5px;
        }

        .description {
          padding-left: 20px;
          margin-top: 8px;
          font-size: 0.9em;
          line-height: 1.5;
        }
        
        .description li {
           margin-bottom: 4px;
        }

        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 5px 15px;
        }

        .skill-item {
          font-size: 0.9em;
        }
        .skill-item::after {
          content: " •";
          margin-left: 15px;
        }
        .skill-item:last-child::after {
          content: "";
        }

        .cert-row {
           font-size: 0.9em;
           margin-bottom: 5px;
        }

        .resume-footer {
          margin-top: 40px;
          padding-top: 15px;
          border-top: 2px solid #333;
          text-align: center;
          font-style: italic;
          font-size: 0.9em;
          color: #444;
        }
      `}</style>
    </div>
  );
};
