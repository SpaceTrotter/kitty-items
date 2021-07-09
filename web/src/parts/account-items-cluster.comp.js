import {Suspense} from "react"
import {useAccountItems} from "../hooks/use-account-items.hook"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import Item from "./account-item-cluster.comp"
import {Box, Table, Thead, Tbody, Tr, Th, Text, Spinner,flexbox} from "@chakra-ui/react"
export var aitems = 0
export function AccountItemsCluster({address}) {
  const items = useAccountItems(address)
  const [cu] = useCurrentUser()
  aitems = items
  if (address == null) return null

  if (items.ids.length <= 0)
    return (
      <Box borderWidth="2px" borderRadius="lg" p="4">
        <Text>空</Text>
      </Box>
    )

  return (
    <flexbox borderWidth="1px" borderRadius="lg">
      <Table size="sm"  border="0" cellpadding="0" cellspacing="0" width="40%" >
         
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
    </flexbox>
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
