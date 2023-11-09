import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import Container from '~/components/parts/common/Container';
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
      <TopSection>
        <ImageTitle>Text Sonic: Your Pathway to Fluent English</ImageTitle>
        <ImageDescription>
          Elevate Your English with Every Sentence. Our pioneering platform
          enables you to pen daily sentences and seamlessly transforms them into
          spoken words through our advanced text-to-speech technology. Listen to
          the natural intonation, and follow along with interactive subtitles to
          sharpen your comprehension and pronunciation. With Text Sonic, each
          interaction is a step toward language mastery, immersing you in an
          enriching journey to English fluency.
        </ImageDescription>
      </TopSection>
      <StyledContainer>
        <ContentSection>
          <Title>Writing List</Title>

          <DailyList container spacing={3}>
            <nav>
              <List>
                {dailies.map((daily, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemButton>
                        <ListItemText primary={daily.title} />
                        <ListItemText secondary={daily.content} />
                      </ListItemButton>
                    </ListItem>
                    {index !== dailies.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </nav>
          </DailyList>
          <DailyButton variant="contained">Create New</DailyButton>
        </ContentSection>

        <ContentSection>
          <Title>Benefits of Using Our Service</Title>

          <BenefitCard>
            <BenefitTitle>Active Writing Practice</BenefitTitle>
            <Description>
              Writing writing sentences is a great way for learners to actively
              use new vocabulary and grammar structures, reinforcing their
              learning.
            </Description>
          </BenefitCard>

          <BenefitCard>
            <BenefitTitle>Immediate Feedback with TTS</BenefitTitle>
            <Description>
              Hearing the text they wrote read back to them by a TTS engine
              allows learners to hear the natural rhythm, intonation, and
              pronunciation of English, which can improve their listening and
              speaking skills.
            </Description>
          </BenefitCard>

          <BenefitCard>
            <BenefitTitle>Accessibility of Learning Materials</BenefitTitle>
            <Description>
              By downloading the audio as an MP3 file, learners can practice
              anywhere, which makes it easier to fit into their writing routine.
            </Description>
          </BenefitCard>

          <BenefitCard>
            <BenefitTitle>Integrated Learning Experience</BenefitTitle>
            <Description>
              Playing the audio with subtitles links the written and spoken
              aspects of the language, helping with reading comprehension and
              listening skills simultaneously.
            </Description>
          </BenefitCard>

          <BenefitCard>
            <BenefitTitle>Interactive Subtitles</BenefitTitle>
            <Description>
              The ability to click on subtitles and jump to that point in the
              audio can help learners to focus on specific phrases or vocabulary
              they want to hear again, which is beneficial for detailed learning
              and repetition.
            </Description>
          </BenefitCard>
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

const DailyList = styled(Grid)`
  margin-top: 20px;
`;

const DailyButton = styled(Button)`
  margin: 10px;
  color: white;
  background-color: #3f51b5;

  &:hover {
    background-color: #4660d9;
  }
`;

const TopSection = styled.div`
  background-image: url('/images/top-image.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  padding: 30px;
  padding-top: 350px;
  color: ${color.WHITE};
  text-shadow: 2px 2px 4px #000000;
`;

const ImageTitle = styled.h1`
  font-size: 40px;
  font-weight: bold;
  margin: 0 20px;
`;

const ImageDescription = styled.p`
  font-size: 20px;
  margin: 20px;
`;

const BenefitCard = styled.div`
  background-color: ${color.BLUE};
  border-radius: 10px;
  padding: 2em;
  margin: 1em 0;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: ${color.BLACK};
`;

const BenefitTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${color.WHITE};
`;

const Description = styled.p`
  color: ${color.WHITE};
  font-weight: 500;
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
