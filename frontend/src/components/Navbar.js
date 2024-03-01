import React from 'react'
import { useNavigate, useLocation} from 'react-router-dom';
import {Flex, Box, Heading, Text, Button, Spacer, HStack, useDisclosure, keyframes} from "@chakra-ui/react"
import {HamburgerIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'


const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const animationKeyframes1 = keyframes`
        0% { transform: scale(1) rotate(0);}
        25% { transform: scale(1.5) rotate(0);}
        50% { transform: scale(1.5) rotate(270deg);}
        75% { transform: scale(1) rotate(270deg);}
        100% { transform: scale(1) rotate(0);}
        `;

    const animationKeyframes2 = keyframes`
        100%{ transform: scale(1.5) rotate(0);}
        `;

    const animation1 = `${animationKeyframes1} 2s ease-in-out infinite`;
    const animation2 = `${animationKeyframes2} 1s ease-in-out forwards`;

    const goHome = () =>{
        navigate('/')
    }
    return(
        <>
        <Box display="flex" flexDir="row" as="nav" p="20px" alignItems="center" pl="40px" pr="40px" justifyContent="center">
        {location.pathname == '/' ||  (
            <Box
            _hover={{
                    animation: `${animation1}`,
                    color: "white",
                    transform: "rotate(0.5turn)",
                }}
            >
            <HamburgerIcon color="purple.300" boxSize={10} onClick={onOpen} cursor="pointer" _hover={{color: "white"}}/>
            </Box>
        )}
        <Drawer placement='left' onClose={onClose} isOpen={isOpen} size="xs">
            <DrawerOverlay />
            <DrawerContent>
            <DrawerHeader bgColor='rgb(30, 30, 31)' color="purple.300">Genres</DrawerHeader>
            <DrawerBody bgColor='rgb(30, 30, 31)' color="purple.300" display="flex" flexDir="column" gap="30px">
                <Button>Action</Button>
                <Button>Shooter</Button>
                <Button>Hentai</Button>
                <Button>RPG</Button>
                <Button>Puzzle</Button>
                <Button>Racing</Button>
            </DrawerBody>
            </DrawerContent>
        </Drawer>
            <Spacer/>
            <Box _hover={{
                    animation: `${animation2}`,
                    color: "white"
                }}>
            <Heading size='xl' color="purple.300" cursor="pointer" paddingLeft="110px" _hover={{color: "white"}} onClick={() => goHome()}>Game Hub</Heading>
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

