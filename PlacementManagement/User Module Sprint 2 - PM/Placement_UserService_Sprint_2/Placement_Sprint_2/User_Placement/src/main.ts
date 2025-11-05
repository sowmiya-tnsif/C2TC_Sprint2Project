import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { UserModule } from './app/User.module';

platformBrowserDynamic()
  .bootstrapModule(UserModule)
  .catch((err) => console.error(err));
