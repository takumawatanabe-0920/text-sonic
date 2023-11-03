import { useCallback } from 'react';
import WordCloud from 'react-d3-cloud';
import styled from 'styled-components';
import toastMessage from '~/components/parts/toast/ToastMessage';

interface WordCloudComponentProps {
  data: { text: string; value: number }[];
  width?: number;
  height?: number;
  font?: string;
  fontStyle?: string;
  fontWeight?: string;
  spiral?: 'rectangular';
  padding?: number;
}

const WordCloudComponent: React.FC<WordCloudComponentProps> = (props) => {
  const { data, width, height, font, fontStyle, fontWeight, spiral, padding } =
    props;

  const handleWordClick = useCallback((event: any, d: any) => {
    navigator.clipboard.writeText(d.text);
    toastMessage({
      type: 'success',
      message: 'クリップボードにコピーしました',
    });
  }, []);

  return (
    <WordCloudWrapper>
      <WarningInfo>※キーワードをクリックするとコピーできます</WarningInfo>
      <WordCloud
        data={data.map((d) => ({
          ...d,
          value: d.value,
        }))}
        width={width || 1000}
        height={height || 1000}
        font={font || 'Times'}
        fontStyle={fontStyle || 'italic'}
        // font-sizeを28pxに固定する
        fontSize={() => 28}
        fontWeight={fontWeight || 'bold'}
        spiral={spiral || 'rectangular'}
        padding={padding || 5}
        onWordClick={handleWordClick}
        rotate={() => 0}
      />
    </WordCloudWrapper>
  );
};

const WordCloudWrapper = styled.div`
  cursor: pointer;
`;

const WarningInfo = styled.p`
  font-size: 12px;
  color: #666;
  font-weight: 700;
  padding: 10px 0;
`;

export default WordCloudComponent;
