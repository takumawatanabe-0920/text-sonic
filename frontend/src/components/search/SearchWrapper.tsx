import { Box, Button } from '@mui/material';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import LimitTags from '~/components/parts/LimitTags';
import TermExtractFormDialog from '~/components/parts/TermExtract';
import KeywordResultTable from '~/components/parts/common/KeywordResultTable';
import { SpinnerWithContainer } from '~/components/parts/common/Loading';
import { Tab, Tabs } from '~/components/parts/common/Tab';
import WordCloudComponent from '~/components/parts/common/WordCloud';
import { useSearchSuggestion } from '~/hooks/api/searchSuggestion';
import { useClient } from '~/hooks/useClient';
import { searchSuggestions } from '~/lib/api/search';
import { TermExtract } from '~/lib/api/termExtract';
import { contentsMaxWidth } from '~/styles/utils';

type SettingType = 'wordCloud' | 'list';

const SearchWrapper: React.FC = () => {
  const [active, setActive] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [setting, setSetting] = useState<SettingType>('wordCloud');
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

  const convertWordCloudData = useMemo(() => {
    return suggestions.map((suggestion) => ({
      text: suggestion.string,
      value: suggestion.volume,
    }));
  }, [suggestions]);

  const updateSuggestions = async (keyword: string) => {
    setIsLoadingSuggestions(true);
    setActive(keyword);
    const suggestions = await searchSuggestions({ keyword });
    mutate(suggestions, false);
    setIsLoadingSuggestions(false);
  };

  const handleExtract = async (args: { terms: TermExtract }) => {
    const keywords = Object.keys(args.terms);
    setKeywords(keywords);
    const index = keywords[0];
    if (index) {
      await updateSuggestions(index);
    }
  };

  if (isLoading) {
    return <SpinnerWithContainer />;
  }

  return (
    <Wrapper>
      <SettingContent>
        <SettingButtons>
          <SettingButton
            variant={isActiveSetting('wordCloud')}
            onClick={(_) => handleSetting('wordCloud')}
          >
            ワードクラウド
          </SettingButton>
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
          <TermExtractFormDialog handleParentExtract={handleExtract} />
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
                {setting === 'wordCloud' && (
                  <WordCloudComponent data={convertWordCloudData} />
                )}
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
