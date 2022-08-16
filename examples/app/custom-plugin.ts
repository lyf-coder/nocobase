/*
# 编写一个最简单的插件

# 步骤

Step 1: Start app
yarn run:example plugins/custom-plugin start

Step 2: View test list
http://localhost:13000/api/test:list
*/
import { Application, Plugin } from '@nocobase/server';

const app = new Application({
  database: {
    logging: process.env.DB_LOGGING === 'on' ? console.log : false,
    dialect: process.env.DB_DIALECT as any,
    storage: process.env.DB_STORAGE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as any,
    timezone: process.env.DB_TIMEZONE,
    tablePrefix: process.env.DB_TABLE_PREFIX,
  },
  resourcer: {
    prefix: '/api',
  },
  plugins: [],
});

// Encapsulate modules into a plugin
class MyPlugin extends Plugin {
  getName() {
    return 'MyPlugin';
  }
  async load() {
    app.resource({
      name: 'test',
      actions: {
        async list(ctx) {
          ctx.body = 'test list';
        },
      },
    });
  }
}

// Register plugin
app.plugin(MyPlugin);

if (require.main === module) {
  app.runAsCLI();
}

export default app;
