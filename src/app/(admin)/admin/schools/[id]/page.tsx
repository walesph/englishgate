import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import SchoolForm from "@/components/admin/SchoolForm";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditSchoolPage({ params }: Props) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;

  const [school, regions] = await Promise.all([
    prisma.school.findUnique({ where: { id } }),
    prisma.region.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  if (!school) notFound();

  const safeJson = (val: string, fallback: unknown = []) => {
    try { return JSON.parse(val); } catch { return fallback; }
  };

  const initialData = {
    id: school.id,
    name: school.name,
    slug: school.slug,
    regionId: school.regionId,
    description: school.description,
    features: safeJson(school.features) as string[],
    programs: safeJson(school.programs) as string[],
    mainImage: school.mainImage || "",
    facilityImages: safeJson(school.facilityImages) as string[],
    facilityVideo: school.facilityVideo || "",
    dormImages: safeJson(school.dormImages) as string[],
    dormVideo: school.dormVideo || "",
    contact: school.contact || "",
    address: school.address || "",
    website: school.website || "",
    tags: safeJson(school.tags) as string[],
    order: school.order,
    isActive: school.isActive,
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">어학원 수정: {school.name}</h1>
        <p className="text-gray-500 text-sm mt-1">어학원 정보를 수정합니다</p>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <SchoolForm mode="edit" initialData={initialData} regions={regions} />
      </div>
    </div>
  );
}
