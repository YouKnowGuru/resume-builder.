import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Plus, Trash2 } from 'lucide-react';
import { EditorSection } from './EditorSection';
import { useResumeStore } from '../../store/useResumeStore';

export const CertificationsEditor: React.FC = () => {
    const { resume, addCertification, updateCertification, removeCertification } = useResumeStore();
    const { certifications } = resume;

    return (
        <div id="editor-certifications">
            <EditorSection title="Certifications" icon={Award}>
                <div className="section-list">
                    <AnimatePresence mode="popLayout">
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={cert.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="item-card glass animate-fade-in"
                            >
                                <div className="item-header">
                                    <span className="item-number" style={{ color: 'var(--secondary)', fontWeight: 800 }}>#{index + 1}</span>
                                    <button
                                        className="delete-btn"
                                        onClick={() => removeCertification(cert.id)}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div className="form-grid">
                                    <div className="form-group full-width">
                                        <label>Certification Name</label>
                                        <input
                                            type="text"
                                            value={cert.name}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCertification(cert.id, { name: e.target.value })}
                                            placeholder="e.g. AWS Certified Solutions Architect"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Issuer</label>
                                        <input
                                            type="text"
                                            value={cert.issuer}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCertification(cert.id, { issuer: e.target.value })}
                                            placeholder="e.g. Amazon Web Services"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Date</label>
                                        <input
                                            type="text"
                                            value={cert.date}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCertification(cert.id, { date: e.target.value })}
                                            placeholder="MM/YYYY"
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
                    onClick={addCertification}
                >
                    <Plus size={18} />
                    <span>Add Certification</span>
                </motion.button>
            </EditorSection>
        </div>
    );
};
