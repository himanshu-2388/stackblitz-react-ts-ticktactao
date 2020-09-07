import React, { Component } from 'react';
import './board.component.css';
import Square from '../square/square.component';
import Axios from 'axios';
import { JsonSampleResponse } from '../component-one/component-one.interface';
import { DatastoreService, State, initialState } from '../services/datastore.service';
import { getDefaultNormalizer } from '@testing-library/react';
import AppKeyConst from '../utils/App.const';

class Board extends Component<{}, SquareStateData> {
    private apiResponseData: Array<JsonSampleResponse> = [];
    public contextState: State = initialState;
    constructor(props: any) {
        super(props);
        this.state = {
            squareValue: Array(9).fill(null),
            xIsNext: true,
            data: this.apiResponseData
        };

    }
    componentDidMount() {
        const url = "https://jsonplaceholder.typicode.com/todos";
        Axios.get(url).then((response: any) => {
            response.data.map((values: JsonSampleResponse) => {
                this.apiResponseData.push(values);
            });
            this.setState({
                data: this.apiResponseData,
            })
        });
    }

    render() {
        return (
            <div>
                <div className="board">
                    COSUMER
                    <div>
                        <DatastoreService.Consumer>
                            {context => (
                                <>
                                </>
                            )}
                        </DatastoreService.Consumer>
                    </div>

                </div>
                <div className="board">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board">
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                </div>
                <div className="board">
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                </div>

                <div className="fun-board">
                    {this.renderFuntionCompSquare(10)}
                    {this.renderFuntionCompSquare(11)}
                    {this.renderFuntionCompSquare(12)}
                </div>
                <div>
                    {this.renderResponse()}
                </div>
            </div>
        )
    }

    handleClick(clickIndex: any) {
        const squares = this.state.squareValue.slice();
        if (!squares[clickIndex]) {
            squares[clickIndex] = this.state.xIsNext ? 'X' : 'O';
            this.setState(
                {
                    squareValue: squares,
                    xIsNext: !this.state.xIsNext
                }
            );
        }
    }

    renderResponse() {
        const renderData = this.state.data;
        return <ShowJsonResponse fetchData={renderData} />
    }

    renderSquare(i: any) {
        return (
            <Square values={this.state.squareValue[i]} onClick={() => this.handleClick(i)} />)
    }

    renderFuntionCompSquare(i: any) {
        return <FunctionComponentSquare
            values={this.state.squareValue[i]}
            onClick={() => this.handleClick(i)} />
    }
}

export default Board;

export interface SquareStateData {
    squareValue: Array<any>;
    xIsNext: boolean,
    data?: Array<JsonSampleResponse>
}


function FunctionComponentSquare(newProps: any) {
    const myObj = {
        data: 'data',
        testkey: 'testKey',
        arrValue: [1,2,3,4,5],
        objValues: { objKey: 'ObjValue'}
    }
    return (
        <div>
        <DatastoreService.Consumer>
            {context => (
                <>
                (FC.Square - {context.getData(AppKeyConst.STORE_KEY_PAGE_1)} )
                </>
            )}
        </DatastoreService.Consumer>
        <button className="square square--red" onClick={() => newProps.onClick()}> {newProps.values}
        </button>
        </div>
    );
}

function ShowJsonResponse(fetchData: any) {
    const data = <div className="user-table">
        <div className="user-table__row">
            <div> Id</div>
            <div> Title</div>
            <div> UserId</div>
        </div>
        <div className="user-table__row">
            {fetchData && fetchData.fetchData.map((values: JsonSampleResponse) => {
                return <div className="user-table__data" key={values.id}>
                    <div className="user-table__data user-table__data--content"> {values.id} </div>
                    <div className="user-table__data user-table__data--content"> {values.title} </div>
                    <div className="user-table__data user-table__data--content"> {values.userId} </div>
                </div>
            })
            }
        </div>
    </div>
    return (
        <div>{data}</div>
    );


}
