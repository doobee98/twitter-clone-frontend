import PageTemplate from 'components/base/PageTemplate';

const HomePage: React.FC = () => {
  return (
    <PageTemplate title="Home">
      <div>Temporary Home Page</div>
      <div
        style={{
          height: '200vh',
          border: `2px solid #1da0f2`,
          margin: '20px',
        }}
      >
        Big-Size Block (For Scroll Test)
      </div>
    </PageTemplate>
  );
};

export default HomePage;
