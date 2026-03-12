import { Send, Mail, Linkedin, Github } from 'lucide-react';
import { PROFILE } from '@/data/portfolioData';

interface ContactProps {
    id: string;
}

export function Contact({ id }: ContactProps) {
    return (
        <section id={id} className="py-20 px-4 md:px-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-t from-red-900/10 to-transparent pointer-events-none"></div>

            <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Let's Connect</h2>
                <p className="text-gray-400 text-lg">
                    Have a project in mind or just want to say hi? I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                <div className="bg-zinc-900/80 backdrop-blur-sm p-8 rounded-xl border border-zinc-800">
                    <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Name</label>
                                <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-3 text-white focus:outline-none focus:border-red-600 transition" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Email</label>
                                <input type="email" className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-3 text-white focus:outline-none focus:border-red-600 transition" placeholder="john@example.com" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Subject</label>
                            <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-3 text-white focus:outline-none focus:border-red-600 transition" placeholder="Project Discussion" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Message</label>
                            <textarea rows={5} className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-3 text-white focus:outline-none focus:border-red-600 transition resize-none" placeholder="Tell me about your project..."></textarea>
                        </div>

                        <button type="submit" className="w-full bg-red-600 text-white font-bold py-4 rounded-md hover:bg-red-700 transition flex items-center justify-center gap-2">
                            <Send className="w-5 h-5" /> Send Message
                        </button>
                    </form>
                </div>

                <div className="flex flex-col justify-center space-y-6">
                    <a href={PROFILE.socials.email} className="group bg-zinc-900 hover:bg-zinc-800 p-8 rounded-xl border border-zinc-800 transition duration-300 flex items-center gap-6 cursor-pointer">
                        <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center group-hover:bg-red-600/20 transition">
                            <Mail className="w-8 h-8 text-red-600" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-white">Email Me</h4>
                            <p className="text-gray-500 group-hover:text-red-500 transition">High response rate</p>
                        </div>
                    </a>

                    <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="group bg-zinc-900 hover:bg-zinc-800 p-8 rounded-xl border border-zinc-800 transition duration-300 flex items-center gap-6 cursor-pointer">
                        <div className="w-16 h-16 rounded-full bg-blue-600/10 flex items-center justify-center group-hover:bg-blue-600/20 transition">
                            <Linkedin className="w-8 h-8 text-blue-500" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-white">LinkedIn</h4>
                            <p className="text-gray-500 group-hover:text-blue-500 transition">Let's connect professionally</p>
                        </div>
                    </a>

                    <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="group bg-zinc-900 hover:bg-zinc-800 p-8 rounded-xl border border-zinc-800 transition duration-300 flex items-center gap-6 cursor-pointer">
                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition">
                            <Github className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-white">GitHub</h4>
                            <p className="text-gray-500 group-hover:text-white transition">Check out my code</p>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}
