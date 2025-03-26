import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText',
  standalone: true
})
export class TruncateTextPipe implements PipeTransform {
  transform(value: string, limit: number = 50): string {
    if (!value) return '';
    
    // Удаляем лишние пробелы, переносы строк и т.д.
    const cleanText = value.replace(/\s+/g, ' ').trim();
    
    if (cleanText.length <= limit) {
      return cleanText;
    }
    
    return cleanText.substring(0, limit) + '...';
  }
} 