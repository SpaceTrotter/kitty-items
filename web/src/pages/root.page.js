import {Base} from "../parts/base.comp"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {Redirect} from "react-router-dom"
import {
  Box,
  Button,
  Flex,
  Center,
  Heading,
  Spacer,
  HStack,
  Image,
} from "@chakra-ui/react"

import Logo from "../svg/logo-kv.svg"

export function Page() {
  const [user, loggedIn, {signUp, logIn}] = useCurrentUser()

  if (loggedIn) return <Redirect to={"/" + user.addr} />

  return (
    <Base>
      <Box >
        <Center mt="30px">
        <Flex>
          
            <HStack>
              <Heading size="4xl">和田玉2.0NFT</Heading>
            </HStack>
         
          <Spacer />

        </Flex>
        </Center>        
      </Box>

      <Box >
      <Center mr="4" mt="500px">
          <Button mr="15" size ='lg' colorScheme="blue" onClick={logIn}>
            登录 
          </Button>
          <Button mr="15" size ='lg' colorScheme="blue" onClick={signUp}>
            注册
          </Button>   
      </Center>  
      </Box> 
    </Base>
  )
}
