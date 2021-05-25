import styled from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';
import ToolList from './ToolList';

const ContentContainer = styled.div`
  float: left;
  padding-top: 4px;
  width: 90%;
`;

const TextWrapper = styled.textarea`
  width: 100%;
  min-height: 56px;
  padding: 12px 0px;
`;

const PermissionWrapper = styled.div`
  height: 45px;
  padding-bottom: 10px;
  background-color: ${ColorPalette.GRAY_E6};
`;

const ToolBarWrapper = styled.div`
  display: flex;
  margin: 0px 2px;
  width: 100%;
  height: 52px;
`;

const PostContent: React.FC = () => {
  return (
    <ContentContainer>
      <TextWrapper />
      <PermissionWrapper />
      <ToolBarWrapper>
        <ToolList />
      </ToolBarWrapper>
    </ContentContainer>
  );
};

export default PostContent;
