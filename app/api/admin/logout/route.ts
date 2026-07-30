import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const response = NextResponse.json({ success: true });
        response.headers.set(
            'Set-Cookie',
            'token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure'
        );
        return response;
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}