export default function Pagination({ currentPage, total, onPageChange }: {
    currentPage: number,
    total: number,
    onPageChange: (page: number) => void
  }) {
    const totalPages = Math.ceil(total / 10);
    if (totalPages <= 1) return null;
  
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    return (
      <div className="mt-6 flex justify-center space-x-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          >
            {page}
          </button>
        ))}
      </div>
    );
  }
  