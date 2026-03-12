"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ABOUT_ME, SKILLS } from '@/data/portfolioData';
import { StackCard } from '@/components/StackCard';
import { Compass } from 'lucide-react';

export function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Subtle background gradient transition from previous section
    const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const yTransform = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative py-32 px-4 md:px-12 min-h-screen flex items-center bg-black overflow-hidden"
        >
            {/* Cinematic Background Gradients */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ opacity: backgroundOpacity }}
            >
                <div className="absolute top-0 left-1/4 w-[50vw] h-[50vh] bg-cyan-900/20 rounded-full blur-[120px] mix-blend-screen skew-y-12"></div>
                <div className="absolute bottom-0 right-1/4 w-[40vw] h-[40vh] bg-blue-900/20 rounded-full blur-[100px] mix-blend-screen -skew-y-12"></div>

                {/* Noise texture overlay */}
                <div
                    className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
                ></div>
            </motion.div>

            <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                {/* Left Column: Intro & Personality */}
                <div className="space-y-12 shrink-0">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                    >
                        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-500 mb-4 flex items-center gap-3">
                            <span className="w-12 h-px bg-cyan-500/50"></span>
                            Identity Pipeline
                        </h2>

                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
                            {ABOUT_ME.headline.split(' ').map((word, i) => (
                                <span key={i} className="inline-block mr-3">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-300 to-zinc-600">
                                        {word}
                                    </span>
                                </span>
                            ))}
                        </h3>

                        <p className="text-xl text-zinc-400 leading-relaxed font-light">
                            {ABOUT_ME.paragraph}
                        </p>
                    </motion.div>

                    {/* Where I'm Headed Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="relative p-8 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-black border border-white/5 backdrop-blur-xl overflow-hidden group"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 mt-1">
                                <Compass size={24} className="animate-[spin_4s_linear_infinite]" />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-2">{ABOUT_ME.direction.title}</h4>
                                <p className="text-zinc-400 text-sm leading-relaxed">{ABOUT_ME.direction.content}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Stack Grid */}
                <motion.div
                    style={{ y: yTransform }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:ml-8"
                >
                    {SKILLS.map((domain, index) => (
                        <div key={domain.id} className={index % 2 === 1 ? 'sm:mt-12' : ''}>
                            <StackCard domain={domain} index={index} />
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
