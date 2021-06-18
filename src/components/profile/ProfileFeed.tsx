import { useEffect } from 'react';
import { useProfileSelector } from 'hooks/redux';

const ProfileFeed: React.FC = () => {
  const feed = useProfileSelector((state) => state.feed);

  // TO BE REMOVED (test output)
  useEffect(() => {
    console.log(feed);
  }, [feed]);

  return <strong>ProfileFeed Proto</strong>;
};

export default ProfileFeed;
