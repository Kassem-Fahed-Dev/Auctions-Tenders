// SortDropdown.jsx
import { useState, useRef, useEffect } from 'react';
import './Admin.css';

export default function SortDropdown() {
  const [open, setOpen] = useState(true);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpen(!open);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="dropdown-btn" onClick={toggleDropdown}>
        فرز حسب <span className="arrow">{open ? '▲' : '▼'}</span>
      </button>
      <ul className={`dropdown-menu ${open ? 'open' : ''}`}>
        <li>مقبول</li>
        <li>مرفوض</li>
        <li>مرفوع للطلب</li>
      </ul>
    </div>
  );
}
