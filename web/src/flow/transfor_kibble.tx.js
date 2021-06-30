// prettier-ignore
import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import {tx} from "./util/tx"
import {send, decode, script, args, arg, cdc} from "@onflow/fcl"
import {Address} from "@onflow/types"
import {transaction, limit, proposer, payer, authorizations, authz} from "@onflow/fcl"
import {invariant} from "@onflow/util-invariant"

const CODE = cdc`
  import FungibleToken from 0xFungibleToken
  import Kibble from 0xKibble

  //import FungibleToken from 0x9a0766d93b6608b7  
  // This transaction is a template for a transaction that
  // could be used by anyone to send tokens to another account
  // that has been set up to receive tokens.
  //
  // The withdraw amount and the account from getAccount
  // would be the parameters to the transaction
  
  transaction(amount: UFix64, to: Address) {
  
      // The Vault resource that holds the tokens that are being transferred
      let sentVault: @FungibleToken.Vault
  
      prepare(signer: AuthAccount) {
  
          // Get a reference to the signer's stored vault
          let vaultRef = signer.borrow<&Kibble.Vault>(from: Kibble.VaultStoragePath)
        ?? panic("Could not borrow reference to the owner's Vault!")
  
          // Withdraw tokens from the signer's stored vault
          self.sentVault <- vaultRef.withdraw(amount: amount)
      }
  
      execute {
  
          // Get the recipient's public account object
          let recipient = getAccount(to)
  
          // Get a reference to the recipient's Receiver
          let receiverRef = recipient.getCapability(Kibble.ReceiverPublicPath)!.borrow<&{FungibleToken.Receiver}>()
        ?? panic("Could not borrow receiver reference to the recipient's Vault")
  
          // Deposit the withdrawn tokens in the recipient's receiver
          receiverRef.deposit(from: <-self.sentVault)
      }
  }
  
`
export function transfor_kibble(Address,amount) {
  // prettier-ignore
  
  return tx([
    fcl.transaction(CODE),
    fcl.args([
      fcl.arg(amount.toFixed(8).toString(), t.UFix64),
      fcl.arg(String(Address), t.Address),
    ]),
    fcl.proposer(fcl.authz),
    fcl.payer(fcl.authz),
    fcl.authorizations([
      fcl.authz
    ]),
    fcl.limit(1000)
  ])

}