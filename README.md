# News Explorer (API)

## v0.0.1

## Ссылка на проект [https://vadimobruchnikov.github.io/news-explorer-api.github.io/index.html]

Финальный проект Яндекс-Практикума(дипломная работа).
Проект должен показать знания студента по всему курсу Вэб-разработчик.
В данном проекте реализован Backend проекта.
Frontend для этого проекта можно найти на следующем репозитории

## Ссылка на проект [https://vadimobruchnikov.github.io/news-explorer-front.github.io/index.html]

В проекте были использованы следующие технологии:
Front-End: HTML5 + CSS + JS(ES6, REST API, AJAX, JSON) + Babel + Webpack + NPM
Back-End: VPS Linux + NodeJS + MongoDB + JS(ES6) + NPM + HTTPS(SSL Certificate)

## Ссылка на сервер [https://fortuns.ml]
## Ссылка на сервер [http://84.201.153.53]

## Ссылка на репозиторий [https://vadimobruchnikov.github.io/news-explorer-api.github.io/index.html]


1. Пул-реквест [https://github.com/vadimobruchnikov/news-explorer-api.github.io/pull/1]


## Для развертывания проекта установите следующие пакеты:

Саму библиотеку подсистем NPM
Скачать ее можно с официального сайта[https://nodejs.org/en/download/]

## После установки всех пакетов проделайте следующее

Склонируйте гит-репозиторий
>`git clone git@github.com:vadimobruchnikov/news-explorer-api.github.io.git`

Установите npm-зависимости
>`npm install`

Установите MongoDB
>`brew tap mongodb/brew`
>`brew install mongodb-community@4.2`
Или воспользуйтесь официальной инструкцией[https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/]

Запуск МонгоДБ (для MacOS)
>`brew services start mongodb-community`

Создайте базу
>`mongo`
>`>use news-explorer`
>`>db.createCollection("articles")`
>`>db.createCollection("users")`

## Как запустить приложение

команда
>`npm run start` запускает сервер на `localhost:3000`

команда
>`npm run dev` запускает сервер на `localhost:3000` с хот релоудом;

## Краткое описание API
в ответ на запрос `GET localhost:3000/users` сервер вернёт JSON-объект из БД;

в ответ на запрос `GET localhost:3000/users/8340d0ec33270a25f2413b69`, сервер вернёт JSON-объект пользователя с переданным после /users идентификатором;

если пользователя с запрошенным идентификатором нет, API должен возвращать 404 статус ответа и `JSON: { "message": "Нет пользователя с таким id" };`

в ответ на запрос `GET localhost:3000/articles` сервер вернёт JSON-объект из БД;

при запросе на несуществующий адрес, API должен возвращать 404 статус ответа и `JSON: { "message": "Запрашиваемый ресурс не найден" }`.

## ШПАРГАЛКА ## Частоиспользуемые команды Linux

`sudo systemctl start nginx` запуск nginx

`sudo nano /etc/nginx/sites-enabled/default` редактирование конфига nginx

`sudo systemctl restart nginx` перезапуск nginx

`pm2 restart app` перезапуск nodejs

`sudo certbot renew --pre-hook "service nginx stop" --post-hook "service nginx start"` обновление сертификата

`sudo apt-get install mc` установить mc)
`brew install mc` под  macos

`run 'select-editor'` выбор редактора
