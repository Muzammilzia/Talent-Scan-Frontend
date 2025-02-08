import { subHours, subMinutes } from 'date-fns';
import type { Connection, Post, Profile } from 'src/types/social';

const now = new Date();
[
  {
    "_id": "1a2b3c4d5e6f",
    "fullName": "Muzzammil Zia",
    "bio": "",
    "about": "",
    "address": "123 Maple Street, Springfield",
    "age": "25",
    "gender": "female",
    "phone": "+1-555-123-4567",
    "email": "muzzammil.zia@example.com",
    "skills": ["Python", "ReactJS", "Machine Learning", "FastAPI", "MongoDB"],
    "qualification": [
      {
        "institute": "Springfield University",
        "program": "Bachelor of Computer Science",
        "startDate": "2017-09-01",
        "endDate": "2021-06-01",
        "description": "Studied core computer science subjects with a focus on software development and AI."
      },
      {
        "institute": "CodeAcademy Bootcamp",
        "program": "Full Stack Development",
        "startDate": "2022-01-01",
        "endDate": "2022-06-01",
        "description": "Learned full-stack development using ReactJS, Node.js, and MongoDB."
      }
    ],
    "experience": [
      {
        "company/organization": "Tech Innovators",
        "role": "Frontend Developer",
        "startDate": "2021-07-01",
        "endDate": "2023-08-01",
        "description": "Developed user interfaces using ReactJS and optimized performance."
      },
      {
        "company/organization": "AI Solutions Inc.",
        "role": "Machine Learning Engineer",
        "startDate": "2023-09-01",
        "endDate": "2024-11-01",
        "description": "Built and deployed machine learning models for recruitment systems."
      }
    ],
    "socials": [
      {
        "linkedin": "https://linkedin.com/in/muzzammilzia"
      }
    ]
  },
  {
    "_id": "7g8h9i0j1k2l",
    "fullName": "John Doe",
    "address": "456 Elm Avenue, Metropolis",
    "age": "30",
    "gender": "male",
    "phone": "+1-555-987-6543",
    "email": "john.doe@example.com",
    "skills": ["JavaScript", "TypeScript", "Node.js", "ExpressJS", "PostgreSQL"],
    "qualification": [
      {
        "institute": "Metropolis University",
        "program": "Master of Information Technology",
        "startDate": "2015-09-01",
        "endDate": "2017-06-01",
        "description": "Focused on backend development and database systems."
      }
    ],
    "experience": [
      {
        "company/organization": "WebCraft Co.",
        "role": "Backend Developer",
        "startDate": "2018-01-01",
        "endDate": "2021-12-31",
        "description": "Developed REST APIs and managed relational databases."
      },
      {
        "company/organization": "CodeHub Inc.",
        "role": "Full Stack Developer",
        "startDate": "2022-01-01",
        "endDate": "2024-11-01",
        "description": "Built and maintained web applications using JavaScript frameworks."
      }
    ],
    "socials": [
      {
        "linkedin": "https://linkedin.com/in/johndoe"
      }
    ]
  }
]

export const profile: Profile = {
  id: '5e86809283e28b96d2d38537',
  avatar: '/assets/avatars/avatar-anika-visser.png',
  bio: 'Product Designer',
  connectedStatus: 'not_connected',
  cover: '/assets/covers/abstract-1-4x3-large.png',
  currentCity: 'Bucharest',
  currentJobCompany: 'Devias IO',
  currentJobTitle: 'Product Designer',
  email: 'anika.visser@devias.io',
  name: 'Anika Visser',
  originCity: 'Rm. Valcea',
  previousJobCompany: 'Focus Aesthetic Dynamics',
  previousJobTitle: 'UX Designer',
  profileProgress: 50,
  quote: 'Everyone thinks of changing the world, but no one thinks of changing himself.'
};

export const connections: Connection[] = [
  {
    id: '5e887ac47eed253091be10cb',
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    commonConnections: 10,
    name: 'Carson Darrin',
    status: 'rejected'
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    avatar: '/assets/avatars/avatar-fran-perez.png',
    commonConnections: 8,
    name: 'Fran Perez',
    status: 'pending'
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    avatar: '/assets/avatars/avatar-miron-vitold.png',
    commonConnections: 5,
    name: 'Miron Vitold',
    status: 'not_connected'
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    avatar: '/assets/avatars/avatar-penjani-inyene.png',
    commonConnections: 1,
    name: 'Penjani Inyene',
    status: 'connected'
  }
];

export const posts: Post[] = [
  {
    id: '5e887faca2b7a1ddce01221a',
    author: {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser'
    },
    comments: [
      {
        id: '5e887fc17162ba254da30771',
        author: {
          id: '5e887b7602bdbc4dbb234b27',
          avatar: '/assets/avatars/avatar-jie-yan-song.png',
          name: 'Jie Yan Song'
        },
        createdAt: subHours(now, 3).getTime(),
        message: 'Could use some more statistics, but that’s me haha'
      },
      {
        id: '5e887fc759bebe8d5d54a2e5',
        author: {
          id: '5e887a1fbefd7938eea9c981',
          avatar: '/assets/avatars/avatar-penjani-inyene.png',
          name: 'Penjani Inyene'
        },
        createdAt: subHours(now, 2).getTime(),
        message: 'Hmm, honestly this looks nice but I would change the shadow though'
      }
    ],
    createdAt: subHours(now, 4).getTime(),
    isLiked: true,
    likes: 24,
    media: '/assets/covers/minimal-1-4x3-large.png',
    message: 'Just made this overview screen for a project, what-cha thinkin?'
  },
  {
    id: '5e887faf03e78a5359765636',
    author: {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser'
    },
    comments: [
      {
        id: '5e887fde4992eca63b9e9ef5',
        author: {
          id: '5e8877da9a65442b11551975',
          avatar: '/assets/avatars/avatar-iulia-albu.png',
          name: 'Iulia Albu'
        },
        createdAt: subHours(now, 3).getTime(),
        message: 'That’s actually deep. Thanks for the design, would you consider making an interaction?'
      },
      {
        id: '5e887feb11b7add1ebfcca78',
        author: {
          id: '5e887b209c28ac3dd97f6db5',
          avatar: '/assets/avatars/avatar-fran-perez.png',
          name: 'Fran Perez'
        },
        createdAt: subHours(now, 2).getTime(),
        message: 'Oh... so sentimental'
      }
    ],
    createdAt: subHours(now, 7).getTime(),
    isLiked: false,
    likes: 65,
    message: 'As a human being, you are designed in a way that makes you incapable of experiencing any positive emotion unless you set an aim and progress towards it. What makes you happy is not, in fact, attaining it, but making progress towards it.'
  }
];

export const feed: Post[] = [
  {
    id: '5e887fa38598b6fe61667757',
    author: {
      id: '5e88792be2d4cfb4bf0971d9',
      avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
      name: 'Siegbert Gottfried'
    },
    comments: [
      {
        id: '5e887fb6c648772b52f860a8',
        author: {
          id: '5e8680e60cba5019c5ca6fda',
          avatar: '/assets/avatars/avatar-nasimiyu-danai.png',
          name: 'Nasimiyu Danai'
        },
        createdAt: subHours(now, 3).getTime(),
        message: 'I\'ve been using Angular for the past 3 years'
      }
    ],
    createdAt: subMinutes(now, 16).getTime(),
    isLiked: true,
    likes: 1,
    message: 'Hey guys! What\'s your favorite framework?'
  },
  {
    id: '5e887faca2b7a1ddce01221a',
    author: {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser'
    },
    comments: [
      {
        id: '5e887fc17162ba254da30771',
        author: {
          id: '5e887b7602bdbc4dbb234b27',
          avatar: '/assets/avatars/avatar-jie-yan-song.png',
          name: 'Jie Yan Song'
        },
        createdAt: subHours(now, 3).getTime(),
        message: 'Could use some more statistics, but that’s me haha'
      },
      {
        id: '5e887fc759bebe8d5d54a2e5',
        author: {
          id: '5e887a1fbefd7938eea9c981',
          avatar: '/assets/avatars/avatar-penjani-inyene.png',
          name: 'Penjani Inyene'
        },
        createdAt: subHours(now, 2).getTime(),
        message: 'Hmm, honestly this looks nice but I would change the shadow though'
      }
    ],
    createdAt: subHours(now, 4).getTime(),
    isLiked: true,
    likes: 24,
    media: '/assets/covers/minimal-1-4x3-large.png',
    message: 'Just made this overview screen for a project, what-cha thinkin?'
  },
  {
    id: '5e887faf03e78a5359765636',
    author: {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser'
    },
    comments: [
      {
        id: '5e887fde4992eca63b9e9ef5',
        author: {
          id: '5e8877da9a65442b11551975',
          avatar: '/assets/avatars/avatar-iulia-albu.png',
          name: 'Iulia Albu'
        },
        createdAt: subHours(now, 3).getTime(),
        message: 'That’s actually deep. Thanks for the design, would you consider making an interaction?'
      },
      {
        id: '5e887feb11b7add1ebfcca78',
        author: {
          id: '5e887b209c28ac3dd97f6db5',
          avatar: '/assets/avatars/avatar-fran-perez.png',
          name: 'Fran Perez'
        },
        createdAt: subHours(now, 2).getTime(),
        message: 'Oh... so sentimental'
      }
    ],
    createdAt: subHours(now, 7).getTime(),
    isLiked: false,
    likes: 65,
    message: 'As a human being, you are designed in a way that makes you incapable of experiencing any positive emotion unless you set an aim and progress towards it. What makes you happy is not, in fact, attaining it, but making progress towards it.'
  }
];