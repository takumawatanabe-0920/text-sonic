import type { GetServerSideProps, NextPage } from 'next';
import { LoginForm } from '~/components/login/LoginForm';
import Layout from '~/layouts/Layout';

const Login: NextPage = () => {
  return (
    <Layout>
      {/* dialog ? */}
      <LoginForm />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};

export default Login;
