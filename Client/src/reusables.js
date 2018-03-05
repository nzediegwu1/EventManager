export const signin = (res, history) => {
  const token = {
    value: res.data.data.Token,
    accountType: res.data.data.User.accountType,
    id: res.data.data.User.id,
  }
  localStorage.setItem('token', JSON.stringify(token));
  history.push('/dashboard');
};

export const logout = (id, history) => {
  localStorage.clear();
  $(`#${id}`).modal('hide');
  history.push('/');
};

export const getCenters = (axios, populateCenters) => {
  axios.get('http://localhost:8080/api/v1/centers')
    .then(res => {
      populateCenters(res.data.data);
    }).catch(err => {
      alert(err);
    });
}