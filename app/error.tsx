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
        <div className="my-10">
          <h2>Opps! Something went wrong!</h2>
          <button
            className="px-10 py-2"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => router.push("/")
            }
          >
            Go Home
          </button>
        </div>
      </body>
    </html>
  );
}
