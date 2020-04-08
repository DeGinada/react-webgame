import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () => {

        if(state === 'waiting') {

            setState('ready');
            setMessage('초록색이 되면 클릭하세요.');

            timeout.current = setTimeout(() => {

                setState('now');
                setMessage('지금 클릭');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000);    // 2~3초 랜덤

        } else if(state === 'ready') {
            clearTimeout(timeout.current);

            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');

        } else if(state === 'now') {
            endTime.current = new Date();

            setState('waiting');
            setMessage('클릭해서 시작하세요.');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current];
            });
        }
    };

    const onReset = () => {
        setResult([]);
    };

    const renderAverage = () => {
        return result.length === 0 ? null 
            : <>
                <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={onReset}>reset</button>
            </>
        
    };

    // 배열로 담아서 return 가능함. 대신 key 붙여줘야함.
    // return [
    //     <div key="사과">사과</div>,
    //     <div key="귤">귤</div>,
    //     <div key="배">배</div>,
    //     <div key="감">감</div>,
    // ];

    return (
        <>
            <div id="screen" className={state} onClick={onClickScreen}>
                {message}
            </div>
            {/* return 안에 if문 쓰는 번 : 즉시 실행 함수를 만들어서 내부에 if문 */}
            {/* {(() => {
                if(result.length === 0) {
                    return null;
                } else {
                    return <>
                        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
                        <button onClick={onReset}>reset</button>
                    </>
                }
            })()} */}
            {renderAverage()}
        </>
    );
}

export default ResponseCheck;