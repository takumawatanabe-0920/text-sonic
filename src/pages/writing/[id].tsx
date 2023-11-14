import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import Container from '~/components/parts/common/Container';
import WritingDetail from '~/components/writing/WritingDetail';
import { useUser } from '~/hooks/api/user';
import Layout from '~/layouts/Layout';
import { Writing, getWriting } from '~/lib/api/writing';
import { breakPointLessThan } from '~/styles/utils';

const Page: NextPage<{ writing: Writing }> = ({ writing }) => {
  const { user, isLoading } = useUser({ isRequiredAuth: false });
  useEffect(() => {
    if (isLoading || !writing) {
      return;
    }

    if (!isLoading && !user?.id) {
      router.push('/');
    }
  }, [user?.id, isLoading, writing]);

  return (
    <>
      <Head>
        <title>{writing.title}</title>
      </Head>
      <Layout>
        <StyledContainer>
          <ContentSection>
            <WritingDetail writing={writing} />
          </ContentSection>
        </StyledContainer>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query as { id: string };
  const writing = await getWriting({ id });

  try {
    return {
      props: {
        writing,
      },
    };
  } catch (error) {
    return {
      props: {
        writing: {},
      },
    };
  }
};

const ContentSection = styled.div`
  margin: 80px 0;

  ${breakPointLessThan.SP(css`
    margin: 50px 0;
  `)}
`;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Page;
