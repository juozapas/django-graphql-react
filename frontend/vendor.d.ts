declare module 'lodash.flowright';

declare module '*.graphql' {
    import {DocumentNode} from 'graphql';

    const value: DocumentNode;
    export = value;
}