import {Suspense,useRef} from "react"
import {useFlowBalance} from "../hooks/use-flow-balance.hook"
import {useKibblesBalance} from "../hooks/use-kibbles-balance.hook"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {IDLE} from "../global/constants"
import {fmtKibbles} from "../util/fmt-kibbles"
import {transfor_kibble} from '../flow/transfor_kibble.tx'
import {
  Box,
  Button,
  Table,
  Tbody,
  Tr,
  Td,
  Flex,
  Heading,
  Spinner,
  Center,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Input,
  useState,
} from "@chakra-ui/react"
import {useInitialized} from "../hooks/use-initialized.hook"
var globalkibbles = 0 
async function sendtokenlocal(Address,amount){
    
    transfor_kibble(str1,Number(str2))
}
var str1 = ''
var str2 = ''
var globalkibbles = ''
function change1(e){
  str1 = e.target.value
}
function change2(e){
  str2 = e.target.value
}
function change5(e){
  globalkibbles.sendtoken(str1,Number(str2))
}
export function BalanceCluster({address}) {
  const flow = useFlowBalance(address)
  const kibbles = useKibblesBalance(address)
  globalkibbles = kibbles
  const init = useInitialized(address)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  
  return (
    <Box mb="4">
      <Box mb="2">
        <Flex>
          <Heading size="md" mr="4">
            Balances
          </Heading>
          {(flow.status !== IDLE || kibbles.status !== IDLE) && (
            <Center>
              <Spinner size="sm" />
            </Center>
          )}
        </Flex>
      </Box>
      <Box maxW="200px" borderWidth="1px" borderRadius="lg">
        <Table size="sm">
          <Tbody>
            <Tr>
              <Td>HTY</Td>
              {kibbles.status === IDLE ? (
                <Td isNumeric>{fmtKibbles(kibbles.balance)}</Td>
              ) : (
                <Td isNumeric>
                  <Spinner size="sm" />
                </Td>
              )}
            </Tr>
          </Tbody>
        </Table>
      </Box>
      <Box mt="2">
        <Flex>
          <Button
            colorScheme="blue"
            disabled={kibbles.status !== IDLE || !init.isInitialized}
            onClick={kibbles.mint}
          >
            mint
          </Button>
          <Button
            colorScheme="blue"
            disabled={kibbles.status !== IDLE || !init.isInitialized}
            onClick={onOpen}
          >
            发送HTY
          </Button>
          <AlertDialog
             motionPreset="slideInBottom"
             leastDestructiveRef={cancelRef}
             onClose={onClose}
             isOpen={isOpen}
        
             isCentered
           >
           <AlertDialogOverlay />

           <AlertDialogContent>
           <AlertDialogHeader>发送</AlertDialogHeader>
           <AlertDialogCloseButton />
           <AlertDialogBody>
              请输入发送地址和数量
           <Input
              placeholder="地址"
              size="sm"
              onChange= {change1}
           />    
           <Input

              placeholder="输入数量"
              size="sm"
              onChange= {change2}
           />               

           </AlertDialogBody>
           <AlertDialogFooter>
             <Button ref={cancelRef} onClick={onClose}>
               No
             </Button>
             <Button colorScheme="red"  onClick={()=>{change5();onClose()}}>
               Yes
             </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
         </AlertDialog>
        </Flex>
        
      </Box>
    </Box>
  )
}

export default function WrappedBalanceCluster(props) {
  const [cu] = useCurrentUser()
  if (cu.addr !== props.address) return null

  return (
    <Suspense
      fallback={
        <Flex>
          <Heading size="md" mr="4">
            Balances
          </Heading>
          <Center>
            <Spinner size="sm" />
          </Center>
        </Flex>
      }
    >
      <BalanceCluster {...props} />
    </Suspense>
  )
}
