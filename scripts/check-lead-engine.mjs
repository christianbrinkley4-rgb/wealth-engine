import { leadEngineReadiness } from '../lib/leadEngineReadiness.ts';
const result = leadEngineReadiness(process.env);
console.log(JSON.stringify({ ...result, captureEnabled: process.env.LEAD_ENGINE_CAPTURE_ENABLED === 'true' }, null, 2));
if (!result.ready) process.exitCode = 1;
