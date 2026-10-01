import { MongoClient } from "mongodb";

export type ClickDoc = {
  _id: string; // 링크 id (예: "github")
  count: number;
};

// 개발 중 파일을 저장할 때마다 연결이 새로 생기지 않도록 전역에 하나만 보관
const globalForMongo = globalThis as typeof globalThis & {
  _mongoClient?: MongoClient;
};

function getClient() {
  if (!globalForMongo._mongoClient) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다.");
    }
    globalForMongo._mongoClient = new MongoClient(uri);
  }
  return globalForMongo._mongoClient;
}

// DB 이름은 MONGODB_URI 경로(/linknamu)에서 가져옴
export function getClicksCollection() {
  return getClient().db().collection<ClickDoc>("clicks");
}
