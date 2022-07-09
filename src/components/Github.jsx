import React from 'react'
import { useState } from 'react';
import { useReducer } from 'react';

const initValue={
    isLoading: false,
    isError: false,
    data:[],
    token:""
};

const githubReducer = (state, action) =>{
    switch (action.type) {
        case "FETCH_GITHUB_USER_LOADING" :{
           return {
            ...state,
            isLoading:true,
            isError:false
           }
        }
        case "FETCH_GITHUB_USER_SUCCESS" :{
            return {
                ...state,
                isLoading:false,
                data: action.payload
               }
        }
        case "FETCH_GITHUB_USER_FAILURE" :{
            return {
                ...state,
                isLoading:false,
                isError:true
               }
        }
        default:
            return state;
    }
};

const githubLoadingAction = {type : "FETCH_GITHUB_USER_LOADING"}
const githubSuccessAction = {type : "FETCH_GITHUB_USER_SUCCESS"}
const githubFailureAction = {type : "FETCH_GITHUB_USER_FAILURE"}

const Github = () => {
    const [state, dispatch]= useReducer (githubReducer, initValue);
    const[text,setText] =useState("");

    const fetchUser = (query) => {
        dispatch(githubLoadingAction);
        fetch("https://api.github.com/search/users?" + `q=${query}`)
        .then((res)=> res.json())
        .then((res)=>{
            dispatch({...githubSuccessAction, payload: res.items});
        })
        .catch((err)=>{
            dispatch(githubFailureAction);
        });
    }

    console.log(text, state.data)
  return (
    <div>
        <div>
            <input value={text} onChange={e=> setText(e.target.value)} type="text" placeholder='add here..' />
            <button onClick={()=>fetchUser(text)}>Search</button>
        </div>
        <div>
            {state.data.map((item)=>{
                return <div key={item.id}>
                    <div>{item.login}</div>
                </div>
            })}
        </div>
    </div>
  )
}

export default Github