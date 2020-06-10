import { IUserObj, IUserApiObj } from '../AppState';

export default function doUpdateUser(
  obj: IUserApiObj = {},
  currentUser: IUserObj
): Promise<IUserObj | string> {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        const users: IUserObj[] =
          window.localStorage.getItem('hcdUsers') === null
            ? []
            : JSON.parse(window.localStorage.getItem('hcdUsers') as string);

        const currentUserApiObj = currentUser.api ? currentUser.api : {};
        const newUserApiObj: IUserApiObj = {
          ...currentUserApiObj,
          ...obj,
        };
        const newUser: IUserObj = { ...currentUser, api: newUserApiObj };

        const freshUsers = users.map((user) =>
          user.username === currentUser.username ? newUser : user
        );
        window.localStorage.setItem('hcdUsers', JSON.stringify(freshUsers));
        resolve(newUser);
      }, 500);
    } catch (error) {
      resolve('Unknown error has occurred.');
    }
  });
}
