import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Plus, Trash2 } from 'lucide-react';
import { EditorSection } from './EditorSection';
import { useResumeStore } from '../../store/useResumeStore';

export const SkillsEditor: React.FC = () => {
  const { resume, addSkill, updateSkill, removeSkill } = useResumeStore();
  const { skills } = resume;

  return (
    <div id="editor-skills">
      <EditorSection title="Skills" icon={Wrench}>
        <div className="skills-editor-grid">
          <AnimatePresence>
            {skills.map((skill) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="skill-item-row"
              >
                <div className="skill-input-group">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSkill(skill.id, { name: e.target.value })}
                    placeholder="e.g. JavaScript"
                  />
                  <div className="level-slider">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={skill.level}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSkill(skill.id, { level: parseInt(e.target.value) })}
                    />
                    <span className="level-value">{skill.level}%</span>
                  </div>
                </div>
                <button
                  className="delete-btn-simple"
                  onClick={() => removeSkill(skill.id)}
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="btn-add full-width"
          onClick={addSkill}
        >
          <Plus size={18} />
          <span>Add Skill</span>
        </motion.button>

        <style>{`
          .skills-editor-grid {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .skill-item-row {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: #F1F5F9;
            border-radius: var(--radius-md);
            border: 1px solid transparent;
            transition: all 0.2s;
          }
          
          .skill-item-row:hover {
             border-color: var(--primary);
             background: white;
             box-shadow: var(--shadow-sm);
          }

          body.dark .skill-item-row {
            background: rgba(15, 23, 42, 0.9);
            border-color: rgba(148, 163, 184, 0.6);
          }

          .skill-input-group {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 1.5rem;
          }

          .skill-input-group input[type="text"] {
            flex: 1;
            background: transparent;
            border: none;
            font-weight: 700;
            color: var(--text-main);
            padding: 0.25rem;
          }

          .skill-input-group input[type="text"]:focus {
            outline: none;
            box-shadow: none;
            border-bottom: 2px solid var(--primary);
            border-radius: 0;
          }

          .level-slider {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            min-width: 150px;
          }

          .level-slider input[type="range"] {
            flex: 1;
            accent-color: var(--primary);
          }

          .level-value {
            font-size: 0.75rem;
            font-weight: 800;
            color: var(--text-muted);
            width: 35px;
          }

          .delete-btn-simple {
            color: var(--text-muted);
            opacity: 0.5;
            transition: all 0.2s;
          }

          .delete-btn-simple:hover {
            color: var(--accent);
            opacity: 1;
          }

          .btn-add {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            padding: 1.25rem;
            border: 2px dashed #E2E8F0;
            border-radius: var(--radius-lg);
            color: var(--text-muted);
            font-weight: 700;
            transition: all 0.2s;
            margin-top: 1rem;
          }

          body.dark .btn-add {
            border-color: rgba(148, 163, 184, 0.6);
          }

          .btn-add:hover {
            border-color: var(--primary);
            color: var(--primary);
            background: var(--primary-glow);
          }
        `}</style>
      </EditorSection>
    </div>
  );
};
