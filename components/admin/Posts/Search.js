import React from "react";

export default function Search({ placeholder, searchPost, setSearchPost }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={searchPost}
      onChange={(e) => setSearchPost(e.target.value)}
    />
  );
}
