import { Feed } from "feed";
import { Metadata } from "next";
import { Post, sortPostsDesc } from "./contentService";
import * as Showdown from 'showdown';

function generateFeed(posts: {[key: string] : Post}, metadata: Metadata ){
    const siteUrl = "https://sherifnada.com";

    const feed = new Feed({
        title: metadata.title as string,
        description: metadata.description as string,
        id: siteUrl,
        link: siteUrl,
        language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
        image: "https://github.com/sherifnada.png",
        favicon: `${siteUrl}/favicon.ico`,
        copyright: "All rights reserved 2024, Sherif Nada",
        feedLinks: {
            rss: `${siteUrl}/rss.xml`
        },
        author: {
          name: "Sherif Nada",
          email: "snadalive@gmail.com",
          link: siteUrl
        }
    });


    // just use a util lib to convert markdown to html instead of trying to get it from the react-markdown component
    const converter = new Showdown.Converter() 
    for (const post of sortPostsDesc(posts).filter(p => !p.metadata.draft)){
        const postUrl = `${siteUrl}/${post.metadata.key}`;
        feed.addItem({
            // TODO add post images 
            title: post.metadata.title,
            link: postUrl,
            guid: postUrl,
            date: post.metadata.createdDate,
            description: post.metadata.description,
            content: converter.makeHtml(post.content)
        })
    }

    return feed;
}


export {generateFeed};