import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';
import { BasicType } from 'utils/iconUtils';
import NavItem from '../base/NavItem';
import TweetPostToolBar from './TweetPostToolBar';

const TweetPostContentContainer = styled.div`
  float: left;
  padding-top: 4px;
  width: 90%;
`;

interface TweetPostTextWrapperProps {
  height: string;
}

const TweetPostTextWrapper = styled.textarea<TweetPostTextWrapperProps>`
  width: 100%;
  min-height: 56px;
  line-height: 1.35em;
  padding: 12px 0px;

  resize: none;
  border: none;

  font-size: 20px;

  ${(props) =>
    css`
      height: ${props.height};
    `}
`;

interface TweetPostPermissionWrapperProps {
  isWritingStarted: boolean;
}

const TweetPostPermissionWrapper = styled.div<TweetPostPermissionWrapperProps>`
  height: 45px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${ColorPalette.GRAY_E6};

  display: none;
  ${(props) =>
    props.isWritingStarted &&
    css`
      display: block;
    `}
`;

const PermissionButton = styled(NavItem)`
  color: ${ColorPalette.SKYBLUE};

  & button {
    margin: 0px;
    padding: 0px;
    padding-right: 8px;
  }

  & div {
    margin: 0px;
    margin-left: 6.5px;
    font-size: 13px;
  }
`;

const TweetPostToolBarWrapper = styled.div`
  display: flex;
  margin: 0px 2px;
  width: 100%;
  height: 52px;
`;

const TweetPostContent: React.FC = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [textAreaHeight, setTextareaHeight] = useState('56px');
  const [currentValue, setCurrentValue] = useState('');
  const [isWritingStarted, setIsWritingStarted] = useState(false);

  useEffect(() => {
    if (textAreaRef.current) {
      setTextareaHeight(`${textAreaRef.current.scrollHeight}px`);
    }
  }, [currentValue]);

  const handleClick = () => {
    setIsWritingStarted(true);
  };

  return (
    <TweetPostContentContainer>
      <TweetPostTextWrapper
        ref={textAreaRef}
        height={textAreaHeight}
        value={currentValue}
        placeholder="What's happening?"
        rows={1}
        defaultValue=""
        onClick={handleClick}
        onChange={(e) => {
          setCurrentValue(e.target.value);
        }}
      />
      <TweetPostPermissionWrapper isWritingStarted={isWritingStarted}>
        {/* TODO: permission에 따라 내용 바뀌도록 */}
        <PermissionButton iconType={BasicType.EARTH}>
          Everyone can reply
        </PermissionButton>
      </TweetPostPermissionWrapper>
      <TweetPostToolBarWrapper>
        <TweetPostToolBar />
      </TweetPostToolBarWrapper>
    </TweetPostContentContainer>
  );
};

export default TweetPostContent;
