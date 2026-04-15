import Link from "next/link";

interface Region {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string;
  image?: string | null;
  order: number;
  schools?: unknown[];
}

interface Props {
  regions: Region[];
}

const regionConfig: Record<string, { emoji: string; gradient: string; accent: string }> = {
  baguio: {
    emoji: "🏔️",
    gradient: "from-emerald-500 to-teal-700",
    accent: "bg-emerald-500",
  },
  "cebu-mactan": {
    emoji: "🏖️",
    gradient: "from-cyan-500 to-blue-700",
    accent: "bg-cyan-500",
  },
  cebu: {
    emoji: "🏙️",
    gradient: "from-blue-500 to-indigo-700",
    accent: "bg-blue-500",
  },
  clark: {
    emoji: "✈️",
    gradient: "from-orange-500 to-red-700",
    accent: "bg-orange-500",
  },
  bacolod: {
    emoji: "🌾",
    gradient: "from-yellow-500 to-amber-700",
    accent: "bg-yellow-500",
  },
  iloilo: {
    emoji: "🏛️",
    gradient: "from-purple-500 to-violet-700",
    accent: "bg-purple-500",
  },
  manila: {
    emoji: "🌆",
    gradient: "from-rose-500 to-pink-700",
    accent: "bg-rose-500",
  },
};

export default function RegionFeaturesSection({ regions }: Props) {
  return (
    <section id="regions" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Philippines Regions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            필리핀 지역별 특징
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            각 지역의 특성을 파악하고 나에게 맞는 연수 지역을 선택하세요
          </p>
        </div>

        {/* 지역 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {regions.map((region) => {
            const features = JSON.parse(region.features) as string[];
            const config = regionConfig[region.slug] ?? {
              emoji: "🇵🇭",
              gradient: "from-blue-500 to-blue-700",
              accent: "bg-blue-500",
            };
            const schoolCount = region.schools?.length ?? 0;

            return (
              <Link
                key={region.id}
                href={`/regions/${region.slug}`}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 border border-gray-100 flex flex-col"
              >
                {/* 카드 헤더 */}
                <div className={`relative bg-gradient-to-br ${config.gradient} p-7 pb-8`}>
                  {/* 학교 수 배지 */}
                  {schoolCount > 0 && (
                    <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/30">
                      {schoolCount}개 어학원
                    </span>
                  )}
                  <div className="text-4xl mb-3">{config.emoji}</div>
                  <h3 className="text-xl font-bold text-white leading-tight">{region.name}</h3>
                </div>

                {/* 카드 바디 */}
                <div className="flex-1 p-5 flex flex-col">
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {region.description}
                  </p>
                  <ul className="space-y-2 flex-1">
                    {features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${config.accent}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-1 text-sm font-semibold text-gray-400 group-hover:text-blue-600 transition-colors">
                    자세히 보기
                    <svg
                      className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
