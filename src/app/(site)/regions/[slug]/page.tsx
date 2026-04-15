import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function RegionPage({ params }: Props) {
  const { slug } = await params;

  const region = await prisma.region.findFirst({
    where: { slug, isActive: true },
    include: {
      schools: {
        where: { isActive: true },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!region) notFound();

  const features = JSON.parse(region.features) as string[];

  return (
    <div className="pt-16">
      {/* 히어로 */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-600 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <Link
            href="/#regions"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            지역 목록으로
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{region.name}</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
            {region.description}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 지역 특징 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{region.name} 특징</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-blue-50 rounded-xl p-4"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white text-sm font-bold">{idx + 1}</span>
                </div>
                <p className="text-gray-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 어학원 목록 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {region.name} 어학원 ({region.schools.length}개)
          </h2>

          {region.schools.length === 0 ? (
            <div className="text-center py-16 text-gray-400 bg-gray-50 rounded-2xl">
              <p className="text-lg">이 지역의 어학원 정보를 준비 중입니다.</p>
              <Link
                href="/#consultation"
                className="mt-4 inline-block text-blue-600 font-medium hover:underline"
              >
                직접 문의하기
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {region.schools.map((school) => {
                const schoolFeatures = JSON.parse(school.features) as string[];
                const schoolTags = JSON.parse(school.tags) as string[];
                const schoolPrograms = JSON.parse(school.programs) as string[];

                return (
                  <Link
                    key={school.id}
                    href={`/schools/${school.slug}`}
                    className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:border-blue-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                        {school.name}
                      </h3>
                      <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>

                    <p className="text-gray-500 text-sm mb-4 leading-relaxed">{school.description}</p>

                    {/* 주요 특징 */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-2">주요 특징</p>
                      <ul className="space-y-1">
                        {schoolFeatures.slice(0, 3).map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 프로그램 */}
                    {schoolPrograms.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-400 uppercase mb-2">프로그램</p>
                        <div className="flex flex-wrap gap-1.5">
                          {schoolPrograms.map((p, i) => (
                            <span key={i} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 태그 */}
                    <div className="flex flex-wrap gap-1.5">
                      {schoolTags.map((t, i) => (
                        <span key={i} className="bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* 상담 CTA */}
        <div className="mt-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-10 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">{region.name} 연수, 궁금한 점이 있으신가요?</h3>
          <p className="text-blue-200 mb-6">전문 컨설턴트가 1:1로 맞춤 상담을 드립니다</p>
          <Link
            href="/#consultation"
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors"
          >
            무료 상담 신청하기
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
