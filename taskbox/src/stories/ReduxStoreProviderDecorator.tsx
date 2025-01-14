import {store} from '../../../src/app/store';
import {Provider} from 'react-redux';


export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={store}>{storyFn()}</Provider> ;
}