"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [count, setCount] = useState(0);
  const USER_ID = "1.1.1.1";

  // Auto-increment counter
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Save count when page is about to unload using sendBeacon
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const data = {
        parameter: count,
        user_id: USER_ID,
      };

      const blob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });

      navigator.sendBeacon("/api/post", blob);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [count]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg bg-white dark:bg-black/[.1] shadow-sm">
          <p className="text-4xl font-bold">{count}</p>
          <p className="text-sm text-gray-500">Auto-incrementing counter</p>
          <p className="text-sm text-gray-500">User ID: {USER_ID}</p>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/sign-up"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Sign Up
        </a>
      </footer>
    </div>
  );
}
