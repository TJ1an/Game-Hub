import React from 'react'
import { useNavigate } from 'react-router-dom';
import {Flex, Box, Heading, Text, Button, Spacer, HStack} from "@chakra-ui/react"

const Navbar = () => {

const goHome = () =>{
    navigate('/')
}

const navigate = useNavigate();
    return(
        <Flex as="nav" p="20px" alignItems="center" pl="40px" pr="40px">
            <Heading size='xl' color="purple.300" cursor="pointer" _hover="" onClick={() => goHome()}>Game Hub</Heading>
            <Spacer/>
            <HStack spacing="20px">
                <Text color="purple.300" fontSize='xl'>Cart</Text>
                <Button colorScheme='purple' fontSize='xl'>Logout</Button>
            </HStack>
        </Flex>
    )
}

export default Navbar

