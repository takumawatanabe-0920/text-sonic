import { styled } from '@mui/material';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Container from '~/components/parts/common/Container';
import Layout from '~/layouts/Layout';
import { Writing, getWriting } from '~/lib/api/writing';

const Page: NextPage<{ writing: Writing }> = ({ writing }) => {
  return (
    <>
      <Head>
        <title>{writing.title}</title>
      </Head>
      <Layout>
        <StyledContainer>test</StyledContainer>
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

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Page;
