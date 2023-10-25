import { NextRequest, NextResponse } from "next/server";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.pusher_app_id || "",
  key: process.env.NEXT_PUBLIC_pusher_key || "",
  secret: process.env.pusher_secret || "",
  cluster: process.env.NEXT_PUBLIC_pusher_cluster || "",
  useTLS: false,
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const socket = formData.get("socket_id");
  const channel = formData.get("channel_name");
  if (socket && channel) {
    return NextResponse.json(
      pusher.authorizeChannel(String(socket), String(channel), {
        user_id: String(Date.now()),
      })
    );
  }
  return NextResponse.json({ message: "Bad request" }, { status: 400 });
}
