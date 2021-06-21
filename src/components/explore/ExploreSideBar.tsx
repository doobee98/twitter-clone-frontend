import { ContentHeader, ContentSection } from 'components/base/ContentTemplate';
import Icon from 'components/base/Icon';
import { useRootDispatch, useUserRecordSelector } from 'hooks/redux';
import { useDebouncePreset } from 'hooks/useDebounce';
import useInput from 'hooks/useInput';
import { userRecordActions } from 'modules/userRecord';
import React from 'react';
import styled from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';
import { BasicType } from 'utils/iconUtils';
import UserSummary from './UserSummary';

const SearchHeader = styled(ContentHeader)`
  margin-top: 15px;
  padding-bottom: 15px;
`;

const SearchIcon = styled(Icon)`
  position: absolute;
  left: 10%;
`;

const SearchBarInput = styled.input`
  font-size: 16px;
  border: 0;
  padding: 0 20px 0 50px;
  width: 100%;

  height: 100%;
  box-sizing: border-box;
  background: ${ColorPalette.GRAY_E6} 0% 0% no-repeat padding-box;
  width: 100%;
  height: 48px;
  border-radius: 30px;
  border: 1px solid ${ColorPalette.GRAY_E6};
  margin: 0 auto;

  &:focus {
    outline: none;
    background: ${ColorPalette.WHITE} 0% 0% no-repeat padding-box;
    border: 1px solid ${ColorPalette.SKYBLUE};
  }
`;

const SearchItem = styled(ContentSection)`
  padding: 0;
`;

const ExploreSideBar: React.FC = () => {
  const [keyword, onChangeKeyword] = useInput('');
  const searchResult = useUserRecordSelector((state) => state.searchResult);
  const dispatch = useRootDispatch();

  useDebouncePreset(
    () => {
      if (searchResult.length !== 0) {
        dispatch(userRecordActions.clearSearchResult());
      }
    },
    () => {
      if (!keyword) {
        return;
      }

      dispatch(userRecordActions.searchUser(keyword));
    },
    [keyword],
  );

  return (
    <>
      <SearchHeader>
        <SearchIcon iconType={BasicType.SEARCH} />
        <SearchBarInput value={keyword} onChange={onChangeKeyword} />
      </SearchHeader>
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
