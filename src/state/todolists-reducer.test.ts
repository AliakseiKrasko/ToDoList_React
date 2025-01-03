import {FilterValueType, TodoListsPropsType} from '../App'
import {v1} from 'uuid'
import {
    addTodolistAC, changeTodolistFilterAC,
    ChangeTodolistFilterActionType, changeTodolistTitleAC,
    ChangeTodolistTitleActionType,
    removeTodolistsAC,
    todolistsReducer
} from './todolists-reducer.tx';

let todolistId1: string
let todolistId2: string
let startState: TodoListsPropsType[] = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
})

test('correct should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistsAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);

})

test('correct todolist should be added', () => {


    let newTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe("all");

})


test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist'

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);

})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValueType = 'completed'

    const action = changeTodolistFilterAC(newFilter, todolistId2);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);

})