import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';        // useRef-일반 값을 기억, useMemo-복잡한 함수 결괏값을 기억
import Ball from './Ball';

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    useEffect(() => {               
        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
            }, (i + 1) * 1000);
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
        return () => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        };
    }, [timeouts.current]);     // input이 빈 배열이면 componentDidMount와 동일
    // 배열에 요소가 있으면 componentDidMount와 componentDidUpdate 둘 다 수행

    useEffect(() => {           // useEffect 여러번 사용 가능
        console.log('로또 숫자를 생성합니다.');
    }, [winNumbers]);

    const onClickRedo = useCallback(() => {         // useCallback-함수를 기억, useCallback 필수: 자식 컴포넌트에 함수로 넘길때 꼭 사용
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }, [winNumbers]);

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">{winBalls.map((v) => <Ball key={v} number={v} />)}</div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} onClick={onClickRedo}/>}
            {redo && <button onClick={onClickRedo}>한번 더!</button>}
        </>
    );
};

export default Lotto;