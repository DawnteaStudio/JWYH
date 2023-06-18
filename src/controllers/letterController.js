//controller의 모든 메소드는 next(err)을 해주세요!!
import { letterService } from '../services/index.js';

const letterController = {
  getNotOpenedLetters: async (req, res, next) => {
    try {
      const { userId } = req.params;

      // 서비스를 통해 notOpened인 편지들을 가져옵니다.
      const letters = await letterService.getNotOpenedLetters(userId);
      res.json(letters);
    } catch (err) {
      next(err);
    }
  },
  getLetterNotOpenedByIndex: async (req, res, next) => {
    const { userId, index } = req.params;

    try {
      const letter = await letterService.getLetterNotOpenedByIndex(userId, index);
      res.json(letter);
    } catch (err) {
      next(err);
    }
  },
  getLettersByYearMonth: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const result = await letterService.getLettersByYearMonth(userId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
  getLettersListByYearMonth: async (req, res, next) => {
    try {
      const { userId, year, month } = req.params;

      const result = await letterService.getLettersListByYearMonth(userId, year, month);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
  getLetterByIndex: async (req, res, next) => {
    const { userId, index } = req.params;

    try {
      const letter = await letterService.getLetterByIndex(userId, index);
      res.json(letter);
    } catch (err) {
      next(err);
    }
  },
  deleteLetter: async (req, res, next) => {
    const { userId, index } = req.params;

    try {
      const letter = await letterService.deleteLetter(userId, index);
      res.json({ message: "편지가 성공적으로 삭제되었습니다." });
    } catch (err) {
      next(err);
    }
  },
  getNickName: async (req, res, next) => {
    const { _id } = req.params;

    try {
      const nickName = await letterService.getNickName(_id);
      res.json(nickName);
    } catch (err) {
      next(err);
    }
  },
  createLetter: async (req, res, next) => {
    try {
      const { _id } = req.params;
      console.log(req.body);
      const {
        content,
        style,
        sender,
        unlockYear,
        unlockMonth,
        unlockDate,
      } = req.body;

      // Create the letter
      const letter = await letterService.createLetter(_id, {
        content,
        style,
        sender,
        unlockYear,
        unlockMonth,
        unlockDate,
      });

      res.status(201).json(letter);
    } catch (err) {
      next(err);
    }
  },
};


export { letterController };