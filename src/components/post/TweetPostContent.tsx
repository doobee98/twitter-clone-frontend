import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';
import { BasicType } from 'utils/iconUtils';
import NavItem from '../base/NavItem';
import Button from '../base/Button';
import TweetPostToolBar from './TweetPostToolBar';
import useInput from '../../hooks/useInput';
import { useAppDispatch } from '../../hooks/redux';
import { createTweet } from '../../modules/home';

const TweetPostContentContainer = styled.div`
  float: left;
  padding-top: 4px;
  width: 90%;
`;

const TweetPostTextAreaWrapper = styled.div`
  height: auto;
`;

interface TweetPostTextAreaProps {
  height: string;
}

const TweetPostTextArea = styled.textarea<TweetPostTextAreaProps>`
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

const TweetPostContent: React.FC = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [textAreaHeight, setTextAreaHeight] = useState('auto');
  const [isWritingStarted, setIsWritingStarted] = useState(false);
  const [file, setFile] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
  const [tweetContent, onChangeTweetContent, setTweetContent] = useInput('');
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    setTextAreaHeight(`${textAreaRef.current?.scrollHeight}px`);
  }, [tweetContent]);

  const handleClick = () => {
    setIsWritingStarted(true);
  };
  const changePermission = () => {
    setPermissionIndex((permissionIndex + 1) % permissions.length);
  };
  const onTweetTextChange = (event: React.ChangeEvent) => {
    setTextAreaHeight('auto');
    onChangeTweetContent(event as React.ChangeEvent<HTMLInputElement>);
  };
  const handleImgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(URL.createObjectURL(e.target.files[0]) || '');
      setIsUploaded(true);
      setIsWritingStarted(true);
    }
  };

  const handleCreateTweet = async () => {
    dispatch(createTweet({ content: tweetContent, image_src_list: [file] }));

    setTweetContent('');
    setTextAreaHeight('auto');
    setFile('');
    setIsUploaded(false);
    setIsWritingStarted(false);
  };

  return (
    <TweetPostContentContainer>
      <TweetPostTextAreaWrapper>
        <TweetPostTextArea
          ref={textAreaRef}
          height={textAreaHeight}
          value={tweetContent}
          placeholder="What's happening?"
          rows={1}
          defaultValue=""
          onClick={handleClick}
          onChange={onTweetTextChange}
        />
      </TweetPostTextAreaWrapper>
      <TweetPostMediaWrapper isUploaded={isUploaded}>
        {file && <TweetPostImgPreview src={file} alt="input_img" />}
      </TweetPostMediaWrapper>
      <TweetPostPermissionWrapper
        isWritingStarted={isWritingStarted}
        onClick={changePermission}
      >
        <PermissionButton iconType={permissions[permissionIndex].iconType}>
          {permissions[permissionIndex].description}
        </PermissionButton>
      </TweetPostPermissionWrapper>
      <TweetPostToolBarWrapper>
        <TweetPostToolBar handleImgInput={handleImgInput} />
        <ButtonWrapper>
          <TweetButton onClick={handleCreateTweet}> Tweet </TweetButton>
        </ButtonWrapper>
      </TweetPostToolBarWrapper>
    </TweetPostContentContainer>
  );
};

export default TweetPostContent;
