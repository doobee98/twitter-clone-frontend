import { useState } from 'react';
import styled from 'styled-components';
import Button from 'components/base/Button';
import { useRootDispatch } from 'hooks/redux';
import User from 'models/user';
import { userRecordActions } from 'modules/userRecord';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';

const Follow = styled(Button)`
  color: ${ColorPalette.SKYBLUE};
  font-weight: bold;
  border: 1px solid ${ColorPalette.SKYBLUE};

  &:hover {
    background-color: ${hexToRgbA(ColorPalette.SKYBLUE, 0.1)};
  }
`;

const Following = styled(Button)`
  color: ${ColorPalette.WHITE};
  font-weight: bold;
  width: 100px;
  border: 1px solid ${ColorPalette.SKYBLUE};
  background-color: ${ColorPalette.SKYBLUE};
`;

const Unfollow = styled(Button)`
  color: ${ColorPalette.WHITE};
  font-weight: bold;
  width: 100px;
  border: 1px solid ${ColorPalette.MAGENTA};
  background-color: ${ColorPalette.MAGENTA};
`;

interface FollowButtonProps {
  user: User;
}

const FollowButton: React.FC<FollowButtonProps> = (props) => {
  const { user } = props;
  const dispatch = useRootDispatch();
  const [isHover, setIsHover] = useState(false);

  if (!user) {
    return null;
  }

  const handleFollow = () => {
    dispatch(userRecordActions.followUser(user.user_id));
  };

  const handleUnfollow = () => {
    dispatch(userRecordActions.unfollowUser(user.user_id));
  };

  if (!user.following_flag) {
    return <Follow onClick={handleFollow}>Follow</Follow>;
  }

  return (
    <>
      {isHover ? (
        <Unfollow
          onClick={handleUnfollow}
          onHover={() => setIsHover(true)}
          onHoverOut={() => setIsHover(false)}
        >
          Unfollow
        </Unfollow>
      ) : (
        <Following
          onHover={() => setIsHover(true)}
          onHoverOut={() => setIsHover(false)}
        >
          Following
        </Following>
      )}
    </>
  );
};

export default FollowButton;
