export const postData = {
  posts: [
    {
      id: 1,
      title: "My First Post",
      content: "Hello World!",
      comments: [
        {
          id: 1,
          postId: 1,
          content: "Great post!",
          likes: ["user1", "user2"],
          createdAt: "2022-04-01T10:00:00Z",
          updatedAt: "2022-04-01T10:05:00Z",
        },
        {
          id: 2,
          postId: 1,
          content: "Thanks!",
          likes: ["user3"],
          createdAt: "2022-04-01T11:00:00Z",
          updatedAt: "2022-04-01T11:05:00Z",
        },
      ],
      likes: ["user1", "user3"],
      createdAt: "2022-04-01T09:00:00Z",
      updatedAt: "2022-04-01T09:05:00Z",
    },
    {
      id: 2,
      title: "My Second Post",
      content: "Goodbye World!",
      comments: [
        {
          id: 3,
          postId: 2,
          content: "Nice post!",
          likes: ["user2"],
          createdAt: "2022-04-02T10:00:00Z",
          updatedAt: "2022-04-02T10:05:00Z",
        },
        {
          id: 4,
          postId: 2,
          content: "Thanks!",
          likes: [],
          createdAt: "2022-04-02T11:00:00Z",
          updatedAt: "2022-04-02T11:05:00Z",
        },
      ],
      likes: [],
      createdAt: "2022-04-02T09:00:00Z",
      updatedAt: "2022-04-02T09:05:00Z",
    },
  ],
};
