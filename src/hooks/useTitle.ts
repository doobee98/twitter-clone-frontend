import { useEffect, useState } from 'react';

const defaultTitle = 'Twitter-Clone';

const useTitle = (newTitle?: string) => {
  const [title, setTitle] = useState(newTitle ?? defaultTitle);

  useEffect(() => {
    const $title = document.querySelector('title') as HTMLTitleElement;
    $title.innerText = title;
  }, [title]);

  return setTitle as typeof setTitle;
};

export default useTitle;
