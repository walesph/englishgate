import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getSession } from "@/lib/auth";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const region = await prisma.region.findUnique({
    where: { id },
    include: { schools: { orderBy: { order: "asc" } } },
  });
  if (!region) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(region);
}

export async function PUT(request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const body = await request.json();
    const { name, slug, description, features, image, order, isActive } = body;

    const region = await prisma.region.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        features: typeof features === "string" ? features : JSON.stringify(features || []),
        image: image || null,
        order: Number(order) || 0,
        isActive: Boolean(isActive),
      },
    });

    return NextResponse.json(region);
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
    await prisma.region.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
