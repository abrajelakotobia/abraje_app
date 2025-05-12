import { useEffect,  useRef, useState } from 'react';
import { Post } from '@/types/post';
import { Link, router, usePage } from '@inertiajs/react';

interface PostSliderProps {
    posts: Post[];
}

export default function PostSlider({ posts }: PostSliderProps) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % posts.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + posts.length) % posts.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [posts.length]);

    return (
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-lg bg-white">
            <div
                ref={sliderRef}
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {posts.map((post, index) => (
                    <div key={post.id} className="min-w-full">
                        <a href={route('posts.show', post.id)}>
                               <img
                                src={`/storage/${post.image}`}
                                   alt={post.title}
                              className="w-full h-64 object-cover"
                           />
                           </a>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{post.title}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2">{post.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
            >
                ◀
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
            >
                ▶
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                {posts.map((_, index) => (
                    <span
                        key={index}
                        className={`h-2 w-2 rounded-full ${current === index ? 'bg-indigo-600' : 'bg-gray-300'}`}
                    />
                ))}
            </div>
        </div>
    );
}
