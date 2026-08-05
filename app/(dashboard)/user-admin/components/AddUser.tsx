"use client";

import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function AddUser() {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);


  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    platform_role: "",
  });

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if(!res.ok){
        throw new Error(data.message || "Gagal menambahkan admin");
      }

      setMessage({
        type: "success",
        text: "Admin berhasil ditambahkan",
      });
      setFormData({
        username: "",
        email: "",
        password: "",
        platform_role: "",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message,
      });
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <form onSubmit={handleAddUser} className="form-card">
      <div className="flex flex-col items-center justify-center gap-2 mb-6 text-center">
        <img src="https://myfinanceku.vercel.app/icon/logo.png" alt="Logo" width={40} height={40} />
        <h2 className="form-title" style={{ border: "none", marginBottom: 0, paddingBottom: 0 }}>Tambah User Admin</h2>
        <span style={{ fontSize: ".75rem", color: "var(--ink-soft)" }}>
          Masukkan data user admin yang ingin ditambahkan
        </span>
      </div>
      
      {/* Username */}
      <div className="field-group">
        <label className="field-label">Username</label>
        <input
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          placeholder="Username"
          className="input-field"
          required
        />
      </div>

      {/* Email */}
      <div className="field-group">
        <label className="field-label">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          placeholder="email@example.com"
          className="input-field"
          required
        />
      </div>
      
      {/* platform role */}
      <div className="field-group">
        <label className="field-label">Platform Role</label>
        <select
          value={formData.platform_role}
          onChange={(e) =>
            setFormData({ ...formData, platform_role: e.target.value })
          }
          className="input-field"
          required
        >
          <option value="">Select Platform Role</option>
          <option value="admin_cms">Admin CMS</option>
          <option value="admin_finpay">Admin Finpay</option>
        </select>
      </div>

      {/* Password */}
      <div className="field-group" style={{ marginBottom: "1.5rem" }}>
        <label className="field-label">Password</label>
        <div className="relative">
          <input
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="••••••••"
            type={showPassword ? "text" : "password"}
            required
            className="input-field"
            style={{ paddingRight: "2.5rem" }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
            style={{ border: "none", background: "none", cursor: "pointer" }}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {message && (
        <div className="error-box" style={{ 
          borderColor: message.type === "success" ? "var(--ledger)" : "var(--rust)",
          color: message.type === "success" ? "var(--ledger)" : "var(--rust)",
          marginBottom: "1rem",
          fontSize: ".75rem",
          padding: ".6rem"
        }}>
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn btn-fill"
      >
        {loading ? "Memproses..." : "Tambah User Admin"}
      </button>
    </form>
  );
}