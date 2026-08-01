"use client"

import { useEffect, useState } from "react"
import { SquareArrowOutUpRight } from "lucide-react"
import Link from "next/link";

export default function DashboardPage() {

    const [dataBerita, setDataBerita] = useState([]);
    const [totalBerita, setTotalBerita] = useState(0);
    const [error, setError] = useState("");

    const fetchDataBerita = async () => {
        try {
            const params = new URLSearchParams({
                page: "1",
                limit: "9",
                sortBy: "times.createdAt",
                sortOrder: "desc",
            });

            const res = await fetch(`/api/berita?${params}`);
            const data = await res.json();

            if (data.data) {
                setDataBerita(data.data);
                setTotalBerita(data.pagination.total);
            } else {
                setError("Gagal memuat data berita.");
            }
        } catch (error) {
            setError("Terjadi kesalahan saat mengambil data.");
        }
    }

    useEffect(() => {
        fetchDataBerita();
    }, []);


    return (
        <div className="min-h-screen m-5">
            <h1 className="text-2xl font-bold">Selamat datang di Dashboard CMS MyFinanceKu</h1>

            {/* Error */}
            {error && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">
                    {error}
                </div>
            )}
            
            <div className="mt-5 w-full max-w-sm p-6 backdrop-blur-lg bg-gray-900/5 dark:bg-white/10 rounded-xl border border-gray-900/10 dark:border-white/20 shadow-xl">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Total Berita</h3>
                    <Link href="/data-berita" title="Lihat Berita">
                        <SquareArrowOutUpRight className="text-gray-900 dark:text-white" size={24} />
                    </Link>
                </div>
                <p className="text-gray-700 dark:text-gray-200 mt-3">{totalBerita} Berita</p>
            </div>
        </div>
    )
}