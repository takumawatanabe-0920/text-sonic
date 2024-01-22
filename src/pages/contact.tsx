import { NextPage } from 'next';
import styled, { css } from 'styled-components';
import TopSection from '~/components/contact/TopSection';
import Container from '~/components/parts/common/Container';
import Layout from '~/layouts/Layout';
import { breakPointLessThan, color } from '~/styles/utils';

const ContactPage: NextPage = () => {
  return (
    <Layout>
      <TopSection />
      <StyledContainer>
        <ContentSection>
          <Title>Contact us</Title>
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

export default ContactPage;
