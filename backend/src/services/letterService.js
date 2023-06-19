import { letterModel } from "../db/index.js";
import { CustomError } from '../middlewares/index.js';

const letterService = {
  getNotOpenedLetters: async (userId) => {
    try {
      // 서비스를 통해 notOpened인 편지들을 데이터베이스에서 조회합니다.
      const letters = await letterModel.findNotOpenedAll(userId);

      if (!letters || letters.length === 0) {
        throw new CustomError(404, '편지를 찾을 수 없습니다.');
      }
      return letters;
    } catch (error) {
      throw error;
    }
  },
  getLetterNotOpenedByIndex: async (userId, index) => {
    try {
      const letter = await letterModel.findNotOpenedByIndex(userId, index);
      let now = new Date();
      
      if (letter.unlockYear > now.getFullYear()) {
        throw new CustomError(403, "UNLOCK!!");
      } else if (letter.unlockYear === now.getFullYear()) {
        if (letter.unlockMonth > now.getMonth() + 1) {
          throw new CustomError(403, "UNLOCK!!");
        } else if (letter.unlockMonth === now.getMonth() + 1) {
          if (letter.unlockDate > now.getDate()) {
            throw new CustomError(403, "UNLOCK!!");
          }
        }
      }

      if (!letter) {
        throw new CustomError(404, '편지를 찾을 수 없습니다.');
      }

      letter.opened = true;
      await letter.save();

      return letter;
    } catch (error) {
      throw error;
    }
  },
  getLettersByYearMonth: async (userId) => {
    try {
      const letters = await letterModel.findOpenedAll(userId);
      const result = {};

      for (const letter of letters) {
        const { unlockYear, unlockMonth } = letter;
        if (result[unlockYear]) {
          if (result[unlockYear][unlockMonth - 1] > 0) {
            result[unlockYear][unlockMonth - 1] += 1;
          } else {
            result[unlockYear][unlockMonth - 1] = 1;
          }
        } else {
          result[unlockYear] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          result[unlockYear][unlockMonth - 1] += 1;
        }
      }

      return result;
    } catch (error) {
      throw error;
    }
  },
  getLettersListByYearMonth: async (userId, year, month) => {
    try {
      const letters = await letterModel.findByUnlockDate(userId, year, month);

      if (!letters || letters.length === 0) {
        throw new CustomError(404, '편지를 찾을 수 없습니다.');
      }

      return letters;
    } catch (error) {
      throw error;
    }
  },
  getLetterByIndex: async (userId, index) => {
    try {
      const letter = await letterModel.findOpenedByIndex(userId, index);
      if (!letter) {
        throw new CustomError(404, '편지를 찾을 수 없습니다.');
      }

      return letter;
    } catch (error) {
      throw error;
    }
  },
  getNickName: async (_id) => {
    try {
      const nickName = await letterModel.findNickName(_id);
      if (!nickName) {
        throw new CustomError(404, '회원이 갑자기 사라졌습니다. 무슨일인가요? 이 에러는 절대 발생하면 안돼요;;.');
      }

      return nickName;
    } catch (error) {
      throw error;
    }
  },
  createLetter: async (userId, letterData) => {
    try {
      const requiredFields = ['content', 'style', 'sender', 'unlockYear', 'unlockMonth', 'unlockDate'];
      for (const field of requiredFields) {
        if (!letterData[field]) {
          throw new CustomError(400, `${field} 필드는 필수입니다.`);
        }
      }

      const { unlockYear, unlockMonth, unlockDate } = letterData;

      if (typeof unlockYear !== 'number' || typeof unlockMonth !== 'number' || typeof unlockDate !== 'number') {
        throw new CustomError(400, '날짜 필드는 숫자로 지정되어야 합니다.');
      }
      if (unlockMonth > 12 || unlockMonth < 1 || unlockDate < 1 || unlockDate > 31) {
        throw new CustomError(400, '날짜 필드범위가 잘못되었습니다.');
      }

      letterData.content = letterData.content.trim();
      letterData.style = letterData.style.trim();
      letterData.sender = letterData.sender.trim();

      const lastIndex = await letterModel.findLastLetterIndex(userId);
      const newLetterIndex = lastIndex + 1;

      const letter = await letterModel.createLetter(userId, {
        ...letterData,
        index: newLetterIndex
      });

      return letter;
    } catch (error) {
      throw error;
    }
  },
  deleteLetter: async (userId, index) => {
    try {
      const letter = await letterModel.deleteLetter(userId, index);
      if (!letter) {
        throw new CustomError(404, '편지가 갑자기 사라졌습니다. 무슨일인가요? 이 에러는 절대 발생하면 안돼요;;.');
      }
      return letter;

    } catch (error) {
      throw error;
    }
  },
};

export { letterService };