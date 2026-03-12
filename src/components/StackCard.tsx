"use client";
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useRef } from 'react';
import { SkillItem } from '@/data/portfolioData';

interface StackCardProps {
    domain: SkillItem;
    index: number;
}

export function StackCard({ domain, index }: StackCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        // Calculate mouse position relative to the card setup for spotlight
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);

        // Calculate rotation for 3D tilt effect (subtle)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        // Dampen the effect by dividing by 15
        const rotateXValue = ((y - centerY) / centerY) * -10;
        const rotateYValue = ((x - centerX) / centerX) * 10;

        // Check if device supports hover (desktop) to apply interaction
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            rotateX.set(rotateXValue);
            rotateY.set(rotateYValue);
        }
    };

    const handleMouseLeave = () => {
        mouseX.set(-1000); // Move spotlight out of view
        mouseY.set(-1000);
        rotateX.set(0);
        rotateY.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
            style={{ perspective: 1000 }}
            className="h-full"
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d'
                }}
                className="group relative h-full flex flex-col p-6 rounded-2xl bg-zinc-900/40 border border-white/5 overflow-hidden transition-all duration-300 ease-out hover:bg-zinc-900/60"
            >
                {/* Spotlight Background Effect */}
                <motion.div
                    className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover:opacity-100 mix-blend-color-dodge z-0"
                    style={{
                        background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(14, 165, 233, 0.15), transparent 80%)`,
                    }}
                />

                {/* Spotlight Border Glow Effect */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(14, 165, 233, 0.4), transparent 80%)
                        `,
                        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        maskComposite: "exclude",
                        WebkitMaskComposite: "xor",
                        padding: "1px",
                    }}
                />

                <div className="relative z-20 flex-grow" style={{ transform: "translateZ(20px)" }}>
                    <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{domain.category}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-8">{domain.description}</p>
                </div>

                <div className="relative z-20" style={{ transform: "translateZ(30px)" }}>
                    <div className="grid grid-cols-4 gap-4">
                        {domain.items.map((tech) => (
                            <div key={tech.name} className="flex flex-col items-center justify-center gap-2 group/icon">
                                <div className="p-3 bg-white/5 rounded-xl text-zinc-400 group-hover/icon:text-cyan-400 group-hover/icon:bg-cyan-500/10 transition-colors shadow-inner shadow-white/5 border border-white/5 group-hover/icon:border-cyan-500/20">
                                    <tech.icon size={24} />
                                </div>
                                <span className="text-[10px] font-medium text-zinc-500 group-hover/icon:text-zinc-300 transition-colors opacity-0 group-hover/icon:opacity-100 -translate-y-2 group-hover/icon:translate-y-0 duration-200">
                                    {tech.name}
                                </span>
                            </div>

                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
