
import { NextResponse } from "next/server";
import type { AttendanceRecord } from "@/types/attendance";

type MelbourneRecord = {
  sensing_datetime: string;
  sensing_date: string;
  sensing_time: string;
  direction_1: number | null;
  direction_2: number | null;
  total_of_directions: number | null;
};

const API_URL =
  "https://data.melbourne.vic.gov.au/api/explore/v2.1/catalog/datasets/pedestrian-counting-system-past-hour-counts-per-minute/records";

export async function GET() {
  try {
    const url = new URL(API_URL);

    url.searchParams.set("where", "location_id=3");
    url.searchParams.set("limit", "100");
    url.searchParams.set("order_by", "sensing_datetime DESC");

    const response = await fetch(url.toString(), {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch pedestrian data");
    }

    const data: { results: MelbourneRecord[] } = await response.json();

    const records: AttendanceRecord[] = data.results.map((record) => ({
      dateTime: record.sensing_datetime,
      date: record.sensing_date,
      time: record.sensing_time,
      direction1: record.direction_1 ?? 0,
      direction2: record.direction_2 ?? 0,
      total: record.total_of_directions ?? 0,
    }));

    const totalDirection1 = records.reduce(
      (sum, item) => sum + item.direction1,
      0
    );

    const totalDirection2 = records.reduce(
      (sum, item) => sum + item.direction2,
      0
    );

    const totalPedestrians = records.reduce(
      (sum, item) => sum + item.total,
      0
    );

    return NextResponse.json({
      success: true,
      locationId: 3,
      lastUpdated: records[0]?.dateTime ?? null,
      summary: {
        direction1: totalDirection1,
        direction2: totalDirection2,
        total: totalPedestrians,
      },
      records,
    });
  } catch (error) {
    console.error("Attendance API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to retrieve attendance data",
      },
      { status: 500 }
    );
  }
}
