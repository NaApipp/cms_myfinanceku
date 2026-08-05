"use client";

import { useEffect, useState } from "react";

export default function DataAdmin() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

//   Fetching API User
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/user_admin");
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  return (
    <div className="ledger-table-wrap">
      <table className="ledger-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th style={{ textAlign: "right" }}>Platform Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id || user.email}>
              <td className="mono" style={{ fontWeight: 500 }}>{user.username}</td>
              <td style={{ color: "var(--ink-soft)" }}>{user.email}</td>
              <td style={{ textAlign: "right" }}>
                <span className="role-tag">{user.platform_role || "—"}</span>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", color: "var(--ink-soft)", padding: "3rem 1rem" }}>
                Belum ada data admin yang terdaftar.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}