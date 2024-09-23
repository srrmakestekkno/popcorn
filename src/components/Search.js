import { useRef } from "react";
import { useKey } from "../useKey";

/* stateful component */
const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);
  // ref will be added to the DOM element after the DOM has loaded
  // therefor useEffect should be used, since it runs after the DOM has been loaded

  useKey("Enter", () => {
    if (document.activeElement === inputEl.current) return;

    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};
export default Search;
