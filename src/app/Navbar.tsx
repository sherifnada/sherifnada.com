'use client';

import Link from "next/link";
import Image from "next/image";
import { FaXTwitter, FaRss } from "react-icons/fa6";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <div className="justify-center lg:justify-normal no-style-links flex flex-col lg:flex-row  inset-x-0 top-0 p-10">
      <div className="flex justify-center lg:justify-normal lg:absolute mb-5 ">
        <Link className="w-20 lg:w-12" href="/">
          <Image src="/me.png" alt="Sherif Nada" width="100" height="100" className="rounded-full"/>
        </Link>
      </div>
      <div className="text-5xl w-full text-center">
        <Link href="/">Sherif Nada</Link>
      </div>
      <div className="text-center justify-center lg:absolute lg:top-0 lg:right-0 flex flex-row [&>div]:text-xl [&>div]:py-3 lg:[&>div]:py-12 [&>div]:px-5 lg:pr-10 items-center">
        <div>
          <Link href="/about">About</Link> 
        </div>
        <div>
          <Link href="/newsletter">Newsletter</Link> 
        </div>
        <div className="mt-1">
          <Link target="_blank" href="https://twitter.com/sheriffnothing">
            <FaXTwitter/>
          </Link>
        </div>
        <div className="mt-1">
          <Link target="_blank" href="/rss.xml">
            <FaRss/>
          </Link>
        </div>
        <div className="mt-1">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}