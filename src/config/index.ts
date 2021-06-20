interface Config {
  apiHost: string;
}

const config: Record<string, Config> = {
  LOCAL: {
    apiHost: 'http://152.70.90.6:8000/api',
  },
  DEVELOP: {
    apiHost: 'http://localhost:8000/api',
  },
  PRODUCTION: {
    apiHost: 'http://152.70.90.6:8000/api',
  },
};

export default config.DEVELOP as Config;
