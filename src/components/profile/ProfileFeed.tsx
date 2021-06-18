import { useAppSelector } from 'hooks/redux';
import { useEffect } from 'react';

const ProfileFeed: React.FC = () => {
  const feed = useAppSelector((state) => state.profile.feed);

  // TO BE REMOVED (test output)
  useEffect(() => {
    console.log(feed);
  }, [feed]);

  return <strong>ProfileFeed Proto</strong>;
};

export default ProfileFeed;