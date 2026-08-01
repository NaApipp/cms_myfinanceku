import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://myfinanceku.vercel.app';
    const res = await fetch(`${baseUrl}/api/admin/user_admin`, {
        method: 'GET',
    });
    const data = await res.json();
    return NextResponse.json(data);
}