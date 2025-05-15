import {Injectable, DestroyRef, inject, signal} from '@angular/core';
import {Socket, io} from 'socket.io-client';
import {environment} from '../../../environments/environment';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Observable, Subject, BehaviorSubject} from 'rxjs';
import {NotificationService} from './notification.service';
import {
  Player,
  WebSocketGameSession,
  ChatMessage,
  QuestionReveal,
  TimerInfo,
  GameStartEvent,
  GameEndEvent,
  ScoreUpdateEvent,
  QuestionTimeoutEvent,
  TimerStopEvent,
  AuthSuccessEvent,
  ErrorEvent,
  ConnectionStatus
} from '../interfaces/websocket.interfaces';
import {AuthService} from '@auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: Socket;
  private destroyRef = inject(DestroyRef);
  private notificationService = inject(NotificationService);

  private jwtToken = inject(AuthService).getToken();

  // Статус соединения
  private connectionStatus = signal<ConnectionStatus>('disconnected');

  // Субъекты для различных событий
  private playerJoin = new Subject<Player>();
  private playerLeave = new Subject<string>();
  private playerUpdate = new Subject<Player>();
  private gameUpdate = new Subject<WebSocketGameSession>();
  private gameStart = new Subject<GameStartEvent>();
  private gameEnd = new Subject<GameEndEvent>();
  private questionReveal = new Subject<QuestionReveal>();
  private timerStart = new Subject<TimerInfo>();
  private timerStop = new Subject<TimerStopEvent>();
  private scoreUpdate = new Subject<ScoreUpdateEvent>();
  private chatMessages = new Subject<ChatMessage>();
  private authSuccess = new Subject<AuthSuccessEvent>();
  private player = new BehaviorSubject<Player | null>(null);

  /**
   * Инициализирует соединение с веб-сокетом
   * @param token JWT токен пользователя или гостя
   */
  public connect(): void {
    const token = this.jwtToken;

    if (this.socket) {
      this.socket.disconnect();
    }

    this.connectionStatus.set('connecting');

    this.socket = io(environment.apiUrl, {
      auth: {
        token
      }
    });

    this.setupEventListeners();
  }

  /**
   * Настраивает слушателей событий сокета
   */
  private setupEventListeners(): void {
    // Основные события соединения
    this.socket.on('connect', () => {
      this.connectionStatus.set('connected');
      console.log('[WebSocketService] Connected to server');
      this.notificationService.showNotification('success', 'Connected to game server', 3000);
    });

    this.socket.on('disconnect', () => {
      this.connectionStatus.set('disconnected');
      console.log('[WebSocketService] Disconnected from server');
      this.notificationService.showNotification('warning', 'Disconnected from game server', 5000);
    });

    this.socket.on('connect_error', (error: Error) => {
      this.connectionStatus.set('disconnected');
      console.error('[WebSocketService] Connection error:', error);
      this.notificationService.showNotification('error', `Connection error: ${error.message}`, 5000);
    });

    // События аутентификации
    this.socket.on('auth:success', (data: {player: Player}) => {
      console.log('[WebSocketService] Authentication success:', data);
      this.player.next(data.player);
      this.authSuccess.next(data);
    });

    this.socket.on('auth:error', (error: {message: string}) => {
      console.error('[WebSocketService] Authentication error:', error);
      this.notificationService.showNotification('error', `Authentication error: ${error.message}`, 5000);
    });

    // События игры
    this.socket.on('game:update', (data: {gameSession: WebSocketGameSession}) => {
      console.log('[WebSocketService] Game update:', data);
      this.gameUpdate.next(data.gameSession);
    });

    this.socket.on('game:start', (data: GameStartEvent) => {
      console.log('[WebSocketService] Game started:', data);
      this.gameStart.next(data);
      this.notificationService.showNotification('info', data.message, 5000);
    });

    this.socket.on('game:end', (data: GameEndEvent) => {
      console.log('[WebSocketService] Game ended:', data);
      this.gameEnd.next(data);
      this.notificationService.showNotification('info', data.message, 5000);
    });

    this.socket.on('game:error', (error: ErrorEvent) => {
      console.error('[WebSocketService] Game error:', error);
      this.notificationService.showNotification('error', `Game error: ${error.message}`, 5000);
    });

    // События игроков
    this.socket.on('player:join', (data: {player: Player}) => {
      console.log('[WebSocketService] Player joined:', data);
      this.playerJoin.next(data.player);
    });

    this.socket.on('player:leave', (data: {playerId: string}) => {
      console.log('[WebSocketService] Player left:', data);
      this.playerLeave.next(data.playerId);
    });

    this.socket.on('player:update', (data: {player: Player}) => {
      console.log('[WebSocketService] Player updated:', data);
      this.playerUpdate.next(data.player);
    });

    // События вопросов
    this.socket.on('question:reveal', (data: QuestionReveal) => {
      console.log('[WebSocketService] Question reveal:', data);
      this.questionReveal.next(data);
    });

    this.socket.on('question:timeout', (data: QuestionTimeoutEvent) => {
      console.log('[WebSocketService] Question timeout:', data);
      this.notificationService.showNotification('warning', `Time's up! The answer was: ${data.answer}`, 5000);
    });

    // События таймера
    this.socket.on('timer:start', (data: TimerInfo) => {
      console.log('[WebSocketService] Timer started:', data);
      this.timerStart.next(data);
    });

    this.socket.on('timer:stop', (data: TimerStopEvent) => {
      console.log('[WebSocketService] Timer stopped:', data);
      this.timerStop.next(data);
    });

    // События очков
    this.socket.on('score:update', (data: ScoreUpdateEvent) => {
      console.log('[WebSocketService] Score updated:', data);
      this.scoreUpdate.next(data);
    });

    // События чата
    this.socket.on('chat:message', (data: ChatMessage) => {
      console.log('[WebSocketService] Chat message:', data);
      this.chatMessages.next(data);
    });
  }

  /**
   * Аутентификация в игровой сессии
   */
  public authenticate(userId: string | undefined, guestToken: string | undefined, gameSessionId: string): void {
    if (!this.socket || !this.socket.connected) {
      this.notificationService.showNotification('error', 'Not connected to server', 5000);
      return;
    }

    this.socket.emit('auth', {userId, guestToken, gameSessionId});
  }

  /**
   * Присоединение к игре
   */
  public joinGame(gameSessionId: string): void {
    if (!this.socket || !this.socket.connected) {
      this.notificationService.showNotification('error', 'Not connected to server', 5000);
      return;
    }

    this.socket.emit('game:join', {gameSessionId});
  }

  /**
   * Покидание игры
   */
  public leaveGame(): void {
    if (!this.socket || !this.socket.connected) {
      return;
    }

    this.socket.emit('game:leave');
  }

  /**
   * Выбор вопроса
   */
  public selectQuestion(questionId: string): void {
    if (!this.socket || !this.socket.connected) {
      this.notificationService.showNotification('error', 'Not connected to server', 5000);
      return;
    }

    this.socket.emit('question:select', {questionId});
  }

  /**
   * Ответ на вопрос
   */
  public answerQuestion(questionId: string, answer: string): void {
    if (!this.socket || !this.socket.connected) {
      this.notificationService.showNotification('error', 'Not connected to server', 5000);
      return;
    }

    this.socket.emit('question:answer', {questionId, answer});
  }

  /**
   * Установка готовности игрока
   */
  public setPlayerReady(ready: boolean): void {
    if (!this.socket || !this.socket.connected) {
      this.notificationService.showNotification('error', 'Not connected to server', 5000);
      return;
    }

    this.socket.emit('player:ready', {ready});
  }

  /**
   * Отправка сообщения в чат
   */
  public sendChatMessage(message: string): void {
    if (!this.socket || !this.socket.connected) {
      this.notificationService.showNotification('error', 'Not connected to server', 5000);
      return;
    }

    this.socket.emit('chat:message', {message});
  }

  /**
   * Завершение игры (только для ведущего)
   */
  public endGame(): void {
    if (!this.socket || !this.socket.connected) {
      this.notificationService.showNotification('error', 'Not connected to server', 5000);
      return;
    }

    this.socket.emit('game:end');
  }

  /**
   * Получение текущего игрока
   */
  public getCurrentPlayer(): Observable<Player | null> {
    return this.player.asObservable();
  }

  /**
   * Получение обсервабла для успешной аутентификации
   */
  public onAuthSuccess(): Observable<AuthSuccessEvent> {
    return this.authSuccess.asObservable();
  }

  /**
   * Получение обсервабла для события присоединения игрока
   */
  public onPlayerJoin(): Observable<Player> {
    return this.playerJoin.asObservable();
  }

  /**
   * Получение обсервабла для события ухода игрока
   */
  public onPlayerLeave(): Observable<string> {
    return this.playerLeave.asObservable();
  }

  /**
   * Получение обсервабла для события обновления игрока
   */
  public onPlayerUpdate(): Observable<Player> {
    return this.playerUpdate.asObservable();
  }

  /**
   * Получение обсервабла для события обновления игры
   */
  public onGameUpdate(): Observable<WebSocketGameSession> {
    return this.gameUpdate.asObservable();
  }

  /**
   * Получение обсервабла для события начала игры
   */
  public onGameStart(): Observable<GameStartEvent> {
    return this.gameStart.asObservable();
  }

  /**
   * Получение обсервабла для события завершения игры
   */
  public onGameEnd(): Observable<GameEndEvent> {
    return this.gameEnd.asObservable();
  }

  /**
   * Получение обсервабла для события раскрытия результата ответа на вопрос
   */
  public onQuestionReveal(): Observable<QuestionReveal> {
    return this.questionReveal.asObservable();
  }

  /**
   * Получение обсервабла для события начала таймера
   */
  public onTimerStart(): Observable<TimerInfo> {
    return this.timerStart.asObservable();
  }

  /**
   * Получение обсервабла для события остановки таймера
   */
  public onTimerStop(): Observable<TimerStopEvent> {
    return this.timerStop.asObservable();
  }

  /**
   * Получение обсервабла для события обновления очков
   */
  public onScoreUpdate(): Observable<ScoreUpdateEvent> {
    return this.scoreUpdate.asObservable();
  }

  /**
   * Получение обсервабла для сообщений чата
   */
  public onChatMessage(): Observable<ChatMessage> {
    return this.chatMessages.asObservable();
  }

  /**
   * Получение статуса соединения
   */
  public getConnectionStatus() {
    return this.connectionStatus;
  }

  /**
   * Отключение от сервера
   */
  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
    this.connectionStatus.set('disconnected');
  }
}
