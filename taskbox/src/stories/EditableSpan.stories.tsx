import { action } from '@storybook/addon-actions';
import {EditableSpan} from '../../../my-app/src/EditableSpan';



export default {
    title: "EditableSpan Component",
    component: EditableSpan
}

const changeEditableSpan = action("change title");


export const EditableSpanBaseExemple = () => {
    return <>
        <EditableSpan title={"Title 1"} onChange={changeEditableSpan} />
    </>
}