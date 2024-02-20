import { POSTS } from "@/utils/contentService";
import Markdown from "react-markdown";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {vs} from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";

const CodeBlock = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
    const {className, children, ref, ...rest} = props;
    const match = /language-(\w+)/.exec(className || '')
    if (match){
        return (<div>
            <SyntaxHighlighter
                {...rest}
                language={match[1]}
                style={vs}
            > 
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        </div>)
    } else  {
        return <code {...rest}>
            {children}
        </code>
    }
};

export default function Page({params} : {params: {post: string}}) {
    const post = POSTS[params.post];
    return (
        <Markdown
            className={`prose max-w-none w-full `}
            remarkPlugins={[remarkGfm]}
            components={{
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