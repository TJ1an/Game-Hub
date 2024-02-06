import React from 'react'
import {Flex, Box, Heading, Text, Button, Spacer, HStack} from "@chakra-ui/react"

function Navbar(){
    return(
        <Flex as="nav" p="20px" alignItems="center" pl="40px" pr="40px">
            <Heading as="h1" color="purple.300">Game Hub</Heading>
            <Spacer/>
            <HStack spacing="20px">
                <Text color="purple.300">Cart</Text>
                <Button colorScheme='purple'>Logout</Button>
            </HStack>
        </Flex>
    )
}

export default Navbar

