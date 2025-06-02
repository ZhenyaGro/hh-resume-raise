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
HH_CLIENT_ID=ваш_client_id
HH_CLIENT_SECRET=ваш_client_secret
HH_REDIRECT_URI=http://localhost:3000/callback
HH_AUTHORIZATION_CODE=полученный_code_один_раз
```

🔐 HH_AUTHORIZATION_CODE нужен только для первичной авторизации. После получения токенов он больше не требуется.

## Команды

### Получение токенов

```bash
npm run auth
```

### 🔁 Автоматическое поднятие резюме

```bash
npm start
```

## 📝 Примечания

⚠️ authorization_code - одноразовый, его нельзя использовать повторно.

🎯 API hh.ru позволяет поднимать резюме не чаще чем раз в 4 часа.
