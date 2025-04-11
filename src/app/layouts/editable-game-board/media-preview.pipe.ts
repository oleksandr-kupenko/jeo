import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'mediaPreview',
  standalone: true
})
export class MediaPreviewPipe implements PipeTransform {
  transform(content: string): string {
    if (!content) return '';
    console.log(content);
    // Заменяем изображения на иконку
    let processedContent = content.replace(/<img[^>]*>/g, '🖼️');

    // Заменяем видео (iframe) на иконку
    processedContent = processedContent.replace(/<iframe[^>]*>[^<]*<\/iframe>/g, '🎥');

    // Удаляем все HTML теги, кроме базовых форматирующих
    processedContent = processedContent.replace(/<(?!\/?(b|i|em|strong)(?=>|\s.*>))\/?.*?>/g, '');

    // Преобразуем HTML-сущности в символы
    processedContent = processedContent
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&nbsp;/g, ' ')
      .replace(/&#39;/g, "'");

    return processedContent;
  }
}
