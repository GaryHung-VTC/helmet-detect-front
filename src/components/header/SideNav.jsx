import useAuthStore from "../../hooks/auth";

import UserMiniBoard from "./UserMiniBoard";
import SignButtonSet from "./SignButtonSet";

const SideNav = () => {
  const isAuthenticated = useAuthStore(
    ({ isAuthenticated }) => isAuthenticated
  );

  return <>{isAuthenticated ? <UserMiniBoard /> : <SignButtonSet />}</>;
};

export default SideNav;
