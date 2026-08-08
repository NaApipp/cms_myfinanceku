import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCorsHeaders } from "@/app/lib/cors";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ idBlog: string }> },
) {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);
  try {
    const { idBlog } = await params;
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DATABASE);
    const usersCollection = db.collection("berita");

    // Support deleting by either MongoDB _id (if valid ObjectId) or idBlog string
    let query: any = {};
    if (ObjectId.isValid(idBlog)) {
      query = { $or: [{ _id: new ObjectId(idBlog) }, { idBlog }] };
    } else {
      query = { idBlog };
    }

    const result = await usersCollection.deleteOne(query);

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Data tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Berita Berhasil di hapus",
        data: result,
        headers: corsHeaders
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing blog deletion:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat memproses penghapusan",
      },
      { status: 500 },
    );
  }
}
