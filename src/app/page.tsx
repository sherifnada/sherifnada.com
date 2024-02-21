import { POSTS, Post } from "@/utils/contentService";
import { formatDate } from "@/utils/dates";
import Link from "next/link";

function Blog({posts}: {posts: {[key: string]: Post}}){
  return (
    <div className="no-style-links">
      {
      Object.values(POSTS)
      .sort((a, b) => a.metadata.createdDate > b.metadata.createdDate ? -1 : 1)
      .filter(post => !post.metadata.draft)
      .map((post) => {
        return (
          <div className="flex flex-row mb-10" key={post.metadata.key}>
            <div className="flex flex-col w-40 flex-shrink-0 flex-grow-0 overflow-hidden pt-1 pr-10">{formatDate(post.metadata.createdDate)}</div>
            <Link href={`/${post.metadata.key}`} key={post.metadata.title}>
              <div className="flex flex-col">
                <div className="text-3xl">{post.metadata.title}</div>
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
