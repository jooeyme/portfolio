import { useState } from 'react';
import { usePortfolioController } from './controllers/usePortfolioController';
import { Hero } from './views/sections/Hero';
import { Navbar } from './views/layouts/Navbar';
import { Footer } from './views/layouts/Footer';
import { About } from './views/sections/About';
import { Contact } from './views/sections/Contact';
import { FeaturedProjects } from './views/sections/FeaturedProjects';
import { ModalDetail } from './views/components/ModalDetail';
import { SplashScreen } from './views/components/SplashScreen';
import ExperienceSection from './views/sections/ExperienceSection';

function App() {
    const [loading, setLoading] = useState(true);
    const {
        projects,
        selectedProject,
        openModal,
        closeModal,
    } = usePortfolioController();

    // Pick a random project to feature in the hero
    const featuredProject = projects[0];

    if (loading) {
        return <SplashScreen onFinish={() => setLoading(false)} />;
    }

    return (
        <div className="bg-black min-h-screen text-white overflow-clip font-sans">
            <Navbar />

            <Hero featuredProject={featuredProject} onOpenModal={openModal} />

            <main className="relative z-10 w-full overflow-visible">
                <div id="projects" className="relative z-20 pl-4 md:pl-0 mb-24 -mt-20 md:-mt-32">
                    <FeaturedProjects />
                </div>

                <ExperienceSection />

                <About id="about" />

                <Contact id="contact" />
            </main>

            <Footer />

            {selectedProject && (
                <ModalDetail project={selectedProject} onClose={closeModal} />
            )}
        </div>
    );
}

export default App;
