import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://myfinanceku.vercel.app';
    const res = await fetch(`${baseUrl}/api/admin/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await res.json();

  if (!res.ok) {
    return Response.json({ message: data.message }, { status: res.status });
  }

  return Response.json({ message: data.message }, { status: 200 });
}