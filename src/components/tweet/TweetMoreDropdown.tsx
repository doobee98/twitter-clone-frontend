import Icon from 'components/base/Icon';
import { useRootDispatch } from 'hooks/redux';
import { homeActions } from 'modules/home';
import Tweet from 'models/tweet';
import React from 'react';
import { BasicType } from 'utils/iconUtils';
import Dropdown, { DropdownItem } from '../base/Dropdown';

interface TweetMoreDropdownProps {
  tweet: Tweet;
}

const TweetMoreDropdown: React.FC<TweetMoreDropdownProps> = (props) => {
  const { tweet } = props;
  const dispatch = useRootDispatch();

  const handleDelete = () => {
    // TODO?
    dispatch(homeActions.deleteTweet(tweet.tweet_id));
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
