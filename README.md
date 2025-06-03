# DailyStore Discord Bot

### Variables

- `BOT_TOKEN`  
  Discord bot token used for authentication.

- `POSTGRES_USER`  
  Username for the PostgreSQL database.

- `POSTGRES_PASSWORD`  
  Password for the PostgreSQL database.

- `DATABASE_URL`  
  Connection string for the PostgreSQL database, used by Prisma and the application.

### Example

```env
BOT_TOKEN="your-discord-bot-token"
POSTGRES_USER=root
POSTGRES_PASSWORD=root
DATABASE_URL="postgresql://root:root@localhost:5432/dailystore?schema=public"
```
