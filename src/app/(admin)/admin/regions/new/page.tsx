import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import RegionForm from "@/components/admin/RegionForm";

export default async function NewRegionPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">새 지역 추가</h1>
        <p className="text-gray-500 text-sm mt-1">필리핀 새 지역 정보를 입력합니다</p>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <RegionForm mode="create" />
      </div>
    </div>
  );
}
