const initialState = {
  currentPage: 'centers',
  modalTitle: 'Add Center',
  required: false,
  eventDefaults: {
    title: "Anaeze's Birthday",
    date: 'July 11, 2018',
    picture: 'github.com/Nzediegwu1.jpg',
    description: 'Birthday of programmer Anaeze',
    centerId: 4,
    center: {
      id: 4,
    },
  },
  centerDefaults: {
    name: 'Shareton Hotel and Suites',
    address: '235 Ikorodu Road',
    location: 'Lagos State',
    capacity: 7899,
    picture: 'github.com/shareton.jpg',
    price: 450000,
    availability: 1,
  },
  dataCount: 5,
  activePage: 2,
  random: 89384,
};
export default initialState;
