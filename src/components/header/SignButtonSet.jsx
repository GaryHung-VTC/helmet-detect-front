import { Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const SignButtonSet = () => (
  <>
    <Button
      as={NavLink}
      to="/login"
      fontSize={"sm"}
      fontWeight={400}
      variant={"link"}
    >
      Sign In
    </Button>
    <Button
      as={NavLink}
      to="/register"
      display={{ base: "none", md: "inline-flex" }}
    >
      Sign Up
    </Button>
  </>
);

export default SignButtonSet;
