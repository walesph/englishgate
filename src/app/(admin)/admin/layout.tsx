import { getSession } from "@/lib/auth";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // 로그인 페이지는 세션 체크 제외
  return (
    <div className="flex min-h-screen bg-gray-100">
      {session && <AdminNav />}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
