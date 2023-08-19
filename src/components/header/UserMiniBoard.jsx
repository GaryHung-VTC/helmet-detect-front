import {
  Button,
  Menu,
  MenuItem,
  MenuDivider,
  Avatar,
  Center,
  MenuList,
  MenuButton,
} from "@chakra-ui/react";

import { shallow } from "zustand/shallow";

import useAuthStore from "../../hooks/auth";

const UserMiniBoard = () => {
  const { setSignOut } = useAuthStore(
    ({ setSignOut }) => ({ setSignOut }),
    shallow
  );

  const userProfile = useAuthStore((state) => state.profile);

  const onLogout = () => {
    setSignOut();
    window.location.reload();
  };

  const profilePic = "https://avatars.dicebear.com/api/male/username.svg";

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar size={"sm"} src={profilePic} />
      </MenuButton>
      <MenuList alignItems={"center"}>
        <br />
        <Center>
          <Avatar size={"2xl"} src={profilePic} />
        </Center>
        <br />
        <Center>
          <p>{userProfile?.email}</p>
        </Center>
        <MenuDivider />
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMiniBoard;
