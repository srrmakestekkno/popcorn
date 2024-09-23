import { useEffect, useRef } from "react";

/* stateful component */
const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);
  // ref will be added to the DOM element after the DOM has loaded
  // therefor useEffect should be used, since it runs after the DOM has been loaded
  useEffect(() => {
    // equal to the commented out code below this
    inputEl.current.focus();
  });
  // useEffect(() => {
  //   const el = document.querySelector(".search");
  //   el.focus();
  // }, []);
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
