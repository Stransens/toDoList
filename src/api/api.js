import fetch from 'isomorphic-fetch';
import AsyncStorage from '@react-native-community/async-storage';

const API_HOST = 'https://testapi.doitserver.in.ua/api';

export function getAPIURL(endpoint) {
    return API_HOST + endpoint;
}

export function stringifyQuery(data) {
    return Object.keys(data).length > 0
        ? '?' +
        Object.keys(data)
            .map(function (key) {
                return (
                    encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
                );
            })
            .join('&')
        : '';
}

export default function request(
    endpoint,
    method = 'GET',
    data = {},
    isJSON = true,
) {
    return new Promise(function (resolve, reject) {
        const options = {
            url: getAPIURL(endpoint),
            method,
            headers: {
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            timeout: 30 * 1000,
        };

        Object.keys(data).forEach((key) => {
            if (data[key] === undefined || (method === 'GET' && data[key] === null)) {
                delete data[key];
            }
        });

        if (isJSON) {
            options.headers['Content-Type'] = 'application/json; charset=utf-8';
            options.body = JSON.stringify(data);
        } else {
            options.body = data;
        }

        if (method === 'GET') {
            if (data) {
                options.url += stringifyQuery(data);
                options.body = null;
            }
        }

        AsyncStorage.getItem('token').then((token) => {
            if (token) {
                options.headers.Authorization = 'Bearer ' + token;
                fetchFunction();
            } else {
                fetchFunction();
            }
        });

        function fetchFunction() {
            fetch(options.url, {
                method: options.method,
                headers: options.headers,
                body: options.body,
                credentials: 'same-origin',
            })
                .then((response) =>
                    response.text().then((body) => {
                        let json = {};
                        if (body) {
                            try {
                                json = JSON.parse(body);
                            } catch (e) {
                                //
                            }
                        }
                        if (!response.ok) {
                            if (!json.message) {
                                let message = response.statusText;
                                if (response.status > 499 && response.status < 600) {
                                    message = 'Unable to process request. Please try later';
                                }
                                reject({
                                    message,
                                    status: response.status,
                                });
                                return;
                            }
                            reject({
                                ...json,
                                status: response.status,
                            });
                            return;
                        }
                        return json;
                    }),
                )
                .then(resolve)
                .catch((e) => {
                    console.log(e);
                });
        }
    });
}
