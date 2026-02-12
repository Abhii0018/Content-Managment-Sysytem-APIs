import express from 'express';

const router = express.Router();

router.post('/test', (req, res) => {
  const event = req.body;
  console.log('Received webhook event:', event);
  console.log(req.body); // Log the entire request body for debugging purposes  
  // Process the event as needed
  res.status(200).json({ received: true });

  res.json({ received: true });
  
});

export default router;

