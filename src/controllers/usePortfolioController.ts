import { useState } from 'react';
import { PROJECTS, Project } from '../models/portfolioData';

export function usePortfolioController() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

    const categories = [...new Set(PROJECTS.map(p => p.category))];

    const getProjectsByCategory = (category: string) => {
        return PROJECTS.filter(project => project.category === category);
    };

    const openModal = (project: Project) => {
        setSelectedProject(project);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeModal = () => {
        setSelectedProject(null);
        document.body.style.overflow = 'unset';
    };

    return {
        projects: PROJECTS,
        categories,
        selectedProject,
        hoveredProject,
        setHoveredProject,
        openModal,
        closeModal,
        getProjectsByCategory
    };
}
