import {Box, Flex, Text, Heading, Spacer, Button, Center} from '@chakra-ui/react'
import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import {Navbar, ImageSlider} from '../components'
import '../styles/styles.css'
import gta5 from '../assets/gta5.jpg';
import palworld from '../assets/palworld.png';

const IMAGES = [gta5, palworld];

const Home = () => {
const navigate = useNavigate();

const pageStyles = {
    backgroundColor: 'black',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    fontFamily: `'Orbitron Variable', sansSerif`
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
        <Heading as="h1" color="purple.300" marginBottom="20px" style={{ fontFamily: `'Orbitron Variable', sansSerif` }}>
          Games. Unlimited Games.
        </Heading>
        <Button bg="purple.300" color="white" onClick={goToGames} marginTop="20px" fontSize="2xl">
          Browse
        </Button>
      </Box>
      </Flex>
      </Box>
      <Box padding="50px" bgColor="black" marginTop="" display="flex" flexDir="column" justifyContent="center" alignItems="center">
      <Heading color="white">Cool games</Heading>
        <ImageSlider imageUrls={IMAGES}/>
      </Box>
      </Box>
    </ScaleFade>
    </>
  );
}

export default Home;