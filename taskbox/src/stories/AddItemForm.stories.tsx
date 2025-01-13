import {AddItemForm} from './../../../my-app/src/AddItemForm';
import { action } from '@storybook/addon-actions';

export default {
    title: "AddItemForm Component",
    component: AddItemForm
}

const callback = action("button 'add' was clicked inside the form")

export const AddItemFormBaseExemple = () => {
    return <AddItemForm addItem={callback} />
}