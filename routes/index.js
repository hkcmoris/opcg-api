import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message
 *     tags: [Welcome]
 *     responses:
 *       200:
 *         description: Welcome message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 version:
 *                   type: string
 *                 hint:
 *                   type: string
 */
router.get('/', (req, res) => {
  const response = {
    message: 'Hello from the API',
    version: '2.0.0',
    hint: 'You can view the swagger documentation at /api-docs',
  };
  res.json(response);
});

export default router;
