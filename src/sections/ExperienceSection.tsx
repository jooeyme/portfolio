"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { EXPERIENCE } from '@/data/portfolioData';
import ExperienceCard from '@/components/ExperienceCard';

export default function ExperienceSection() {
    const containerRef = useRef<HTMLDivElement>(null);

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
            style={{ height: `${EXPERIENCE.length * 120}vh` }}
            id="experience"
        >
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

                <motion.div
                    className="absolute inset-0 transition-opacity duration-1000 opacity-60 pointer-events-none"
                    style={{ background }}
                />

                <div className="absolute top-12 md:top-24 left-0 right-0 z-50 text-center px-4 pb-32 pointer-events-none">
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
                    className="relative w-full h-full max-h-200 mt-24 md:mt-0 flex items-center justify-center pointer-events-none"
                    style={{ perspective: "2000px" }}
                >
                    {EXPERIENCE.map((exp, index) => (
                        <ExperienceCard
                            key={index}
                            data={exp}
                            index={index}
                            total={EXPERIENCE.length}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
