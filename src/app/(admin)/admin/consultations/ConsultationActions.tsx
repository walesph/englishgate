"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ConsultationActions({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const updateStatus = async (status: string) => {
    setLoading(true);
    await fetch(`/api/admin/consultations/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm("이 상담 신청을 삭제하시겠습니까?")) return;
    setLoading(true);
    await fetch(`/api/admin/consultations/${id}`, { method: "DELETE" });
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2 shrink-0">
      {currentStatus === "pending" && (
        <button
          onClick={() => updateStatus("확인")}
          disabled={loading}
          className="text-xs px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors disabled:opacity-60"
        >
          확인
        </button>
      )}
      {currentStatus === "확인" && (
        <button
          onClick={() => updateStatus("완료")}
          disabled={loading}
          className="text-xs px-3 py-1.5 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-colors disabled:opacity-60"
        >
          완료
        </button>
      )}
      {currentStatus !== "pending" && (
        <button
          onClick={() => updateStatus("pending")}
          disabled={loading}
          className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-60"
        >
          되돌리기
        </button>
      )}
      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-xs px-3 py-1.5 bg-red-50 text-red-500 rounded-lg font-medium hover:bg-red-100 transition-colors disabled:opacity-60"
      >
        삭제
      </button>
    </div>
  );
}
