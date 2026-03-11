"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FadeCarouselProps {
  children: React.ReactNode[];
  autoplayInterval?: number; // 自动播放间隔，单位毫秒
}

export function FadeCarousel({
  children,
  autoplayInterval = 0, // 默认不自动播放
}: FadeCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for forward, -1 for backward
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false); // 追踪用户是否手动操作过
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;

    setUserInteracted(true); // 用户手动操作，停止自动播放
    const newIndex = (currentIndex + 1) % children.length;
    setPreviousIndex(currentIndex);
    setCurrentIndex(newIndex);
    setDirection(1);
    setIsTransitioning(true);

    // 转场完成后重置状态
    setTimeout(() => {
      setIsTransitioning(false);
    }, 2500);
  }, [children.length, currentIndex, isTransitioning]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;

    setUserInteracted(true); // 用户手动操作，停止自动播放
    const newIndex = (currentIndex - 1 + children.length) % children.length;
    setPreviousIndex(currentIndex);
    setCurrentIndex(newIndex);
    setDirection(-1);
    setIsTransitioning(true);

    // 转场完成后重置状态
    setTimeout(() => {
      setIsTransitioning(false);
    }, 2500);
  }, [children.length, currentIndex, isTransitioning]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentIndex || isTransitioning) return;

      setUserInteracted(true); // 用户手动操作，停止自动播放
      setPreviousIndex(currentIndex);
      setCurrentIndex(index);
      setDirection(index > currentIndex ? 1 : -1);
      setIsTransitioning(true);

      // 转场完成后重置状态
      setTimeout(() => {
        setIsTransitioning(false);
      }, 2500);
    },
    [currentIndex, isTransitioning]
  );

  // 自动播放功能 - 用户手动操作后停止
  useEffect(() => {
    if (autoplayInterval <= 0 || userInteracted) return; // 用户操作后停止自动播放

    const startAutoplay = () => {
      autoplayTimerRef.current = setTimeout(() => {
        if (!isTransitioning) {
          handleNext();
        } else {
          startAutoplay(); // 如果正在转场，则延迟自动播放
        }
      }, autoplayInterval);
    };

    startAutoplay();

    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [autoplayInterval, isTransitioning, handleNext, userInteracted]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* 当前页面和前一个页面同时显示，实现交叉淡入淡出 */}
      <div className="relative h-full w-full">
        {/* 当前页面，在下层淡入 */}
        <motion.div
          key={currentIndex}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {children[currentIndex]}
        </motion.div>

        {/* 前一个页面，在上层淡出 */}
        <AnimatePresence initial={false}>
          {isTransitioning && previousIndex !== currentIndex && (
            <motion.div
              key={previousIndex}
              className="absolute inset-0 z-10"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
            >
              {children[previousIndex]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation arrows - 增加尺寸和对比度以提高可用性 */}
      <button
        className="absolute left-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white"
        onClick={handlePrev}
        aria-label="Previous slide"
        disabled={isTransitioning}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button
        className="absolute right-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white"
        onClick={handleNext}
        aria-label="Next slide"
        disabled={isTransitioning}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Navigation dots - 增加尺寸和点击区域以提高可用性 */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
        {children.map((_, index) => (
          <button
            key={index}
            className={`h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white ${
              index === currentIndex
                ? "w-8 bg-white"
                : "w-3 bg-white/60 hover:bg-white/80"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            disabled={isTransitioning}
          />
        ))}
      </div>
    </div>
  );
}

export function CarouselSlide({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full">
      {children}
    </div>
  );
}

export function BackgroundImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover object-center"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
      />
    </div>
  );
}

export function TextOverlay({
  mainTitle,
  content,
  endQuote,
}: {
  mainTitle: string;
  content: string;
  endQuote: string;
}) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
      <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-6">
        <h1
          className="font-serif text-4xl font-bold tracking-[0.05em] sm:text-5xl md:text-6xl"
          style={{
            textShadow: "0 4px 15px rgba(0, 0, 0, 0.9), 0 2px 5px rgba(0, 0, 0, 0.9)"
          }}
          dangerouslySetInnerHTML={{ __html: mainTitle }}
        />
        <div
          className="max-w-2xl text-base opacity-90 md:text-lg lg:text-xl leading-relaxed md:leading-loose"
          style={{
            textShadow: "0 4px 8px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.9)",
            textWrap: "balance" as React.CSSProperties["textWrap"]
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div
          className="mt-4 font-serif text-xl font-semibold tracking-wide md:text-2xl"
          style={{
            textShadow: "0 4px 12px rgba(0, 0, 0, 0.9), 0 2px 6px rgba(0, 0, 0, 0.9)"
          }}
        >
          {endQuote}
        </div>
      </div>
    </div>
  );
}
