import request from '../api';

export function list(data) {
      return request('/tasks', 'GET', data);
}

export function create(data) {
      return request('/tasks', 'POST', data);
}

export function getTask(id, data) {
      return request(`/tasks/${id}`, 'GET', data);
}

export function updateTask(id, data) {
      return request(`/tasks/${id}`, 'PUT', data);
}

export function deleteTask(id) {
      return request(`/tasks/${id}`, 'DELETE');
}
