import  { Provider } from 'react-redux';
import App from '../../../src/app/App';
import {store} from '../../../src/app/store';
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';





export default {
    title: "App Component",
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}


export const AppBaseExemple = () => {
    return <>
        <Provider store={store}> <App /></Provider>
    </>
}
