// routes/sets.js
import express from 'express';
import { param, validationResult } from 'express-validator';
import {
  findSet,
  findCardsByFilter,
  setsMap,
  cardsMap,
} from './../utils/find.js';

const router = express.Router();

/**
 * @swagger
 * /sets:
 *   get:
 *     summary: Get all sets
 *     tags: [Sets]
 *     responses:
 *       200:
 *         description: A list of sets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', (req, res) => {
  res.json(setsMap);
});

/**
 * @swagger
 * /sets/{setCode}:
 *   get:
 *     summary: Get set by code
 *     tags: [Sets]
 *     parameters:
 *       - in: path
 *         name: setCode
 *         schema:
 *           type: string
 *         required: true
 *         description: The set code
 *     responses:
 *       200:
 *         description: The set details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Set not found
 */
router.get(
  '/:setCode',
  [
    param('setCode')
      .isString()
      .notEmpty()
      .withMessage('setCode must be a non-empty string')
      .trim()
      .escape(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const setDetails = findSet(req.params.setCode);

    if (setDetails) {
      res.json(setDetails);
    } else {
      res.status(404).json({ error: `Set ${req.params.setCode} not found` });
    }
  },
);

/**
 * @swagger
 * /sets/{setCode}/cards:
 *   get:
 *     summary: Get cards by set code
 *     tags: [Sets]
 *     parameters:
 *       - in: path
 *         name: setCode
 *         schema:
 *           type: string
 *         required: true
 *         description: The set code
 *     responses:
 *       200:
 *         description: List of cards in the set
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: Set not found
 */
router.get(
  '/:setCode/cards',
  [
    param('setCode')
      .isString()
      .notEmpty()
      .withMessage('setCode must be a non-empty string')
      .trim()
      .escape(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const setDetails = findSet(req.params.setCode);

    if (setDetails) {
      res.json(setDetails.cards.map((cardId) => cardsMap[cardId]));
    } else {
      res.status(404).json({ error: `Set ${req.params.setCode} not found` });
    }
  },
);

/**
 * @swagger
 * /sets/{setCode}/cards/filter/{filter}:
 *   get:
 *     summary: Get cards by filter from set
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: filter
 *         schema:
 *           type: string
 *         required: true
 *         description: The filter
 *     responses:
 *       200:
 *         description: The list of cards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get(
  '/:setCode/cards/filter/:filter',
  [
    param('setCode')
      .isString()
      .notEmpty()
      .withMessage('setCode must be a non-empty string')
      .trim()
      .escape(),
    param('filter')
      .isString()
      .notEmpty()
      .withMessage('filter must be a non-empty string')
      .trim()
      .escape(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const filteredCards = findCardsByFilter(
      `code:${req.params.setCode};` + req.params.filter,
    );
    res.json({ cards: filteredCards });
  },
);

export default router;
