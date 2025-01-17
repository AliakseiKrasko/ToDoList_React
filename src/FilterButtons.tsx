import React from 'react';
import {filterButtonsContainerSx} from './Todolist.styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {FilterValuesType, TodolistType} from './model/todolists-reducer';


type FilterButtonsType = {
    todolist: TodolistType
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
}

export const FilterButtons = (props: FilterButtonsType) => {
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        props.changeFilter(filter, props.todolist.id)
    }
    return (
        <Box sx={filterButtonsContainerSx}>
            <Button
                variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                color={'inherit'}
                onClick={() => changeFilterTasksHandler('all')}>
                All
            </Button>
            <Button
                variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                color={'primary'}
                onClick={() => changeFilterTasksHandler('active')}>
                Active
            </Button>
            <Button
                variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                color={'secondary'}
                onClick={() => changeFilterTasksHandler('completed')}>
                Completed
            </Button>
        </Box>
    );
};

