import React, { useEffect, useState } from 'react';
import { SimpleGrid, Box } from '@chakra-ui/react';
import { Navbar } from '../components';

const Games = () => {
  const [data, setData] = useState([]);

  const getGames = async () => {
    try {
      const res = await fetch(`http://api.rawg.io/api/games?key=9cb08f397ae24a51bfd697b798f4588b`);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await res.json();
      setData(jsonData.results); // Set only the results array to data
      console.log(jsonData.results);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error, show message to user, etc.
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  return (
    <>
      <Navbar />
      <SimpleGrid spacing={10} minChildWidth={300} p={10}>
        {data.map((game) => (
          <Box key={game.id}>
            <img src={game.background_image} alt={game.name} />
            <h2>{game.name}</h2>
            <p>Released: {game.released}</p>
            <p>Rating: {game.rating}</p>
            {/* Add more details as needed */}
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

export default Games;
