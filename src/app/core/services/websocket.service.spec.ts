import {TestBed} from '@angular/core/testing';
import {WebSocketService} from './websocket.service';
import {NotificationService} from './notification.service';
import {ConnectionStatus} from '../interfaces/websocket.interfaces';

describe('WebSocketService', () => {
  let service: WebSocketService;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('NotificationService', ['showNotification']);

    TestBed.configureTestingModule({
      providers: [WebSocketService, {provide: NotificationService, useValue: spy}]
    });

    service = TestBed.inject(WebSocketService);
    notificationServiceSpy = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a default disconnected status', () => {
    const defaultStatus: ConnectionStatus = 'disconnected';
    expect(service.getConnectionStatus()()).toEqual(defaultStatus);
  });

  // Дополнительные тесты можно добавить для проверки методов,
  // но для полного тестирования необходимо имитировать socket.io-client
});
