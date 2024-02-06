import {Box, Flex, Text, Heading, Spacer, Button, Center} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import {Navbar} from '../components'
import layeredWaves from '../assets/layered-waves-haikei.svg';
import '../styles/styles.css'

function Home() {
const navigate = useNavigate();

const pageStyles = {
    backgroundImage: `url(${layeredWaves})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
};

const goToGames = () =>{
  navigate('/games')
}


  return (
    <>
      <Box style={pageStyles}>
        <Box opacity={1}>
          <Navbar />
        </Box>
        <Spacer />
        <Flex alignItems="center" justifyContent="center">
          <Box className="typewriter">
            <Heading
              as="h1"
              color="purple.300"
              style={{ marginTop: '50%', marginBottom: '20px' }}
            >
              Games. Unlimited Games.
            </Heading>
            <Flex alignItems="center" justifyContent="center">
              <Button bg="purple.300" color="white" onClick={goToGames}>
                Browse
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default Home;