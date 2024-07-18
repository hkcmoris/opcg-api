// routes/cards.js
import express from 'express';
import { param, validationResult } from 'express-validator';
import { findCard, findCardsByFilter, cardsMap } from '../utils/find.js';

const router = express.Router();

/**
 * @swagger
 * /cards:
 *   get:
 *     summary: Get all cards
 *     tags: [Cards]
 *     responses:
 *       200:
 *         description: A list of cards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', (req, res) => {
  res.json(cardsMap);
});

/**
 * @swagger
 * /cards/{cardCode}:
 *   get:
 *     summary: Get card by code
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: cardCode
 *         schema:
 *           type: string
 *         required: true
 *         description: The card code
 *     responses:
 *       200:
 *         description: The card details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Card not found
 */
router.get(
  '/:cardCode',
  [
    param('cardCode')
      .isString()
      .notEmpty()
      .withMessage('cardCode must be a non-empty string')
      .trim()
      .escape(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const cardDetails = findCard(req.params.cardCode);

    if (cardDetails) {
      res.json(cardDetails);
    } else {
      res.status(404).json({ error: `Card ${req.params.cardCode} not found` });
    }
  },
);

/**
 * @swagger
 * /cards/filter/{filter}:
 *   get:
 *     summary: Get cards by filter
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
  '/filter/:filter',
  [
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

    const filteredCards = findCardsByFilter(req.params.filter);
    res.json({ cards: filteredCards });
  },
);

export default router;
