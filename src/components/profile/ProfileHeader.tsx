import User from 'models/user';
import styled from 'styled-components';
import { hexToRgbA, ColorPalette } from 'utils/colorUtils';
import { useAppDispatch } from 'hooks/redux';
import { openEditModal } from 'modules/modal';
import Profile from '../base/Profile';
import FollowButton from './FollowButton';
import EditBioButton from './EditBioButton';

const ProfileHeaderContainer = styled.div`
  width: 106%;
  margin-left: -3%;
  margin-right: -3%;
`;

const ProfileUpperBackground = styled.div`
  display: absolute;
  width: auto;
  height: 200px;
  background-color: ${ColorPalette.LIGHTERDARK};
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  left: 10px;
  top: 140px;
`;

const ProfileTooltipContainer = styled.div`
  position: relative;
  top: 40%;
  text-align: right;
`;

const PorfileTooltipItem = styled.div`
  display: inline-block;
  margin: 5px;
`;

interface ProfileHeaderProps {
  user: User;
  isCurrentUser: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = (props) => {
  const { user, isCurrentUser } = props;
  const dispatch = useAppDispatch();

  return (
    <ProfileHeaderContainer>
      <ProfileUpperBackground>
        <ProfileImageWrapper>
          <Profile size={120} username={user.username} userid={user.user_id} />
        </ProfileImageWrapper>
        <ProfileTooltipContainer>
          <PorfileTooltipItem>
            {isCurrentUser ? (
              <EditBioButton user={user} />
            ) : (
              <FollowButton user={user} />
            )}
          </PorfileTooltipItem>
        </ProfileTooltipContainer>
      </ProfileUpperBackground>
    </ProfileHeaderContainer>
  );
};

export default ProfileHeader;
