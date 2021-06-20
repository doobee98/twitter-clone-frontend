import styled from 'styled-components';
import useTitle from 'hooks/useTitle';
import EditBioModal from 'components/modal/EditProfileModal';
import NavigationSideBar from './NavigationSideBar';
import PostPopupModal from '../modal/PostPopupModal';
import ReplyPopupModal from '../modal/PostReplyModal';
import { useModalOpen } from '../../hooks/redux';

const PageTemplateContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const NavigationSideBarWrapper = styled.div`
  position: sticky;
  top: 0;
  padding: 0 12px;
  overflow-y: auto;
  max-height: 100vh;
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 0;

  display: flex;
  flex-direction: row-reverse;
`;

const ContentWrapper = styled.main`
  position: relative;
  margin-right: 10px;
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;

  display: flex;
`;

interface PageTemplateProps {
  title: string;
}

const PageTemplate: React.FC<PageTemplateProps> = (props) => {
  const { children, title } = props;

  const modalStore = useModalOpen();
  const { isOpenedPostModal, isOpenedReplyModal, isOpenedEditModal } =
    modalStore;

  useTitle(`${title} / Twitter-Clone`);

  return (
    <PageTemplateContainer>
      <NavigationSideBarWrapper>
        <NavigationSideBar />
      </NavigationSideBarWrapper>
      <ContentWrapper>{children}</ContentWrapper>
      <PostPopupModal isOpened={isOpenedPostModal} />
      <ReplyPopupModal isOpened={isOpenedReplyModal} />
      <EditBioModal isOpened={isOpenedEditModal} />
    </PageTemplateContainer>
  );
};

export default PageTemplate;
