import { NextPage } from 'next';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import AnimationContent from '~/components/about/AnimetionCotent';
import TopSection from '~/components/about/TopSection';
import Container from '~/components/parts/common/Container';
import { useClient } from '~/hooks/useClient';
import Layout from '~/layouts/Layout';
import { breakPointLessThan, color } from '~/styles/utils';

const AboutPage: NextPage = () => {
  const isCSR = useClient();

  if (!isCSR) {
    return null;
  }

  return (
    <Layout>
      <TopSection />
      <StyledContainer>
        <AnimationContent>
          <Title>Mission / Vision</Title>
          <SectionContent>
            <SubSection>
              <SubTitle>Our Mission</SubTitle>
              <SubDescription>
                Our mission is to empower English learners by providing a unique
                platform that transforms their written sentences into natural
                spoken words, helping them gain confidence in pronunciation and
                comprehension.
              </SubDescription>
            </SubSection>
            <SubSection>
              <SubTitle>Our Vision</SubTitle>
              <SubDescription>
                Our vision is to become the go-to resource for English learners
                worldwide, bridging the gap between written and spoken English.
                We aim to make it effortless for individuals to master
                pronunciation, making language learning more accessible and
                enjoyable. Through Speechify Scripts, we strive to foster a
                community of confident English speakers who can express
                themselves fluently and confidently.
              </SubDescription>
            </SubSection>
          </SectionContent>
        </AnimationContent>
        <AnimationContent>
          <Title>Our Service</Title>
          <SectionContent>
            <Cards>
              <SpeechifyScriptsDescriptionCard>
                <SpeechifyScriptsDescriptionTitle>
                  Benefits of Using Our Enhanced Speechify Scripts Service:
                </SpeechifyScriptsDescriptionTitle>
                <SpeechifyScriptsDescriptionDescription>
                  Speechify Scripts transforms your written English into an
                  interactive and dynamic learning experience. With advanced
                  text-to-speech technology and new, user-friendly features, the
                  service caters to a wide range of learning styles and needs.
                  The addition of speed adjustment, multiple voice options, and
                  subtitle translations significantly enhances the effectiveness
                  of our service. Whether you&apos;re looking to improve
                  pronunciation, comprehension, or overall fluency, Speechify
                  Scripts offers a comprehensive tool to guide you in your
                  journey towards mastering English.
                </SpeechifyScriptsDescriptionDescription>
              </SpeechifyScriptsDescriptionCard>
              <SpeechifyScriptsDescriptionCard>
                <SpeechifyScriptsDescriptionTitle>
                  Customizable Audio Playback:
                </SpeechifyScriptsDescriptionTitle>
                <SpeechifyScriptsDescriptionDescription>
                  With our latest update, Speechify Scripts now offers
                  customizable audio playback. Users can adjust the speed of the
                  spoken words to match their learning pace. This is especially
                  beneficial for beginners who may need a slower pace to catch
                  each word and phrase, as well as for advanced learners looking
                  to improve their listening skills at a more natural speed.
                </SpeechifyScriptsDescriptionDescription>
              </SpeechifyScriptsDescriptionCard>
              <SpeechifyScriptsDescriptionCard>
                <SpeechifyScriptsDescriptionTitle>
                  Diverse Voice Options:
                </SpeechifyScriptsDescriptionTitle>
                <SpeechifyScriptsDescriptionDescription>
                  Catering to diverse preferences, Speechify Scripts introduces
                  the option to choose between male and female voices for the
                  audio playback. This feature allows users to experience the
                  text in different tones and pitches, enriching the learning
                  process with variety.
                </SpeechifyScriptsDescriptionDescription>
              </SpeechifyScriptsDescriptionCard>
              <SpeechifyScriptsDescriptionCard>
                <SpeechifyScriptsDescriptionTitle>
                  Subtitles in Multiple Languages:
                </SpeechifyScriptsDescriptionTitle>
                <SpeechifyScriptsDescriptionDescription>
                  Understanding the needs of non-native English speakers, our
                  service now features subtitle translations in ten different
                  languages. This multilingual support bridges the gap for
                  learners from various linguistic backgrounds, making it easier
                  to understand and learn English effectively.
                </SpeechifyScriptsDescriptionDescription>
              </SpeechifyScriptsDescriptionCard>
            </Cards>
          </SectionContent>
        </AnimationContent>
        <AnimationContent>
          <Title>Out story</Title>
          <Description>
            <StoryList>
              <StoryItem>
                Our journey began in the heart of a Canadian winter, driven by a
                quest for English proficiency. The idea behind Speechify Scripts
                sprang from a personal quest for a more personalized approach to
                language learning, beyond the conventional methods that seemed
                lacking.
              </StoryItem>
              <StoryItem>
                Keeping a daily English diary, I documented my progress,
                pondering over the thought that practicing speaking with my own
                words could enhance my learning experience more effectively.
                However, the resources available were limited to textbook CDs
                and YouTube videos, offering no avenue to learn through
                one&apos;s own text. This gap in the learning resources led to
                the birth of Speechify Scripts, fueled by the desire to hear my
                own creations in a pronunciation akin to that of a native
                speaker.
              </StoryItem>
              <StoryItem>
                The service is built on a simple yet powerful concept: users can
                input their text and have it read back to them in either a male
                or female voice of their choosing. This approach allows users to
                learn pronunciation through their own writings, improving their
                fluency in the language.
              </StoryItem>
              <StoryItem>
                Initially intended for sharing among friends, the service
                incorporated multilingual subtitle features to accommodate users
                from diverse linguistic backgrounds. We also added real-time
                text highlighting and sentence-by-sentence audio playback to
                offer an interactive learning experience reminiscent of a TED
                Talk.
              </StoryItem>
              <StoryItem>
                From a personal need, Speechify Scripts has evolved into a
                service that revolutionizes the language learning process. Our
                aim is to make language learning more accessible and effective.
                While our story is just beginning, we hope this service becomes
                a valuable resource in your language learning journey. Welcome
                to Speechify Scripts, where your words resonate in your own
                voice.
              </StoryItem>
            </StoryList>
          </Description>
        </AnimationContent>
        <AnimationContent>
          <Title>Our Member</Title>
          <UserSectionWrapper>
            <UserSection>
              <ImageWrapper>
                <Image
                  src="/images/takuma_watanabe.jpg"
                  width={200}
                  height={260}
                  layout="cover"
                  alt="user image"
                />
              </ImageWrapper>
              <UserNameWrapper>
                <UserPosition>Founder & Developer</UserPosition>
                <UserName>Takuma Watanabe</UserName>
                <UserDescription>
                  As an innovative web developer simultaneously advancing my
                  English studies at a college in Toronto, I bring a depth of
                  technical expertise along with a broad spectrum of experience
                  to the table. My accomplishments include:
                  <UserList>
                    <UserItem>
                      Spearheading the pioneering development of a cloud-based
                      Electronic Health Records system, introducing new value to
                      the healthcare industry.
                    </UserItem>
                    <UserItem>
                      Enhancing website performance and user experience
                      significantly through numerous web development projects,
                      encompassing payment service migration and SEO
                      optimization.
                    </UserItem>
                    <UserItem>
                      Contributing to both front-end and back-end development in
                      the early stages of my career, working on e-commerce and
                      matchmaking services.
                    </UserItem>
                  </UserList>
                  These experiences have not only honed my technical proficiency
                  but also sharpened my global perspective and language skills.
                  Currently, I am leveraging these competencies to develop an
                  English learning service, aiming to create impactful
                  educational tools.
                </UserDescription>
              </UserNameWrapper>
            </UserSection>
          </UserSectionWrapper>
        </AnimationContent>
      </StyledContainer>
    </Layout>
  );
};

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ebebeb;
`;

const Title = styled.h2`
  font-weight: bold;
  line-height: 122px;
  letter-spacing: 0.1em;
  -webkit-text-stroke: 1px ${color.font.DARK_BLUE};
  color: #fff0;
  font-size: 5.65vw;
  margin-bottom: 50px;

  ${breakPointLessThan.SP(css`
    font-size: 7.65vw;
    margin-bottom: 20px;
  `)}
`;

const SectionContent = styled.p``;

const Cards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  ${breakPointLessThan.SP(css`
    grid-template-columns: 1fr;
  `)}
`;

const SpeechifyScriptsDescriptionCard = styled.div`
  background-color: ${color.BLUE};
  border-radius: 10px;
  padding: 2em;
`;

const SpeechifyScriptsDescriptionTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${color.WHITE};

  ${breakPointLessThan.SP(css`
    font-size: 18px;
  `)}
`;

const SpeechifyScriptsDescriptionDescription = styled.p`
  color: ${color.WHITE};
  font-weight: 500;

  ${breakPointLessThan.SP(css`
    font-size: 13px;
    font-weight: 400;
  `)}
`;

const SubSection = styled.div`
  margin: 80px;
  text-align: center;

  ${breakPointLessThan.SP(css`
    margin: 0 20px 50px;

    &:last-child {
      margin-bottom: 0;
    }
  `)}
`;

const SubTitle = styled.h3`
  margin-bottom: 20px;
  display: inline-block;
  font-size: 24px;
  font-weight: 700;
  border-bottom: 1px solid ${color.font.DARK_BLUE};
  color: ${color.font.DARK_BLUE};
`;

const SubDescription = styled.p`
  font-size: 24px;
  font-weight: 700;
  line-height: 60px;
  color: ${color.font.DARK_BLUE};

  ${breakPointLessThan.SP(css`
    font-size: 18px;
    line-height: 30px;
  `)}
`;

const UserSectionWrapper = styled.div`
  color: ${color.font.DARK_BLUE};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;

  ${breakPointLessThan.SP(css`
    width: 100%;
  `)}
`;

const ImageWrapper = styled.div`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const UserNameWrapper = styled.div``;

const UserName = styled.p`
  font-size: 20px;
  font-weight: 700;
  line-height: 25px;
  margin-bottom: 20px;
`;

const UserPosition = styled.p`
  font-size: 15px;
  margin-bottom: 10px;
`;

const UserDescription = styled.p`
  font-size: 15px;
  margin-bottom: 10px;
`;

const UserList = styled.ul`
  margin-left: 20px;
  list-style: disc;
  padding: 20px 0;
`;

const UserItem = styled.li`
  margin-bottom: 15px;
`;

const Description = styled.div`
  color: ${color.font.DARK_BLUE};
`;

const StoryList = styled.ul``;

const StoryItem = styled.li`
  margin-bottom: 15px;
`;

export default AboutPage;
