import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import ConsultationActions from "./ConsultationActions";

export const dynamic = "force-dynamic";

export default async function ConsultationsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const consultations = await prisma.consultationRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">상담 신청 관리</h1>
        <p className="text-gray-500 text-sm mt-1">
          총 {consultations.length}건 · 미확인 {consultations.filter((c) => c.status === "pending").length}건
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {consultations.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <p className="text-lg">상담 신청이 없습니다</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {consultations.map((c) => (
              <div key={c.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{c.name}</h3>
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
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {c.phone}
                      </div>
                      {c.email && (
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {c.email}
                        </div>
                      )}
                      {c.region && (
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {c.region}
                        </div>
                      )}
                    </div>
                    {c.message && (
                      <p className="text-gray-600 text-sm bg-gray-50 rounded-lg px-3 py-2">
                        {c.message}
                      </p>
                    )}
                    <p className="text-gray-400 text-xs mt-2">
                      {new Date(c.createdAt).toLocaleString("ko-KR")}
                    </p>
                  </div>
                  <ConsultationActions id={c.id} currentStatus={c.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
