import React, { Component } from 'react';
import Axios from 'axios';

import './component-one.css';
import '../board/board.component';
import AppKeyConst from '../utils/App.const';
import { DatastoreService } from '../services/datastore.service';
class ComponentOne extends Component<any, any> {
    render() {
        return (
            <div className="block">
                BLOCK
                <div className="block block__element">
                    ELEMENT
            </div>
                <div className="block block__element--modifer">
                    MODIFER
            </div>
            PROVIDER
                {this.setContext()}
            </div>

        );
    }
    setContext() {
        return (<DatastoreService.Consumer>
            {
                context => (
                    <>
                        {context.setData(AppKeyConst.STORE_KEY_PAGE_1, 'My Test Data')}
                    </>
                )}
        </DatastoreService.Consumer>)
    }
}
export default ComponentOne;