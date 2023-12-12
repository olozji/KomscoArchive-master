import http from '../lib/http/httpCommon';
import IPostData from '../types/Post';

const getAll = () => {
  return http.get<Array<IPostData>>('/posts');
};

const get = (id: any) => {
  return http.get<IPostData>(`/posts/${id}`);
};

const create = (data: IPostData) => {
  return http.post<IPostData>('/posts', data);
};

const update = (id: any, data: IPostData) => {
  return http.put<any>(`/posts/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/posts/${id}`);
};

const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default TutorialService;
