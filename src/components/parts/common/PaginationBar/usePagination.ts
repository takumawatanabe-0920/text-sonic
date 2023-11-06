import React from 'react';

const MAX_PAGE = 3;

export const usePagination = (currentPage: number, totalPages: number) => {
  const [pages, setPages] = React.useState<(string | number)[]>([]);

  React.useEffect(() => {
    if (totalPages > 1) {
      let pageIndexs = [];
      if (totalPages <= MAX_PAGE) {
        for (let i = 1; i <= totalPages; i++) {
          pageIndexs.push(i);
        }
        setPages(pageIndexs);
      } else if (currentPage === totalPages && totalPages > 3) {
        pageIndexs = [1, '...', totalPages - 1, totalPages];
        setPages(pageIndexs);
      } else if (totalPages - currentPage === 2) {
        pageIndexs = [currentPage, totalPages - 1, totalPages];
        setPages(pageIndexs);
      } else {
        pageIndexs =
          totalPages - currentPage > 2
            ? [currentPage, currentPage + 1, '...', totalPages]
            : totalPages - currentPage <= 2 && currentPage !== totalPages
            ? [1, '...', currentPage, totalPages]
            : [1, '...', currentPage, '... ', totalPages];

        setPages(pageIndexs);
      }
    } else {
      setPages([]);
    }
  }, [totalPages, currentPage]);

  return {
    pages,
  };
};
