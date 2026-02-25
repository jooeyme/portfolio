import { IconType } from 'react-icons';
import { FaReact, FaNodeJs, FaPython, FaAws, FaDocker, FaFigma, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiPostgresql, SiGraphql, SiMongodb } from 'react-icons/si';
import { TbBrandVscode } from 'react-icons/tb';

export interface Profile {
    name: string;
    title: string;
    description: string;
    socials: {
        github: string;
        linkedin: string;
        email: string;
    };
}

export const PROFILE: Profile = {
    name: "Alex Developer",
    title: "Fullstack Architect & UI Engineer",
    description: "Building scalable web applications with a focus on seamless user experiences. Specializing in React, Node.js, and Cloud Infrastructure.",
    socials: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        email: "mailto:alex@example.com"
    }
};

export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    video: string | null;
    tags: string[];
    category: string;
    match: string;
    duration: string;
    maturity: string;
    features: string[];
}

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: "E-Commerce Dashboard",
        description: "A comprehensive dashboard for managing products, orders, and analytics. Features real-time data visualization.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        video: null,
        tags: ["React", "TypeScript", "Tailwind", "Node.js"],
        category: "Fullstack",
        match: "98% Match",
        duration: "2024",
        maturity: "16+",
        features: ["Real-time Analytics", "Dark Mode", "Role-based Auth"]
    },
    {
        id: 2,
        title: "Social Media App",
        description: "A modern social platform connecting developers. Share snippets, discuss code, and find jobs.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop",
        video: null,
        tags: ["Next.js", "Prisma", "PostgreSQL", "Socket.io"],
        category: "Frontend",
        match: "95% Match",
        duration: "2023",
        maturity: "13+",
        features: ["Live Chat", "Code Syntax Highlighting", "Job Board"]
    },
    {
        id: 3,
        title: "AI Image Generator",
        description: "Generates unique images based on text prompts using Stable Diffusion API integration.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
        video: null,
        tags: ["React", "OpenAI API", "Canvas API"],
        category: "AI/ML",
        match: "99% Match",
        duration: "2024",
        maturity: "18+",
        features: ["Text-to-Image", "Image Editing", "Gallery"]
    },
    {
        id: 4,
        title: "Task Management Tool",
        description: "A drag-and-drop kanban board for managing personal and team tasks efficienty.",
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2372&auto=format&fit=crop",
        video: null,
        tags: ["Vue.js", "Firebase", "Pinia"],
        category: "Fullstack",
        match: "85% Match",
        duration: "2023",
        maturity: "All",
        features: ["Drag & Drop", "Real-time Sync", "Team Workspaces"]
    },
    {
        id: 5,
        title: "Crypto Portfolio Tracker",
        description: "Track your cryptocurrency investments in real-time with beautiful charts and alerts.",
        image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=2369&auto=format&fit=crop",
        video: null,
        tags: ["React Native", "Redux", "CoinGecko API"],
        category: "Mobile",
        match: "90% Match",
        duration: "2022",
        maturity: "16+",
        features: ["Price Alerts", "Portfolio Analysis", "News Feed"]
    }
];

export interface Experience {
    id: number;
    role: string;
    company: string;
    period: string;
    description: string;
}

export const EXPERIENCE: Experience[] = [
    {
        id: 1,
        role: "Senior Frontend Engineer",
        company: "Tech Corp Inc.",
        period: "2023 - Present",
        description: "Spearheaded the migration of the core legacy monolith to a micro-frontend architecture using Webpack Module Federation, resulting in a 40% improvement in site load times and enabling independent deployment cycles for feature teams. Mentored 3 junior developers and established code quality standards."
    },
    {
        id: 2,
        role: "Fullstack Developer",
        company: "Startup XYZ",
        period: "2021 - 2023",
        description: "Developed and maintained high-performance RESTful APIs using Node.js and Express. Implemented a robust CI/CD pipeline using GitHub Actions that reduced deployment time by 60%. Collaborated closely with the design team to implement pixel-perfect UIs with React and Tailwind CSS."
    },
    {
        id: 3,
        role: "Web Development Intern",
        company: "Digital Agency One",
        period: "2020 - 2021",
        description: "Assisted in the development of client websites using WordPress and custom PHP. Learned the fundamentals of responsive design and SEO best practices. Participated in daily stand-ups and code reviews."
    }
];

export interface SkillItem {
    category: string;
    items: {
        name: string;
        icon: IconType;
    }[];
}

export const SKILLS: SkillItem[] = [
    {
        category: "Frontend",
        items: [
            { name: "React", icon: FaReact },
            { name: "Framework Next.js", icon: SiNextdotjs },
            { name: "TypeScript", icon: SiTypescript },
            { name: "Tailwind CSS", icon: SiTailwindcss },
            { name: "JavaScript", icon: FaJs },
            { name: "HTML5", icon: FaHtml5 },
            { name: "CSS3", icon: FaCss3Alt }
        ]
    },
    {
        category: "Backend",
        items: [
            { name: "Node.js", icon: FaNodeJs },
            { name: "PostgreSQL", icon: SiPostgresql },
            { name: "Python", icon: FaPython },
            { name: "GraphQL", icon: SiGraphql },
            { name: "MongoDB", icon: SiMongodb }
        ]
    },
    {
        category: "Tools & DevOps",
        items: [
            { name: "Git & GitHub", icon: FaFigma },
            { name: "Docker", icon: FaDocker },
            { name: "AWS", icon: FaAws },
            { name: "Figma", icon: FaFigma },
            { name: "VS Code", icon: TbBrandVscode }
        ]
    }
];

export interface Education {
    id: number;
    degree: string;
    school: string;
    year: string;
    description: string;
}

export const EDUCATION: Education[] = [
    {
        id: 1,
        degree: "B.S. Computer Science",
        school: "University of Technology",
        year: "2018 - 2022",
        description: "Graduated with Honors. Specialized in Software Engineering and AI.",
    },
    {
        id: 2,
        degree: "Fullstack Bootcamp",
        school: "Coding Academy",
        year: "2021",
        description: "Intensive 24-week program focused on MERN stack development.",
    }
];
