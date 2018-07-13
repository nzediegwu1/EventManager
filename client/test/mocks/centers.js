const centers = {
  eventCenters: [
    {
      id: 1,
      name: 'Andela Epic Tower',
      address: '121 Iju Hills, Anthony',
      location: 'Anthony, Lagos',
      capacity: 3500,
      price: 167000,
      picture:
        'https://res.cloudinary.com/eventmanager/image/upload/v1530055009/dev/centers/1530055007770-andela.jpg.jpg',
      publicId: 'dev/centers/1530055007770-andela.jpg',
      availability: 'open',
      userId: 1,
      createdAt: '2018-05-01T16:49:50.203Z',
      updatedAt: '2018-06-28T17:18:30.844Z',
    },
    {
      id: 7,
      name: 'Bolingo Hotels',
      address: '45 Maitama Avenue, Area 10',
      location: 'Garki, Abnuja',
      capacity: 3000,
      price: 250000,
      picture:
        'https://res.cloudinary.com/eventmanager/image/upload/v1526406535/dev/centers/1526406533598-Bolingo-hotel-Abuja.jpg.jpg',
      publicId: 'dev/centers/1526406533598-Bolingo-hotel-Abuja.jpg',
      availability: 'open',
      userId: 2,
      createdAt: '2018-05-15T17:48:56.656Z',
      updatedAt: '2018-05-15T17:48:56.656Z',
    },
  ],
  centerDetails: {
    id: 1,
    name: 'Andela Epic Tower',
    address: '121 Iju Hills, Anthony',
    location: 'Anthony, Lagos',
    capacity: 3500,
    price: 167000,
    picture:
      'https://res.cloudinary.com/eventmanager/image/upload/v1530055009/dev/centers/1530055007770-andela.jpg.jpg',
    publicId: 'dev/centers/1530055007770-andela.jpg',
    availability: 'open',
    userId: 1,
    createdAt: '2018-05-01T16:49:50.203Z',
    updatedAt: '2018-06-28T17:18:30.844Z',
    facilities: [
      {
        id: '069a5091-ab71-4c12-a28f-c6f5b3ca2169',
        name: 'fish',
        spec: 'golden',
        quantity: 6,
        centerId: 1,
        createdAt: '2018-07-09T15:16:32.316Z',
        updatedAt: '2018-07-09T15:16:32.316Z',
      },
    ],
    user: {
      id: 1,
      username: 'nzediegwu1',
      name: 'Anaeze Nsoffor',
      email: 'nzediegwu1@gmail.com',
      phoneNo: '2347067356519',
      company: 'Facebook',
      website: 'http://www.facebook.com/Nzediegwu1',
      address: '89 Ojuelegba Road, Ikeja, Lagos State',
      picture:
        'https://res.cloudinary.com/eventmanager/image/upload/v1527432411/dev/profile/1527432409068-18010167_1688445031183810_7761646933017187834_n.jpg.jpg',
      publicId: 'dev/profile/1527432409068-18010167_1688445031183810_7761646933017187834_n.jpg',
      accountType: 'super',
      createdAt: '2018-05-01T14:45:49.813Z',
      updatedAt: '2018-07-04T20:40:26.374Z',
    },
    events: [
      {
        id: 12,
        title: 'Christian Womens Forum',
        date: '2018-11-15T10:30:00.000Z',
        description: 'Featuring The Leaders of Christain  Association of Nigeria',
        picture: 'hsjdhfjshdfjhsdf',
        publicId: 'bhjsdhfjsdf',
        centerId: 1,
        userId: 1,
        status: 'approved',
        createdAt: '2018-05-21T15:14:53.659Z',
        updatedAt: '2018-05-21T15:14:53.659Z',
      },
      {
        id: 11,
        title: 'Gospel Songs by Don Moen',
        date: '2018-11-22T16:30:00.000Z',
        description: 'Featuring HillSong',
        picture: 'hsjdhfjshdfjhsdf',
        publicId: 'bhjsdhfjsdf',
        centerId: 1,
        userId: 1,
        status: 'rejected',
        createdAt: '2018-05-21T14:59:28.692Z',
        updatedAt: '2018-05-22T10:43:50.283Z',
      },
    ],
  },
  getAllCenterResponse: {
    status: 'success',
    data: {
      data: [
        {
          id: 1,
          name: 'Andela Epic Tower',
          address: '121 Iju Hills, Anthony',
          location: 'Anthony, Lagos',
          capacity: 3500,
          price: 167000,
          picture:
            'https://res.cloudinary.com/eventmanager/image/upload/v1530055009/dev/centers/1530055007770-andela.jpg.jpg',
          publicId: 'dev/centers/1530055007770-andela.jpg',
          availability: 'open',
          userId: 1,
          createdAt: '2018-05-01T16:49:50.203Z',
          updatedAt: '2018-06-28T17:18:30.844Z',
        },
        {
          id: 7,
          name: 'Bolingo Hotels',
          address: '45 Maitama Avenue, Area 10',
          location: 'Garki, Abnuja',
          capacity: 3000,
          price: 250000,
          picture:
            'https://res.cloudinary.com/eventmanager/image/upload/v1526406535/dev/centers/1526406533598-Bolingo-hotel-Abuja.jpg.jpg',
          publicId: 'dev/centers/1526406533598-Bolingo-hotel-Abuja.jpg',
          availability: 'open',
          userId: 2,
          createdAt: '2018-05-15T17:48:56.656Z',
          updatedAt: '2018-05-15T17:48:56.656Z',
        },
      ],
      count: 20,
    },
  },
  getOneCenterResponse: {
    status: 'success',
    data: {
      id: 1,
      name: 'Andela Epic Tower',
      address: '121 Iju Hills, Anthony',
      location: 'Anthony, Lagos',
      capacity: 3500,
      price: 167000,
      picture:
        'https://res.cloudinary.com/eventmanager/image/upload/v1530055009/dev/centers/1530055007770-andela.jpg.jpg',
      publicId: 'dev/centers/1530055007770-andela.jpg',
      availability: 'open',
      userId: 1,
      createdAt: '2018-05-01T16:49:50.203Z',
      updatedAt: '2018-06-28T17:18:30.844Z',
      facilities: [
        {
          id: '069a5091-ab71-4c12-a28f-c6f5b3ca2169',
          name: 'fish',
          spec: 'golden',
          quantity: 6,
          centerId: 1,
          createdAt: '2018-07-09T15:16:32.316Z',
          updatedAt: '2018-07-09T15:16:32.316Z',
        },
      ],
      user: {
        id: 1,
        username: 'nzediegwu1',
        name: 'Anaeze Nsoffor',
        email: 'nzediegwu1@gmail.com',
        phoneNo: '2347067356519',
        company: 'Facebook',
        website: 'http://www.facebook.com/Nzediegwu1',
        address: '89 Ojuelegba Road, Ikeja, Lagos State',
        picture:
          'https://res.cloudinary.com/eventmanager/image/upload/v1527432411/dev/profile/1527432409068-18010167_1688445031183810_7761646933017187834_n.jpg.jpg',
        publicId: 'dev/profile/1527432409068-18010167_1688445031183810_7761646933017187834_n.jpg',
        accountType: 'super',
        createdAt: '2018-05-01T14:45:49.813Z',
        updatedAt: '2018-07-04T20:40:26.374Z',
      },
      events: [
        {
          id: 12,
          title: 'Christian Womens Forum',
          date: '2018-11-15T10:30:00.000Z',
          description: 'Featuring The Leaders of Christain  Association of Nigeria',
          picture: 'hsjdhfjshdfjhsdf',
          publicId: 'bhjsdhfjsdf',
          centerId: 1,
          userId: 1,
          status: 'approved',
          createdAt: '2018-05-21T15:14:53.659Z',
          updatedAt: '2018-05-21T15:14:53.659Z',
        },
        {
          id: 11,
          title: 'Gospel Songs by Don Moen',
          date: '2018-11-22T16:30:00.000Z',
          description: 'Featuring HillSong',
          picture: 'hsjdhfjshdfjhsdf',
          publicId: 'bhjsdhfjsdf',
          centerId: 1,
          userId: 1,
          status: 'rejected',
          createdAt: '2018-05-21T14:59:28.692Z',
          updatedAt: '2018-05-22T10:43:50.283Z',
        },
      ],
    },
  },
  getOneErrorResponse: {
    status: 404,
    data: {
      status: 'error',
      message: 'Could not find item',
    },
  },
};
export default centers;
