import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React from 'react';
import { SpinnerForInner } from '~/components/parts/common/Loading';
import { useTermExtract } from '~/hooks/api/termExtract';
import { TermExtract, termExtracts } from '~/lib/api/termExtract';

type TermExtractFormDialogProps = {
  handleParentExtract: (terms: { terms: TermExtract }) => void;
};

const TermExtractFormDialog: React.FC<TermExtractFormDialogProps> = (props) => {
  const { handleParentExtract } = props;

  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { mutate } = useTermExtract({ text });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleExtract = async () => {
    setIsLoading(true);
    const terms = await termExtracts({ text });
    await mutate(terms, false);
    if (terms) {
      handleParentExtract({ terms });
    }
    setIsLoading(false);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleOpen}
        style={{
          height: '100%',
        }}
      >
        文章からキーワードを抽出
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>文章を入力</DialogTitle>
        <DialogContent>
          <DialogContentText>
            文章を入力するとキーワードを抽出し、キーワードを元に検索結果を表示します。
          </DialogContentText>
          {isLoading ? (
            <SpinnerForInner />
          ) : (
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="文章"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setText(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            閉じる
          </Button>
          <Button
            onClick={handleExtract}
            variant="contained"
            color="primary"
            disabled={text === '' || isLoading}
          >
            抽出する
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TermExtractFormDialog;
