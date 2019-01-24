import Queue from '@/libs/queue'

import {
  SIG_FLOOR_BUTTON,
  SIG_CABIN_BUTTON,
  SIG_LIMIT_REACHED,
  SIG_FLOOR_REACHED,
  SIG_MOTOR_UP,
  SIG_MOTOR_DOWN,
  SIG_MOTOR_STOP,
  SIG_CABIN_OPEN,
  SIG_CABIN_CLOSE
} from './signals'

class Emulator {
  /**
   * Конструктор
   */
  constructor () {
    // Последний зафиксированный этаж
    this.reachedFloor = null
    // очередь вызова кабины на этажах
    this.floorQueue = new Queue()
    // очередь направления кабины (жмут кнопки в кабине)
    this.cabinQueue = new Queue()
    // При инициализации насильно опускаем кабину на первый этаж
    this.signal(SIG_FLOOR_BUTTON, 1)
  }

  /**
   * Маршрутизатор сигналов по обработчикам.
   * @param {string} type 
   * @param {*} value 
   */
  signal (type, value) {
    return (typeof this[type] === 'function' )
      ? this[type](value)
      : null
  }

  /**
   * Вызов кабины на этаж N
   * Реакция:
   *    Поместить номер этажа в очередь для последующей обработки
   * @param {integer} floorNumber 
   */
  [SIG_FLOOR_BUTTON] (floor) {
    if (!this.floorQueue.contains(floor)) {
      this.floorQueue.put(floor)
    }
    return
  }

  /**
   * Оператор нажал в кабине кнопку с этажом N
   * Реакция:
   *    Поместить номер этажа в очередь для последующей обработки
   *    Закрываем двери кабины
   *    Пуск мотора вверх или вниз
   * @param {integer} floor 
   */
  [SIG_CABIN_BUTTON] (floor) {
    if (!this.cabinQueue.contains(floor)) {
      this.cabinQueue.put(floor)
    }
    return
  }

  /**
   * Кабиной достигнуто крайнее нижнее или верхнее положение
   * Реакция:
   *    Останов мотора
   *    Открываем двери кабины
   */
  [SIG_LIMIT_REACHED] () {
    return [
      { type: SIG_MOTOR_STOP },
      { type: SIG_CABIN_OPEN }
    ]
  }

  /**
   * Кабиной достигнут этаж N
   * Реакция:
   *    Если цель -- этаж N, то
   *        Останов мотора
   *        Открываем двери кабины
   * @param {string} floor
   */
  [SIG_FLOOR_REACHED] (floor) {
    this.prevFloor = floor
    if (this.floorQueue.includes(floor) || this.cabinQueue.includes(floor)) {
      // Удалим текущий этаж из обеих очередей
      return [
        { type: SIG_MOTOR_STOP },
        { type: SIG_CABIN_OPEN }
      ]
    }
  }
}

export default Emulator
