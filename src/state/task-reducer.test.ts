import {TasksStateType} from '../App';
import {removeTaskAC, taskReducer} from './task-reducer';

test('correct twask should be deleted from correct array', () => {
    const startState: TasksStateType = {
        todolistId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ],
    }
    const endState = taskReducer(startState, removeTaskAC({id: '2', todolistId: 'todolistId2'}))

    expect(endState).toEqual({
        todolistId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false},
        ],
    })
})