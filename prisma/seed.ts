import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? "" });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 시드 데이터 초기화 시작...");

  // 관리자 계정 생성
  const hashedPassword = await bcrypt.hash("admin1234", 10);
  await prisma.adminUser.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedPassword,
    },
  });
  console.log("✅ 관리자 계정 생성 완료 (admin / admin1234)");

  // 지역 데이터
  const regionsData = [
    {
      name: "바기오",
      slug: "baguio",
      description:
        "필리핀의 여름 수도로 불리는 바기오는 해발 1,500m 고산지대에 위치한 쾌적한 도시입니다. 서늘한 기후와 아름다운 자연 환경으로 영어 학습에 최적의 환경을 제공합니다.",
      features: JSON.stringify([
        "서늘한 고산 기후 (연평균 18°C)",
        "필리핀 최고의 교육 도시",
        "저렴한 생활비",
        "안전한 환경",
        "집중 영어 학습 환경",
        "1:1 수업 최다 보유 지역",
      ]),
      image: "/images/regions/baguio.jpg",
      order: 1,
    },
    {
      name: "세부막탄",
      slug: "cebu-mactan",
      description:
        "세계적인 리조트 지역인 막탄은 세부 국제공항과 인접하며, 아름다운 해변과 현대적인 시설을 갖춘 어학원들이 밀집해 있습니다.",
      features: JSON.stringify([
        "아름다운 해변과 리조트",
        "국제공항 인접",
        "현대적인 시설",
        "다양한 레저 활동",
        "ESL 특화 프로그램",
        "쾌적한 학습 환경",
      ]),
      image: "/images/regions/mactan.jpg",
      order: 2,
    },
    {
      name: "세부",
      slug: "cebu",
      description:
        "필리핀 제2의 도시 세부는 도심 속에서 영어를 배울 수 있는 최적의 도시입니다. 풍부한 인프라와 다양한 어학원 선택지를 제공합니다.",
      features: JSON.stringify([
        "필리핀 제2의 대도시",
        "풍부한 생활 인프라",
        "다양한 어학원 선택",
        "쇼핑·문화 시설 풍부",
        "IT 산업 발달 도시",
        "활발한 영어 사용 환경",
      ]),
      image: "/images/regions/cebu.jpg",
      order: 3,
    },
    {
      name: "클락",
      slug: "clark",
      description:
        "마닐라 북쪽에 위치한 클락은 미군 기지가 있던 특별경제구역으로, 원어민 영어 발음과 군사적인 규율 있는 교육 시스템으로 유명합니다.",
      features: JSON.stringify([
        "미군 기지 출신 원어민 강사",
        "군사 학교 스타일 엄격한 관리",
        "특별경제구역 위치",
        "마닐라 접근 용이",
        "뛰어난 영어 발음 교육",
        "규율 있는 학습 환경",
      ]),
      image: "/images/regions/clark.jpg",
      order: 4,
    },
    {
      name: "바콜로드",
      slug: "bacolod",
      description:
        "설탕 도시로 유명한 바콜로드는 관광지화가 덜 되어 현지인들과의 진정한 영어 소통이 가능합니다. 저렴한 비용으로 집중적인 영어 학습이 가능합니다.",
      features: JSON.stringify([
        "관광지화 최소화로 순수 영어 환경",
        "매우 저렴한 물가",
        "친절한 현지인",
        "집중 학습 환경",
        "소규모 어학원 운영",
        "여유로운 도시 분위기",
      ]),
      image: "/images/regions/bacolod.jpg",
      order: 5,
    },
    {
      name: "일로일로",
      slug: "iloilo",
      description:
        "필리핀 서부 비사야 지역의 중심 도시 일로일로는 역사적 문화 도시로, 높은 영어 구사 능력과 저렴한 물가가 특징입니다.",
      features: JSON.stringify([
        "높은 영어 교육 수준",
        "저렴한 생활비",
        "역사·문화적 도시",
        "안전한 도시 환경",
        "대학도시 분위기",
        "한인 밀집도 낮아 영어 집중 가능",
      ]),
      image: "/images/regions/iloilo.jpg",
      order: 6,
    },
    {
      name: "마닐라",
      slug: "manila",
      description:
        "필리핀의 수도 마닐라는 국제적인 대도시로 비즈니스 영어 및 다양한 영어 프로그램을 제공합니다. 글로벌 환경에서의 영어 학습이 가능합니다.",
      features: JSON.stringify([
        "필리핀 수도, 글로벌 환경",
        "비즈니스 영어 특화",
        "국제적인 도시 인프라",
        "다양한 문화 체험",
        "공항 접근성 최고",
        "폭넓은 취업·인턴십 기회",
      ]),
      image: "/images/regions/manila.jpg",
      order: 7,
    },
  ];

  const regions: Record<string, string> = {};

  for (const regionData of regionsData) {
    const region = await prisma.region.upsert({
      where: { slug: regionData.slug },
      update: regionData,
      create: regionData,
    });
    regions[regionData.slug] = region.id;
    console.log(`✅ 지역 생성: ${region.name}`);
  }

  // 어학원 데이터
  const schoolsData = [
    // 바기오
    {
      name: "웨일즈 어학원",
      slug: "wales-baguio",
      regionId: regions["baguio"],
      description:
        "바기오 최고의 1:1 영어 수업 전문 어학원. 20년 이상의 역사를 자랑하며 한국인 학생들에게 가장 인기 있는 어학원 중 하나입니다.",
      features: JSON.stringify([
        "100% 1:1 수업",
        "소규모 그룹 수업",
        "IELTS 특화 과정",
        "한국인 매니저 상주",
        "최신 시설",
      ]),
      programs: JSON.stringify([
        "General English",
        "IELTS 준비",
        "비즈니스 영어",
        "ESL 집중 과정",
      ]),
      images: JSON.stringify([]),
      tags: JSON.stringify(["1:1수업", "IELTS", "바기오추천"]),
      order: 1,
    },
    {
      name: "파인즈 어학원",
      slug: "pines-baguio",
      regionId: regions["baguio"],
      description:
        "바기오를 대표하는 명문 어학원. 체계적인 커리큘럼과 우수한 강사진으로 높은 성취도를 자랑합니다.",
      features: JSON.stringify([
        "체계적인 커리큘럼",
        "우수한 필리핀 강사진",
        "다양한 과외활동",
        "넓은 캠퍼스",
        "기숙사 완비",
      ]),
      programs: JSON.stringify([
        "ESL 표준 과정",
        "TOEIC 준비",
        "영어 회화 집중",
        "주니어 과정",
      ]),
      images: JSON.stringify([]),
      tags: JSON.stringify(["바기오추천", "TOEIC", "주니어"]),
      order: 2,
    },
    {
      name: "JIC 어학원",
      slug: "jic-baguio",
      regionId: regions["baguio"],
      description:
        "일본계 어학원으로 시작하여 현재는 한국인, 일본인 등 다양한 국적의 학생들이 함께 공부하는 다국적 어학원입니다.",
      features: JSON.stringify([
        "다국적 학생 환경",
        "우수한 영어 환경",
        "체계적인 레벨 시스템",
        "현대적 시설",
        "활발한 액티비티",
      ]),
      programs: JSON.stringify([
        "ESL 일반과정",
        "IELTS 집중",
        "비즈니스 회화",
        "단기 과정",
      ]),
      images: JSON.stringify([]),
      tags: JSON.stringify(["다국적환경", "바기오추천"]),
      order: 3,
    },
    {
      name: "모놀 어학원",
      slug: "monol-baguio",
      regionId: regions["baguio"],
      description:
        "한국인이 설립한 어학원으로 한국인 학생들의 특성을 잘 이해하고 최적화된 교육을 제공합니다.",
      features: JSON.stringify([
        "한국인 설립 어학원",
        "한국어 지원 가능",
        "맞춤형 교육 시스템",
        "합리적인 비용",
        "친숙한 환경",
      ]),
      programs: JSON.stringify([
        "집중 영어 과정",
        "IELTS 준비",
        "회화 집중",
        "어휘·문법 강화",
      ]),
      images: JSON.stringify([]),
      tags: JSON.stringify(["저렴한비용", "한국인친화", "바기오추천"]),
      order: 4,
    },
    {
      name: "베씨 어학원",
      slug: "beci-baguio",
      regionId: regions["baguio"],
      description:
        "바기오의 인기 어학원으로 친근한 분위기와 실용적인 영어 교육으로 많은 학생들에게 사랑받고 있습니다.",
      features: JSON.stringify([
        "친근한 학습 분위기",
        "실용 영어 중심",
        "소규모 반 운영",
        "저렴한 학비",
        "강사 1:1 멘토링",
      ]),
      programs: JSON.stringify([
        "실용 영어 과정",
        "회화 집중 과정",
        "TOEIC 준비",
        "장기 연수",
      ]),
      images: JSON.stringify([]),
      tags: JSON.stringify(["저렴한비용", "장기연수", "바기오추천"]),
      order: 5,
    },
    {
      name: "이에듀 어학원",
      slug: "eedu-baguio",
      regionId: regions["baguio"],
      description:
        "교육 전문가들이 설립한 어학원으로 과학적인 교육 방법과 데이터 기반의 학습 관리로 높은 성취도를 보장합니다.",
      features: JSON.stringify([
        "데이터 기반 학습 관리",
        "과학적 교육 방법론",
        "개인별 맞춤 커리큘럼",
        "정기 레벨 테스트",
        "학습 결과 보고",
      ]),
      programs: JSON.stringify([
        "집중 ESL",
        "IELTS Academic",
        "비즈니스 영어",
        "발음 교정",
      ]),
      images: JSON.stringify([]),
      tags: JSON.stringify(["1:1수업", "IELTS", "바기오추천"]),
      order: 6,
    },
    // 세부막탄
    {
      name: "CIA (Club International Academy)",
      slug: "cia-mactan",
      regionId: regions["cebu-mactan"],
      description:
        "세부막탄의 대표적인 어학원으로 리조트형 캠퍼스에서 학습과 휴양을 동시에 즐길 수 있습니다.",
      features: JSON.stringify([
        "리조트형 캠퍼스",
        "수영장 완비",
        "막탄 해변 인접",
        "다국적 학생 환경",
        "현대적인 시설",
      ]),
      programs: JSON.stringify([
        "General English",
        "IELTS 준비",
        "비즈니스 영어",
        "주니어 과정",
      ]),
      images: JSON.stringify([]),
      tags: JSON.stringify(["리조트형", "다국적환경", "세부막탄추천"]),
      order: 1,
    },
    {
      name: "SMEAG (막탄)",
      slug: "smeag-mactan",
      regionId: regions["cebu-mactan"],
      description:
        "필리핀 최대 어학원 그룹 중 하나인 SMEAG의 막탄 캠퍼스. 군사학교 스타일의 엄격한 관리와 높은 영어 교육 품질을 자랑합니다.",
      features: JSON.stringify([
        "군사학교 스타일 규율",
        "엄격한 영어 사용 규정",
        "우수한 강사진",
        "다양한 프로그램",
        "기숙사 완비",
      ]),
      programs: JSON.stringify([
        "IELTS 집중 과정",
        "영어 집중 과정 (EAP)",
        "비즈니스 영어",
        "캠프 과정",
      ]),
      images: JSON.stringify([]),
      tags: JSON.stringify(["군사학교", "IELTS", "세부막탄추천"]),
      order: 2,
    },
    {
      name: "BLUE OCEAN",
      slug: "blue-ocean-mactan",
      regionId: regions["cebu-mactan"],
      description:
        "막탄 해변가에 위치한 아름다운 어학원. 수준 높은 영어 교육과 여유로운 필리핀 라이프를 동시에 경험할 수 있습니다.",
      features: JSON.stringify([
        "해변 인접 위치",
        "여유로운 학습 환경",
        "소규모 수업",
        "개인 맞춤 교육",
        "저렴한 비용",
      ]),
      programs: JSON.stringify([
        "ESL 일반 과정",
        "회화 집중",
        "TOEIC 준비",
        "장기 연수",
      ]),
      images: JSON.stringify([]),
      tags: JSON.stringify(["저렴한비용", "소규모수업", "세부막탄추천"]),
      order: 3,
    },
    {
      name: "PHILINTER",
      slug: "philinter-mactan",
      regionId: regions["cebu-mactan"],
      description:
        "글로벌 수준의 어학 교육을 제공하는 어학원. 다양한 국적의 학생들과 함께 진정한 국제적 영어 환경을 경험할 수 있습니다.",
      features: JSON.stringify([
        "글로벌 교육 시스템",
        "다국적 환경",
        "인터내셔널 강사진",
        "최신 교육 시설",
        "다양한 방과후 프로그램",
      ]),
      programs: JSON.stringify([
        "General English",
        "IELTS/TOEFL 준비",
        "비즈니스 커뮤니케이션",
        "시험 준비 과정",
      ]),
      images: JSON.stringify([]),
      tags: JSON.stringify(["다국적환경", "IELTS", "세부막탄추천"]),
      order: 4,
    },
    // 세부
    {
      name: "SMEAG (세부)",
      slug: "smeag-cebu",
      regionId: regions["cebu"],
      description:
        "SMEAG 세부 캠퍼스. 필리핀 제2의 도시 세부 도심에 위치하여 도시 생활과 영어 학습을 동시에 즐길 수 있습니다.",
      features: JSON.stringify([
        "세부 도심 위치",
        "교통 편리",
        "군사학교 규율 적용",
        "우수한 교육 품질",
        "기숙사 제공",
      ]),
      programs: JSON.stringify([
        "IELTS 집중",
        "영어 집중 과정",
        "비즈니스 영어",
        "유학 준비",
      ]),
      images: JSON.stringify([]),
      tags: JSON.stringify(["군사학교", "IELTS", "세부추천"]),
      order: 1,
    },
    {
      name: "IBREEZE",
      slug: "ibreeze-cebu",
      regionId: regions["cebu"],
      description:
        "세부의 신선한 바람처럼 쾌적한 환경에서 영어를 배울 수 있는 어학원. 친절한 강사진과 체계적인 커리큘럼이 특징입니다.",
      features: JSON.stringify([
        "쾌적한 학습 환경",
        "친절한 강사진",
        "체계적 커리큘럼",
        "합리적 비용",
        "소규모 클래스",
      ]),
      programs: JSON.stringify([
        "ESL 일반",
        "집중 회화",
        "TOEIC 준비",
        "단기 과정",
      ]),
      images: JSON.stringify([]),
      tags: JSON.stringify(["저렴한비용", "소규모수업", "세부추천"]),
      order: 2,
    },
    {
      name: "EV Academy",
      slug: "ev-cebu",
      regionId: regions["cebu"],
      description:
        "세부에 위치한 EV 어학원은 체계적인 영어 교육 시스템으로 빠른 영어 실력 향상을 목표로 합니다.",
      features: JSON.stringify([
        "빠른 실력 향상 시스템",
        "체계적 교육 관리",
        "다양한 레벨 프로그램",
        "정기 평가 시스템",
        "강사 전문성 높음",
      ]),
      programs: JSON.stringify([
        "집중 ESL",
        "IELTS 준비",
        "회화 강화",
        "문법 집중",
      ]),
      images: JSON.stringify([]),
      tags: JSON.stringify(["세부추천", "IELTS"]),
      order: 3,
    },
    {
      name: "CELLA",
      slug: "cella-cebu",
      regionId: regions["cebu"],
      description:
        "세부의 중심부에 위치한 CELLA 어학원은 개인 맞춤형 영어 교육으로 명성이 높습니다.",
      features: JSON.stringify([
        "개인 맞춤형 교육",
        "세부 중심 위치",
        "1:1 수업 비율 높음",
        "한국인 매니저",
        "쾌적한 시설",
      ]),
      programs: JSON.stringify([
        "1:1 집중 영어",
        "그룹 회화",
        "IELTS 개인 지도",
        "장기 연수",
      ]),
      images: JSON.stringify([]),
      tags: JSON.stringify(["1:1수업", "장기연수", "세부추천"]),
      order: 4,
    },
    {
      name: "CG English",
      slug: "cg-cebu",
      regionId: regions["cebu"],
      description:
        "세부의 CG 어학원은 실용적인 영어 교육과 합리적인 비용으로 많은 학생들에게 인기 있는 어학원입니다.",
      features: JSON.stringify([
        "실용적 영어 교육",
        "합리적인 학비",
        "다양한 국적 학생",
        "편리한 위치",
        "친근한 분위기",
      ]),
      programs: JSON.stringify([
        "일반 ESL",
        "비즈니스 영어",
        "TOEIC 준비",
        "단기 집중",
      ]),
      images: JSON.stringify([]),
      tags: JSON.stringify(["저렴한비용", "세부추천"]),
      order: 5,
    },
  ];

  for (const schoolData of schoolsData) {
    const school = await prisma.school.upsert({
      where: { slug: schoolData.slug },
      update: schoolData,
      create: schoolData,
    });
    console.log(`✅ 어학원 생성: ${school.name}`);
  }

  console.log("\n🎉 시드 데이터 초기화 완료!");
  console.log("📌 관리자 계정: admin / admin1234");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
