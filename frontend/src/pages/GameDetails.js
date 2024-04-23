import React, { useEffect, useState } from 'react';
import { Box, Heading, Card, CardBody, Image, Grid, Text, HStack, useBreakpointValue} from '@chakra-ui/react';
import { useLocation} from 'react-router-dom';
import {ScaleFade} from '@chakra-ui/react'
import ReactLoading from 'react-loading';
import { Navbar, ImageSlider } from '../components';

const GameDetails = () =>{
    const [details, setDetails] = useState([]);
    const [movie, setMovie] = useState([]);
    const [screenshot, setScreenshot] = useState([]);
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const id = location.state.id;

const columns = useBreakpointValue({ base: 1, md: 2 });

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

const getGameDetails = async () => {
    try {
        setLoading(true);
        const detailResponse = await fetch(`http://api.rawg.io/api/games/${id}?key=${process.env.REACT_APP_API_KEY}`);
        const movieResponse = await fetch(`http://api.rawg.io/api/games/${id}/movies?key=${process.env.REACT_APP_API_KEY}`);
        const screenshotResponse = await fetch(`http://api.rawg.io/api/games/${id}/screenshots?key=${process.env.REACT_APP_API_KEY}`);
        
        if (!detailResponse.ok || !movieResponse.ok || !screenshotResponse.ok) {
            throw new Error('Failed to fetch data');
        }

        const gameData = await detailResponse.json();
        const movieData = await movieResponse.json();
        const screenshotData = await screenshotResponse.json();

        console.log(gameData);
        console.log(movieData);
        console.log(screenshotData);
        
        setDetails(gameData);
        setMovie(movieData.results.slice(0, 1));
        setScreenshot(screenshotData.results);
        setLoading(false);
    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error, show message to user, etc.
    }
}

const imagesArray = screenshot.map(screenshot => screenshot.image);
console.log(imagesArray);

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
        <Box style={{backgroundColor: 'black', height: '100%'}} className='container'>
        {
        loading ?
        <>
            <Box opacity={1}>
            <Navbar />
            </Box>
            <Box className="loading-page" display="flex" justifyContent="center" alignItems="center" height="100vh" bgColor="black">
                <ReactLoading type="cubes" color="white" height={100} width={50} />
            </Box>
        </> :
        <ScaleFade initialScale={0.8} in={!loading}>
        <Navbar />
        <Box display="flex" flexDirection="row" justifyContent="center">
        <Heading color="white" marginBottom="20px">{details.name}</Heading>
        </Box>
        <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={4} paddingBottom="50px" padding="50px">
                <Card bgColor= 'rgb(30, 30, 31)'>
                    <CardBody bgColor= 'rgb(30, 30, 31)' borderTopLeftRadius="20px" borderTopRightRadius="20px" display="flex" justifyContent="center" alignItems="center">\
                    <Box>
                        <ImageSlider imageUrls={imagesArray}/>
                    </Box>
                    </CardBody>
                </Card>
                {movie.length === 0?
                <>
                <Card bgColor= 'rgb(30, 30, 31)'>
                    <CardBody bgColor='rgb(30, 30, 31)' display="flex" justifyContent="center" alignItems="center">
                        <Heading as='h2' color="white" size='lg'>No trailers available. Go search on youtube or smth.</Heading>
                    </CardBody>
                </Card>
                
                </>:
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
                }
                {details.description_raw && (
                <Card  bgColor= 'rgb(30, 30, 31)'>
                    <CardBody>
                        <Heading color={'white'} marginBottom="20px">About</Heading>
                        <Text color="white">{extractEnglishText(details.description_raw)}</Text>    
                    </CardBody>
                </Card>
                )}
                {details.platforms && Array.isArray(details.platforms) && (
                <Card  bgColor= 'rgb(30, 30, 31)'>
                    <CardBody>
                    <Text color="white" fontSize='lg' as='b'>Platforms</Text>
                        <HStack mt='6' spacing='3' marginBottom="50px" marginTop="0px">
                            {details.platforms.map((platform, index) => (
                                <Text key={index} size='3xs' color="white">{platform.platform.name}</Text>
                            ))}
                        </HStack>
                        <HStack spacing='10'>
                            <Box>
                                <Text color="white" fontSize='lg' as='b'>Release Date</Text>
                                <Text color="white">{formatDate(details.released)}</Text>
                            </Box>
                            <Box>
                                <Text color="white" fontSize='lg' as='b'>Publisher</Text>
                                {details.publishers.map((publisher, index) => (
                                <Text key={index} size='3xs' color="white">{publisher.name}</Text>
                            ))}
                            </Box>
                            <Box>
                                <Text fontSize='lg'color = "white" as='b'>Metacritic Score</Text>
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