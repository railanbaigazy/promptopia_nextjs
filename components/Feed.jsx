"use client";

import {useEffect, useState} from "react";
import PromptCard from "@components/PromptCard";

const PromptCardList = ({data, handleTagClick}) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map(post => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
};

const Feed = () => {
    const [posts, setPosts] = useState([]);

    const [searchText, setSearchText] = useState('');
    const [searchedPosts, setSearchedPosts] = useState([]);
    const [searchTimeout, setSearchTimeout] = useState(null);

    const filterPrompts = (filterText) => {
        const regex = new RegExp(filterText, "i");
        return posts.filter(p => (
            regex.test(p.creator.username) || regex.test(p.prompt) || regex.test(p.tag)
        ));
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
        setSearchTimeout(
            setTimeout(() => {
                setSearchedPosts(filterPrompts(e.target.value));
            }, 500)
        );

    };

    const handleTagClick = (tagName) => {
        setSearchText(tagName);

        setSearchedPosts(filterPrompts(tagName));
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt', {cache: 'no-store'});
            const data = await response.json();
            setPosts(data);
        };

        fetchPosts();
    }, []);
    return (
        <section className="feed">
            <form name="search" className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or username"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>

            <PromptCardList
                data={searchText ? searchedPosts : posts}
                handleTagClick={handleTagClick}
            />

        </section>
    );
};

export default Feed;