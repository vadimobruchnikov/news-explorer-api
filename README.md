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

Новые ссылки (возможно ДНС уже обновится)
## Ссылка на frontend [http://cloudsnews.ru]
## Ссылка на backend(api)  [http://api.cloudsnews.ru]
## IP нового сервера 45.67.57.229
HTTPS сертификат нельзя сразу выпускать(так сказал регистратор)
возможно его можно выпустить завтра.

Старые ссылки (если не обновится ДНС, то должен быть доступен по ним)
## Ссылка на frontend [https://fortuns.ml]
## Ссылка на backend(api)  [https://api.fortuns.ml]

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

На сервере желательно установить глобальный модуль PM2
>`sudo npm install pm2 -g`
>`pm2 start app.js`
>`pm2 startup`

## Как запустить приложение

команда
>`npm run start` запускает сервер на `localhost:3000`

команда
>`npm run dev` запускает сервер на `localhost:3000` с хот релоудом;

## Краткое описание API


#Регистрация нового пользователя

>`GET localhost:3000/signup`

Входящие данные JSON { email, password }

В ответ получаем JSON { data: объект созданного пользователя }


#Авторизация пользователя

>`GET localhost:3000/signup`

Входящие данные JSON { email, password }

В ответ получаем JSON { data: объект созданного пользователя }


#Сброс авторизации пользователя

>`GET localhost:3000/signout`

В ответ получаем JSON { message: Сообщение о статусе выхода }


#Получение текущего пользователя

>`GET localhost:3000/users/me`

В ответ получаем JSON { data: объект текущего пользователя }


#Получение всех статей

>`GET localhost:3000/articles`

В ответ получаем JSON { data: массив объектов карточек новостей }


#Запись статьи в базу

>`POST localhost:3000/articles`

Входящие данные JSON { keyword, title, text, date, source, link, image }

В ответ получаем JSON { data: объект добавленной карточки }


#Удаление статьи из базы

>`DELETE localhost:3000/articles/articleId`

Входящие данные articleId - id объекта mongodb

В ответ получаем JSON { data: объект удаленной карточки }


## ШПАРГАЛКА ## Частоиспользуемые команды Linux

`sudo systemctl start nginx` запуск nginx

`sudo nano /etc/nginx/sites-enabled/default` редактирование конфига nginx

`sudo systemctl restart nginx` перезапуск nginx

`pm2 restart app` перезапуск nodejs

`sudo certbot renew --pre-hook "service nginx stop" --post-hook "service nginx start"` обновление сертификата

`sudo apt-get install mc` установить mc)

`brew install mc` под  macos

`run 'select-editor'` выбор редактора


