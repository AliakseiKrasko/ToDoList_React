import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from '@mui/material';
import {AddCircleOutline} from '@mui/icons-material';

type AddItemFormPropsType = {
    addItem: (title: string) => void;

}

export const AddItemForm = React.memo ( (props: AddItemFormPropsType) => {
    console.log('hello')
    const [titleNewTask, setTitleNewTask] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleNewTask(e.currentTarget.value);


    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
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
                style={{marginTop: '10px'}}
                label={'Type value'}
                value={titleNewTask}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                error={!!error}
                helperText={error}
            />

            <IconButton onClick={onClickHandler}  color={'primary'} style={{marginTop: '15px'}}>
                <AddCircleOutline/>
            </IconButton>

        </div>
    )
} );