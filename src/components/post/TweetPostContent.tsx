import React, { useEffect, useRef, useState } from 'react';
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

const TweetPostContent: React.FC = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [textAreaHeight, setTextAreaHeight] = useState('auto');
  const [currentValue, setCurrentValue] = useState('');
  const [isWritingStarted, setIsWritingStarted] = useState(false);
  const [file, setFile] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);

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
  }, [currentValue]);

  const handleClick = () => {
    setIsWritingStarted(true);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaHeight('auto');
    setCurrentValue(event.target.value);
  };

  const changePermission = () => {
    setPermissionIndex((permissionIndex + 1) % permissions.length);
  };

  const handleImgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(URL.createObjectURL(e.target.files[0]) || '');
      setIsUploaded(true);
      setIsWritingStarted(true);
    }
  };

  return (
    <TweetPostContentContainer>
      <TweetPostTextAreaWrapper>
        <TweetPostTextArea
          ref={textAreaRef}
          height={textAreaHeight}
          value={currentValue}
          placeholder="What's happening?"
          rows={1}
          defaultValue=""
          onClick={handleClick}
          onChange={handleValueChange}
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
      </TweetPostToolBarWrapper>
    </TweetPostContentContainer>
  );
};

export default TweetPostContent;
