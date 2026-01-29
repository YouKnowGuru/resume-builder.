import type { ResumeData } from '../types/resume';

export const initialResumeState: ResumeData = {
    personal: {
        fullName: 'Dorji Wangchuk',
        email: 'dorji.wangchuk@druknet.bt',
        phone: '+975 1711 0000',
        location: 'Damphu, Tsirang',
        title: 'Senior Software Engineer',
        website: 'dorji.dev.bt',
        linkedin: 'linkedin.com/in/dorjiwangchuk',
        github: 'github.com/dorjiw',
    },
    summary: 'Experienced Software Engineer based in the Kingdom of Bhutan, specializing in full-stack development and digital transformation. Dedicated to building scalable solutions that contribute to Gross National Happiness through technological innovation.',
    experience: [
        {
            id: '1',
            company: 'Thimphu TechPark',
            position: 'Senior Software Engineer',
            location: 'Babesa, Thimphu',
            startDate: '2020-01',
            endDate: '',
            current: true,
            description: '• Leading development of national-level digital identity systems.\n• Optimizing cloud infrastructure for government services.\n• Mentoring junior developers in modern React and Node.js practices.'
        },
        {
            id: '2',
            company: 'Druk Solutions',
            position: 'Full Stack Developer',
            location: 'Phuntsholing, Bhutan',
            startDate: '2017-06',
            endDate: '2019-12',
            current: false,
            description: '• Developed e-commerce platforms for local artisans to reach international markets.\n• Implemented secure payment gateway integrations with local banks.\n• Improved mobile responsiveness and performance of the flagship product.'
        }
    ],
    education: [
        {
            id: '1',
            institution: 'Royal University of Bhutan (Sherubtse College)',
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            location: 'Kanglung, Trashigang',
            startDate: '2013-09',
            endDate: '2017-05',
            gpa: '3.9/4.0'
        }
    ],
    skills: [
        { id: '1', name: 'React', level: 90 },
        { id: '2', name: 'TypeScript', level: 85 },
        { id: '3', name: 'Node.js', level: 80 },
        { id: '4', name: 'PostgreSQL', level: 75 },
        { id: '5', name: 'Cloud Computing', level: 70 }
    ],
    projects: [
        {
            id: '1',
            name: 'Bhutanese Artisans Portal',
            description: 'A dedicated platform for rural artisans to showcase and sell traditional crafts.',
            link: 'https://github.com/dorjiw/druk-crafts',
            technologies: ['React', 'Firebase', 'Stripe']
        }
    ],
    languages: [
        { id: '1', name: 'Dzongkha', level: 'Native' },
        { id: '2', name: 'English', level: 'Fluent' },
        { id: '3', name: 'Sharshogpa', level: 'Native' }
    ],
    certifications: [
        { id: '1', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon', date: '2021-03' }
    ],
    footer: 'References available upon request.',
    sections: [
        { id: 'personal', type: 'personal', title: 'Personal Info', visible: true },
        { id: 'summary', type: 'summary', title: 'Professional Summary', visible: true },
        { id: 'experience', type: 'experience', title: 'Work Experience', visible: true },
        { id: 'education', type: 'education', title: 'Education', visible: true },
        { id: 'skills', type: 'skills', title: 'Skills', visible: true },
        { id: 'projects', type: 'projects', title: 'Projects', visible: true },
        { id: 'languages', type: 'languages', title: 'Languages', visible: true },
        { id: 'certifications', type: 'certifications', title: 'Certifications', visible: true },
    ],
    metadata: {
        template: 'modern',
        themeColor: '#FFD700', // Bhutanese Gold/Yellow
        fontFamily: 'Inter',
        fontSize: 11,
        spacing: 1.0,
        photoLayout: 'none',
        updatedAt: Date.now(),
    }
};
