import HeroSlideshow from "./HeroSlideshow";

interface HeroSlide {
  id: string;
  type: string;
  imageUrl: string | null;
  youtubeUrl: string | null;
  title: string | null;
  subtitle: string | null;
  order: number;
  isActive?: boolean;
}

interface Props {
  slides?: HeroSlide[];
}

export default function HeroSection({ slides = [] }: Props) {
  const activeSlides = slides.filter((s) => s.isActive !== false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 슬라이드쇼 배경 (슬라이드가 있으면 표시) */}
      {activeSlides.length > 0 ? (
        <HeroSlideshow slides={activeSlides} />
      ) : (
        <>
          {/* 기본 그라디언트 배경 */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600" />
          {/* 미묘한 패턴 오버레이 */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
          {/* 글로우 블롭 */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-400 rounded-full blur-3xl opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500 rounded-full blur-3xl opacity-10" />
        </>
      )}

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-20">
        {/* 상단 배지 */}
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white px-5 py-2.5 rounded-full text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          필리핀 어학연수 전문 에이전시
        </div>

        {/* 메인 타이틀 */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
          필리핀 어학연수의
          <br />
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
              모든 것
            </span>
          </span>
        </h1>

        {/* 서브 타이틀 */}
        <p className="text-xl sm:text-2xl text-blue-100/90 mb-3 font-light">
          바기오부터 세부, 마닐라까지
        </p>
        <p className="text-base sm:text-lg text-blue-200/70 mb-12 max-w-2xl mx-auto leading-relaxed">
          English Gate와 함께 나에게 딱 맞는 어학연수를 설계하세요.
          <br className="hidden sm:block" />
          10년 경력의 전문 컨설턴트가 처음부터 끝까지 함께합니다.
        </p>

        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#consultation"
            className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all shadow-2xl hover:shadow-blue-900/30 transform hover:-translate-y-0.5"
          >
            무료 상담 신청하기
          </a>
          <a
            href="#regions"
            className="border border-white/40 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
          >
            지역별 정보 보기 →
          </a>
        </div>

        {/* 통계 */}
        <div className="mt-20 grid grid-cols-3 gap-6 max-w-sm mx-auto">
          {[
            { value: "7+", label: "주요 지역" },
            { value: "30+", label: "파트너 어학원" },
            { value: "10년+", label: "전문 경력" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-blue-300 text-xs sm:text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 hidden sm:flex">
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-bounce" />
      </div>

      {/* 웨이브 구분선 */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 sm:h-20" fill="white">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}
