const token = {
  value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ4id_zFhCIvUxQYOnGcNdyKmoEXRjk4',
  accountType: 'regular',
  id: 1,
};

class MockLocalStorage {
  constructor() {
    this.data = {
      token: JSON.stringify(token),
    };
    this.token = this.data.token;
  }
  clear = () => {
    this.data = {};
  };

  getItem = item => this.data[item] || null;

  setItem = (item, value) => {
    this.data[item] = value.toString();
  };
}
global.localStorage = new MockLocalStorage();
