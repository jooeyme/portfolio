import { useRef, useState, useEffect } from 'react';
import { useSpring } from 'framer-motion';

export function useMagnetic<T extends HTMLElement = any>(stiffness = 150, damping = 15, mass = 0.1) {
    const ref = useRef<T>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useSpring(0, { stiffness, damping, mass });
    const y = useSpring(0, { stiffness, damping, mass });

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = element.getBoundingClientRect();
            const middleX = clientX - (left + width / 2);
            const middleY = clientY - (top + height / 2);

            x.set(middleX * 0.3); // Pull strength
            y.set(middleY * 0.3);
        };

        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => {
            setIsHovered(false);
            x.set(0);
            y.set(0);
        };

        // For mobile, disable magnetic effect
        const isMobile = window.innerWidth <= 768;
        if (isMobile) return;

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [x, y]);

    return { ref, x, y, isHovered };
}
