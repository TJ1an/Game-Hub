import {Box, Flex, Heading,Button} from '@chakra-ui/react'
import { ScaleFade} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import {Navbar, ImageSlider} from '../components'
import '../styles/styles.css'
import gta5 from '../assets/gta5.jpg';
import palworld from '../assets/palworld.png';
import cod from '../assets/cod.jpg'
import bgvideo from '../assets/bgvideo.mp4'

const IMAGES = [gta5, palworld, cod];

const Home = () => {
const navigate = useNavigate();

const pageStyles = {
  backgroundImage: `url(${bgvideo})`, // Directly reference the bgvideo variable
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
      <video
            autoPlay
            loop
            muted
            style={{
              position: 'absolute',
              zIndex: -1,
              width: '100%',
              height: '95%',
              objectFit: 'cover',
              marginTop: '-95px'
            }}
          >
            <source src={bgvideo} type="video/mp4" />
      </video>
      <Flex width="100%" textAlign="center" justifyContent="center">
      <Box className="typewriter">
        <Heading as="h1" color="white" marginBottom="20px" style={{ fontFamily: `'Orbitron Variable', sansSerif` }}>
          Games. Unlimited Games.
        </Heading>
        <Button bg="purple.300" color="white" onClick={goToGames} marginTop="20px" fontSize="2xl">
          Browse
        </Button>
      </Box>
      </Flex>
      </Box>
      <Box padding="50px" bgColor="black" marginTop="-80px" display="flex" flexDir="column" justifyContent="center" alignItems="center">
      <Heading color="white" marginBottom="40px" style={{ fontFamily: `'Orbitron Variable', sansSerif` }}>Cool games</Heading>
        <ImageSlider imageUrls={IMAGES}/>
      </Box>
      </Box>
    </ScaleFade>
    </>
  );
}

export default Home;