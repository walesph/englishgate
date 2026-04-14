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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white rounded-full blur-3xl" />
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 hidden lg:block">
            <svg width="500" height="600" viewBox="0 0 500 600" fill="white">
              <ellipse cx="200" cy="100" rx="80" ry="120" transform="rotate(-15 200 100)" />
              <ellipse cx="280" cy="250" rx="60" ry="100" transform="rotate(10 280 250)" />
              <ellipse cx="200" cy="380" rx="70" ry="110" transform="rotate(-5 200 380)" />
              <ellipse cx="260" cy="500" rx="50" ry="80" transform="rotate(15 260 500)" />
            </svg>
          </div>
        </>
      )}

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* 상단 태그 */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          필리핀 어학연수 전문 에이전시
        </div>

        {/* 메인 타이틀 */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          필리핀 어학연수의
          <br />
          <span className="text-blue-200">모든 것</span>
        </h1>

        {/* 서브 타이틀 */}
        <p className="text-lg sm:text-xl text-blue-100 mb-4 max-w-3xl mx-auto">
          바기오부터 세부, 마닐라까지
        </p>
        <p className="text-base sm:text-lg text-blue-200 mb-10 max-w-3xl mx-auto">
          English Gate와 함께 나에게 딱 맞는 어학연수를 설계하세요.
          <br className="hidden sm:block" />
          10년 경력의 전문 컨설턴트가 처음부터 끝까지 함께합니다.
        </p>

        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#consultation"
            className="bg-white text-blue-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            무료 상담 신청하기
          </a>
          <a
            href="#regions"
            className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            지역별 정보 보기
          </a>
        </div>

        {/* 통계 */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">7+</div>
            <div className="text-blue-200 text-sm">주요 지역</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">30+</div>
            <div className="text-blue-200 text-sm">파트너 어학원</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">10년+</div>
            <div className="text-blue-200 text-sm">전문 경력</div>
          </div>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 z-10">
        <span className="text-xs">스크롤하여 더 보기</span>
        <div className="w-0.5 h-8 bg-white/40 animate-bounce" />
      </div>
    </section>
  );
}
