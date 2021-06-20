import styled from 'styled-components';
import Button from 'components/base/Button';
import { useAppDispatch } from 'hooks/redux';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';
import User from 'models/user';
import { openEditModal } from 'modules/modal';

const EditProfile = styled(Button)`
  color: ${ColorPalette.SKYBLUE};
  font-weight: bold;
  border: 1px solid ${ColorPalette.SKYBLUE};

  &:hover {
    background-color: ${hexToRgbA(ColorPalette.SKYBLUE, 0.1)};
  }
`;

interface EditProfileButtonProps {
  user: User;
}

const EditProfileButton: React.FC<EditProfileButtonProps> = (props) => {
  const { user } = props;
  const dispatch = useAppDispatch();

  const openModal = () => {
    dispatch(openEditModal(user));
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <EditProfile onClick={openModal}>Edit Profile</EditProfile>
    </>
  );
};

export default EditProfileButton;
