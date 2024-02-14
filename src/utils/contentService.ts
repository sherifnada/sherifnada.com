import matter from 'gray-matter';
import {readFileSync, readdirSync } from 'fs';

interface Post {
    metadata: {
        key: string,
        title: string,
        createdDate: Date,
        description: string,
        tags: string[]
    },
    content: string
}


const listAllMarkdownFiles = () => {
    // todo figure out how we're going to handle images
    return readdirSync('./content').filter(file => file.endsWith('.md'));
}
// TODO validate that the schema of data is the same as the post type
const parseMarkdown = (fileName:string, markdown: string): Post => {
    const { data, content } = matter(markdown);
    data.createdDate = new Date(data.createdDate);
    data.key = fileName.replace('.md', '');
    return { metadata: data, content } as Post;
}

const getAllPosts = () => {
    const keyToPost: {[key: string]: Post} = {};
    for (let fileName of listAllMarkdownFiles()){
        const markdown = readFileSync('./content/' + fileName, 'utf-8');
        const post = parseMarkdown(fileName, markdown);
        keyToPost[post.metadata.key] = post;
    }
    return keyToPost
};

const POSTS = getAllPosts();

export type {Post};
export {POSTS};

