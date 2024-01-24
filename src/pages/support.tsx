import { NextPage } from 'next';
import styled, { css } from 'styled-components';
import AccordionItem from '~/components/parts/AccordionItem';
import Container from '~/components/parts/common/Container';
import TopSection from '~/components/support/TopSection';
import Layout from '~/layouts/Layout';
import { breakPointLessThan, color } from '~/styles/utils';

const questionAndAnswer = [
  {
    question: 'What is Speechify Scripts?',
    answer: `Speechify Scripts is an innovative language learning platform that transforms your written English into spoken words using advanced text-to-speech technology. It's designed to help users improve their English speaking and listening skills, comprehension, and pronunciation.`,
  },
  {
    question: 'How does Speechify Scripts work?',
    answer: `Users enter English sentences into the site's form. These sentences are then converted into spoken words through text-to-speech technology. The service includes features like audio playback with subtitles, customizable speech speed, and various voice options.`,
  },
  {
    question: 'Who can benefit from using Speechify Scripts?',
    answer: `Speechify Scripts is ideal for anyone looking to improve their English language skills, including non-native speakers, students, professionals, and casual learners. It's especially useful for improving pronunciation and listening comprehension.`,
  },
  {
    question: 'Can I adjust the playback speed and voice type?',
    answer:
      "Speechify Scripts is ideal for anyone looking to improve their English language skills, including non-native speakers, students, professionals, and casual learners. It's especially useful for improving pronunciation and listening comprehension.",
  },
  {
    question: 'Can I use on free?',
    answer: 'Yes, Speechify Scripts is free to use.',
  },
  {
    question: 'Does Speechify Scripts offer subtitle translations?',
    answer:
      'Yes, one of the key features is subtitle translations in ten different languages. This helps non-native English speakers understand and learn English more effectively.',
  },
  {
    question: 'How do I initiate the text-to-speech conversion?',
    answer:
      "After entering your text, visit the script's detail page and press a button to start the text-to-speech conversion. The converted audio can also be downloaded as MP3 files.",
  },
  {
    question: 'Is there a feature for playing audio from a specific point?',
    answer:
      'Yes, the subtitle-enabled audio playback allows you to click on a subtitle part to play audio from that specific point, enhancing learning and understanding.',
  },
  {
    question: 'Is my entered text saved for future use?',
    answer:
      'Yes, the text you enter is automatically saved to the database for future access and learning.',
  },
  {
    question: 'How does Speechify Scripts improve pronunciation?',
    answer:
      'The audio playback with interactive subtitles feature enables learners to hear how their English sounds, providing a practical tool for pronunciation improvement.',
  },
  {
    question: 'Is Speechify Scripts suitable for advanced English learners?',
    answer:
      'Absolutely. Speechify Scripts is beneficial for learners at all levels, from beginners needing a slower pace to advanced learners seeking to refine their skills at a more natural speed.',
  },
];

const SupportPage: NextPage = () => {
  return (
    <Layout>
      <TopSection />
      <StyledContainer>
        <ContentSection>
          <Title>FAQ</Title>
          <FAQSection>
            {questionAndAnswer.map((item, index) => (
              <AccordionItem
                key={index}
                title={item.question}
                description={item.answer}
              />
            ))}
          </FAQSection>
          {/* <LinkForContact>
            If you have any other questions, please contact us at{' '}
            <CustomLink href={ROUTER_PATH.CONTACT}>here</CustomLink>.
          </LinkForContact> */}
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

const FAQSection = styled.div`
  margin: 40px 0;
`;

const LinkForContact = styled.p`
  font-size: 16px;
  color: ${color.BLACK};
  font-weight: bold;
`;

const CustomLink = styled.a`
  color: ${color.font.BLUE};
  text-decoration: underline;
`;

export default SupportPage;
