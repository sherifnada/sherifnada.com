import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const html = fs.readFileSync(
    path.join(process.cwd(), "src", "app", "gridtool", "grid.html"),
    "utf-8",
  );
  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}
