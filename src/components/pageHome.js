import data from '../_setup.json';

import PageView from './pageView';


export default function PageHome() {
  return (
    <div>
      <PageView page={ data.url.slug_home } />
    </div>
  );
}
