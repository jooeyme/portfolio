'use client';

import { useState } from 'react';
import { usePortfolioController } from '@/controllers/usePortfolioController';
import { Hero } from '@/sections/Hero';
import { Navbar } from '@/layouts/Navbar';
import { Footer } from '@/layouts/Footer';
import { SplashScreen } from '@/components/SplashScreen';
import dynamic from 'next/dynamic';

const FeaturedProjects = dynamic(() => import('@/sections/FeaturedProjects').then(mod => ({ default: mod.FeaturedProjects })));
const ExperienceSection = dynamic(() => import('@/sections/ExperienceSection'));
const AboutSection = dynamic(() => import('@/sections/AboutSection').then(mod => ({ default: mod.AboutSection })));
const ContactSection = dynamic(() => import('@/sections/ContactSection').then(mod => ({ default: mod.ContactSection })));
const ModalDetail = dynamic(() => import('@/components/ModalDetail').then(mod => ({ default: mod.ModalDetail })));

export default function Home() {
    const [loading, setLoading] = useState(true);
    const {
        projects,
        selectedProject,
        openModal,
        closeModal,
    } = usePortfolioController();

    const featuredProject = projects[0];

    if (loading) {
        return <SplashScreen onFinish={() => setLoading(false)} />;
    }

    return (
        <div className="bg-black min-h-screen text-white overflow-clip font-sans">
            <Navbar />
            <Hero featuredProject={featuredProject} />
            <main className="relative z-10 w-full overflow-visible">
                <div id="projects" className="relative z-20 pl-4 md:pl-0 mb-24 -mt-20 md:-mt-32">
                    <FeaturedProjects onOpenModal={openModal} />
                </div>
                <ExperienceSection />
                <AboutSection />
                <ContactSection id="contact" />
            </main>
            <Footer />
            {selectedProject && (
                <ModalDetail project={selectedProject} onClose={closeModal} />
            )}
        </div>
    );
}
