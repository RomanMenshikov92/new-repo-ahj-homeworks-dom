export default class TaskOne {
  constructor(element) {
    this.element = element;
    this.fieldSize = 4;
    this.lastCell = 0;
    this.hits = 0;
    this.misses = 0;
  }

  init() {
    this.createHtml(this.element); // создаём html

    // запускам интервал
    this.timerID = setInterval(this.goblinActive.bind(this), 1000);
  }

  createHtml(element) {
    this.test = element;

    // добавляем заголовок задачи
    const h2 = `
      <H2>
        Задача № 1<br>
        Перемещение элемента.
      </H2>
      <div class="points">Попаданий: <span>0</span></div>
      <div class="points">Промахов: <span>0</span></div>
    `;
    element.insertAdjacentHTML('afterBegin', h2);
    this.pointer = Array.from(element.querySelectorAll('.points > span'));

    // создаём тэг для поля
    this.board = document.createElement('div');
    this.board.classList.add('board');
    element.appendChild(this.board);

    // добавляем кнопку для очищения статистики
    const button = '<button>Очистить статистику</button>';
    element.insertAdjacentHTML('beforeEnd', button);
    this.button = this.element.querySelector('button');
    this.button.addEventListener('click', (event) => {
      event.preventDefault();
      this.buttonClearPoints();
    });

    // добавляем ячейки игрового поля
    for (let i = 0; i < this.fieldSize ** 2; i += 1) {
      // создаём див
      const cell = document.createElement('div');

      // добавляем класс ячейки
      cell.classList.add('cell');

      // добавляем событие клика
      cell.addEventListener('click', (event) => this.clickCell(event));

      // вставляем ячейку в дом
      this.board.appendChild(cell);
    }

    // массив ячеек игрового поля
    this.cells = Array.from(this.element.querySelectorAll('.cell'));
  }

  // рандомно появление гоблина
  goblinActive() {
    this.cells[this.lastCell].classList.remove('active');

    const rand = () => {
      const random = Math.floor(Math.random() * (this.fieldSize ** 2));
      if (random === this.lastCell) {
        return rand();
      }
      this.lastCell = random;
      return random;
    };

    const index = rand();
    this.cells[index].classList.add('active');
  }

  // событие клика по ячейке возвращает индекс ячейки
  clickCell(event) {
    event.preventDefault();
    const index = this.cells.indexOf(event.currentTarget);
    const active = this.cells[index].classList.contains('active');
    if (active) {
      this.hits += 1;
      this.pointer[0].textContent = this.hits;
    }
    if (!active) {
      this.misses += 1;
      this.pointer[1].textContent = this.misses;
    }
  }

  // очищение статистики
  buttonClearPoints() {
    this.pointer.forEach((item) => {
      // eslint-disable-next-line no-param-reassign
      item.textContent = 0;
    });
    this.hits = 0;
    this.misses = 0;
  }
}
