import "./globals.css";

import "react-quill/dist/quill.snow.css";

export const metadata = {
  title: "Motherhood-Journey ",
  description: "An a experience of Motherhood Journey ",
  icons: {
    icon: "/bg-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[var(--bgColor)] relative">{children}</body>
    </html>
  );
}
