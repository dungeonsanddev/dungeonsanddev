import { trpc } from '../trpc';

export const usePosts = () => {
  const postsQuery = trpc.post.all.useQuery({});


  // prefetch all posts for instant navigation
  // useEffect(() => {
  //   for (const { id } of postsQuery.data ?? []) {
  //     utils.prefetchQuery(['post.byId', { id }]);
  //   }
  // }, [postsQuery.data, utils]);

  return postsQuery;
};

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
