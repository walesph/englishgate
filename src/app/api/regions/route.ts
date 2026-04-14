import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const regions = await prisma.region.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { schools: true } } },
  });
  return NextResponse.json(regions);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { name, slug, description, features, image, order } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: "이름과 슬러그는 필수입니다." }, { status: 400 });
    }

    const region = await prisma.region.create({
      data: {
        name,
        slug,
        description: description || "",
        features: typeof features === "string" ? features : JSON.stringify(features || []),
        image: image || null,
        order: Number(order) || 0,
      },
    });

    return NextResponse.json(region, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
