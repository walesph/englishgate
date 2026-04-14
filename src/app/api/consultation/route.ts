import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, region, school, message } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "이름과 연락처는 필수입니다." }, { status: 400 });
    }

    const consultation = await prisma.consultationRequest.create({
      data: {
        name: String(name),
        email: String(email || ""),
        phone: String(phone),
        region: region ? String(region) : null,
        school: school ? String(school) : null,
        message: String(message || ""),
      },
    });

    return NextResponse.json({ success: true, id: consultation.id });
  } catch (error) {
    console.error("상담신청 오류:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
