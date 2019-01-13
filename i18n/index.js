import React from 'react';
import { FormattedMessage } from 'react-intl';
import setField from 'lodash/set';

import data from './data.json';

const injectableFormattedMessage = (id, intl) => {
  if (intl) {
    return intl.formatMessage({
      id,
    });
  }

  return <FormattedMessage id={id} />;
};

const result = Object.keys(data).reduce((r, key) => {
  setField(r, key, injectableFormattedMessage.bind(null, key));
  return r;
}, {});

export default result;
