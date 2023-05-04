import {ADD_TODO, REMOVE_TODO, UPDATE_TODO} from "../actionTypes";

const initialState = {
    items: []
};
export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TODO: {
            const {addItem} = action.payload;
            return {
                ...state,
                items: [...state.items, addItem ]
            }
        }
        case REMOVE_TODO: {
            const {removeItem} = action.payload;
            return {
                ...state,
                items: state.items.filter((item, i) => i !== removeItem )
            }
        }
        case UPDATE_TODO: {
            const {updateIndex, updateItem} = action.payload;
            const itemList =  state.items.map((item, i) => i === updateIndex ? updateItem : item)
            return {
                ...state,
                items: itemList
            }
        }
        default:
            return state;
    }

}

