import { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';
import Container from '~/components/parts/common/Container';
import Benefits from '~/components/writing/Benefits';
import TopSection from '~/components/writing/TopSection';
import WritingList from '~/components/writing/WritingList';
import Layout from '~/layouts/Layout';
import { color } from '~/styles/utils';

const Home: NextPage<{
  dailies: {
    title: string;
    content: string;
  }[];
}> = ({ dailies }) => {
  return (
    <Layout>
      <TopSection />
      <StyledContainer>
        <ContentSection>
          <Title>Writing List</Title>

          <WritingList writings={dailies} />
        </ContentSection>

        <ContentSection>
          <Title>Benefits of Using Our Service</Title>
          <Benefits />
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

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch your dailies from the database here.
  const dailies = [
    {
      title: 'Writing 1',
      content: 'This is the first writing.',
    },
    {
      title: 'Writing 2',
      content: 'This is the second writing.',
    },
    {
      title: 'Writing 1',
      content: 'This is the first writing.',
    },
    {
      title: 'Writing 2',
      content: 'This is the second writing.',
    },
  ];

  return {
    props: {
      dailies,
    },
  };
};

export default Home;
