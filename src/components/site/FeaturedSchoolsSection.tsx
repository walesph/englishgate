"use client";

import { useState } from "react";
import Link from "next/link";

interface School {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string;
  tags: string;
  region: { name: string; slug: string };
}

interface Props {
  schools: School[];
}

const FILTER_TAGS = [
  { label: "전체", value: "all" },
  { label: "1:1 수업", value: "1:1수업" },
  { label: "IELTS", value: "IELTS" },
  { label: "저렴한 비용", value: "저렴한비용" },
  { label: "군사학교", value: "군사학교" },
  { label: "장기연수", value: "장기연수" },
  { label: "다국적 환경", value: "다국적환경" },
  { label: "TOEIC", value: "TOEIC" },
];

export default function FeaturedSchoolsSection({ schools }: Props) {
  const [activeTag, setActiveTag] = useState("all");

  const filtered =
    activeTag === "all"
      ? schools
      : schools.filter((s) => {
          const tags = JSON.parse(s.tags) as string[];
          return tags.includes(activeTag);
        });

  return (
    <section id="featured" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-14">
          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Featured Schools
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            특징별 추천 어학원
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            학습 목적과 선호도에 따라 맞춤 어학원을 찾아보세요
          </p>
        </div>

        {/* 필터 태그 */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-12">
          {FILTER_TAGS.map((tag) => (
            <button
              key={tag.value}
              onClick={() => setActiveTag(tag.value)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 ${
                activeTag === tag.value
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* 어학원 카드 */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-400 font-medium">해당 카테고리의 어학원이 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((school) => {
              const tags = JSON.parse(school.tags) as string[];
              const features = JSON.parse(school.features) as string[];

              return (
                <Link
                  key={school.id}
                  href={`/schools/${school.slug}`}
                  className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100 flex flex-col"
                >
                  {/* 지역 배지 + 화살표 */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full font-semibold">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                      </svg>
                      {school.region.name}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
                      <svg
                        className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors leading-snug">
                    {school.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                    {school.description}
                  </p>

                  {/* 주요 특징 */}
                  <div className="space-y-1.5 mb-5">
                    {features.slice(0, 2).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* 태그 */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-50">
                    {tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                          tag === activeTag
                            ? "bg-blue-600 text-white"
                            : "bg-blue-50 text-blue-600 group-hover:bg-blue-100"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href="#consultation"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
          >
            나에게 맞는 어학원 추천받기
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
