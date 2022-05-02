const useValidation = (callback: Function) => {
  const validate = (
    username: string,
    password: string,
    confirmPassword: string,
    view: string
  ): boolean => {
    let isValid = false;

    if (view === 'Signup') {
      const passwordRegex =
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

      if (!username || !password || !confirmPassword) {
        callback('Please fill out required fields.');
      } else if (username.length < 3) {
        callback('Username must be at least 3 characters.');
      } else if (!passwordRegex.test(password)) {
        callback(
          'Password must be at least 6 characters, symbol, upper and lower case letters and a number.'
        );
      } else if (password !== confirmPassword) {
        callback("Password and confirmed password don't match.");
      } else {
        callback('');
        isValid = true;
      }
    } else {
      if (!username || !password) {
        callback('Username and password are required.');
      } else {
        callback('');
        isValid = true;
      }
    }

    return isValid;
  };

  return [validate];
};

export default useValidation;
