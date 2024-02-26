import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'
import { SimpleGrid, Box, Heading, Text, Flex, Card, CardBody, Stack, StackDivider, Image, Divider, CardFooter, Button, ButtonGroup, Input} from '@chakra-ui/react';
import { Navbar } from '../components';
import layeredWaves from '../assets/plain.svg';
import ReactLoading from "react-loading";

const Games = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const pageStyles = {
    backgroundImage: `url(${layeredWaves})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
};

const viewGameDetails = (id) =>{
  navigate(`/games/${id}`,{state: {id}});
}

const getGames = async () => {
    try {
      const res = await fetch(`http://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}`);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await res.json();
      setData(jsonData.results.slice(0, 20))
      console.log(jsonData.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error, show message to user, etc.
    }
};

useEffect(
    () => {
        getGames();
    }
,[])

if (loading) {
  return (
      <Box className="loading-page" display="flex" justifyContent="center" alignItems="center" height="100vh">
          <ReactLoading type="spin" color="purple" height={100} width={50} />
      </Box>
  );
}

  return (
    <>
    <Box style={pageStyles} className='container'>
      <Navbar />
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Input placeholder='Search' size='md' htmlSize={30} width='auto' color='white'/>
      </Box>
      <SimpleGrid spacing={10} minChildWidth={350} p={10}>
        {data.map((game) => (
        <Card>
          <CardBody>
            <Image src={game.background_image} alt={game.name} h = '250px' borderRadius='lg' onClick={() => viewGameDetails(game.id)}/>
            <Stack mt='6' spacing='3'>
              <Heading size='md' color="purple.500">{game.name}</Heading>
            </Stack>
          </CardBody>
          <Divider/>
          <CardFooter>
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
      </Box>
    </>
  );
};

export default Games;
