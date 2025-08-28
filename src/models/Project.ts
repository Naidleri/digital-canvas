export interface Project {
    id: string;
    purpose: string[];
    name: string;
    description: string;
    techStack: string[];
    link?: string;
    color: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}