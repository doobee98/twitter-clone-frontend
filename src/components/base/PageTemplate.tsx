import styled, { css } from 'styled-components';
import useTitle from 'hooks/useTitle';
import { ColorPalette } from 'utils/colorUtils';
import ExploreSideBar from './ExploreSideBar';
import NavigationSideBar from './NavigationSideBar';

const PageTemplateContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

interface ContentWrapperProps {
  width?: string;
}

const ContentWrapper = styled.main<ContentWrapperProps>`
  min-height: 100%;
  border-left: 1px solid ${ColorPalette.GRAY_E6};
  border-right: 1px solid ${ColorPalette.GRAY_E6};

  ${(props) =>
    css`
      width: ${props.width ?? '598px'};
    `}
`;

interface PageTemplateProps {
  title: string;
  contentWidth?: string;
}

const PageTemplate: React.FC<PageTemplateProps> = (props) => {
  const { children, title, contentWidth } = props;

  useTitle(`${title} / Twitter-Clone`);

  return (
    <PageTemplateContainer>
      <NavigationSideBar />
      <ContentWrapper width={contentWidth}>{children}</ContentWrapper>
      <ExploreSideBar />
    </PageTemplateContainer>
  );
};

export default PageTemplate;
