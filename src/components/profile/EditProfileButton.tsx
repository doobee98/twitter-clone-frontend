import styled from 'styled-components';
import Button from 'components/base/Button';
import { useRootDispatch } from 'hooks/redux';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';
import User from 'models/user';
import { modalActions } from 'modules/modal';

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
  const dispatch = useRootDispatch();

  const openModal = () => {
    dispatch(modalActions.openEditModal(user));
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
