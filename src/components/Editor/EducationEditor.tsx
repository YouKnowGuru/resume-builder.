import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { EditorSection } from './EditorSection';
import { useResumeStore } from '../../store/useResumeStore';

export const EducationEditor: React.FC = () => {
    const { resume, addEducation, updateEducation, removeEducation } = useResumeStore();
    const { education } = resume;

    return (
        <div id="editor-education">
            <EditorSection title="Education" icon={GraduationCap}>
                <div className="section-list">
                    <AnimatePresence mode="popLayout">
                        {education.map((edu, index) => (
                            <motion.div
                                key={edu.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="item-card glass animate-fade-in"
                            >
                                <div className="item-header">
                                    <span className="item-number" style={{ color: 'var(--secondary)', fontWeight: 800 }}>#{index + 1}</span>
                                    <button
                                        className="delete-btn"
                                        onClick={() => removeEducation(edu.id)}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>School / University</label>
                                        <input
                                            type="text"
                                            value={edu.institution}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEducation(edu.id, { institution: e.target.value })}
                                            placeholder="e.g. Royal University of Bhutan"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Degree</label>
                                        <input
                                            type="text"
                                            value={edu.degree}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEducation(edu.id, { degree: e.target.value })}
                                            placeholder="e.g. Bachelor of Science"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Field of Study</label>
                                        <input
                                            type="text"
                                            value={edu.field}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEducation(edu.id, { field: e.target.value })}
                                            placeholder="e.g. Computer Science"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>GPA (Optional)</label>
                                        <input
                                            type="text"
                                            value={edu.gpa}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEducation(edu.id, { gpa: e.target.value })}
                                            placeholder="e.g. 3.8 / 4.0"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Start Date</label>
                                        <input
                                            type="text"
                                            value={edu.startDate}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEducation(edu.id, { startDate: e.target.value })}
                                            placeholder="MM/YYYY"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>End Date</label>
                                        <input
                                            type="text"
                                            value={edu.endDate}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEducation(edu.id, { endDate: e.target.value })}
                                            placeholder="MM/YYYY or Expected"
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
                    onClick={addEducation}
                >
                    <Plus size={18} />
                    <span>Add Education</span>
                </motion.button>
            </EditorSection>
        </div>
    );
};
