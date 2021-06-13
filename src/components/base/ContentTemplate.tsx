import styled, { css } from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';

interface ContentTemplateContainerProps {
  hasBorder?: boolean;
  width?: string;
}

const ContentTemplateContainer = styled.div<ContentTemplateContainerProps>`
  min-height: 100%;
  width: ${(props) => props.width || '600px'};

  ${(props) =>
    props.hasBorder &&
    css`
      border-left: 1px solid ${ColorPalette.GRAY_E6};
      border-right: 1px solid ${ColorPalette.GRAY_E6};
    `}
`;

interface ContentSectionContainerProps {
  hasBorder: boolean;
  background?: string;
}

const ContentSectionContainer = styled.div<ContentSectionContainerProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  font-size: 15px;

  background-color: ${(props) => props.background || ColorPalette.WHITE};

  ${(props) =>
    props.hasBorder &&
    css`
      border-bottom: 1px solid ${ColorPalette.GRAY_E6};
    `}

  &:nth-last-child(1) {
    border-bottom: none;
  }
`;

const ContentHeaderContainer = styled(ContentSectionContainer)`
  position: sticky;
  top: 0;
  height: 50px;
  justify-content: flex-start;
  font-size: 20px;
`;

interface ContentTemplateProps {
  hideBorder?: boolean;
  width?: string;
  className?: string;
}

const ContentTemplate: React.FC<ContentTemplateProps> = (props) => {
  const { hideBorder, width, className, children } = props;

  return (
    <ContentTemplateContainer
      hasBorder={!hideBorder}
      width={width}
      className={className}
    >
      {children}
    </ContentTemplateContainer>
  );
};

interface ContentSectionProps {
  hideBorder?: boolean;
  background?: string;
  className?: string;
}

export const ContentSection: React.FC<ContentSectionProps> = (props) => {
  const { hideBorder, background, className, children } = props;

  return (
    <ContentSectionContainer
      hasBorder={!hideBorder}
      background={background}
      className={className}
    >
      {children}
    </ContentSectionContainer>
  );
};

export const ContentHeader: React.FC<ContentSectionProps> = (props) => {
  const { hideBorder, className, children } = props;

  return (
    <ContentHeaderContainer hasBorder={!hideBorder} className={className}>
      {children}
    </ContentHeaderContainer>
  );
};

export default ContentTemplate;
