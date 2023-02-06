import { trpc } from '../trpc';

export const useCourses = () => trpc.course.all.useQuery();

export const usePost = ({ slug }) => trpc.course.bySlug.useQuery({ slug });
