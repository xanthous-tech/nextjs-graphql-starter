import React from 'react';
import getField from 'lodash/get';
import { compose } from 'react-apollo';

import { withRouter } from 'next/router';
import withI18n from '../lib/withI18n';
import withData from '../lib/withData';

import GQLSays from '../components/gqlsays';
import t from '../i18n';

const Index = (props) => {
  const { name } = getField(props, 'router.query', {});

  return (
    <div>
      <h1>{t.greeting.title()}</h1>
      <GQLSays name={name} />
    </div>
  );
};

export default compose(
  withRouter,
  withData,
  withI18n,
)(Index);
