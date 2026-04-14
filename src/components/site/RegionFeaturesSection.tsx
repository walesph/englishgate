import Link from "next/link";

interface Region {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string;
  image?: string | null;
  order: number;
}

interface Props {
  regions: Region[];
}

const regionEmojis: Record<string, string> = {
  baguio: "🏔️",
  "cebu-mactan": "🏖️",
  cebu: "🏙️",
  clark: "✈️",
  bacolod: "🌾",
  iloilo: "🏛️",
  manila: "🌆",
};

const regionColors: Record<string, string> = {
  baguio: "from-emerald-400 to-teal-600",
  "cebu-mactan": "from-cyan-400 to-blue-600",
  cebu: "from-blue-400 to-indigo-600",
  clark: "from-orange-400 to-red-600",
  bacolod: "from-yellow-400 to-amber-600",
  iloilo: "from-purple-400 to-violet-600",
  manila: "from-rose-400 to-pink-600",
};

export default function RegionFeaturesSection({ regions }: Props) {
  return (
    <section id="regions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">Philippines Regions</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            필리핀 지역별 특징
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            각 지역의 특성을 파악하고 나에게 맞는 연수 지역을 선택하세요
          </p>
        </div>

        {/* 지역 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {regions.map((region) => {
            const features = JSON.parse(region.features) as string[];
            const emoji = regionEmojis[region.slug] || "🇵🇭";
            const colorClass = regionColors[region.slug] || "from-blue-400 to-blue-600";

            return (
              <Link
                key={region.id}
                href={`/regions/${region.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                {/* 카드 헤더 */}
                <div className={`bg-gradient-to-br ${colorClass} p-6`}>
                  <div className="text-5xl mb-3">{emoji}</div>
                  <h3 className="text-xl font-bold text-white">{region.name}</h3>
                </div>

                {/* 카드 바디 */}
                <div className="p-5">
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {region.description}
                  </p>
                  <ul className="space-y-1.5">
                    {features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center gap-1 text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
                    자세히 보기
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
