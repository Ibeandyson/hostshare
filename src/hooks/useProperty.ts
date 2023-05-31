import { useState } from 'react';
import { useStore, useDispatch, SET_PROPERTY } from "../context/reducers/propertyReducer"

const useProperty = () => {
    const store = useStore();
    const dispatch = useDispatch();

    const getAllPropertyDetails = async (data: any) => {
        dispatch({ type: SET_PROPERTY, payload: data });
    }

    return {
        getAllPropertyDetails,
        propertyData: store.data
    }
}

export default useProperty