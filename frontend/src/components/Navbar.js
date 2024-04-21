import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Button,
  Spacer,
  HStack,
  keyframes,
  useToast,
} from "@chakra-ui/react";
import "@fontsource-variable/orbitron";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const pageStyles = {
  fontFamily: `'Orbitron Variable', sansSerif`,
  backgroundColor: "black",
};

const Navbar = () => {
  const [username, setUsername] = useState(null); // State to store the username
  const [popup, setPopup] = useState(false);
  const [popupFailed, setPopupFailed] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in using cookies
    const token = Cookies.get("jwt");
    console.log(token);
    if (token) {
      // If token exists, decode it to get user information
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.username);
      console.log(username);
    }
  }, []); // Empty dependency array means this effect will run only once after the component mounts

  const animationKeyframes2 = keyframes`
        100%{ transform: scale(1.1) rotate(0);}
    `;

  const animation2 = `${animationKeyframes2} forwards`;

  const goLogout = async () => {
    try {
      const response = await fetch("http://localhost:3500/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        withCredentials: true,
      });
      if (response.ok) {
        setPopup(true);
      } else {
        // Registration failed, handle error
        setPopupFailed(true);
        console.error("logout failed:", response.statusText);
        // Optionally, show an error message to the user
      }
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  useEffect(() => {
    if (popup) {
      toast({
        title: "Logged out",
        description: "You have successfully logged out",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      window.location.reload();
      setPopup(false); // Reset popup state after displaying toast
    }
  }, [popup]);

  useEffect(() => {
    if (popupFailed) {
      toast({
        title: "Error",
        description: "There was an error",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setPopupFailed(false); // Reset popup state after displaying toast
    }
  }, [popupFailed]);

  const goHome = () => {
    navigate("/");
  };

  const goLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <Box
        display="flex"
        flexDir="row"
        as="nav"
        p="20px"
        alignItems="center"
        pl="40px"
        pr="40px"
        justifyContent="center"
        style={pageStyles}
      >
        <Spacer />
        <Box
          position="absolute"
          _hover={{
            animation: `${animation2}`,
            color: "white",
          }}
        >
          <Heading
            size="xl"
            color="white"
            cursor="pointer"
            padding="100"
            style={{ fontFamily: `'Orbitron Variable', sansSerif` }}
            _hover={{ color: "white" }}
            onClick={() => goHome()}
          >
            Game Hub
          </Heading>
        </Box>
        <Spacer />
        <Box>
          <HStack spacing="20px">
            <Text color="white" fontSize="xl">
              Cart
            </Text>
            {username ? (
              <Text
                color="white"
                fontSize="xl"
                cursor="pointer"
                onClick={() => goLogout()}
              >
                Logout
              </Text>
            ) : (
              <Button
                colorScheme="white"
                fontSize="xl"
                cursor="pointer"
                onClick={() => goLogin()}
              >
                Login
              </Button>
            )}
          </HStack>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
