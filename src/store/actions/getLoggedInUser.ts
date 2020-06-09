import { IUserObj } from '../AppState';

export default function getLoggedInUser(): IUserObj {
  const users: IUserObj[] =
    window.localStorage.getItem('hcdUsers') === null
      ? []
      : JSON.parse(window.localStorage.getItem('hcdUsers') as string);
  const loggedInUsername = window.localStorage.getItem('hcdLoggedIn');
  const userFind = users.filter((user) => user.username === loggedInUsername);

  if (userFind.length) {
    return userFind[0];
  }

  return {} as IUserObj;
}
