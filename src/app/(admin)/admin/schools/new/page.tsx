import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import SchoolForm from "@/components/admin/SchoolForm";

export const dynamic = "force-dynamic";

export default async function NewSchoolPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const regions = await prisma.region.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    select: { id: true, name: true },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">새 어학원 추가</h1>
        <p className="text-gray-500 text-sm mt-1">새 어학원 정보를 입력합니다</p>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <SchoolForm mode="create" regions={regions} />
      </div>
    </div>
  );
}
