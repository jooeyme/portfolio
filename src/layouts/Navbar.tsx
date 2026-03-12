import { Search, Bell, User } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-colors duration-300 px-4 md:px-12 py-4 flex items-center justify-between ${isScrolled ? 'bg-[#141414]' : 'bg-linear-to-b from-black/80 to-transparent'
                }`}
        >
            <div className="flex items-center gap-8">
                <span
                    className="text-red-500 text-2xl md:text-3xl font-bold tracking-tighter uppercase cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    PORTFOLIO
                </span>
                <ul className="hidden md:flex gap-6 text-sm text-gray-300">
                    <li
                        className="hover:text-white cursor-pointer transition"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        Home
                    </li>
                    <li
                        className="hover:text-white cursor-pointer transition"
                        onClick={() => scrollToSection('about')}
                    >
                        About
                    </li>
                    <li
                        className="hover:text-white cursor-pointer transition"
                        onClick={() => scrollToSection('projects')}
                    >
                        Projects
                    </li>
                    <li
                        className="hover:text-white cursor-pointer transition"
                        onClick={() => scrollToSection('contact')}
                    >
                        Contact
                    </li>
                </ul>
            </div>
            <div className="flex items-center gap-6 text-white">
                <Search className="w-6 h-6 cursor-pointer hover:text-gray-300" />
                <Bell className="w-6 h-6 cursor-pointer hover:text-gray-300" />
                <div className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center">
                        <User className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </nav>
    );
}
