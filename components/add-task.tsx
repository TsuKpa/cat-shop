// import Task from "./task";
// import { Task } from "../model/task";

import { useState } from 'react';

function Add(props: { addTask: (content: string) => void }) {
    const [input, setInput] = useState('');
    let [classInput, setClassInput] = useState(
        'min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-indigo-900 shadow-sm ring-1 ring-inset focus:ring-2 focus-visible:outline-indigo-500 focus:ring-inset sm:text-sm sm:leading-6'
    );
    const [showError, setShowError] = useState(false);
    const defaultClass = 'min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 shadow-sm sm:text-sm sm:leading-6';
    const errorClass = ' border-rose-500 ring-1 outline-2 outline-red-500 text-red-900 focus:ring-2 focus-visible:outline-red-500 ';
    const normalClass = ' text-indigo-900 focus-visible:outline-indigo-500 ring-1 ring-inset focus:ring-2 focus:ring-inset';
    const addTaskEvent = () => {
        classInput = defaultClass;
        if (!input) {
            classInput += errorClass;
            setShowError(true);
            setClassInput(classInput);
            return;
        }
        classInput += normalClass;
        setClassInput(classInput);
        setShowError(false);
        props.addTask(input);
        setInput('');
        setClassInput(classInput);
    };
    const handleKeyUp = (event: any) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            addTaskEvent();
        } else if (event.keyCode < 92) {
            setShowError(false);
            setClassInput(defaultClass + normalClass);
        }
    };
    return (
        <>
            <div className="mt-6 flex gap-x-4">
                <label htmlFor="task-name" className="sr-only">
                    Task name
                </label>
                <input
                    id="task-name"
                    name="task"
                    type="task"
                    autoComplete="task"
                    required
                    value={input}
                    className={classInput}
                    placeholder="Task Name"
                    onKeyUp={handleKeyUp}
                    onChange={(event) => setInput(event.target.value)}
                />
                <button
                    type="submit"
                    className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    onClick={addTaskEvent}
                >
                    Add
                </button>
            </div>
            {showError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span> Please enter your task!
                </p>
            )}
        </>
    );
}
export default Add;
