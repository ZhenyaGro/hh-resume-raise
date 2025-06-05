# 📄 HeadHunter Resume Raise

Автоматическое поднятие резюме на [hh.ru](https://hh.ru) с помощью API, [документация hh api](https://api.hh.ru/openapi/redoc).  
Поддерживается авторизация, обновление access токена, поднятие резюме.

---

## 🚀 Возможности

- Авторизация через OAuth2 с получением `access_token` и `refresh_token`
- Автоматическое обновление токенов при истечении срока действия
- Поднятие резюме, если это разрешено (по `can_publish_or_update`)

---

## 🛠️ Установка

```bash
git clone https://github.com/zhenyagro/hh-resume-raise.git
cd hh-resume-raise
npm install
```

## ⚙️ Настройка

Создайте .env файл в корне проекта со следующим содержимым:

```env
# Данные с https://dev.hh.ru/admin
HH_CLIENT_ID=ваш_client_id
HH_CLIENT_SECRET=ваш_client_secret
HH_REDIRECT_URI=http://localhost:3000/callback
HH_AUTHORIZATION_CODE=полученный_code_один_раз
```

Для получения кода нужно перейти по url (вставьте свои HH_CLIENT_ID и HH_REDIRECT_URI):

https://hh.ru/oauth/authorize?response_type=code&client_id=HH_CLIENT_ID&redirect_uri=HH_REDIRECT_URI

После авторизации вы будете перенаправлены на указанный redirect_uri с параметром code в URL
После получения кода, его нужно вставить в переменную HH_AUTHORIZATION_CODE.

🔐 HH_AUTHORIZATION_CODE нужен только для первичной авторизации. После получения токенов он больше не требуется.

Для получения токена нужно сделать POST запрос на https://hh.ru/oauth/token
с параметрами:

- client_id: ваш HH_CLIENT_ID
- client_secret: ваш HH_CLIENT_SECRET
- code: ваш HH_AUTHORIZATION_CODE
- redirect_uri: ваш HH_REDIRECT_URI
  После успешного запроса вы получите access_token, который нужно вставить в переменную ниже
  HH_ACCESS_TOKEN

## Запуск

```bash
npm start
```

## 📝 Примечания

⚠️ authorization_code - одноразовый, его нельзя использовать повторно.

🎯 API hh.ru позволяет поднимать резюме не чаще чем раз в 4 часа.
