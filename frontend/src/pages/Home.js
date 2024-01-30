import {extendTheme, ChakraProvider} from '@chakra-ui/react'

const colors = {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
  }

const theme = extendTheme({ colors })

function Home() {
  return (
    <ChakraProvider theme={theme}>
      <div>
        <h1>HELLO</h1>
      </div>
    </ChakraProvider>
  )
}

export default Home