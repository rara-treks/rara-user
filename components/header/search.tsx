import { IconSearch } from "@tabler/icons-react";

const Search = () => {
  return (
    <div className="flex w-[600px] justify-center items-center">
      <div className="w-full flex items-center  border border-gray-300 rounded-full h-10 px-4 gap-3">
        <input
          type="text"
          placeholder="Choose your destination..."
          className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
        />
        <IconSearch size={20} className="text-gray-400 flex-shrink-0" />
      </div>
    </div>
  );
}
export default Search