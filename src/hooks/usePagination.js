import { useMemo } from 'react';

export const usePagination = ({totalCount, pageSize=1, siblingCount=1, currentPage}) => {
    const range = (start, end) => {
        let length = end - start + 1;
        return Array.from({ length }, (_, i) => i + start); 
    }

    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);
        const totalPageNumbers = siblingCount + 5;

        if(totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        //case - 1: when we have dots on right side of the current page number
        if(!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange =range(1, leftItemCount);

            return [...leftRange, 'DOTS', totalPageCount];
        }

        //case - 2: when we have dots on left side of the current page number
        if(shouldShowLeftDots && !shouldShowRightDots) {
            let rigthItemCount = 3 + 2 * siblingCount;
            let rightRange = range(
                totalPageCount - rigthItemCount + 1,
                totalPageCount
            );
            return [firstPageIndex, 'DOTS', ...rightRange];
        }

        //case - 3: when we have dots on both side of the current page number
        if(shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, 'DOTS', ...middleRange, 'DOTS', lastPageIndex];
        }
    }, [totalCount, pageSize, siblingCount, currentPage])

    return paginationRange;
}