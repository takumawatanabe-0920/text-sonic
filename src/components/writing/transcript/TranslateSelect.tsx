import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

type LanguageSelectorProps = {
  handleTranslate: (targetLanguage: string) => void;
};
const LanguageSelector: React.FC<LanguageSelectorProps> = (props) => {
  const [language, setLanguage] = React.useState('' as string);
  const { handleTranslate } = props;

  const handleLanguageChange = (event: any) => {
    handleTranslate(event.target.value);
    setLanguage(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="language-selector-label">Target Language</InputLabel>
      <Select
        labelId="language-selector-label"
        id="language-selector"
        value={language}
        label="Target Language"
        onChange={handleLanguageChange}
      >
        <MenuItem value="ja">Japanese (日本語)</MenuItem>
        <MenuItem value="ko">Korean (한국어)</MenuItem>
        <MenuItem value="zh-CN">Chinese (Simplified) (简体中文)</MenuItem>
        <MenuItem value="zh-TW">Chinese (Traditional) (繁體中文)</MenuItem>
        <MenuItem value="pt-BR">Portuguese (Brazil) (Português)</MenuItem>
        <MenuItem value="es-MX">Spanish (Mexico) (Español)</MenuItem>
        <MenuItem value="tr">Turkish (Türkçe)</MenuItem>
        <MenuItem value="fr">French (Français)</MenuItem>
        <MenuItem value="de">German (Deutsch)</MenuItem>
        <MenuItem value="en">English (English)</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
