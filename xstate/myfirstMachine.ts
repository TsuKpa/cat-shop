import { assign, createMachine } from 'xstate';
import { createActorContext } from '@xstate/react';

import { AllUsersQuery, UpdateUserMutation } from '@/nexus/client';
import { getUrqlClient } from '@/nexus/client/graphclient';
const { client } = getUrqlClient();
export const myMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QFdZgE4FkCGBjAFgJYB2YAdAGZgAuBJUAxBAPalkkBuzA1uahjjpsqtIsSgJOzXNmqFWAbQAMAXWUrEoAA7NYhOa00gAHogBMZgIxklANjMAWABwOA7A8tWlATgcAaEABPcx8yAGYIyKjIywBfWID+LDwxchEhRgx0ZnQyLQAbWQocgFsyJMFUyhoMyWIuGQNidXUjHT0mo1MEC2s7Rxd3T0sffyDECKUbJ2jZ+MS0ZKFyWGRcXDhYBkwAVQAVAEE9gFFWpBB2-XliLsRnMLIHMPdbXydHK28A4J6wqYBWf7eJzef4zaJxBIgCopEjkErIaiya5MVjkKS8cqLSpwsgIpFNOoNZGKVRnbS6K6Gc7de6PZ4OV7OD6WL7jBDeKZKcGzKLzaHY2FsfEk4gMLI5PKFajFdBlGHLPGI0VE6SilqqNqUzo0xBOEZkf6uJx2MLeWzOJ5Ob56h5mVxhJ6uf7xKHEZgQOBGBWpLUda63BAAWlsNuDtn5Ptx6TEUD9VJuuoQDjMYac-zIrm5vL5UKjbFW6028Z1oG6YQt9JebxZbJ+ZjCfSBILBs0hCwEQvhytLF21AaTFtshssgNc3gsFbCZmt7P1hsjgsVFGwhHyyHQYBLA7LiG8rjM4U8KeediU-zcYcsnjIZhdrqAA */
    predictableActionArguments: true,
    id: 'userMachine',
    initial: 'fetching',
    context: {
        users: [],
        error: null,
    },
    on: {
        callFetch: {
            target: 'fetching',
        },
    },
    states: {
        fetching: {
            invoke: {
                src: () => client.query(AllUsersQuery).toPromise(),
                onDone: {
                    actions: assign({
                        users: (_, event) => {
                            const { data } = event;
                            return data?.data?.allUsers || [];
                        },
                    }),
                    target: 'success',
                },
                onError: {
                    target: 'failure',
                    actions: assign({
                        error: (_, event) => event.data,
                    }),
                },
            },
        },
        success: {},
        failure: {},
    },
});
export const MyMachineReactContext = createActorContext(myMachine);
