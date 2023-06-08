//전역 상태를 관리하기 위한 코드

import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); //로그인 여부를 판별하기 위한 상태변수
  const [userId, setUserId] = useState(null);
  
  // 임시 전역 변수 사용...
  const [memoryId, setMemoryId] = useState(null);

  return (
    <UserContext.Provider value={
      {
        user, setUser,
        userId, setUserId,
        memoryId, setMemoryId,
      }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

export default UserContext;
