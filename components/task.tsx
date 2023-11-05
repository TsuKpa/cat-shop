import { ITask, onChangeStatusType, Status } from '../models/task.model';

function Task(props: { task: ITask; onChangeStatus: onChangeStatusType }) {
    let checked = props.task.status === Status.COMPLETED ? true : false;
    const handleOnchange = () => {
        checked = !checked;
        props.onChangeStatus(checked, props.task.id);
    };
    const handleDelete = () => {
        checked = !checked;
        props.onChangeStatus(checked, props.task.id, true);
    };
    let className = 'w-full py-4 ml-4 text-sm font-medium dark:text-gray-600';
    if (props.task?.status === Status.COMPLETED) {
        className += ' line-through';
    }
    return (
        <>
            <div className="mt-3 flex gap-x-4 relative">
                <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 w-full hover:shadow cursor-pointer">
                    <input
                        id="bordered-checkbox-1"
                        type="checkbox"
                        defaultChecked={checked}
                        onChange={handleOnchange}
                        name="bordered-checkbox"
                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className={className}>{props.task?.content || 'error'}</label>
                </div>
                <button
                    onClick={handleDelete}
                    type="submit"
                    className="text-white absolute right-2.5 bottom-2.5 bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{' '}
                        <path
                            fillRule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                    </svg>
                </button>
            </div>
        </>
    );
}
export default Task;
