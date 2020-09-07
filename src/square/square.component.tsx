import React from 'react';
import './square.component.css';
import { SquareProps, SquareState } from './square.interface';
import { DatastoreService } from '../services/datastore.service';
import AppKeyConst from '../utils/App.const';

class Square extends React.Component<SquareProps, SquareState> {
    render() {
        return (
            <div>
               ( Square Inner {<DatastoreService.Consumer>
                    {context => (
                        context.getData(AppKeyConst.STORE_KEY_PAGE_1) + ")"
                    )}
                </DatastoreService.Consumer>}
                <button className="square" onClick={() => this.props.onClick()}> {this.props.values}
                </button>
            </div>
        );
    }
}

export default Square;
