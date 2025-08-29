import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HeroCarousel = ({ className = '' }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop",
            title: "Produtos Frescos Direto da Fazenda",
            subtitle: "Conecte-se com produtores locais e tenha acesso aos melhores produtos da região",
            cta: "Explorar Produtos",
            ctaAction: () => console.log('Navigate to products')
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&h=400&fit=crop",
            title: "Apoie Produtores Locais",
            subtitle: "Cada compra fortalece a economia local e garante produtos mais frescos para você",
            cta: "Conhecer Vendedores",
            ctaAction: () => console.log('Navigate to vendors')
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&h=400&fit=crop",
            title: "Orgânicos Certificados",
            subtitle: "Encontre produtos orgânicos certificados com garantia de qualidade e procedência",
            cta: "Ver Orgânicos",
            ctaAction: () => console.log('Navigate to organic products')
        }
    ];

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    return (
        <div className={`relative overflow-hidden rounded-3xl shadow-strong ${className}`}>
            <div className="relative h-80 md:h-[500px]">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

                        <div className="absolute inset-0 flex items-center">
                            <div className="container mx-auto px-12">
                                <div className="max-w-2xl text-white">
                                    <h2 className="text-4xl md:text-6xl font-heading mb-6 leading-tight">
                                        {slide.title}
                                    </h2>
                                    <p className="text-lg md:text-xl mb-10 opacity-90 leading-relaxed">
                                        {slide.subtitle}
                                    </p>
                                    <button
                                        onClick={slide.ctaAction}
                                        className="bg-gradient-to-r from-primary to-accent text-white px-10 py-4 rounded-2xl font-heading font-semibold transition-all duration-300 transform hover:scale-105 shadow-strong hover:shadow-modal"
                                    >
                                        {slide.cta}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-8 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-md text-white rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-medium"
            >
                <Icon name="ChevronLeft" size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-8 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-md text-white rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-medium"
            >
                <Icon name="ChevronRight" size={24} />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-4 h-4 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125 shadow-soft' : 'bg-white/60 hover:bg-white/80'
                            }`}
                    />
                ))}
            </div>

            {/* Auto-play indicator */}
            <div className="absolute top-8 right-8">
                <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="w-12 h-12 bg-white/20 backdrop-blur-md text-white rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-medium"
                >
                    <Icon name={isAutoPlaying ? "Pause" : "Play"} size={18} />
                </button>
            </div>
        </div>
    );
};

export default HeroCarousel;