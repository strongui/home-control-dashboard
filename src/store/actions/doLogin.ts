import { IUserObj } from '../AppState';

export const arnold = {
  lastname: 'Schwarzenegger',
  loggedIn: true,
  name: 'Arnold',
  sex: 'M',
  username: 'arnold',
};

export default function doLogin(
  username: string,
  password: string,
  forceFail?: boolean,
): Promise<IUserObj> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (forceFail || (username !== 'arnold' || password !== 'test')) {
        resolve({
          error: 'Username or password are invalid.',
          loggedIn: false,
        });
      } else {
        window.localStorage.setItem('hccLoggedIn', 'true');
        resolve(arnold);
      }
    }, 1000);
  });
}
