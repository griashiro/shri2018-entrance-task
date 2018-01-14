<img width="800" alt="переговорки" src="https://user-images.githubusercontent.com/30614068/35501411-de6818cc-04ea-11e8-8a1e-5a594e4be443.png">

# ШРИ 2018. Задание №1: Поиск ошибок.

Привет, Яндекс! Здесь первое задание. **[Задание №2](https://github.com/griashiro/shri2018/tree/task2)** и **[Задание №3](https://github.com/griashiro/shri2018/tree/task3)** в этом же репозитории в отдельных ветках.

## Запуск

Перед запуском надо убедиться, что 3000 порт свободен. 

Запуск сервера на [localhost:3000](http://localhost:3000): 
	
	git clone -b task1 https://github.com/griashiro/shri2018 task1
    cd task1 && npm i && npm run reset-db && npm run dev

Чтобы перейти в GraphQL IDE можно щелкнуть на логотип на стартовой странице или перейти на [/graphql](http://localhost:3000/graphql/)

Для сброса данных в базе:

	npm run reset-db

Запуск тестов: 
	
	npm run test

Запуск ESLint:

	npm run lint

## Поиск ошибок

Мое предположение подтвердила документация Sequelize. В конструкторе отсутствовал первый аргумент - имя базы данных. Избежать таких досадных ошибок поможет TypeScript.

GraphQL успешно работал на /graph**g**l. Добавил [тест](https://github.com/griashiro/shri2018/blob/task1/tests/index.spec.js), чтобы такие ошибки не повторялись.

Время протестировать API.

Изучаю схему данных, делаю запросы... Ага! Нашел. Сейчас починим. Читаю документацию Sequalize и правлю `resolvers/query.js`. Убираю костыль из определения базы: `operatorsAliases: { $and: Op.and }`. Добавляю `return` в `resolvers/index.js`, чтобы GraphQL отдавал вложенные объекты в Event.

Часть полей в схеме отмечены как необязательные. Надо поправить. Кроме того, `UserRoom` и `SearchResult` нигде не используются, поэтому удаляю и навожу порядок в `typeDefs.js`. Если кода больше чем на экран, рефакторинг будет кстати. Делаю схему модульной, разбиваю на несколько файлов.

Возвращаюсь к тестированию API. Исправляю ошибку в `changeEventRoom`, добавляю функцию `addUserToEvent`.

API Готово. Что можно улучшить?

- Включаю поддержку CORS в Express. 

- Убираю лишний код из определения схемы БД.

- Меняю структуру проекта, чтобы она больше соответствовала MVC.

- Добавляю стартовую страницу с анимацией.

- Подключаю ESLint. Обычно, стиль кода задается первым коммитом, но я решаю перевести проект на [JavaScript Standard Style](https://standardjs.com/).

- Добавляю новые данные по мотивам Star Wars в `create-mock-data.js`. Кстати, в исходных данных была ошибка - одна из встреч заканчивалась раньше, чем начиналась.

## Выводы

### Что сделано хорошо?
Нашел и исправил ошибки, добавил реализацию недостающей функциональности, убрал избыточный код и навел порядок в проекте.

### Что можно сделать еще лучше?
Было бы неплохо переработать API:

- Добавить минимальную и максимальную вместимость переговорок и полные имена пользователей, чтобы данные больше соответствовали макету.

- Добавить пагинацию для дат. Сейчас все встречи берутся одним запросом. А если их тысячи? Было бы лучше получать информацию только для текущего дня.

- Поиск пользователей и подбор рекомендаций тоже лучше перенести на сторону бэкенда.

- Объединить `updateEvent`, `addUserToEvent`, `removeUserFromEvent`, `changeEventRoom` в один запрос. Если несколько агентов попробуют одновременно поменять одну и туже встречу - это может нарушить согласованность данных.

Кроме того, было бы здорово добавить кэширование запросов и функциональные тесты GraphQL API.
