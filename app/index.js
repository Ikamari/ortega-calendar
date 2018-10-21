// React
import React      from 'react';
import ReactDOM   from 'react-dom';
// Components
import App        from './App'
// Resources
import stopImage  from './resources/images/stop.jpg'

const image = new Image(320, 240)
image.src   = stopImage

console.log('%c+', [
    'font-size:1px;'
    , 'padding:'
    , image.height + 'px '
    , image.width  + 'px;'
    , 'background:url('
    , image.src
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
    , ');'
    , 'color:transparent;'
].join(''))

ReactDOM.render(
    <App/>,
    document.getElementById('content')
);

