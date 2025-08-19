# App-backend
API backend de l'app ProxiMore

L'API connectée est connectée à une base de donnée hébergée avec l'outil Supabase.

## Utilisation via l'API hébergée en ligne
L'API est disponible grâce à un hébergement en ligne grâce à l'outil Render.

Les requetes sont listés ici : https://app-backend-jhpm.onrender.com/doc


## Utilisation via hébergement local l'API
1. Dans un terminal cloner le projet

2. Puis lancer ces 4 commandes pour mettre en place le code :
```
npm install
npm run build
npx prisma db pull
npx prisma generate 
```

3. Lancer l'API qui permet l'accès depuis l'url http://localhost:3000 :
```
npm run start
```