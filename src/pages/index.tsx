import { NextPage } from 'next';
import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import Container from '~/components/parts/common/Container';
import SpeechifyScriptsDescription from '~/components/writing/SpeechifyScriptsDescription';
import SpeechifyUsageGuide from '~/components/writing/SpeechifyUsageGuide';
import TopSection from '~/components/writing/TopSection';
import WritingList from '~/components/writing/WritingList';
import { useUser } from '~/hooks/api/user';
import { useWritings } from '~/hooks/api/writing';
import Layout from '~/layouts/Layout';
import { getWritings } from '~/lib/api/writing';
import { breakPointLessThan, color } from '~/styles/utils';

const Home: NextPage = () => {
  const { user } = useUser({ isRequiredAuth: false });
  const { writings, mutate: mutateWritings } = useWritings({
    userId: user?.id,
  });

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    (async () => {
      const __writings = await getWritings({ userId: user.id });
      await mutateWritings(__writings, false);
    })();
  }, [user?.id, mutateWritings]);

  return (
    <Layout>
      <TopSection />
      <StyledContainer>
        <ContentSection>
          <Title>Script List</Title>

          <WritingList writings={writings} />
        </ContentSection>
        <ContentSection>
          <Title>How to Use Speechify Scripts</Title>
          <ExplainContent>
            <VideoSection>
              <CustomVideo controls>
                <source src="/audio/service_explanation.mov" type="video/mp4" />
              </CustomVideo>
            </VideoSection>
            <SpeechifyUsageGuide />
          </ExplainContent>
        </ContentSection>
        <ContentSection>
          <Title>Benefits of Using Our Service</Title>
          <SpeechifyScriptsDescription />
        </ContentSection>
      </StyledContainer>
    </Layout>
  );
};

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: ${color.BLACK};
  margin-bottom: 24px;

  ${breakPointLessThan.SP(css`
    font-size: 20px;
  `)}
`;

const ContentSection = styled.div`
  margin: 80px 0;

  ${breakPointLessThan.SP(css`
    margin: 50px 0;
  `)}
`;

const ExplainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  ${breakPointLessThan.SP(css`
    display: block;
  `)}
`;

const VideoSection = styled.section`
  margin: 40px 0;
`;

const CustomVideo = styled.video`
  width: 100%;
  max-width: 350px;
  height: auto;
  border: 3px solid #333;
  border-radius: 8px;
`;

export default Home;
