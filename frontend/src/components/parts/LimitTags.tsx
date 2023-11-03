import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React from 'react';

interface LimitTagsProps {
  handleAddKeyword: (keywords: string[]) => void;
  value: string[];
}

const LimitTags: React.FC<LimitTagsProps> = (props) => {
  const { handleAddKeyword, value } = props;

  return (
    <Autocomplete
      multiple
      id="multiple-limit-tags"
      options={[]}
      freeSolo
      value={value}
      renderInput={(params) => (
        <TextField
          {...params}
          size="medium"
          InputLabelProps={{
            className: 'my-custom-class' as string, // 型キャストを行う
          }}
          placeholder="+キーワードを追加"
        />
      )}
      sx={{ width: '700px' }}
      // labelを削除した時に検知する
      onChange={(event, value) => {
        if (value) {
          // 重複があったらreturn
          if (value.length !== new Set(value).size) return;
          handleAddKeyword(value);
        }
      }}
    />
  );
};

export default LimitTags;
