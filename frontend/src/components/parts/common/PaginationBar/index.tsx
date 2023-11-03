import { usePagination } from './usePagination';
import styled from 'styled-components';
import { color, size } from '~/styles/utils';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onChangePage: (page: number) => void;
};

export const PaginationBar = ({
  totalPages,
  currentPage,
  onChangePage,
}: PaginationProps) => {
  const { pages } = usePagination(currentPage, totalPages);

  return (
    <PaginationWrapper>
      {totalPages > 1 && (
        <HorizontalWrapper>
          {currentPage > 1 && (
            <Button
              onClick={() => {
                if (currentPage - 1 >= 1) {
                  onChangePage(currentPage - 1);
                }
              }}
            >
              {'<'}
            </Button>
          )}
          {pages.map((value) => {
            return (
              <Button
                isSelected={value === currentPage}
                key={value}
                onClick={() => {
                  if (value !== '...' && currentPage !== value) {
                    onChangePage(value as number);
                  }
                }}
              >
                {value}
              </Button>
            );
          })}
          {currentPage < totalPages && (
            <Button
              onClick={() => {
                if (currentPage <= totalPages - 1) {
                  onChangePage(currentPage + 1);
                }
              }}
            >
              {'>'}
            </Button>
          )}
        </HorizontalWrapper>
      )}
    </PaginationWrapper>
  );
};

const PaginationWrapper = styled.div`
  padding-top: 20px;
  width: 100%;
  justify-content: start;
  display: flex;
  flex-direction: row;
`;

const HorizontalWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled.a<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ isSelected }) =>
    isSelected ? color.bg.PRIMARY_DARK : color.bg.WHITE};
  width: 40px;
  height: 40px;
  border: ${({ isSelected }) =>
    isSelected ? 'none' : `1px ${color.bg.PRIMARY_DARK} solid`};
  border-radius: 50%;
  color: ${({ isSelected }) =>
    isSelected ? color.bg.WHITE : color.bg.PRIMARY_DARK};
  margin-right: 10px;
  font-size: ${size.font.M};
  font-weight: ${size.fontWeight.W5};
`;
