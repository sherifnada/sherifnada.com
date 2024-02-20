import matter from 'gray-matter';
import {readFileSync, readdirSync } from 'fs';

interface Post {
    metadata: {
        key: string,
        title: string,
        createdDate: Date,
        description: string,
        draft: boolean,
        tags: string[]
    },
    content: string
}


const listAllDirectories = () => {
    const items = readdirSync("./public", { withFileTypes: true });
    // Filter out and return only directories
    return items.filter(item => item.isDirectory()).map(dir => dir.name);
}

// TODO validate that the schema of data is the same as the post type
const parseMarkdown = (fileName: string, markdown: string): Post => {
    const { data, content } = matter(markdown);
    data.createdDate = new Date(data.createdDate);
    data.key = fileName.replace('.md', '');
    return { metadata: data, content } as Post;
}

const getAllPosts = () => {
    const keyToPost: {[key: string]: Post} = {};
    for (let dirName of listAllDirectories()){
        const markdown = readFileSync(`./public/${dirName}/index.md`, 'utf-8');
        const post = parseMarkdown(dirName, markdown);
        keyToPost[post.metadata.key] = post;
    }
    return keyToPost
};

const POSTS = getAllPosts();

export type {Post};
export {POSTS, getAllPosts};

