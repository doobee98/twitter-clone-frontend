import Header from './Header';
import SideBar from './SideBar';

const PageTemplate: React.FC = (props) => {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
      <SideBar />
    </>
  );
};

export default PageTemplate;
