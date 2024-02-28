import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SimpleGrid, Box, Heading, Flex, Card, CardBody, Stack, Image, Divider, CardFooter, Button, ButtonGroup, Input, Skeleton, HStack, StackDivider} from '@chakra-ui/react';
import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react'
import ReactLoading from "react-loading";
import { Navbar } from '../components';
import layeredWaves from '../assets/black.svg';

const Games = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [initialloading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const pageStyles = {
    backgroundImage: `url(${layeredWaves})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
  };

  const viewGameDetails = (id) => {
    navigate(`/games/${id}`, { state: { id } });
  }

  const getGames = async () => {
    try {
      const res = await fetch(`http://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&page=10`);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await res.json();
      setData(jsonData.results.slice(0, 20))
      setInitialLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error, show message to user, etc.
    }
  };

  const searchGames = async () => {
    try {
      if (search) {
        setLoading(true);
        const res = await fetch(`http://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&search=${search}`);
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await res.json();
        setData(jsonData.results.slice(0, 20));
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error, show message to user, etc.
    }
  }

useEffect(() => {
    getGames();
}, [])

const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchGames();
    }
};

if (initialloading) {
    return (
      <Box className="loading-page" display="flex" justifyContent="center" alignItems="center" height="100vh" bgColor="black">
        <ReactLoading type="spin" color="purple" height={100} width={50} />
      </Box>
    );
}

  return (
    <>
      <Box style={pageStyles} className='container'>
        <Navbar />
        <Box display='flex' justifyContent='center' alignItems='center'>
          <Input
            placeholder='Search'
            size='md'
            htmlSize={40}
            width='auto'
            color='black'
            value={search}
            onChange={(e) => {setSearch(e.target.value)}}
            onKeyPress={handleKeyPress}
            bgColor="white"
            borderRadius="20px"
          />
        </Box>
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
        <SimpleGrid spacing={10} minChildWidth={350} p={10}>
          {data.map((game) => (
            <Card key={game.id} borderRadius="300px">
              <CardBody bgColor= 'rgb(30, 30, 31)' borderTopLeftRadius="20px" borderTopRightRadius="20px">
                <Image src={game.background_image} alt={game.name} h='250px' borderRadius='lg' onClick={() => viewGameDetails(game.id)} cursor="pointer"/>
                <HStack mt='6' spacing='3'>
                  <Heading size='md' color="purple.500">{game.name}</Heading>
                </HStack>
                <HStack mt='6' spacing='3'>
                  {game.platforms.slice(0, 3).map((platform, index) => (
                    <Heading key={index} size='3xs' color="white">{platform.platform.name}</Heading>
                  ))}
                </HStack>
              </CardBody>
              <StackDivider bg='white' height="1px"/>
              <CardFooter bgColor='rgb(30, 30, 31)' borderBottomLeftRadius="20px" borderBottomRightRadius="20px">
                <ButtonGroup spacing='2'>
                  <Button variant='solid' colorScheme='purple'>
                    Buy now
                  </Button>
                  <Button variant='ghost' colorScheme='purple'>
                    Add to cart
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
        </ScaleFade>
        }
      </Box>
    </>
  );
};

export default Games;
