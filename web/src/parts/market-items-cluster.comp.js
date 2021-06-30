import {Suspense} from "react"
import {useMarketItems} from "../hooks/use-market-items.hook"
import Item from "./market-item-cluster.comp"
import {Box, Table, Thead, Tbody, Tr, Th, Text, Spinner} from "@chakra-ui/react"

export function MarketItemsCluster() {
  const {items, status} = useMarketItems()

  if (items.length <= 0)
    return (
      <Box borderWidth="1px" borderRadius="lg" p="4">
        <Text>No Items Listed For Sale</Text>
      </Box>
    )

  return (
    <Box borderWidth="1px" borderRadius="lg">
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>图片</Th>
            <Th>id</Th>
            <Th>简介</Th>
            <Th>属性</Th>
            <Th>价格</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map(item => (
            <Item
              key={item.itemID}
              id={item.itemID}
              address={item.owner}
              status={status}
            />
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default function WrappedMarketItemsCluster() {
  return (
    <Suspense
      fallback={
        <Box borderWidth="1px" borderRadius="lg" p="4">
          <Spinner />
        </Box>
      }
    >
      <MarketItemsCluster />
    </Suspense>
  )
}
