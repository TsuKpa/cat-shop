import gql from 'graphql-tag';

export const AllUsersQuery = gql`
    query AllUsers {
        allUsers {
            id
            name
            email
        }
    }
`;

export const CreateUserMutation = gql`
    mutation CreateUser($name: String!, $email: String!) {
        createUser(name: $name, email: $email) {
            name
            email
        }
    }
`;

export const UpdateUserMutation = gql`
    mutation UpdateUser($id: Int!, $name: String!, $email: String!) {
        updateUser(id: $id, name: $name, email: $email) {
            id
            name
            email
        }
    }
`;

export const DeleteUserMutation = gql`
    mutation DeleteUser($id: Int!) {
        deleteUser(id: $id) {
            id
        }
    }
`;
