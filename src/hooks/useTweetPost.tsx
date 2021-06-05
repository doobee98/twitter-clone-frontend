import React, { useEffect, useState } from 'react';
import { BasicType } from 'utils/iconUtils';

type permission = {
  id: number;
  selected: boolean;
  permission: string;
  iconType: BasicType;
};
const permissions: Array<permission> = [
  {
    id: 0,
    selected: true,
    permission: 'Everyone can reply',
    iconType: BasicType.EARTH,
  },
  {
    id: 1,
    selected: false,
    permission: 'Only people you mention can reply',
    iconType: BasicType.AT,
  },
  {
    id: 2,
    selected: false,
    permission: 'People you follow can reply',
    iconType: BasicType.FRIENDS,
  },
];

const useTweetPost = () => {
  const [permissionList, setPermissionList] = useState(permissions);
  const [selectedPermission, setSelectedPermission] = useState(0);

  useEffect(() => {
    const newPermissionList = permissionList.map((permission) => {
      if (permission.id !== selectedPermission)
        return { ...permission, selected: false };
      return { ...permission, selected: true };
    });
    setPermissionList(newPermissionList);
  }, [selectedPermission]);

  return {
    permissionList,
    selectedPermission,
    setPermissionList,
    setSelectedPermission,
  };
};

export default useTweetPost;
