import type { Metadata } from 'next';
import './globals.css';
import "tailwindcss";

export const metadata: Metadata = {
    icons: {
        icon: { url: '/tejo-logo.png', type: "image/png", sizes: "32x32" }
    },
    title: 'Portfolio',
    description: 'A modern developer portfolio built with Next.js and Framer Motion.',


};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-black text-white overflow-x-hidden">{children}</body>
        </html>
    );
}
