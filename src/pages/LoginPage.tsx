import React, { useEffect } from 'react';
import AuthApi from 'apis/AuthApi';
import useInput from 'hooks/useInput';
import Button from 'components/base/Button';
import { useAppDispatch, useAuthSelector, useHomeSelector } from 'hooks/redux';
import { login, logout, signup } from 'modules/auth';
import {
  createTweet,
  deleteTweet,
  dislikeTweet,
  fetchFeed,
  likeTweet,
} from 'modules/home';
import { Tweet } from 'models/tweet';

// TODO: SignUpPage 따로 만들것
const LoginPage: React.FC = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [username, onChangeUsername] = useInput('');
  const [tweetId, onChangeTweetId] = useInput('');
  const [tweetContent, onChangeTweetContent] = useInput('');

  const authStore = useAuthSelector();
  const homeStore = useHomeSelector();
  const dispatch = useAppDispatch();

  const { currentUser } = authStore;
  const { feed } = homeStore;

  const handleLogin = async () => {
    return dispatch(login({ user_id: id, password }));
  };

  const handleLogout = async () => {
    return dispatch(logout());
  };

  const handleSignup = async () => {
    return dispatch(signup({ user_id: id, password, username }));
  };

  const handleCurrentUser = async () => {
    AuthApi.instance
      .checkCurrentUser()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleCreateTweet = async () => {
    dispatch(createTweet({ content: tweetContent }));
  };

  const handleDeleteTweet = async () => {
    dispatch(deleteTweet(tweetId));
  };

  const handleFetchFeed = async () => {
    dispatch(fetchFeed());
  };

  const toggleLikeTweet = async (tweet: Tweet) => {
    console.log(tweet);
    if (tweet.like_flag) {
      dispatch(dislikeTweet(tweet.tweet_id));
    } else {
      dispatch(likeTweet(tweet.tweet_id));
    }
  };

  useEffect(() => {
    handleFetchFeed();
  }, []);

  useEffect(() => {
    console.log(feed);
  }, [feed]);

  return (
    <>
      <div>로그인 된 유저: {currentUser ? currentUser.user_id : '없음'}</div>
      <div>
        ID:
        <input type="text" value={id} onChange={onChangeId} />
      </div>
      <div>
        Password:
        <input type="password" value={password} onChange={onChangePassword} />
      </div>
      <div>
        Username:
        <input type="text" value={username} onChange={onChangeUsername} />
      </div>
      <Button onClick={handleLogin}>로그인</Button>
      <Button onClick={handleLogout}>로그아웃</Button>
      <Button onClick={handleSignup}>회원가입</Button>
      <Button onClick={handleCurrentUser}>로그인상태</Button>
      <br />
      <div>
        작성할 트윗 내용:
        <input
          type="text"
          value={tweetContent}
          onChange={onChangeTweetContent}
        />
      </div>
      <div>
        삭제할 트윗 아이디:
        <input type="text" value={tweetId} onChange={onChangeTweetId} />
      </div>
      <Button onClick={handleCreateTweet}>트윗작성</Button>
      <Button onClick={handleDeleteTweet}>트윗삭제</Button>
      <Button onClick={handleFetchFeed}>피드 더 받기</Button>
      <>
        {feed.map((tweet) => (
          <React.Fragment key={tweet.tweet_id}>
            <div>
              {tweet.writer_id} {tweet.tweet_id}
            </div>
            <div>{tweet.content}</div>
            <Button onClick={() => toggleLikeTweet(tweet)}>
              {tweet.like_flag ? '좋아요 취소' : '좋아요'}
            </Button>
            <br />
          </React.Fragment>
        ))}
      </>
    </>
  );
};

export default LoginPage;
