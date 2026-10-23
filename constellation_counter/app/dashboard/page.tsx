"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [count] = useState(0);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 text-center shadow-md">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <div className="rounded-lg bg-blue-50 p-6">
          <p className="mb-2 text-sm font-medium text-gray-500">
            Visitor Count
          </p>

          <p className="text-6xl font-bold text-blue-600">
            {count}
          </p>
        </div>
      </div>
    </main>
  );
}
