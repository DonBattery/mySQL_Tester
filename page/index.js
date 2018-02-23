/* eslint linebreak-style: ['error', 'windows'] */

const myUrl = '';

function myRequester(method = 'GET', type = 'text', url = '', parameters = [], querys = {}, body = null, readyCallback = () => {}, errorCallback = () => {}) {
  const reqURL = url.concat('/', parameters.join('/'), (querys.length > 0) ? '?'.concat(Object.keys(querys).map(key => key.concat('=', encodeURIComponent(querys[key]))).join('&')) : '');
  const myRequest = new XMLHttpRequest();
  myRequest.open(method, reqURL);
  if (type === 'JSON') {
    myRequest.setRequestHeader('Content-Type', 'application/json');
    myRequest.setRequestHeader('Accept', 'application/json');
  }
  myRequest.onreadystatechange = function myLoader() {
    if (myRequest.readyState === 4) {
      switch (myRequest.status) {
        case 200:
          readyCallback(JSON.parse(myRequest.responseText));
          break;
        default:
          errorCallback(`Status : ${myRequest.status} Text : ${myRequest.statusText}`);
      }
    }
  };
  myRequest.send(JSON.stringify(body));
}

function readyLogger(params) {
  console.log('Ready', params);
}

function errorLogger(params) {
  console.log('Error', params);
}

function pageLoad() {
  const button1 = document.getElementById('myButton1');
  const button2 = document.getElementById('myButton2');
  button1.addEventListener('click', () => {
    myRequester('GET', 'JSON', myUrl, ['get'], {}, null, readyLogger, errorLogger);
  });
  button2.addEventListener('click', () => {
    myRequester('POST', 'JSON', myUrl, ['post'], {}, { name: 'Olga' }, readyLogger, errorLogger);
  });
}

window.addEventListener('load', pageLoad);
