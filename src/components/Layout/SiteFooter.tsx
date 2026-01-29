import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Heart, Instagram, Facebook, Youtube, Mail } from 'lucide-react';

interface SiteFooterProps {
    onNavigate: (page: 'home' | 'privacy' | 'terms') => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onNavigate }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer glass-panel">
            <div className="footer-content">
                <div className="footer-brand">
                    <div className="logo-small">
                        <span className="logo-icon-small">🐉</span>
                        <h2>Our Store</h2>
                    </div>
                    <p className="brand-tagline">Crafting professional resumes with Bhutanese excellence.</p>
                </div>

                <div className="footer-links-container">
                    <div className="link-group">
                        <h3>Product</h3>
                        <a href="#" className="footer-link">Templates</a>
                        <a href="#" className="footer-link">AI Assistant</a>
                        <a href="#" className="footer-link">Export PDF</a>
                    </div>
                    <div className="link-group">
                        <h3>Resources</h3>
                        <a href="#" className="footer-link">Resume Tips</a>
                        <a href="#" className="footer-link">Career Blog</a>
                        <a href="#" className="footer-link">Documentation</a>
                    </div>
                    <div className="link-group">
                        <h3>Legal</h3>
                        <button type="button" className="footer-link footer-link-btn" onClick={() => onNavigate('privacy')}>Privacy Policy</button>
                        <button type="button" className="footer-link footer-link-btn" onClick={() => onNavigate('terms')}>Terms of Service</button>
                    </div>
                </div>

                <div className="footer-social">
                    <h3>Connect</h3>
                    <div className="social-icons">
                        <a href="#" aria-label="GitHub" className="social-link"><Github size={20} /></a>
                        <a href="#" aria-label="Twitter" className="social-link"><Twitter size={20} /></a>
                        <a href="#" aria-label="LinkedIn" className="social-link"><Linkedin size={20} /></a>
                        <a href="#" aria-label="Instagram" className="social-link"><Instagram size={20} /></a>
                        <a href="#" aria-label="Facebook" className="social-link"><Facebook size={20} /></a>
                        <a href="#" aria-label="YouTube" className="social-link"><Youtube size={20} /></a>
                        <a href="mailto:tsirang@ourstore.tech" aria-label="Email" className="social-link"><Mail size={20} /></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2023 - {currentYear} Our Store. All rights reserved.</p>
                <div className="made-with">
                    <span>Made with</span>
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        <Heart size={16} fill="var(--accent)" color="var(--accent)" />
                    </motion.div>
                    <span>in Bhutan</span>
                </div>
            </div>

            <style>{`
                .site-footer {
                    margin-top: 2.25rem;
                    padding: 2.5rem 2rem 1.25rem;
                    color: var(--text-main);
                    z-index: 10;
                    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
                    border-bottom: 0;
                }

                .footer-content {
                    max-width: 1600px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 1.5fr 2fr 1fr;
                    gap: 2.5rem;
                    margin-bottom: 1.75rem;
                }

                .logo-small {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }

                .logo-small h2 {
                    font-size: 1.25rem;
                    font-weight: 900;
                    background: linear-gradient(135deg, var(--primary), var(--secondary));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-transform: uppercase;
                }

                .brand-tagline {
                    color: var(--text-muted);
                    font-size: 0.9375rem;
                    max-width: 300px;
                    line-height: 1.6;
                }

                .footer-links-container {
                    display: flex;
                    gap: 2.5rem;
                }

                .link-group h3, .footer-social h3 {
                    font-size: 0.8125rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: var(--secondary);
                    margin-bottom: 1.5rem;
                    font-weight: 800;
                }

                .link-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .footer-link {
                    text-decoration: none;
                    color: var(--text-muted);
                    font-size: 0.9375rem;
                    transition: color 0.2s, transform 0.2s;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .footer-link:hover {
                    color: var(--primary);
                    transform: translateX(2px);
                }

                .footer-link-btn {
                    padding: 0;
                    border: 0;
                    background: transparent;
                    text-align: left;
                    cursor: pointer;
                    font-weight: 600;
                }

                .social-icons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.8rem;
                }

                .social-link {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    border-radius: 999px;
                    border: 1px solid rgba(148, 163, 184, 0.4);
                    color: var(--text-muted);
                    background: rgba(255, 255, 255, 0.7);
                    transition: all 0.2s;
                }

                .social-link:hover {
                    color: var(--primary);
                    border-color: var(--primary);
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(15, 23, 42, 0.12);
                }

                .footer-bottom {
                    max-width: 1600px;
                    margin: 0 auto;
                    padding-top: 1.25rem;
                    border-top: 1px solid var(--border);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: var(--text-muted);
                    font-size: 0.875rem;
                }

                .made-with {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                @media (max-width: 1024px) {
                    .footer-content {
                        grid-template-columns: 1fr 1fr;
                    }
                }

                @media (max-width: 768px) {
                    .site-footer {
                        margin-top: 1.75rem;
                        padding: 2rem 1.5rem 1rem;
                    }
                    .footer-content {
                        grid-template-columns: 1fr;
                        gap: 1.75rem;
                        text-align: center;
                        align-items: center;
                    }
                    .footer-links-container {
                        flex-direction: column;
                        align-items: center;
                        gap: 1.5rem;
                    }
                    .logo-small {
                        justify-content: center;
                    }
                    .brand-tagline {
                        max-width: 100%;
                    }
                    .link-group {
                        align-items: center;
                    }
                    .footer-social {
                        text-align: center;
                    }
                    .social-icons {
                        justify-content: center;
                    }
                    .footer-bottom {
                        flex-direction: column;
                        gap: 0.75rem;
                        text-align: center;
                    }
                }

                @media (max-width: 480px) {
                    .site-footer {
                        padding: 1.75rem 1.1rem 0.9rem;
                    }
                    .footer-content {
                        gap: 1.5rem;
                    }
                    .footer-links-container {
                        gap: 1.25rem;
                    }
                    .footer-bottom {
                        font-size: 0.8rem;
                    }
                }
            `}</style>
        </footer>
    );
};
