"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Database, Users, Shield, Server, Terminal, Settings } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/data/portfolioData';

interface ModalDetailProps {
    project: Project | null;
    onClose: () => void;
}

export function ModalDetail({ project, onClose }: ModalDetailProps) {
    if (!project) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-100 flex items-start pt-10 md:pt-16 justify-center overflow-y-auto overflow-x-hidden bg-black/60 backdrop-blur-sm p-4 md:p-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative w-full max-w-4xl my-auto bg-[#181818] rounded-lg shadow-2xl overflow-hidden text-white"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center transition border border-white/10"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="relative aspect-video w-full">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#181818] via-transparent to-transparent z-10"></div>

                        <div className="absolute bottom-10 left-10 z-15">
                            <h2 className="text-4xl md:text-5xl font-black mb-4 drop-shadow-lg">{project.title}</h2>
                            {/* <div className="flex gap-4">
                                <button className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200 transition">
                                    <Play className="w-5 h-5 fill-black" />
                                    Play Demo
                                </button>
                                <button className="flex items-center gap-2 bg-gray-600/80 text-white px-6 py-2 rounded font-bold hover:bg-gray-600 transition">
                                    <Plus className="w-5 h-5" />
                                    My List
                                </button>
                            </div> */}
                        </div>
                    </div>

                    {/* CASE STUDY CONTENT AREA */}
                    <div className="p-6 md:p-10 text-gray-300 space-y-12">
                        
                        {/* Header Info & Tech Stack */}
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-white/10 pb-8">
                            <div>
                                <div className="flex items-center gap-4 mb-3">
                                    <span className="text-cyan-500 font-bold text-sm tracking-wider uppercase">{project.category}</span>
                                    <span className="text-zinc-500 text-sm">{project.duration}</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-white">Technology Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-zinc-300">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4 w-full md:w-auto mt-4 md:mt-0">
                                {project.id && (
                                    <a href="#" target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-2.5 rounded-lg font-bold text-sm transition-all">
                                        <ExternalLink className="w-4 h-4" />
                                        Live Demo
                                    </a>
                                )}
                                {project.githubUrl && (
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-md">
                                        <Github className="w-4 h-4" />
                                        Source
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* 1. Project Overview */}
                        <section>
                            <h3 className="text-2xl font-bold mb-4 text-white">Project Overview</h3>
                            <p className="text-lg text-zinc-400 leading-relaxed">
                                {project.overview || project.description}
                            </p>
                        </section>

                        {/* 2. System Scope */}
                        {project.scope && Object.keys(project.scope).length > 0 && (
                            <section>
                                <h3 className="text-2xl font-bold mb-6 text-white">System Scope</h3>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    {Object.entries(project.scope).map(([key, value]) => {
                                        // A simple map to select an icon based on the key name
                                        const Icon = 
                                            key.toLowerCase().includes('user') ? Users :
                                            key.toLowerCase().includes('endpoint') || key.toLowerCase().includes('api') ? Server :
                                            key.toLowerCase().includes('table') || key.toLowerCase().includes('data') ? Database :
                                            key.toLowerCase().includes('role') ? Shield : Settings;
                                        
                                        return (
                                            <div key={key} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 flex flex-col gap-2">
                                                <div className="flex items-center gap-2 text-cyan-500">
                                                    <Icon className="w-5 h-5" />
                                                    <span className="text-xs uppercase tracking-widest font-bold">{key}</span>
                                                </div>
                                                <span className="text-xl font-medium text-white">{value}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {/* 3. My Responsibilities */}
                        {project.responsibilities && project.responsibilities.length > 0 && (
                            <section>
                                <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                                    <Terminal className="w-6 h-6 text-cyan-500" />
                                    My Responsibilities
                                </h3>
                                <ul className="space-y-4">
                                    {project.responsibilities.map((resp, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                                            <span className="text-zinc-400 leading-relaxed">{resp}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* 4. Key Technical Decisions */}
                        {project.technicalDecisions && project.technicalDecisions.length > 0 && (
                            <section>
                                <h3 className="text-2xl font-bold mb-6 text-white">Key Technical Decisions</h3>
                                <div className="space-y-6">
                                    {project.technicalDecisions.map((tech, i) => (
                                        <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative overflow-hidden group">
                                            <span className="absolute inset-y-0 left-0 w-1 bg-cyan-500/50 group-hover:bg-cyan-500 transition-colors"></span>
                                            <h4 className="text-lg font-bold text-white mb-2">{tech.title}</h4>
                                            <p className="text-zinc-400 leading-relaxed text-sm lg:text-base">
                                                {tech.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 5. Lessons Learned */}
                        {project.lessonsLearned && (
                            <section className="bg-gradient-to-br from-cyan-950/20 to-transparent border border-cyan-900/30 rounded-2xl p-6 md:p-8">
                                <h3 className="text-xl font-bold mb-4 text-cyan-400">Lessons Learned</h3>
                                <p className="text-zinc-300 leading-relaxed italic">
                                    "{project.lessonsLearned}"
                                </p>
                            </section>
                        )}

                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
