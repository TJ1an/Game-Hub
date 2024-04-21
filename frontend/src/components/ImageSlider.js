import React, { useState } from 'react';
import { Box, Image, Button } from '@chakra-ui/react';

const ImageSlider = ({ imageUrls }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Box position="relative">
      <Button
        width="50px"
        height="50px"
        position="absolute"
        top="50%"
        left="5%"
        transform="translateY(-50%)"
        onClick={handlePrevClick}
        borderRadius="25px"
      >
        {'<'}
      </Button>
      <Image src={imageUrls[currentImageIndex]} alt="slider" overflow = "hidden"/>
      <Button
        width="50px"
        height="50px"
        position="absolute"
        top="50%"
        right="5%"
        transform="translateY(-50%)"
        onClick={handleNextClick}
        borderRadius="25px"
      >
        {'>'}
      </Button>
    </Box>
  );
};

export default ImageSlider;