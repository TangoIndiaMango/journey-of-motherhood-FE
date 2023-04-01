import { TokenProvider } from "@/services/state/TokenProvider";
import UserProvider from "@/services/state/useUser";
import "antd/dist/reset.css";

export const metadata = {
  title: "Motherhood-Journey Login Page",
  description: "An a experience of Motherhood Journey",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TokenProvider>
      <UserProvider>
        <main className="h-screen w-full">{children}</main>
      </UserProvider>
    </TokenProvider>
  );
}
