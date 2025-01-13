import  { Provider } from 'react-redux';
import App from '../../../src/app/App';
import {store} from '../../../src/app/store';





export default {
    title: "App Component",
    component: App
}


export const AppBaseExemple = () => {
    return <>
        <Provider store={store}> <App /></Provider>
    </>
}
