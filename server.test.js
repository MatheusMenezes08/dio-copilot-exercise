import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from './server.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'data', 'db.json');

describe('Automation Orchestration API', () => {

    beforeEach(async () => {
        // Clear the database before each test
        try {
            await fs.writeFile(DB_PATH, JSON.stringify([]));
        } catch (e) {
            // Directory might not exist, that's fine
        }
    });

    it('should process a job and return enriched metadata', async () => {
        const payload = {
            task: 'summarize_logs',
            payload: { logs: ['error at line 10', 'warning at line 15'] }
        };

        const response = await request(app)
            .post('/jobs/process')
            .send(payload);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.orchestration_metadata).toBeDefined();
        expect(response.body.orchestration_metadata.engine).toBe('copilot-orchestrator');
    });

    it('should return 400 if payload is missing', async () => {
        const response = await request(app)
            .post('/jobs/process')
            .send({ task: 'only_task' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Missing task or payload');
    });
});
