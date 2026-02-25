import { useTransform, MotionValue } from 'framer-motion';

export function useCursorProximity(
    mouseX: MotionValue<number>,
    mouseY: MotionValue<number>,
    initialX: number,
    initialY: number,
    layer: number
) {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    return {
        xOffset: useTransform([mouseX, mouseY], ([mX, mY]: number[]) => {
            if (isMobile) return 0;
            const dx = mX - initialX;
            const distance = Math.sqrt(dx * dx + Math.pow(mY - initialY, 2));

            const maxDist = 300;
            let proximityForce = 0;
            if (distance < maxDist && distance > 0) {
                // Closer to 0 distance means higher force
                proximityForce = ((maxDist - distance) / maxDist) * 30 * layer;
            }

            // Direction vector (pushing away from cursor)
            const dirX = distance > 0 ? dx / distance : 0;

            // Standard parallax based on screen center
            const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
            const parallax = (mX - centerX) * layer * 0.02;

            // Combine parallax and repulsion
            return parallax - (dirX * proximityForce);
        }),
        yOffset: useTransform([mouseX, mouseY], ([mX, mY]: number[]) => {
            if (isMobile) return 0;
            const dy = mY - initialY;
            const distance = Math.sqrt(Math.pow(mX - initialX, 2) + dy * dy);

            const maxDist = 300;
            let proximityForce = 0;
            if (distance < maxDist && distance > 0) {
                proximityForce = ((maxDist - distance) / maxDist) * 30 * layer;
            }

            const dirY = distance > 0 ? dy / distance : 0;
            const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
            const parallax = (mY - centerY) * layer * 0.02;

            return parallax - (dirY * proximityForce);
        })
    };
}
