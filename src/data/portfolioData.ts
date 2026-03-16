import { IconType } from 'react-icons';
import { FaReact, FaNodeJs, FaPython, FaAws, FaDocker, FaHtml5, FaCss3Alt, FaJs, FaLaravel, FaGithub } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiPostgresql, SiGraphql, SiMongodb, SiGithub, SiLinkedin, SiKubernetes, SiMysql, SiElasticsearch, SiSequelize, SiGooglecloud } from 'react-icons/si';
import { Mail } from 'lucide-react';

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
    name: "Tejoo",
    title: "Fullstack Web Developer",
    description: "Building scalable web applications with a focus on seamless user experiences. Specializing in React, Node.js, and Cloud Infrastructure.",
    socials: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        email: "mailto:alex@example.com"
    }
};

export const ABOUT_ME = {
    headline: "Engineering the Future of Web Experiences.",
    paragraph: "I'm a Fullstack Architect who bridges the gap between design and deep technical execution. I believe that performance is a feature, and I build scalable, beautiful applications that feel alive. When I'm not architecting cloud infrastructure, I'm probably obsessing over micro-interactions.",
    direction: {
        title: "Where I'm Headed",
        content: "My current focus is on exploring edge computing, serverless architectures with Next.js, and integrating AI-driven interfaces to create hyper-personalized user experiences. I'm building tools that empower developers and simplify complex workflows."
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
    problem: string;
    solution: string;
    impact: string;
    color: string;
    githubUrl: string;
    // New Case Study Fields
    overview: string;
    scope: { users?: string; endpoints?: string; tables?: string; roles?: string;[key: string]: string | undefined };
    responsibilities: string[];
    technicalDecisions: { title: string; description: string }[];
    lessonsLearned: string;
}

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: "SIMANHUT",
        description: "Sistem web untuk mengelola dan mengarsipkan dokumen secara digital dengan fitur pencarian dokumen yang cepat dan terstruktur.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        video: null,
        tags: ["React", "JavaScript", "Tailwind", "Node.js", "PostgreSQL", "Elasticsearch", "Docker"],
        category: "Fullstack",
        match: "98% Match",
        duration: "2024",
        maturity: "16+",
        color: "#0ea5e9",
        githubUrl: "https://github.com",
        features: ["Real-time Analytics", "Dark Mode", "Role-based Auth"],
        problem: "Pencarian dokumen menggunakan query database biasa menjadi lambat ketika jumlah arsip semakin banyak.",
        solution: "Mengintegrasikan Elasticsearch untuk melakukan indexing dokumen sehingga pencarian dapat dilakukan menggunakan full-text search dan advanced filtering.",
        impact: "Mempercepat proses pencarian dokumen dan meningkatkan efisiensi pengelolaan arsip.",
        overview: "SIMANHUT is a comprehensive digital archiving system built for a university forestry department. It digitizes physical documents and provides a blazing-fast centralized search engine to retrieve historical archives instantaneously.",
        scope: { users: "500+", endpoints: "40+", tables: "15", roles: "Super Admin, Staff, Viewer" },
        responsibilities: [
            "Architected the relational database schema for document metadata.",
            "Built secure REST APIs using Node.js and Express.",
            "Integrated Elasticsearch for full-text indexing.",
            "Implemented role-based access control (RBAC)."
        ],
        technicalDecisions: [
            {
                title: "Elasticsearch over SQL LIKE %",
                description: "Chosen to handle full-text search across thousands of documents efficiently. Standard SQL LIKE queries would result in full table scans and unacceptable latency at scale."
            }
        ],
        lessonsLearned: "Learned the intricacies of index synchronization between a primary relational database and a secondary NoSQL search engine, ensuring eventual consistency without dragging down the main API response times."
    },
    {
        id: 2,
        title: "Sistem Reservasi Fasilitas",
        description: "Sistem reservasi fasilitas yang memungkinkan mahasiswa memesan ruang atau fasilitas kampus dengan alur persetujuan administrator.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop",
        video: null,
        tags: ["React", "JavaScript", "Tailwind", "Node.js", "PostgreSQL", "Socket.io"],
        category: "Frontend",
        match: "95% Match",
        duration: "2023",
        maturity: "13+",
        color: "#8b5cf6",
        githubUrl: "https://github.com",
        features: ["Live Chat", "Code Syntax Highlighting", "Job Board"],
        problem: "Proses peminjaman fasilitas dilakukan secara manual sehingga sering terjadi konflik jadwal dan sulit memantau status peminjaman.",
        solution: "Membangun sistem reservasi dengan RESTful API, autentikasi JWT, dan role-based access control untuk mengelola hak akses mahasiswa dan administrator.",
        impact: "Proses reservasi menjadi lebih terorganisir dan transparan bagi pengguna maupun administrator.",
        overview: "A facility reservation platform designed to streamline campus resource allocation. The system manages room bookings, equipment rentals, and enforces complex scheduling rules with a multi-tier approval workflow.",
        scope: { users: "20,000+", tables: "25", roles: "Student, Lecturer, Facility Admin" },
        responsibilities: [
            "Developed the frontend reservation interface using React.",
            "Implemented real-time WebSocket notifications for approval status updates.",
            "Designed the scheduling conflict-resolution algorithm in the backend."
        ],
        technicalDecisions: [
            {
                title: "Socket.io for Real-time Updates",
                description: "Used WebSockets instead of HTTP polling to immediately notify students when their urgent facility requests are approved or rejected by administrators."
            }
        ],
        lessonsLearned: "Handling time-zones and date-math accurately is surprisingly complex. Adopting a strict UTC-only policy in the database and enforcing client-side localization resolved many edge cases involving overlapping booking slots."
    },
    {
        id: 3,
        title: "JobHunter",
        description: "Aplikasi web untuk membantu pengguna melacak berbagai lamaran pekerjaan serta memantau status proses rekrutmen.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
        video: null,
        tags: ["React", "Node.js", "PostgreSQL", "Tailwind", "Docker"],
        category: "AI/ML",
        match: "99% Match",
        duration: "2024",
        maturity: "18+",
        color: "#f43f5e",
        githubUrl: "https://github.com",
        features: ["Text-to-Image", "Image Editing", "Gallery"],
        problem: "Pencari kerja sering kesulitan mengelola banyak lamaran pekerjaan dan melacak tahap rekrutmen yang berbeda.",
        solution: "Menyediakan dashboard untuk mencatat lamaran, memperbarui status proses, serta menyimpan catatan interview.",
        impact: "Mempermudah pengguna dalam memantau dan mengelola proses pencarian kerja secara lebih terstruktur.",
        overview: "JobHunter is a personal career CRM. It allows job seekers to meticulously track applications across multiple platforms, organize interview notes, and visualize their overall applying funnel through a unified dashboard.",
        scope: { users: "Open Registration", endpoints: "25+", tables: "8" },
        responsibilities: [
            "Designed and built the entire application end-to-end as a solo project.",
            "Containerized the application using Docker for consistent local development and production deployments.",
            "Created responsive React kanban boards for application stage tracking."
        ],
        technicalDecisions: [
            {
                title: "Docker Containerization",
                description: "Containerized the Node.js backend and Postgres database to ensure that local development environments perfectly mirrored the production VPS, eliminating 'it works on my machine' issues."
            }
        ],
        lessonsLearned: "UI/UX plays a massive role in user retention for productivity tools. Implementing drag-and-drop mechanics (Kanban) significantly improved the user experience compared to traditional form-based status updates."
    },
];

export interface Experience {
    id: number;
    role: string;
    company: string;
    period: string;
    description: string;
    responsibilities: string[];
    achievements: string[];
    color: string;
}

export const EXPERIENCE: Experience[] = [
    {
        id: 1,
        role: "Full Stack Web Developer Intern",
        company: "Departemen Manajemen Hutan, IPB University",
        period: "Feb 2024 - Des 2024",
        color: "#ffffff",
        description: "Developed and maintained several web-based systems to support faculty administrative workflows, focusing on backend API development, database design, and system security.",
        responsibilities: [
            "Developed 50+ RESTful API endpoints using Node.js and Express.",
            "Designed relational database schemas consisting of 15 interconnected tables.",
            "Implemented JWT authentication and role-based access control for secure system access.",
            "Deployed web applications using Vercel and Railway."
        ],
        achievements: [
            "Built a faculty reservation system supporting 4 administrators and 500+ student users.",
            "Implemented document search functionality using Elasticsearch with Docker.",
            "Performed security testing using OWASP ZAP, reducing vulnerabilities to only minor alerts."
        ]
    },

];

export interface ContactItem {
    id: string;
    title: string;
    description: string;
    value: string;
    icon: IconType | typeof Mail;
    type: 'email' | 'link';
}

export const CONTACT_DATA = {
    headline: "Let's Build Something Impactful.",
    paragraph: "Whether you have a deep technical challenge, an architectural vision, or just want to connect over scalable systems—I'm always open to discussing new opportunities and engineering the future together.",
    cards: [
        {
            id: 'email',
            title: 'Email',
            description: 'Direct line to my inbox',
            value: 'mtejo25@gmail.com',
            icon: Mail,
            type: 'email'
        },
        {
            id: 'linkedin',
            title: 'LinkedIn',
            description: 'Professional network',
            value: 'https://linkedin.com/in/alexdev',
            icon: SiLinkedin,
            type: 'link'
        },
        {
            id: 'github',
            title: 'GitHub',
            description: 'Open source contributions',
            value: 'https://github.com/alexdev',
            icon: SiGithub,
            type: 'link'
        }
    ] as ContactItem[]
};

export interface SkillItem {
    id: string;
    category: string;
    description: string;
    items: {
        name: string;
        icon: IconType;
    }[];
}

export const SKILLS: SkillItem[] = [
    {
        id: "frontend",
        category: "Frontend",
        description: "Building responsive, accessible, and performant user interfaces with modern web technologies.",
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
        id: "backend",
        category: "Backend",
        description: "Designing scalable RESTful and GraphQL APIs, microservices, and asynchronous event-driven architectures.",
        items: [
            { name: "Node.js", icon: FaNodeJs },
            { name: "Express.js", icon: FaNodeJs },
            { name: "Laravel", icon: FaLaravel },
            { name: "Python", icon: FaPython },
            { name: "GraphQL", icon: SiGraphql }
        ]
    },
    {
        id: "data",
        category: "Database",
        description: "Managing operational databases, data warehousing, and implementing fast full-text search engines.",
        items: [
            { name: "PostgreSQL", icon: SiPostgresql },
            { name: "MySQL", icon: SiMysql },
            { name: "MongoDB", icon: SiMongodb },
            { name: "Sequelize", icon: SiSequelize },
            { name: "Elasticsearch", icon: SiElasticsearch },
        ]
    },
    {
        id: "devops",
        category: "Cloud & DevOps",
        description: "Automating CI/CD pipelines, containerizing applications, and provisioning deterministic cloud infrastructure.",
        items: [
            { name: "Git & GitHub", icon: FaGithub },
            { name: "AWS", icon: FaAws },
            { name: "Docker", icon: FaDocker },
            { name: "Kubernetes", icon: SiKubernetes },
            { name: "Google Cloud", icon: SiGooglecloud }
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
