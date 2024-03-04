import React, { useEffect, useState } from 'react';
import { SimpleGrid, Box, Heading, Card, CardBody, Image, Skeleton, Grid, Text, HStack} from '@chakra-ui/react';
import { useLocation, useParams } from 'react-router-dom';
import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react'
import layeredWaves from '../assets/black.svg';
import { Navbar } from '../components';
import '@fontsource-variable/orbitron';

const GameDetails = () =>{
    const [details, setDetails] = useState([]);
    const [movie, setMovie] = useState([])
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const id = location.state.id;

const pageStyles = {
        backgroundImage: `url(${layeredWaves})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
};

const getGameDetails = async () => {
    try {
        setLoading(true);
        const detailResponse = await fetch(`http://api.rawg.io/api/games/${id}?key=${process.env.REACT_APP_API_KEY}`);
        const movieResponse = await fetch(`http://api.rawg.io/api/games/${id}/movies?key=${process.env.REACT_APP_API_KEY}`);
        
        if (!detailResponse.ok || !movieResponse.ok) {
            throw new Error('Failed to fetch data');
        }

        const gameData = await detailResponse.json();
        const movieData = await movieResponse.json();

        console.log(gameData);
        console.log(movieData);
        
        setDetails(gameData);
        setMovie(movieData.results.slice(0, 1)); // Assuming movieData contains an array named results

        setLoading(false);
    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error, show message to user, etc.
    }
}

// Function to extract English text from a mixed-language string
const extractEnglishText = (mixedText) => {
    const englishText = mixedText.split('Español')[0];
    return englishText.trim();
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
            <Skeleton height="350px" width="100%" borderRadius="10px"/>
        </SimpleGrid>
        </> :
        <ScaleFade initialScale={0.8} in={!loading}>
        <Box display="flex" flexDirection="row" justifyContent="center">
        <Heading color="white" marginBottom="20px">{details.name}</Heading>
        </Box>
        <Grid templateColumns='repeat(2, 1fr)' gap={4} paddingBottom="50px">
                <Card bgColor= 'rgb(30, 30, 31)'>
                    <CardBody bgColor= 'rgb(30, 30, 31)' borderTopLeftRadius="20px" borderTopRightRadius="20px" display="flex" justifyContent="center" alignItems="center">\
                    <Box>
                        <Image src={details.background_image}></Image>
                    </Box>
                    </CardBody>
                </Card>
                <Card  bgColor= 'rgb(30, 30, 31)'>
                <CardBody>
                    {movie.map((movieItem, index) => (
                        <CardBody key={index} bgColor='rgb(30, 30, 31)' borderTopLeftRadius="20px" borderTopRightRadius="20px" display="flex" justifyContent="center" alignItems="center">
                            <Box>
                                <video controls width="100%" height="100%">
                                    <source src={movieItem.data['max']} type="video/mp4" />
                                </video>
                            </Box>
                        </CardBody>
                    ))}
                    </CardBody>
                </Card>
                {details.description_raw && (
                <Card  bgColor= 'rgb(30, 30, 31)'>
                    <CardBody>
                        <Heading color={'white'}>About</Heading>
                        <Text color="white">{extractEnglishText(details.description_raw)}</Text>    
                    </CardBody>
                </Card>
                )}
                {details.platforms && Array.isArray(details.platforms) && (
                <Card  bgColor= 'rgb(30, 30, 31)'>
                    <CardBody>
                        <Text color="white">Platforms</Text>
                        <HStack mt='6' spacing='3' marginBottom="20px">
                            {details.platforms.map((platform, index) => (
                                <Text key={index} size='3xs' color="white">{platform.platform.name}</Text>
                            ))}
                        </HStack>
                        <HStack spacing='10'>
                            <Box>
                                <Text color="white">Release Date</Text>
                                <Text color="white">{details.released}</Text>
                            </Box>
                            <Box>
                                <Text color="white">Publisher</Text>
                                {details.publishers.map((publisher, index) => (
                                <Text key={index} size='3xs' color="white">{publisher.name}</Text>
                            ))}
                            </Box>
                            <Box>
                                <Text color="white">Metacritic Score</Text>
                                <Text color="white">{details.metacritic}</Text>
                            </Box>
                        </HStack>
                    </CardBody>
                </Card>
                )}
            </Grid>
        </ScaleFade>
        }
        </Box>
    </>
)

}

export default GameDetails