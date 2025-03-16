import { Component } from '@angular/core';

@Component({
  selector: 'app-automatically-generated-game',
  standalone: true,
  template: `
    <div class="flex items-center justify-center h-screen flex-col">
      <h2 class="text-2xl font-bold mb-6">Генерация игры с помощью ИИ</h2>
      
      <div class="w-full max-w-2xl">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Тема</label>
          <input 
            type="text" 
            class="w-full p-2 border rounded-md"
            placeholder="Введите основную тему игры">
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Категории (через запятую)</label>
          <input 
            type="text" 
            class="w-full p-2 border rounded-md"
            placeholder="История, Наука, Искусство, География, Спорт">
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Детали (опционально)</label>
          <textarea 
            class="w-full p-2 border rounded-md h-24"
            placeholder="Дополнительные детали для генерации вопросов"></textarea>
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Примеры вопросов (опционально)</label>
          <textarea 
            class="w-full p-2 border rounded-md h-24"
            placeholder="Примеры вопросов для лучшего понимания стиля"></textarea>
        </div>
        
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-2">Настройки</h3>
          <div class="flex flex-col gap-2">
            <label class="flex items-center">
              <input type="checkbox" class="mr-2"> Разрешить изображения
            </label>
            <label class="flex items-center">
              <input type="checkbox" class="mr-2"> Разрешить видео
            </label>
            <label class="flex items-center">
              <input type="checkbox" class="mr-2"> Количество категорий: 5
            </label>
          </div>
        </div>
        
        <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full">
          Сгенерировать игру
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
      width: 100%;
    }
  `]
})
export class AutomaticallyGeneratedGameComponent {} 