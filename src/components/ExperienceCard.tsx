"use client";
import { useState } from 'react';
import { motion, useTransform, useMotionTemplate, useMotionValue, useMotionValueEvent, MotionValue } from 'framer-motion';
import { Briefcase, Calendar, Building2, CheckCircle2 } from 'lucide-react';
import { Experience } from '@/data/portfolioData';

interface ExperienceCardProps {
    data: Experience;
    index: number;
    total: number;
    scrollYProgress: MotionValue<number>;
}

export default function ExperienceCard({ data, index, total, scrollYProgress }: ExperienceCardProps) {
    const step = total > 1 ? 1 / (total - 1) : 1;
    const center = index * step;

    // Define pivot points for smoother cinematic overlapping
    const p0 = center - step;
    const p0_fade = center - step * 0.8;
    const p1 = center - step * 0.15;
    const p2 = center + step * 0.15;
    const p3_fade = center + step * 0.8;
    const p3 = center + step;

    const ranges = [p0, p0_fade, p1, p2, p3_fade, p3];

    const y = useTransform(scrollYProgress, ranges, ["100%", "60%", "0%", "0%", "-5%", "-15%"]);
    const scale = useTransform(scrollYProgress, ranges, [0.8, 0.85, 1, 1, 0.9, 0.8]);
    const opacity = useTransform(scrollYProgress, ranges, [0, 1, 1, 1, 1, 0]);
    //const blurValue = useTransform(scrollYProgress, ranges, [20, 10, 0, 0, 10, 20]);
    //const filter = useMotionTemplate`blur(${blurValue}px)`;

    const [inView, setInView] = useState(false);

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        // Trigger stagger animations when card is reasonably within view
        if (Math.abs(v - center) < step * 0.4) {
            setInView(true);
        } else {
            setInView(false);
        }
    });

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        mouseX.set(x);
        mouseY.set(y);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Slight 3D tilt
        const rotateXValue = ((y - centerY) / centerY) * -5;
        const rotateYValue = ((x - centerX) / centerX) * 5;

        rotateX.set(rotateXValue);
        rotateY.set(rotateYValue);
    };

    const handleMouseLeave = () => {
        rotateX.set(0);
        rotateY.set(0);
    };

    const background = useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, ${data.color}25, transparent 80%)`;

    return (
        <motion.div
            style={{
                y,
                scale,
                opacity,
                //filter,
                zIndex: index, // Higher index means it's on top of previous cards

            }}
            className="absolute inset-0 flex items-center justify-center p-4 md:p-8 pointer-events-none"
        >
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    pointerEvents: inView ? "auto" : "none",
                }}
                className="relative w-full max-w-5xl p-6 md:p-12 rounded-4xl bg-white/3 backdrop-blur-3xl border border-white/10 shadow-2xl overflow-hidden group pointer-events-auto"
            >
                <motion.div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background }}
                />

                {/* Subtle accent glow behind the card */}
                <div
                    className="absolute inset-x-0 -top-full h-[200%] opacity-10 blur-[100px] pointer-events-none transition-all duration-1000"
                    style={{ backgroundColor: data.color }}
                />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10" style={{ transform: "translateZ(50px)" }}>
                    {/* Left Column */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/80">
                            <Calendar className="w-4 h-4" style={{ color: data.color }} />
                            {data.period}
                        </div>

                        <div>
                            <h3 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-white mt-2 pb-1">
                                {data.role}
                            </h3>
                            <div className="flex items-center gap-3 mt-4 text-xl md:text-2xl text-white/70 font-medium">
                                <Building2 className="w-6 h-6" style={{ color: data.color }} />
                                {data.company}
                            </div>
                        </div>

                        <p className="text-gray-400 text-lg leading-relaxed pt-2">
                            {data.description}
                        </p>
                    </div>

                    {/* Right Column */}
                    <motion.div
                        initial="hidden"
                        animate={inView ? "show" : "hidden"}
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                        className="lg:col-span-7 space-y-8"
                    >
                        <div>
                            <h4 className="text-lg font-semibold text-white/90 mb-4 flex items-center gap-2">
                                <Briefcase className="w-5 h-5" style={{ color: data.color }} />
                                Key Responsibilities
                            </h4>
                            <ul className="space-y-4">
                                {data.responsibilities.map((req, i) => (
                                    <motion.li
                                        key={i}
                                        variants={{
                                            hidden: { opacity: 0, x: 20 },
                                            show: { opacity: 1, x: 0 }
                                        }}
                                        className="group/item flex items-start gap-4"
                                    >
                                        <span
                                            className="mt-2 w-2 h-2 rounded-full shrink-0 transition-all duration-300 group-hover/item:scale-150 group-hover/item:shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                            style={{ backgroundColor: data.color }}
                                        />
                                        <span className="text-gray-300 group-hover/item:text-white transition-colors">
                                            {req}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />

                        <div>
                            <h4 className="text-lg font-semibold text-white/90 mb-4 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5" style={{ color: data.color }} />
                                Impact & Achievements
                            </h4>
                            <ul className="space-y-4">
                                {data.achievements.map((ach, i) => (
                                    <motion.li
                                        key={i}
                                        variants={{
                                            hidden: { opacity: 0, x: 20 },
                                            show: { opacity: 1, x: 0 }
                                        }}
                                        className="group/item flex items-start gap-4"
                                    >
                                        <span
                                            className="mt-2 w-2 h-2 rounded-full shrink-0 transition-all duration-300 group-hover/item:scale-150 group-hover/item:shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                            style={{ backgroundColor: data.color }}
                                        />
                                        <span className="text-gray-300 group-hover/item:text-white transition-colors">
                                            {ach}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}
