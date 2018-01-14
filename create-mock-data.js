const { models, sequelize } = require('./models')

function createData () {
  const MIN_FLOOR = 1
  const MAX_FLOOR = 5
  const MIX_CAPACITY = 2
  const MAX_CAPACITY = 6

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const createUsers = (arrayOfUsers) => {
    return arrayOfUsers.map((user) => {
      return {
        login: user[0],
        avatarUrl: user[1],
        homeFloor: getRandomInt(MIN_FLOOR, MAX_FLOOR)
      }
    })
  }

  const createMeetingsRoom = (arrayOfNames) => {
    return arrayOfNames.map((name) => {
      return {
        title: name,
        capacity: getRandomInt(MIX_CAPACITY, MAX_CAPACITY),
        floor: getRandomInt(MIN_FLOOR, MAX_FLOOR)
      }
    })
  }

  let usersPromise = models.User.bulkCreate(createUsers([
    [
      'Энакин Скайуокер',
      'http://kvaclub.ru/wp-content/uploads/2017/02/Anakin_2.png'
    ],
    [
      'Дарт Вейдер',
      'http://kvaclub.ru/wp-content/uploads/2017/02/Darth-Vader.png'
    ],
    [
      'Падме Амидала',
      'http://kvaclub.ru/wp-content/uploads/2017/02/Luke-Skywalker.png'
    ],
    [
      'Люк Скайуокер',
      'http://kvaclub.ru/wp-content/uploads/2017/02/Luke-Skywalker.png'
    ],
    [
      'Лея Органа',
      'http://kvaclub.ru/wp-content/uploads/2017/02/Leia-Organa.png'
    ],
    [
      'Хан Соло',
      'http://kvaclub.ru/wp-content/uploads/2017/02/Han-Solo.png'
    ],
    [
      'Кайло Рен',
      'http://kvaclub.ru/wp-content/uploads/2017/02/Kylo-Ren.png'
    ],
    [
      'Йода',
      'http://kvaclub.ru/wp-content/uploads/2017/02/Yoda.png'
    ],
    [
      'Квай-Гон Джинн',
      'http://kvaclub.ru/wp-content/uploads/2017/02/Qui-Gon.png'
    ],
    [
      'Оби-Ван Кеноби',
      'http://kvaclub.ru/wp-content/uploads/2017/02/Obi-Van.png'
    ],
    [
      'R2-D2',
      'http://kvaclub.ru/wp-content/uploads/2017/02/r2b2.png'
    ],
    [
      'C-3PO',
      'http://kvaclub.ru/wp-content/uploads/2017/02/C-3PO.png'
    ],
    [
      'Мейс Винду',
      'http://kvaclub.ru/wp-content/uploads/2017/02/Mace-Windu.png'
    ],
    [
      'Палпатин',
      'http://kvaclub.ru/wp-content/uploads/2017/02/Palpatin.png'
    ],
    [
      'Дарт Сидиус',
      'http://kvaclub.ru/wp-content/uploads/2017/02/Darth-Sidius.png'
    ],
    [
      'Дарт Молл',
      'http://kvaclub.ru/wp-content/uploads/2017/02/Darth-Mall.png'
    ],
    [
      'Граф Дуку',
      'http://kvaclub.ru/wp-content/uploads/2017/02/Dooku.png'
    ],
    [
      'Джа-Джа Бинкс',
      'http://kvaclub.ru/wp-content/uploads/2017/02/Jar-Jar-Binks.png'
    ],
    [
      'Чубакка',
      'http://kvaclub.ru/wp-content/uploads/2017/02/Chewbacca.png'
    ],
    [
      'Лэндо Калриссиан',
      'http://kvaclub.ru/wp-content/uploads/2017/02/Lando-Calrissian.png'
    ],
    [
      'Джабба Хатт',
      'http://kvaclub.ru/wp-content/uploads/2017/02/Jabba-the-hutt.png'
    ],
    [
      'Боба Фетт',
      'http://kvaclub.ru/wp-content/uploads/2017/02/Boba-Fett.png'
    ],
    [
      'Генерал Гривус',
      'http://kvaclub.ru/wp-content/uploads/2017/02/General-Grievous.png'
    ],
    [
      'Уилхуфф Таркин',
      'http://kvaclub.ru/wp-content/uploads/2017/02/Grand-Moff-Tarkin.png'
    ],
    [
      'Рей',
      'http://kvaclub.ru/wp-content/uploads/2017/02/Rey.png'
    ],
    [
      'По Дэмерон',
      'http://kvaclub.ru/wp-content/uploads/2017/02/Poe-Dameron.png'
    ],
    [
      'Армитидж Хакс',
      'http://kvaclub.ru/wp-content/uploads/2017/02/General-Hux.png'
    ],
    [
      'Капитан Фазма',
      'http://kvaclub.ru/wp-content/uploads/2017/02/captain-Phasma.png'
    ],
    [
      'Сноук',
      'http://kvaclub.ru/wp-content/uploads/2017/02/Snouk.png'
    ],
    [
      'BB-8',
      'http://kvaclub.ru/wp-content/uploads/2017/02/bb-8.png'
    ],
    [
      'Финн',
      'http://kvaclub.ru/wp-content/uploads/2017/02/Finn.png'
    ]
  ]))

  let roomsPromise = models.Room.bulkCreate(createMeetingsRoom([
    'Деньги',
    'Карты',
    'Два ствола',
    '404',
    'Три поросенка',
    'Камчатка',
    'У Стасяна',
    'Стоунхэнж',
    'Зеленые человечки',
    'Yellow Submarine',
    'Оранжевое настроение',
    'Джокер',
    'Мариванна',
    'Тонкий Боб',
    'Чёрная вдова',
    'Белорусский ликёр',
    'Ржавый Фред',
    'Прачечная',
    'Желтый дом',
    'Оранжевый тюльпан'
  ])
  )

  const setTime = (hour) => {
    const HOUR = 60 * 60 * 1000
    const START_HOUR = 8

    const now = new Date()
    now.setHours(START_HOUR, 0, 0, 0)

    hour = hour - START_HOUR

    return new Date(now.getTime() + hour * HOUR)
  }

  let eventsPromise = models.Event.bulkCreate([
    {
      title: 'Архитектура Опустошителя',
      dateStart: setTime(8),
      dateEnd: setTime(8.5)
    },
    {
      title: 'Ежедневный стендапчик',
      dateStart: setTime(9),
      dateEnd: setTime(11)
    },
    {
      title: 'Поиск уязвимостей в имперских кодах',
      dateStart: setTime(10),
      dateEnd: setTime(12)
    },
    {
      title: 'Джедайская кухня',
      dateStart: setTime(13),
      dateEnd: setTime(14)
    },
    {
      title: 'Переписываем Millennium Falcon',
      dateStart: setTime(15),
      dateEnd: setTime(16.5)
    },
    {
      title: 'Рефакторинг Звезды Смерти',
      dateStart: setTime(15),
      dateEnd: setTime(17)
    },
    {
      title: 'Новая надежда',
      dateStart: setTime(13),
      dateEnd: setTime(14)
    },
    {
      title: 'Обсуждаем новый эпизод SW',
      dateStart: setTime(17),
      dateEnd: setTime(18)
    },
    {
      title: 'Вечеринка дроидов',
      dateStart: setTime(20),
      dateEnd: setTime(21)
    },
    {
      title: 'Пробуждение силы',
      dateStart: setTime(23),
      dateEnd: setTime(24)
    }
  ])

  Promise.all([usersPromise, roomsPromise, eventsPromise])
    .then(() => Promise.all([
      models.User.findAll(),
      models.Room.findAll(),
      models.Event.findAll()
    ]))
    .then(function ([users, rooms, events]) {
      let promises = []
      promises.push(events[0].setRoom(rooms[0]))
      promises.push(events[1].setRoom(rooms[1]))
      promises.push(events[2].setRoom(rooms[2]))
      promises.push(events[3].setRoom(rooms[3]))
      promises.push(events[4].setRoom(rooms[4]))
      promises.push(events[5].setRoom(rooms[5]))
      promises.push(events[6].setRoom(rooms[6]))
      promises.push(events[7].setRoom(rooms[7]))
      promises.push(events[8].setRoom(rooms[8]))
      promises.push(events[9].setRoom(rooms[9]))

      promises.push(events[0].setUsers([users[1], users[6], users[23]]))
      promises.push(events[1].setUsers([users[20], users[21]]))
      promises.push(events[2].setUsers([users[29], users[27]]))
      promises.push(events[3].setUsers([users[7], users[8], users[9]]))
      promises.push(events[4].setUsers([users[5], users[18]]))
      promises.push(events[5].setUsers([users[22], users[14], users[17]]))
      promises.push(events[6].setUsers([users[3], users[4], users[19], users[9]]))
      promises.push(events[7].setUsers([users[24], users[25], users[6], users[5]]))
      promises.push(events[8].setUsers([users[10], users[11], users[29]]))
      promises.push(events[9].setUsers([users[25], users[24], users[3]]))

      return Promise.all(promises)
    })
}

sequelize.sync()
  .then(createData)
