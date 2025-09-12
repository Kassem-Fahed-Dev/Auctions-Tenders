// PaginationContext.jsx
import { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
const PaginationContext = createContext();

export function PaginationProvider({ children }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // ثابت
const location = useLocation();

useEffect(() => {
  setCurrentPage(1);
}, [location.pathname])
  return (
    <PaginationContext.Provider value={{ currentPage, setCurrentPage, itemsPerPage }}>
      {children}
    </PaginationContext.Provider>
  );
}

export function usePagination() {
  return useContext(PaginationContext);
}
