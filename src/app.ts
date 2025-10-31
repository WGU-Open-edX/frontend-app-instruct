import { App } from '@openedx/frontend-base';
import { appId } from './constants';
import routes from './routes';
import messages from './i18n';
import instructorTabsConfig from './instructorTabs/app';

const app: App = {
  appId,
  routes,
  messages,
  providers: [],
  slots: [
    ...(instructorTabsConfig.slots ?? []),
  ],
  config: {}
};

export default app;
