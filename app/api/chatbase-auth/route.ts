import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const CHATBASE_SECRET = process.env.CHATBASE_SECRET_KEY

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    if (!CHATBASE_SECRET) {
      return NextResponse.json({ error: "Chatbase secret not configured" }, { status: 500 })
    }

    // Generate HMAC hash for user verification
    const hash = crypto.createHmac("sha256", CHATBASE_SECRET).update(userId).digest("hex")

    return NextResponse.json({ hash })
  } catch (error) {
    console.error("Error generating Chatbase hash:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
