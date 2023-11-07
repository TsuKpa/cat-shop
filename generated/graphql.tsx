import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
    DateTime: { input: any; output: any };
};

export type AffectedRowsOutput = {
    __typename?: 'AffectedRowsOutput';
    count: Scalars['Int']['output'];
};

export type BoolFieldUpdateOperationsInput = {
    set?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BoolFilter = {
    equals?: InputMaybe<Scalars['Boolean']['input']>;
    not?: InputMaybe<NestedBoolFilter>;
};

export type DateTimeFieldUpdateOperationsInput = {
    set?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DateTimeFilter = {
    equals?: InputMaybe<Scalars['DateTime']['input']>;
    gt?: InputMaybe<Scalars['DateTime']['input']>;
    gte?: InputMaybe<Scalars['DateTime']['input']>;
    in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
    lt?: InputMaybe<Scalars['DateTime']['input']>;
    lte?: InputMaybe<Scalars['DateTime']['input']>;
    not?: InputMaybe<NestedDateTimeFilter>;
    notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type IntFilter = {
    equals?: InputMaybe<Scalars['Int']['input']>;
    gt?: InputMaybe<Scalars['Int']['input']>;
    gte?: InputMaybe<Scalars['Int']['input']>;
    in?: InputMaybe<Array<Scalars['Int']['input']>>;
    lt?: InputMaybe<Scalars['Int']['input']>;
    lte?: InputMaybe<Scalars['Int']['input']>;
    not?: InputMaybe<NestedIntFilter>;
    notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Mutation = {
    __typename?: 'Mutation';
    bigRedButton?: Maybe<Scalars['String']['output']>;
    createOneUser: User;
    deleteManyUser: AffectedRowsOutput;
    deleteOneUser?: Maybe<User>;
    updateManyUser: AffectedRowsOutput;
    updateOneUser?: Maybe<User>;
};

export type MutationCreateOneUserArgs = {
    data: UserCreateInput;
};

export type MutationDeleteManyUserArgs = {
    where?: InputMaybe<UserWhereInput>;
};

export type MutationDeleteOneUserArgs = {
    where: UserWhereUniqueInput;
};

export type MutationUpdateManyUserArgs = {
    data: UserUpdateManyMutationInput;
    where?: InputMaybe<UserWhereInput>;
};

export type MutationUpdateOneUserArgs = {
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};

export type NestedBoolFilter = {
    equals?: InputMaybe<Scalars['Boolean']['input']>;
    not?: InputMaybe<NestedBoolFilter>;
};

export type NestedDateTimeFilter = {
    equals?: InputMaybe<Scalars['DateTime']['input']>;
    gt?: InputMaybe<Scalars['DateTime']['input']>;
    gte?: InputMaybe<Scalars['DateTime']['input']>;
    in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
    lt?: InputMaybe<Scalars['DateTime']['input']>;
    lte?: InputMaybe<Scalars['DateTime']['input']>;
    not?: InputMaybe<NestedDateTimeFilter>;
    notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedIntFilter = {
    equals?: InputMaybe<Scalars['Int']['input']>;
    gt?: InputMaybe<Scalars['Int']['input']>;
    gte?: InputMaybe<Scalars['Int']['input']>;
    in?: InputMaybe<Array<Scalars['Int']['input']>>;
    lt?: InputMaybe<Scalars['Int']['input']>;
    lte?: InputMaybe<Scalars['Int']['input']>;
    not?: InputMaybe<NestedIntFilter>;
    notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedStringFilter = {
    contains?: InputMaybe<Scalars['String']['input']>;
    endsWith?: InputMaybe<Scalars['String']['input']>;
    equals?: InputMaybe<Scalars['String']['input']>;
    gt?: InputMaybe<Scalars['String']['input']>;
    gte?: InputMaybe<Scalars['String']['input']>;
    in?: InputMaybe<Array<Scalars['String']['input']>>;
    lt?: InputMaybe<Scalars['String']['input']>;
    lte?: InputMaybe<Scalars['String']['input']>;
    not?: InputMaybe<NestedStringFilter>;
    notIn?: InputMaybe<Array<Scalars['String']['input']>>;
    startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
    __typename?: 'Query';
    allUsers?: Maybe<Array<Maybe<User>>>;
    user?: Maybe<User>;
    users: Array<User>;
};

export type QueryUserArgs = {
    where: UserWhereUniqueInput;
};

export type QueryUsersArgs = {
    after?: InputMaybe<UserWhereUniqueInput>;
    before?: InputMaybe<UserWhereUniqueInput>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export enum QueryMode {
    Default = 'default',
    Insensitive = 'insensitive',
}

export type StringFieldUpdateOperationsInput = {
    set?: InputMaybe<Scalars['String']['input']>;
};

export type StringFilter = {
    contains?: InputMaybe<Scalars['String']['input']>;
    endsWith?: InputMaybe<Scalars['String']['input']>;
    equals?: InputMaybe<Scalars['String']['input']>;
    gt?: InputMaybe<Scalars['String']['input']>;
    gte?: InputMaybe<Scalars['String']['input']>;
    in?: InputMaybe<Array<Scalars['String']['input']>>;
    lt?: InputMaybe<Scalars['String']['input']>;
    lte?: InputMaybe<Scalars['String']['input']>;
    mode?: InputMaybe<QueryMode>;
    not?: InputMaybe<NestedStringFilter>;
    notIn?: InputMaybe<Array<Scalars['String']['input']>>;
    startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
    __typename?: 'User';
    email: Scalars['String']['output'];
    id: Scalars['Int']['output'];
    name: Scalars['String']['output'];
};

export type UserCreateInput = {
    createdAt?: InputMaybe<Scalars['DateTime']['input']>;
    email: Scalars['String']['input'];
    isDeleted?: InputMaybe<Scalars['Boolean']['input']>;
    name: Scalars['String']['input'];
    updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserUpdateInput = {
    createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
    email?: InputMaybe<StringFieldUpdateOperationsInput>;
    isDeleted?: InputMaybe<BoolFieldUpdateOperationsInput>;
    name?: InputMaybe<StringFieldUpdateOperationsInput>;
    updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type UserUpdateManyMutationInput = {
    createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
    email?: InputMaybe<StringFieldUpdateOperationsInput>;
    isDeleted?: InputMaybe<BoolFieldUpdateOperationsInput>;
    name?: InputMaybe<StringFieldUpdateOperationsInput>;
    updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type UserWhereInput = {
    AND?: InputMaybe<Array<UserWhereInput>>;
    NOT?: InputMaybe<Array<UserWhereInput>>;
    OR?: InputMaybe<Array<UserWhereInput>>;
    createdAt?: InputMaybe<DateTimeFilter>;
    email?: InputMaybe<StringFilter>;
    id?: InputMaybe<IntFilter>;
    isDeleted?: InputMaybe<BoolFilter>;
    name?: InputMaybe<StringFilter>;
    updatedAt?: InputMaybe<DateTimeFilter>;
};

export type UserWhereUniqueInput = {
    AND?: InputMaybe<Array<UserWhereInput>>;
    NOT?: InputMaybe<Array<UserWhereInput>>;
    OR?: InputMaybe<Array<UserWhereInput>>;
    createdAt?: InputMaybe<DateTimeFilter>;
    email?: InputMaybe<StringFilter>;
    id?: InputMaybe<Scalars['Int']['input']>;
    isDeleted?: InputMaybe<BoolFilter>;
    name?: InputMaybe<StringFilter>;
    updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AllUsersQueryVariables = Exact<{ [key: string]: never }>;

export type AllUsersQuery = { __typename?: 'Query'; allUsers?: Array<{ __typename?: 'User'; id: number; name: string } | null> | null };

export const AllUsersDocument = gql`
    query AllUsers {
        allUsers {
            id
            name
        }
    }
`;

export function useAllUsersQuery(options?: Omit<Urql.UseQueryArgs<AllUsersQueryVariables>, 'query'>) {
    return Urql.useQuery<AllUsersQuery, AllUsersQueryVariables>({ query: AllUsersDocument, ...options });
}
