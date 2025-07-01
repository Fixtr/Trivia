import { pgTable, text, doublePrecision, timestamp, uuid } from "drizzle-orm/pg-core";
import { makeIdentityColumn, timestamps } from "~/core/db/helpers.server";

export const trips = pgTable("trips", {
  ...makeIdentityColumn("trip_id"),
  // 여행 출발일
  start_date: timestamp().notNull(),
  // 여행 도착일
  end_date: timestamp().notNull(),
  // 장소명(예: 서울, 제주도 등)
  place_name: text().notNull(),
  // 위도
  lat: doublePrecision().notNull(),
  // 경도
  lng: doublePrecision().notNull(),
  // (선택) 사용자 ID, 추후 외래키 연결 가능
  user_id: uuid(),
  ...timestamps,
}); 