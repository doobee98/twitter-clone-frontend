import useTitle from 'hooks/useTitle';
import ExploreSideBar from './ExploreSideBar';
import NavigationSideBar from './NavigationSideBar';

interface PageTemplateProps {
  title: string;
}

const PageTemplate: React.FC<PageTemplateProps> = (props) => {
  const { children, title } = props;

  useTitle(`${title} / Twitter-Clone`);

  return (
    <>
      <NavigationSideBar />
      {children}
      <ExploreSideBar />
    </>
  );
};

export default PageTemplate;
