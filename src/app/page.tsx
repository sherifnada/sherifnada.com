import Image from "next/image";
import { POSTS, Post } from "@/utils/contentService";
import Link from "next/link";
import { karla } from "@/utils/fonts";

function getDaySuffix(day: number) {
  if (day > 3 && day < 21) return 'th'; // handles special cases like 11th, 12th, 13th
  switch (day % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
  }
}


function formatDate(date: Date) {
  // Array of month names to convert month from number to name
  const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
  ];

  const day = date.getDate(); // Get day of the month
  const monthIndex = date.getMonth(); // Get month (0-based index)
  const year = date.getFullYear();
  const suffix = getDaySuffix(day);

  // Format the date string as "Month, Day, Year"
  return `${monthNames[monthIndex]} ${day}${suffix}, ${year}`;
}


function Blog({posts}: {posts: {[key: string]: Post}}){
  return (
    <div className="no-style-links">
      {
      Object.values(POSTS)
      .sort((a, b) => a.metadata.createdDate > b.metadata.createdDate ? -1 : 1)
      .map((post) => {
        return (
          <div className="flex flex-row mb-10" key={post.metadata.key}>
            <div className="flex flex-col w-40 flex-shrink-0 flex-grow-0 overflow-hidden pr-10">{formatDate(post.metadata.createdDate)}</div>
            <Link href={`/${post.metadata.key}`} key={post.metadata.title}>
              <div className="flex flex-col">
                <div className="text-2xl font-semibold">{post.metadata.title}</div>
                <div className="my-3">{post.metadata.description}</div>
              </div>        
            </Link>
          </div>
        )
      })}
    </div>
  )

}

export default function Home() {
  return (
    <>
      <Blog posts={POSTS}></Blog>
    </>
    
  )
}
