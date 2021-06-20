import { useEffect, useRef, useState } from 'react';
import useClickOutside from 'hooks/useClickOutside';
import { useAppDispatch, useModalOpen } from 'hooks/redux';
import { closeEditModal, closePostModal } from 'modules/modal';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';
import styled from 'styled-components';
import Button from 'components/base/Button';
import Icon from 'components/base/Icon';
import { BasicType } from 'utils/iconUtils';
import useInput from 'hooks/useInput';
import User from 'models/user';
import PopupBackground from './PopupBackground';
import Modal from './Modal';

const EditProfileModalHeaderWrapper = styled.div`
  border-bottom: 1px solid ${hexToRgbA(ColorPalette.BLACK, 0.2)};
  margin-bottom: 10px;
  height: 50px;
`;

const EditPorfileHeader = styled.h2`
  display: inline-block;
  position: relative;

  left: 10px;
`;

const CloseButton = styled(Button)`
  display: inline-block;
  position: relative;

  width: 48px;
  height: 48px;
  margin-top: 4px;
  color: ${ColorPalette.SKYBLUE};

  &:hover {
    background-color: ${hexToRgbA(ColorPalette.SKYBLUE, 0.1)};
  }
`;

interface EditProfileModalHeaderProps {
  onClose: () => void;
}

const EditProfileModalHeader: React.FC<EditProfileModalHeaderProps> = (
  props,
) => {
  const { onClose } = props;
  return (
    <EditProfileModalHeaderWrapper onClick={onClose}>
      <CloseButton>
        <Icon iconType={BasicType.CLOSE} iconSize={20} />
      </CloseButton>
      <EditPorfileHeader>Edit Profile</EditPorfileHeader>
    </EditProfileModalHeaderWrapper>
  );
};

const EditProfileModalContentWrapper = styled.div`
  margin-bottom: 10px;
  text-align: center;
  & :last-child {
    border: none;
  }
`;

const InputWrapper = styled.div`
  text-align: left;
  display: inline-block;
  width: 550px;

  outline: none;
  border: 2px solid ${ColorPalette.GRAY_E6};
  border-radius: 10px;
  font-size: 18px;
  margin-top: 20px;

  &:focus-within {
    box-shadow: 0 0 0 2pt ${ColorPalette.SKYBLUE};
  }
`;

const Label = styled.strong`
  display: inline-block;
  padding: 5px 10px 3px 10px;
  margin: 0;
  font-size: 18px;
  font-style: bold;
`;

const Input = styled.input`
  display: inline-block;
  width: 500px;
  padding: 10px;
  outline: none;
  border: 1px solid ${ColorPalette.GRAY_E6};
  border-radius: 3px;
  font-size: 18px;
`;

const BiographyText = styled.textarea`
  width: 500px;
  height: 120px;
  padding: 10px;
  margin: 0px;
  outline: none;
  border: 1px solid ${ColorPalette.GRAY_E6};
  border-radius: 3px;
  font-size: 18px;

  resize: none;

  font-size: 20px;
`;

const EditButton = styled(Button)`
  display: inline-block;
  color: ${ColorPalette.WHITE};
  background-color: ${ColorPalette.SKYBLUE};
  width: 550px;
  margin-top: 25px;
  font-size: 26px;
  font-weight: bold;

  &:hover {
    background-color: ${ColorPalette.SKYBLUE_DARK};
  }
`;

interface EditProfileModalContentProps {
  user: User;
  onCreateTweet: () => void;
}

const PostPopupModalContent: React.FC<EditProfileModalContentProps> = (
  props,
) => {
  const { user, onCreateTweet } = props;
  // initla- user -content
  const [name, onChangeName, setName] = useInput(user.username);
  const [biography, onChangeBiography, setBiography] = useInput(user.bio);
  const [location, onChangeLocation, setLocation] = useInput(user.location);
  const [website, onChangeWebsite, setWebsite] = useInput(user.website);

  const clearInput = () => {
    setName('');
    setBiography('');
    setLocation('');
    setWebsite('');
  };

  const onSubmit = () => {
    clearInput();
    onCreateTweet();
  };

  return (
    <EditProfileModalContentWrapper>
      <InputWrapper>
        <Label>Name</Label>
        <Input value={name} onChange={onChangeName} placeholder="Name" />
      </InputWrapper>
      <InputWrapper>
        <Label>Location</Label>
        <Input
          value={location}
          onChange={onChangeLocation}
          placeholder="Location"
        />
      </InputWrapper>
      <InputWrapper>
        <Label>Biography</Label>
        <BiographyText
          value={biography}
          onChange={onChangeBiography}
          placeholder="biography"
        />
      </InputWrapper>
      <InputWrapper>
        <Label>Website</Label>
        <Input
          value={website}
          onChange={onChangeWebsite}
          placeholder="Website"
        />
      </InputWrapper>

      <EditButton onClick={onSubmit}>Edit</EditButton>
    </EditProfileModalContentWrapper>
  );
};

interface EditBioModalProps {
  isOpened: boolean;
}

const EditBioModal: React.FC<EditBioModalProps> = (props) => {
  const { isOpened } = props;
  const popup = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const modalStore = useModalOpen();
  const { profileOwner: user } = modalStore;

  const initLock = async () => {
    document.body.style.paddingRight = ` ${
      window.innerWidth - document.documentElement.clientWidth
    }px`;
    document.body.style.overflowY = 'hidden';
  };

  const finishLock = () => {
    document.body.style.overflowY = 'unset';
    document.body.style.paddingRight = ` ${0}px`;
  };

  useEffect(() => {
    if (isOpened) initLock();
    else finishLock();
  }, [isOpened]);

  const closePopup = () => {
    dispatch(closeEditModal());
  };

  useClickOutside(popup, () => {
    closePopup();
  });

  if (!isOpened) return null;
  if (!user) return null;
  return (
    <PopupBackground>
      <Modal width={600}>
        <div ref={popup}>
          <EditProfileModalHeader onClose={closePopup} />
          <PostPopupModalContent user={user} onCreateTweet={closePopup} />
        </div>
      </Modal>
    </PopupBackground>
  );
};

export default EditBioModal;
