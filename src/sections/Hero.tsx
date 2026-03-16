import { AdvancedHero } from '@/components/AdvancedHero';
import { Project } from '@/data/portfolioData';

interface HeroProps {
    featuredProject: Project | null;
}

export function Hero(props: HeroProps) {
    return <AdvancedHero {...props} />;
}
