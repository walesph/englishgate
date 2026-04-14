"use client";

import { useRouter } from "next/navigation";

export default function SchoolDeleteButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`"${name}" 어학원을 삭제하시겠습니까?`)) return;

    const res = await fetch(`/api/schools/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-500 hover:text-red-700 text-sm font-medium">
      삭제
    </button>
  );
}
