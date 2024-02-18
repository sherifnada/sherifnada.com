import { POSTS } from "@/utils/contentService";
import { MDXRemote } from 'next-mdx-remote/rsc'

export default function Page({params} : {params: {post: string}}) {
    const post = POSTS[params.post];

    return (
        <div className="">
            <div className="pb-20 prose">
                <MDXRemote source={post.content} />
            </div>
        </div>
    );   
}

export function generateStaticParams(){
    return Object.keys(POSTS).map(p => {post: p});
}