import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@mui/material';

type AddItemFormPropsType = {
    addItem: (title: string) => void;

}

export function AddItemForm(props: AddItemFormPropsType) {
    const [titleNewTask, setTitleNewTask] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleNewTask(e.currentTarget.value);


    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            if (titleNewTask.trim() !== '') {
                props.addItem(titleNewTask);
                setTitleNewTask('');
            } else {
                setError('Title is required');
            }
        }
    };

    const onClickHandler = () => {
        if (titleNewTask.trim() !== '') {
            props.addItem(titleNewTask);
            setTitleNewTask('');
        } else {
            setError('Title is required');
        }
    };
    return (
        <div>
            <TextField
                label={'Type value'}
                value={titleNewTask}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                error={!!error}
                helperText={error}
            />

            <Button onClick={onClickHandler} variant={'contained'} color={'primary'}>+</Button>

        </div>
    )
}