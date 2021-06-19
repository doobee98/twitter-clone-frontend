import Icon from 'components/base/Icon';
import { useAppDispatch, useHomeSelector } from 'hooks/redux';
import { deleteTweet } from 'modules/home';
import Tweet from 'models/tweet';
import React from 'react';
import { BasicType } from 'utils/iconUtils';
import Dropdown, { DropdownItem } from '../base/Dropdown';

interface TweetMoreDropdownProps {
  tweet: Tweet;
}

const TweetMoreDropdown: React.FC<TweetMoreDropdownProps> = (props) => {
  const { tweet } = props;
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    // TODO?
    dispatch(deleteTweet(tweet.tweet_id));
  };

  return (
    <Dropdown>
      <DropdownItem onClick={handleDelete}>
        <Icon iconType={BasicType.CANCEL} />
        Delete this Tweet
      </DropdownItem>
    </Dropdown>
  );
};

export default TweetMoreDropdown;
