import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://myfinanceku.vercel.app';
    const res = await fetch(`${baseUrl}/api/admin/auth/cms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await res.json();

  if (!res.ok) {
    return Response.json({ message: data.message }, { status: res.status });
  }

  const token = data.token;
  const user = data.user;


  const response = Response.json({ success: true, user });
  response.headers.set(
    'Set-Cookie',
    `token=${token}; HttpOnly; Path=/; SameSite=Lax; Secure`
  );

  return response;
}