export const userToView = (user) => {
  return {
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    bio: user.bio,
    tweets: user.tweets,
    following: user.following,
  };
};
