import { NextRequest, NextResponse } from "next/server";
import type { GameState } from "../../../../store/GameContext";

export async function POST(
  req: NextRequest,
  { params }: { params: { game: string } }
) {
  const payload: GameState = await req.json();
  console.log(`${params.game}: ${JSON.stringify(payload)}`);

  return NextResponse.json({ status: "ok" });
}
