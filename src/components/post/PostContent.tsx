import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
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

  overflow: hidden;
  resize: none;
  border: none;

  font-size: 20px;
  font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto',
    Helvetica, Arial, sans-serif;
  font-weight: 400;

  ::placeholder {
    font-size: 20px;
    font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto',
      Helvetica, Arial, sans-serif;
    font-weight: 400;
  }
`;

const PermissionWrapper = styled.div<{ writing: boolean }>`
  height: 45px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${ColorPalette.GRAY_E6};
  background-color: ${ColorPalette.GRAY_E6};
  display: none;
  ${(props) =>
    props.writing &&
    css`
      display: block;
    `}
`;

const ToolBarWrapper = styled.div`
  display: flex;
  margin: 0px 2px;
  width: 100%;
  height: 52px;
`;

const PostContent: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [currentValue, setCurrentValue] = useState('');
  const [writing, setWriting] = useState(false);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currentValue]);

  return (
    <ContentContainer>
      <TextWrapper
        ref={textareaRef}
        value={currentValue}
        placeholder="What's happening?"
        rows={1}
        defaultValue=""
        onClick={() => {
          setWriting(true);
        }}
        onChange={(e) => {
          setCurrentValue(e.target.value);
        }}
      />
      <PermissionWrapper writing={writing} />
      <ToolBarWrapper>
        <ToolList />
      </ToolBarWrapper>
    </ContentContainer>
  );
};

export default PostContent;
