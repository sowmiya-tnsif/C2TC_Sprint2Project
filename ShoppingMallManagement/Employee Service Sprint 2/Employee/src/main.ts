import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { EmployeeModule } from './app/Employee.module';

platformBrowserDynamic()
  .bootstrapModule(EmployeeModule)
  .catch((err) => console.error(err));
