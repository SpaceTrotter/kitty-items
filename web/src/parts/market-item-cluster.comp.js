import {Suspense} from "react"
import {useMarketItem} from "../hooks/use-market-item.hook"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {IDLE} from "../global/constants"
import {
  Tr,
  Td,
  Button,
  Spinner,
  Flex,
  Center,
  Text,
  HStack,
  Link
} from "@chakra-ui/react"

import {ItemImage} from "./account-item-cluster.comp"

export function MarketItemCluster({address, id}) {
  const [cu, loggedIn] = useCurrentUser()
  const item = useMarketItem(address, id)

  const BUSY = item.status !== IDLE || item.status !== IDLE

  return (
    <Tr>
      <Td  padding = '0'  margin = '0'>
        <Link href={'http://45.32.254.22:81/video/'+item.typeID+'.mp4'} isExternal>
          <ItemImage typeID={item.typeID} />
        </Link>
      </Td>      
      <Td  padding = '0'  margin = '0' >
        <Flex>
          <Text as={item.forSale && "del"}>#{item.typeID}</Text>
        </Flex>
      </Td>
      <Td padding = '1'  margin = '1'>({item.introduction})</Td>
      <Td padding = '1'  margin = '1'>({item.attribute})</Td>
      <Td padding = '0'  margin = '0'>{item.price}</Td>
      {loggedIn && (
        <>
          {item.owner === cu.addr ? (
            <Td isNumeric>
              <Button
                colorScheme="orange"
                size="sm"
                disabled={BUSY}
                onClick={item.cancelListing}
              >
                <HStack>
                  {BUSY && <Spinner mr="2" size="xs" />}
                  <Text>Unlist</Text>
                </HStack>
              </Button>
            </Td>
          ) : (
            <Td isNumeric>
              <Button
                colorScheme="blue"
                size="sm"
                disabled={BUSY}
                onClick={item.buy}
              >
                <HStack>
                  {BUSY && <Spinner mr="2" size="xs" />}
                  <Text>Buy</Text>
                </HStack>
              </Button>
            </Td>
          )}
        </>
      )}
    </Tr>
  )
}

export default function WrappedMarketItemCluster(props) {
  return (
    <Suspense
      fallback={
        <Tr>
          <Td maxW="50px">
            <Flex>
              <Text>#{props.id}</Text>
              <Center ml="4">
                <Spinner size="xs" />
              </Center>
            </Flex>
          </Td>
          <Td />
          <Td />
        </Tr>
      }
    >
      <MarketItemCluster {...props} />
    </Suspense>
  )
}
