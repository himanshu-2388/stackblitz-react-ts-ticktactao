import React, { useContext, Component } from 'react';
import { DatastoreService, DataStore } from '../services/datastore.service';
import AppKeyConst from '../utils/App.const';
import { randomBytes } from 'crypto';

class ComponentTwo extends Component<any, any> {
    render() {
        return (
            <div>
                <br />
                <DatastoreService.Consumer>
                    {context => (
                        <React.Fragment>
                            Show All Context Values
                            {this.processContextValues(context)}
                        </React.Fragment>

                    )}
                </DatastoreService.Consumer>
            </div>
        )
    }

    getStoreData() {
        return (
            <div>
                <DatastoreService.Consumer>
                    {context => (
                        <>
                            {context.getData(AppKeyConst.STORE_KEY_PAGE_1)}
                        </>
                    )}
                </DatastoreService.Consumer>
            </div>)
    }

    processContextValues(getContext: any) {
        getContext.deleteKey(AppKeyConst.STORE_KEY_PAGE_1);
        getContext.setData(AppKeyConst.STORE_KEY_PAGE_2, { data: 'value1' })
        getContext.setData(AppKeyConst.DATA_KEY_TEST_OBJ, { obj: 'value2', obj2: 'value3' })
        getContext.setData(AppKeyConst.DATA_KEY_TEST_STR, 'String Data');
        getContext.setData(AppKeyConst.DATA_KEY_TEST_ARR, ['ArrVal-1','ArrVal-2','ArrVal-3','ArrVal-4','ArrVal-5']);

        const contextData = getContext.getAll();
        const getAllKeys = (Object.keys(contextData))
        const allValues = getAllKeys.map((values) => {
            if (typeof (contextData[values]) === 'object') {
                return Object.keys(contextData[values]).map((data, index) => {
                    return (
                        <div>
                            <ul>
                                <li key={index}> {contextData[values][data]}</li>
                            </ul>
                        </div>
                    );
                })
            } else {
                return <li> {contextData[values]}</li>;
            }
        }
        )
        return (

            <div>{allValues}
            </div>
        )

    }

}

export default ComponentTwo;