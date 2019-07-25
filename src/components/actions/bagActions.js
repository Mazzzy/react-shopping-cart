
import { 
    ADD_TO_BAG,
    REMOVE_ITEM,
    SUB_QUANTITY,
    ADD_QUANTITY,
    FETCH_ITEMS_PENDING,
    FETCH_ITEMS_SUCCESS,
    FETCH_ITEMS_ERROR
} from './action-types'

export const addToBag = (skuCode) => {
    return{
        type: ADD_TO_BAG,
        skuCode
    }
}
export const removeItem = (skuCode) => {
    return{
        type: REMOVE_ITEM,
        skuCode
    }
}
export const subtractQuantity = (skuCode) => {
    return{
        type: SUB_QUANTITY,
        skuCode
    }
}
export const addQuantity = (skuCode) => {
    return{
        type: ADD_QUANTITY,
        skuCode
    }
}

export const fetchItemsPending = () => {
    return {
        type: FETCH_ITEMS_PENDING
    }
}

export const fetchItemsSuccess = (items) => {
    return {
        type: FETCH_ITEMS_SUCCESS,
        items: items
    }
}

export const fetchItemsError = (error) => {
    return {
        type: FETCH_ITEMS_ERROR,
        error: error
    }
}
