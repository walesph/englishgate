export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* 상단 그라디언트 선 */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* 브랜드 */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-white font-bold text-xl tracking-tight">English</span>
                <span className="text-blue-400 font-bold text-xl tracking-tight">Gate</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-gray-500">
              필리핀 어학연수 전문 유학 에이전시 English Gate입니다.
              <br />
              바기오, 세부, 마닐라 등 필리핀 전 지역 어학원 정보와
              <br />
              맞춤형 유학 컨설팅을 제공합니다.
            </p>
            <div className="flex gap-2.5">
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-500 hover:to-yellow-500 transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-red-600 transition-all"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-yellow-400 transition-all"
                aria-label="KakaoTalk"
              >
                <svg className="w-4 h-4 text-white hover:text-yellow-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3C6.48 3 2 6.48 2 11c0 2.82 1.49 5.31 3.78 6.89L4.63 21l3.48-1.62C9.25 19.77 10.6 20 12 20c5.52 0 10-3.48 10-8S17.52 3 12 3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">빠른 링크</h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: "#about", label: "에이전트 소개" },
                { href: "#regions", label: "지역별 특징" },
                { href: "#schools", label: "어학원 안내" },
                { href: "#featured", label: "추천 어학원" },
                { href: "#consultation", label: "상담 신청" },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">연락처</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-800 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">전화</p>
                  <span className="text-gray-300">010-0000-0000</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-800 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">이메일</p>
                  <span className="text-gray-300">info@english-gate.com</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-800 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">주소</p>
                  <span className="text-gray-300">서울특별시 강남구</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} English Gate. All rights reserved.</p>
          <p className="text-gray-700 text-xs">필리핀 어학연수 전문 에이전시</p>
        </div>
      </div>
    </footer>
  );
}
