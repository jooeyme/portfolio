import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Plus } from 'lucide-react';
import { Project } from '../../models/portfolioData';

interface ModalDetailProps {
    project: Project | null;
    onClose: () => void;
}

export function ModalDetail({ project, onClose }: ModalDetailProps) {
    if (!project) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/60 backdrop-blur-sm p-4 md:p-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative w-full max-w-4xl bg-[#181818] rounded-lg shadow-2xl overflow-hidden text-white"
                >
                    <div className="relative aspect-video w-full">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#181818] flex items-center justify-center hover:bg-zinc-800 transition"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="absolute bottom-10 left-10">
                            <h2 className="text-4xl md:text-5xl font-black mb-4 drop-shadow-lg">{project.title}</h2>
                            <div className="flex gap-4">
                                <button className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200 transition">
                                    <Play className="w-5 h-5 fill-black" />
                                    Play Demo
                                </button>
                                <button className="flex items-center gap-2 bg-gray-600/80 text-white px-6 py-2 rounded font-bold hover:bg-gray-600 transition">
                                    <Plus className="w-5 h-5" />
                                    My List
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-x-10">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-green-500 font-bold">{project.match}</span>
                                <span className="text-gray-400">{project.duration}</span>
                                <span className="border border-gray-500 px-2 text-sm text-gray-400 uppercase">{project.maturity}</span>
                            </div>

                            <p className="text-lg text-white mb-6 leading-relaxed">
                                {project.description}
                            </p>

                            <h3 className="text-xl font-semibold mb-3 text-gray-200">Key Features</h3>
                            <ul className="list-disc list-inside text-gray-400 mb-8 space-y-1">
                                {project.features?.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="text-sm">
                            <div className="mb-4">
                                <span className="text-gray-500 block mb-1">Tech Stack:</span>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="text-white hover:underline cursor-pointer">{tag},</span>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-4">
                                <span className="text-gray-500 block mb-1">Category:</span>
                                <span className="text-white">{project.category}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
