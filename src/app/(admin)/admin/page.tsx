import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [regionCount, schoolCount, consultationCount, pendingCount, recentConsultations] = await Promise.all([
    prisma.region.count(),
    prisma.school.count(),
    prisma.consultationRequest.count(),
    prisma.consultationRequest.count({ where: { status: "pending" } }),
    prisma.consultationRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const stats = [
    { label: "총 지역", value: regionCount, href: "/admin/regions", color: "bg-blue-500", icon: "📍" },
    { label: "총 어학원", value: schoolCount, href: "/admin/schools", color: "bg-green-500", icon: "🏫" },
    { label: "총 상담신청", value: consultationCount, href: "/admin/consultations", color: "bg-purple-500", icon: "💬" },
    { label: "미확인 상담", value: pendingCount, href: "/admin/consultations", color: "bg-orange-500", icon: "🔔" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        <p className="text-gray-500 text-sm mt-1">English Gate 관리자 패널에 오신 것을 환영합니다</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">{stat.icon}</span>
              <div className={`w-3 h-3 rounded-full ${stat.color}`} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* 최근 상담신청 */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">최근 상담 신청</h2>
          <Link href="/admin/consultations" className="text-blue-600 text-sm hover:underline">
            전체 보기
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {recentConsultations.length === 0 ? (
            <div className="p-8 text-center text-gray-400">상담 신청이 없습니다.</div>
          ) : (
            recentConsultations.map((c) => (
              <div key={c.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">{c.name}</p>
                  <p className="text-gray-500 text-sm">{c.phone} {c.region && `· ${c.region}`}</p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {new Date(c.createdAt).toLocaleDateString("ko-KR")}
                  </p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  c.status === "pending"
                    ? "bg-orange-100 text-orange-700"
                    : c.status === "확인"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}>
                  {c.status === "pending" ? "미확인" : c.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 퀵 액션 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <Link
          href="/admin/regions/new"
          className="bg-blue-600 text-white rounded-2xl p-5 hover:bg-blue-700 transition-colors"
        >
          <p className="text-lg mb-1">+</p>
          <p className="font-semibold">새 지역 추가</p>
          <p className="text-blue-200 text-sm">지역 정보를 추가합니다</p>
        </Link>
        <Link
          href="/admin/schools/new"
          className="bg-green-600 text-white rounded-2xl p-5 hover:bg-green-700 transition-colors"
        >
          <p className="text-lg mb-1">+</p>
          <p className="font-semibold">새 어학원 추가</p>
          <p className="text-green-200 text-sm">어학원 정보를 추가합니다</p>
        </Link>
        <Link
          href="/admin/consultations"
          className="bg-purple-600 text-white rounded-2xl p-5 hover:bg-purple-700 transition-colors"
        >
          <p className="text-lg mb-1">📋</p>
          <p className="font-semibold">상담 신청 관리</p>
          <p className="text-purple-200 text-sm">신청 목록을 확인합니다</p>
        </Link>
      </div>
    </div>
  );
}
