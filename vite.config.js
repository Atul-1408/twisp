import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import leadsHandler from './api/leads.js';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Populate process.env for the local API middleware
  Object.assign(process.env, env);

  return {
    plugins: [
      react(),
      {
        name: 'local-api-leads',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/leads' && req.method === 'POST') {
              let bodyStr = '';
              req.on('data', (chunk) => {
                bodyStr += chunk;
              });
              req.on('end', async () => {
                try {
                  req.body = bodyStr ? JSON.parse(bodyStr) : {};
                  const mockRes = {
                    statusCode: 200,
                    setHeader(key, val) {
                      res.setHeader(key, val);
                    },
                    status(code) {
                      this.statusCode = code;
                      res.statusCode = code;
                      return this;
                    },
                    json(data) {
                      res.setHeader('Content-Type', 'application/json');
                      res.end(JSON.stringify(data));
                    },
                  };
                  await leadsHandler(req, mockRes);
                } catch (e) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, message: e.message }));
                }
              });
              return;
            }
            next();
          });
        },
      },
    ],
    server: {
      port: 3000,
      open: false,
    },
  };
});
