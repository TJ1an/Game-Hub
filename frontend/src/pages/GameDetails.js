import React, { useEffect, useState } from 'react';
import { SimpleGrid, Box, Heading, Flex, Card, CardBody, Stack, Image, Divider, CardFooter, Button, ButtonGroup, Input, Skeleton, VStack, StackDivider} from '@chakra-ui/react';
import { useLocation, useParams } from 'react-router-dom';
import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react'
import layeredWaves from '../assets/black.svg';
import { Navbar } from '../components';

const GameDetails = () =>{
    const [details, setDetails] = useState([]);
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const id = location.state.id;

const pageStyles = {
        backgroundImage: `url(${layeredWaves})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
};

const getGameDetails = async () => {
    try {
      const res = await fetch(`http://api.rawg.io/api/games/`+id+`?key=${process.env.REACT_APP_API_KEY}`);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await res.json();
      console.log(jsonData);
      setDetails(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error, show message to user, etc.
    }
}

useEffect(() => {
    getGameDetails();
}, [id])
    
    
return (
    <>
        <Box style={pageStyles} className='container'>
            <Navbar />
        {

        loading ?
        <>
        <SimpleGrid spacing={10} minChildWidth={350} p={10}>
        {[...Array(20)].map((index) => (
            <Skeleton key={index} height="350px" width="100%" borderRadius="10px"/>
        ))}
        </SimpleGrid>
        </> :
        <ScaleFade initialScale={0.8} in={!loading}>
            <VStack>
                <Card bgColor= 'rgb(30, 30, 31)'>
                    <CardBody bgColor= 'rgb(30, 30, 31)' borderTopLeftRadius="20px" borderTopRightRadius="20px" display="flex" justifyContent="center" alignItems="center">
                    <Box width="50%" height="50%">
                        <Image src={details.background_image}></Image>
                    </Box>
                    </CardBody>
                </Card>
            </VStack>
        </ScaleFade>
        }
        </Box>
    </>
)

}

export default GameDetails