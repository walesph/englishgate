import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const schools = await prisma.school.findMany({
    orderBy: { order: "asc" },
    include: { region: { select: { name: true, slug: true } } },
  });
  return NextResponse.json(schools);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { name, slug, regionId, description, features, programs, images, mainImage, facilityImages, facilityVideo, dormImages, dormVideo, contact, address, website, tags, order } = body;

    if (!name || !slug || !regionId) {
      return NextResponse.json({ error: "이름, 슬러그, 지역은 필수입니다." }, { status: 400 });
    }

    const toJson = (val: unknown) =>
      typeof val === "string" ? val : JSON.stringify(val || []);

    const school = await prisma.school.create({
      data: {
        name,
        slug,
        regionId,
        description: description || "",
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
      },
    });

    return NextResponse.json(school, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
