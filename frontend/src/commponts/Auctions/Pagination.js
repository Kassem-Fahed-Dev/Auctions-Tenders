import { usePagination } from "./PaginationContext";

export default function Pagination({ pos }) {
  const { currentPage, setCurrentPage } = usePagination();

  const goNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const goPrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className={`pagination pag ${pos=='alluser'?'pagin':pos=='wallet'?'paginwallet':''}`}>
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={goPrev} disabled={currentPage === 1}>
            &laquo;
          </button>
        </li>

        <li className="page-item active">
          <span className="page-link">{currentPage}</span>
        </li>

        <li className="page-item">
          <button className="page-link" onClick={goNext}>
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
}
