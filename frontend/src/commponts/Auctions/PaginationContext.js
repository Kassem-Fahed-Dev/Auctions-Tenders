// PaginationContext.jsx
import { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
const PaginationContext = createContext();

export function PaginationProvider({ children }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // ثابت
const location = useLocation();
const hh=localStorage.getItem('current')
const hh2=localStorage.getItem('current1')
useEffect(() => {
  const hh1=['/det','/det-tender']
  if(!hh1.some(path=>location.pathname.includes(path))){  if(hh>0){
    setCurrentPage(Number(hh))
    localStorage.setItem('current',0)
  } else if(hh2>0){
    setCurrentPage(Number(hh2))
    console.log('jjj')
    localStorage.setItem('current1',0)
  }else{
    setCurrentPage(1)
  }}

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
