export const userToView = (user) => {
  return {
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    bio: user.bio,
    quacks: user.quacks,
    following: user.following,
    isVerified: user.isVerified,
  };
};
