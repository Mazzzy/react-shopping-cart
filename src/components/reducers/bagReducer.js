import { 
    ADD_TO_BAG,
    REMOVE_ITEM,
    SUB_QUANTITY,
    ADD_QUANTITY,
    ADD_SHIPPING,
    FETCH_ITEMS_PENDING,
    FETCH_ITEMS_SUCCESS,
    FETCH_ITEMS_ERROR
 } from '../actions/action-types'

const initState = {
    items: [],
    addedItems: [],
    total: 0,
    pending: false,
    error: null
}
const bagReducer= (state = initState, action) => {
    
    if(action.type === FETCH_ITEMS_PENDING){
        return {
            ...state,
            pending: true
        }
    }
    if(action.type === FETCH_ITEMS_SUCCESS){
        return {
            ...state,
            pending: false,
            items: action.items
        }
    }
    if(action.type === FETCH_ITEMS_ERROR){
        return {
            ...state,
            pending: false,
            error: action.error
        }
    }
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_BAG){
          let addedItem = state.items.find(item => item.skuCode === action.skuCode)
          //check if the action skuCode exists in the addedItems
         let existed_item = state.addedItems.find(item => action.skuCode === item.skuCode)
         if(existed_item){
            addedItem.quantity += 1 
            return {
                ...state,
                total: state.total + addedItem.sellingPrice 
            }
        } else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.sellingPrice 
            
            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove = state.addedItems.find(item => action.skuCode === item.skuCode)
        let new_items = state.addedItems.filter(item => action.skuCode !== item.skuCode)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.sellingPrice * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE BAG COMPONENT
    if(action.type === ADD_QUANTITY){
        let addedItem = state.items.find(item => item.skuCode === action.skuCode)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.sellingPrice
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type === SUB_QUANTITY){  
        let addedItem = state.items.find(item => item.skuCode === action.skuCode) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item =>item.skuCode !== action.skuCode)
            let newTotal = state.total - addedItem.sellingPrice
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.sellingPrice
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type === ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 6
          }
    }

    if(action.type === 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 6
        }
    } else{
        return state
    }

    
}

export default bagReducer

export const getItems = state => state.items;
export const getItemsPending = state => state.pending;
export const getItemsError = state => state.error;
