import { feathers } from '@feathersjs/feathers';
import { koa, rest, bodyParser, errorHandler, parseAuthentication, cors, serveStatic } from '@feathersjs/koa';

import { configurationValidator } from './configuration';
import type { Application } from './declarations';
import { logError } from './hooks/log-error';
import { authentication } from './authentication';
import { services } from './services';
import swagger from 'feathers-swagger';

import { config } from 'dotenv';
config();
// order is important here
import configuration from '@feathersjs/configuration';

const app: Application = koa(feathers());

// Load our app configuration (see config/ folder)
app.configure(configuration(configurationValidator));
app.configure(
  swagger({
    idType: 'string',
    specs: {
      info: {
        title: 'Tasks API',
        description: 'API for managing tasks',
        version: '1.0.0'
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer'
          }
        }
      },
      security: [{ BearerAuth: [] }]
    },
    ui: swagger.swaggerUI({
      docsPath: '/docs'
    })
  })
);
// Set up Koa middleware
app.use(cors());
app.use(serveStatic(app.get('public')));
app.use(errorHandler());
app.use(parseAuthentication());
app.use(bodyParser());

// Configure services and transports
app.configure(rest());
app.configure(authentication);
app.configure(services);

// Register hooks that run on all service methods
app.hooks({
  around: {
    all: [logError]
  },
  before: {},
  after: {},
  error: {}
});
// Register application setup and teardown hooks here
app.hooks({
  setup: [],
  teardown: []
});

export { app };
