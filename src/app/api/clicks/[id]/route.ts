import { links } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

// 링크의 클릭 수를 1 올리고, 올라간 클릭 수를 반환
export async function POST(_req: Request, ctx: RouteContext<"/api/clicks/[id]">) {
  const { id } = await ctx.params;

  // 등록된 링크만 집계해서 임의의 id로 문서가 쌓이지 않게 함
  if (!links.some((link) => link.id === id)) {
    return Response.json({ error: "없는 링크입니다." }, { status: 404 });
  }

  try {
    const doc = await getClicksCollection().findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return Response.json({ count: doc?.count ?? 1 });
  } catch (error) {
    console.error("클릭 수 기록 실패", error);
    return Response.json({ error: "클릭 수를 기록하지 못했습니다." }, { status: 500 });
  }
}
