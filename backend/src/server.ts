// src/server.ts

import { AnalyticsServer } from './AnalyticsServer';

let app = new AnalyticsServer().app;

export { app };
