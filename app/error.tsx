"use client"; // Error components must be Client components

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
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
  );
}
