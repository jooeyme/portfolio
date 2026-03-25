"use client";
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { EXPERIENCE } from '@/data/portfolioData';
import ExperienceCard from '@/components/ExperienceCard';

export default function ExperienceSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const colors = EXPERIENCE.map(exp => exp.color);
    const colorStep = 1 / (EXPERIENCE.length - 1 || 1);
    const colorRanges = EXPERIENCE.map((_, i) => i * colorStep);

    const backgroundColor = useTransform(scrollYProgress, colorRanges, colors);
    const background = useMotionTemplate`radial-gradient(1200px circle at 50% 50%, ${backgroundColor}15, transparent 80%)`;

    return (
            <section
                ref={containerRef}
                className="relative w-full bg-[#030014]"
                style={{ height: isMobile ? "auto" : `${EXPERIENCE.length * 120}vh` }}
                id="experience"
            >
                <div className={`w-full flex flex-col items-center justify-start overflow-hidden ${isMobile ? 'pt-20 pb-12' : 'sticky top-0 h-screen pt-24 pb-12'}`}>

                <motion.div
                    className="absolute inset-0 transition-opacity duration-1000 opacity-60 pointer-events-none"
                    style={{ background }}
                />

                <div className="relative z-50 text-center px-4 pt-20 md:pt-24 pb-8 md:pb-12 shrink-0 w-full pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center justify-center space-x-2"
                    >
                        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-2">
                            Experience
                        </h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mt-2"
                    >
                        A timeline of my professional journey. Keep scrolling.
                    </motion.p>
                </div>

                <div
                    className={`relative w-full flex pointer-events-none pb-8 ${isMobile ? 'flex-col gap-10 px-4 mt-8 items-center justify-center' : 'flex-1 min-h-0 md:max-h-200 items-center justify-center'}`}
                    style={{ perspective: "2000px" }}
                >
                    {EXPERIENCE.map((exp, index) => (
                        <ExperienceCard
                            key={index}
                            data={exp}
                            index={index}
                            total={EXPERIENCE.length}
                            scrollYProgress={scrollYProgress}
                            isMobile={isMobile}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
