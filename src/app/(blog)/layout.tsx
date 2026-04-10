import { Navbar } from "../Navbar";
import { Analytics } from "@vercel/analytics/react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="flex justify-center h-screen">
        <div className="flex flex-col p-10 max-w-3xl">
          {children}
          <Analytics />
        </div>
      </div>
    </>
  );
}
