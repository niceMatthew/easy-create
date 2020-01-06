import {useReducer, useEffect} from 'react'
import { useRequest } from '@/utils/service';
import {loginHook} from './base'
import { Method } from 'axios';
  
function requestReducer(state:any , action:any) {

  switch (action.type) {
    case 'result':
      const { loading, response, error } = action;
      return {
        ...state,
        loading, 
        response,
        error
      };
  }
}



export function useCenter(type: loginHook ): any {
    let param, method:Method = 'POST', url='';
    if(type === loginHook.Login) {
      method = 'POST';
      url = 'http://localhost:3000/api/user/login'
    } 
    param = useRequest<{
      phone :string,
      password: string
    }, {id: string, name: string, token: string}>(method ,url);
    
    const { loading, response, error, request } = param;
    const initialState:any = {
        response,
        loading,
        error,
        request 
    };
    
    const [ state, dispatch ] =  useReducer(requestReducer, initialState);
    useEffect(()=> {
        dispatch({
           type: 'result',
           response,
           loading, 
           error
        })
    }, [response, loading, error ])
    return {
      ...state
    }
}

