import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
};

export type Mutation = {
    __typename?: 'Mutation';
    createUser?: Maybe<User>;
    deleteUser?: Maybe<Scalars['String']['output']>;
    updateUser?: Maybe<User>;
};

export type MutationCreateUserArgs = {
    email?: InputMaybe<Scalars['String']['input']>;
    name?: InputMaybe<Scalars['String']['input']>;
};

export type MutationDeleteUserArgs = {
    id?: InputMaybe<Scalars['Int']['input']>;
};

export type MutationUpdateUserArgs = {
    email?: InputMaybe<Scalars['String']['input']>;
    id?: InputMaybe<Scalars['Int']['input']>;
    name?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
    __typename?: 'Query';
    allUsers?: Maybe<Array<Maybe<User>>>;
};

export type User = {
    __typename?: 'User';
    email: Scalars['String']['output'];
    id: Scalars['Int']['output'];
    isDeleted: Scalars['Boolean']['output'];
    name: Scalars['String']['output'];
};