import ExploreSideBar from './ExploreSideBar';
import NavigationSideBar from './NavigationSideBar';

const PageTemplate: React.FC = (props) => {
  const { children } = props;

  return (
    <>
      <NavigationSideBar />
      {children}
      <ExploreSideBar />
    </>
  );
};

export default PageTemplate;
