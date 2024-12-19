import {FilterValueType, TodoListsPropsType} from '../App'
import {v1} from 'uuid'
import {ChangeTodolistFilterActionType, ChangeTodolistTitleActionType, todolistsReducer} from './todolists-reducer.tx';

test('correct should be removed', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<TodoListsPropsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(startState, {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistID1
        }
    });

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);

})

test('correct todolist should be added', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodoListsPropsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(startState, {
        type: 'ADD-TODOLIST',
        payload: {
            title: newTodolistTitle
        }

    });

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe("all");

})


test('correct todolist should change its name', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodoListsPropsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const action: ChangeTodolistTitleActionType = {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: todolistID2,
            title: newTodolistTitle
        }

    };

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);

})

test('correct filter of todolist should be changed', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let newFilter: FilterValueType = 'completed'

    const startState: Array<TodoListsPropsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const action: ChangeTodolistFilterActionType = {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id: todolistID2,
            filter: newFilter
        }

    };

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);

})