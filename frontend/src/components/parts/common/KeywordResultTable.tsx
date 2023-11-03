import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import styled from 'styled-components';
import toastMessage from '~/components/parts/toast/ToastMessage';
import { color } from '~/styles/utils';

interface KeywordResultTableProps {
  rows: {
    string: string;
    volume: number;
  }[];
}

const KeywordResultTable: React.FC<KeywordResultTableProps> = (props) => {
  const { rows } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>候補キーワード</TableCell>
            <TableCell>検索ボリューム（Googleでの月間検索量です）</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={`${row.string} ${index}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <CopyContent>
                  <ContentCopyIcon
                    onClick={() => {
                      navigator.clipboard.writeText(row.string);
                      toastMessage({
                        type: 'success',
                        message: 'クリップボードにコピーしました',
                      });
                    }}
                    sx={{
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontColor: color.font.BLUE,
                    }}
                    color="primary"
                  />
                  <Keyword>{row.string}</Keyword>
                </CopyContent>
              </TableCell>
              <TableCell>{row.volume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CopyContent = styled.div`
  display: flex;
  align-items: center;
`;

const Keyword = styled.div`
  margin-left: 2px;
`;

export default KeywordResultTable;
