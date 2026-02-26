export const experiences = [
    {
        role: "Senior Frontend Engineer",
        company: "Vercel",
        period: "2023 - Present",
        color: "#ffffff",
        description: "Leading the core UI architecture for Next.js 14 and beyond, crafting the highest standard of web development tools.",
        responsibilities: [
            "Architected the App Router visual transition engine",
            "Mentored junior engineers across 3 time zones",
            "Overhauled internal state management using React Server Components"
        ],
        achievements: [
            "Reduced bundle size by 40%",
            "Increased Lighthouse score to 100/100"
        ]
    },
    // {
    //     role: "Full Stack Developer",
    //     company: "Stripe",
    //     period: "2021 - 2023",
    //     color: "#6366f1", // Indigo
    //     description: "Built the unified dashboard for Stripe Connect platforms. Created beautiful financial visualizations mapping billions of operations.",
    //     responsibilities: [
    //         "Developed high-performance financial data tables",
    //         "Integrated real-time websocket updates",
    //         "Built resilient microservices in Go"
    //     ],
    //     achievements: [
    //         "Handled $3B+ in daily transaction volume visually",
    //         "Decreased dashboard load time by 2.5s"
    //     ]
    // },
    // {
    //     role: "UI Engineer",
    //     company: "Linear",
    //     period: "2019 - 2021",
    //     color: "#a855f7", // Purple
    //     description: "Crafted the initial magical interactions that define Linear's UI. Delivered 60fps animations across all web and desktop clients.",
    //     responsibilities: [
    //         "Created the CMD+K command palette",
    //         "Implemented keyboard-first navigation",
    //         "Optimized drag-and-drop kanban boards"
    //     ],
    //     achievements: [
    //         "Won Awwwards Site of the Day",
    //         "Built offline-first sync engine UI"
    //     ]
    // }
];

export type ExperienceData = typeof experiences[0];
