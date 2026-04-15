"use client";

import { useState } from "react";

interface Region {
  id: string;
  name: string;
}

interface Props {
  regions: Region[];
}

export default function ConsultationSection({ regions }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    region: "",
    school: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", region: "", school: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="consultation" className="py-24 bg-gradient-to-br from-blue-950 via-blue-800 to-blue-700 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 왼쪽: 소개 */}
          <div className="text-white">
            <span className="inline-block bg-white/10 border border-white/20 text-blue-200 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              Free Consultation
            </span>
            <br />
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              무료 상담 신청
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-8">
              필리핀 어학연수에 대한 모든 궁금증을 해결해 드립니다.
              전문 컨설턴트가 1:1로 맞춤 상담을 제공합니다.
            </p>

            <div className="space-y-4">
              {[
                { icon: "🎯", title: "맞춤 어학원 추천", desc: "목적·예산·기간에 맞는 최적의 어학원을 추천해 드립니다" },
                { icon: "✈️", title: "출국 전 준비 지원", desc: "비자, 항공권, 숙소 등 모든 준비 사항을 안내해 드립니다" },
                { icon: "📞", title: "현지 1:1 케어", desc: "연수 기간 동안 발생하는 모든 문제를 도와드립니다" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-blue-200 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 오른쪽: 폼 */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-white/10">
            {status === "success" ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">상담 신청 완료!</h3>
                <p className="text-gray-500">
                  빠른 시일 내에 연락드리겠습니다.<br />
                  감사합니다 😊
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-blue-600 font-medium hover:underline"
                >
                  다시 신청하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-6">상담 신청서</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">이름 *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="홍길동"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">연락처 *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="010-0000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">관심 지역</label>
                  <select
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="">지역 선택 (선택사항)</option>
                    {regions.map((r) => (
                      <option key={r.id} value={r.name}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">문의사항</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="연수 목적, 기간, 예산 등 자유롭게 입력해 주세요"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-sm">오류가 발생했습니다. 다시 시도해 주세요.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "제출 중..." : "무료 상담 신청하기"}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  입력하신 정보는 상담 목적으로만 사용됩니다
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
