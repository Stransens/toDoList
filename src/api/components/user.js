import request from '../api';

export function signIn(data) {
  return request('/auth', 'POST', data);
}

export function signUp(data) {
  return request('/users', 'POST', data);
}
