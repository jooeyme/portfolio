import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ProjectData } from '../../data/projects';
import { Code2, Zap, Activity, Github, ExternalLink } from 'lucide-react';

interface ProjectFolderProps {
    project: ProjectData;
    index: number;
    visualIndex: number;
    mousePosition: { x: number; y: number };
    onClick: () => void;
}

export function ProjectFolder({ project, index, visualIndex, mousePosition, onClick }: ProjectFolderProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth <= 768);
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isActive = visualIndex === 0;

    // Exact state requirements:
    // Front: scale 1, translateY 0px, translateZ 0px, rotateX 0deg
    // Middle: scale 0.95, translateY 40px, translateZ -40px, rotateX 8deg
    // Back: scale 0.9, translateY 80px, translateZ -80px, rotateX 12deg

    let scaleVal = 1;
    let yVal = 0;
    let zVal = 0;
    let rotateXCustom = 0;
    let opacityVal = 1;

    if (visualIndex === 0) {
        scaleVal = 1;
        yVal = isMobile ? 20 : 20;
        zVal = isMobile ? 0 : 0;
        rotateXCustom = isMobile ? 0 : 0;
        opacityVal = 1;
    } else if (visualIndex === 1) {
        scaleVal = 0.95;
        yVal = isMobile ? -10 : -80; // Negative to move UP and show top edge
        zVal = isMobile ? 0 : -60;
        rotateXCustom = isMobile ? 0 : 6;
        opacityVal = isMobile ? 0.95 : 0.8;
    } else {
        scaleVal = 0.9;
        yVal = isMobile ? -40 : -180; // Negative to move UP further
        zVal = isMobile ? 0 : -120;
        rotateXCustom = isMobile ? 0 : 12;
        opacityVal = isMobile ? 0.95 : 0.8;
    }

    const zIndex = 30 - visualIndex * 10;

    // Offset tabs based on actual index so they distribute horizontally
    const tabOffset = isMobile ? 12 + index * 48 : 48 + index * 200;

    // Pulse animation logic when becoming active
    const [isPulsing, setIsPulsing] = useState(false);
    useEffect(() => {
        if (isActive) {
            setIsPulsing(true);
            const t = setTimeout(() => setIsPulsing(false), 800);
            return () => clearTimeout(t);
        }
    }, [isActive]);

    // Mouse Parallax (only applied to the active card)
    const cardParallaxX = isActive && !isMobile ? (mousePosition.x - window.innerWidth / 2) * -0.01 : 0;
    const cardParallaxY = isActive && !isMobile ? (mousePosition.y - window.innerHeight / 2) * -0.01 : 0;

    // Theme states base on hover and active
    const tabBg = isActive ? 'bg-zinc-800' : isHovered ? 'bg-zinc-800' : 'bg-zinc-900';
    const tabBorder = isActive ? 'border-cyan-500/40' : isHovered ? 'border-cyan-500/20' : 'border-zinc-800';
    const bodyBg = isActive ? 'bg-[#0a0a0a]' : 'bg-zinc-900';
    const bodyBorder = isActive ? 'border-cyan-500/40' : isHovered ? 'border-cyan-500/20' : 'border-zinc-800';

    // If we offset the tabs horizontally, we should round the top-left corner of the folder body
    // Otherwise it looks broken.
    const bodyCorners = index === 0 ? 'rounded-b-xl rounded-tr-xl' : 'rounded-xl';

    return (
        <motion.div
            animate={{
                y: yVal,
                z: zVal,
                scale: isHovered && !isActive ? scaleVal + 0.02 : scaleVal,
                rotateX: rotateXCustom,
                opacity: opacityVal,

            }}
            transition={{
                type: 'spring',
                stiffness: 280,
                damping: 25,
                mass: 0.8
            }}
            className={`absolute top-0 w-[96%] md:w-[90%] left-0 right-0 mx-auto h-auto flex flex-col origin-bottom md:origin-bottom origin-top will-change-transform pointer-events-none ${!isActive ? 'drop-shadow-[0_-10px_30px_rgba(0,0,0,0.5)]' : ''}`}
            style={{
                x: cardParallaxX,
                y: yVal + cardParallaxY, // Minor y-parallax adjustment applied inline separate from animate 'y'
                transformStyle: 'preserve-3d',
                zIndex: zIndex
            }}
        >
            {/* ========================================= */}
            {/* THICKNESS LAYER (FAKE 3D EXTRUSION)       */}
            {/* ========================================= */}
            <div
                className="absolute inset-0 flex flex-col pointer-events-none transition-opacity duration-500 -z-10"
                style={{
                    transform: 'translateZ(-16px)',
                    opacity: isActive ? 0.4 : 0.8,
                }}
            >
                {/* Back Tab */}
                <div
                    className="w-48 md:w-64 h-10 md:h-12 bg-zinc-950 border-t border-x border-black rounded-t-xl -mb-[1px]"
                    style={{ marginLeft: `${tabOffset}px` }}
                ></div>
                {/* Back Body */}
                <div className={`flex-1 bg-zinc-950 border border-black ${bodyCorners} shadow-[0_30px_60px_rgba(0,0,0,0.9)]`}></div>
            </div>

            {/* ========================================= */}
            {/* FRONT FACE LAYER                          */}
            {/* ========================================= */}
            <div className="relative w-full h-full flex flex-col z-20 pointer-events-none" style={{ transform: 'translateZ(0.1px)', transformStyle: 'preserve-3d' }}>

                {/* Front Tab */}
                <motion.div
                    onClick={!isActive ? onClick : undefined}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    animate={{ y: isHovered && !isActive ? -2 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`relative w-48 md:w-64 h-10 md:h-12 ${tabBg} border-t border-x ${tabBorder} rounded-t-xl z-20 -mb-[1px] transition-colors duration-500 flex items-center px-4 md:px-6 gap-3 pointer-events-auto ${!isActive ? 'cursor-pointer group' : ''}`}
                    style={{ marginLeft: `${tabOffset}px` }}
                >
                    <Code2 className={`w-4 h-4 md:w-5 md:h-5 transition-colors duration-500 ${isActive || isHovered ? 'text-cyan-400' : 'text-zinc-400 group-hover:text-cyan-400'}`} />
                    <span className={`text-xs md:text-sm font-mono tracking-wider font-semibold uppercase transition-colors duration-500 truncate ${isActive || isHovered ? 'text-cyan-300' : 'text-zinc-300 group-hover:text-cyan-300'}`}>
                        {project.title}
                    </span>
                    {isActive && (
                        <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none rounded-tr-xl"></div>
                    )}
                </motion.div>

                {/* Front Body */}
                <motion.div
                    onClick={onClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    animate={isPulsing ? {
                        boxShadow: ['0px 0px 0px rgba(14,165,233,0)', '0px 0px 50px rgba(14,165,233,0.3)', '0px 0px 30px rgba(14,165,233,0.1)'],
                        borderColor: ['rgba(39,39,42,0.8)', 'rgba(34,211,238,0.5)', 'rgba(14,165,233,0.4)']
                    } : {
                        boxShadow: (isActive && isMobile) ? '0px 10px 25px rgba(14,165,233,0.15)' : '0px 20px 50px rgba(14,165,233,0.1)',
                        borderColor: isActive ? 'rgba(14,165,233,0.4)' : isHovered ? 'rgba(14,165,233,0.2)' : 'rgba(39,39,42,0.8)'
                    }}
                    transition={{ duration: 0.8 }}
                    className={`relative flex-1 ${bodyBg} border ${bodyBorder} ${bodyCorners} z-10 transition-colors duration-500 overflow-hidden shadow-2xl flex flex-col md:flex-row pointer-events-auto ${!isActive ? 'cursor-pointer' : ''}`}
                >
                    {/* Noise Texture */}
                    <div
                        className="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none"
                        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
                    />

                    {/* Sublte Radial Mouse Spotlight */}
                    {isActive && !isMobile && (
                        <motion.div
                            className="pointer-events-none absolute -inset-px z-10 opacity-50 transition-opacity duration-300"
                            style={{
                                background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(14, 165, 233, 0.1), transparent 40%)`
                            }}
                        />
                    )}

                    {/* Inner Content Wrapper */}
                    <div className={`relative z-20 w-full h-full flex flex-col md:flex-row p-6 md:p-8 lg:p-10 gap-6 lg:gap-10 ${!isActive ? 'opacity-40 transition-opacity duration-500 select-none' : ''}`}>

                        {/* Left Column: Image & Basic Info */}
                        <div className="w-full md:w-5/12 flex flex-col gap-6 h-full shrink-0">
                            <div>
                                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 tracking-tight leading-tight line-clamp-2 drop-shadow-sm">
                                    {project.title}
                                </h2>
                                <p className="text-sm md:text-base lg:text-lg text-zinc-400 font-light leading-relaxed line-clamp-3">
                                    {project.summary}
                                </p>
                            </div>

                            <div className="relative flex-1 min-h-[160px] md:min-h-0 w-full rounded-xl overflow-hidden border border-zinc-800/80 group shadow-inner">
                                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-tr from-black/90 via-black/40 to-transparent z-10"></div>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div
                                    className="absolute inset-0 mix-blend-overlay z-10 opacity-40 transition-opacity duration-500 group-hover:opacity-20"
                                    style={{ backgroundColor: project.color }}
                                />
                            </div>
                        </div>

                        {/* Right Column: Deep Dive */}
                        <div className="w-full md:w-7/12 flex flex-col gap-6 md:gap-8 h-full overflow-y-auto md:overflow-y-auto pr-2 custom-scrollbar pb-4">

                            {/* Tech Stack */}
                            <div>
                                <h3 className="text-xs md:text-sm uppercase tracking-widest text-zinc-500 font-bold mb-3 flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-cyan-500" /> Technology Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    <AnimatePresence mode="popLayout">
                                        {project.techStack.map((tech, i) => (
                                            <motion.span
                                                key={`${isActive ? 'active' : 'inactive'}-${tech}`}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3, delay: isActive ? 0.3 + (i * 0.05) : 0 }}
                                                className="px-2.5 py-1 md:px-3 md:py-1.5 text-xs font-semibold rounded-md bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 shadow-sm"
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div className="h-px w-full bg-gradient-to-r from-zinc-800 via-zinc-800/50 to-transparent shrink-0"></div>

                            {/* Problem & Solution */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 shrink-0">
                                <div className="flex flex-col h-full bg-zinc-900/50 rounded-xl border border-zinc-800/50 p-4 md:p-5 relative overflow-hidden group">
                                    <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                                    <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">The Challenge</h3>
                                    <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                                        {project.problem}
                                    </p>
                                </div>

                                <div className="flex flex-col h-full bg-cyan-950/20 rounded-xl border border-cyan-900/30 p-4 md:p-5 relative overflow-hidden group">
                                    <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent transform translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></span>
                                    <h3 className="text-xs uppercase tracking-widest text-cyan-500/80 font-bold mb-2">The Solution</h3>
                                    <p className="text-cyan-100/80 text-xs md:text-sm leading-relaxed">
                                        {project.solution}
                                    </p>
                                </div>
                            </div>

                            {/* Impact & Links */}
                            <div className="mt-auto flex flex-col gap-4 shrink-0">
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-zinc-800/50 to-transparent border-l-2 border-cyan-500">
                                    <div className="p-2 rounded-full bg-cyan-500/10 flex-shrink-0">
                                        <Activity className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-[10px] uppercase tracking-widest text-cyan-500 font-bold mb-0.5">Impact</h3>
                                        <p className="text-white font-medium text-sm md:text-base leading-snug drop-shadow-sm line-clamp-2">{project.impact}</p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-3 mt-2">
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2.5 rounded-lg font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 pointer-events-auto"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Live Demo
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 px-4 py-2.5 rounded-lg font-medium text-sm transition-all hover:scale-[1.02] active:scale-95 pointer-events-auto shadow-md"
                                        >
                                            <Github className="w-4 h-4" />
                                            Source
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
