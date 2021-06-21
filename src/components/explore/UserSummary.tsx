import User from 'models/user';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';

const UserSummaryTextContainer = styled.div`
  width: 100%;
  padding: 8px 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  & > * + * {
    margin-top: 5px;
  }

  &:hover {
    background-color: ${ColorPalette.GRAY_F9};
    cursor: pointer;
  }
`;

const Username = styled.strong``;

const UserId = styled.span`
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
    <UserSummaryTextContainer onClick={goToUserProfile}>
      <Username>{user.username}</Username>
      <UserId>@{user.user_id}</UserId>
    </UserSummaryTextContainer>
  );
};

export default UserSummary;
