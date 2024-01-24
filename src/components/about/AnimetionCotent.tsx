import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { breakPointLessThan } from '~/styles/utils';

const StyledComponent = styled.div`
  margin: 120px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${breakPointLessThan.SP(css`
    margin: 60px 0;
  `)}

  // animation css
  opacity: 0;
  transition: opacity 2s ease, transform 2s ease;
  will-change: opacity, transform;
  transform: translateY(200px);

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface AnimationContentProps {
  children: React.ReactNode;
}

const AnimationContent: React.FC<AnimationContentProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const checkVisibility = () => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      // 要素が表示範囲内にある場合
      setIsVisible(true);
    } else {
      // 要素が表示範囲外にある場合
      setIsVisible(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(checkVisibility);
    };

    window.addEventListener('scroll', handleScroll);
    checkVisibility(); // 初期表示でチェック

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <StyledComponent ref={ref} className={isVisible ? 'visible' : ''}>
      {children}
    </StyledComponent>
  );
};

export default AnimationContent;
