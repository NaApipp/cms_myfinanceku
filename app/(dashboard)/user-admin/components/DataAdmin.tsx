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
    <div>
      <div className="overflow-x-auto rounded-lg border border-lime-200 bg-white shadow-sm dark:border-lime-900/40 dark:bg-slate-900">
        <table className="min-w-full text-xs sm:text-sm">
          <thead className="bg-lime-50 text-lime-900 dark:bg-slate-800 dark:text-lime-200">
            <tr>
              <th className="hidden px-3 py-2.5 text-left font-semibold sm:table-cell md:px-4 md:py-3 lg:px-6 lg:py-3.5">
                Username
              </th>
              <th className="px-2 py-2 text-left font-semibold sm:px-3 sm:py-2.5 md:px-4 md:py-3 lg:px-6 lg:py-3.5">
                Email
              </th>
              <th className="px-2 py-2 text-left font-semibold sm:px-3 sm:py-2.5 md:px-4 md:py-3 lg:px-6 lg:py-3.5">
                Platform Role
              </th>
            </tr>
          </thead>

          {users.map((user) => (
            <tbody className="divide-y divide-lime-100 dark:divide-slate-800">
              <tr className="transition hover:bg-lime-50 dark:hover:bg-slate-800/70">
                
                <td className="hidden px-3 py-2.5 text-slate-600 dark:text-slate-400 sm:table-cell md:px-4 md:py-3 lg:px-6 lg:py-3.5">
                  {user.username}
                </td>
                <td className="px-2 py-2 text-slate-700 dark:text-slate-300 sm:px-3 sm:py-2.5 md:px-4 md:py-3 lg:px-6 lg:py-3.5">
                  <span className="inline-block rounded-full px-2 py-0.5 text-xs font-medium text-lime-800 dark:text-lime-300 sm:bg-transparent sm:px-0 sm:py-0 sm:font-normal sm:text-slate-700 sm:dark:text-slate-300">
                    {user.email}
                  </span>
                </td>
                <td className="px-2 py-2 text-right sm:px-3 sm:py-2.5 md:px-4 md:py-3 lg:px-6 lg:py-3.5">
                  <span className="inline-block rounded-full px-2 py-0.5 text-xs font-medium text-lime-800 dark:text-lime-300 sm:bg-transparent sm:px-0 sm:py-0 sm:font-normal sm:text-slate-700 sm:dark:text-slate-300">
                    {user.platform_role}
                  </span>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}