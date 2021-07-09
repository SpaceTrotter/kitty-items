import React, {useEffect, useState, Suspense,useRef} from "react"
import {useAccountItem} from "../hooks/use-account-item.hook"
import {useMarketItem} from "../hooks/use-market-item.hook"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {IDLE} from "../global/constants"
import {globalsetItems,fetchAccountItems} from "../parts/account-items-cluster.comp"
import {
  Tr,
  Td,
  Button,
  Spinner,
  Flex,
  Center,
  Text,
  Image,
  HStack,
  Link,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Input,
} from "@chakra-ui/react"
var str1 = ''
var globalitem = ''
function change1(e){
  str1 = e.target.value
}
function send(e){
  console.log(str1,globalitem.itemID)
  globalitem.send(str1,globalitem.itemID)
}
function sell(e){
  globalitem.sell(parseFloat(str1))
}
export const ItemImage = ({typeID}) => {
  // Lazy load SVG images for the kitty items.
  let [item, setItemImage] = useState("")

  useEffect(() => {
    async function getImage() {
      //let importedIcon = await import(`../svg/Items/item0${typeID}.svg`)
      let importedIcon = await import(`/var/www/html/picture/${typeID}.jpg`)
      setItemImage(importedIcon.default)
    }
    if (typeID) getImage()
  }, [typeID])

  return <Image maxW="160px" src={item} />
}
var gtypeindex = 0
export function AccountItemCluster({address, id}) {
  const item = useAccountItem(address, id)
  const listing = useMarketItem(address, id)
  const [cu] = useCurrentUser()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const BUSY = item.status !== IDLE || listing.status !== IDLE
  globalitem = item
  if (address == null) return null
  if (id == null) return null

  return (
    <Tr>
      <Td >
        <Link href={'http://45.76.83.103:81/video/'+item.typeID+'.mp4'} isExternal>
          <ItemImage typeID={item.typeID} />
        </Link>
      </Td>      
      <Td >
        <Flex>
          <Text as={item.forSale && "del"}>#{item.typeID}</Text>
        </Flex>
      </Td>
      <Td><Flex>({item.introduction})</Flex></Td>
      <Td><Flex>({item.attribute})</Flex></Td>
      <Td>
      <Flex>
        <Button
            colorScheme="blue"
            onClick={()=>{gtypeindex =1 ;onOpen()}}
            disabled={BUSY}
          >
            发送
        </Button>
      </Flex>
        <AlertDialog
             motionPreset="slideInBottom"
             leastDestructiveRef={cancelRef}
             onClose={onClose}
             isOpen={isOpen}
        
             isCentered
           >

           <AlertDialogOverlay />

           <AlertDialogContent>
           <AlertDialogHeader>信息</AlertDialogHeader>
           <AlertDialogCloseButton />
           <AlertDialogBody>
              请输入信息
        { gtypeindex == 1 ? (              
           <Input
              placeholder="输入目标地址"
              size="sm"
              onChange= {change1}
           /> 
            ):(
            <Input
            placeholder="输入目标价格"
            size="sm"
            onChange= {change1}
           />
            )}     
           </AlertDialogBody>
           <AlertDialogFooter>
             <Button ref={cancelRef} onClick={onClose}>
               No
             </Button>
             { gtypeindex == 1 ? (       
             <Button colorScheme="red"  onClick={()=>{globalitem = item;send();onClose()}}>
               Yes
             </Button>
             ):(
              <Button colorScheme="red"  onClick={()=>{globalitem = item;sell();onClose()}}>
              Yes
            </Button>               
             )}
            </AlertDialogFooter>
          </AlertDialogContent>
         </AlertDialog>
      </Td>
      

      {cu.addr === address && (
        <>
          {!item.forSale ? (
            <Td >
              <Flex>
              <Button
                colorScheme="blue"
                disabled={BUSY}
                onClick={()=>{gtypeindex =2 ;onOpen()}}
              >
                <HStack>
                  {BUSY && <Spinner mr="2" size="xs" />}{" "}
                  <Text>售出</Text>
                </HStack>
              </Button>
              </Flex>
            </Td>
          ) : (
            <Td >
              <Button
                colorScheme="orange"
                disabled={BUSY}
                onClick={listing.cancelListing}
              >
                <HStack>
                  {BUSY && <Spinner mr="2" size="xs" />} <Text>撤下</Text>
                </HStack>
              </Button>
            </Td>
          )}
        </>
      )}
    </Tr>
  )
}

export default function WrappedAccountItemCluster(props) {
  return (
    <Suspense
      fallback={
        <Tr>
          <Td>
            <Flex>
              <Text>#{props.id}</Text>
              <Center ml="4">
                <Spinner size="xs" />
              </Center>
            </Flex>
          </Td>
          <Td />
          <Td />
          <Td />
        </Tr>
      }
    >
      <AccountItemCluster {...props} />
    </Suspense>
  )
}
