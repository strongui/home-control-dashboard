import { IUserObj, IRegisterObj } from '../AppState';

export default function doUpdateUser(
  obj: IRegisterObj,
  currentUser: IUserObj
): Promise<IUserObj | string> {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        const users: IUserObj[] =
          window.localStorage.getItem('hcdUsers') === null
            ? []
            : JSON.parse(window.localStorage.getItem('hcdUsers') as string);

        const { password, username, passwordConfirm, ...rest } = obj;
        const updatingPassword = password || passwordConfirm;
        const newUser: IUserObj = {
          ...currentUser,
          ...rest,
          username: currentUser.username,
          password: updatingPassword ? password : currentUser.password,
        };
        const requiredFieldMissing = !obj.name || !obj.lastname || !obj.sex;

        if (updatingPassword && password !== passwordConfirm) {
          resolve('Password and password confirmation do not match.');
        } else if (requiredFieldMissing) {
          resolve('Required fields are missing.');
        } else {
          const freshUsers = users.map((user) =>
            user.username === currentUser.username ? newUser : user
          );
          window.localStorage.setItem('hcdUsers', JSON.stringify(freshUsers));
          resolve(newUser);
        }
      }, 500);
    } catch (error) {
      resolve('Unknown error has occurred.');
    }
  });
}
