import { NextPage } from 'next';
import { useEffect } from 'react';
import styled from 'styled-components';
import Container from '~/components/parts/common/Container';
import SpeechifyScriptsDescription from '~/components/writing/SpeechifyScriptsDescription';
import SpeechifyUsageGuide from '~/components/writing/SpeechifyUsageGuide';
import TopSection from '~/components/writing/TopSection';
import WritingList from '~/components/writing/WritingList';
import { useUser } from '~/hooks/api/user';
import { useWritings } from '~/hooks/api/writing';
import Layout from '~/layouts/Layout';
import { getWritings } from '~/lib/api/writing';
import { color } from '~/styles/utils';

const Home: NextPage = () => {
  const { user } = useUser({ isRequiredAuth: false });
  const { writings, mutate: mutateWritings } = useWritings({
    userId: user?.id,
  });

  useEffect(() => {
    console.log({ user, key: 'why' });
    if (!user?.id) {
      return;
    }

    (async () => {
      const __writings = await getWritings({ userId: user.id });
      await mutateWritings(__writings, false);
    })();
  }, [user?.id, mutateWritings]);

  console.log({ writings, key: 'rerere' });

  return (
    <Layout>
      <TopSection />
      <StyledContainer>
        <ContentSection>
          <Title>Script List</Title>

          <WritingList writings={writings} />
        </ContentSection>
        <ContentSection>
          <Title>Benefits of Using Our Service</Title>
          <SpeechifyScriptsDescription />
        </ContentSection>
        <ContentSection>
          <Title>How to Use Speechify Scripts</Title>
          <SpeechifyUsageGuide />
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
`;

const ContentSection = styled.div`
  margin-top: 50px;
`;

export default Home;
