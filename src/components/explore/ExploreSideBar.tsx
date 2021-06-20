import { ContentHeader, ContentSection } from 'components/base/ContentTemplate';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import useInput from 'hooks/useInput';
import { searchUser } from 'modules/userRecord';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import UserSummary from './UserSummary';

const SearchItem = styled(ContentSection)`
  padding: 0;
`;

const ExploreSideBar: React.FC = () => {
  const searchResult = useAppSelector((state) => state.userRecord.searchResult);
  const [keyword, onChangeKeyword] = useInput('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!keyword) {
      return;
    }

    dispatch(searchUser(keyword));
  }, [keyword]);

  return (
    <>
      <ContentHeader>
        <input value={keyword} onChange={onChangeKeyword} />
      </ContentHeader>
      {searchResult.map((user) => (
        <SearchItem key={user.user_id}>
          <UserSummary user={user} />
        </SearchItem>
      ))}
      <ContentSection />
    </>
  );
};

export default ExploreSideBar;
