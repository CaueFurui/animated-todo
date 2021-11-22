import React from 'react'
import { ImageSourcePropType } from 'react-native'
import { Box, VStack, Heading, Image } from 'native-base'

interface Props {
  title: string
  image: ImageSourcePropType
  children: React.ReactNode
}

const Masthead = ({ children, image, title }: Props) => {
  return (
    <VStack h="300px" pb={5}>
      <Image
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        w="full"
        h="300px"
        resizeMode="cover"
        source={image}
        alt="Masthead Image"
      />
      {children}
      <Box flex={1} justifyContent="flex-end" alignItems="flex-end">
        <Heading shadow="4" color="#272727" p={6} size="xl">
          {title}
        </Heading>
      </Box>
    </VStack>
  )
}

export default Masthead
