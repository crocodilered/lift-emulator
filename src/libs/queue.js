/**
 * Очередь
 * Работает по принципу FIFO
 */
class Queue {
  constructor () {
    this.items = []
  }

  /**
   * Поместить элемент в очередь
   * @param {*} item 
   */
  put (item) {
    this.items.push(item)
  }

  /**
   * Получить следующий элемент очереди (элемент при этом удаляется)
   */
  get () {
    return this.items.shift()
  }

  /**
   * Проверка наличия элемента в очереди
   */
  contains (item) {
    return this.items.includes(item)
  }

  /**
   * Удалить из очереди элемент по значению
   */
  del (item) {
    const index = this.items.indexOf(item)
    if (index !== -1) this.items.splice(index, 1)
  }

  /**
   * Проверка очереди на наличие элементов
   */
  isEmpty () {
    return (this.items.length === 0)
  }
}

export default Queue
