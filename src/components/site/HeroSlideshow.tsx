"use client";

import { useState, useEffect, useCallback } from "react";

interface HeroSlide {
  id: string;
  type: string;
  imageUrl: string | null;
  youtubeUrl: string | null;
  title: string | null;
  subtitle: string | null;
  order: number;
}

interface Props {
  slides: HeroSlide[];
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function HeroSlideshow({ slides }: Props) {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback((idx: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      setTransitioning(false);
    }, 400);
  }, [transitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, slides.length, goTo]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next, slides.length]);

  if (slides.length === 0) return null;

  const slide = slides[current];

  return (
    <div className="absolute inset-0">
      {/* 슬라이드 배경 */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${transitioning ? "opacity-0" : "opacity-100"}`}>
        {slide.type === "image" && slide.imageUrl && (
          <img
            src={slide.imageUrl}
            alt={slide.title || ""}
            className="w-full h-full object-cover"
          />
        )}
        {slide.type === "video" && slide.youtubeUrl && (() => {
          const videoId = extractYouTubeId(slide.youtubeUrl);
          return videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
              className="w-full h-full pointer-events-none"
              style={{ border: "none" }}
              allow="autoplay; encrypted-media"
              title={slide.title || "Hero video"}
            />
          ) : null;
        })()}
      </div>

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 슬라이드 텍스트 오버레이 */}
      {(slide.title || slide.subtitle) && (
        <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 transition-opacity duration-700 ${transitioning ? "opacity-0" : "opacity-100"}`}>
          {slide.title && (
            <h2 className="text-white text-3xl sm:text-5xl font-bold drop-shadow-lg mb-3">
              {slide.title}
            </h2>
          )}
          {slide.subtitle && (
            <p className="text-white/90 text-lg sm:text-xl drop-shadow max-w-2xl">
              {slide.subtitle}
            </p>
          )}
        </div>
      )}

      {/* 슬라이드 인디케이터 (여러 개일 때만) */}
      {slides.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`슬라이드 ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-white" : "w-4 bg-white/50 hover:bg-white/75"}`}
            />
          ))}
        </div>
      )}

      {/* 이전/다음 버튼 (여러 개일 때만) */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => goTo((current - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-colors"
            aria-label="이전"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => next()}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-colors"
            aria-label="다음"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
