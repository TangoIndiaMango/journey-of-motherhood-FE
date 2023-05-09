"use client"; // Error components must be Client components

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  return (
    <html>
      <body>
        <div className="px-10 overflow-hidden py-10">
          <h2>Opps! Something went wrong!</h2>
          <div className="flex gap-4 ">
            {" "}
            <button
              className="px-5 py-2 w-[100px]"
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => router.push("/")
              }
            >
              Go Home
            </button>
            <button
              className="px-5 py-2 w-[100px]"
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
              }
            >
              Retry
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
