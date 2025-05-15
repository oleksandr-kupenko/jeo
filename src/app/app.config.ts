import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {
  lucidePlay,
  lucidePlus,
  lucideList,
  lucidePencil,
  lucideTrash,
  lucideTrash2,
  lucideGamepad2,
  lucideChevronRight,
  lucideSquare,
  lucideGamepad,
  lucideCirclePlus,
  lucideInfo
} from '@ng-icons/lucide';
import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideQuillConfig} from 'ngx-quill';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor, errorInterceptor} from './core/interceptors';
import {provideIcons} from '@ng-icons/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideIcons({
      lucidePlay,
      lucidePlus,
      lucideList,
      lucidePencil,
      lucideTrash,
      lucideTrash2,
      lucideGamepad2,
      lucideChevronRight,
      lucideSquare,
      lucideGamepad,
      lucideCirclePlus,
      lucideInfo
    }),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideQuillConfig({
      modules: {
        syntax: true,
        toolbar: {
          container: [
            ['bold', 'italic', 'underline'],
            ['link', 'video', 'image']
          ],
          handlers: {
            image: imageHandler
          }
        }
      }
    })
  ]
};

function imageHandler(this: any) {
  const tooltip = this.quill.theme.tooltip;
  const originalSave = tooltip.save;
  const originalHide = tooltip.hide;
  tooltip.save = function (this: any) {
    const range = this.quill.getSelection(true);
    const value = this.textbox.value;
    if (value) {
      this.quill.insertEmbed(range.index, 'image', value, 'user');
    }
  };
  // Called on hide and save.
  tooltip.hide = function (this: any) {
    tooltip.save = originalSave;
    tooltip.hide = originalHide;
    tooltip.hide();
  };
  tooltip.edit('image');
  tooltip.textbox.placeholder = 'Embed URL';
}
