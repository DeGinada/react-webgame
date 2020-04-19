import React, { useCallback, memo } from 'react';
import { CLICK_CELL, SET_TURN } from './TicTacToe';

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);
        if(cellData) {
            return;
        }
        dispatch({ type: CLICK_CELL, row:rowIndex, cell:cellIndex });
        // dispatch({ type: SET_TRUN });
    }, [cellData]);

    return (
        <td onClick={onClickTd}>{cellData}</td>
    )
});

export default Td;