"use server";

export const fetchAllPosts = async () => {
    const response = await fetch("https://promptopia-nextjs-xi.vercel.app/api/prompt");
    const data = await response.json();
    return data;
};