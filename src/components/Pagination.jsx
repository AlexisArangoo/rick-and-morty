import { useEffect, useState } from "react";
import './styles/Pagination.css'

const Pagination = ({
  characterPerPage,
  currentPage,
  setCurrentPage,
  totalcharacter,
}) => {

  const [disabledNext, setDisabledNext] = useState(false)
  const [disabledPrevious, setdisabledPrevious] = useState(false)

  const pageNumbers = [];
  
  for (let i = 1; i <= Math.ceil(totalcharacter / characterPerPage); i++) {
    pageNumbers.push(i);
  }
  const [visiblePageNumbers, setVisiblePageNumbers] = useState(pageNumbers.slice(0, 5));


  const onPreviousPage = ()=> {
    const previousPage = currentPage - 1;
  if (!visiblePageNumbers.includes(previousPage) && previousPage > 0) {
    const startIndex = pageNumbers.indexOf(previousPage);
    setVisiblePageNumbers(pageNumbers.slice(startIndex, startIndex + 5));
  }
  setCurrentPage(previousPage);
  }

  const onNextPage = ()=> {
    const nextPage = currentPage + 1;
  if (!visiblePageNumbers.includes(nextPage) && nextPage <= pageNumbers.length) {
    const startIndex = pageNumbers.indexOf(nextPage) - 4;
    setVisiblePageNumbers(pageNumbers.slice(startIndex, startIndex + 5));
  }
  setCurrentPage(nextPage);
  }

  const onSpecifiPage = (x) => {
    setCurrentPage(x)
  }

  useEffect(() => {
    if (currentPage >= pageNumbers.length) {
        setDisabledNext(true)
    }else(
        setDisabledNext(false)
    )

    if (currentPage === 1) {
        setdisabledPrevious(true)
    } else {
        setdisabledPrevious(false)
    }
  }, [currentPage])    
  
  return (
    <nav
      className="pagination is-centered is-rounded"
      role="navigation"
      aria-label="pagination"
    >
      <button className='pagination-previous btn' disabled={disabledPrevious} onClick={onPreviousPage}>Previous</button>
      <button className='pagination-next btn' disabled={disabledNext} onClick={onNextPage}>Next page</button>
      <ul className="pagination-list">
        {visiblePageNumbers.map((numPage) => (
          <li key={numPage}>
            <a className={`pagination-link ${numPage === currentPage ? 'is-current' : ''}`} onClick={()=> onSpecifiPage(numPage)}>{numPage}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
