"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <div>
              <span className="text-blue-700 font-bold text-xl">English</span>
              <span className="text-gray-800 font-bold text-xl">Gate</span>
            </div>
          </Link>

          {/* 데스크탑 네비게이션 */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              에이전트 소개
            </a>
            <a href="#regions" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              지역별 특징
            </a>
            <a href="#schools" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              어학원 안내
            </a>
            <a href="#featured" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              추천 어학원
            </a>
            <a
              href="#consultation"
              className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              무료 상담
            </a>
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              <a
                href="#about"
                className="text-gray-600 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                에이전트 소개
              </a>
              <a
                href="#regions"
                className="text-gray-600 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                지역별 특징
              </a>
              <a
                href="#schools"
                className="text-gray-600 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                어학원 안내
              </a>
              <a
                href="#featured"
                className="text-gray-600 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                추천 어학원
              </a>
              <a
                href="#consultation"
                className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                무료 상담
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
