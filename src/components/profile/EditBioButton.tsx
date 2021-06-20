import { useState } from 'react';
import styled from 'styled-components';
import Button from 'components/base/Button';
import { useAppDispatch } from 'hooks/redux';
import { followUser, unfollowUser } from 'modules/userRecord';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';
import User from 'models/user';

const EditBio = styled(Button)`
  color: ${ColorPalette.SKYBLUE};
  font-weight: bold;
  border: 1px solid ${ColorPalette.SKYBLUE};

  &:hover {
    background-color: ${hexToRgbA(ColorPalette.SKYBLUE, 0.1)};
  }
`;

interface EditBioButtonProps {
  user: User;
}

const EditBioButton: React.FC<EditBioButtonProps> = (props) => {
  const { user } = props;
  const dispatch = useAppDispatch();

  if (!user) {
    return null;
  }

  return (
    <>
      <EditBio>Edit Biography</EditBio>
    </>
  );
};

export default EditBioButton;