Chat API – Sistema de Chat em Tempo Real
=====================================================

Apresentação em Vídeo
---------------------
Link: https://drive.google.com/file/d/1ZCsZrCvt-kW2PQEvzX83H0_5afTSpOed/view?usp=drive_link

O vídeo (5–10 min) apresenta:
- Funcionalidades implementadas
- Desafios e soluções
- Aprendizados

Visão Geral
-----------
Este projeto implementa uma API RESTful para um sistema de chat em tempo real, desenvolvida com NestJS, TypeScript e MySQL.
A aplicação permite comunicação instantânea entre usuários, criação de salas, autenticação JWT e envio de mensagens em tempo real via WebSocket.

Funcionalidades
---------------
- Gerenciamento de Usuários: cadastro, login e autenticação JWT.
- Gerenciamento de Salas: criação, entrada, saída e exclusão de salas.
- Mensagens: envio e recebimento em tempo real com histórico persistido.
- Segurança: autenticação JWT e controle de permissões.

Arquitetura
-----------
Estrutura modular com controllers, services e gateways.
Diretórios principais:
- usuario.controller.ts
- sala.controller.ts
- mensagem.controller.ts
- mensagem.gateway.ts

Tecnologias
-----------
- TypeScript
- NestJS
- MySQL
- TypeORM
- WebSocket
- Socket.IO
- JWT
- Swagger

Instalação e Execução
---------------------
Pré-requisitos:
- Node.js v18+
- MySQL
- NPM ou Yarn

Passos:
1. Clone o repositório:
   git clone https://github.com/Vitorlima841/Sistema-de-chat.git
   cd Sistema-de-chat

2. Instale as dependências:
   npm install

3. Configure o banco MySQL:
   CREATE DATABASE SistemaDeChat;

4. Crie o arquivo .env:
   PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=sua_senha
   DB_DATABASE=SistemaDeChat

5. Execute as migrações:
   npm run typeorm migration:run

6. Inicie o servidor:
   npm run start:dev

Endpoints Principais
--------------------
Usuários:
- POST /usuarios
- POST /usuarios/login
- GET /usuarios/:id
- GET /usuarios

Salas:
- POST /salas
- GET /salas
- POST /salas/:id/entrar
- POST /salas/:id/sair
- DELETE /salas/:id

Mensagens:
- POST /mensagens
- GET /mensagens/:salaId

Comunicação em Tempo Real
--------------------------
Implementada com Socket.IO em mensagem.gateway.ts
Eventos:
- Envia uma mensagem para uma sala de chat
- Envia uma mensagem direta a outro usuário

Documentação Swagger
--------------------
Disponível em:
http://localhost:3000/


Equipe
------
- Integrante 1 – Vitor Augusto da Fonseca Lima
- Integrante 2 - Rammid Andrew Barreto da silva
