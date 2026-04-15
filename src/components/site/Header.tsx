"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // 홈 페이지에서만 투명 헤더 사용
  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = isTransparent
    ? "text-white/90 hover:text-white"
    : "text-gray-600 hover:text-blue-600";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                isTransparent ? "bg-white/20 backdrop-blur-sm border border-white/30" : "bg-blue-600"
              }`}
            >
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span
                className={`font-bold text-xl tracking-tight transition-colors ${
                  isTransparent ? "text-white" : "text-blue-700"
                }`}
              >
                English
              </span>
              <span
                className={`font-bold text-xl tracking-tight transition-colors ${
                  isTransparent ? "text-white/80" : "text-gray-800"
                }`}
              >
                Gate
              </span>
            </div>
          </Link>

          {/* 데스크탑 네비게이션 */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: "#about", label: "에이전트 소개" },
              { href: "#regions", label: "지역별 특징" },
              { href: "#schools", label: "어학원 안내" },
              { href: "#featured", label: "추천 어학원" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`font-medium text-sm transition-colors ${navLinkClass}`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#consultation"
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                isTransparent
                  ? "bg-white text-blue-700 hover:bg-blue-50 shadow-md"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md"
              }`}
            >
              무료 상담
            </a>
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isTransparent
                ? "text-white hover:bg-white/10"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 열기"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20 bg-blue-900/95 backdrop-blur-md -mx-4 px-4 sm:-mx-6 sm:px-6">
            <nav className="flex flex-col gap-1">
              {[
                { href: "#about", label: "에이전트 소개" },
                { href: "#regions", label: "지역별 특징" },
                { href: "#schools", label: "어학원 안내" },
                { href: "#featured", label: "추천 어학원" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-white/90 hover:text-white font-medium py-3 border-b border-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#consultation"
                className="mt-3 bg-white text-blue-700 px-5 py-3 rounded-xl font-semibold text-center hover:bg-blue-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                무료 상담 신청하기
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
