"use client";
import { motion, MotionValue } from 'framer-motion';
import { useCursorProximity } from '@/hooks/useCursorProximity';
import { ReactNode } from 'react';

interface TechParticleProps {
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
    icon: ReactNode;
    xPct: number;
    yPct: number;
    layer: number; // 1, 2, 3
}

export function TechParticle({ mouseX, mouseY, icon, xPct, yPct, layer }: TechParticleProps) {
    const floatDuration = 3 + Math.random() * 4;
    const floatDelay = Math.random() * 2;
    const floatOffset = layer * 8;

    const initialX = (xPct / 100) * (typeof window !== 'undefined' ? window.innerWidth : 1920);
    const initialY = (yPct / 100) * (typeof window !== 'undefined' ? window.innerHeight : 1080);

    const { xOffset, yOffset } = useCursorProximity(mouseX, mouseY, initialX, initialY, layer);

    const zIndex = layer === 1 ? 0 : layer === 2 ? 10 : 20;
    const scale = layer === 1 ? 0.5 : layer === 2 ? 0.8 : 1.2;
    const opacity = layer === 1 ? 0.15 : layer === 2 ? 0.35 : 0.6;
    const blur = layer === 1 ? 'blur(3px)' : layer === 2 ? 'blur(1px)' : 'blur(0px)';

    return (
        <motion.div
            className="absolute text-white pointer-events-none"
            style={{
                left: `${xPct}%`,
                top: `${yPct}%`,
                x: xOffset,
                y: yOffset,
                zIndex,
                scale,
                opacity,
                filter: blur,
            }}
        >
            <motion.div
                animate={{
                    y: [0, -floatOffset, 0],
                    x: [0, floatOffset * 0.3, 0],
                    rotate: [0, 5, -5, 0]
                }}
                transition={{
                    duration: floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: floatDelay
                }}
            >
                {icon}
            </motion.div>
        </motion.div>
    );
}
