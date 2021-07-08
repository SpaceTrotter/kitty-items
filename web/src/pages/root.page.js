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
      <Box p="4">
        <Flex>
          <Center mr="4">
            <HStack>
              <Image src={Logo} />
              <Heading size="lg">和田玉2.0NFT</Heading>
            </HStack>
          </Center>
          <Spacer />
          <Button mr="4" colorScheme="blue" onClick={logIn}>
            登录 
          </Button>
          <Button mr="4" colorScheme="blue" onClick={signUp}>
            注册
          </Button>
        </Flex>
      </Box>
    </Base>
  )
}
