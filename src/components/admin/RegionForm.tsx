"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface RegionFormData {
  id?: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  image: string;
  order: number;
  isActive: boolean;
}

interface Props {
  initialData?: RegionFormData;
  mode: "create" | "edit";
}

export default function RegionForm({ initialData, mode }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<RegionFormData>(
    initialData || {
      name: "",
      slug: "",
      description: "",
      features: [""],
      image: "",
      order: 0,
      isActive: true,
    }
  );

  const addFeature = () => setForm((f) => ({ ...f, features: [...f.features, ""] }));
  const removeFeature = (idx: number) =>
    setForm((f) => ({ ...f, features: f.features.filter((_, i) => i !== idx) }));
  const updateFeature = (idx: number, val: string) =>
    setForm((f) => ({
      ...f,
      features: f.features.map((feat, i) => (i === idx ? val : feat)),
    }));

  const generateSlug = (name: string) => {
    const map: Record<string, string> = {
      바기오: "baguio",
      세부막탄: "cebu-mactan",
      세부: "cebu",
      클락: "clark",
      바콜로드: "bacolod",
      일로일로: "iloilo",
      마닐라: "manila",
    };
    return map[name] || name.toLowerCase().replace(/\s+/g, "-");
  };

  const handleNameChange = (val: string) => {
    setForm((f) => ({
      ...f,
      name: val,
      slug: mode === "create" ? generateSlug(val) : f.slug,
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
      };

      const url = mode === "create" ? "/api/regions" : `/api/regions/${form.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/regions");
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">지역명 *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="바기오"
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
            placeholder="baguio"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">지역 설명</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="지역에 대한 설명을 입력하세요"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">지역 특징</label>
          <button
            type="button"
            onClick={addFeature}
            className="text-blue-600 text-sm hover:text-blue-800 font-medium"
          >
            + 특징 추가
          </button>
        </div>
        <div className="space-y-2">
          {form.features.map((feat, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                type="text"
                value={feat}
                onChange={(e) => updateFeature(idx, e.target.value)}
                className="flex-1 px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`특징 ${idx + 1}`}
              />
              {form.features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeature(idx)}
                  className="text-red-400 hover:text-red-600 px-2"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이미지 경로</label>
          <input
            type="text"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="/images/regions/baguio.jpg"
          />
        </div>
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
      </div>

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
          {loading ? "저장 중..." : mode === "create" ? "지역 추가" : "저장"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/regions")}
          className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          취소
        </button>
      </div>
    </form>
  );
}
