import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import RegionForm from "@/components/admin/RegionForm";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditRegionPage({ params }: Props) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const region = await prisma.region.findUnique({ where: { id } });
  if (!region) notFound();

  const initialData = {
    id: region.id,
    name: region.name,
    slug: region.slug,
    description: region.description,
    features: JSON.parse(region.features) as string[],
    image: region.image || "",
    order: region.order,
    isActive: region.isActive,
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">지역 수정: {region.name}</h1>
        <p className="text-gray-500 text-sm mt-1">지역 정보를 수정합니다</p>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <RegionForm mode="edit" initialData={initialData} />
      </div>
    </div>
  );
}
