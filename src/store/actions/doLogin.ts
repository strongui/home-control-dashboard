import { IUserObj } from '../AppState';

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
        resolve({
          lastname: 'Schwarzenegger',
          loggedIn: true,
          name: 'Arnold',
          sex: 'M',
          username,
        });
      }
    }, 1000);
  });
}
