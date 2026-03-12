import { PROFILE, SKILLS, EDUCATION, EXPERIENCE } from '@/data/portfolioData';
import { Briefcase, GraduationCap, FileText } from 'lucide-react';
import Image from 'next/image';

interface AboutProps {
    id: string;
}

export function About({ id }: AboutProps) {
    return (
        <section id={id} className="py-20 px-4 md:px-12 max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-white border-l-4 border-red-600 pl-4">About Me</h2>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 mb-20">
                <div className="relative">
                    <div className="aspect-3/4 rounded-lg overflow-hidden border-2 border-zinc-800 shadow-2xl relative">
                        <Image
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop"
                            alt={PROFILE.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl font-semibold text-white mb-4">Biography</h3>
                        <p className="text-gray-400 text-lg leading-relaxed">{PROFILE.description}</p>
                        <div className="mt-6 flex flex-wrap gap-4">
                            <div className="bg-zinc-900 px-6 py-3 rounded-lg border border-zinc-800">
                                <span className="block text-2xl font-bold text-white">5+</span>
                                <span className="text-gray-500 text-sm">Years Exp.</span>
                            </div>
                            <div className="bg-zinc-900 px-6 py-3 rounded-lg border border-zinc-800">
                                <span className="block text-2xl font-bold text-white">50+</span>
                                <span className="text-gray-500 text-sm">Projects</span>
                            </div>
                            <div className="bg-zinc-900 px-6 py-3 rounded-lg border border-zinc-800">
                                <span className="block text-2xl font-bold text-white">20+</span>
                                <span className="text-gray-500 text-sm">Clients</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold text-white mb-6">Skills & Tech Stack</h3>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                            {SKILLS.flatMap(group => group.items).map((skill) => (
                                <div key={skill.name} className="bg-zinc-900 hover:bg-zinc-800 transition p-3 rounded-lg border border-zinc-800 flex flex-col items-center justify-center gap-2 group cursor-default">
                                    <div className="p-2 bg-red-600/10 rounded-full group-hover:bg-red-600/20 transition text-red-500">
                                        <skill.icon size={20} />
                                    </div>
                                    <span className="text-gray-300 font-medium text-xs text-center">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h3 className="flex items-center gap-3 text-2xl font-semibold text-white mb-8">
                        <GraduationCap className="text-red-500" /> Education
                    </h3>
                    <div className="space-y-8 pl-4 border-l border-zinc-800">
                        {EDUCATION.map((edu) => (
                            <div key={edu.id} className="relative pl-8 group">
                                <span className="absolute -left-5 top-2 w-2.5 h-2.5 rounded-full bg-red-600 ring-4 ring-[#141414]"></span>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                                        <p className="text-gray-400">{edu.school}</p>
                                        <span className="text-sm text-gray-500 inline-block mb-2">{edu.year}</span>
                                        <p className="text-gray-400 text-sm">{edu.description}</p>
                                    </div>
                                    <button className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition text-gray-400 hover:text-white" title="View Certificate">
                                        <FileText size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="flex items-center gap-3 text-2xl font-semibold text-white mb-8">
                        <Briefcase className="text-red-500" /> Experience
                    </h3>
                    <div className="space-y-8 pl-4 border-l border-zinc-800">
                        {EXPERIENCE.map((exp) => (
                            <div key={exp.id} className="relative pl-8 group">
                                <span className="absolute -left-5 top-2 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-[#141414]"></span>
                                <div>
                                    <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                                    <p className="text-gray-400">{exp.company}</p>
                                    <span className="text-sm text-gray-500 inline-block mb-2">{exp.period}</span>
                                    <p className="text-gray-400 text-sm line-clamp-3 hover:line-clamp-none transition">{exp.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
