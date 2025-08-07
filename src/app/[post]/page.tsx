import { POSTS } from "@/utils/contentService";
import { formatDate } from "@/utils/dates";
import Markdown from "react-markdown";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {vscDarkPlus} from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { createPageMetadata } from "@/utils/metadataHelper";
import './markdown.css'

import { Metadata} from "next/types";

type Props = {
    params: Promise<{ post: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

function getFirstParagraph(markdown: string): string {
    const paragraphs = markdown.split(/\n\n/);
    return paragraphs.length > 0 ? paragraphs[0] : markdown;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // read route params
    const { post: postKey } = await params;
    const post = POSTS[postKey];
    const postMetadata = post.metadata;
    const postTitle = postMetadata.title;
    const postDescription = getFirstParagraph(post.content);
    const postUrl = `https://sherifnada.com/${postMetadata.key}`;
    return createPageMetadata(postTitle, postDescription, postUrl);
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

export default async function Page({params} : {params: Promise<{post: string}>}) {
    const { post: postKey } = await params;
    const post = POSTS[postKey];
    return (
        <>
            <h1 className="text-5xl">{post.metadata.title}</h1>
            <em className="mt-2 mb-10">{formatDate(post.metadata.createdDate)}</em>
            <Markdown
                className={`prose dark:prose-invert markdown max-w-none w-full pb-40`}
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
                        return `/${postKey}/${url}`;
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