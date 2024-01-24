import Link from 'next/link';
import styled, { css } from 'styled-components';
import InstagramIcon from '~/components/parts/common/Icon/InstagramIcon';
import LinkedInIcon from '~/components/parts/common/Icon/LinkedInIcon';
import TwitterIcon from '~/components/parts/common/Icon/TwitterIcon';
import { ROUTER_PATH } from '~/constants/router-path';
import { useClient } from '~/hooks/useClient';
import {
  breakPoint,
  breakPointBetween,
  breakPointLessThan,
  color,
  contentsMaxWidth,
  size,
} from '~/styles/utils';

/**
 * Footer
 */
const Footer = () => {
  const isCSR = useClient();

  if (!isCSR) {
    return null;
  }

  return (
    <StyledFooter>
      <FooterContainer>
        <FooterTop>
          <LogoWrapper>
            <LogTextWrapper href={'/'}>Speechify Scripts</LogTextWrapper>
            <CatchphraseText>Unlock the power of spoken words</CatchphraseText>
          </LogoWrapper>
          <SNSList>
            <SNSItem
              href={ROUTER_PATH.INSTAGRAM}
              target="_blank"
              rel="noopener"
            >
              <InstagramIcon />
            </SNSItem>
            <SNSItem href={ROUTER_PATH.TWITTER} target="_blank" rel="noopener">
              <TwitterIcon />
            </SNSItem>
            <SNSItem href={ROUTER_PATH.LINKEDIN} target="_blank" rel="noopener">
              <LinkedInIcon />
            </SNSItem>
          </SNSList>
        </FooterTop>
        <HR />
        <FooterBottom>
          <RuleLinks>
            {/* <RuleLink href={ROUTER_PATH.CONTACT}>Contact us</RuleLink> */}
            <RuleLink href={ROUTER_PATH.SUPPORT}>Support</RuleLink>
            <RuleLink href={ROUTER_PATH.ABOUT}>About us</RuleLink>
          </RuleLinks>
        </FooterBottom>
      </FooterContainer>
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  width: 100%;
  background-color: ${color.LITE_GRAY};
  color: ${color.font.QUOTE};
  padding: 24px 16px;
`;

const FooterContainer = styled.div`
  margin: auto;
  ${contentsMaxWidth()}

  ${breakPointBetween(
    size.breakpoint.TABLET,
    size.breakpoint.PC,
    css`
      padding: 0 24px;
    `,
  )}
`;

const FooterTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${breakPointLessThan.SP(css`
    flex-direction: column;
    align-items: flex-start;
  `)}
`;

const CatchphraseText = styled.div`
  margin-left: 16px;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;

const LogTextWrapper = styled(Link)`
  display: flex;
  flex-shrink: 0;
  font-size: 18px;
  font-weight: bold;

  ${breakPoint.SP(css`
    margin-top: 4px;
  `)}

  ${breakPoint.TABLET(css`
    margin-top: 0px;
  `)}
`;

const SNSList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 110px;

  ${breakPointLessThan.SP(css`
    margin-top: 24px;
  `)}
`;

const SNSItem = styled.a`
  display: flex;
  align-items: center;
  font-weight: ${size.fontWeight.W7};
`;

const HR = styled.hr`
  margin: 24px 0;
  border: 1px solid ${color.font.QUOTE};
`;

const FooterBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${breakPointLessThan.SP(css`
    display: block;
  `)}
`;

const RuleLinks = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${breakPointLessThan.SP(css`
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 36px;
  `)}
`;

const RuleLink = styled.a`
  margin-right: 16px;
  display: inline-block;
  font-weight: ${size.fontWeight.W4};

  ${breakPointLessThan.SP(css`
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  `)}
`;

export default Footer;
