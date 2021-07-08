import {atomFamily, selectorFamily, useRecoilState} from "recoil"
import {fetchAccountItems} from "../flow/fetch-account-items.script"
import {IDLE, PROCESSING} from "../global/constants"
import {aitems} from '../parts/account-items-cluster.comp'
export const $state = atomFamily({
  key: "account-items::state",
  default: selectorFamily({
    key: "account-items::default",
    get: address => async () => fetchAccountItems(address),
  }),
})

export const $status = atomFamily({
  key: "account-items::status",
  default: IDLE,
})
export function addshownumber()
{
  itemshownumber = itemshownumber + 10
  //fetchAccountItems(address).then(setItems)
  console.log('itemshownumber',itemshownumber)
  //items = allitems.slice(0,itemshownumber)
  //globalsetItems()
  aitems.refresh()
}
export var itemshownumber = 10 
var alllength = 0
export var globalsetItems = ''
var allitems = 0
function deepcopy (obj, cache = []) {

  function find (list, f) {
    return list.filter(f)[0]
  }

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepcopy(obj[key], cache)
  })

  return copy
}
var items = 0
export function useAccountItems(address) {
  var [items, setItems] = useRecoilState($state(address))
  var [status, setStatus] = useRecoilState($status(address))
  //alllength = items.length
  globalsetItems = setItems
  allitems = deepcopy(items)
  items = allitems.slice(0,itemshownumber)
  //console.log(allitems.length,items.length)
  return {
    ids: items,
    status,

    async mint(str1,str2,str3,str4) {
      setStatus(PROCESSING)
      await fetch(process.env.REACT_APP_API_KITTY_ITEM_MINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient: address,
          // Random typeID between 1 - 5
          typeID: str1,
          introduction:str2,
          attribute: str3,
          url: str4,
        }),
      })
      await fetchAccountItems(address).then(setItems)
      setStatus(IDLE)
    },
    async refresh() {
      setStatus(PROCESSING)
      await fetchAccountItems(address).then(setItems)
      //alllength = items.length
      //allitems =deepcopy(items)
      //items = allitems.slice(0,itemshownumber)
      setStatus(IDLE)
    },
  }
}
