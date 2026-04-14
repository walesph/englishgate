import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getSession } from "@/lib/auth";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const school = await prisma.school.findUnique({
    where: { id },
    include: { region: true },
  });
  if (!school) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(school);
}

export async function PUT(request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const body = await request.json();
    const { name, slug, regionId, description, features, programs, images, mainImage, facilityImages, facilityVideo, dormImages, dormVideo, contact, address, website, tags, order, isActive } = body;

    const toJson = (val: unknown) =>
      typeof val === "string" ? val : JSON.stringify(val || []);

    const school = await prisma.school.update({
      where: { id },
      data: {
        name,
        slug,
        regionId,
        description,
        features: toJson(features),
        programs: toJson(programs),
        images: toJson(images),
        mainImage: mainImage || null,
        facilityImages: toJson(facilityImages),
        facilityVideo: facilityVideo || null,
        dormImages: toJson(dormImages),
        dormVideo: dormVideo || null,
        contact: contact || null,
        address: address || null,
        website: website || null,
        tags: toJson(tags),
        order: Number(order) || 0,
        isActive: Boolean(isActive),
      },
    });

    return NextResponse.json(school);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await prisma.school.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
