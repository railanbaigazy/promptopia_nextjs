"use client";

import {useEffect, useState} from "react";
import PromptCard from "./PromptCard";

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

    const fetchPosts = async () => {
        const response = await fetch("/api/prompt");
        const data = await response.json();
        console.log(data);
        setPosts(data);
    };

    useEffect(() => {
        fetchPosts();
        console.log("effect used");
    }, []);

    const filterPrompts = (filterText) => {
        const regex = new RegExp(filterText, "i");
        return posts.filter(p => (
            regex.test(p.creator.username) || regex.test(p.prompt) || regex.test(p.tag)
        ));
    };

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPrompts(e.target.value);
                setSearchedPosts(searchResult);
            }, 500)
        );

    };

    const handleTagClick = (tagName) => {
        setSearchText(tagName);

        const searchResult = filterPrompts(tagName);

        setSearchedPosts(searchResult);
    };

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

            {searchText ? (
                <PromptCardList
                    data={searchedPosts}
                    handleTagClick={handleTagClick}
                />
            ) : (
                <PromptCardList data={posts} handleTagClick={handleTagClick} />
            )}

        </section>
    );
};

export default Feed;