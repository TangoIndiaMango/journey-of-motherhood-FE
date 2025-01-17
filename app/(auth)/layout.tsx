import "../globals.css";

export const metadata = {
  title: "Motherhood-Journey ",
  description: "An a experience of Motherhood Journey Auth Page",
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
    <section className="bg-[var(--bgColor)] relative ">{children}</section>
  );
}
