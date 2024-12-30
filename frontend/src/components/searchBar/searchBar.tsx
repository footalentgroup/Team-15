import { FC, useState, KeyboardEvent } from "react";

const SearchBar: FC = () => {
    const [query, setQuery] = useState<string>("");

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            console.log("Buscar (Enter):", query);
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
                className="border pl-10 pr-4 py-2 rounded-md focus:outline-none font-medium filter drop-shadow-[4px_4px_0px_#000000] w-96"
            />
            <i className="fa-solid fa-magnifying-glass absolute left-4 text-black text-sm"></i>
        </div>
    );
};

export default SearchBar;
