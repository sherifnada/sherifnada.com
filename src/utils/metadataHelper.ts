import { Metadata } from "next";

function createPageMetadata(title: string, description: string, url: string, image: string[]): Metadata{
    return {
        title: title,
        description: description,
        robots: {
          index: true,
          follow: true
        },
        openGraph: {
          title: title,
          description: description, 
          type: "article", 
          url: url, 
          images: image,
        },
        twitter: {
          card: "summary",
          title: title,
          description: description,
          images: image,
        }
    }
}

export {createPageMetadata};