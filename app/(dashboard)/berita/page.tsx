import FormBerita from "./FormBerita";

export default function Page() {
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
            margin-bottom: 2.25rem;
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

        /* ── STEPPER ── */
        .stepper-wrap {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            margin-bottom: 2.5rem;
            padding: 0 1rem;
            max-w: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        .stepper-line {
            position: absolute;
            left: 2rem;
            right: 2rem;
            top: 50%;
            height: 1px;
            background: var(--rule);
            z-index: 1;
            transform: translateY(-50%);
        }
        .stepper-line-active {
            position: absolute;
            left: 2rem;
            top: 50%;
            height: 1px;
            background: var(--ledger);
            z-index: 2;
            transform: translateY(-50%);
            transition: width .3s ease;
        }
        .step-node {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            z-index: 3;
            background: var(--paper);
            padding: 0 .5rem;
        }
        .step-circle {
            width: 2rem;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid var(--rule);
            background: var(--paper-raised);
            font-size: .85rem;
            font-weight: 600;
            color: var(--ink-soft);
            transition: all .3s;
        }
        .step-node.active .step-circle {
            border-color: var(--ledger);
            background: var(--ledger);
            color: var(--paper-raised);
        }
        .step-label {
            font-size: .7rem;
            text-transform: uppercase;
            letter-spacing: .05em;
            color: var(--ink-soft);
            margin-top: .4rem;
            font-weight: 600;
            display: none;
        }
        @media (min-width: 640px) {
            .step-label {
                display: block;
            }
        }
        .step-node.active .step-label {
            color: var(--ledger);
        }

        /* ── FORM CARD ── */
        .form-card {
            background: var(--paper-raised);
            border: 1px solid var(--rule);
            padding: 2rem;
            max-w: 800px;
            margin: 0 auto;
        }
        .form-section-title {
            font-size: 1.1rem;
            font-weight: 600;
            margin: 0 0 1.5rem;
            padding-bottom: .5rem;
            border-bottom: 1px solid var(--rule);
        }
        
        /* ── INPUTS ── */
        .field-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.25rem;
            margin-bottom: 1.25rem;
        }
        @media (min-width: 640px) {
            .field-grid {
                grid-template-columns: 1fr 1fr;
            }
        }
        .field-group {
            margin-bottom: 1.25rem;
        }
        .field-label {
            font-size: .7rem;
            text-transform: uppercase;
            letter-spacing: .08em;
            color: var(--ink-soft);
            margin-bottom: .4rem;
            display: block;
            font-weight: 600;
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
        
        /* ── BUTTONS ── */
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
        
        .button-row {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--rule);
        }
        .button-row button {
            flex: 1;
        }

        .alert-box {
            display: flex;
            align-items: center;
            gap: .6rem;
            padding: .8rem 1rem;
            font-size: .82rem;
            margin-bottom: 1.5rem;
            border: 1px solid var(--rule);
        }
        .alert-success {
            border-color: var(--ledger);
            color: var(--ledger);
            background: var(--ledger-soft);
        }
        .alert-error {
            border-color: var(--rust);
            color: var(--rust);
            background: #fff5f5;
        }
        @media (prefers-color-scheme: dark) {
            .alert-error {
                background: #2c1a1a;
            }
        }
      `}</style>
      <div className="dash-root">
        <div className="masthead">
          <div>
            <p className="masthead-eyebrow">CMS · MyFinanceKu</p>
            <h1>Tambah <span className="accent">Berita Baru</span></h1>
          </div>
        </div>
        <FormBerita />
      </div>
    </>
  );
}
