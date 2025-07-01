import { useState } from "react";
import { Button } from "~/core/components/ui/button";
// 구글 맵 관련 import
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import type { GoogleMap as GoogleMapType } from "@react-google-maps/api";

// .env 또는 환경변수에 GOOGLE_MAPS_API_KEY를 저장해야 합니다.
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '100%',
  height: '256px', // h-64
};
const defaultCenter = {
  lat: 37.5665, // 서울 위도
  lng: 126.9780, // 서울 경도
};

export default function CreateTrip() {
  // 출발/도착 날짜 상태
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // 장소 상태 (위도/경도 등)
  const [location, setLocation] = useState(defaultCenter);

  // 구글 맵 스크립트 로드
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  return (
    <div className="flex flex-col items-center gap-8 py-10">
      <h1 className="text-3xl font-bold">여행 만들기</h1>
      <form className="flex flex-col gap-6 w-full max-w-md">
        {/* 출발 날짜 */}
        <div className="flex flex-col gap-2">
          <label htmlFor="start-date" className="font-medium">출발 날짜</label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
        {/* 도착 날짜 */}
        <div className="flex flex-col gap-2">
          <label htmlFor="end-date" className="font-medium">도착 날짜</label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
        {/* 지도 */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">여행 장소</label>
          <div className="w-full h-64 rounded overflow-hidden">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={location}
                zoom={10}
                onClick={(e: any) => {
                  if (e.latLng) {
                    setLocation({
                      lat: e.latLng.lat(),
                      lng: e.latLng.lng(),
                    });
                  }
                }}
              >
                <Marker position={location} />
              </GoogleMap>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="text-gray-500">지도를 불러오는 중...</span>
              </div>
            )}
          </div>
        </div>
        <Button type="submit" className="mt-4">여행 생성</Button>
      </form>
    </div>
  );
} 