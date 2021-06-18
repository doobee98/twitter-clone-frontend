import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';
import { BasicType } from 'utils/iconUtils';
import Button from 'components/base/Button';
import Icon from 'components/base/Icon';
import TweetPostToolBar from './TweetPostToolBar';
import TweetPostText from './TweetPostText';
import useInput from '../../hooks/useInput';

const TweetPostContentContainer = styled.div`
  float: left;
  padding-top: 4px;
  width: 90%;
`;

const TweetPostTextAreaWrapper = styled.div`
  height: auto;
`;

interface TweetPostMediaWrapperProps {
  isUploaded: boolean;
}

const TweetPostMediaWrapper = styled.div<TweetPostMediaWrapperProps>`
  margin-bottom: 15px;
  height: 300px;
  display: none;

  ${(props) =>
    props.isUploaded &&
    css`
      display: block;
    `}
`;

const TweetPostImgPreview = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 16px;
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

const PermissionButton = styled(Button)`
  color: ${ColorPalette.SKYBLUE};
  margin: 0px;
  padding: 2px 5px;

  &:hover {
    background-color: ${hexToRgbA(ColorPalette.SKYBLUE, 0.1)};
  }
`;

const PermissionButtonText = styled.div`
  margin-left: 6.5px;
  font-size: 13px;
  font-weight: bold;
`;

const TweetPostToolBarWrapper = styled.div`
  display: flex;
  margin: 0px 2px;
  width: 100%;
  height: 52px;
`;

const ButtonWrapper = styled.div`
  float: left;
  align-items: center;
  justify-content: center;
  width: 15%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  shape-outside: inset(calc(100% - 100px) 0 0);
`;

const TweetButton = styled(Button)`
  float: right;
  width: 70px;
  color: ${ColorPalette.WHITE};
  background-color: ${ColorPalette.SKYBLUE};
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: ${ColorPalette.SKYBLUE_DARK};
  }
`;

interface TweetPostContentProps {
  onPost: (content: string) => void;
}

const TweetPostContent: React.FC<TweetPostContentProps> = (props) => {
  const { onPost } = props;

  const [isWritingStarted, setIsWritingStarted] = useState(false);
  const [textAreaHeight, setTextAreaHeight] = useState('auto');
  const [file, setFile] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
  const [tweetContent, onChangeTweetContent, setTweetContent] = useInput('');
  const [hasTweetContent, setHasTweetContent] = useState(false);

  const permissions = [
    {
      id: 0,
      description: 'Everyone can reply',
      iconType: BasicType.EARTH,
    },
    {
      id: 1,
      description: 'Only people you mention can reply',
      iconType: BasicType.AT,
    },
    {
      id: 2,
      description: 'People you follow can reply',
      iconType: BasicType.FRIENDS,
    },
  ];
  const [permissionIndex, setPermissionIndex] = useState(0);

  const changePermission = () => {
    setPermissionIndex((permissionIndex + 1) % permissions.length);
  };

  //   Not work
  const handleImgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(URL.createObjectURL(e.target.files[0]) || '');
      setIsUploaded(true);
      setIsWritingStarted(true);
    }
  };

  const clearTweetPost = () => {
    setTweetContent('');
    setTextAreaHeight('0px');
    setFile('');
    setIsUploaded(false);
    setIsWritingStarted(false);
  };

  const handleCreatePost = () => {
    onPost(tweetContent);
    clearTweetPost();
  };

  useEffect(() => {
    setHasTweetContent(tweetContent.length > 0);
  }, [tweetContent]);

  return (
    <TweetPostContentContainer>
      <TweetPostTextAreaWrapper>
        <TweetPostText
          tweetContent={tweetContent}
          textAreaHeight={textAreaHeight}
          onChangeTweetContent={onChangeTweetContent}
          setIsWritingStarted={setIsWritingStarted}
          setTextAreaHeight={setTextAreaHeight}
          clearTweetPost={clearTweetPost}
        />
      </TweetPostTextAreaWrapper>
      <TweetPostMediaWrapper isUploaded={isUploaded}>
        {file && <TweetPostImgPreview src={file} alt="input_img" />}
      </TweetPostMediaWrapper>
      <TweetPostPermissionWrapper
        isWritingStarted={isWritingStarted}
        onClick={changePermission}
      >
        <PermissionButton>
          <Icon
            iconType={permissions[permissionIndex].iconType}
            iconSize={25}
          />
          <PermissionButtonText>
            {permissions[permissionIndex].description}
          </PermissionButtonText>
        </PermissionButton>
      </TweetPostPermissionWrapper>
      <TweetPostToolBarWrapper>
        <TweetPostToolBar handleImgInput={handleImgInput} />
        <ButtonWrapper>
          <TweetButton onClick={handleCreatePost} disabled={!hasTweetContent}>
            Tweet
          </TweetButton>
        </ButtonWrapper>
      </TweetPostToolBarWrapper>
    </TweetPostContentContainer>
  );
};

export default TweetPostContent;
