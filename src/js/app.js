/* eslint-disable no-console */
import TaskOne from './modules/TaskOne';
import TaskTwo from './modules/TaskTwo';

const divForTaskOne = document.getElementById('taskOne');
const taskOne = new TaskOne(divForTaskOne);
taskOne.init();

const divForTaskTwo = document.getElementById('taskTwo');
const taskTwo = new TaskTwo(divForTaskTwo);
taskTwo.init();

console.log('app started');
