import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Eye, Database, Mail } from 'lucide-react';
import { ScrollToTop } from '../Layout/ScrollToTop';

interface PrivacyPolicyProps {
    onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
    return (
        <div className="legal-page">
            <div className="legal-container glass-panel">
                <motion.button
                    className="back-button"
                    onClick={onBack}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ArrowLeft size={20} />
                    <span>Back to Home</span>
                </motion.button>

                <div className="legal-header">
                    <Shield size={48} className="legal-icon" />
                    <h1>Privacy Policy</h1>
                    <p className="last-updated">Last Updated: January 27, 2026</p>
                </div>

                <div className="legal-content">
                    <section>
                        <div className="section-icon">
                            <Eye size={24} />
                        </div>
                        <h2>Introduction</h2>
                        <p>
                            Welcome to Our Store Resume Builder. We are committed to protecting your privacy and ensuring
                            the security of your personal information. This Privacy Policy explains how we collect, use,
                            and safeguard your data when you use our resume building service.
                        </p>
                    </section>

                    <section>
                        <div className="section-icon">
                            <Database size={24} />
                        </div>
                        <h2>Information We Collect</h2>
                        <p>We collect the following types of information:</p>
                        <ul>
                            <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details you provide in your resume.</li>
                            <li><strong>Professional Information:</strong> Work experience, education, skills, certifications, and other career-related data.</li>
                            <li><strong>Usage Data:</strong> Information about how you interact with our application, including features used and time spent.</li>
                            <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers for analytics purposes.</li>
                        </ul>
                    </section>

                    <section>
                        <div className="section-icon">
                            <Lock size={24} />
                        </div>
                        <h2>How We Use Your Information</h2>
                        <p>Your information is used to:</p>
                        <ul>
                            <li>Create, edit, and store your resume data locally in your browser</li>
                            <li>Provide AI-powered resume suggestions and improvements</li>
                            <li>Generate PDF exports of your resume</li>
                            <li>Improve our service and user experience</li>
                            <li>Communicate with you about updates and new features</li>
                        </ul>
                    </section>

                    <section>
                        <div className="section-icon">
                            <Shield size={24} />
                        </div>
                        <h2>Data Storage and Security</h2>
                        <p>
                            Your resume data is primarily stored locally in your browser using localStorage. We implement
                            industry-standard security measures to protect your information from unauthorized access,
                            alteration, or disclosure. However, no method of transmission over the internet is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2>Third-Party Services</h2>
                        <p>
                            We may use third-party services for analytics and AI features. These services have their own
                            privacy policies and we encourage you to review them. We do not sell your personal information
                            to third parties.
                        </p>
                    </section>

                    <section>
                        <h2>Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul>
                            <li>Access, update, or delete your personal information at any time</li>
                            <li>Export your resume data in PDF format</li>
                            <li>Opt-out of data collection for analytics purposes</li>
                            <li>Request information about how your data is being used</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Cookies and Tracking</h2>
                        <p>
                            We use browser localStorage to save your resume data and preferences. We may also use cookies
                            for analytics and to improve user experience. You can control cookie settings through your
                            browser preferences.
                        </p>
                    </section>

                    <section>
                        <h2>Children's Privacy</h2>
                        <p>
                            Our service is not intended for users under the age of 13. We do not knowingly collect
                            personal information from children under 13.
                        </p>
                    </section>

                    <section>
                        <h2>Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of any significant
                            changes by posting the new policy on this page and updating the "Last Updated" date.
                        </p>
                    </section>

                    <section>
                        <div className="section-icon">
                            <Mail size={24} />
                        </div>
                        <h2>Contact Us</h2>
                        <p>
                            If you have any questions or concerns about this Privacy Policy, please contact us at:
                        </p>
                        <p className="contact-info">
                            <strong>Email:</strong> privacy@ourstore.bt<br />
                            <strong>Address:</strong> Thimphu, Bhutan
                        </p>
                    </section>
                </div>
            </div>

            <ScrollToTop />

            <style>{`
                .legal-page {
                    min-height: 100vh;
                    padding: 2rem;
                    background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
                }

                .legal-container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 3rem;
                }

                .back-button {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.5rem;
                    background: var(--bg-main);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-md);
                    color: var(--text-main);
                    font-size: 0.9375rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    margin-bottom: 2rem;
                }

                .back-button:hover {
                    border-color: var(--primary);
                    color: var(--primary);
                    background: var(--primary-glow);
                }

                .legal-header {
                    text-align: center;
                    margin-bottom: 3rem;
                    padding-bottom: 2rem;
                    border-bottom: 2px solid var(--border);
                }

                .legal-icon {
                    color: var(--primary);
                    margin-bottom: 1rem;
                }

                .legal-header h1 {
                    font-size: 2.5rem;
                    font-weight: 900;
                    background: linear-gradient(135deg, var(--primary), var(--secondary));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 0.5rem;
                }

                .last-updated {
                    color: var(--text-muted);
                    font-size: 0.9375rem;
                }

                .legal-content {
                    color: var(--text-main);
                    line-height: 1.8;
                }

                .legal-content section {
                    margin-bottom: 2.5rem;
                    position: relative;
                }

                .section-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    background: var(--primary-glow);
                    border-radius: var(--radius-md);
                    color: var(--primary);
                    margin-bottom: 1rem;
                }

                .legal-content h2 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--text-main);
                    margin-bottom: 1rem;
                }

                .legal-content p {
                    margin-bottom: 1rem;
                    color: var(--text-secondary);
                }

                .legal-content ul {
                    margin-left: 1.5rem;
                    margin-bottom: 1rem;
                }

                .legal-content li {
                    margin-bottom: 0.75rem;
                    color: var(--text-secondary);
                }

                .legal-content strong {
                    color: var(--text-main);
                    font-weight: 600;
                }

                .contact-info {
                    padding: 1.5rem;
                    background: var(--bg-secondary);
                    border-left: 4px solid var(--primary);
                    border-radius: var(--radius-md);
                    margin-top: 1rem;
                }

                @media (max-width: 768px) {
                    .legal-page {
                        padding: 1rem;
                    }

                    .legal-container {
                        padding: 1.5rem;
                    }

                    .legal-header h1 {
                        font-size: 2rem;
                    }

                    .legal-content h2 {
                        font-size: 1.25rem;
                    }
                }
            `}</style>
        </div>
    );
};
