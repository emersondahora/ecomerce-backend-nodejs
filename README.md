# Ecomerce BackEnd - versão NodeJS

Backend em NodeJS/Rest de uma loja virtual, criado com base em um projeto realizado no curso "Curso Completo de PHP 7" da HCODER
e com o intuito de colocar em prática tecnologias, patterns e boas práticas de mercado.

## Tecnologias/Framework/Paterns/Conceitos utilizados

* DDD - Domain Driven Design
* TDD - Test Driven Development
* SOLID
* Rest
* Javascript
* Typescript
* NodeJS
* Express
* TypeORM
* Jest
* JWT

## Rotas Disponíveis:

### Cadastrando um novo usuário

`POST /users/`

#### Request

```typescript
    {
      "name": string,
      "email": string,
      "password": string,
      "password_confirmation": string,
      "is_admin": boolean
    }
```
#### Response


```typescript
    {
      "id": uuid,
      "name": string,
      "email": string,
      "password": string,
      "password_confirmation": string,
      "is_admin": boolean
      "created_at": date,
      "updated_at": date,
      "avatar_url": string
    }
```

### Autenticação

`POST /sessions/`

#### Request

```javascript
  {
    "email":string,
    "password": string
  }
```

#### Response

```javascript
{
  "user": {
    "id": uuid,
    "name": string,
    "email": string,
    "password": string,
    "password_confirmation": string,
    "is_admin": boolean
    "created_at": date,
    "updated_at": date,
    "avatar_url": string
  },
  "token": token
}
```


### Cadastrar Produtos (Sessão com usuário administrador requerida)

`POST /admin/products/`

#### Request

```javascript
{
  "name": string,
  "description": string,
  "price": number
}
```

#### Response

```javascript
{
  "id": uuid,
  "name": string,
  "description": string,
  "price": number,
  "created_at": date,
  "updated_at": date
}
```

### Atualizar Produtos (Sessão com usuário administrador requerida)

`PUT /admin/products/:product_id`

#### Request

```javascript
{
  "name": string,
  "description": string,
  "price": number
}
```

#### Response

```javascript
{
  "id": uuid,
  "name": string,
  "description": string,
  "price": number,
  "created_at": date,
  "updated_at": date
}
```

### Visualizar Produtos (Sessão com usuário administrador requerida)

`GET /admin/products/`

#### Response

```javascript
[{
  "id": uuid,
  "name": string,
  "description": string,
  "price": number,
  "created_at": date,
  "updated_at": date
}]
```

### Visualizar um Produto (Sessão com usuário administrador requerida)

`GET /admin/products/:product_id`

#### Response

{
  "id": uuid,
  "name": string,
  "description": string,
  "price": number,
  "created_at": date,
  "updated_at": date
}
