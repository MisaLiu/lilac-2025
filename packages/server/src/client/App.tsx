import React from 'react';

import 'amis/lib/themes/cxd.css';
import 'amis/lib/helper.css';
import 'amis/sdk/iconfont.css';

import { render as renderAmis, ToastComponent, AlertComponent } from 'amis';

import MemberPage from './pages/member';
import { Schema } from 'amis/lib/types';

// this is for navigation bars 
const pageMap: Record<string, Schema> = {
  'member': MemberPage
}

const env = {
  fetcher: ({ url, method, data, responseType, config, headers }: any) => {
    config = config || {};
    config.withCredentials = true;
    responseType && (config.responseType = responseType);

    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);

    Object.keys(headers || {}).forEach((key) => {
      xhr.setRequestHeader(key, headers[key]);
    });

    return new Promise<any>((resolve, reject) => {
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = function () {
        reject(xhr.statusText);
      };
      xhr.send(data);
    });
  },
  theme: 'default'
};

class AMISComponent extends React.Component<any, any> {
  render() {
    const page = new URLSearchParams(window.location.search).get('page');
    if (page === null) {
      // jump to member page
      window.location.href = '/?page=member';
      return null;
    }
    return renderAmis(pageMap[page], {}, env);
  }
}

class App extends React.Component<any, any> {
  render() {
    return (
      <>
        <ToastComponent key="toast" position={'top-right'} />
        <AlertComponent key="alert" />
        <AMISComponent />
      </>
    );
  }
}

export default App;