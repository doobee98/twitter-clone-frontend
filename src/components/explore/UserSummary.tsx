import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import User from 'models/user';
import { ColorPalette } from 'utils/colorUtils';
import ProfileImage from 'components/base/ProfileImage';

const UserSummaryContainer = styled.div`
  width: 100%;
  padding: 8px 16px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  & > * + * {
    margin-top: 5px;
  }
`;

const TextContainer = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;

const Username = styled.strong``;

const UserId = styled.span`
  margin-top: 3px;
  color: ${ColorPalette.GRAY_70};
`;

interface UserSummaryProps {
  user: User;
}

const UserSummary: React.FC<UserSummaryProps> = (props) => {
  const { user } = props;
  const history = useHistory();

  const goToUserProfile = () => {
    history.push(`/${user.user_id}`);
  };

  return (
    <UserSummaryContainer onClick={goToUserProfile}>
      <ProfileImage userid={user.user_id} username={user.username} size={40} />
      <TextContainer>
        <Username>{user.username}</Username>
        <UserId>@{user.user_id}</UserId>
      </TextContainer>
    </UserSummaryContainer>
  );
};

export default UserSummary;
