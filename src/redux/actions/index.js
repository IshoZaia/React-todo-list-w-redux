import {ADD_TODO, REMOVE_TODO, UPDATE_TODO} from "../actionTypes";

export const add = item => ({
    type: ADD_TODO,
    payload: {
        addItem: item
    }
})

export const remove = index => ({
    type: REMOVE_TODO,
    payload: {
        removeItem: index
    }
})

export const update = (index, value) => ({
    type: UPDATE_TODO,
    payload: {
        updateIndex: index,
        updateItem: value
    }
})