"use client";

import { useState, useEffect } from "react";

interface AboutSettings {
  about_agent_title: string;
  about_agent_body: string;
  about_agent_items: string; // JSON array of strings
  about_location_title: string;
  about_location_body: string;
  about_location_kr_name: string;
  about_location_kr_address: string;
  about_location_kr_hours: string;
  about_location_ph_name: string;
  about_location_ph_address: string;
  about_location_ph_hours: string;
  about_contact_title: string;
  about_contact_body: string;
  about_contact_phone: string;
  about_contact_kakao: string;
  about_contact_email: string;
}

const defaults: AboutSettings = {
  about_agent_title: "에이전트 안내",
  about_agent_body: "English Gate는 2015년부터 필리핀 어학연수를 전문으로 하는 에이전시입니다. 바기오, 세부, 마닐라 등 필리핀 전 지역의 어학원과 직접 파트너십을 맺어 최적의 조건으로 연수를 도와드립니다.",
  about_agent_items: JSON.stringify(["10년+ 필리핀 현지 네트워크", "무료 맞춤 상담 서비스", "현지 24시간 긴급 지원"]),
  about_location_title: "Location",
  about_location_body: "한국 서울 사무소와 필리핀 현지 파트너 사무소를 통해 출국 전부터 귀국까지 원스톱 서비스를 제공합니다.",
  about_location_kr_name: "서울 사무소",
  about_location_kr_address: "서울특별시 강남구",
  about_location_kr_hours: "평일 09:00 - 18:00",
  about_location_ph_name: "필리핀 현지 파트너",
  about_location_ph_address: "바기오 · 세부 · 마닐라",
  about_location_ph_hours: "24시간 지원",
  about_contact_title: "Contact Us",
  about_contact_body: "언제든지 편하게 연락주세요. 카카오톡, 전화, 이메일 등 다양한 채널을 통해 빠른 답변을 드립니다.",
  about_contact_phone: "010-0000-0000",
  about_contact_kakao: "@englishgate",
  about_contact_email: "info@english-gate.com",
};

export default function AboutAdminPage() {
  const [settings, setSettings] = useState<AboutSettings>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [agentItems, setAgentItems] = useState<string[]>(JSON.parse(defaults.about_agent_items));

  useEffect(() => {
    fetch("/api/admin/site-settings")
      .then((r) => r.json())
      .then((data) => {
        const merged = { ...defaults, ...data };
        setSettings(merged);
        try {
          setAgentItems(JSON.parse(merged.about_agent_items));
        } catch {
          setAgentItems(["", "", ""]);
        }
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    const payload = {
      ...settings,
      about_agent_items: JSON.stringify(agentItems.filter(Boolean)),
    };
    try {
      const res = await fetch("/api/admin/site-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setMessage("저장되었습니다.");
      } else {
        const d = await res.json();
        setMessage(d.error || "오류가 발생했습니다.");
      }
    } catch {
      setMessage("서버 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-gray-500">로딩 중...</div>;

  const field = (label: string, key: keyof AboutSettings, multiline = false) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {multiline ? (
        <textarea
          rows={3}
          value={settings[key]}
          onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      ) : (
        <input
          type="text"
          value={settings[key]}
          onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">About Us 관리</h1>
        <p className="text-gray-500 text-sm mt-1">홈페이지 소개 섹션의 내용을 수정합니다</p>
      </div>

      {message && (
        <div className={`mb-6 px-4 py-3 rounded-xl text-sm ${message.includes("저장") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {message}
        </div>
      )}

      <div className="space-y-8">
        {/* 카드 1: 에이전트 안내 */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-gray-900 flex items-center gap-2">
            <span className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-sm">①</span>
            에이전트 안내 카드
          </h2>
          {field("제목", "about_agent_title")}
          {field("본문", "about_agent_body", true)}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">체크리스트 항목</label>
              <button
                type="button"
                onClick={() => setAgentItems([...agentItems, ""])}
                className="text-blue-600 text-sm font-medium"
              >
                + 추가
              </button>
            </div>
            <div className="space-y-2">
              {agentItems.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const next = [...agentItems];
                      next[i] = e.target.value;
                      setAgentItems(next);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="항목 내용"
                  />
                  {agentItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setAgentItems(agentItems.filter((_, j) => j !== i))}
                      className="text-red-400 hover:text-red-600 px-2"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 카드 2: Location */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-gray-900 flex items-center gap-2">
            <span className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-sm">②</span>
            Location 카드
          </h2>
          {field("제목", "about_location_title")}
          {field("본문", "about_location_body", true)}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">한국 사무소</p>
              {field("사무소명", "about_location_kr_name")}
              {field("주소", "about_location_kr_address")}
              {field("운영시간", "about_location_kr_hours")}
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">필리핀 파트너</p>
              {field("파트너명", "about_location_ph_name")}
              {field("위치", "about_location_ph_address")}
              {field("운영시간", "about_location_ph_hours")}
            </div>
          </div>
        </div>

        {/* 카드 3: Contact Us */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-gray-900 flex items-center gap-2">
            <span className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 text-sm">③</span>
            Contact Us 카드
          </h2>
          {field("제목", "about_contact_title")}
          {field("본문", "about_contact_body", true)}
          {field("전화번호", "about_contact_phone")}
          {field("카카오톡 ID", "about_contact_kakao")}
          {field("이메일", "about_contact_email")}
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-60 text-sm"
        >
          {saving ? "저장 중..." : "전체 저장"}
        </button>
      </div>
    </div>
  );
}
