import {
  SIG_FLOOR_BUTTON,
  SIG_CABIN_BUTTON,
  SIG_LIMIT_REACHED,
  SIG_FLOOR_REACHED
} from './signals'

class Emulator {
  /**
   * Конструктор
   */
  constructor () {
    this.queue = []
    // При инициализации насильно опускаем кабину на первый этаж
    this.signal(SIG_FLOOR_BUTTON, 1)
  }

  /**
   * Маршрутизатор сигналов по обработчикам.
   * @param {string} type 
   * @param {*} value 
   */
  signal (type, value) {
    if (typeof this[type] === 'function' ) {
      this[type](value)
    } else {
      console.log(`${type}: signal is not defined.`)
    }
  }

  /**
   * Вызов кабины на этаж N
   * Реакция:
   *    Поместить номер этажа в очередь для последующей обработки
   * @param {integer} floorNumber 
   */
  [SIG_FLOOR_BUTTON] (floor) {
    this.queue.push(floor)
  }

  /**
   * Оператор нажал в кабине кнопку с этажом N
   * Реакция:
   *    Закрываем двери кабины
   *    Пуск мотора вверх или вниз
   * @param {integer} floor 
   */
  [SIG_CABIN_BUTTON] (floor) {
    return
  }

  /**
   * Кабиной достигнуто крайнее нижнее или верхнее положение
   * Реакция:
   *    Останов мотора
   *    Открываем двери кабины
   
   */
  [SIG_LIMIT_REACHED] () {
    return
  }

  /**
   * Кабиной достигнут этаж N
   * Реакция:
   *    Если цель -- этаж N, то
   *        Останов мотора
   *        Открываем двери кабины
   * @param {string} value 
   */
  [SIG_FLOOR_REACHED] () {
    return
  }
}

export default Emulator
