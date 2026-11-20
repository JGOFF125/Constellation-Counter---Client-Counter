import { NextResponse } from "next/server";

type HourlyRecord = {
  direction_1: number | null;
  direction_2: number | null;
};

const API_URL =
  "https://data.melbourne.vic.gov.au/api/explore/v2.1/catalog/datasets/pedestrian-counting-system-monthly-counts-per-hour/records";

export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get("date") ?? "";
  const timestamp = Date.parse(`${date}T00:00:00Z`);

  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !Number.isFinite(timestamp) ||
    new Date(timestamp).toISOString().slice(0, 10) !== date
  ) {
    return NextResponse.json({ message: "Invalid historical date" }, { status: 400 });
  }

  try {
    // I keep this historical sample on its original sensor and hour
    const url = new URL(API_URL);
    url.searchParams.set(
      "where",
      `location_id=11 and sensing_date=date'${date}' and hourday=9`,
    );
    url.searchParams.set("order_by", "hourday");
    url.searchParams.set("limit", "1");

    const response = await fetch(url, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error("Historical source unavailable");

    const data: { results: HourlyRecord[] } = await response.json();
    if (!Array.isArray(data.results)) throw new Error("Invalid historical response");

    return NextResponse.json({
      results: data.results.map((record) => ({
        direction_1: record.direction_1 ?? 0,
        direction_2: record.direction_2 ?? 0,
      })),
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to retrieve historical readings" },
      { status: 502 },
    );
  }
}
