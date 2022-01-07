import mongoose from "mongoose";

//for ts validation
interface UserTypes {
  email: string;
  password: string;
}

//for ts validation
interface UserModel extends mongoose.Model<UserDoc> {
  build(types: UserTypes): UserDoc;
}

//for ts user doc incoming object validation
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//for ts validation
userSchema.statics.build = (types: UserTypes) => {
  return new User(types);
};

//<any, UserModel> for ts validation
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
