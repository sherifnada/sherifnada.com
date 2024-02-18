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
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                style={vs}
            />
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
            className="markdown prose"
            children={post.content}
            remarkPlugins={[remarkGfm]}
            components={{
                code(props){
                    return CodeBlock(props);
                }
            }}
        >
        </Markdown>
    )
}