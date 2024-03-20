import React from 'react'
import { useNavigate} from 'react-router-dom';
import {Box, Heading, Text, Button, Spacer, HStack, keyframes} from "@chakra-ui/react"
import '@fontsource-variable/orbitron';

const pageStyles = {
    fontFamily: `'Orbitron Variable', sansSerif`,
    backgroundColor: 'black'
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

    const goLogin = () =>{
        navigate('/login')
    }
    return(
        <>
        <Box display="flex" flexDir="row" as="nav" p="20px" alignItems="center" pl="40px" pr="40px" justifyContent="center" style={pageStyles}>
            <Spacer/>
            <Box _hover={{
                    animation: `${animation2}`,
                    color: "white"
                }}>
            <Heading size='xl' color="white" cursor="pointer" paddingLeft="150px" style={{ fontFamily: `'Orbitron Variable', sansSerif` }} _hover={{color: "white"}} onClick={() => goHome()}>Game Hub</Heading>
            </Box>
            <Spacer/>
            <Box>
            <HStack spacing="20px">
                <Text color="white" fontSize='xl'>Cart</Text>
                <Button colorScheme='white' fontSize='xl' onClick={() => goLogin()}>Login</Button>
            </HStack>
            </Box>
        </Box>
        </>
    )
}


export default Navbar

