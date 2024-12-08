import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
            <input
                value={titleNewTask}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                className={error ? 'error' : ''}
            />
            <button onClick={onClickHandler}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}