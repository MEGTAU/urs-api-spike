const config = require('./config');
const logger = require('./logger');
const ExpressServer = require('./expressServer');

const { execSync } = require('child_process');

const launchServer = async () => {
  try {
    // Generate API documentation before launching the server
    logger.info('Generating API documentation...');
    execSync('./generateApiDocs.sh', { stdio: 'inherit' });
    logger.info('API documentation generated.');

    this.expressServer = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);
    this.expressServer.launch();
    logger.info('Express server running');
  } catch (error) {
    logger.error('Express Server failure', error.message);
    await this.close();
  }
};

launchServer().catch(e => logger.error(e));
