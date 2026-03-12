"use client";
import { useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
import { PROJECTS } from '@/data/portfolioData';
import { ProjectFolder } from '@/components/ProjectFolder';

import { Project } from '@/data/portfolioData';

interface FeaturedProjectsProps {
    onOpenModal: (project: Project) => void;
}

export function FeaturedProjects({ onOpenModal }: FeaturedProjectsProps) {
    const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
    const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Represents the mapping of index in the stack -> original project index.
    // e.g., deckOrder[0] is the index of the project that is at the front.
    const [deckOrder, setDeckOrder] = useState<number[]>(PROJECTS.map((_, i) => i));

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const handleSelectFolder = (clickedOriginalIndex: number) => {
        setDeckOrder(prev => {
            const currentVisualIndex = prev.indexOf(clickedOriginalIndex);
            if (currentVisualIndex === 0) return prev; // Already on top

            const newOrder = [...prev];
            newOrder.splice(currentVisualIndex, 1);
            newOrder.unshift(clickedOriginalIndex);
            return newOrder;
        });
    };

    return (
        <section className="relative w-full bg-black selection:bg-cyan-500/30 py-24 md:py-32 min-h-[120vh] flex flex-col items-center overflow-hidden">
            {/* Global Background Glow for the Section */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black"></div>
                {/* Noise Texture Overlay */}
                <div
                    className="absolute inset-0 opacity-20 mix-blend-overlay"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
                ></div>
            </div>

            {/* Section Title */}
            <div className="relative z-10 text-center mb-16 md:mb-24 px-4 w-full">
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-500 tracking-tight">
                    Selected Works
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-transparent mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Stacked Container */}
            <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 perspective-[1400px] h-[85vh] md:h-[70vh] flex justify-center" style={{ transformStyle: 'preserve-3d' }}>
                {deckOrder.map((projectIndex, renderIndex) => {
                    const project = PROJECTS[projectIndex];
                    return (
                        <ProjectFolder
                            key={project.id}
                            project={project}
                            visualIndex={renderIndex}
                            index={projectIndex}
                            mousePosition={mousePosition}
                            onClick={() => handleSelectFolder(projectIndex)}
                            onOpenModal={onOpenModal}
                        />
                    );
                })}
            </div>
        </section>
    );
}
