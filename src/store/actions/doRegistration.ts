import { IUserObj, IRegisterObj } from '../AppState';

export default function doRegistration(obj: IRegisterObj): Promise<IUserObj | string> {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        const { lastname, name, password, sex, username, passwordConfirm } = obj;
        const users: IUserObj[] =
          window.localStorage.getItem('hcdUsers') === null
            ? []
            : JSON.parse(window.localStorage.getItem('hcdUsers') as string);
        const userFind = users.filter((user) => user.username === username);
        const userAlreadyExists = userFind.length > 0 ? true : false;

        if (password !== passwordConfirm) {
          resolve('Password and password confirmation do not match.');
        } else if (userAlreadyExists) {
          resolve('Username is already taken.');
        } else {
          const newUser = { lastname, name, password, sex, username };
          users.push(newUser);
          if (username) {
            window.localStorage.setItem('hcdLoggedIn', username);
          }
          window.localStorage.setItem('hcdUsers', JSON.stringify(users));
          resolve(newUser);
        }
      }, 1000);
    } catch (error) {
      resolve('Unknown error has occurred.');
    }
  });
}
