export const signin = (res, history) => {
    const token = {
        value: res.data.data.Token,
        accountType: res.data.data.User.accountType,
        id: res.data.data.User.id,
    }
    localStorage.setItem('token', JSON.stringify(token));
    history.push('/dashboard');
};
