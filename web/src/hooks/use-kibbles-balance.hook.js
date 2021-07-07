import {atomFamily, selectorFamily, useRecoilState} from "recoil"
import {fetchKibblesBalance} from "../flow/fetch-kibbles-balance.script"
import {IDLE, PROCESSING} from "../global/constants"
import {transfor_kibble} from '../flow/transfor_kibble.tx'
export const valueAtom = atomFamily({
  key: "kibbles-balance::state",
  default: selectorFamily({
    key: "kibbles-balance::default",
    get: address => async () => fetchKibblesBalance(address),
  }),
})

export const statusAtom = atomFamily({
  key: "kibbles-balance::status",
  default: IDLE,
})

export function useKibblesBalance(address) {
  const [balance, setBalance] = useRecoilState(valueAtom(address))
  const [status, setStatus] = useRecoilState(statusAtom(address))

  async function refresh() {
    setStatus(PROCESSING)
    await fetchKibblesBalance(address).then(setBalance)
    setStatus(IDLE)
  }
  async function sendtoken(address,Amount) {
    setStatus(PROCESSING)
    await transfor_kibble(address,Amount)
    console.log('befor transfer')
    await fetchKibblesBalance(address).then(setBalance)
    console.log('web transfer')
    setStatus(IDLE)
  }
  return {
    balance,
    status,
    refresh,
    sendtoken,
    async mint() {
      setStatus(PROCESSING)
      await fetch(process.env.REACT_APP_API_KIBBLE_MINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient: address,
          amount: 10000.0,
        }),
      })
      console.log('befor mint')
      await fetchKibblesBalance(address).then(setBalance)
      console.log('web mint')
      setStatus(IDLE)
    },

    
  }
}
