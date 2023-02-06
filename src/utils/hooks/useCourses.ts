import { trpc } from '../trpc';

export const useCourses = () => trpc.course.all.useQuery();

export const useCourse = ({ slug }) => trpc.course.bySlug.useQuery({ slug });
