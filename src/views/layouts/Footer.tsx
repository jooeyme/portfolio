import { PROFILE } from '../../models/portfolioData';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="px-4 md:px-12 py-12 bg-black border-t border-zinc-900 text-gray-500 text-sm">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex gap-6">
                    <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="hover:text-white transition">
                        <Github className="w-6 h-6" />
                    </a>
                    <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition">
                        <Linkedin className="w-6 h-6" />
                    </a>
                    <a href={PROFILE.socials.email} className="hover:text-white transition">
                        <Mail className="w-6 h-6" />
                    </a>
                </div>

                <div className="flex flex-col items-center md:items-end gap-2">
                    <p>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
                    <p className="text-xs text-gray-600">Built with React, Vite & Tailwind CSS</p>
                </div>
            </div>
        </footer>
    );
}
