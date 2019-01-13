import gql from 'graphql-tag';

export const GET_LANGUAGE = gql`
  query {
    userModel @client {
      language
    }
  }
`;

export const UPDATE_LANGUAGE = gql`
  mutation UpdateUser($language: String) {
    updateUser(language: $language) @client
  }
`;

export const Mutations = {
  updateUser: (_, variables, { cache }) => {
    const query = gql`
      query userModel {
        userModel @client {
          __typename
          language
        }
      }
    `;
    const previos = cache.readQuery({ query });
    const data = {
      ...previos,
      userModel: Object.assign(previos.userModel, variables),
    };
    cache.writeQuery({ query, data });
    return null;
  },
};

export const Defaults = {
  userModel: {
    __typename: 'UserModel',
    language: 'zh',
  },
};
