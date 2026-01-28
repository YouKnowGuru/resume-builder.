import React from 'react';
import type { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const RoyalBhutanTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personal, summary, experience, education, skills, languages, certifications, footer } = data;
  const { themeColor, fontSize, spacing } = data.metadata;
  const photoLayout = data.metadata.photoLayout || 'none';
  const showHalfRightPhoto = photoLayout === 'half-right' && !!personal.avatar;

  return (
    <div
      className={`royal-template ${showHalfRightPhoto ? 'with-photo' : ''}`}
      style={{
        '--accent-color': themeColor,
        '--font-size': `${fontSize}pt`,
        '--line-spacing': spacing,
      } as any}
    >
      <aside className="royal-sidebar">
        <div className="royal-badge">
          <span className="royal-glyph">༄༅</span>
        </div>

        <div className="royal-name-block">
          <h1 className="royal-name">{personal.fullName}</h1>
          <p className="royal-title">{personal.title}</p>
        </div>

        <div className="royal-contact">
          {personal.location && (
            <div className="royal-contact-item">
              <MapPin size={12} />
              <span>{personal.location}</span>
            </div>
          )}
          {personal.phone && (
            <div className="royal-contact-item phone">
              <Phone size={12} />
              <span>{personal.phone}</span>
            </div>
          )}
          {personal.email && (
            <div className="royal-contact-item">
              <Mail size={12} />
              <span>{personal.email}</span>
            </div>
          )}
          {personal.website && (
            <div className="royal-contact-item">
              <Globe size={12} />
              <span>{personal.website}</span>
            </div>
          )}
        </div>

        {skills.length > 0 && (
          <div className="royal-sidebar-section">
            <h2 className="royal-sidebar-heading">Skills</h2>
            <div className="royal-skill-chips">
              {skills.map((s) => (
                <span key={s.id} className="royal-skill-chip">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div className="royal-sidebar-section">
            <h2 className="royal-sidebar-heading">Languages</h2>
            <div className="royal-language-list">
              {languages.map((l) => (
                <div key={l.id} className="royal-language-row">
                  <span>{l.name}</span>
                  <span className="royal-language-level">{l.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      <main className="royal-main">
        <section className="royal-section">
          <h2 className="royal-section-title">Profile</h2>
          {showHalfRightPhoto && (
            <div className="royal-inline-photo">
              <img src={personal.avatar} alt={`${personal.fullName} photo`} />
            </div>
          )}
          <p className="royal-summary">{summary}</p>
        </section>

        <section className="royal-section">
          <h2 className="royal-section-title">Experience</h2>
          <div className="royal-timeline">
            {experience.map((exp) => (
              <div key={exp.id} className="royal-timeline-item">
                <div className="royal-timeline-header">
                  <div>
                    <h3 className="royal-position">{exp.position}</h3>
                    <p className="royal-company">{exp.company}</p>
                  </div>
                  <div className="royal-meta">
                    <span className="royal-dates">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                    <span className="royal-location">{exp.location}</span>
                  </div>
                </div>
                <div className="royal-description">
                  {exp.description.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {education.length > 0 && (
          <section className="royal-section">
            <h2 className="royal-section-title">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="royal-edu-row">
                <div>
                  <h3 className="royal-position">{edu.degree}</h3>
                  <p className="royal-company">{edu.institution}</p>
                </div>
                <div className="royal-meta">
                  <span className="royal-dates">
                    {edu.startDate} — {edu.endDate}
                  </span>
                  <span className="royal-location">{edu.location}</span>
                </div>
              </div>
            ))}
          </section>
        )}

        {certifications.length > 0 && (
          <section className="royal-section">
            <h2 className="royal-section-title">Certifications</h2>
            <ul className="royal-cert-list">
              {certifications.map((c) => (
                <li key={c.id}>
                  <span className="royal-cert-name">{c.name}</span>
                  <span className="royal-cert-meta">
                    {c.issuer} · {c.date}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {footer && (
          <footer className="royal-footer">
            <p>{footer}</p>
          </footer>
        )}
      </main>

      <style>{`
        .royal-template {
          display: grid;
          grid-template-columns: 76mm 1fr;
          height: 100%;
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: var(--font-size);
          line-height: clamp(1.2, var(--line-spacing), 1.8);
          background: #ffffff;
          color: #0f172a;
        }

        .royal-inline-photo {
          float: right;
          width: 32mm;
          height: 42mm;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid rgba(15, 23, 42, 0.12);
          background: #fff;
          margin: 0 0 6mm 6mm;
        }

        .royal-inline-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .royal-sidebar {
          background: linear-gradient(180deg, #111827 0%, #1e293b 50%, #0f172a 100%);
          color: #e5e7eb;
          padding: 28px 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          border-right: 3px solid var(--accent-color);
        }

        .royal-badge {
          width: 42px;
          height: 42px;
          border-radius: 999px;
          background: conic-gradient(from 160deg, #facc15, #f97316, #b91c1c, #facc15);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
          margin-bottom: 6px;
        }

        .royal-glyph {
          font-size: 18px;
          color: #111827;
          font-weight: 700;
        }

        .royal-name-block {
          border-bottom: 1px solid rgba(148, 163, 184, 0.4);
          padding-bottom: 10px;
        }

        .royal-name {
          font-size: 1.6em;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin: 0 0 4px 0;
        }

        .royal-title {
          font-size: 0.85em;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #e5e7eb;
          opacity: 0.85;
          margin: 0;
        }

        .royal-contact {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.78em;
          margin-top: 8px;
        }

        .royal-contact-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #cbd5f5;
        }

        .royal-contact-item.phone {
          font-weight: 800;
          color: #ffffff;
        }

        .royal-contact-item.phone span {
          font-size: 1.05em;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }

        .royal-sidebar-section {
          margin-top: 10px;
        }

        .royal-sidebar-heading {
          font-size: 0.8em;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #facc15;
          margin: 0 0 6px 0;
        }

        .royal-skill-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .royal-skill-chip {
          font-size: 0.7em;
          padding: 4px 8px;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(148, 163, 184, 0.7);
        }

        .royal-language-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 0.75em;
        }

        .royal-language-row {
          display: flex;
          justify-content: space-between;
        }

        .royal-language-level {
          color: #cbd5f5;
        }

        .royal-main {
          padding: 26px 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .royal-section {
          margin-bottom: calc(14px * var(--line-spacing));
        }

        .royal-section-title {
          font-size: 0.9em;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--accent-color);
          margin: 0 0 8px 0;
          position: relative;
        }

        .royal-section-title::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, var(--accent-color), transparent);
        }

        .royal-summary {
          font-size: 0.9em;
          color: #1f2937;
          margin: 0;
        }

        .royal-timeline {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 4px;
        }

        .royal-timeline-item {
          padding-left: 14px;
          border-left: 2px solid rgba(148, 163, 184, 0.5);
        }

        .royal-timeline-header {
          display: flex;
          justify-content: space-between;
          gap: 12px;
        }

        .royal-position {
          font-size: 0.95em;
          font-weight: 700;
          margin: 0;
        }

        .royal-company {
          font-size: 0.85em;
          color: #4b5563;
          margin: 2px 0 0 0;
        }

        .royal-meta {
          text-align: right;
          font-size: 0.75em;
          color: #6b7280;
        }

        .royal-dates {
          display: block;
        }

        .royal-location {
          display: block;
        }

        .royal-description {
          margin-top: 4px;
          font-size: 0.84em;
          color: #374151;
        }

        .royal-description p {
          margin: 0 0 3px 0;
        }

        .royal-edu-row {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          font-size: 0.85em;
          margin-bottom: 8px;
        }

        .royal-cert-list {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 0.82em;
        }

        .royal-cert-list li {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 4px;
        }

        .royal-cert-name {
          font-weight: 600;
        }

        .royal-cert-meta {
          color: #6b7280;
        }

        .royal-footer {
          margin-top: 10px;
          padding-top: 8px;
          border-top: 1px dashed rgba(148, 163, 184, 0.6);
          font-size: 0.8em;
          text-align: center;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
};

