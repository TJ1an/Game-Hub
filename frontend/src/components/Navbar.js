import React from 'react'
import { useNavigate, useLocation} from 'react-router-dom';
import {Flex, Box, Heading, Text, Button, Spacer, HStack, useDisclosure, keyframes} from "@chakra-ui/react"
import '@fontsource-variable/orbitron';

const pageStyles = {
    fontFamily: `'Orbitron Variable', sansSerif`
};

const Navbar = () => {
    const navigate = useNavigate();

    const animationKeyframes2 = keyframes`
        100%{ transform: scale(1.1) rotate(0);}
        `;

    const animation2 = `${animationKeyframes2} forwards`;

    const goHome = () =>{
        navigate('/')
    }
    return(
        <>
        <Box display="flex" flexDir="row" as="nav" p="20px" alignItems="center" pl="40px" pr="40px" justifyContent="center" style={pageStyles}>
            <Spacer/>
            <Box _hover={{
                    animation: `${animation2}`,
                    color: "white"
                }}>
            <Heading size='xl' color="purple.300" cursor="pointer" paddingLeft="170px" style={{ fontFamily: `'Orbitron Variable', sansSerif` }} _hover={{color: "white"}} onClick={() => goHome()}>Game Hub</Heading>
            </Box>
            <Spacer/>
            <Box>
            <HStack spacing="20px">
                <Text color="purple.300" fontSize='xl'>Cart</Text>
                <Button colorScheme='purple' fontSize='xl'>Logout</Button>
            </HStack>
            </Box>
        </Box>
        </>
    )
}


export default Navbar

