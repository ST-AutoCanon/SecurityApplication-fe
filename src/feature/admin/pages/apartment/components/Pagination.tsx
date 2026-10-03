// interface PaginationProps {
//   currentPage: number;
//   totalItems: number;
//   pageSize: number;
//   onPageChange: (page: number) => void;
// }

// const Pagination = ({
//   currentPage,
//   totalItems,
//   pageSize,
//   onPageChange,
// }: PaginationProps) => {
//   const totalPages = Math.ceil(totalItems / pageSize);

//   if (totalPages <= 1) return null;

//   return (
//     <div className="flex items-center justify-between">
//       <p className="text-sm text-gray-600">
//         Page {currentPage} of {totalPages}
//       </p>

//       <div className="flex items-center gap-2">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => onPageChange(currentPage - 1)}
//           className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
//         >
//           Previous
//         </button>

//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index + 1}
//             onClick={() => onPageChange(index + 1)}
//             className={`rounded-lg px-4 py-2 ${
//               currentPage === index + 1 ? "bg-indigo-600 text-white" : "border"
//             }`}
//           >
//             {index + 1}
//           </button>
//         ))}

//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => onPageChange(currentPage + 1)}
//           className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col gap-4 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Page Information */}
      <p className="text-sm text-gray-600">
        Page <span className="font-medium text-gray-900">{currentPage}</span> of{" "}
        <span className="font-medium text-gray-900">{totalPages}</span>
      </p>

      {/* Pagination */}
      <div className="flex items-center gap-2">
        {/* Previous */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="h-9 rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          const isActive = currentPage === page;

          return (
            <button
              type="button"
              key={page}
              onClick={() => onPageChange(page)}
              aria-current={isActive ? "page" : undefined}
              className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          );
        })}

        {/* Next */}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="h-9 rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;