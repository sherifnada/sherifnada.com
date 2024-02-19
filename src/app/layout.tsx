import type { Metadata } from "next";
import {karla, crimsonText} from "@/utils/fonts";
import "./globals.css";
import Link from "next/link";
import AutoRefresh from "./AutoRefresh";
import Image from "next/image";
import { FaXTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";


export const metadata: Metadata = {
  title: "Sherif Nada"
};


function Navbar(){
  return (
    <div className="no-style-links flex flex-row  inset-x-0 top-0 p-10">
      <div className="w-10 absolute justify-center">
        <Link href="/">
          <Image src="/me.png" alt="Sherif Nada" width={100} height={100} className="rounded-full"/>
        </Link>
      </div>
      <div className="text-5xl w-full text-center">
        <Link href="/">Sherif Nada</Link>
      </div>
      <div className="absolute top-0 right-0 flex flex-row [&>div]:text-xl [&>div]:py-12 [&>div]:px-5 pr-10">
        <div className="">
          <Link href="/about">About</Link> 
        </div>
        <div className="mt-1">
          <Link target="_blank" href="https://twitter.com/sheriffnothing">
            <FaXTwitter/>
          </Link>
        </div>
        <div className="mt-1">
          <Link target="_blank" href="https://github.com/sherifnada">
            <FaGithub/>
          </Link>
        </div>
        <div className="mt-1">
          <Link target="_blank" href="https://linkedin.com/in/shrif">
            <FaLinkedinIn/>
          </Link>
        </div>
        <div className="mt-1">
          <Link target="_blank" href="mailto:snadalive@gmail.com">
            <MdEmail/>
          </Link>
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
    <AutoRefresh>
      <html lang="en" className="dark">
        <body className={crimsonText.className}>
          <Navbar></Navbar>
          <div className="flex justify-center h-screen">
            <div className="flex flex-col p-10 min-w-[50%] max-w-[55%]">
              {children}  
            </div>
          </div>
        </body>
      </html>
    </AutoRefresh>
    
  );
}
