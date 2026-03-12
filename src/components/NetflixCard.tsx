"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Play, Info, ThumbsUp, Plus } from 'lucide-react';
import { Project } from '@/data/portfolioData';
import Image from 'next/image';

interface NetflixCardProps {
    project: Project;
    onOpenModal: (project: Project) => void;
}

export function NetflixCard({ project, onOpenModal }: NetflixCardProps) {
    const [hoverStyle, setHoverStyle] = useState({
        origin: 'origin-center',
        x: 0,
        scale: 1.5,
    });

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const windowWidth = window.innerWidth;

        const padding = 24;
        const overflowLeft = rect.left - padding;
        const overflowRight = windowWidth - rect.right - padding;

        if (overflowLeft < 0) {
            setHoverStyle({
                origin: 'origin-left',
                x: Math.abs(overflowLeft) + 10,
                scale: 1.35,
            });
        } else if (overflowRight < 0) {
            setHoverStyle({
                origin: 'origin-right',
                x: -(Math.abs(overflowRight) + 10),
                scale: 1.35,
            });
        } else {
            setHoverStyle({
                origin: 'origin-center',
                x: 0,
                scale: 1.5,
            });
        }
    };

    return (
        <motion.div
            className={`relative group/card bg-zinc-900 rounded-md transition-all duration-300 overflow-hidden cursor-pointer ${hoverStyle.origin}`}
            onMouseEnter={handleMouseEnter}
            whileHover={{
                scale: hoverStyle.scale,
                x: hoverStyle.x,
                zIndex: 50,
                y: -50,
                transition: { duration: 0.4, delay: 0.3 }
            }}
            initial={{ scale: 1, x: 0, zIndex: 1 }}
            layoutId={project.id.toString()}
        >
            <div
                className="relative sm:w-25 sm:h-12.5 aspect-video w-full h-full"
                onClick={() => onOpenModal(project)}
            >
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                />
            </div>

            <motion.div
                className="absolute bottom-0 left-0 right-0 bg-zinc-800 p-4 shadow-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 delay-300"
            >
                <div className="flex gap-2 mb-3">
                    <button
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black hover:bg-gray-200"
                        title="Play Demo"
                    >
                        <Play size={16} fill="currentColor" />
                    </button>
                    <button
                        className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-400 text-gray-400 hover:border-white hover:text-white"
                        title="Add to List"
                    >
                        <Plus size={16} />
                    </button>
                    <button
                        className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-400 text-gray-400 hover:border-white hover:text-white"
                        title="Like"
                    >
                        <ThumbsUp size={16} />
                    </button>
                    <button
                        className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-400 text-gray-400 hover:border-white hover:text-white ml-auto"
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpenModal(project);
                        }}
                        title="More Info"
                    >
                        <Info size={16} />
                    </button>
                </div>

                <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-500 font-bold text-xs">{project.match}</span>
                    <span className="border border-gray-500 px-1 text-[10px] text-gray-400 uppercase">{project.maturity}</span>
                    <span className="text-gray-400 text-xs font-semibold">{project.duration}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-[10px] text-gray-300 flex items-center">
                            {idx > 0 && <span className="mx-1 text-gray-600">•</span>}
                            {tag}
                        </span>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
