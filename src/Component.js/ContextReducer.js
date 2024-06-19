import React, { createContext, useContext, useReducer } from "react";

const CardStateContext=createContext();
const CardDispatchContext=createContext();
const reducer=(state,action)=>
    {
        switch (action.type) {
            case "Add":
                return [...state,{id:action.id,name:action.name,qty:action.qty,size:action.size,price:action.price,img:action.img}]
                break;
            case "REMOVE":
                let NewArr=[...state]
                NewArr.splice(action.index,1)
                return NewArr
                break;
            case "DROP":
                let empArray = []
                return empArray
                break;
            default:
                console.log("context error ocurred")
                break;
        }
    }
export const CardProvider=({children})=>
    {
        const [state,dispatch]=useReducer(reducer,[])
        return(
            <CardDispatchContext.Provider value={dispatch}>
                <CardStateContext.Provider value={state}>
                    {children}
                </CardStateContext.Provider>
            </CardDispatchContext.Provider>
        )
    }

export const useCart=()=>useContext(CardStateContext)
export const useDispatchCart=()=>useContext(CardDispatchContext)