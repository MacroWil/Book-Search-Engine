const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    user: async (parent, args, context) => {
      const aUser = await User.findOne(args);
      return aUser;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      if (!user) {
        throw new AuthenticationError("User creation failed");
      }
      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, args) => {
      return await User.findOneAndUpdate(
        { _id: args.userId },
        { $addToSet: { savedBooks: args } },
        { new: true, runValidators: true }
      );
    },
    deleteBook: async (parent, { userId, bookId }) => {
      return await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
    },
    login: async (parent, { email, username, password }) => {
      const credentials = username ? { username: username } : { email: email };
      const user = await User.findOne(credentials);

      if (!user) {
        throw new AuthenticationError("Incorrect username or email");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
