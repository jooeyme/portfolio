"use client";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Play, Info } from 'lucide-react';
import {
    SiReact, SiTypescript, SiTailwindcss, SiVite, SiFramer,
    SiJavascript, SiHtml5, SiCss3, SiGit, SiGithub, SiNextdotjs
} from 'react-icons/si';

import { PROFILE, Project } from '@/data/portfolioData';
import { TechParticle } from './TechParticle';
import { useMagnetic } from '@/hooks/useMagnetic';

const ICONS = [
    <SiReact size={32} />, <SiTypescript size={32} />, <SiTailwindcss size={32} />,
    <SiVite size={32} />, <SiFramer size={32} />, <SiNextdotjs size={32} />,
    <SiJavascript size={32} />, <SiHtml5 size={32} />,
    <SiCss3 size={32} />, <SiGit size={32} />, <SiGithub size={32} />
];

const generateParticles = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
        id: i,
        icon: ICONS[Math.floor(Math.random() * ICONS.length)],
        xPct: 5 + Math.random() * 90,
        yPct: 10 + Math.random() * 80,
        layer: Math.random() > 0.7 ? 3 : Math.random() > 0.4 ? 2 : 1
    }));
};

const PARTICLES = generateParticles(35);

interface AdvancedHeroProps {
    featuredProject: Project | null;
    onOpenModal: (project: Project) => void;
}

export function AdvancedHero({ featuredProject, onOpenModal }: AdvancedHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
    const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

    // Share two smooth springs for all 35 particles
    const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 15 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 15 });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
    const filterBlur = useTransform(scrollYProgress, [0, 0.5], ['blur(0px)', 'blur(10px)']);
    const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        const handleMouseLeave = () => {
            mouseX.set(window.innerWidth / 2);
            mouseY.set(window.innerHeight / 2);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [mouseX, mouseY]);

    const playMagnetic = useMagnetic(150, 15, 0.1);
    const infoMagnetic = useMagnetic(150, 15, 0.1);

    if (!featuredProject) return null;

    return (
        <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black selection:bg-cyan-500/30">
            {/* Background Base */}
            <motion.div style={{ scale: bgScale }} className="absolute inset-0">
                <Image
                    src={featuredProject.image}
                    alt="Hero Background"
                    fill
                    priority
                    className="object-cover brightness-[0.25]"
                />

                {/* Advanced Noise Texture Overlay */}
                <div
                    className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
                ></div>

                {/* Darker Gradients for depth */}
                <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/60 to-transparent z-0"></div>
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent z-0"></div>
            </motion.div>

            {/* Radial Cursor Glow */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-10 opacity-30 mix-blend-color-dodge transition-opacity duration-300"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]: number[]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(14, 165, 233, 0.15), transparent 70%)`
                    )
                }}
            />

            {/* Tech Particles Layer */}
            <motion.div
                className="absolute inset-0 z-10"
                style={{
                    opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]),
                    scale: useTransform(scrollYProgress, [0, 0.5], [1, 1.5]),
                    filter: useTransform(scrollYProgress, [0, 0.3], ['blur(0px)', 'blur(12px)'])
                }}
            >
                {PARTICLES.map((p) => (
                    <TechParticle
                        key={p.id}
                        mouseX={smoothMouseX}
                        mouseY={smoothMouseY}
                        icon={p.icon}
                        xPct={p.xPct}
                        yPct={p.yPct}
                        layer={p.layer}
                    />
                ))}
            </motion.div>

            {/* Content Layer */}
            <div className="absolute top-[35%] md:top-[40%] left-4 md:left-16 max-w-4xl px-4 z-20">
                <motion.div
                    style={{ opacity: textOpacity, scale: textScale, filter: filterBlur, transformOrigin: "left center" }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm md:text-base font-medium mb-6 backdrop-blur-md"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                        </span>
                        Available for Work
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white mb-6 tracking-tighter leading-[1.05]">
                        {PROFILE.name.split(' ').map((word, i) => (
                            <span key={i} className="block overflow-hidden pb-1 md:pb-3">
                                <motion.span
                                    className="block"
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.7, delay: i * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                                >
                                    {word}
                                </motion.span>
                            </span>
                        ))}
                    </h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <p className="text-2xl md:text-4xl text-zinc-300 font-medium mb-6 drop-shadow-md bg-clip-text bg-linear-to-r from-zinc-100 to-zinc-500">
                            {PROFILE.title}
                        </p>
                        <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl leading-relaxed font-light">
                            {PROFILE.description}
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex flex-wrap items-center gap-4 md:gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                    >
                        <motion.button
                            ref={playMagnetic.ref}
                            style={{ x: playMagnetic.x, y: playMagnetic.y }}
                            onClick={() => onOpenModal(featuredProject)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative flex items-center justify-center gap-3 bg-white text-black px-8 py-4 md:px-10 md:py-5 rounded-full font-bold transition-colors text-lg md:text-xl overflow-hidden"
                        >
                            <span className="absolute inset-0 w-full h-full bg-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            <Play className="relative fill-black w-6 h-6 group-hover:scale-110 transition-transform" />
                            <span className="relative z-10 w-max">View Resume</span>
                        </motion.button>

                        <motion.button
                            ref={infoMagnetic.ref}
                            style={{ x: infoMagnetic.x, y: infoMagnetic.y }}
                            onClick={() => onOpenModal(featuredProject)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-bold hover:bg-white/10 transition-colors text-lg md:text-xl backdrop-blur-md"
                        >
                            <Info className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                            <span className="w-max">More Info</span>
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
