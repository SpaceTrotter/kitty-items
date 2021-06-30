import {Suspense} from "react"
import {useAccountItems} from "../hooks/use-account-items.hook"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import Item from "./account-item-cluster.comp"
import {Box, Table, Thead, Tbody, Tr, Th, Text, Spinner} from "@chakra-ui/react"

export function AccountItemsCluster({address}) {
  const items = useAccountItems(address)
  const [cu] = useCurrentUser()

  if (address == null) return null

  if (items.ids.length <= 0)
    return (
      <Box borderWidth="2px" borderRadius="lg" p="4">
        <Text>空</Text>
      </Box>
    )

  return (
    <Box borderWidth="1px" borderRadius="lg">
      <Table size="lg">
        
        <Thead>
          <Tr>
            <Th>图片</Th>
            <Th>id</Th>
            <Th>简介</Th>
            <Th>属性</Th>
            {cu.addr === address && <Th />}
          </Tr>
        </Thead>
        <Tbody>
          {items.ids.map(id => (
            <Item key={id} id={id} address={address} />
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default function WrappedAccountItemsCluster({address}) {
  return (
    <Suspense
      fallback={
        <Box borderWidth="1px" borderRadius="lg" p="4">
          <Spinner />
        </Box>
      }
    >
      <AccountItemsCluster address={address} />
    </Suspense>
  )
}
