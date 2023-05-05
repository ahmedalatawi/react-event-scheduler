const useValidation = () => {
  const validate = (
    username: string,
    password: string,
    confirmPassword: string,
    view: string,
  ): string => {
    let errorText = ''

    if (view === 'Signup') {
      const passwordRegex =
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/

      if (!username || !password || !confirmPassword) {
        errorText = 'Please fill out required fields.'
      } else if (username.length < 3) {
        errorText = 'Username must be at least 3 characters.'
      } else if (!passwordRegex.test(password)) {
        errorText =
          'Password must be at least 6 characters, symbol, upper and lower case letters and a number.'
      } else if (password !== confirmPassword) {
        errorText = 'Password and confirmed password do not match.'
      } else {
        errorText = ''
      }
    } else {
      if (!username || !password) {
        errorText = 'Username and password are required.'
      } else {
        errorText = ''
      }
    }

    return errorText
  }

  return [validate]
}

export default useValidation
