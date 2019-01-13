import React from 'react';
import { Query } from 'react-apollo';

import { HELLO, HELLO_KEY } from '../graphql/hello';

const GQLSays = ({ name }) => (
  <Query query={HELLO} variables={{ name }}>
    {({ loading, data, error }) => {
      if (error) {
        console.error(error);
        return <div>Error</div>;
      }

      if (loading) {
        return <div>Loading...</div>;
      }

      const response = data[HELLO_KEY];
      // eslint-disable-next-line react/jsx-one-expression-per-line
      return <p>Graphql says: {response.greeting}</p>;
    }}
  </Query>
);

export default GQLSays;
