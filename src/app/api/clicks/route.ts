import { links } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

// 모든 링크의 클릭 수를 { [링크 id]: 클릭 수 } 형태로 반환
export async function GET() {
  try {
    const docs = await getClicksCollection()
      .find({ _id: { $in: links.map((link) => link.id) } })
      .toArray();
    const counts = Object.fromEntries(docs.map((doc) => [doc._id, doc.count]));
    return Response.json(counts);
  } catch (error) {
    console.error("클릭 수 조회 실패", error);
    return Response.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}
