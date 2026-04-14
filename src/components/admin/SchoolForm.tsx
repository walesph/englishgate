"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";

interface SchoolFormData {
  id?: string;
  name: string;
  slug: string;
  regionId: string;
  description: string;
  features: string[];
  programs: string[];
  mainImage: string;
  facilityImages: string[];
  facilityVideo: string;
  dormImages: string[];
  dormVideo: string;
  contact: string;
  address: string;
  website: string;
  tags: string[];
  order: number;
  isActive: boolean;
}

interface Region {
  id: string;
  name: string;
}

interface Props {
  initialData?: SchoolFormData;
  regions: Region[];
  mode: "create" | "edit";
}

function extractYouTubeThumbnail(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

export default function SchoolForm({ initialData, regions, mode }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<SchoolFormData>(
    initialData || {
      name: "",
      slug: "",
      regionId: regions[0]?.id || "",
      description: "",
      features: [""],
      programs: [""],
      mainImage: "",
      facilityImages: [],
      facilityVideo: "",
      dormImages: [],
      dormVideo: "",
      contact: "",
      address: "",
      website: "",
      tags: [""],
      order: 0,
      isActive: true,
    }
  );

  const addItem = (field: "features" | "programs" | "tags") =>
    setForm((f) => ({ ...f, [field]: [...f[field], ""] }));

  const removeItem = (field: "features" | "programs" | "tags", idx: number) =>
    setForm((f) => ({ ...f, [field]: f[field].filter((_, i) => i !== idx) }));

  const updateItem = (field: "features" | "programs" | "tags", idx: number, val: string) =>
    setForm((f) => ({ ...f, [field]: f[field].map((item, i) => (i === idx ? val : item)) }));

  const addGalleryImage = (field: "facilityImages" | "dormImages", url: string) => {
    if (!url) return;
    setForm((f) => ({ ...f, [field]: [...f[field], url] }));
  };

  const removeGalleryImage = (field: "facilityImages" | "dormImages", idx: number) =>
    setForm((f) => ({ ...f, [field]: f[field].filter((_, i) => i !== idx) }));

  const handleNameChange = (val: string) => {
    setForm((f) => ({
      ...f,
      name: val,
      slug: mode === "create" ? val.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") : f.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...form,
        features: form.features.filter(Boolean),
        programs: form.programs.filter(Boolean),
        tags: form.tags.filter(Boolean),
        facilityImages: form.facilityImages.filter(Boolean),
        dormImages: form.dormImages.filter(Boolean),
      };

      const url = mode === "create" ? "/api/schools" : `/api/schools/${form.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/schools");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "저장 중 오류가 발생했습니다.");
      }
    } catch {
      setError("서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const renderListField = (
    label: string,
    field: "features" | "programs" | "tags",
    placeholder: string
  ) => (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <button type="button" onClick={() => addItem(field)} className="text-blue-600 text-sm font-medium">
          + 추가
        </button>
      </div>
      <div className="space-y-2">
        {form[field].map((val, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              type="text"
              value={val}
              onChange={(e) => updateItem(field, idx, e.target.value)}
              className="flex-1 px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={placeholder}
            />
            {form[field].length > 1 && (
              <button type="button" onClick={() => removeItem(field, idx)} className="text-red-400 hover:text-red-600 px-2">
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderGallerySection = (
    label: string,
    field: "facilityImages" | "dormImages",
    videoField: "facilityVideo" | "dormVideo"
  ) => {
    const images = form[field];
    const videoUrl = form[videoField];
    const thumb = videoUrl ? extractYouTubeThumbnail(videoUrl) : null;

    return (
      <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
        <h3 className="font-semibold text-gray-800">{label}</h3>

        {/* 갤러리 이미지들 */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">사진 갤러리</p>
          <div className="grid grid-cols-3 gap-3 mb-3">
            {images.map((img, idx) => (
              <div key={idx} className="relative group aspect-video rounded-xl overflow-hidden bg-gray-200">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(field, idx)}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          {/* 새 이미지 추가 (임시 업로더) */}
          <GalleryImageAdder onAdd={(url) => addGalleryImage(field, url)} />
        </div>

        {/* 유튜브 동영상 링크 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">유튜브 동영상 링크 (선택)</label>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setForm({ ...form, [videoField]: e.target.value })}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://www.youtube.com/watch?v=..."
          />
          {thumb && (
            <div className="mt-2 relative w-40 h-24 rounded-xl overflow-hidden">
              <img src={thumb} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">어학원명 *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="웨일즈 어학원"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">슬러그 *</label>
          <input
            type="text"
            required
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            placeholder="wales-baguio"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">지역 *</label>
        <select
          required
          value={form.regionId}
          onChange={(e) => setForm({ ...form, regionId: e.target.value })}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          {regions.map((r) => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">어학원 설명</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="어학원에 대한 설명을 입력하세요"
        />
      </div>

      {/* 메인 사진 */}
      <ImageUploader
        label="메인 사진"
        value={form.mainImage}
        onChange={(url) => setForm({ ...form, mainImage: url })}
        placeholder="메인 사진 URL 또는 업로드"
      />

      {renderListField("주요 특징", "features", "예: 1:1 수업, 소규모 반 운영")}
      {renderListField("개설 프로그램", "programs", "예: General English, IELTS 준비")}
      {renderListField("추천 태그", "tags", "예: 1:1수업, IELTS, 저렴한비용")}

      {/* 시설 갤러리 + 동영상 */}
      {renderGallerySection("🏫 시설 사진 & 동영상", "facilityImages", "facilityVideo")}

      {/* 기숙사 갤러리 + 동영상 */}
      {renderGallerySection("🛏 기숙사 사진 & 동영상", "dormImages", "dormVideo")}

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
          <input
            type="text"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+63-74-123-4567"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Baguio City, Philippines"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">웹사이트</label>
          <input
            type="url"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://www.school.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">표시 순서</label>
          <input
            type="number"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
          />
        </div>
        <div className="flex items-end pb-2.5">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              활성화 (사이트에 표시)
            </label>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-60"
        >
          {loading ? "저장 중..." : mode === "create" ? "어학원 추가" : "저장"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/schools")}
          className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          취소
        </button>
      </div>
    </form>
  );
}

// 갤러리 이미지 추가 헬퍼 컴포넌트
function GalleryImageAdder({ onAdd }: { onAdd: (url: string) => void }) {
  const [tempUrl, setTempUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) onAdd(data.url);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={tempUrl}
        onChange={(e) => setTempUrl(e.target.value)}
        placeholder="이미지 URL 붙여넣기"
        className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        onClick={() => { if (tempUrl) { onAdd(tempUrl); setTempUrl(""); } }}
        className="px-3 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-200 transition-colors whitespace-nowrap"
      >
        URL 추가
      </button>
      <label className={`px-3 py-2 rounded-xl text-sm font-medium cursor-pointer whitespace-nowrap transition-colors ${uploading ? "bg-gray-100 text-gray-400" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
        {uploading ? "업로드 중..." : "파일 업로드"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={uploading}
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }}
        />
      </label>
    </div>
  );
}
