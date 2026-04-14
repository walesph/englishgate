import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const slides = await prisma.heroSlide.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(slides);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { type, imageUrl, youtubeUrl, title, subtitle, order } = body;

    const slide = await prisma.heroSlide.create({
      data: {
        type: type || "image",
        imageUrl: imageUrl || null,
        youtubeUrl: youtubeUrl || null,
        title: title || null,
        subtitle: subtitle || null,
        order: Number(order) || 0,
      },
    });

    return NextResponse.json(slide, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
