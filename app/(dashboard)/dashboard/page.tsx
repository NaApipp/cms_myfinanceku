"use client"

import { useEffect, useState } from "react"
import { SquareArrowOutUpRight, Newspaper, Clock3, RefreshCw, AlertCircle, Plus } from "lucide-react"
import Link from "next/link"

interface Berita {
    _id: string
    idBlog: string
    title: string
    type: string
    author?: string
    relation?: { author: string; tags?: string[] }
    times?: { createdAt: string; updatedAt: string }
    img_thunmnail?: string
    language?: string
}

function formatDate(dateStr: string | undefined) {
    if (!dateStr) return "—"
    const date = new Date(dateStr)
    return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

function pad(n: number) {
    return n.toString().padStart(3, "0")
}

export default function DashboardPage() {
    const [dataBerita, setDataBerita] = useState<Berita[]>([])
    const [totalBerita, setTotalBerita] = useState(0)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [adminName, setAdminName] = useState("Admin")
    const [now, setNow] = useState<Date | null>(null)

    const fetchDataBerita = async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true)
        else setLoading(true)
        setError("")
        try {
            const params = new URLSearchParams({
                page: "1",
                limit: "6",
                sortBy: "times.createdAt",
                sortOrder: "desc",
            })
            const res = await fetch(`/api/berita?${params}`)
            const data = await res.json()
            if (data.data) {
                setDataBerita(data.data)
                setTotalBerita(data.pagination.total)
            } else {
                setError("Gagal memuat data berita.")
            }
        } catch {
            setError("Terjadi kesalahan saat mengambil data.")
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    useEffect(() => {
        fetchDataBerita()
        setNow(new Date())
        try {
            const user = sessionStorage.getItem("user-admin")
            if (user) {
                const parsed = JSON.parse(user)
                if (parsed?.name) setAdminName(parsed.name)
            }
        } catch { }
    }, [])

    const hour = now ? now.getHours() : 0
    const greeting =
        hour < 12 ? "Selamat pagi" :
        hour < 15 ? "Selamat siang" :
        hour < 18 ? "Selamat sore" : "Selamat malam"

    const latest = dataBerita[0]

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
                    margin-bottom: 1.25rem;
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
                .masthead-meta {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    font-size: .78rem;
                    color: var(--ink-soft);
                }
                .masthead-meta .mono { color: var(--ink); }

                /* ── TICKER: signature element ── */
                .ticker {
                    display: flex;
                    border: 1px solid var(--rule);
                    background: var(--paper-raised);
                    margin-bottom: 1.75rem;
                    overflow-x: auto;
                }
                .ticker-item {
                    flex: 1 0 auto;
                    display: flex;
                    align-items: baseline;
                    gap: .6rem;
                    padding: .85rem 1.25rem;
                    border-right: 1px solid var(--rule);
                    white-space: nowrap;
                }
                .ticker-item:last-child { border-right: none; }
                .ticker-label {
                    font-size: .68rem;
                    text-transform: uppercase;
                    letter-spacing: .08em;
                    color: var(--ink-soft);
                }
                .ticker-value {
                    font-size: 1.05rem;
                    font-weight: 600;
                }
                .ticker-value.ledger { color: var(--ledger); }
                .ticker-value.amber { color: var(--amber); }
                .ticker-skel {
                    width: 3rem;
                    height: .95rem;
                    background: var(--rule);
                    opacity: .6;
                    display: inline-block;
                }

                /* ── ACTIONS ── */
                .actions-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 1rem;
                    flex-wrap: wrap;
                    margin-bottom: .9rem;
                }
                .section-label {
                    font-size: .7rem;
                    text-transform: uppercase;
                    letter-spacing: .1em;
                    color: var(--ink-soft);
                    display: flex;
                    align-items: center;
                    gap: .5rem;
                }
                .section-label::before {
                    content: "";
                    width: .5rem;
                    height: .5rem;
                    background: var(--ledger);
                }
                .actions-buttons { display: flex; gap: .6rem; }
                .btn {
                    display: inline-flex;
                    align-items: center;
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
                .btn-ghost svg { transition: transform .5s; }
                .btn-ghost.spinning svg { animation: spin .8s linear infinite; }
                @keyframes spin { to { transform: rotate(360deg); } }

                /* ── ERROR ── */
                .error-box {
                    display: flex;
                    align-items: center;
                    gap: .6rem;
                    padding: .8rem 1rem;
                    border: 1px solid var(--rust);
                    color: var(--rust);
                    font-size: .82rem;
                    margin-bottom: 1rem;
                }

                /* ── LEDGER TABLE ── */
                .ledger-table-wrap {
                    border: 1px solid var(--rule);
                    background: var(--paper-raised);
                    overflow-x: auto;
                }
                .ledger-table { width: 100%; border-collapse: collapse; font-size: .85rem; }
                .ledger-table thead th {
                    text-align: left;
                    padding: .7rem 1.1rem;
                    font-size: .68rem;
                    text-transform: uppercase;
                    letter-spacing: .08em;
                    color: var(--ink-soft);
                    border-bottom: 1px solid var(--ink);
                    white-space: nowrap;
                }
                .ledger-table thead th.num { text-align: right; }
                .ledger-table td {
                    padding: .8rem 1.1rem;
                    border-bottom: 1px solid var(--rule);
                    vertical-align: middle;
                }
                .ledger-table tbody tr:last-child td { border-bottom: none; }
                .ledger-table tbody tr:hover { background: var(--ledger-soft); }
                .row-index {
                    font-size: .75rem;
                    color: var(--ink-soft);
                }
                .news-title-cell {
                    display: flex;
                    align-items: center;
                    gap: .75rem;
                    max-width: 360px;
                }
                .news-thumb {
                    width: 2.6rem;
                    height: 2.1rem;
                    object-fit: cover;
                    flex-shrink: 0;
                    border: 1px solid var(--rule);
                }
                .news-thumb-placeholder {
                    width: 2.6rem;
                    height: 2.1rem;
                    flex-shrink: 0;
                    border: 1px solid var(--rule);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--ink-soft);
                }
                .news-title-text {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-weight: 500;
                }
                .type-tag {
                    font-size: .7rem;
                    font-weight: 600;
                    letter-spacing: .03em;
                    color: var(--ledger);
                    border: 1px solid var(--ledger);
                    padding: .12rem .5rem;
                    white-space: nowrap;
                }
                .lang-cell { font-size: .78rem; color: var(--ink-soft); }
                .date-cell { white-space: nowrap; color: var(--ink-soft); }

                .empty-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 3.5rem 1rem;
                    gap: .75rem;
                    color: var(--ink-soft);
                    text-align: center;
                }
                .empty-state svg { opacity: .35; }
                .empty-state p { font-size: .85rem; margin: 0; max-width: 22rem; }

                .row-skel {
                    height: .9rem;
                    background: var(--rule);
                    opacity: .5;
                }

                @media (max-width: 768px) {
                    .dash-root { padding: 1.25rem 1rem 2rem; }
                    .masthead h1 { font-size: 1.3rem; }
                    .news-thumb, .news-thumb-placeholder { display: none; }
                }
            `}</style>

            <div className="dash-root">

                {/* ── MASTHEAD ── */}
                <div className="masthead">
                    <div>
                        <p className="masthead-eyebrow">CMS · MyFinanceKu</p>
                        <h1>{greeting}, <span className="accent">{adminName}</span></h1>
                    </div>
                    <div className="masthead-meta">
                        {now && (
                            <span>
                                {now.toLocaleDateString("id-ID", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
                                {" · "}
                                <span className="mono">{now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}</span>
                            </span>
                        )}
                    </div>
                </div>

                {/* ── TICKER (signature strip) ── */}
                <div className="ticker">
                    <div className="ticker-item">
                        <span className="ticker-label">Total artikel</span>
                        {loading ? <span className="ticker-skel" /> : (
                            <span className="ticker-value ledger mono">{pad(totalBerita)}</span>
                        )}
                    </div>
                    <div className="ticker-item">
                        <span className="ticker-label">Artikel terbaru</span>
                        {loading ? <span className="ticker-skel" /> : (
                            <span className="ticker-value" style={{ fontWeight: 500, fontSize: ".85rem" }}>
                                {latest ? (latest.title.length > 42 ? latest.title.slice(0, 42) + "…" : latest.title) : "—"}
                            </span>
                        )}
                    </div>
                    <div className="ticker-item">
                        <span className="ticker-label">Terakhir update</span>
                        {loading ? <span className="ticker-skel" /> : (
                            <span className="ticker-value amber mono">{formatDate(latest?.times?.createdAt)}</span>
                        )}
                    </div>
                </div>

                {/* ── ERROR ── */}
                {error && (
                    <div className="error-box">
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}

                {/* ── ACTIONS ── */}
                <div className="actions-row">
                    <span className="section-label">Berita terbaru</span>
                    <div className="actions-buttons">
                        <button
                            className={`btn btn-ghost${refreshing ? " spinning" : ""}`}
                            onClick={() => fetchDataBerita(true)}
                            title="Refresh data"
                        >
                            <RefreshCw size={13} /> Refresh
                        </button>
                        <Link href="/data-berita" className="btn btn-ghost">
                            Lihat semua <SquareArrowOutUpRight size={13} />
                        </Link>
                        <Link href="/berita" className="btn btn-fill">
                            <Plus size={14} /> Tambah berita
                        </Link>
                    </div>
                </div>

                {/* ── TABLE ── */}
                <div className="ledger-table-wrap">
                    <table className="ledger-table">
                        <thead>
                            <tr>
                                <th style={{ width: "2.5rem" }}>No.</th>
                                <th>Judul</th>
                                <th>Tipe</th>
                                <th>Bahasa</th>
                                <th>Penulis</th>
                                <th>Tanggal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i}>
                                        <td><div className="row-skel" style={{ width: "1.2rem" }} /></td>
                                        <td><div className="row-skel" style={{ width: "70%" }} /></td>
                                        <td><div className="row-skel" style={{ width: "50px" }} /></td>
                                        <td><div className="row-skel" style={{ width: "40px" }} /></td>
                                        <td><div className="row-skel" style={{ width: "80px" }} /></td>
                                        <td><div className="row-skel" style={{ width: "90px" }} /></td>
                                    </tr>
                                ))
                            ) : dataBerita.length === 0 ? (
                                <tr>
                                    <td colSpan={6}>
                                        <div className="empty-state">
                                            <Newspaper size={36} />
                                            <p>Belum ada berita yang dipublikasikan. Tambahkan artikel pertama untuk mulai mengisi feed.</p>
                                            <Link href="/berita" className="btn btn-fill" style={{ marginTop: ".25rem" }}>
                                                <Plus size={14} /> Tambah berita
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                dataBerita.map((berita, i) => (
                                    <tr key={berita._id}>
                                        <td className="row-index mono">{pad(i + 1)}</td>
                                        <td>
                                            <div className="news-title-cell">
                                                {berita.img_thunmnail ? (
                                                    <img
                                                        src={berita.img_thunmnail}
                                                        alt={berita.title}
                                                        className="news-thumb"
                                                    />
                                                ) : (
                                                    <div className="news-thumb-placeholder">
                                                        <Newspaper size={13} />
                                                    </div>
                                                )}
                                                <span className="news-title-text" title={berita.title}>
                                                    {berita.title}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="type-tag">{berita.type || "—"}</span>
                                        </td>
                                        <td className="lang-cell">
                                            {berita.language?.toUpperCase() || "—"}
                                        </td>
                                        <td>{berita.relation?.author || berita.author || "—"}</td>
                                        <td className="date-cell mono">
                                            {formatDate(berita.times?.createdAt)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: ".4rem", marginTop: ".9rem", fontSize: ".72rem", color: "var(--ink-soft)" }}>
                    <Clock3 size={12} />
                    Data diperbarui otomatis setiap kali halaman dimuat.
                </div>

            </div>
        </>
    )
} 