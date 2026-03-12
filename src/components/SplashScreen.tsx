"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SplashScreenProps {
    onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            setTimeout(onFinish, 500); // Wait for exit animation
        }, 3500);
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                >
                    <div className="relative">
                        <motion.h1
                            initial={{ scale: 3, letterSpacing: '50px', opacity: 0 }}
                            animate={{ scale: 1, letterSpacing: '0px', opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-red-600 font-black text-5xl md:text-8xl tracking-tighter"
                        >
                            PORTFOLIO
                        </motion.h1>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ delay: 0.8, duration: 2.5, ease: "linear" }}
                            className="h-1 bg-red-600 mt-4 mx-auto max-w-[300px]"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
