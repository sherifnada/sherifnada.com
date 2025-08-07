import { generateFeed } from "@/utils/feed";
import { POSTS } from "@/utils/contentService"; 
import { metadata } from "../layout";

export const dynamic = 'force-static'; // Cache the RSS feed

export function GET(){
    const feed = generateFeed(POSTS, metadata)
    return new Response(feed.rss2());
}
