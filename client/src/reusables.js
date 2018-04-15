export const signin = (res, history) => {
  const token = {
    value: res.data.data.Token,
    accountType: res.data.data.User.accountType,
    id: res.data.data.User.id,
  };
  localStorage.setItem('token', JSON.stringify(token));
  history.push('/dashboard');
};

export const logout = (id, history) => {
  localStorage.clear();
  $(`#${id}`).modal('hide');
  history.push('/');
};

export const apiLink = 'https://eventmanageronline.herokuapp.com'; // 'http://localhost:8080';

export const getCenters = (axios, populateCenters) => {
  axios
    .get(`${apiLink}/api/v1/centers`)
    .then(res => {
      populateCenters(res.data.data);
    })
    .catch(err => {
      alert(err);
    });
};
export const getUsers = (axios, populateUserList, token, history) => {
  axios
    .get(`${apiLink}/api/v1/users/?token=${token}`)
    .then(res => {
      populateUserList(res.data.data);
    })
    .catch(err => {
      (err.response.status === 403 || err.response.status === 401) &&
      history.push('/');
      alert(err);
    });
};
