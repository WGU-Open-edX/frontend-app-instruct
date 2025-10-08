import { CurrentAppProvider, getAppConfig } from '@openedx/frontend-base';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { appId } from './constants';

import './main.scss';
import { Outlet } from 'react-router-dom';
import PageWrapper from './pageWrapper/PageWrapper';

const Main = () => (
  <CurrentAppProvider appId={appId}>
    <main className="d-flex flex-column flex-grow-1">
      <PageWrapper>
        <Outlet />
      </PageWrapper>
    </main>
    { getAppConfig(appId).NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} /> }
  </CurrentAppProvider>
);

export default Main;
