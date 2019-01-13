import React from 'react';
import getField from 'lodash/get';
import { LocaleProvider } from 'antd';
import { IntlProvider, addLocaleData } from 'react-intl';

import { graphql } from 'react-apollo';

import enUS from 'antd/lib/locale-provider/en_US';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import _zh from 'react-intl/locale-data/zh';
import _en from 'react-intl/locale-data/en';
import { GET_LANGUAGE } from '../graphql/client';
import en from '../i18n/en_US';
import zh from '../i18n/zh_CN';

const i18n = {
  messages: {
    en,
    zh,
  },
  locale: {
    en: enUS,
    zh: zhCN,
  },
};

addLocaleData(_zh);
addLocaleData(_en);

const withI18n = (Component) => {
  const WithI18n = (props) => {
    console.log(props);
    const langKey = getField(props, 'data.userModel.language', 'zh');
    const now = Date.now();

    return (
      <LocaleProvider locale={i18n.locale[langKey]}>
        <IntlProvider
          locale={langKey}
          messages={i18n.messages[langKey]}
          initialNow={now}
        >
          <Component {...props} />
        </IntlProvider>
      </LocaleProvider>
    );
  };
  return graphql(GET_LANGUAGE)(WithI18n);
};

export default withI18n;
