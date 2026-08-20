import { NextResponse } from "next/server";

import { mockCafes } from "@/mocks/fixtures/cafes";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const cafe = mockCafes.find((candidate) => candidate.id === id);

  if (!cafe) {
    return NextResponse.json(
      { message: `No cafe found for "${id}".` },
      { status: 404 },
    );
  }

  return NextResponse.json(cafe);
}
