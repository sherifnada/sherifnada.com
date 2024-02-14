import type { Metadata } from "next";
import {karla} from "@/utils/fonts";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sherif Nada"
};


function Navbar(){
  return (
    <div className="flex flex-row  inset-x-0 top-0 p-10">
      <div>
        <Link href="/">Sherif</Link>
      </div>
      <div className="absolute top-0 right-0 flex flex-row [&>div]:py-10 [&>div]:px-5">
        <div>
          <Link href="/about">About</Link> 
        </div>
        <div>
          <Link href="contact">Contact</Link>
        </div>
      </div>
    </div>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={karla.className}>
        <Navbar></Navbar>
        <div className="flex justify-center h-screen">
          <div className="flex flex-col p-10 min-w-[50%]">
            {children}  
          </div>
        </div>
      </body>
    </html>
  );
}
