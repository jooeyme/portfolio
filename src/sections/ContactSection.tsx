"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { CONTACT_DATA } from '@/data/portfolioData';
import { ContactCard } from '@/components/ContactCard';
import { ContactForm } from '@/components/ContactForm';

interface ContactSectionProps {
    id: string;
}

export function ContactSection({ id }: ContactSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Darker subtle background gradient transitioning down from About Section
    const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

    return (
        <section
            id={id}
            ref={containerRef}
            className="relative py-32 px-4 md:px-12 min-h-screen flex items-center bg-black overflow-hidden"
        >
            {/* Background Gradients & Effects */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ opacity: backgroundOpacity }}
            >
                {/* Neon Cyan Ambient Glows */}
                <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vh] bg-cyan-900/10 rounded-full blur-[120px] mix-blend-screen"></div>
                <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-blue-900/10 rounded-full blur-[100px] mix-blend-screen"></div>

                {/* Noise texture overlay */}
                <div
                    className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
                ></div>

                {/* Grid Lines Overlay */}
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
                ></div>
            </motion.div>

            <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-16">

                {/* Header */}
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-500 mb-4 flex items-center gap-3">
                            <span className="w-12 h-px bg-cyan-500/50"></span>
                            Final Protocol
                        </h2>

                        <h3 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tighter">
                            {CONTACT_DATA.headline}
                        </h3>

                        <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                            {CONTACT_DATA.paragraph}
                        </p>
                    </motion.div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-16 items-start">

                    {/* Left Column: Contact Cards Stack */}
                    <div className="flex flex-col gap-4">
                        {CONTACT_DATA.cards.map((contact, index) => (
                            <ContactCard key={contact.id} contact={contact} index={index} />
                        ))}
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="w-full h-full lg:mt-0 mt-8">
                        <ContactForm />
                    </div>

                </div>
            </div>
        </section>
    );
}
