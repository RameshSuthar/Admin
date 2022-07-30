import { usePagination } from "../../hooks/usePagination";
import './Pagination.css';

const Pagination = ({currentPage, totalCount, handleCurrentPageChange}) => {
    const paginationRange = usePagination({
        totalCount: totalCount,
        pageSize: 10, 
        currentPage: currentPage
    });

    const lastPage = paginationRange[paginationRange.length - 1];

    const handleOnClick = (e, nonNumberAction="") => {
        if(nonNumberAction) {
            if(nonNumberAction === "first") {
                handleCurrentPageChange(Number(1));
            } else if(nonNumberAction === "prev") {
                handleCurrentPageChange(Number(currentPage - 1));
            } else if(nonNumberAction === "next") {
                handleCurrentPageChange(Number(currentPage + 1));
            } else if(nonNumberAction === "last") {
                handleCurrentPageChange(Number(lastPage));
            }
            return;
        }
        handleCurrentPageChange(Number(e.target.innerText));
    }

    const lis = paginationRange.map((pageNumber, i) => {
        if(pageNumber === 'DOTS') {
            return <li key={i}>...</li>
        }
        return <li key={i} className={(i + 1 === currentPage ? "selected" : "")} onClick={handleOnClick}>{pageNumber}</li>
    })

    return (
        <div className="pagination-wrapper">
            {totalCount > 0 && <ul className="pagination-list">
                <li key={"first"} className={(currentPage === 1 ? "disable" : "")} onClick={(e) => handleOnClick(e, "first")}>{'<<'}</li>
                <li key={"prev"} className={(currentPage === 1 ? "disable" : "")} onClick={(e) => handleOnClick(e, "prev")}>{'<'}</li>
                {lis}
                <li key={"next"} className={(currentPage === lastPage ? "disable" : "")} onClick={(e) => handleOnClick(e, "next")}>{'>'}</li>
                <li key={"last"} className={(currentPage === lastPage ? "disable" : "")} onClick={(e) => handleOnClick(e, "last")}>{'>>'}</li>
            </ul>}
        </div>
    )
}

export default Pagination;