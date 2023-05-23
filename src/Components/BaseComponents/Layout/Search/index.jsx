import { useState } from "react";
import { search } from "../../../../API/SearchApi";
import { useUser } from "../../../../Context/UserContext/UserContext";
import { SlMagnifier } from "react-icons/sl";
import { Typography } from "../../Typography";

export const Search = () => {
    /* const {
        user: { _id },
      } = useUser(); */

    const [searchResults, setSearchResults] = useState({
        gifa: [],
        memes: []
    });

    const [searchInput, setSearchInput] = useState("");

    const handleSearch = async (query) => {
        const res = await search(query, _id);
        if (res.ok) {
            setSearchResults({ ...res.results });
        }
    };

    const handleChange = (e) => {
        setSearchInput(e.target.value);
        if (e.target.value.length >= 3) {
            handleSearch(e.target.value);
        }
    };

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Type at least three characters to start the search"
                value={searchInput}
                className="rounded-3xl py-2 px-8 w-full"
                onChange={(e) => handleChange(e)}
            />
            <div>
                <Typography
                    text={<SlMagnifier />}
                    type="p1"
                    color="black"
                    styles="absolute top-[25%] right-5 cursor-pointer"
                />
            </div>
        </div>
    )
}
