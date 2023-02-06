import { trpc } from '../trpc';

export const useCourses = () => trpc.course.all.useQuery({});

export const useCreatePost = () => {
  const utils = trpc.useContext();
  const addPost = trpc.post.add.useMutation({
    async onSuccess() {
      await utils.post.all.invalidate();
    },
  });

  return addPost;
};

export const usePost = ({ id }) => {
  const postQuery = trpc.post.byId.useQuery({ id });

  return postQuery;
};
