import React from 'react';
import reactDOM from 'react-dom';
import {Hello} from './helloComponent';
import {AppContainer} from 'react-hot-loader';

const render = (Component) => {
    reactDOM.render(
        <AppContainer>
        <Component/>
        </AppContainer>,
        document.getElementById('root')
    );
};
render(Hello);
