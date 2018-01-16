import React from 'react';
import reactDOM from 'react-dom';
import {Hello} from './helloComponent';

const render = (Component) => {
    reactDOM.render(
        <Component/>,
        document.getElementById('root')
    );
};
render(Hello);

// Hot module replacement API
if (module.hot) {
    module.hot.accept('./helloComponent', () => {
        render(Hello);
    });
}
