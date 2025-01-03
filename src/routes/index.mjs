import express from 'express';
import authRouter from './auth.routes.mjs';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Hello, world!' });
});

router.use('/auth', authRouter);



export default router; 



