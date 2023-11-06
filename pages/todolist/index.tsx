import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, Center } from '@chakra-ui/react';
import { useState } from 'react';
import Add from '../../components/todolist/add-task';
import TaskList from '../../components/todolist/task-list';
import { ITask, Status, onChangeStatusType } from '../../models';
import Link from 'next/link';
function TodoList() {
    const [tasks, setTasks] = useState<{
        todo: ITask[];
        completed: ITask[];
    }>({
        todo: [],
        completed: [],
    });
    let [classIcon, setClassIcon] = useState('w-3.5 mr-4');
    const [isHidden, setIsHidden] = useState(true);
    const toggleOpen = () => {
        setIsHidden(!isHidden);
        classIcon = 'w-3.5 mr-4';
        if (isHidden) {
            classIcon += ' rotate-90';
        } else {
            classIcon += ' rotate-0';
        }
        classIcon += ' transition ease-in-out delay-0';
        setClassIcon(classIcon);
    };
    const addTask = (content: string) => {
        const newTask: ITask = {
            id: Math.random(),
            status: Status.DOING,
            content,
        };
        setTasks({
            ...tasks,
            todo: [newTask, ...tasks.todo],
        });
    };

    const onChangeStatus: onChangeStatusType = (checked, id, isDeleted?) => {
        let result = { ...tasks };
        const statusRemove = checked ? 'todo' : 'completed';
        const statusAdd = checked ? 'completed' : 'todo';
        const index = result[statusRemove].findIndex((task) => task.id === id);
        if (!isDeleted) {
            result[statusRemove][index].status = checked ? Status.COMPLETED : Status.DOING;
            result[statusAdd].push(result[statusRemove][index]);
        }
        result[statusRemove].splice(index, 1);
        setTasks(result);
    };
    return (
        <>
            <Center className="mt-6">
                <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
                    <BreadcrumbItem>
                        <Link href="/">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link href="/users">Users</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <Link href="/todolist" className="underline">
                            Todo-list
                        </Link>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Center>
            <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8 h-screen">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
                <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
                <div className="mx-auto max-w-2xl lg:max-w-4xl">
                    {/* LOGO */}
                    <div className="text-center text-2xl mb-8 uppercase text-sky-600">😃 Todo App 😃</div>

                    {/* Add task input */}
                    <Add addTask={addTask} />

                    {/* Todo */}
                    <TaskList tasks={tasks.todo} onChangeStatus={onChangeStatus} />

                    {/* Divider */}
                    <hr className="my-8 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />

                    {/* completed button */}
                    <button
                        onClick={toggleOpen}
                        type="button"
                        data-accordion-target="#accordion-collapse-body-1"
                        aria-expanded="true"
                        aria-controls="accordion-collapse-body-1"
                        className="w-40 text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2"
                    >
                        <svg className={classIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path d="M3.4 81.7c-7.9 15.8-1.5 35 14.3 42.9L280.5 256 17.7 387.4C1.9 395.3-4.5 414.5 3.4 430.3s27.1 22.2 42.9 14.3l320-160c10.8-5.4 17.7-16.5 17.7-28.6s-6.8-23.2-17.7-28.6l-320-160c-15.8-7.9-35-1.5-42.9 14.3z" />
                        </svg>
                        Completed
                        <span className="ml-3"> {tasks.completed.length || 0} </span>
                    </button>

                    {/* Completed */}
                    <div id="accordion-collapse-body-1" className={isHidden ? 'hidden' : ''} aria-labelledby="accordion-collapse-heading-1">
                        <TaskList tasks={tasks.completed} onChangeStatus={onChangeStatus} />
                    </div>
                </div>
            </section>
        </>
    );
}

export default TodoList;
