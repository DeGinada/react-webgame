import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';

// 라이프 사이클
// 클래스의 경우 : constructor -> render -> ref -> componentDidMount 
// (setState/props 바뀔때) -> shouldComponentUpdate(true) -> render -> componentDidUpdate
// 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸

const rspCoords = {
    rock: '0',
    scissor: '-142px',
    paper: '-284px',
};

const scores = {
    scissor: 1,
    rock: 0,
    paper: -1,
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find( function(v) {
        return v[1] === imgCoord;
    })[0];
};

const changeTime = 150;

const RSP = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.rock);
    const [score, setScore] = useState(0);
    const interval = useRef();

    // useLayoutEffect      // 화면이 변경된 후 실행. useEffect와 사용법은 같음.
    useEffect(() => {   // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
        interval.current = setInterval(changeHand, changeTime);
        return () => {  // componentWillUnmount 역할, imgCoord가 바뀔때마다 실행됨.
            clearInterval(interval.current);
        }
    }, [imgCoord]);     // 이 배열이 클로저 역할을 함. 배열이 비어있으면 다시 실행되지 않음.

    const changeHand = () => {
        if(imgCoord === rspCoords.rock) {
            setImgCoord(rspCoords.scissor);
        } else if(imgCoord === rspCoords.scissor) {
            setImgCoord(rspCoords.paper);
        } else if(imgCoord === rspCoords.paper) {
            setImgCoord(rspCoords.rock);
        }
    };

    const onClickBtn = (choice) => () => {
        clearInterval(interval.current);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            setResult('비겼습니다.');
        } else if ([-1, 2].includes(diff)) {
            setResult('이겼습니다.');
            setScore((prevScore) => prevScore + 1);
        } else {
            setResult('졌습니다.');
            setScore((prevScore) => prevScore - 1);
        }
        setTimeout(() => {
            interval.current = setInterval(changeHand, changeTime);
        }, 2000);
    };

    return (
        <>
            <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('rock')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('scissor')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('paper')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );
}

export default RSP;