import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
}

function GallerySection({ title, images, videoUrl }: { title: string; images: string[]; videoUrl: string | null }) {
  const videoId = videoUrl ? extractYouTubeId(videoUrl) : null;
  if (images.length === 0 && !videoId) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-5">{title}</h2>
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {images.map((img, idx) => (
            <a key={idx} href={img} target="_blank" rel="noopener noreferrer" className="block aspect-video rounded-xl overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity">
              <img src={img} alt={`${title} ${idx + 1}`} className="w-full h-full object-cover" />
            </a>
          ))}
        </div>
      )}
      {videoId && (
        <div className="aspect-video rounded-2xl overflow-hidden bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
            className="w-full h-full"
            style={{ border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        </div>
      )}
    </section>
  );
}

export default async function SchoolPage({ params }: Props) {
  const { slug } = await params;

  const school = await prisma.school.findUnique({
    where: { slug, isActive: true },
    include: { region: true },
  });

  if (!school) notFound();

  const safeJson = (val: string): string[] => {
    try { return JSON.parse(val); } catch { return []; }
  };

  const features = safeJson(school.features);
  const programs = safeJson(school.programs);
  const tags = safeJson(school.tags);
  const facilityImages = safeJson(school.facilityImages);
  const dormImages = safeJson(school.dormImages);

  return (
    <div className="pt-16">
      {/* 히어로 */}
      <div className="relative bg-gradient-to-br from-blue-900 to-indigo-700 py-20 px-4 overflow-hidden">
        {/* 메인 이미지 오버레이 */}
        {school.mainImage && (
          <>
            <img src={school.mainImage} alt={school.name} className="absolute inset-0 w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-indigo-700/80" />
          </>
        )}
        <div className="relative max-w-4xl mx-auto text-white">
          <Link
            href={`/regions/${school.region.slug}`}
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {school.region.name} 어학원 목록으로
          </Link>

          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                  {school.region.name}
                </span>
                {tags.map((tag) => (
                  <span key={tag} className="bg-blue-500/30 text-blue-100 text-xs px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold mb-3">{school.name}</h1>
              <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
                {school.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-10">
            {/* 주요 특징 */}
            {features.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-5">주요 특징</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-blue-50 rounded-xl p-4">
                      <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 프로그램 */}
            {programs.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-5">개설 프로그램</h2>
                <div className="space-y-3">
                  {programs.map((program, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
                    >
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-indigo-600 text-sm font-bold">{idx + 1}</span>
                      </div>
                      <span className="font-medium text-gray-800">{program}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 시설 갤러리 */}
            <GallerySection
              title="시설 사진"
              images={facilityImages}
              videoUrl={school.facilityVideo}
            />

            {/* 기숙사 갤러리 */}
            <GallerySection
              title="기숙사 사진"
              images={dormImages}
              videoUrl={school.dormVideo}
            />
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 연락처 정보 */}
            {(school.contact || school.address || school.website) && (
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">어학원 정보</h3>
                <div className="space-y-3">
                  {school.address && (
                    <div className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <p className="text-gray-600 text-sm">{school.address}</p>
                    </div>
                  )}
                  {school.contact && (
                    <div className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <p className="text-gray-600 text-sm">{school.contact}</p>
                    </div>
                  )}
                  {school.website && (
                    <div className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <a href={school.website} className="text-blue-600 text-sm hover:underline" target="_blank" rel="noopener noreferrer">
                        {school.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 태그 */}
            {tags.length > 0 && (
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">추천 대상</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 상담 CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white text-center">
              <h3 className="font-bold mb-2">이 어학원이 궁금하신가요?</h3>
              <p className="text-blue-200 text-sm mb-4">전문가에게 무료로 상담받으세요</p>
              <Link
                href="/#consultation"
                className="block bg-white text-blue-700 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors"
              >
                무료 상담 신청
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
