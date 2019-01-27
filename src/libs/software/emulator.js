/**
 * Реализуется простейшая логика: пассажир жмет кнопку на этаже,
 * кабина приезжает и везет его на другой этаж. Если в это время
 * фиксируются другие вызовы, они сохраняются в стеке для
 * последующей обработки
 */

import Queue from '@/libs/queue.js'

import {
  // in
  SIG_FLOOR_BUTTON,
  SIG_CABIN_BUTTON,
  SIG_LIMIT_REACHED,
  SIG_FLOOR_REACHED,
  // out
  SIG_MOTOR_UP,
  SIG_MOTOR_DOWN,
  SIG_MOTOR_STOP,
  SIG_CABIN_OPEN,
  SIG_CABIN_CLOSE
} from './signals'

const MOTOR_ON_UP = 'motor-on-up'
const MOTOR_ON_DOWN = 'motor-on-dowm'
const MOTOR_OFF = 'motor-off'
const CABIN_OPENED = 'cabin-opened'
const CABIN_CLOSED = 'cabin-closed'

class Emulator {
  /**
   * Конструктор
   */
  constructor (busIn, busOut) {
    this.busIn = busIn
    this.busOut = busOut
    this.currentFloor = 1 // Текущий этаж 
    this.destinationFloor = null // Целевой этаж
    this.queue = new Queue() // Очередь вызова кабины на этажах
    this.motorStatus = MOTOR_OFF // Статус мотора
    this.cabinStatus = CABIN_CLOSED // Статус мотора
    this.cabinCloseTimeout = 3000 // Дверь кабины автоматом закрываем чере 3 сек.
    this.cabinCloseTimeoutId = null // Указатель на timeout, закрывающий дверь кабины

    // Слушаем входную шину
    setInterval(() => {
      let sig = null
      do {
        sig = this.busIn.get()
        if (sig) this.route(sig)
      } while (sig)
    }, 100)
    // TODO: Насильно опускаем кабину на первый этаж
  }

  /**
   * Маршрутизатор сигналов по обработчикам.
   * @param {object} signal
   */
  route ({type, value}) {
    if (typeof this[type] === 'function' ) {
      this[type](value)
    }
  }

  /**
   * Вызов кабины на этаж N
   * Реакция:
   *    Запустить мотор, если кабина свободна
   *    Иначе поместить номер этажа в очередь для последующей обработки
   * @param {integer} floorNumber 
   */
  [SIG_FLOOR_BUTTON] (floor) {
    if (this.motorStatus === MOTOR_OFF && this.cabinStatus === CABIN_CLOSED) {
      // поехали на вызов
      if (this.currentFloor === floor) {
        // мы-на-месте-толчок
        this.out(SIG_CABIN_OPEN)
        this.closeCabinByTimeout()
      } else {
        this.destinationFloor = floor
        this.startMotor()
      }
    } else {
      // лифт занят, пишем вызов в очередь
      if (!this.queue.contains(floor)) this.queue.put(floor)
    }
    return
  }

  /**
   * Оператор нажал в кабине кнопку с этажом N
   * Реакция:
   *    Закрываем двери кабины
   *    Пуск мотора
   * @param {integer} floor 
   */
  [SIG_CABIN_BUTTON] (floor) {
    if (
      this.motorStatus === MOTOR_OFF &&
      this.currentFloor !== floor
    ) {
      clearTimeout(this.cabinCloseTimeoutId)
      if (this.cabinStatus === CABIN_OPENED) {
        this.out(SIG_CABIN_CLOSE)
      }
      this.destinationFloor = floor
      this.startMotor()
    }
  }

  /**
   * Кабиной достигнут этаж N
   * Реакция:
   *    Если цель -- этаж N, то
   *        Останов мотора
   *        Открываем двери кабины
   * @param {string} floor
   */
  [SIG_FLOOR_REACHED] () {
    if (this.motorStatus === MOTOR_ON_UP) this.currentFloor += 1
    if (this.motorStatus === MOTOR_ON_DOWN) this.currentFloor -= 1
    if (this.destinationFloor === this.currentFloor) {
      // Высаживаем пассажира
      this.out(SIG_MOTOR_STOP)
      this.out(SIG_CABIN_OPEN)
      this.closeCabinByTimeout()
      // Обрабатываем следующий вызов
      if (!this.queue.isEmpty()) {
        this.destinationFloor = this.queue.get()
        this.startMotor()
      }
    }
  }

  /**
   * Кабиной достигнуто крайнее нижнее или верхнее положение
   * Реакция:
   *    Останов мотора
   *    Открываем двери кабины
   */
  [SIG_LIMIT_REACHED] () {
    this.out(SIG_MOTOR_STOP)
    this.out(SIG_CABIN_OPEN)
  }

  /******************************************** UTILS ********************************************/

  /** 
   * Закрытие двери кабины по таймауту
   */
  closeCabinByTimeout () {
    this.cabinCloseTimeoutId = setTimeout(
      () => {
        this.out(SIG_CABIN_CLOSE)
      },
      this.cabinCloseTimeout
    )
  }

  /**
   * Включить мотор для перемещения на указанный в destinationFloor этаж
   */
  startMotor () {
    if (this.destinationFloor && this.destinationFloor !== this.currentFloor) {
      (this.currentFloor > this.destinationFloor)
        ? this.out(SIG_MOTOR_DOWN) // едем вниз
        : this.out(SIG_MOTOR_UP) // едем вверх
    }
  }

  /**
   * Отправка команды наружу с обновлением статусов устройств
   */
  out(type) {
    if (type === SIG_MOTOR_UP) this.motorStatus = MOTOR_ON_UP
    if (type === SIG_MOTOR_DOWN) this.motorStatus = MOTOR_ON_DOWN
    if (type === SIG_MOTOR_STOP) this.motorStatus = MOTOR_OFF
    if (type === SIG_CABIN_CLOSE) this.cabinStatus = CABIN_CLOSED
    if (type === SIG_CABIN_OPEN) this.cabinStatus = CABIN_OPENED
    this.busOut.put({ type })
  }
}

export default Emulator
