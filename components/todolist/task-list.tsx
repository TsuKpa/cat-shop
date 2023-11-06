import Task from './task';

import { ITask, onChangeStatusType } from '../../models/';

import { JSX } from 'react/jsx-runtime';

function TaskList(props: { tasks: ITask[]; onChangeStatus: onChangeStatusType }) {
    let result: JSX.Element[] = [];

    for (const task of props.tasks) {
        result.push(<Task task={task} key={task.id} onChangeStatus={props.onChangeStatus} />);
    }

    return <>{result}</>;
}

export default TaskList;
