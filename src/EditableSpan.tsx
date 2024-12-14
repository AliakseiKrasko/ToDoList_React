import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
    title: string;
    onChange: (value: string) => void;
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState<string>('');

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }

    const onChangeTitleHundler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

    return editMode
        ? <TextField variant={'standard'} value={title} onChange={onChangeTitleHundler} onBlur={activateViewMode} autoFocus/>
        : <span onClick={activateEditMode}>{props.title}</span>
}