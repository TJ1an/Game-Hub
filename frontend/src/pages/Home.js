import {Box, Flex, Text, Heading, Spacer, Button, Center} from '@chakra-ui/react'
import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import {Navbar} from '../components'
import layeredWaves from '../assets/black-waves.svg';
import '../styles/styles.css'

const Home = () => {
const navigate = useNavigate();

const pageStyles = {
    backgroundImage: `url(${layeredWaves})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '94vh',
}

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
      <Flex width="100%" textAlign="center" justifyContent="center">
      <Box className="typewriter">
        <Heading as="h1" color="purple.300" marginBottom="20px">
          Games. Unlimited Games.
        </Heading>
        <Button bg="purple.300" color="white" onClick={goToGames} marginTop="20px" fontSize="2xl">
          Browse
        </Button>
      </Box>
      </Flex>
      </Box>
      </Box>
    </ScaleFade>
    </>
  );
}

export default Home;