import {Box, Flex, Heading, Button, Input} from '@chakra-ui/react'
import { ScaleFade} from '@chakra-ui/react'
import {useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom'
import {Navbar} from '../components'
import {
    FormControl,
    FormLabel,
    useToast
  } from '@chakra-ui/react';


const Register = () => {

const [user, setUser] = useState('');
const [pwd, setPwd] = useState('');
const [popup, setPopup] = useState(false);
const [popupFailed, setPopupFailed] = useState(false);

const toast = useToast();

const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch('http://localhost:3500/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'http://localhost:5000',
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify({ user, pwd }),
      credentials: 'include',
      withCredentials: true
    });

    if (response.ok) {
      setPopup(true);
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
      title: 'Account created.',
      description: "We've created your account for you.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    setPopup(false); // Reset popup state after displaying toast
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
      <Heading color="white"  style={{ fontFamily: `'Orbitron Variable', sansSerif` }}>Register</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl paddingBottom="20%" isRequired>
            <FormLabel color="white" fontSize ="xl">Email address</FormLabel>
            <Input
                    type='email'
                    color='white'
                    marginBottom='20px'
                    fontSize='l'
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder='Email address'
                    required
                  />
            <FormLabel color="white" fontSize ="xl" name="email">Password</FormLabel>
            <Input
                    type='password'
                    color='white'
                    fontSize='l'
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    placeholder='Password'
                    minLength = '8'
                    maxLength = '20'
                    required
                  />
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