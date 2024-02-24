import { POSTS } from "@/utils/contentService";
import { formatDate } from "@/utils/dates";
import Markdown from "react-markdown";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {vscDarkPlus} from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import './markdown.css'

import { Metadata, ResolvingMetadata } from "next/types";

type Props = {
    params: { post: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

function getFirstParagraph(markdown: string): string {
    const paragraphs = markdown.split(/\n\n/);
    return paragraphs.length > 0 ? paragraphs[0] : markdown;
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // read route params
    const post = POSTS[params.post];
    const postMetadata = post.metadata;
    const postTitle = postMetadata.title;
    const postDescription = getFirstParagraph(post.content);
    const postUrl = `https://sherifnada.com/${postMetadata.key}`;
    const postImage = ['https://www.sherifnada.com/me.png'];
    return {
      title: postTitle,
      description: postDescription,
      robots: {
        index: true,
        follow: true
      },
      openGraph: {
        title: postTitle,
        description: postDescription, 
        type: "article", 
        url: postUrl, 
        images: postImage,
      },
      twitter: {
        card: "summary",
        title: postTitle,
        description: postDescription,
        images: postImage,
      }
    }
  }

const CodeBlock = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
    const {className, children, ref, ...rest} = props;
    const match = /language-(\w+)/.exec(className || '')
    if (match){
        return (<div>
            <SyntaxHighlighter
                {...rest}
                language={match[1]}
                style={vscDarkPlus}
                className="not-prose rounded-lg"
            > 
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        </div>)
    } else  {
        return <code className="not-prose" {...rest}>
            {children}
        </code>
    }
};

export default function Page({params} : {params: {post: string}}) {
    const post = POSTS[params.post];
    return (
        <>
            <h1 className="text-5xl">{post.metadata.title}</h1>
            <em className="mt-2 mb-10">{formatDate(post.metadata.createdDate)}</em>
            <Markdown
                className={`prose markdown max-w-none w-full pb-40`}
                remarkPlugins={[remarkGfm]}
                components={{
                    pre(props){
                        return (<div>{props.children}</div>)
                    },
                    code(props){
                        return CodeBlock(props);
                    }
                }}
                urlTransform={url => {
                    if (url.startsWith("http")){
                        return url;
                    } else {
                        return `/${params.post}/${url}`;
                    }
                }}
            >
                
                {post.content}
            </Markdown>
        </>
    )
}

export function generateStaticParams(){
    return Object.keys(POSTS).map(p => {return {post: p}});
}
export const dynamicParams = false