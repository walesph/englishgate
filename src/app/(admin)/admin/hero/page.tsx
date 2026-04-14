"use client";

import { useState, useEffect } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

interface HeroSlide {
  id: string;
  type: "image" | "video";
  imageUrl: string | null;
  youtubeUrl: string | null;
  title: string | null;
  subtitle: string | null;
  order: number;
  isActive: boolean;
}

const emptySlide: Omit<HeroSlide, "id"> = {
  type: "image",
  imageUrl: null,
  youtubeUrl: null,
  title: "",
  subtitle: "",
  order: 0,
  isActive: true,
};

function getYouTubeThumbnail(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

export default function HeroAdminPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<Omit<HeroSlide, "id">>(emptySlide);
  const [message, setMessage] = useState("");

  const fetchSlides = async () => {
    const res = await fetch("/api/admin/hero-slides");
    const data = await res.json();
    setSlides(data);
    setLoading(false);
  };

  useEffect(() => { fetchSlides(); }, []);

  const openNew = () => {
    setForm({ ...emptySlide, order: slides.length });
    setEditId("new");
    setMessage("");
  };

  const openEdit = (slide: HeroSlide) => {
    setForm({
      type: slide.type,
      imageUrl: slide.imageUrl,
      youtubeUrl: slide.youtubeUrl,
      title: slide.title,
      subtitle: slide.subtitle,
      order: slide.order,
      isActive: slide.isActive,
    });
    setEditId(slide.id);
    setMessage("");
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const payload = {
        ...form,
        imageUrl: form.type === "image" ? form.imageUrl : null,
        youtubeUrl: form.type === "video" ? form.youtubeUrl : null,
      };
      const isNew = editId === "new";
      const url = isNew ? "/api/admin/hero-slides" : `/api/admin/hero-slides/${editId}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setMessage("저장되었습니다.");
        setEditId(null);
        await fetchSlides();
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

  const handleDelete = async (id: string) => {
    if (!confirm("이 슬라이드를 삭제하시겠습니까?")) return;
    const res = await fetch(`/api/admin/hero-slides/${id}`, { method: "DELETE" });
    if (res.ok) await fetchSlides();
  };

  if (loading) return <div className="p-8 text-gray-500">로딩 중...</div>;

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hero 슬라이드 관리</h1>
          <p className="text-gray-500 text-sm mt-1">홈페이지 메인 배너 슬라이드를 관리합니다</p>
        </div>
        <button
          onClick={openNew}
          className="bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          슬라이드 추가
        </button>
      </div>

      {message && (
        <div className={`mb-4 px-4 py-3 rounded-xl text-sm ${message.includes("저장") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {message}
        </div>
      )}

      {/* 슬라이드 목록 */}
      <div className="space-y-3 mb-8">
        {slides.length === 0 && (
          <div className="bg-gray-50 rounded-2xl p-12 text-center text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>슬라이드가 없습니다. 새 슬라이드를 추가하세요.</p>
          </div>
        )}
        {slides.map((slide) => (
          <div key={slide.id} className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4">
            {/* 썸네일 */}
            <div className="w-24 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
              {slide.type === "image" && slide.imageUrl && (
                <img src={slide.imageUrl} alt="" className="w-full h-full object-cover" />
              )}
              {slide.type === "video" && slide.youtubeUrl && (() => {
                const thumb = getYouTubeThumbnail(slide.youtubeUrl);
                return thumb ? (
                  <div className="relative w-full h-full">
                    <img src={thumb} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                ) : <div className="w-full h-full bg-red-100 flex items-center justify-center text-red-400 text-xs">YT</div>;
              })()}
              {!slide.imageUrl && !slide.youtubeUrl && (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">없음</div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${slide.type === "video" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>
                  {slide.type === "video" ? "동영상" : "이미지"}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${slide.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {slide.isActive ? "활성" : "비활성"}
                </span>
                <span className="text-xs text-gray-400">순서 {slide.order}</span>
              </div>
              <p className="font-semibold text-gray-900 truncate">{slide.title || "(제목 없음)"}</p>
              {slide.subtitle && <p className="text-xs text-gray-500 truncate">{slide.subtitle}</p>}
            </div>

            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => openEdit(slide)}
                className="text-sm text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
              >
                편집
              </button>
              <button
                onClick={() => handleDelete(slide.id)}
                className="text-sm text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 편집 패널 */}
      {editId !== null && (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-5">
          <h2 className="text-lg font-bold text-gray-900">
            {editId === "new" ? "새 슬라이드 추가" : "슬라이드 편집"}
          </h2>

          {/* 타입 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">슬라이드 타입</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, type: "image" })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${form.type === "image" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"}`}
              >
                🖼 이미지
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, type: "video" })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${form.type === "video" ? "bg-red-600 text-white border-red-600" : "bg-white text-gray-600 border-gray-300 hover:border-red-400"}`}
              >
                ▶ 유튜브 동영상
              </button>
            </div>
          </div>

          {/* 이미지 업로더 */}
          {form.type === "image" && (
            <ImageUploader
              label="배경 이미지"
              value={form.imageUrl || ""}
              onChange={(url) => setForm({ ...form, imageUrl: url || null })}
              placeholder="이미지 URL 입력 또는 업로드"
            />
          )}

          {/* 유튜브 URL */}
          {form.type === "video" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">유튜브 URL</label>
              <input
                type="text"
                value={form.youtubeUrl || ""}
                onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value || null })}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://www.youtube.com/watch?v=..."
              />
              {form.youtubeUrl && getYouTubeThumbnail(form.youtubeUrl) && (
                <div className="mt-2 relative w-40 h-24 rounded-xl overflow-hidden">
                  <img src={getYouTubeThumbnail(form.youtubeUrl)!} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 제목 / 부제 */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">제목 (선택)</label>
              <input
                type="text"
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value || null })}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="필리핀 어학연수의 모든 것"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">부제 (선택)</label>
              <input
                type="text"
                value={form.subtitle || ""}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value || null })}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="English Gate와 함께 시작하세요"
              />
            </div>
          </div>

          {/* 순서 / 활성화 */}
          <div className="flex gap-4 items-end">
            <div className="w-32">
              <label className="block text-sm font-medium text-gray-700 mb-1">순서</label>
              <input
                type="number"
                min="0"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2 pb-2.5">
              <input
                type="checkbox"
                id="slideActive"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <label htmlFor="slideActive" className="text-sm font-medium text-gray-700">활성화</label>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-60"
            >
              {saving ? "저장 중..." : "저장"}
            </button>
            <button
              onClick={() => setEditId(null)}
              className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
