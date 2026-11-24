
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { address } = await req.json();

    if (!address || address.trim().length < 3) {
      return NextResponse.json(
        { error: "Invalid address!" },
        { status: 400 }
      );
    }

    const params = new URLSearchParams({
      text: address,
      format: "json",
      limit: "5",
      apiKey: process.env.GEOAPIFY_KEY!,
    });

    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?${params}`
    );

    if (!response.ok) {
      console.error("Geoapify error:", response.status);

      return NextResponse.json(
        { error: "Geocoding service failed!" },
        { status: 502 }
      );
    }

    const data = await response.json();

    const result = data.results.map((item: any) => ({
      name: item.name,
      street: item.street,
      city: item.city,
      country: item.country,
      latitude: item.lat,
      longitude: item.lon,
      housenumber:item.housenumber
    }));

    return NextResponse.json(result);

  } catch (error) {
    console.error("Geocoding error:", error);

    return NextResponse.json(
      { error: "Couldn't find address!" },
      { status: 500 }
    );
  }
}

