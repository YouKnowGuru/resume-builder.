import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { EditorSection } from './EditorSection';
import { useResumeStore } from '../../store/useResumeStore';

export const ExperienceEditor: React.FC = () => {
  const { resume, addExperience, updateExperience, removeExperience } = useResumeStore();
  const { experience } = resume;

  return (
    <div id="editor-experience">
      <EditorSection title="Work Experience" icon={Briefcase}>
        <div className="section-list">
          <AnimatePresence mode="popLayout">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="item-card glass animate-fade-in"
              >
                <div className="item-header">
                  <span className="item-number" style={{ color: 'var(--secondary)', fontWeight: 800 }}>#{index + 1}</span>
                  <button
                    className="delete-btn"
                    onClick={() => removeExperience(exp.id)}
                    title="Remove Item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateExperience(exp.id, { company: e.target.value })}
                      placeholder="e.g. Google"
                    />
                  </div>

                  <div className="form-group">
                    <label>Position</label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateExperience(exp.id, { position: e.target.value })}
                      placeholder="e.g. Software Engineer"
                    />
                  </div>

                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateExperience(exp.id, { startDate: e.target.value })}
                      placeholder="MM/YYYY"
                    />
                  </div>

                  <div className="form-group">
                    <label>End Date</label>
                    <div className="date-input-wrapper">
                      <input
                        type="text"
                        value={exp.current ? 'Present' : exp.endDate}
                        disabled={exp.current}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateExperience(exp.id, { endDate: e.target.value })}
                        placeholder="MM/YYYY or Present"
                      />
                      <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateExperience(exp.id, { current: e.target.checked })}
                          style={{ width: 'auto' }}
                        />
                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Current Position</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label>Description / Achievements</label>
                    <textarea
                      rows={4}
                      value={exp.description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateExperience(exp.id, { description: e.target.value })}
                      placeholder="• Accomplished X as measured by Y by doing Z..."
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="btn-add full-width"
          onClick={addExperience}
        >
          <Plus size={18} />
          <span>Add Work Experience</span>
        </motion.button>
      </EditorSection>
    </div>
  );
};
