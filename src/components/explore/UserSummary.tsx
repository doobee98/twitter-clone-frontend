import User from 'models/user';
import styled from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';

const UserSummaryTextContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  & > * + * {
    margin-top: 5px;
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

  return (
    <UserSummaryTextContainer>
      <Username>{user.username}</Username>
      <UserId>@{user.user_id}</UserId>
    </UserSummaryTextContainer>
  );
};

export default UserSummary;
