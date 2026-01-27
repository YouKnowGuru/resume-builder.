import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Toggle visibility based on scroll position
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileHover={{ scale: 1.1, translateY: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="scroll-to-top-btn"
                    title="Go to Top"
                >
                    <ChevronUp size={24} strokeWidth={3} />

                    <style>{`
                        .scroll-to-top-btn {
                            position: fixed;
                            bottom: 2.5rem;
                            right: 2.5rem;
                            width: 54px;
                            height: 54px;
                            border-radius: 50%;
                            background: linear-gradient(135deg, var(--primary), var(--secondary));
                            color: white;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            box-shadow: 0 10px 25px rgba(255, 140, 0, 0.4);
                            z-index: 999;
                            cursor: pointer;
                            border: none;
                        }

                        .scroll-to-top-btn:hover {
                            box-shadow: 0 15px 30px rgba(255, 140, 0, 0.6);
                        }

                        @media (max-width: 768px) {
                            .scroll-to-top-btn {
                                bottom: 1.5rem;
                                right: 1.5rem;
                                width: 48px;
                                height: 48px;
                            }
                        }
                    `}</style>
                </motion.button>
            )}
        </AnimatePresence>
    );
};
