import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import RegionDeleteButton from "./RegionDeleteButton";

export const dynamic = "force-dynamic";

export default async function RegionsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const regions = await prisma.region.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { schools: true } } },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">지역 관리</h1>
          <p className="text-gray-500 text-sm mt-1">필리핀 지역 정보를 관리합니다</p>
        </div>
        <Link
          href="/admin/regions/new"
          className="bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          새 지역 추가
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase w-16">순서</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">지역명</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">슬러그</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase w-24">어학원 수</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase w-20">상태</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase w-24">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {regions.map((region) => (
              <tr key={region.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-400 text-sm text-center">{region.order}</td>
                <td className="px-4 py-3 font-semibold text-gray-900">{region.name}</td>
                <td className="px-4 py-3 text-gray-400 text-sm font-mono">{region.slug}</td>
                <td className="px-4 py-3 text-gray-500 text-sm">{region._count.schools}개</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${
                    region.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}>
                    {region.isActive ? "활성" : "비활성"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/regions/${region.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      수정
                    </Link>
                    <RegionDeleteButton id={region.id} name={region.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
