import User from 'models/user';
import styled from 'styled-components';
import { hexToRgbA, ColorPalette } from 'utils/colorUtils';
import Profile from '../base/Profile';
import FollowButton from './FollowButton';

const ProfileHeaderContainer = styled.div`
  width: 106%;
  margin-left: -3%;
  margin-right: -3%;
`;

const ProfileUpperBackground = styled.div`
  display: absolute;
  width: auto;
  height: 200px;
  background-color: ${hexToRgbA(ColorPalette.BLACK, 0.4)};
`;

// TODO : After Profile Size Refactor
const ProfileImageWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  left: 10px;
  top: 140px;

  background-color: ${ColorPalette.GREEN};
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
  isMine: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = (props) => {
  const { user, isMine } = props;

  return (
    <ProfileHeaderContainer>
      <ProfileUpperBackground>
        <ProfileImageWrapper />
        <ProfileTooltipContainer>
          <PorfileTooltipItem>
            {!isMine && <FollowButton user={user} />}
          </PorfileTooltipItem>
          <PorfileTooltipItem>
            {!isMine && <FollowButton user={user} />}
          </PorfileTooltipItem>
        </ProfileTooltipContainer>
      </ProfileUpperBackground>
    </ProfileHeaderContainer>
  );
};

export default ProfileHeader;
