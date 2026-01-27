import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Plus, Trash2 } from 'lucide-react';
import { EditorSection } from './EditorSection';
import { useResumeStore } from '../../store/useResumeStore';

export const LanguagesEditor: React.FC = () => {
    const { resume, addLanguage, updateLanguage, removeLanguage } = useResumeStore();
    const { languages } = resume;

    return (
        <div id="editor-languages">
            <EditorSection title="Languages" icon={Languages}>
                <div className="section-list">
                    <AnimatePresence mode="popLayout">
                        {languages.map((lang, index) => (
                            <motion.div
                                key={lang.id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="item-card glass animate-fade-in"
                            >
                                <div className="item-header">
                                    <span className="item-number" style={{ color: 'var(--secondary)', fontWeight: 800 }}>#{index + 1}</span>
                                    <button
                                        className="delete-btn"
                                        onClick={() => removeLanguage(lang.id)}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Language</label>
                                        <input
                                            type="text"
                                            value={lang.name}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateLanguage(lang.id, { name: e.target.value })}
                                            placeholder="e.g. Dzongkha"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Proficiency</label>
                                        <select
                                            value={lang.level}
                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateLanguage(lang.id, { level: e.target.value })}
                                            className="select-input"
                                        >
                                            <option value="Native">Native</option>
                                            <option value="Fluent">Fluent</option>
                                            <option value="Professional">Professional</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Basic">Basic</option>
                                        </select>
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
                    onClick={addLanguage}
                >
                    <Plus size={18} />
                    <span>Add Language</span>
                </motion.button>

                <style>{`
          .select-input {
            padding: 0.75rem 1rem;
            background: var(--bg-main);
            border: 1px solid var(--border);
            border-radius: var(--radius-md);
            font-size: 0.9375rem;
            color: var(--text-main);
          }
        `}</style>
            </EditorSection>
        </div>
    );
};
