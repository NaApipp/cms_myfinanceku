"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

type Berita = {
  _id: string;
  idBlog: string;
  title: string;
  slug: string;
  type: string;
  language: string;
  img_thunmnail: string;
  summary: string;
  content: string;
  relation: { author: string; tags: string[] };
  times: { createdAt: string; updatedAt: string };
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

const typeColorMap: Record<string, { bg: string; text: string; dot: string }> = {
  tips: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-300", dot: "bg-blue-500" },
  edukasi: { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-300", dot: "bg-purple-500" },
  investasi: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-300", dot: "bg-emerald-500" },
  perbankan: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-300", dot: "bg-amber-500" },
  asuransi: { bg: "bg-rose-100 dark:bg-rose-900/30", text: "text-rose-700 dark:text-rose-300", dot: "bg-rose-500" },
};

const defaultType = { bg: "bg-gray-100 dark:bg-gray-700", text: "text-gray-600 dark:text-gray-400", dot: "bg-gray-400" };

export default function DataBerita() {
  const [dataBerita, setDataBerita] = useState<Berita[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDataBerita(1, search);
  }, [search]);

  const fetchDataBerita = async (page: number = 1, searchQuery: string = "") => {
    setIsLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "9",
        ...(searchQuery && { search: searchQuery }),
        sortBy: "times.createdAt",
        sortOrder: "desc",
      });

      const res = await fetch(`/api/berita?${params}`);
      const data = await res.json();

      if (data.data) {
        setDataBerita(data.data);
        setPagination(data.pagination);
      } else {
        setError("Gagal memuat data berita.");
      }
    } catch {
      setError("Terjadi kesalahan saat mengambil data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  const handlePageChange = (newPage: number) => {
    fetchDataBerita(newPage, search);
  };

  const handleDelete = async (idBlog: string) => {

    setIsLoading(true);
    try {
      const res = await fetch(`/api/berita/${idBlog}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.success) {
        // Refresh halaman
        window.location.reload();
      } else {
        setError(data.message || "Gagal menghapus data.");
      }
    } catch {
      setError("Terjadi kesalahan saat menghapus data.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6 m-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Data Berita</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {isLoading ? "Memuat..." : `${pagination.total} artikel terdaftar`}
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Cari berita..."
              className="pl-9 pr-4 py-2 w-52 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-lime-600 text-white text-sm font-medium hover:bg-lime-700 transition-colors"
          >
            Cari
          </button>
          {search && (
            <button
              type="button"
              onClick={() => { setSearch(""); setSearchInput(""); }}
              className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              ✕
            </button>
          )}
        </form>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Card Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 space-y-3">
              <div className="h-4 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="pt-2 flex items-center gap-2">
                <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-3 w-12 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          ))}
        </div>
      ) : dataBerita.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
          <div className="mb-4 text-5xl">📰</div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            {search ? `Tidak ada hasil untuk "${search}"` : "Belum ada berita"}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {search ? "Coba gunakan kata kunci lain" : "Tambahkan berita pertama Anda"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dataBerita.map((item) => {
            const badge = typeColorMap[item.type] ?? defaultType;
            const date = item.times?.createdAt
              ? new Date(item.times.createdAt).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })
              : "-";

            return (
              <div
                key={item._id}
                className="group relative flex flex-col rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md hover:border-lime-400 dark:hover:border-lime-600 transition-all duration-200 overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="relative h-40 w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-900 overflow-hidden">
                  {item.img_thunmnail ? (
                    <img
                      src={item.img_thunmnail}
                      alt={item.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-4xl text-gray-300 dark:text-gray-600">
                      📰
                    </div>
                  )}
                  {/* Language badge */}
                  <span className="absolute top-3 right-3 rounded-md bg-black/50 px-2 py-0.5 text-xs font-semibold uppercase text-white backdrop-blur-sm">
                    {item.language}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  {/* Type badge */}
                  <div className="mb-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold capitalize ${badge.bg} ${badge.text}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`}></span>
                      {item.type || "Umum"}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="flex justify-between">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                    {item.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.idBlog)}
                    className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <Trash2 className="size-5" />
                  </button>
                  </div>

                  {/* Summary */}
                  {item.summary && (
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed flex-1">
                      {item.summary}
                    </p>
                  )}

                  {/* Footer */}
                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 truncate">
                      <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="truncate">{item.relation?.author || "Anonim"}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap ml-2">
                      <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {date}
                    </div>
                  </div>

                  {/* Tags */}
                  {item.relation?.tags?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.relation.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="rounded px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                          #{tag.trim()}
                        </span>
                      ))}
                      {item.relation.tags.length > 3 && (
                        <span className="rounded px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-400">
                          +{item.relation.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-2 text-sm">
          <p className="text-gray-500 dark:text-gray-400">
            Halaman <span className="font-semibold text-gray-700 dark:text-gray-300">{pagination.page}</span> dari {pagination.totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Sebelumnya
            </button>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Selanjutnya
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}