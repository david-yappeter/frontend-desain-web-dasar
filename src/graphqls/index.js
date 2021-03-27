import { QUERY_POSTS_GET_ALL, POST_GET_BY_ID } from "./query/Post";
import { REGISTER_USER, LOGIN_USER } from "./mutation/Auth";
import { USER_ME } from "./query/Me";
import { CREATE_POST, DELETE_POST, POST_LIKE } from "./mutation/Post";

export {
  DELETE_POST,
  QUERY_POSTS_GET_ALL,
  REGISTER_USER,
  LOGIN_USER,
  USER_ME,
  POST_LIKE,
  CREATE_POST,
  POST_GET_BY_ID,
};
