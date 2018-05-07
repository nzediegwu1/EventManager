import axios from 'axios';
const signin = (res, history) => {
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

export const apiLink = 'http://localhost:8080'; // 'https://eventmanageronline.herokuapp.com';

export const getAll = (props, type) => {
  let dispatchAction;
  const { history } = props;
  const token = JSON.parse(localStorage.token).value;
  if (type === 'centers') {
    dispatchAction = props.populateCenters;
  } else if (type === 'events') {
    dispatchAction = props.populateEvents;
  } else {
    dispatchAction = props.populateUserList;
  }
  axios
    .get(`${apiLink}/api/v1/${type}/?token=${token}`)
    .then(res => {
      dispatchAction(res.data.data);
    })
    .catch(err => {
      const status = err.response.status;
      if (status === 403 || status === 401) history.push('/');
      alert(err);
    });
};
export const deleteResource = (url, history) => {
  axios
    .delete(url)
    .then(res => {
      alert(res.data.data);
      history.push('/dashboard/events');
    })
    .catch(err => {
      alert(err.response.data.message);
      const status = err.response.status;
      if (status === 403 || status === 401) {
        logout('addNewEvent', history);
      }
    });
};
export const onboarding = (props, data, context) => {
  const { history, setAccountType } = props;
  const url = context === 'signup' ? `${apiLink}/api/v1/users` : `${apiLink}/api/v1/users/login`;
  axios
    .post(url, data)
    .then(res => {
      alert('Successful');
      signin(res, history);
      setAccountType(res.data.data.User.accountType);
    })
    .catch(err => {
      alert(err.response.data.message);
    });
};

export const getOne = (props, itemId, type) => {
  let dispatchAction;
  let details;
  if (type === 'centers') {
    dispatchAction = props.setCenterDetails;
  } else if (type === 'events') {
    dispatchAction = props.setEventDetail;
  } else if (type === 'users') {
    dispatchAction = props.setProfileDetails;
  }
  const pageTitle = type === 'centers' ? 'centerDetails' : 'manageEvent';
  const { setPage, history } = props;
  axios
    .get(`${apiLink}/api/v1/${type}/${itemId}`)
    .then(res => {
      details = res.data.data;
      dispatchAction(details);
      if (type === 'events' || type === 'centers') {
        setPage(pageTitle);
      }
    })
    .catch(err => {
      const status = err.response.status;
      const errorMessage = err.response.data.message;
      if (status === 500) {
        alert(errorMessage.name);
      } else {
        alert(errorMessage);
      }
      if (status === 404 || status === 400) history.push(`/dashboard/${type}`);
    });
  if (type === 'users') {
    return details;
  }
};

export class Transactions {
  constructor(props, target) {
    this.props = props;
    this.target = target; // center or event or profile
  }
  addOrUpdate(itemiId, data) {
    let http;
    const { modalTitle, history } = this.props;
    const token = JSON.parse(localStorage.token).value;
    let dispatchAction;
    if (this.target === 'facilities') {
      dispatchAction = this.props.populateFacilities;
    } else if (this.target === 'center') {
      dispatchAction = this.props.setCenterDetails;
    } else if (this.target === 'event') {
      dispatchAction = this.props.setEventDetail;
    } else if (
      this.target === 'profilePic' ||
      this.target === 'upgrade' ||
      this.target === 'profile'
    ) {
      dispatchAction = this.props.setProfileDetails;
    }
    // capitalize target string
    const modalType = `${this.target.charAt(0).toUpperCase()}${this.target.slice(1)}`;
    if (this.target === 'profilePic') {
      http = axios.put(`${apiLink}/api/v1/users/changePic`, data);
    } else if (this.target === 'profile') {
      http = axios.put(`${apiLink}/api/v1/users/?token=${token}`, data);
    } else if (this.target === 'facilities') {
      http = axios.post(`${apiLink}/api/v1/facilities/${itemiId}?token=${token}`, data);
    } else if (this.target === 'upgrade') {
      http = axios.put(
        `${apiLink}/api/v1/users/${itemiId}/upgrade/?token=${token}&accountType=${data}`
      );
    } else if (!modalTitle) {
      http = axios.put(`${apiLink}/api/v1/events/approve/${itemiId}?token=${token}`, data);
    } else if (modalTitle === `New ${modalType}`) {
      http = axios.post(`${apiLink}/api/v1/${this.target}s`, data);
    } else {
      http = axios.put(`${apiLink}/api/v1/${this.target}s/${itemiId}`, data);
    }
    let details;
    http
      .then(response => {
        details = response.data.data;
        if (this.target === 'facilities') {
          dispatchAction(data.content);
          $('#manageFacilities').modal('hide');
        } else {
          dispatchAction(details);
        }
        if (this.target === 'center' || this.target === 'event') {
          history.push(`/dashboard/${this.target}s/${details.id}`);
        }
        if (this.target === 'center') {
          $('#addNewCenter').modal('hide');
        } else if (this.target === 'event') {
          $('#addNewEvent').modal('hide');
        }
        alert('Transaction Successful');
      })
      .catch(err => {
        console.log(err);
        const message = err.response.data.message;
        if (typeof message !== 'object') {
          alert(JSON.stringify(message));
        } else {
          let occupiedDates = '';
          message.OccupiedDates.forEach(date => {
            occupiedDates += `${new Date(date).toDateString()}\n`;
          });
          alert(`MESSAGE:\n${message.Sorry}\n\nOCCUPIED DATES:\n${occupiedDates}`);
          occupiedDates = '';
        }
        const status = err.response.status;
        if (status === 403 || status === 401) {
          if (this.target === 'center') {
            logout('addNewCenter', history);
          } else if (this.target === 'event') {
            logout('addNewEvent', history);
          } else {
            logout('manageFacilities', history);
          }
        }
      });
    if (this.target === 'profilePic' || this.target === 'upgrade' || this.target === 'profile') {
      return details;
    }
  }
  uploadImage(imageData, saveResource) {
    axios
      .post('https://api.cloudinary.com/v1_1/eventmanager/image/upload', imageData)
      .then(res => saveResource(res))
      .catch(err => {
        alert(err.response); // unsuccessful image upload
      });
  }
}
