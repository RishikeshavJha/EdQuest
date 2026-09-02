import { useState } from 'react';

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('');

  function submit(event) {
    event.preventDefault();
    const value = query.trim();
    if (value) onSearch(value);
  }

  return (
    <form className="search" onSubmit={submit}>
      <span className="search-icon">⌕</span>
      <input
        value={query}
        onChange={event => setQuery(event.target.value)}
        placeholder="Search a city, e.g. Pune"
        aria-label="Search city"
      />
      <button disabled={loading || !query.trim()} type="submit">
        {loading ? 'Loading…' : 'Search'}
      </button>
    </form>
  );
}