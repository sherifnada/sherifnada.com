import { POSTS } from "@/utils/contentService";
import Markdown from "react-markdown";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {vscDarkPlus} from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import './markdown.css'

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
    )
}

export function generateStaticParams(){
    return Object.keys(POSTS).map(p => {return {post: p}});
}
export const dynamicParams = false