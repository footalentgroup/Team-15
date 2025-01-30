import { FC, useState, KeyboardEvent } from "react";

const SearchBar: FC = () => {
    const [query, setQuery] = useState<string>("");

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            // API
        }
    };

    return (
        <div className="relative flex items-center">
            <input
                type="text"
                placeholder="Buscar"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleKeyDown}
                className="border pl-10 pr-4 py-2 rounded-md focus:outline-none font-medium filter drop-shadow-general w-96 h-[48px]"
            />
            <i className="fa-solid fa-magnifying-glass absolute left-4 text-black text-sm"></i>
        </div>
    );
};

export default SearchBar;
