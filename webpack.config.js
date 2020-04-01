const path = require('path');       // node에서 path 쉽게 사용할 수 있게 제공하는 거

module.exports = {
    name: 'wordrelay-setting',          // 원하는 설정명으로 지정
    mode: 'development',                // 실서비스 production
    devtool: 'eval',                    // 실서비스 hidden-source-map
    resolve: {
        extensions: ['.js', '.jsx'],    // entry, output에 추가되는 파일 확장자명을 여기에 쓰면 표시하지 않아도 됨.     
    },
    
    entry: {
        app: ['./client'],      
        // ['./client.jsx', './WordRelay.jsx'], -> 다른 파일이 불러오는 파일은 추가하지 않아도 됨.
    },      // 입력

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-flow', '@babel/preset-env', '@babel/preset-react'],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-hot-loader/babel',
                ],
            },
        }],
    },

    output: {
        path: path.join(__dirname, 'dist'),         // path.join() 경로 합쳐주는 함수 (현재경로로 합쳐 줌) 실제 경로
        filename: 'app.js',
        publicPath: '/dist/',           // 가상 경로
    },      // 출력
};