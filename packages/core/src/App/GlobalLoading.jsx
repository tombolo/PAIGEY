'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './GlobalLoading.module.scss';

// Import your logo - make sure the path is correct
import LOGO from './Logo/NILOTE.png';

export const GlobalLoading = () => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    // Professional financial color palette - official green/red theme
    const colors = {
        primary: '#059669', // Professional green (success/positive)
        secondary: '#DC2626', // Professional red (attention/important)
        accent: '#0EA5E9', // Blue for neutral elements
        dark: '#0F172A', // Dark navy background
        light: '#F8FAFC', // Clean white text
        surface: 'rgba(15, 23, 42, 0.85)', // Semi-transparent surface
        border: 'rgba(255, 255, 255, 0.12)', // Subtle borders
        success: '#10B981', // Success green
        warning: '#F59E0B', // Warning amber
        gradientGreen: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
        gradientRed: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)',
    };

    // Professional loading content
    const loadingContent = {
        partnership: {
            text: 'In partnership with',
            company: 'DERIV',
            type: 'partnership',
            color: colors.primary,
        },
        powered: {
            text: 'Powered by',
            company: 'DERIV',
            type: 'powered',
            color: colors.secondary,
        },
        journey: {
            text: 'Simplifying your',
            highlight: 'trading journey',
            type: 'journey',
            color: colors.primary,
        },
    };

    useEffect(() => {
        // Professional progress animation - 4 seconds total
        const duration = 8000;
        const startTime = Date.now();
        let animationFrame;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min((elapsed / duration) * 100, 100);

            // Smooth easing for professional feel
            const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
            const easedProgress = easeOutCubic(progress / 100) * 100;

            setProgress(Math.min(easedProgress, 100));

            if (progress < 100) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                // Brief delay before completing
                setTimeout(() => setIsComplete(true), 500);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    // Professional animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    const logoVariants = {
        initial: { scale: 0.95, opacity: 0 },
        animate: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className={styles.globalLoading}
                    style={{
                        '--primary': colors.primary,
                        '--secondary': colors.secondary,
                        '--accent': colors.accent,
                        '--dark': colors.dark,
                        '--light': colors.light,
                        '--surface': colors.surface,
                        '--border': colors.border,
                        '--success': colors.success,
                        '--warning': colors.warning,
                    }}
                    variants={containerVariants}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                >
                    {/* Professional loading container */}
                    <div className={styles.loadingContainer}>
                        {/* Logo with professional presentation */}
                        <div className={styles.logoSection}>
                            <motion.img
                                src={LOGO}
                                alt='NILOTE Logo'
                                className={styles.logo}
                                variants={logoVariants}
                                initial='initial'
                                animate='animate'
                            />
                            <div className={styles.logoBadge}>
                                <span className={styles.badgeText}>PRO</span>
                            </div>
                        </div>

                        {/* Professional partnership display */}
                        <div className={styles.partnershipSection}>
                            <div className={styles.partnershipLabel}>In partnership with</div>
                            <div className={styles.companyName}>DERIV</div>
                            <div className={styles.partnerStatus}>
                                <span className={styles.statusDot} />
                                Verified Partner
                            </div>
                        </div>

                        {/* Separator */}
                        <div className={styles.separator} />

                        {/* Progress section */}
                        <div className={styles.progressSection}>
                            <div className={styles.progressHeader}>
                                <div className={styles.progressTitle}>System Initialization</div>
                                <div className={styles.progressPercentage}>{Math.round(progress)}%</div>
                            </div>

                            {/* Professional progress bar */}
                            <div className={styles.progressBar}>
                                <motion.div
                                    className={styles.progressFill}
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: `${progress}%`,
                                        transition: {
                                            duration: 0.2,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                        },
                                    }}
                                />
                            </div>
                        </div>

                        {/* Status message */}
                        <div className={styles.statusMessage}>
                            <div className={styles.statusIcon}>
                                <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                                    <path
                                        d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z'
                                        fill='currentColor'
                                    />
                                    <path d='M11 7H13V9H11V7ZM11 11H13V17H11V11Z' fill='currentColor' />
                                </svg>
                            </div>
                            <span className={styles.messageText}>Loading secure trading environment</span>
                        </div>

                        {/* Footer with timestamp */}
                        <div className={styles.footer}>
                            <div className={styles.timestamp}>
                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className={styles.version}>v2.4.1 • Professional Edition</div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GlobalLoading;
