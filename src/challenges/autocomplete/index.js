import { useState, useEffect, } from "react";

import { useLazySearchGithubUsersQuery } from "../../app/api";

export const AutoComplete = () => {
  const [queryText, setQueryText] = useState("");
  const [
    triggerGithubSearch,
    {
      currentData: githubSearchData,
      isLoading: isGithubSearchLoading,
      isFetching: isGithubSearchFetching,
      error: githubSearchError,
    },
  ] = useLazySearchGithubUsersQuery();

  useEffect(() => {
    if (!queryText) return;
    // use debounce logic to make calls only after 1s of inactivity (typing stopped)
    const timerId = setTimeout(() => {
      triggerGithubSearch(queryText);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [queryText, triggerGithubSearch]);

  const handleQueryChange = (value) => {
    setQueryText(value);
  };

  const handleSearchClick = async () => {
    if (!queryText) return;
    triggerGithubSearch(queryText);
  };

  return (
    <div className="m-4">
      <p className="font-bold underline">Auto-Complete/TypeAhead</p>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="gsearch"
            className="block mb-2 mt-4 text-sm text-gray-900 dark:text-red-600"
          >
            Search Github usernames:
          </label>
          <input
            autoFocus
            type="text"
            id="gsearch"
            name="gsearch"
            value={queryText}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Start typing..."
            className="focus bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />

          <div className="border">
            {githubSearchData?.items?.map((user) => (
              <a
                key={user.id}
                target="_blank"
                rel="noreferrer"
                href={`https://github.com/${user.login}`}
                alt={`Github profile link of ${user.login}`}
              >
                <div className="p-2 border-b hover:bg-gray-100 rounded-lg">
                  {user.login}
                </div>
              </a>
            ))}
            {(isGithubSearchLoading || isGithubSearchFetching) && (
              <p>Loading...</p>
            )}
            {githubSearchError && (
              <p className="text-red-500">Error: {githubSearchError.error}</p>
            )}
          </div>
        </div>
        <div>
          <button
            type="button"
            disabled={isGithubSearchLoading}
            className="p-2.5 px-5 mt-11 bg-green-200 hover:bg-green-400 disabled:bg-slate-200"
            onClick={handleSearchClick}
          >
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
};
