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
}

interface Region {
  id: string;
  name: string;
  slug: string;
  schools: School[];
}

interface Props {
  regions: Region[];
}

export default function SchoolsByRegionSection({ regions }: Props) {
  const [activeRegion, setActiveRegion] = useState(regions[0]?.id || "");

  const currentRegion = regions.find((r) => r.id === activeRegion) || regions[0];

  return (
    <section id="schools" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-14">
          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Schools by Region
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            지역별 어학원 안내
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            지역을 선택하여 해당 지역의 어학원을 확인하세요
          </p>
        </div>

        {/* 지역 탭 */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-12">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setActiveRegion(region.id)}
              className={`px-5 py-2.5 rounded-2xl font-medium text-sm transition-all duration-200 ${
                activeRegion === region.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-sm"
              }`}
            >
              {region.name}
              <span
                className={`ml-2 text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                  activeRegion === region.id
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {region.schools.length}
              </span>
            </button>
          ))}
        </div>

        {/* 어학원 목록 */}
        {currentRegion && (
          <div>
            {currentRegion.schools.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-gray-500">이 지역의 어학원 정보를 준비 중입니다</p>
                <p className="text-sm mt-1">곧 업데이트될 예정입니다</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {currentRegion.schools.map((school) => {
                  const features = JSON.parse(school.features) as string[];
                  const tags = JSON.parse(school.tags) as string[];

                  return (
                    <Link
                      key={school.id}
                      href={`/schools/${school.slug}`}
                      className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100 flex flex-col"
                    >
                      {/* 헤더 */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
                          <svg
                            className="w-4 h-4 text-gray-300 group-hover:text-blue-500 translate-x-0 group-hover:translate-x-0.5 transition-all"
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

                      {/* 특징 목록 */}
                      <ul className="space-y-1.5 mb-5">
                        {features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                            <svg className="w-3.5 h-3.5 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* 태그 */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-50">
                        {tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full font-medium"
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
          </div>
        )}
      </div>
    </section>
  );
}
