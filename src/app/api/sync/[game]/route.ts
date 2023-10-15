import { NextRequest, NextResponse } from "next/server";
import { parse } from "valibot";
import Schema from "../../../../store/schema";

export async function POST(
  req: NextRequest,
  { params }: { params: { game: string } }
) {
  const data = await req.json();
  try {
    const gameState = parse(Schema.GameState, data);
    console.log(`${params.game}: ${JSON.stringify(gameState)}`);
    return NextResponse.json({ status: "synced" });
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
}
