import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "English Gate | 필리핀 어학연수 전문 에이전시",
  description: "바기오, 세부, 마닐라 등 필리핀 전 지역 어학연수 전문 에이전시. 맞춤형 유학 컨설팅과 30개 이상의 파트너 어학원 정보를 제공합니다.",
  keywords: "필리핀 어학연수, 필리핀 유학, 바기오 어학원, 세부 어학원, 마닐라 어학원, 필리핀 영어연수",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
