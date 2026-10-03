// interface SearchBarProps {
//   value: string;
//   onChange: (value: string) => void;
//   placeholder?: string;
// }

// const SearchBar = ({
//   value,
//   onChange,
//   placeholder = "Search by name, member code, mobile, email, flat...",
// }: SearchBarProps) => {
//   return (
//     <div className="w-full">
//       <input
//         type="text"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         // className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
//         className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-blue-500"
//       />
//     </div>
//   );
// };

// export default SearchBar;

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search by name, member code, mobile, email, flat...",
}: SearchBarProps) => {
  return (
    <div className="w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
      />
    </div>
  );
};

export default SearchBar;