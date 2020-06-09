import { IUserObj } from '../AppState';

export default function doLogin(
  username: string,
  password: string,
  forceFail?: boolean
): Promise<IUserObj | string> {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        const users: IUserObj[] =
          window.localStorage.getItem('hcdUsers') === null
            ? []
            : JSON.parse(window.localStorage.getItem('hcdUsers') as string);
        const userFind = users.filter(
          (user) => user.username === username && user.password === password
        );
        const user = userFind.length ? userFind[0] : null;
        if (forceFail || user === null) {
          resolve('Username or password are invalid.');
        } else {
          if (user.username) {
            window.localStorage.setItem('hcdLoggedIn', user.username);
          }
          resolve(user);
        }
      }, 1000);
    } catch (error) {
      resolve('Unknown error has occurred.');
    }
  });
}
