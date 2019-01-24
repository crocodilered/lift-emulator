/* Входные команды для модуля Software */

export const SIG_FLOOR_BUTTON = 'sigFloorButton' // Нажата кнопка на этаже
export const SIG_CABIN_BUTTON = 'sigCabinButton' // Нажата кнопка в кабине лифта
export const SIG_LIMIT_REACHED = 'sigLoReached' // Кабиной достигнуто крайнее положение (верх или низ)
export const SIG_FLOOR_REACHED = 'sigFloorReached' // Кабинa прибыла на этаж

/* Выходные сигналы для модуля Software */

export const SIG_MOTOR_UP = 'sigMotorUp' // Запустить мотор "вверх"
export const SIG_MOTOR_DOWN = 'sigMotorDown' // Запустить мотор "вниз"
export const SIG_MOTOR_STOP = 'sigMotorStop' // Остановить мотор
export const SIG_CABIN_OPEN = 'sigCabinOpen' // Открыть двери кабины
export const SIG_CABIN_CLOSE = 'sigCabinClose' // Закрыть двери кабины
