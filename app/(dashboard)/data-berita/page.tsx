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
    <>
      <style>{`
        :root {
            --paper: #f6f4ee;
            --paper-raised: #fdfcf9;
            --ink: #1c1b17;
            --ink-soft: #6b6558;
            --rule: #ddd7c8;
            --ledger: #2f4a3c;
            --ledger-soft: #e4ebe6;
            --amber: #a97a2f;
            --rust: #a1432a;
        }
        @media (prefers-color-scheme: dark) {
            :root {
                --paper: #161511;
                --paper-raised: #1d1c17;
                --ink: #ece7db;
                --ink-soft: #948d7c;
                --rule: #34322a;
                --ledger: #7fa88e;
                --ledger-soft: #202821;
                --amber: #d1a35c;
                --rust: #d97b5f;
            }
        }

        .dash-root {
            min-height: 100vh;
            padding: 2rem clamp(1rem, 4vw, 2.5rem) 3rem;
            background: var(--paper);
            color: var(--ink);
            font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
        }
        .mono { font-family: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace; }

        /* ── MASTHEAD ── */
        .masthead {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            gap: 1.5rem;
            flex-wrap: wrap;
            padding-bottom: 1.1rem;
            border-bottom: 2px solid var(--ink);
            margin-bottom: 1.75rem;
        }
        .masthead-eyebrow {
            font-size: .7rem;
            letter-spacing: .12em;
            text-transform: uppercase;
            color: var(--ink-soft);
            margin: 0 0 .35rem;
        }
        .masthead h1 {
            font-size: 1.6rem;
            font-weight: 600;
            letter-spacing: -.01em;
            margin: 0;
        }
        .masthead h1 .accent { color: var(--ledger); }

        /* ── SEARCH & FILTER ROW ── */
        .search-form {
            display: flex;
            align-items: center;
            gap: .5rem;
        }
        .search-input-wrap {
            position: relative;
        }
        .search-input {
            padding: .5rem .75rem .5rem 2.2rem;
            font-size: .85rem;
            background: var(--paper-raised);
            border: 1px solid var(--rule);
            color: var(--ink);
            outline: none;
            transition: border-color .15s;
            width: 240px;
        }
        .search-input:focus {
            border-color: var(--ink);
        }
        .search-icon {
            position: absolute;
            left: .75rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--ink-soft);
            width: 14px;
            height: 14px;
        }

        /* Buttons */
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: .4rem;
            padding: .5rem 1rem;
            font-size: .8rem;
            font-weight: 600;
            text-decoration: none;
            cursor: pointer;
            border: 1px solid var(--ink);
            background: transparent;
            color: var(--ink);
            transition: background .15s, color .15s;
        }
        .btn:hover { background: var(--ink); color: var(--paper); }
        .btn-fill {
            background: var(--ledger);
            border-color: var(--ledger);
            color: var(--paper-raised);
        }
        .btn-fill:hover { background: var(--ink); border-color: var(--ink); }
        .btn-ghost {
            border-color: var(--rule);
            color: var(--ink-soft);
            font-weight: 500;
        }
        .btn-ghost:hover { background: transparent; color: var(--ink); border-color: var(--ink); }
        .btn-danger {
            border: none;
            background: transparent;
            color: var(--ink-soft);
            cursor: pointer;
            padding: .25rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color .15s;
        }
        .btn-danger:hover {
            color: var(--rust);
        }

        /* Grid & Cards */
        .grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        .card-item {
            background: var(--paper-raised);
            border: 1px solid var(--rule);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transition: border-color .15s;
        }
        .card-item:hover {
            border-color: var(--ledger);
        }
        .card-thumb-wrap {
            position: relative;
            height: 160px;
            background: var(--paper);
            border-bottom: 1px solid var(--rule);
            overflow: hidden;
        }
        .card-thumb {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .card-thumb-placeholder {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            font-size: 2.5rem;
            color: var(--ink-soft);
            opacity: .35;
        }
        .card-lang-tag {
            position: absolute;
            top: .75rem;
            right: .75rem;
            background: var(--ink);
            color: var(--paper);
            font-size: .65rem;
            font-weight: 600;
            padding: .15rem .4rem;
            text-transform: uppercase;
        }
        .card-content {
            padding: 1.25rem;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
        .card-meta-top {
            margin-bottom: .75rem;
        }
        .card-title-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: .5rem;
            margin-bottom: .5rem;
        }
        .card-title {
            font-size: 1rem;
            font-weight: 600;
            line-height: 1.35;
            margin: 0;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        .card-summary {
            font-size: .8rem;
            color: var(--ink-soft);
            line-clamp: 2;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            margin-bottom: 1rem;
            line-height: 1.4;
        }
        .card-footer {
            margin-top: auto;
            border-top: 1px solid var(--rule);
            padding-top: .75rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: .75rem;
            color: var(--ink-soft);
        }
        .card-author {
            display: flex;
            align-items: center;
            gap: .35rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .card-date {
            white-space: nowrap;
        }
        .card-tags {
            margin-top: .75rem;
            display: flex;
            flex-wrap: wrap;
            gap: .35rem;
        }
        .card-tag-item {
            font-size: .7rem;
            color: var(--ink-soft);
            background: var(--paper);
            padding: .1rem .4rem;
            border: 1px solid var(--rule);
        }

        .type-tag {
            font-size: .7rem;
            font-weight: 600;
            letter-spacing: .03em;
            color: var(--ledger);
            border: 1px solid var(--ledger);
            padding: .12rem .5rem;
            white-space: nowrap;
            display: inline-block;
        }

        .pagination-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 1.5rem;
            border-top: 1px solid var(--rule);
            padding-top: 1.25rem;
            font-size: .85rem;
        }
        
        .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 5rem 1rem;
            gap: .75rem;
            color: var(--ink-soft);
            text-align: center;
            border: 1px dashed var(--rule);
            background: var(--paper-raised);
        }
        .empty-state-icon {
            font-size: 3rem;
            opacity: .4;
        }

        .card-skel {
            background: var(--paper-raised);
            border: 1px solid var(--rule);
            padding: 1.25rem;
            display: flex;
            flex-direction: column;
            gap: .75rem;
        }
        .skel-line {
            height: .8rem;
            background: var(--rule);
            opacity: .5;
        }
      `}</style>

      <div className="dash-root">
        {/* Header / Masthead */}
        <div className="masthead">
          <div>
            <p className="masthead-eyebrow">CMS · MyFinanceKu</p>
            <h1>Daftar <span className="accent">Data Berita</span></h1>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrap">
              <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Cari berita..."
                className="search-input"
              />
            </div>
            <button type="submit" className="btn btn-fill" style={{ padding: ".5rem 1rem" }}>
              Cari
            </button>
            {search && (
              <button
                type="button"
                onClick={() => { setSearch(""); setSearchInput(""); }}
                className="btn btn-ghost"
                style={{ padding: ".5rem .8rem" }}
              >
                ✕
              </button>
            )}
          </form>
        </div>

        {/* Error */}
        {error && (
          <div className="error-box">
            <span>{error}</span>
          </div>
        )}

        {/* Card Grid */}
        {isLoading ? (
          <div className="grid-container">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="card-skel">
                <div className="skel-line" style={{ width: "30%", height: "1.2rem" }} />
                <div className="skel-line" style={{ width: "80%", height: "1.5rem" }} />
                <div className="skel-line" style={{ width: "100%" }} />
                <div className="skel-line" style={{ width: "90%" }} />
                <div className="skel-line" style={{ width: "40%", marginTop: "auto" }} />
              </div>
            ))}
          </div>
        ) : dataBerita.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state-icon">📰</span>
            <p style={{ fontWeight: 600, fontSize: "1.05rem", margin: 0 }}>
              {search ? `Tidak ada hasil untuk "${search}"` : "Belum ada berita"}
            </p>
            <p style={{ fontSize: ".85rem", margin: 0, color: "var(--ink-soft)" }}>
              {search ? "Coba gunakan kata kunci lain" : "Tambahkan berita pertama Anda"}
            </p>
          </div>
        ) : (
          <div className="grid-container">
            {dataBerita.map((item) => {
              const date = item.times?.createdAt
                ? new Date(item.times.createdAt).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })
                : "-";

              return (
                <div key={item._id} className="card-item">
                  {/* Thumbnail */}
                  <div className="card-thumb-wrap">
                    {item.img_thunmnail ? (
                      <img
                        src={item.img_thunmnail}
                        alt={item.title}
                        className="card-thumb"
                      />
                    ) : (
                      <div className="card-thumb-placeholder">
                        📰
                      </div>
                    )}
                    {/* Language badge */}
                    <span className="card-lang-tag">
                      {item.language}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="card-content">
                    {/* Type badge */}
                    <div className="card-meta-top">
                      <span className="type-tag">
                        {item.type || "Umum"}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="card-title-row">
                      <h3 className="card-title" title={item.title}>
                        {item.title}
                      </h3>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.idBlog)}
                        className="btn-danger"
                        title="Hapus berita"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Summary */}
                    {item.summary && (
                      <p className="card-summary">
                        {item.summary}
                      </p>
                    )}

                    {/* Footer */}
                    <div className="card-footer">
                      <div className="card-author">
                        <svg style={{ width: "12px", height: "12px", opacity: 0.6 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{item.relation?.author || "Anonim"}</span>
                      </div>
                      <div className="card-date mono">
                        {date}
                      </div>
                    </div>

                    {/* Tags */}
                    {item.relation?.tags?.length > 0 && (
                      <div className="card-tags">
                        {item.relation.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="card-tag-item">
                            #{tag.trim()}
                          </span>
                        ))}
                        {item.relation.tags.length > 3 && (
                          <span className="card-tag-item" style={{ opacity: 0.6 }}>
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
          <div className="pagination-row">
            <p style={{ color: "var(--ink-soft)", margin: 0 }}>
              Halaman <span className="mono" style={{ fontWeight: 600, color: "var(--ink)" }}>{pagination.page}</span> dari {pagination.totalPages}
            </p>
            <div style={{ display: "flex", gap: ".5rem" }}>
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="btn btn-ghost"
                style={{ opacity: pagination.page <= 1 ? 0.4 : 1, cursor: pagination.page <= 1 ? "not-allowed" : "pointer" }}
              >
                Sebelumnya
              </button>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
                className="btn btn-ghost"
                style={{ opacity: pagination.page >= pagination.totalPages ? 0.4 : 1, cursor: pagination.page >= pagination.totalPages ? "not-allowed" : "pointer" }}
              >
                Selanjutnya
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}