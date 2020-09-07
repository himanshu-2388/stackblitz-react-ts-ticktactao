import React from 'react';

export interface DataStore {
    [key:string]: any;
}

let datastore: DataStore = {};
export const initialState = {
    getData: (key: string) => {
        return datastore[key];
    },
    setData: (key: string, value: any) => {
        datastore[key] = datastore[key] || {};
        datastore[key] = value;
        return datastore[key];
    },
    getAll:() => {
        return (datastore);
    },
    deleteAll:() => {
        return datastore = {};
    },
    deleteKey:(key:string) => {
        return delete datastore[key];
    }
};

export type State = typeof initialState;
export const DatastoreService = React.createContext(initialState);

