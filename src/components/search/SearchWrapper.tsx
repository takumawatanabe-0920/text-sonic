import { Box, Button } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import LimitTags from '~/components/parts/LimitTags';
import KeywordResultTable from '~/components/parts/common/KeywordResultTable';
import { SpinnerWithContainer } from '~/components/parts/common/Loading';
import { Tab, Tabs } from '~/components/parts/common/Tab';
import { useSearchSuggestion } from '~/hooks/api/searchSuggestion';
import { useClient } from '~/hooks/useClient';
import { searchSuggestions } from '~/lib/api/search';
import { contentsMaxWidth } from '~/styles/utils';

type SettingType = 'list';

const SearchWrapper: React.FC = () => {
  const [active, setActive] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [setting, setSetting] = useState<SettingType>('list');
  const { suggestions, mutate, isLoading } = useSearchSuggestion({
    keyword: active,
  });
  // SWRの機能があれば置き換えたい
  const [isLoadingSuggestions, setIsLoadingSuggestions] =
    useState<boolean>(false);

  const isCSR = useClient();

  const handleClick = async (e: any) => {
    const index = e.target.value;
    if (index !== active) {
      await updateSuggestions(index);
    }
  };

  const handleAddKeyword = async (value: string[]) => {
    setKeywords(value);

    // labelが一つだけになった場合は、そのlabelのデータを表示する
    if (value.length === 1) {
      const index = value[0];
      await updateSuggestions(index as string);
    }
  };

  const handleSetting = async (value: SettingType) => {
    setSetting(value);
  };

  const isActiveSetting = (value: SettingType) => {
    return value === setting ? 'contained' : 'outlined';
  };

  const updateSuggestions = async (keyword: string) => {
    setIsLoadingSuggestions(true);
    setActive(keyword);
    const suggestions = await searchSuggestions({ keyword });
    mutate(suggestions, false);
    setIsLoadingSuggestions(false);
  };

  if (isLoading) {
    return <SpinnerWithContainer />;
  }

  return (
    <Wrapper>
      <SettingContent>
        <SettingButtons>
          <SettingButton
            variant={isActiveSetting('list')}
            onClick={(_) => handleSetting('list')}
          >
            一覧
          </SettingButton>
        </SettingButtons>
      </SettingContent>
      <SearchContent>
        <LimitTagWrapper>
          <LimitTags handleAddKeyword={handleAddKeyword} value={keywords} />
        </LimitTagWrapper>
        {keywords && keywords.length > 0 && (
          <TabsWrapper>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs>
                {keywords.map((keyword) => (
                  <Tab
                    onClick={async (e) => handleClick(e)}
                    active={keyword === active}
                    value={keyword}
                    key={keyword}
                  >
                    {keyword}
                  </Tab>
                ))}
              </Tabs>
            </Box>
          </TabsWrapper>
        )}
        {isCSR && (
          <>
            {isLoadingSuggestions ? (
              <SpinnerWithContainer />
            ) : (
              <>
                {setting === 'list' && (
                  <KeywordResultTable rows={suggestions} />
                )}
              </>
            )}
          </>
        )}
      </SearchContent>
    </Wrapper>
  );
};

const TabsWrapper = styled.div`
  ${contentsMaxWidth()}
  padding: 16px;
`;

const Wrapper = styled.div`
  padding: 40px 0;
  display: flex;
`;

const SettingContent = styled.div`
  margin-right: 40px;
`;

const SettingButtons = styled.div`
  display: flex;
`;

const SettingButton = styled(Button)`
  padding: 8px 16px;
  margin-right: 8px;
`;

const SearchContent = styled.div`
  width: 70%;
`;

const LimitTagWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default SearchWrapper;
