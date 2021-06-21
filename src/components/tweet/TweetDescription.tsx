import styled from 'styled-components';
import ProfileImage from 'components/base/ProfileImage';
import Tweet from 'models/tweet';
import { ColorPalette } from 'utils/colorUtils';
import TweetMainCenter from './TweetMainCenter';
import { TweetMainTopDescription } from './TweetMainTop';

const TweetContainer = styled.div`
  display: flex;
  padding: 10px 2px 20px;
  margin: 0px 9px;
  border-bottom: 3px solid ${ColorPalette.GRAY_E6};
`;

const TweetSideContainer = styled.div`
  display: flex;
  justify-content: center;

  width: 60px;
`;

const TweetProfileWrapper = styled.div`
  display: flex;
  width: 50px;
  height: 50px;

  margin: 1px;

  justify-content: center;
  align-items: center;
`;

const TweetMainContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

  margin-right: 2px;

  display: inline-block;
  vertical-align: top;
`;

interface TweetDescriptionProps {
  tweet: Tweet;
}

const TweetDescription: React.FC<TweetDescriptionProps> = (props) => {
  const { tweet } = props;

  return (
    <TweetContainer>
      <TweetSideContainer>
        <TweetProfileWrapper>
          <ProfileImage userid={tweet.writer_id} username={tweet.writer_id} />
        </TweetProfileWrapper>
      </TweetSideContainer>
      <TweetMainContainer>
        <TweetMainTopDescription tweet={tweet} />
        <TweetMainCenter tweet={tweet} />
      </TweetMainContainer>
    </TweetContainer>
  );
};

export default TweetDescription;
