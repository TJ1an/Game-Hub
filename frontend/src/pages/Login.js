import {Box, Flex, Heading,Button, Input} from '@chakra-ui/react'
import { ScaleFade} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import {Navbar} from '../components'
import {useState, useEffect} from 'react';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import Cookies from 'js-cookie';
import {
    FormControl,
    FormLabel,
    useToast
  } from '@chakra-ui/react'


const Login = () => {

const [user, setUser] = useState('');
const [pwd, setPwd] = useState('');
const [popup, setPopup] = useState(false);
const [popupFailed, setPopupFailed] = useState(false);
const navigate = useNavigate();
const toast = useToast();

const handleSubmit = async(event) => {
  event.preventDefault();

  try {
    const response = await fetch('http://localhost:3500/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user, pwd }),
      credentials: 'include',
      withCredentials: true
    });

    if (response.ok) {
      setPopup(true);
      // Retrieve JWT token from cookies
      const jwtToken = Cookies.get('jwt');
      // Now you can use jwtToken in your code
      console.log(jwtToken);
    } else {
      // Registration failed, handle error
      setPopupFailed(true);
      console.error('Registration failed:', response.statusText);
      // Optionally, show an error message to the user
    }
  } catch (error) {
    console.error('Error during registration:', error.message);
    setPopupFailed(true);
    // Handle network error or other unexpected errors
  }
};

const pageStyles = {
  backgroundColor: 'black',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  fontFamily: `'Orbitron Variable', sansSerif`
};


useEffect(() => {
  if (popup) {
    toast({
      title: 'Logged In',
      description: "You have successfully logged in",
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    setPopup(false); // Reset popup state after displaying toast
    navigate('/')
    
  }
}, [popup]);

useEffect(() => {
  if (popupFailed) {
    toast({
      title: 'Error',
      description: "There was an error",
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
    setPopupFailed(false); // Reset popup state after displaying toast
  }
}, [popupFailed]);

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
      <Heading color="white"  style={{ fontFamily: `'Orbitron Variable', sansSerif` }}>Login</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl paddingBottom="20%" isRequired>
            <FormLabel color="white" fontSize ="xl">Email address</FormLabel>
            <Input 
              type='email' 
              color="white" 
              marginBottom="20px" 
              fontSize ="l" 
              name="emailLogin"
              onChange={(e) => setUser(e.target.value)}
              />
            <FormLabel color="white" fontSize ="xl" name="email">Password</FormLabel>
            <Input 
              type='password'
              color='white'
              fontSize='l'
              value={pwd}
              name = "passwordLogin"
              onChange={(e) => setPwd(e.target.value)}
              placeholder='Password'
              minLength = '8'
              maxLength = '20'
              required
              />
            <Box>
            </Box>
            <Button
            mt={8}
            colorScheme='white'
            type='submit'
            fontSize ="xl"
          >
            Submit
          </Button>
          <Box marginTop="50px">
            <ChakraLink as={ReactRouterLink} to='/register' color="white" fontSize ="l">
                No account? Click here to create one.
            </ChakraLink>
          </Box>
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

export default Login;