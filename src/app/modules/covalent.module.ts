import { NgModule } from '@angular/core';

import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentCommonModule } from '@covalent/core/common';
import { CovalentLoadingModule } from '@covalent/core/loading';
import { CovalentMenuModule } from '@covalent/core/menu';
import { CovalentSearchModule } from '@covalent/core/search';
import { CovalentNotificationsModule } from '@covalent/core/notifications';
import { CovalentPagingModule } from '@covalent/core/paging';
import { CovalentFileModule } from '@covalent/core/file';
import { CovalentDialogsModule } from '@covalent/core/dialogs';

import { CovalentStepsModule  } from '@covalent/core/steps';
/* any other core modules */
// (optional) Additional Covalent Modules imports
import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';


@NgModule({
    exports: [
        CovalentLayoutModule,
        CovalentCommonModule,
        CovalentLoadingModule,
        CovalentMenuModule,
        CovalentSearchModule,
        CovalentNotificationsModule,
        CovalentPagingModule,
        CovalentFileModule,
        CovalentDialogsModule,
        CovalentStepsModule,
        CovalentHighlightModule,
        CovalentMarkdownModule,
        CovalentDynamicFormsModule,

    ]
})
export class CovalentModule { }