interface AboutSettings {
  about_agent_title?: string;
  about_agent_body?: string;
  about_agent_items?: string;
  about_location_title?: string;
  about_location_body?: string;
  about_location_kr_name?: string;
  about_location_kr_address?: string;
  about_location_kr_hours?: string;
  about_location_ph_name?: string;
  about_location_ph_address?: string;
  about_location_ph_hours?: string;
  about_contact_title?: string;
  about_contact_body?: string;
  about_contact_phone?: string;
  about_contact_kakao?: string;
  about_contact_email?: string;
}

interface Props {
  settings?: AboutSettings;
}

export default function AgentIntroSection({ settings = {} }: Props) {
  const agentTitle = settings.about_agent_title || "에이전트 안내";
  const agentBody =
    settings.about_agent_body ||
    "English Gate는 2015년부터 필리핀 어학연수를 전문으로 하는 에이전시입니다. 바기오, 세부, 마닐라 등 필리핀 전 지역의 어학원과 직접 파트너십을 맺어 최적의 조건으로 연수를 도와드립니다.";
  let agentItems: string[] = [
    "10년+ 필리핀 현지 네트워크",
    "무료 맞춤 상담 서비스",
    "현지 24시간 긴급 지원",
  ];
  try {
    if (settings.about_agent_items) agentItems = JSON.parse(settings.about_agent_items);
  } catch {}

  const locationTitle = settings.about_location_title || "Location";
  const locationBody =
    settings.about_location_body ||
    "한국 서울 사무소와 필리핀 현지 파트너 사무소를 통해 출국 전부터 귀국까지 원스톱 서비스를 제공합니다.";
  const krName = settings.about_location_kr_name || "서울 사무소";
  const krAddress = settings.about_location_kr_address || "서울특별시 강남구";
  const krHours = settings.about_location_kr_hours || "평일 09:00 - 18:00";
  const phName = settings.about_location_ph_name || "필리핀 현지 파트너";
  const phAddress = settings.about_location_ph_address || "바기오 · 세부 · 마닐라";
  const phHours = settings.about_location_ph_hours || "24시간 지원";

  const contactTitle = settings.about_contact_title || "Contact Us";
  const contactBody =
    settings.about_contact_body ||
    "언제든지 편하게 연락주세요. 카카오톡, 전화, 이메일 등 다양한 채널을 통해 빠른 답변을 드립니다.";
  const phone = settings.about_contact_phone || "010-0000-0000";
  const kakao = settings.about_contact_kakao || "@englishgate";
  const email = settings.about_contact_email || "info@english-gate.com";

  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            About Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            English Gate 소개
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            필리핀 어학연수 전문 에이전시로서 최고의 유학 경험을 제공합니다
          </p>
        </div>

        {/* 3열 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 에이전트 안내 */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-700" />
            <div className="p-8">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{agentTitle}</h3>
              <p className="text-gray-500 leading-relaxed mb-6 text-sm">{agentBody}</p>
              <ul className="space-y-3">
                {agentItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="h-1.5 bg-gradient-to-r from-emerald-400 to-teal-600" />
            <div className="p-8">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
                <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{locationTitle}</h3>
              <p className="text-gray-500 leading-relaxed mb-6 text-sm">{locationBody}</p>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-2xl p-4 flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">KR</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{krName}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{krAddress}</p>
                    <p className="text-gray-400 text-xs">{krHours}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">PH</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{phName}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{phAddress}</p>
                    <p className="text-gray-400 text-xs">{phHours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Us */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="h-1.5 bg-gradient-to-r from-violet-500 to-purple-700" />
            <div className="p-8">
              <div className="w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-violet-100 transition-colors">
                <svg className="w-7 h-7 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{contactTitle}</h3>
              <p className="text-gray-500 leading-relaxed mb-6 text-sm">{contactBody}</p>
              <div className="space-y-3">
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-3 p-3.5 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-colors group/link"
                >
                  <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">전화 문의</p>
                    <p className="font-semibold text-gray-800 text-sm">{phone}</p>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3.5 bg-yellow-50 hover:bg-yellow-100 rounded-2xl transition-colors"
                >
                  <div className="w-9 h-9 bg-yellow-400 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-yellow-900" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3C6.48 3 2 6.48 2 11c0 2.82 1.49 5.31 3.78 6.89L4.63 21l3.48-1.62C9.25 19.77 10.6 20 12 20c5.52 0 10-3.48 10-8S17.52 3 12 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">카카오톡</p>
                    <p className="font-semibold text-gray-800 text-sm">{kakao}</p>
                  </div>
                </a>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 p-3.5 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors"
                >
                  <div className="w-9 h-9 bg-gray-700 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">이메일</p>
                    <p className="font-semibold text-gray-800 text-sm">{email}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
