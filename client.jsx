// import 쓰는 경우
import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';

import RSP from './RSP';

const Hot = hot(RSP);
ReactDom.render(<Hot />, document.querySelector('#root'));


// require 쓰는 경우
// const React = require('react');
// const ReactDom = require('react-dom');
// const { hot } = require('react-hot-loader/root');

// const WordRelay = require('./WordRelay');

// const Hot = hot(WordRelay);
// ReactDom.render(<Hot />, document.querySelector('#root'));


// hot-loader 사용 안헐때 쓰는 법 
// const WordRelay = require('./WordRelay');
// ReactDom.render(<WordRelay />, document.querySelector('#root'));

// const GuGudan = require('./GuGudan');
// ReactDom.render(<GuGudan />, document.querySelector('#root'));