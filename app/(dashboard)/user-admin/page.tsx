import AddUser from "./components/AddUser";
import DataAdmin from "./components/DataAdmin";

export default function UserAdminPage() {
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

        .layout-grid {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }
        @media (min-width: 1024px) {
            .layout-grid {
                flex-direction: row;
                align-items: flex-start;
            }
            .sidebar-form {
                width: 340px;
                flex-shrink: 0;
                position: sticky;
                top: 2rem;
            }
            .main-content {
                flex-grow: 1;
            }
        }

        /* Form & Inputs */
        .form-card {
            background: var(--paper-raised);
            border: 1px solid var(--rule);
            padding: 1.75rem;
        }
        .form-title {
            font-size: 1.1rem;
            font-weight: 600;
            margin: .5rem 0 .25rem;
        }
        .field-group {
            margin-bottom: 1.1rem;
            width: 100%;
        }
        .field-label {
            font-size: .7rem;
            text-transform: uppercase;
            letter-spacing: .08em;
            color: var(--ink-soft);
            margin-bottom: .4rem;
            display: block;
            font-weight: 600;
            text-align: left;
        }
        .input-field {
            width: 100%;
            padding: .6rem .8rem;
            font-size: .85rem;
            background: var(--paper);
            border: 1px solid var(--rule);
            color: var(--ink);
            outline: none;
            transition: border-color .15s;
        }
        .input-field:focus {
            border-color: var(--ink);
        }
        
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: .4rem;
            padding: .6rem 1.2rem;
            font-size: .8rem;
            font-weight: 600;
            text-decoration: none;
            cursor: pointer;
            border: 1px solid var(--ink);
            background: transparent;
            color: var(--ink);
            transition: background .15s, color .15s;
            width: 100%;
        }
        .btn:hover { background: var(--ink); color: var(--paper); }
        .btn-fill {
            background: var(--ledger);
            border-color: var(--ledger);
            color: var(--paper-raised);
        }
        .btn-fill:hover { background: var(--ink); border-color: var(--ink); }

        /* Tables */
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
        .ledger-table td {
            padding: .8rem 1.1rem;
            border-bottom: 1px solid var(--rule);
            vertical-align: middle;
        }
        .ledger-table tbody tr:last-child td { border-bottom: none; }
        .ledger-table tbody tr:hover { background: var(--ledger-soft); }
        .role-tag {
            font-size: .7rem;
            font-weight: 600;
            letter-spacing: .03em;
            color: var(--ledger);
            border: 1px solid var(--ledger);
            padding: .12rem .5rem;
            white-space: nowrap;
            display: inline-block;
        }
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
      `}</style>
      <div className="dash-root">
        <div className="masthead">
          <div>
            <p className="masthead-eyebrow">CMS · MyFinanceKu</p>
            <h1>Manajemen <span className="accent">User Admin</span></h1>
          </div>
        </div>
        <div className="layout-grid">
          <div className="sidebar-form">
            <AddUser />
          </div>
          <div className="main-content">
            <DataAdmin />
          </div>
        </div>
      </div>
    </>
  );
}