import gql from 'graphql-tag';

export const HELLO_KEY = 'sayHi';
export const HELLO = gql`
  query sayHi($name: String) {
     ${HELLO_KEY}(name: $name) {
       greeting
    }
  }
`;
