# FSW Foods

Este é um projeto de pedidos que segue a mesma logica do ifood onde é possivel realizar pedidos, favoritar restaurantes e realizar login com o Google. Projeto criado no evento **FullStack Week** do Felipe Rocha e sendo evoluido com novas funcionalidades por mim.


## Funcionalidades

- Realizar Pedidos
- Favoritar Restaurantes
- Repetir um pedido finalizado
- Visualizar Histórico de pedidos
- Login com o Google


## Tecnologias Utilizadas

- **Node.js**: Plataforma de servidor.
- **Prisma ORM**: ORM para interagir com o banco de dados NeonDB(Postgres).
- **NeonDB(Postgres)**: Banco de dados relacional.
- **Mermaid**: Para a visualização de diagramas.
- **NextJS**: Interface Visual(Front-End) com **Typescript**
- **TailwindCSS**: Para Estilização

## Estrutura do Projeto

A estrutura do banco de dados é composta pelos seguintes modelos:

- **User**: Representa um usuário do sistema.
- **Account**: Representa uma conta de autenticação de usuário.
- **Session**: Representa uma sessão de login de usuário.
- **VerificationToken**: Representa um token de verificação para autenticação de usuário.
- **Restaurant**: Representa um restaurante.
- **UserFavoriteRestaurant**: Representa a relação de um usuário com seus restaurantes favoritos.
- **Category**: Representa uma categoria de produtos.
- **Product**: Representa um produto de um restaurante.
- **OrderProduct**: Representa a relação entre um pedido e seus produtos.
- **Order**: Representa um pedido de um usuário.
- **OrderStatus**: Enumeração que representa o status de um pedido.




## Diagrama ER 
```mermaid
erDiagram
    Account {
        String id PK
        String userId FK
        String type
        String provider
        String providerAccountId
        String refresh_token
        String access_token
        Int expires_at
        String token_type
        String scope
        String id_token
        String session_state
    }
    
    Session {
        String id PK
        String sessionToken
        String userId FK
        DateTime expires
    }
    
    User {
        String id PK
        String name
        String email
        DateTime emailVerified
        String image
    }
    
    VerificationToken {
        String identifier
        String token
        DateTime expires
    }
    
    Restaurant {
        String id PK
        String name
        String imageUrl
        Decimal deliveryFee
        Int deliveryTimeMinutes
    }
    
    UserFavoriteRestaurant {
        String userId FK
        String restaurantId FK
        DateTime createdAt
    }
    
    Category {
        String id PK
        String name
        String imageUrl
        DateTime createdAt
    }
    
    Product {
        String id PK
        String name
        String description
        String imageUrl
        Decimal price
        Int discountPercentage
        String restaurantId FK
        String categoryId FK
        DateTime createdAt
    }
    
    OrderProduct {
        String id PK
        String orderId FK
        String productId FK
        Int quantity
    }
    
    Order {
        String id PK
        String userId FK
        String restaurantId FK
        Decimal deliveryFee
        Int deliveryTimeMinutes
        Decimal subtotalPrice
        Decimal totalPrice
        Decimal totalDiscounts
        DateTime createdAt
        OrderStatus status
    }
    
    Account ||--o{ User : "belongs to"
    Session ||--o{ User : "belongs to"
    User ||--o{ Account : "has many"
    User ||--o{ Session : "has many"
    User ||--o{ Order : "has many"
    User ||--o{ UserFavoriteRestaurant : "has many"
    UserFavoriteRestaurant }o--|| Restaurant : "belongs to"
    UserFavoriteRestaurant }o--|| User : "belongs to"
    Category ||--o{ Restaurant : "has many"
    Category ||--o{ Product : "has many"
    Product }o--|| Restaurant : "belongs to"
    Product }o--|| Category : "belongs to"
    Restaurant ||--o{ Order : "has many"
    Order }o--|| User : "belongs to"
    Order }o--|| Restaurant : "belongs to"
    OrderProduct }o--|| Order : "belongs to"
    OrderProduct }o--|| Product : "belongs to"

```


