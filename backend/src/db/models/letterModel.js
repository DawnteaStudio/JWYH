import mongoose from "mongoose";
import { Letter, User } from "../schemas/index.js";
import { CustomError } from '../../middlewares/index.js';


const letterModel = {
  findNotOpenedAll: async (userId) => {
    let selectedUser;
    if (mongoose.isValidObjectId(userId)) {
      selectedUser = await User.findOne({
        _id: userId,
      });
    } else {
      selectedUser = await User.findOne({
        userId: userId,
      });
    }
    const letters = await Letter.find({
      opened: false,
      userInfo: selectedUser._id,
    }).select('-content');
    return letters;
  },
  findOpenedAll: async (userId) => {
    const selectedUser = await User.findOne({userId});
    const letters = await Letter.find({
      opened: true,
      userInfo: selectedUser._id,
    });

    return letters;
  },
  findNotOpenedByIndex: async (userId, index) => {
    const selectedUser = await User.findOne({userId});
    const letter = await Letter.findOne({
      opened: false,
      userInfo: selectedUser._id,
      index: index,
    });

    return letter;
  },
  findOpenedByIndex: async (userId, index) => {
    const selectedUser = await User.findOne({userId});
    const letter = await Letter.findOne({
      opened: true,
      userInfo: selectedUser._id,
      index: index,
    });

    return letter;
  },
  findByUnlockDate: async (userId, unlockYear, unlockMonth) => {
    const selectedUser = await User.findOne({userId});
    const letters = await Letter.find({
      opened: true,
      userInfo: selectedUser._id,
      unlockYear: unlockYear,
      unlockMonth: unlockMonth
    });

    return letters;
  },
  createLetter: async (userId, letterData) => {
    const selectedUser = await User.findOne({ _id: userId });
    letterData.userInfo = selectedUser._id;
    const letter = await Letter.create(letterData);

    return letter;
  },
  deleteLetter: async (userId, index) => {
    const selectedUser = await User.findOne({userId});
    const letter = await Letter.findOneAndDelete({
      userInfo: selectedUser._id,
      index: index,
    });
    await Letter.updateMany(
      { userInfo: selectedUser._id, index: { $gt: index } },
      { $inc: { index: -1 } }
    );
    return letter;
  },
  findLastLetterIndex: async (userId) => {
    const lastLetter = await Letter.findOne({
      userInfo: userId
    }).sort({ index: -1 });

    return lastLetter ? lastLetter.index : 0;
  },

  findNickName: async (userId) =>{
    let selectedUser;
    if (mongoose.isValidObjectId(userId)) {
      selectedUser = await User.findOne({
        _id: userId,
      });
    } else {
      selectedUser = await User.findOne({
        userId: userId,
      });
    }    const nickName = selectedUser.nickName;

    return nickName;
  }
};

export default letterModel;

