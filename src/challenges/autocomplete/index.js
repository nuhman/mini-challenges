export const AutoComplete = () => {
  return (
    <div className="m-4">
      <p className="font-bold underline">Auto-Complete/TypeAhead</p>
      <div className="grid md:grid-cols-2">
        <div>
          <label
            htmlFor="gsearch"
            className="block mb-2 mt-4 text-sm text-gray-900 dark:text-red-600"
          >
            Start typing to search for github usernames
          </label>
          <input
            type="text"
            id="gsearch"
            name="gsearch"
            className="bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
      </div>
    </div>
  );
};
