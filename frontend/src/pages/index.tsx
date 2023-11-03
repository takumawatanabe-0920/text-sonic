import Container from '~/components/parts/common/Container';
import SearchWrapper from '~/components/search/SearchWrapper';
import Layout from '~/layouts/Layout';

const Home = () => {
  return (
    <Layout>
      <Container>
        <SearchWrapper />
      </Container>
    </Layout>
  );
};

export default Home;
