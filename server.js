import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'data', 'db.json');

const app = express();
app.use(express.json());

// Simulation of AI/Automation Processing Logic
const enrichJob = (job) => {
  return {
    ...job,
    id: crypto.randomUUID(),
    status: 'completed',
    processed_at: new Date().toISOString(),
    orchestration_metadata: {
      engine: 'copilot-orchestrator',
      version: '1.0.0',
      ai_enrichment: true,
      confidence_score: 0.98
    }
  };
};

app.post('/jobs/process', async (req, res) => {
  try {
    const { task, payload } = req.body;

    if (!task || !payload) {
      return res.status(400).json({ error: 'Missing task or payload' });
    }

    const processedJob = enrichJob({ task, payload });

    // Ensure data directory exists (robustness)
    await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });

    // Persistence logic
    let jobs = [];
    try {
      const data = await fs.readFile(DB_PATH, 'utf-8');
      jobs = JSON.parse(data);
    } catch (e) {
      // File doesn't exist yet, start with empty array
    }

    jobs.push(processedJob);
    await fs.writeFile(DB_PATH, JSON.stringify(jobs, null, 2));

    console.log(`[Copilot] Job processed: ${processedJob.id}`);
    res.status(201).json(processedJob);
  } catch (error) {
    console.error('[Error]', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// For testing purposes
export default app;

if (process.env.NODE_ENV !== 'test') {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Automation Engine running at http://localhost:${PORT}`);
    console.log(`Endpoint: POST /jobs/process`);
  });
}
