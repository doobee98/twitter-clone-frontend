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

const LeftSideBarWrapper = styled.div`
  position: sticky;
  top: 0;
  overflow-y: auto;
  max-height: 100vh;
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 0;

  display: flex;
  flex-direction: row-reverse;
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

const RightSideBarWrapper = styled.div`
  position: relative;
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;

  display: flex;
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
      <LeftSideBarWrapper>
        <NavigationSideBar />
      </LeftSideBarWrapper>
      <ContentWrapper width={contentWidth}>{children}</ContentWrapper>
      <RightSideBarWrapper>
        <ExploreSideBar />
      </RightSideBarWrapper>
    </PageTemplateContainer>
  );
};

export default PageTemplate;
