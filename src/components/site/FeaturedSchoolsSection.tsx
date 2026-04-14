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

  const filtered = activeTag === "all"
    ? schools
    : schools.filter((s) => {
        const tags = JSON.parse(s.tags) as string[];
        return tags.includes(activeTag);
      });

  return (
    <section id="featured" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">Featured Schools</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            특징별 추천 어학원
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            학습 목적과 선호도에 따라 맞춤 어학원을 찾아보세요
          </p>
        </div>

        {/* 필터 태그 */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {FILTER_TAGS.map((tag) => (
            <button
              key={tag.value}
              onClick={() => setActiveTag(tag.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTag === tag.value
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* 어학원 카드 */}
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>해당 카테고리의 어학원이 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((school) => {
              const tags = JSON.parse(school.tags) as string[];
              const features = JSON.parse(school.features) as string[];

              return (
                <Link
                  key={school.id}
                  href={`/schools/${school.slug}`}
                  className="group bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-300"
                >
                  {/* 지역 배지 */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {school.region.name}
                    </span>
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {school.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {school.description}
                  </p>

                  {/* 주요 특징 */}
                  <div className="mb-4">
                    {features.slice(0, 2).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* 태그 */}
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          tag === activeTag
                            ? "bg-blue-600 text-white"
                            : "bg-white text-blue-600 border border-blue-200"
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

        <div className="text-center mt-10">
          <a
            href="#consultation"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
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
