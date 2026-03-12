import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NetflixCard } from './NetflixCard';
import { Project } from '@/data/portfolioData';

interface NetflixRowProps {
    title: string;
    projects: Project[];
    onOpenModal: (project: Project) => void;
}

export function NetflixRow({ title, projects, onOpenModal }: NetflixRowProps) {
    const rowRef = useRef<HTMLDivElement>(null);
    const [, setIsMoved] = useState(false);

    const handleClick = (direction: 'left' | 'right') => {
        setIsMoved(true);
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === 'left'
                ? scrollLeft - clientWidth
                : scrollLeft + clientWidth;

            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="mb-4 md:mb-8 space-y-2 md:space-y-4 px-4 sm:px-8 md:px-12 group/row relative z-0 hover:z-99 transition-all duration-300">
            <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-xl lg:text-2xl relative z-20">
                {title}
            </h2>

            <div className="group/slider relative -ml-4 md:-ml-12">
                <ChevronLeft
                    className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover/slider:opacity-100`}
                    onClick={() => handleClick("left")}
                    color="white"
                />

                <div className="px-12 md:px-24">
                    <div
                        ref={rowRef}
                        className="flex items-center space-x-2.5 overflow-x-scroll scrollbar-hide pt-24 pb-12 -mt-24 snap-x snap-mandatory"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {projects.map((project) => (
                            <div key={project.id} className="relative h-36 max-w-65 cursor-pointer transition duration-200 ease-in-out md:h-65 md:max-w-80 md:hover:z-50 snap-start">
                                <NetflixCard project={project} onOpenModal={onOpenModal} />
                            </div>
                        ))}
                    </div>
                </div>

                <ChevronRight
                    className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover/slider:opacity-100"
                    onClick={() => handleClick("right")}
                    color="white"
                />
            </div>
        </div>
    );
}
