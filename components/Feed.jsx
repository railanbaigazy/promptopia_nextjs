"use client";

import {useEffect, useState} from "react";
import PromptCardList from "@components/PromptCardList";

const Feed = (allPosts) => {
    const [posts, setPosts] = useState(allPosts.allPosts);
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