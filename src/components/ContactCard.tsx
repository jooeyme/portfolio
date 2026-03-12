"use client";
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useRef, useState } from 'react';
import { ContactItem } from '@/data/contactData';
import { Check, ArrowUpRight } from 'lucide-react';

interface ContactCardProps {
    contact: ContactItem;
    index: number;
}

export function ContactCard({ contact, index }: ContactCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    const [copied, setCopied] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateXValue = ((y - centerY) / centerY) * -10;
        const rotateYValue = ((x - centerX) / centerX) * 10;

        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            rotateX.set(rotateXValue);
            rotateY.set(rotateYValue);
        }
    };

    const handleMouseLeave = () => {
        mouseX.set(-1000);
        mouseY.set(-1000);
        rotateX.set(0);
        rotateY.set(0);
    };

    const handleClick = async () => {
        if (contact.type === 'email') {
            try {
                await navigator.clipboard.writeText(contact.value);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error("Failed to copy email:", err);
            }
        } else {
            window.open(contact.value, '_blank', 'noopener,noreferrer');
        }
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
                onClick={handleClick}
                whileTap={{ scale: 0.98 }}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d'
                }}
                className="group relative flex items-center gap-6 p-6 rounded-2xl bg-zinc-900/40 border border-white/5 overflow-hidden transition-all duration-300 ease-out hover:bg-zinc-900/60 cursor-pointer"
            >
                {/* Spotlight Background */}
                <motion.div
                    className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover:opacity-100 mix-blend-color-dodge z-0"
                    style={{
                        background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(6, 182, 212, 0.15), transparent 80%)`,
                    }}
                />

                {/* Spotlight Border */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(6, 182, 212, 0.4), transparent 80%)
                        `,
                        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        maskComposite: "exclude",
                        WebkitMaskComposite: "xor",
                        padding: "1px",
                    }}
                />

                <div className="relative z-20" style={{ transform: "translateZ(30px)" }}>
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]">
                        <contact.icon size={26} />
                    </div>
                </div>

                <div className="relative z-20 flex-grow" style={{ transform: "translateZ(20px)" }}>
                    <h4 className="text-xl font-bold text-white mb-1 tracking-wide">{contact.title}</h4>
                    <p className="text-zinc-400 text-sm">{contact.description}</p>
                </div>

                <div className="relative z-20 text-zinc-500 group-hover:text-cyan-400 transition-colors" style={{ transform: "translateZ(20px)" }}>
                    {contact.type === 'email' ? (
                        copied ? <Check size={20} className="text-green-400" /> : <div className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">Copy</div>
                    ) : (
                        <ArrowUpRight size={20} className="opacity-50 group-hover:opacity-100 transition-opacity group-hover:-translate-y-1 group-hover:translate-x-1 duration-300" />
                    )}
                </div>

                {/* Copied Feedback Toast matching card dimensions */}
                {contact.type === 'email' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: copied ? 1 : 0, scale: copied ? 1 : 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 z-30 flex items-center justify-center bg-cyan-500/90 backdrop-blur-sm pointer-events-none"
                    >
                        <span className="text-white font-bold text-lg flex items-center gap-2">
                            <Check size={24} /> Copied to clipboard!
                        </span>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}
