import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, AlertCircle, CheckCircle, XCircle, Scale } from 'lucide-react';
import { ScrollToTop } from '../Layout/ScrollToTop';

interface TermsOfServiceProps {
    onBack: () => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
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
                    <FileText size={48} className="legal-icon" />
                    <h1>Terms of Service</h1>
                    <p className="last-updated">Last Updated: January 27, 2026</p>
                </div>

                <div className="legal-content">
                    <section>
                        <div className="section-icon">
                            <FileText size={24} />
                        </div>
                        <h2>Agreement to Terms</h2>
                        <p>
                            By accessing and using Our Store Resume Builder, you agree to be bound by these Terms of Service
                            and all applicable laws and regulations. If you do not agree with any of these terms, you are
                            prohibited from using this service.
                        </p>
                    </section>

                    <section>
                        <div className="section-icon">
                            <CheckCircle size={24} />
                        </div>
                        <h2>Use License</h2>
                        <p>
                            Permission is granted to use Our Store Resume Builder for personal and professional resume
                            creation purposes. This license includes:
                        </p>
                        <ul>
                            <li>Creating and editing unlimited resumes</li>
                            <li>Using AI-powered features for resume enhancement</li>
                            <li>Exporting resumes in PDF format</li>
                            <li>Accessing all available templates and customization options</li>
                        </ul>
                        <p>This license shall automatically terminate if you violate any of these restrictions.</p>
                    </section>

                    <section>
                        <div className="section-icon">
                            <XCircle size={24} />
                        </div>
                        <h2>Prohibited Uses</h2>
                        <p>You agree not to:</p>
                        <ul>
                            <li>Use the service for any unlawful purpose or in violation of any regulations</li>
                            <li>Attempt to gain unauthorized access to our systems or networks</li>
                            <li>Interfere with or disrupt the service or servers</li>
                            <li>Upload malicious code, viruses, or any harmful content</li>
                            <li>Impersonate any person or entity or misrepresent your affiliation</li>
                            <li>Use automated systems to access the service without permission</li>
                            <li>Reproduce, duplicate, or copy material from the service for commercial purposes</li>
                        </ul>
                    </section>

                    <section>
                        <h2>User Content and Ownership</h2>
                        <p>
                            You retain all rights to the content you create using Our Store Resume Builder. Your resume
                            data, including personal information, work history, and other content, remains your property.
                            We do not claim ownership of your content.
                        </p>
                        <p>
                            By using our service, you grant us a limited license to process and store your content solely
                            for the purpose of providing the resume building service to you.
                        </p>
                    </section>

                    <section>
                        <h2>AI-Powered Features</h2>
                        <p>
                            Our service includes AI-powered features to help improve your resume. While we strive for
                            accuracy, AI-generated suggestions should be reviewed and verified by you. We are not
                            responsible for any errors or inaccuracies in AI-generated content.
                        </p>
                    </section>

                    <section>
                        <div className="section-icon">
                            <AlertCircle size={24} />
                        </div>
                        <h2>Disclaimer of Warranties</h2>
                        <p>
                            The service is provided "as is" without warranties of any kind, either express or implied.
                            We do not warrant that:
                        </p>
                        <ul>
                            <li>The service will be uninterrupted, timely, secure, or error-free</li>
                            <li>The results obtained from using the service will be accurate or reliable</li>
                            <li>The quality of any products, services, or information obtained through the service will meet your expectations</li>
                            <li>Any errors in the software will be corrected</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Limitation of Liability</h2>
                        <p>
                            In no event shall Our Store Resume Builder or its suppliers be liable for any damages
                            (including, without limitation, damages for loss of data or profit, or due to business
                            interruption) arising out of the use or inability to use the service, even if we have been
                            notified of the possibility of such damage.
                        </p>
                    </section>

                    <section>
                        <h2>Data Backup</h2>
                        <p>
                            While we store your resume data locally in your browser, we recommend regularly exporting
                            your resumes as PDF backups. We are not responsible for any data loss that may occur.
                        </p>
                    </section>

                    <section>
                        <h2>Service Modifications</h2>
                        <p>
                            We reserve the right to modify, suspend, or discontinue the service (or any part thereof)
                            at any time with or without notice. We shall not be liable to you or any third party for
                            any modification, suspension, or discontinuance of the service.
                        </p>
                    </section>

                    <section>
                        <div className="section-icon">
                            <Scale size={24} />
                        </div>
                        <h2>Governing Law</h2>
                        <p>
                            These terms shall be governed by and construed in accordance with the laws of Bhutan,
                            without regard to its conflict of law provisions. Any disputes arising from these terms
                            shall be resolved in the courts of Bhutan.
                        </p>
                    </section>

                    <section>
                        <h2>Indemnification</h2>
                        <p>
                            You agree to indemnify and hold harmless Our Store Resume Builder and its affiliates from
                            any claims, damages, losses, liabilities, and expenses arising from your use of the service
                            or violation of these terms.
                        </p>
                    </section>

                    <section>
                        <h2>Severability</h2>
                        <p>
                            If any provision of these Terms is found to be unenforceable or invalid, that provision
                            shall be limited or eliminated to the minimum extent necessary so that these Terms shall
                            otherwise remain in full force and effect.
                        </p>
                    </section>

                    <section>
                        <h2>Changes to Terms</h2>
                        <p>
                            We reserve the right to revise these Terms of Service at any time. By continuing to use
                            the service after changes are posted, you agree to be bound by the revised terms.
                        </p>
                    </section>

                    <section>
                        <h2>Contact Information</h2>
                        <p>
                            If you have any questions about these Terms of Service, please contact us at:
                        </p>
                        <p className="contact-info">
                            <strong>Email:</strong> legal@ourstore.bt<br />
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
