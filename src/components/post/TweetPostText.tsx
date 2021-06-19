import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

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
  overflow: hidden;

  font-size: 20px;

  ${(props) =>
    css`
      height: ${props.height};
    `}
`;

interface TweetPostTextProps {
  tweetContent: string;
  textAreaHeight: string;
  placeholder?: string;
  onChangeTweetContent: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsWritingStarted: (isWriting: boolean) => void;
  setTextAreaHeight: (height: string) => void;
  clearTweetPost: () => void;
  initialRows?: number;
}

const TweetPostText: React.FC<TweetPostTextProps> = (props) => {
  const {
    tweetContent,
    initialRows,
    textAreaHeight,
    placeholder,
    setIsWritingStarted,
    onChangeTweetContent,
    setTextAreaHeight,
    clearTweetPost,
  } = props;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setTextAreaHeight(`${textAreaRef.current?.scrollHeight}px`);
    if (!tweetContent) clearTweetPost();
  }, [tweetContent]);

  const handleClick = () => {
    setIsWritingStarted(true);
  };

  const onTweetTextChange = (event: React.ChangeEvent) => {
    onChangeTweetContent(event as React.ChangeEvent<HTMLInputElement>);
    setTextAreaHeight('auto');
  };

  return (
    <TweetPostTextArea
      ref={textAreaRef}
      height={textAreaHeight}
      value={tweetContent}
      rows={initialRows ?? 1}
      placeholder={placeholder}
      onClick={handleClick}
      onChange={onTweetTextChange}
    />
  );
};

export default TweetPostText;
