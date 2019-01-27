/* Входные команды для модуля Software */

export const SIG_FLOOR_BUTTON = 'sig-floor-button' // Нажата кнопка на этаже
export const SIG_CABIN_BUTTON = 'sig-cabin-button' // Нажата кнопка в кабине лифта
export const SIG_LIMIT_REACHED = 'sig-limit-reached' // Кабиной достигнуто крайнее положение (верх или низ)
export const SIG_FLOOR_REACHED = 'sig-floor-reached' // Кабинa прибыла на этаж

/* Выходные сигналы для модуля Software */

export const SIG_MOTOR_UP = 'sig-motor-up' // Запустить мотор "вверх"
export const SIG_MOTOR_DOWN = 'sig-motor-down' // Запустить мотор "вниз"
export const SIG_MOTOR_STOP = 'sig-motor-stop' // Остановить мотор
export const SIG_CABIN_OPEN = 'sig-cabin-open' // Открыть двери кабины
export const SIG_CABIN_CLOSE = 'sig-cabin-close' // Закрыть двери кабины
