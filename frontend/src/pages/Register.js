import {Box, Flex, Heading,Button, Input} from '@chakra-ui/react'
import { ScaleFade} from '@chakra-ui/react'
import { useNavigate} from 'react-router-dom'
import {Navbar} from '../components'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'


const Register = () => {

const navigate = useNavigate();

const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Here you can access the form fields and their values from event.target
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    // Now you can do something with the email and password, like sending them to a server
    console.log('Email:', email);
    console.log('Password:', password);
    // Optionally, you can navigate to another page after submitting the form
    goToGames();
  };

const pageStyles = {
  backgroundColor: 'black',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  fontFamily: `'Orbitron Variable', sansSerif`
};

const goToGames = () =>{
  navigate('/games')
}

return (
    <>
    <ScaleFade initialScale={0.8} in={true}>
      <Box style={pageStyles}>
      <Box opacity={1}>
          <Navbar />
      </Box>
      <Box style={pageStyles} display="flex" justifyContent="center" alignItems="center">
      <Flex width="100%" minWidth="50%" textAlign="center" justifyContent="center">
      <Box minWidth="40%">
      <Heading color="white"  style={{ fontFamily: `'Orbitron Variable', sansSerif` }}>Register</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl paddingBottom="20%" isRequired>
            <FormLabel color="white" fontSize ="xl">Email address</FormLabel>
            <Input type='email' color="white" marginBottom="20px" fontSize ="l" name="email"/>
            <FormLabel color="white" fontSize ="xl" name="email">Password</FormLabel>
            <Input type='password' color="white" fontSize ="l"/>
            <Button
            mt={8}
            colorScheme='white'
            type='submit'
            fontSize ="xl"
          >
            Submit
          </Button>
        </FormControl>
    </form>
      </Box>
      </Flex>
      </Box>
      </Box>
    </ScaleFade>
    </>
  );
}

export default Register;