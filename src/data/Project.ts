import type { Project } from '../models/Project';
import comparative from '../assets/comparative.png';
import majadigi from '../assets/majadigi.png';
import cashier from '../assets/cashier.png';
import bizzatrip from '../assets/bizzatrip.png';
import emosque from '../assets/emosque.png';
import siop from '../assets/siop.jpg';

  export const projects: Project[] = [
    {
      id: '1',
      purpose : ['freelance' , 'research', 'Web Developer'],
      name: 'Comparative',
      description: 'Comparative writing with ai correction',
      techStack: ['Laravel', 'Blade', 'PHP', 'Tailwind CSS'],
      link: 'https://nyln.biz.id/',
      color: '#8b5cf6',
      image: comparative,
      createdAt: new Date('2025-08-23'),
      updatedAt: new Date('2025-08-25'),
    },
  {
    id: '2',
    purpose: ['Internship', 'Mobile Developer'],
    name: 'Majadigi',
    description: 'System Information for Jawa Timur',
    techStack: ['Dart', 'Flutter', 'Postman', 'Lottie'],
    link: 'https://play.google.com/store/apps/details?id=id.go.jatimprov.portal&pcampaignid=web_share',
    color: '#06b6d4',
    image: majadigi,
    createdAt: new Date('2025-08-23'),
    updatedAt: new Date('2025-08-25'),
  },
  {
    id: '3',
    purpose: ['Freelance', 'Web Developer'],
    name: 'Cashier Dekstop App',
    description: 'A desktop application for managing cashier transactions.',
    techStack: ['React', 'Prisma', 'Electron', 'Javascript'],
    link: 'https://github.com/adyfp24/cashier-electron-app.git',
    color: '#22d3ee',
    image: cashier,
    createdAt: new Date('2025-08-23'),
    updatedAt: new Date('2025-08-25'),
  },
  {
    id: '4',
    purpose: ['apprenticeship', 'Mobile Developer'],
    name: 'BizzaTrip',
    description: 'Mobile App with ML Integration for Best Trip Experience',
    techStack: ['Kotlin', 'Google Maps Services', 'Postman'],
    link: 'https://github.com/Day-Trips-Optimization-C242-DT01/daytrip-bizzagi-android.git',
    color: '#2d6cc4',
    image: bizzatrip,
    createdAt: new Date('2025-08-23'),
    updatedAt: new Date('2025-08-25'),
  },
  {
    id: '5',
    purpose: ['project', 'Mobile Developer'],
    name: 'Emosque',
    description: 'App for manage mosque schedule',
    techStack: ['Flutter', 'Dart', 'Figma'],
    link: 'https://github.com/Naidleri/emosque_mobile.git',
    color: '#42db4f',
    image: emosque,
    createdAt: new Date('2025-08-25'),
    updatedAt: new Date('2025-08-25'),
  },
  {
    id: '6',
    purpose: ['project', 'Mobile Developer'],
    name: 'SIOP',
    description: 'Integration Mobile App With IoT for Automatic Watering',
    techStack: ['Flutter', 'Dart', 'Arduino'],
    link: 'https://github.com/Naidleri/siop_ppl_agro.git',
    color: '#d69e45',
    image: siop,
    createdAt: new Date('2025-08-25'),
    updatedAt: new Date('2025-08-25'),
  }
];