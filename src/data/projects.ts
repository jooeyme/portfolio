export interface ProjectData {
    id: string;
    title: string;
    summary: string;
    image: string;
    techStack: string[];
    problem: string;
    solution: string;
    impact: string;
    color: string;
    githubUrl: string;
    liveUrl: string;
}

export const FEATURED_PROJECTS: ProjectData[] = [
    {
        id: "proj-1",
        title: "OmniDashboard Pro",
        summary: "A high-performance enterprise analytics platform processing 5M+ daily events with sub-second latency.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        techStack: ["Next.js 14", "PostgreSQL", "Tailwind", "Framer Motion", "tRPC"],
        problem: "Legacy BI tools took 45+ seconds to generate weekly reports, causing massive bottlenecks in decision-making.",
        solution: "Engineered a custom OLAP cube using PostgreSQL and materialized views, paired with a React concurrent-mode dashboard.",
        impact: "Reduced query times by 99%, increased user adoption by 300% within the first month.",
        color: "#0ea5e9", // Cyan
        githubUrl: "https://github.com",
        liveUrl: "https://example.com"
    },
    {
        id: "proj-2",
        title: "Nexus Developer Hub",
        summary: "A real-time collaborative workspace for distributed engineering teams with integrated code reviews.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
        techStack: ["React", "Node.js", "Socket.io", "Redis", "TypeScript"],
        problem: "Asynchronous code reviews across different timezones led to an average PR merge time of 4.5 days.",
        solution: "Built a real-time commenting engine using WebSockets with optimistic UI updates for zero-latency feel.",
        impact: "Decreased average PR merge time to 1.2 days and saved estimated $200k/year in engineering hours.",
        color: "#8b5cf6", // Violet
        githubUrl: "https://github.com",
        liveUrl: "https://example.com"
    },
    {
        id: "proj-3",
        title: "Aura AI Generator",
        summary: "Consumer-facing AI image generation studio utilizing fine-tuned Stable Diffusion models.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop",
        techStack: ["Next.js", "Python", "AWS", "Stripe", "Framer Motion"],
        problem: "Existing AI tools had steep learning curves and fragmented generation pipelines for non-technical users.",
        solution: "Designed a linear node-based visual editor with simplified prompt-assistance and intelligent layer management.",
        impact: "Reached 100k+ MAU in 3 months generating over 2M images with a 4.8/5 user satisfaction score.",
        color: "#f43f5e", // Rose
        githubUrl: "https://github.com",
        liveUrl: "https://example.com"
    }
];
