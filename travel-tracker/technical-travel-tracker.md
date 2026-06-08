# Especificação Técnica

> **Tipo de documento:** Spec Técnica  
> **Status:** `rascunho` | `revisão` | `aprovado` | `descontinuado`  
> **Versão:** 0.1.0  
> **Última atualização:** 2026-06-04
> **Tech Lead:** Jose Julio
> **Spec de Produto vinculada:** product-travel-tracker.md (./product-travel-tracker.md)  
> **Plataforma:** `Android`
> **Linguagem / Framework:** Kotlin / Jetpack Compose

---

## 1. Visão Geral da Arquitetura

### 1.1 Padrão Arquitetural

<!-- ex.: MVVM, MVI, Clean Architecture, TCA, VIPER, Composable Architecture -->

**Padrão:** MVVM — Model-View-ViewModel

**Justificativa:**  
O padrão arquitetural escolhido para o aplicativo será o **MVVM**, por ser amplamente utilizado no desenvolvimento de aplicativos Android e por oferecer uma boa separação de responsabilidades entre interface, regras de apresentação e dados.

Esse padrão facilita a organização do projeto, melhora a manutenção do código e torna o desenvolvimento mais previsível, principalmente em aplicativos que possuem telas com formulários, listas, estados de carregamento, mapas, autenticação e sincronização de dados.

No contexto deste produto, o MVVM é adequado porque permite que as telas do aplicativo sejam responsáveis apenas pela exibição das informações e interação com o usuário, enquanto as regras de apresentação, validações, estados da tela e comunicação com as camadas de dados ficam concentradas no ViewModel.

Além disso, o MVVM possui boa aderência às práticas modernas do Android, sendo compatível com componentes como ViewModel, LiveData, StateFlow, Coroutines e bibliotecas de persistência local. Isso torna sua implementação mais simples, padronizada e alinhada com aplicações Android utilizadas no mercado.

#### Benefícios Esperados

- Melhor separação entre interface e regras de apresentação.
- Facilidade para manter e evoluir o aplicativo.
- Melhor organização das telas e seus estados.
- Facilidade para trabalhar com carregamento, erro, sucesso e dados vazios.
- Maior testabilidade das regras de apresentação.
- Boa compatibilidade com recursos modernos do Android.
- Curva de aprendizado menor para desenvolvedores Android.

#### Aplicação no Produto

O MVVM deverá ser aplicado nas principais áreas do aplicativo, como:

- Login e autenticação.
- Cadastro de usuário.
- Recuperação de senha.
- Listagem de minhas viagens.
- Listagem de viagens acompanhadas.
- Cadastro e edição de viagem.
- Gerenciamento de convites.
- Exibição do mapa.
- Captura e sincronização de coordenadas.

### 1.2 Diagrama de Componentes (Alto Nível)

<!-- Diagrama ASCII ou Mermaid mostrando as camadas principais e seus relacionamentos. -->

O diagrama proposto está correto como visão inicial, porém pode ser ajustado para representar melhor a arquitetura do aplicativo Android com **MVVM**, separação de responsabilidades, uso de API remota e base local para cache/sincronização das coordenadas.

A estrutura recomendada é:

```text
┌────────────────────────────────────────────────────────────┐
│                   Camada de Apresentação                   │
│                                                            │
│  Activities / Fragments / Composables / Views              │
│  ViewModels                                                │
│  Estados de Tela / Eventos de UI                           │
└───────────────────────────────┬────────────────────────────┘
                                │
                                ▼
┌────────────────────────────────────────────────────────────┐
│                      Camada de Domínio                     │
│                                                            │
│  Casos de Uso                                              │
│  Regras de Negócio                                         │
│  Entidades de Domínio                                      │
│                                                            │
│  Exemplos:                                                 │
│  - Autenticar usuário                                      │
│  - Cadastrar viagem                                        │
│  - Ativar viagem                                           │
│  - Enviar convite                                          │
│  - Aceitar convite                                         │
│  - Registrar coordenada                                    │
│  - Sincronizar coordenadas                                 │
└───────────────────────────────┬────────────────────────────┘
                                │
                                ▼
┌────────────────────────────────────────────────────────────┐
│                       Camada de Dados                      │
│                                                            │
│  Repositórios                                              │
│  Mapeadores                                                │
│  Fontes de Dados Remotas                                   │
│  Fontes de Dados Locais                                    │
└───────────────┬──────────────────────────────┬─────────────┘
                │                              │
                ▼                              ▼
┌──────────────────────────────┐   ┌─────────────────────────┐
│        Fonte Remota          │   │       Fonte Local       │
│                              │   │                         │
│  Cliente HTTP / API REST     │   │  Banco local do app     │
│  Endpoints de autenticação   │   │  Cache de sessão        │
│  Endpoints de viagens        │   │  Cache de viagens       │
│  Endpoints de convites       │   │  Coordenadas pendente   │
│  Endpoints de coordenadas    │   │  Dados sincronizados    │
└──────────────────────────────┘   └─────────────────────────┘
```

### 1.3 Estrutura de Módulos / Pacotes
<!-- Liste os módulos/targets de nível superior e suas responsabilidades. -->

| Módulo | Responsabilidade |
|--------|-----------------|
| `App` | Ponto de entrada, raiz de DI, host de navegação |
| `Features/[NomeDaFeature]` | Fatia vertical autocontida por feature |
| `Core/Network` | Cliente de API, interceptores, autenticação |
| `Core/Persistence` | Banco de dados local, armazenamento de arquivos |
| `Core/Analytics` | Abstração de rastreamento de eventos |
| `DesignSystem` | Componentes de UI reutilizáveis, tokens de tema |
| `SharedDomain` | Entidades compartilhadas, protocolos/interfaces |

---

## 2. Plataforma e Ambiente

### 2.1 Versões Mínimas de SO
| Plataforma | Versão Mínima | Justificativa |
|------------|---------------|---------------|
| Android | API 30 | |

### 2.2 Dispositivos-Alvo
<!-- Fatores de forma, tamanhos de tela e orientações suportadas. -->

| Fator de forma | Suportado | Observações |
|----------------|-----------|-------------|
| Celular (retrato) | ✅ | Principal |
| Tablet | ⬜ | Opcional |

### 2.3 Ambientes de Build
| Ambiente | Finalidade | URL Base / Configuração |
|----------|------------|-------------------------|
| `desenvolvimento` | Dev local + QA | |
| `homologação` | Validação pré-lançamento | |
| `produção` | Usuários em produção | |

---

## 3. Gerenciamento de Dependências

### 3.1 Dependências de Terceiros
<!-- Liste apenas bibliotecas externas. Módulos internos ficam na seção 1.3. -->

| Biblioteca | Versão | Finalidade | Licença |
|------------|--------|------------|---------|
| WorkManager | A definir | Execução de tarefas agendadas complementares, como reprocessamento de coordenadas pendentes após reconexão com a internet. Não deve ser usado para captura ou envio de coordenadas nos intervalos de 10 e 60 segundos, pois o intervalo mínimo do `PeriodicWorkRequest` é de 15 minutos. | Apache 2.0 |
| MapLibre Native Android | A definir | Exibição de mapa no aplicativo, marcadores, pontos e trajetos da viagem. | BSD 2-Clause |
| OpenStreetMap | Não aplicável | Fonte gratuita de dados cartográficos para exibição de mapas. | ODbL |

> **Componente obrigatório — Foreground Service (nativo Android):** A captura de coordenadas a cada 10 segundos e o envio ao endpoint a cada 60 segundos devem ser implementados por meio de um **Foreground Service** com `foregroundServiceType="location"`. Esse é o único mecanismo do Android que garante execução contínua em background com o app fechado ou em segundo plano, dentro das restrições da plataforma. O serviço deve exibir uma notificação persistente enquanto estiver ativo, conforme exigido pelo Android. Deve ser iniciado ao ativar a viagem e encerrado ao inativar, finalizar ou cancelar.

---

### Recomendação para Mapa Gratuito

Para este projeto, a opção mais adequada é usar **MapLibre Native Android** com dados/base cartográfica do **OpenStreetMap**.

O **MapLibre Native Android** é uma biblioteca open source para exibir mapas em aplicativos Android e é distribuída sob licença **BSD 2-Clause**. Ela permite renderizar mapas, marcadores, linhas e pontos, sendo adequada para exibir as coordenadas das viagens no aplicativo. :contentReference[oaicite:0]{index=0}

O **OpenStreetMap** pode ser usado como base de dados cartográfica aberta. Porém, é importante observar que o OpenStreetMap é a base de dados do mapa, não necessariamente um serviço ilimitado de tiles gratuito para alto volume. Para produção, pode ser necessário usar um provedor de tiles compatível com OpenStreetMap ou hospedar seus próprios tiles. :contentReference[oaicite:1]{index=1}

Não recomendo usar **osmdroid** como primeira opção neste projeto, porque o repositório oficial informa que o projeto está arquivado e não receberá novas atualizações ou releases. :contentReference[oaicite:2]{index=2}

---

### 3.2 Restrições de Dependências
<!-- Restrições: sem GPL, deve suportar Xcode N+, deve compilar para ARM64, etc. -->

---

## 4. Mapeamento de Requisitos de Features

<!-- Relacione cada agrupamento funcional da Spec de Produto ao seu escopo de implementação técnica. -->

| Feature | Requisito / Escopo Funcional | Solução Técnica (resumo) | Spec de Feature |
|---------|------------------------------|---------------------------|-----------------|
| FEAT-01 | Autenticação e sessão do usuário | Implementar login por e-mail e senha, validação de sessão existente, armazenamento seguro de `accessToken` e `refreshToken`, renovação de sessão quando aplicável e redirecionamento automático para login ou tela principal. | [FEATURE-authentication.md](./features/FEATURE-authentication.md) |
| FEAT-02 | Cadastro de novo usuário | Implementar cadastro de usuário com validação de nome completo, e-mail único e senha forte. Após cadastro com sucesso, retornar para a tela de login. | [FEATURE-user-registration.md](./features/FEATURE-user-registration.md) |
| FEAT-03 | Recuperação e alteração de senha | Implementar fluxo de recuperação de senha por e-mail, envio do e-mail para API, recebimento e validação do token, definição de nova senha e retorno para login após sucesso. | [FEATURE-password-recovery.md](./features/FEATURE-password-recovery.md) |
| FEAT-04 | Tela principal e navegação por abas | Implementar tela principal com abas para **Minhas Viagens** e **Viagens Acompanhadas**, respeitando sessão ativa, carregamento inicial e navegação para detalhes, mapa, perfil e ações principais. | [FEATURE-home-navigation.md](./features/FEATURE-home-navigation.md) |
| FEAT-05 | Perfil do usuário | Implementar visualização e alteração dos dados do usuário logado, mantendo o e-mail em modo somente leitura e validando os dados antes de salvar. | [FEATURE-user-profile.md](./features/FEATURE-user-profile.md) |
| FEAT-06 | Minhas viagens | Implementar listagem das viagens criadas pelo usuário logado, filtro por status, visualização de detalhes e persistência local temporária das viagens vinculadas ao usuário. | [FEATURE-my-trips.md](./features/FEATURE-my-trips.md) |
| FEAT-07 | Cadastro de viagem | Implementar criação de nova viagem, validação dos dados obrigatórios, envio para API, retorno para lista de viagens e criação com status inicial `pendente`. | [FEATURE-trip-create.md](./features/FEATURE-trip-create.md) |
| FEAT-08 | Alteração de dados da viagem | Implementar edição de viagem cadastrada, validação dos campos, envio das alterações para API e atualização da lista local após sucesso. | [FEATURE-trip-update.md](./features/FEATURE-trip-update.md) |
| FEAT-09 | Exclusão de viagem | Implementar exclusão de viagem permitida, confirmação antes da ação, envio da solicitação para API e atualização da lista após sucesso. | [FEATURE-trip-delete.md](./features/FEATURE-trip-delete.md) |
| FEAT-10 | Ativação de viagem | Implementar ativação de uma viagem, alteração do status para `ativa`, salvamento da viagem ativa em cache local e início da captura de coordenadas. | [FEATURE-trip-activate.md](./features/FEATURE-trip-activate.md) |
| FEAT-11 | Inativação / pausa da viagem | Implementar inativação de viagem ativa, confirmação da ação, alteração do status para `inativa` e interrupção da captura de novas coordenadas. | [FEATURE-trip-inactivate.md](./features/FEATURE-trip-inactivate.md) |
| FEAT-12 | Cancelamento de viagem | Implementar cancelamento de viagem, confirmação da ação, alteração do status para `cancelada`, interrupção da captura de coordenadas quando aplicável e atualização da lista. | [FEATURE-trip-cancel.md](./features/FEATURE-trip-cancel.md) |
| FEAT-13 | Captura local de coordenadas | Implementar captura de localização durante viagem ativa por meio de um Foreground Service com `foregroundServiceType="location"`, salvando localmente uma coordenada a cada 10 segundos com `coordenadaID`, `viagemID`, data/hora, latitude, longitude e altitude. O serviço deve continuar em execução mesmo com o aplicativo fechado ou em segundo plano, enquanto a viagem permanecer ativa. | [FEATURE-location-capture.md](./features/FEATURE-location-capture.md) |
| FEAT-14 | Sincronização de coordenadas | Implementar envio das coordenadas pendentes para API a cada 60 segundos quando houver internet, dentro do mesmo Foreground Service responsável pela captura, garantindo execução contínua independente do estado do app. Remover localmente após envio com sucesso e manter em caso de falha. | [FEATURE-location-sync.md](./features/FEATURE-location-sync.md) |
| FEAT-15 | Convites de acompanhamento | Implementar envio de convite por e-mail para acompanhamento de viagem, validação dos e-mails, envio para API e exibição de sucesso ou falha. | [FEATURE-trip-invitations.md](./features/FEATURE-trip-invitations.md) |
| FEAT-16 | Viagens acompanhadas | Implementar listagem das viagens acompanhadas, convites pendentes, filtro por status, visualização somente leitura dos dados da viagem e persistência local temporária. | [FEATURE-followed-trips.md](./features/FEATURE-followed-trips.md) |
| FEAT-17 | Aceite e rejeição de convites | Implementar aceite e rejeição de convites recebidos, confirmação quando necessário, envio da resposta para API e atualização da lista de viagens acompanhadas. | [FEATURE-invitation-response.md](./features/FEATURE-invitation-response.md) |
| FEAT-18 | Remoção de viagem acompanhada | Implementar remoção de uma viagem aceita da lista de acompanhamento do usuário, com confirmação, envio para API e atualização da lista local. | [FEATURE-followed-trip-remove.md](./features/FEATURE-followed-trip-remove.md) |
| FEAT-19 | Mapa da viagem | Implementar tela de mapa para exibir coordenadas da viagem acompanhada ou viagem própria, destacando os pontos registrados e a última localização conhecida. | [FEATURE-trip-map.md](./features/FEATURE-trip-map.md) |
| FEAT-20 | Atualização do mapa | Implementar atualização manual ou periódica das coordenadas exibidas no mapa, buscando novos pontos na API e tratando ausência de novas coordenadas. | [FEATURE-map-refresh.md](./features/FEATURE-map-refresh.md) |
| FEAT-21 | Logout e limpeza de dados locais | Implementar encerramento de sessão, remoção dos tokens seguros e limpeza dos dados locais temporários do usuário logado, incluindo viagens, viagens acompanhadas, convites, viagem ativa em cache e coordenadas pendentes. | [FEATURE-logout-local-cleanup.md](./features/FEATURE-logout-local-cleanup.md) |
| FEAT-22 | Permissões de localização | Implementar solicitação contextual de permissão de localização, tratamento de permissão negada, localização desativada e bloqueio da ativação de viagem quando a permissão necessária não estiver disponível. | [FEATURE-location-permissions.md](./features/FEATURE-location-permissions.md) |
| FEAT-23 | Estados, mensagens e feedback ao usuário | Implementar estados de carregamento, sucesso, erro, vazio, sem conexão, dados locais, dados desatualizados e ações indisponíveis conforme status da viagem ou convite. | [FEATURE-ui-feedback-states.md](./features/FEATURE-ui-feedback-states.md) |

---

## 5. Arquitetura de Navegação

### 5.1 Padrão de Navegação
<!-- Pilha, tab-bar, coordinator, estratégia de tratamento de deep links. -->

Nao havera deeplinks

### 5.2 Esquema de Deep Links
| Intenção | Padrão de URL | Destino |
|----------|---------------|---------|

### 5.3 Mapa de Navegação (simplificado)

```text
App
├── Splash
│   ├── Sessão válida
│   │   └── Tela principal
│   └── Sessão inválida ou inexistente
│       └── Login
│           ├── Cadastrar usuário
│           └── Recuperar senha
│               └── Nova senha
│
└── Tela principal
    ├── Minhas viagens
    │   ├── Cadastrar viagem
    │   ├── Visualizar dados da viagem
    │   │   ├── Alterar dados da viagem
    │   │   ├── Ativar viagem
    │   │   ├── Inativar / finalizar viagem
    │   │   ├── Cancelar viagem
    │   │   ├── Excluir viagem
    │   │   ├── Enviar convite
    │   │   ├── Visualizar convites da viagem
    │   │   └── Visualizar mapa
    │   └── Filtrar minhas viagens por status
    │
    ├── Viagens acompanhadas
    │   ├── Visualizar dados da viagem
    │   │   ├── Aceitar convite
    │   │   └── Rejeitar convite
    │   ├── Visualizar dados da viagem acompanhada
    │   │   ├── Visualizar mapa
    │   │   ├── Remover acompanhamento
    │   │   ├── Aceitar convite
    │   │   └── Rejeitar convite
    │   └── Filtrar viagens acompanhadas por status
    │
    └── Perfil / Configurações
        ├── Alterar dados do usuário
        └── Sair da conta

```

---

## 6. Rede (Networking)

### 6.1 Contrato de API
| Endpoint | Método | Auth | Corpo da requisição | Resposta | Códigos de erro |
|----------|--------|------|---------------------|----------|-----------------|
| `/auth/register` | POST |  | `RegisterRequest` | `RegisterResponse` | 422 |
| `/auth/login` | POST |  | `LoginRequest` | `LoginResponse` | 422 |
| `/auth/refresh` | POST |  |  | `RefreshResponse` | 422 |
| `/auth/recover-password` | POST |  | `RecoverPasswordRequest` | `RecoverPasswordResponse` | 422 |
| `/auth/update-password` | POST |  | `UpdatePasswordRequest` | `UpdatePasswordResponse` | 422 |
| `/trips` | GET | Bearer |  | `TripListResponse` | 401, 422 |
| `/trips` | POST | Bearer | `TripRequest` | `TripResponse` | 401, 422 |
| `/trips/all-user-trips/complete` | GET | Bearer |  | `TripCompleteResponse` | 401, 422 |
| `/trips/{trip_id}` | GET | Bearer |  | `TripResponse` | 401, 422 |
| `/trips/{trip_id}` | PATCH | Bearer | `TripRequest` | `TripResponse` | 401, 422 |
| `/trips/{trip_id}/status` | PATCH | Bearer | `TripStatusRequest` | `TripResponse` | 401, 422 |
| `/trips/{trip_id}/locations` | POST | Bearer | `LocationRequest` | `LocationResponse` | 401, 422 |
| `/tracking` | GET | Bearer |  | `TrackingListResponse` | 401, 422 |
| `/tracking` | POST | Bearer | `TrackingInviteRequest` | `TrackingInviteResponse` | 401, 422 |
| `/tracking/{trip_id}/accept` | PUT | Bearer |  | `TrackingAcceptResponse` | 401, 422 |
| `/tracking/{trip_id}/locations` | GET | Bearer |  | `TrackingLocationResponse` | 401, 422 |
| `/health` | GET | Bearer |  |  | 422 |

#### `RegisterRequest`

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

#### `RegisterResponse`

```json
{
  "user_id": "string",
  "name": "string",
  "email": "string",
  "created_at": "2026-06-07T19:30:00Z"
}
```

#### `LoginRequest`

```json
{
  "email": "string",
  "password": "string"
}
```

#### `LoginResponse`

```json
{
  "access_token": "string",
  "refresh_token": "string",
  "token_type": "bearer"
}
```

#### `RefreshResponse`

```json
{
  "access_token": "string",
  "token_type": "bearer"
}
```

#### `RecoverPasswordRequest`

```json
{
  "email": "string"
}
```

#### `RecoverPasswordResponse`

```json
{
  "token": "string",
  "message": "string"
}
```

#### `UpdatePasswordRequest`

```json
{
  "email": "string",
  "new_password": "string"
}
```

#### `UpdatePasswordResponse`

```json
{
  "message": "string"
}
```

#### `TripListResponse`

```json
[
  {
    "id": "string",
    "user_id": "string",
    "description": "string",
    "vehicle": "string",
    "start_date": "2026-06-08T00:02:08.340Z",
    "end_date": "2026-06-08T00:02:08.340Z",
    "status": "string",
    "created_at": "2026-06-08T00:02:08.340Z"
  }
]
```

#### `TripRequest`

```json
{
  "description": "string",
  "vehicle": "string",
  "start_date": "2026-06-08T00:03:07.278Z",
  "end_date": "2026-06-08T00:03:07.278Z"
}
```

#### `TripResponse`

```json
{
  "id": "string",
  "user_id": "string",
  "description": "string",
  "vehicle": "string",
  "start_date": "2026-06-08T00:03:07.306Z",
  "end_date": "2026-06-08T00:03:07.306Z",
  "status": "string",
  "created_at": "2026-06-08T00:03:07.306Z"
}
```

#### `TripCompleteResponse`

```json
{
  "owned_trips": [
    {
      "id": "string",
      "user_id": "string",
      "description": "string",
      "vehicle": "string",
      "start_date": "2026-06-08T00:04:00.330Z",
      "end_date": "2026-06-08T00:04:00.330Z",
      "status": "string",
      "created_at": "2026-06-08T00:04:00.330Z"
    }
  ],
  "tracked_trips": [
    {
      "id": "string",
      "user_id": "string",
      "description": "string",
      "vehicle": "string",
      "start_date": "2026-06-08T00:04:00.330Z",
      "end_date": "2026-06-08T00:04:00.330Z",
      "status": "string",
      "created_at": "2026-06-08T00:04:00.330Z",
      "tracker_status": "string",
      "owner_name": "string"
    }
  ]
}
```

#### `TripStatusRequest`

```json
{
  "status": "string"
}
```

#### `LocationRequest`

```json
[
  {
    "app_id": "string",
    "latitude": 0,
    "longitude": 0,
    "altitude": 0,
    "recorded_at": "2026-06-08T00:07:25.069Z"
  }
]
```

#### `LocationResponse`

```json
{
  "inserted": 0
}
```

#### `TrackingListResponse`

```json
[
  {
    "id": "string",
    "trip": {
      "id": "string",
      "description": "string",
      "vehicle": "string",
      "start_date": "2026-06-08T00:08:31.090Z",
      "end_date": "2026-06-08T00:08:31.090Z",
      "status": "string"
    },
    "owner_name": "string",
    "status": "string",
    "added_at": "2026-06-08T00:08:31.090Z"
  }
]
```

#### `TrackingInviteRequest`

```json
{
  "trip_id": "string",
  "emails": [
    "string"
  ]
}
```

#### `TrackingInviteResponse`

```json
{
  "trip": {
    "id": "string",
    "description": "string",
    "vehicle": "string",
    "start_date": "2026-06-08T00:08:50.252Z",
    "end_date": "2026-06-08T00:08:50.252Z",
    "status": "string"
  },
  "added_count": 0,
  "skipped_count": 0
}
```

#### `TrackingAcceptResponse`

```json
{
  "id": 0,
  "trip_id": "string",
  "user_id": "string",
  "status": "string",
  "added_at": "2026-06-08T00:10:50.323Z"
}
```

#### `TrackingLocationResponse`

```json
{
  "locations": [
    {
      "id": 0,
      "latitude": 0,
      "longitude": 0,
      "altitude": 0,
      "recorded_at": "2026-06-08T00:11:29.726Z",
      "received_at": "2026-06-08T00:11:29.726Z"
    }
  ],
  "last_id": 0
}
```

#### `DefaultErrorResponse`

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string",
      "input": "string"
    }
  ]
}
```

### 6.2 Autenticação e Autorização
<!-- Tipo de token, local de armazenamento, estratégia de refresh, fluxo de logout. -->

| Aspecto | Decisão |
|---------|---------|
| Tipo de token | JWT |
| Armazenamento | EncryptedSharedPreferences |
| Estratégia de refresh | Refresh silencioso |
| Expiração | Xd refresh |

### 6.3 Estratégia de Offline e Cache

| Dado | TTL do cache | Comportamento offline |
|------|--------------|-----------------------|
| Sessão do usuário | Até expiração do token ou logout | Permitir acesso ao app se houver sessão válida salva em armazenamento seguro. Caso não exista sessão válida, bloquear acesso e solicitar login. |
| Access token | Até expiração definida pela API | Usar para requisições autenticadas. Se estiver expirado, tentar renovação com refresh token quando houver internet. |
| Refresh token | Até expiração definida pela API ou logout | Manter em armazenamento seguro. Sem internet, não será possível renovar sessão expirada. |
| Dados do usuário logado | Até logout ou atualização bem-sucedida | Servir dado local salvo. Indicar possível desatualização quando não houver internet. |
| Minhas viagens | Até logout ou próxima sincronização com sucesso | Exibir viagens salvas localmente. Se não houver dados locais, exibir estado vazio ou mensagem de indisponibilidade offline. |
| Viagens acompanhadas | Até logout ou próxima sincronização com sucesso | Exibir viagens acompanhadas salvas localmente. Se não houver dados locais, exibir estado vazio ou mensagem de indisponibilidade offline. |
| Convites recebidos | Até logout ou próxima sincronização com sucesso | Exibir convites salvos localmente. Aceitar ou rejeitar convite deve exigir conexão com a internet. |
| Viagem ativa atual | Enquanto a viagem permanecer ativa ou até logout | Manter a viagem ativa identificável localmente para continuar o registro de coordenadas. |
| Coordenadas pendentes | Até envio bem-sucedido para API ou logout | Manter salvas localmente e tentar sincronizar quando houver internet. Não excluir em caso de falha no envio. |
| Coordenadas já sincronizadas | Sem cache local permanente | Após envio bem-sucedido para a API, remover do armazenamento local. |
| Coordenadas da viagem acompanhada | Até próxima atualização do mapa ou logout | Exibir últimos pontos carregados localmente, quando disponíveis. Informar que os dados podem estar desatualizados sem internet. |
| Status das viagens | Até logout ou próxima sincronização com sucesso | Exibir status salvo localmente. Ações que alteram status devem exigir conexão, exceto interrupção local da captura quando necessário. |
| Status dos convites | Até logout ou próxima sincronização com sucesso | Exibir status salvo localmente. Alterações como aceitar ou rejeitar devem exigir conexão. |
| Configurações e preferências locais | Até logout ou alteração pelo usuário | Usar valores locais enquanto o usuário estiver autenticado. Remover dados vinculados ao usuário no logout. |
| Dados de mapa/base cartográfica | Conforme política do provedor de mapa | Se o mapa exigir internet e não houver dados previamente carregados, exibir mensagem de indisponibilidade. Pontos da viagem podem ser exibidos se estiverem salvos localmente. |

---

#### Regras Gerais de Offline e Cache

1. O armazenamento local deve ser usado apenas como apoio temporário para melhorar carregamento, permitir uso parcial offline e manter coordenadas pendentes de envio.
2. Todos os dados locais devem estar vinculados ao usuário logado.
3. Ao realizar logout, o aplicativo deve apagar os dados locais do usuário, incluindo viagens, viagens acompanhadas, convites, viagem ativa em cache, coordenadas pendentes e dados de sessão.
4. Tokens de acesso e refresh token devem ser salvos em armazenamento seguro do Android, como `EncryptedSharedPreferences`.
5. Viagens do usuário e viagens acompanhadas devem ser consultadas na API no carregamento inicial do app e salvas localmente após sucesso.
6. Em modo offline, o aplicativo pode exibir dados já carregados anteriormente.
7. Operações que alteram dados no servidor devem exigir conexão com a internet.
8. Durante uma viagem ativa, as coordenadas devem ser salvas localmente a cada 10 segundos.
9. As coordenadas pendentes devem ser enviadas para a API a cada 60 segundos quando houver internet.
10. Após envio bem-sucedido das coordenadas, os registros enviados devem ser removidos da base local.
11. Caso o envio das coordenadas falhe, os registros devem permanecer salvos localmente para nova tentativa.
12. O app deve indicar ao usuário quando estiver exibindo dados locais ou possivelmente desatualizados.

---

#### Comportamento por Tipo de Operação

| Operação | Comportamento offline |
|----------|-----------------------|
| Abrir aplicativo com sessão válida | Permitir acesso e exibir dados locais disponíveis. |
| Abrir aplicativo sem sessão válida | Exigir login. Login não deve funcionar offline. |
| Login | Bloquear operação e informar necessidade de conexão. |
| Cadastro de usuário | Bloquear operação e informar necessidade de conexão. |
| Recuperação de senha | Bloquear operação e informar necessidade de conexão. |
| Alterar dados do usuário | Bloquear operação e informar necessidade de conexão. |
| Listar minhas viagens | Exibir dados locais, se disponíveis. |
| Listar viagens acompanhadas | Exibir dados locais, se disponíveis. |
| Criar viagem | Exigir conexão com a internet. |
| Alterar viagem | Exigir conexão com a internet. |
| Excluir viagem | Exigir conexão com a internet. |
| Ativar viagem | Deve exigir conexão para alterar status na API. Após ativada com sucesso, a captura local pode continuar mesmo se a conexão cair. |
| Inativar viagem | Deve tentar atualizar o status na API. Localmente, deve interromper a captura de coordenadas para proteger a privacidade do usuário. |
| Cancelar viagem | Deve exigir conexão para cancelar na API. Se a viagem estiver ativa, a captura local deve ser interrompida. |
| Enviar convite | Exigir conexão com a internet. |
| Aceitar convite | Exigir conexão com a internet. |
| Rejeitar convite | Exigir conexão com a internet. |
| Remover viagem acompanhada | Exigir conexão com a internet. |
| Exibir mapa de viagem acompanhada | Exibir coordenadas locais, se disponíveis. Sem dados locais e sem internet, exibir mensagem de indisponibilidade. |
| Atualizar mapa | Exigir conexão para buscar novas coordenadas. |
| Capturar coordenadas da viagem ativa | Continuar salvando localmente, desde que a viagem já esteja ativa e a permissão de localização esteja concedida. |
| Sincronizar coordenadas pendentes | Executar somente quando houver conexão. |
| Logout | Deve limpar dados locais e sessão salva. |

---

#### Mensagens Recomendadas para Estados Offline

| Situação | Mensagem |
|----------|----------|
| Sem internet em operação que exige conexão | Sem conexão com a internet. Conecte-se para continuar. |
| Exibindo dados locais | Exibindo informações salvas no dispositivo. |
| Dados possivelmente desatualizados | Estes dados podem estar desatualizados. Atualize quando houver internet. |
| Coordenadas pendentes | Existem coordenadas aguardando envio. Elas serão sincronizadas quando houver internet. |
| Mapa sem dados offline | Não foi possível carregar o mapa da viagem sem conexão e sem dados salvos. |
| Login offline | Para entrar na sua conta, conecte-se à internet. |

### 6.4 Tratamento de Erros de Rede
<!-- Como erros de rede chegam ao usuário e ao sistema de crash/analytics. -->

| Tipo de erro | Tratamento | Feedback ao usuário |
|--------------|------------|---------------------|
| Sem conectividade | Retry com backoff exponencial | Banner de erro inline |
| Erro 4xx (cliente) | Registrar log, exibir mensagem | Alerta ou mensagem inline |
| Erro 5xx (servidor) | Registrar log, retry uma vez | Erro genérico + CTA de retry |

---

## 7. Persistência Local

### 7.1 Tecnologias de Armazenamento

| Caso de uso | Tecnologia | Justificativa |
|-------------|------------|---------------|
| Dados estruturados temporários | Room | Usado para armazenar dados relacionais e estruturados do aplicativo, como viagens do usuário, viagens acompanhadas, convites, viagem ativa em cache e coordenadas pendentes. Room é indicado para dados locais estruturados e funciona como uma camada de abstração sobre SQLite. :contentReference[oaicite:0]{index=0} |
| Coordenadas pendentes de sincronização | Room | As coordenadas precisam ser salvas localmente a cada 10 segundos e mantidas até o envio com sucesso para a API. Como são registros estruturados e podem existir em volume maior durante uma viagem, Room é a opção mais adequada. |
| Viagens do usuário e viagens acompanhadas | Room | As viagens carregadas da API devem ser salvas temporariamente para permitir visualização offline parcial e carregamento rápido da tela inicial. |
| Viagem ativa atual | Room ou DataStore | Pode ser salva em Room caso seja necessário manter vínculo com a entidade `Viagem`. Também pode ser salva em DataStore se forem armazenados apenas identificadores simples, como `viagemId` e `status`. |
| Preferências não sensíveis do usuário | DataStore Preferences | Indicado para preferências simples, como tema, última aba acessada, flags de onboarding e configurações não sensíveis. O DataStore é a solução recomendada para substituir SharedPreferences em armazenamento assíncrono com Coroutines e Flow. :contentReference[oaicite:1]{index=1} |
| Dados sensíveis de sessão | EncryptedSharedPreferences | Usado para armazenar `accessToken`, `refreshToken`, `usuarioId` e dados mínimos de sessão de forma protegida. Não deve ser usado para listas, viagens ou coordenadas. |
| Cache de arquivos/mídia | Cache interno do app | Usado apenas se o app precisar armazenar arquivos temporários, imagens, miniaturas ou recursos baixados. Nesta versão, não há necessidade inicial de cache de mídia, exceto se o provedor de mapa ou alguma funcionalidade futura exigir. |
| Cache de mapa | Gerenciado pela biblioteca/provedor de mapa | O cache visual do mapa deve seguir a política da biblioteca e do provedor de tiles utilizado. O app não deve assumir disponibilidade offline completa do mapa nesta versão. |
| Logs locais de erro | Arquivo interno ou Room, se necessário | Opcional. Pode ser usado para registrar falhas de sincronização ou erros relevantes para diagnóstico, desde que não armazene dados sensíveis desnecessários. |

---

### Regras de Uso

1. O armazenamento local deve ser **temporário** e sempre vinculado ao usuário logado.
2. Ao realizar logout, o aplicativo deve remover os dados locais vinculados ao usuário.
3. Tokens de acesso e refresh token devem ser armazenados apenas em armazenamento seguro.
4. Dados sensíveis não devem ser salvos em Room, DataStore comum ou arquivos não protegidos.
5. Viagens, viagens acompanhadas e coordenadas pendentes devem ser armazenadas em Room.
6. Preferências simples e não sensíveis devem ser armazenadas em DataStore.
7. Coordenadas enviadas com sucesso para a API devem ser removidas da base local.
8. Coordenadas que falharem no envio devem permanecer salvas localmente para nova tentativa.
9. O app não deve depender de cache local para permitir login, cadastro, recuperação de senha ou ações que exigem atualização na API.
10. O cache de mapa não deve ser tratado como funcionalidade offline garantida nesta versão.

---

### Observação sobre EncryptedSharedPreferences

O uso de `EncryptedSharedPreferences` atende ao requisito atual de armazenar tokens de forma segura no Android. Porém, como bibliotecas de segurança podem mudar ao longo do tempo, a especificação técnica deve permitir substituição futura por outra solução baseada no Android Keystore, caso necessário.

### 7.2 Modelos de Dados

<!-- Schema de cada entidade persistida. Manter normalizado. -->

Os modelos abaixo representam os dados persistidos localmente no aplicativo. O armazenamento local será temporário, vinculado ao usuário logado e deverá ser limpo quando o usuário realizar logout.

---

#### Entidade: `ViagemMinha`

| Campo | Tipo | Nulável | Observações |
|-------|------|---------|-------------|
| `id` | UUID / String | Não | Chave primária |
| `descricao` | String | Não | Descrição ou título da viagem |
| `veiculo` | String | Não | Veículo utilizado na viagem |
| `inicio` | Date | Não | Data de início da viagem |
| `termino` | Date | Não | Data de término da viagem |
| `status` | String | Não | Status da viagem: `pending`, `active`, `inactive`, `canceled`, `finished` |

---

#### Entidade: `ViagemAcompanhada`

| Campo | Tipo | Nulável | Observações |
|-------|------|---------|-------------|
| `id` | UUID / String | Não | Chave primária |
| `descricao` | String | Não | Descrição ou título da viagem acompanhada |
| `veiculo` | String | Não | Veículo utilizado na viagem |
| `inicio` | Date | Não | Data de início da viagem |
| `termino` | Date | Não | Data de término da viagem |
| `status` | String | Não | Status da viagem: `pending`, `active`, `inactive`, `canceled`, `finished` |
| `statusConvite` | String | Não | Status do convite: `pending`, `accepted`, `rejected` |

---

#### Entidade: `Coordenada`

| Campo | Tipo | Nulável | Observações |
|-------|------|---------|-------------|
| `id` | UUID / String | Não | Chave primária da coordenada |
| `dataHora` | DateTime | Não | Data e hora em que a coordenada foi capturada |
| `latitude` | Double | Não | Latitude capturada do dispositivo |
| `longitude` | Double | Não | Longitude capturada do dispositivo |
| `altitude` | Double | Não | Altitude capturada do dispositivo |

---

### Observações sobre os Modelos

A entidade `ViagemMinha` representa as viagens cadastradas pelo usuário logado. Essas informações serão carregadas da API e salvas localmente para exibição rápida e uso parcial offline.

A entidade `ViagemAcompanhada` representa as viagens que o usuário logado foi convidado a acompanhar. O campo `statusConvite` indica se o convite está pendente, aceito ou rejeitado.

A entidade `Coordenada` representa as coordenadas capturadas durante uma viagem ativa e ainda não enviadas com sucesso para a API. As coordenadas devem ser salvas localmente a cada 10 segundos e enviadas para a API a cada 60 segundos quando houver conexão com a internet.

Após o envio bem-sucedido das coordenadas para a API, os registros enviados devem ser removidos da base local.

---

### Regras de Persistência Local

| Regra | Descrição |
|-------|-----------|
| Dados temporários | Os dados locais devem ser usados apenas como cache temporário e apoio ao funcionamento offline parcial. |
| Usuário logado | Todos os dados salvos localmente devem pertencer ao usuário autenticado no momento. |
| Logout | Ao realizar logout, o app deve apagar viagens, viagens acompanhadas, coordenadas pendentes e demais dados locais do usuário logado. |
| Coordenadas pendentes | Coordenadas devem permanecer salvas localmente até confirmação de envio com sucesso para a API. |
| Limpeza após sincronização | Coordenadas enviadas com sucesso devem ser removidas da base local. |
| Falha no envio | Coordenadas que falharem no envio devem permanecer salvas localmente para nova tentativa. |
| Status de viagem | O status da viagem deve aceitar apenas: `pending`, `active`, `inactive`, `canceled`, `finished`. |
| Status de convite | O status do convite deve aceitar apenas: `pending`, `accepted`, `rejected`. |

### 7.3 Estratégia de Migração

<!-- Como alterações de schema são tratadas entre versões do app. -->

A estratégia de migração deve garantir que alterações no schema local do aplicativo sejam tratadas de forma controlada entre versões, evitando falhas ao abrir o app após atualizações.

Como o armazenamento local do aplicativo é **temporário** e vinculado ao **usuário logado**, a migração deve priorizar simplicidade e segurança dos dados. Os dados locais não devem ser tratados como fonte definitiva da informação, pois as viagens, viagens acompanhadas e convites podem ser carregados novamente pela API.

---

#### Diretrizes Gerais

1. Toda alteração no schema local deve incrementar a versão do banco local.
2. Alterações simples e compatíveis devem possuir migração explícita.
3. Alterações incompatíveis ou de alto risco podem limpar e recriar as tabelas locais, desde que não causem perda de dados críticos já enviados para a API.
4. Dados locais temporários podem ser descartados quando puderem ser recuperados novamente pela API.
5. Coordenadas pendentes de envio devem receber tratamento especial, pois podem representar dados ainda não sincronizados.
6. Tokens de autenticação não fazem parte do banco local e devem continuar armazenados em armazenamento seguro.
7. Após uma migração, o app deve continuar abrindo normalmente e exibir dados locais ou recarregados da API.

---

#### Estratégia por Tipo de Dado

| Tipo de dado | Estratégia de migração |
|-------------|------------------------|
| `ViagemMinha` | Pode ser migrada quando a alteração for simples. Em mudanças incompatíveis, pode ser apagada e recarregada pela API. |
| `ViagemAcompanhada` | Pode ser migrada quando a alteração for simples. Em mudanças incompatíveis, pode ser apagada e recarregada pela API. |
| `Coordenada` | Deve ser preservada sempre que possível, pois pode conter coordenadas pendentes de envio. |
| Sessão / tokens | Não fazem parte do Room. Devem permanecer em `EncryptedSharedPreferences` ou serem removidos apenas em logout ou sessão inválida. |
| Preferências não sensíveis | Devem ser migradas apenas se houver mudança de chave, formato ou significado da preferência. |
| Cache de mapa / arquivos | Pode ser descartado em alterações de versão, pois não é fonte principal de dados. |

---

#### Regras para Coordenadas Pendentes

As coordenadas salvas localmente e ainda não enviadas com sucesso para a API devem ser preservadas durante uma migração sempre que possível.

Caso uma migração não consiga preservar coordenadas pendentes com segurança, o app deve:

1. registrar internamente a falha de migração, se houver mecanismo de log;
2. evitar duplicidade ou corrupção dos dados;
3. priorizar a integridade do aplicativo;
4. informar o usuário apenas se houver impacto perceptível no rastreamento da viagem.

---

#### Quando Usar Migração Explícita

A migração explícita deve ser usada quando a alteração permitir preservar os dados existentes.

Exemplos:

- adicionar um novo campo opcional;
- adicionar um novo campo com valor padrão;
- renomear campo com cópia segura dos dados;
- criar uma nova tabela;
- adicionar índice;
- alterar enum/status mantendo compatibilidade.

---

#### Quando Recriar Dados Locais

A limpeza e recriação de dados locais pode ser usada quando a alteração for incompatível ou quando o custo de migração for maior que o benefício.

Exemplos:

- alteração estrutural grande nas entidades de viagem;
- mudança incompatível no formato de datas;
- remoção de tabelas antigas;
- alteração de relacionamento que torne o cache local inválido;
- mudança em dados que podem ser recarregados pela API.

Nesses casos, o app deve apagar o cache local afetado e carregar novamente os dados da API quando houver conexão.

---

#### Comportamento Esperado Após Atualização do App

| Situação | Comportamento esperado |
|----------|------------------------|
| Migração concluída com sucesso | O app abre normalmente e mantém os dados locais compatíveis. |
| Cache local de viagens invalidado | O app limpa o cache e recarrega viagens pela API quando houver internet. |
| Sem internet após cache invalidado | O app exibe mensagem informando que os dados precisam ser atualizados quando houver conexão. |
| Coordenadas pendentes existentes | O app preserva as coordenadas e tenta sincronizar quando houver internet. |
| Falha crítica na migração | O app deve priorizar abertura segura, evitando travamento permanente. |
| Logout após migração | O app deve limpar todos os dados locais do usuário logado normalmente. |

---

#### Política Recomendada

Como regra geral, o app deve utilizar uma abordagem híbrida:

- **Migração explícita** para dados que precisam ser preservados, principalmente coordenadas pendentes.
- **Limpeza e recarregamento** para dados temporários que podem ser obtidos novamente pela API, como minhas viagens, viagens acompanhadas e convites.

Essa abordagem reduz complexidade técnica, preserva os dados mais importantes e mantém o aplicativo seguro e estável entre versões.

## 8. Gerenciamento de Estado

### 8.1 Abordagem

<!-- Onde o estado vive: componente local, ViewModel compartilhado, store global, etc. -->

O aplicativo deve utilizar gerenciamento de estado compatível com a arquitetura **MVVM**, mantendo o estado de cada tela preferencialmente no seu respectivo `ViewModel`.

A interface deve apenas observar o estado exposto pelo `ViewModel` e enviar eventos de interação do usuário, como clicar em botões, confirmar ações, atualizar mapa, aceitar convite ou iniciar viagem.

| Tipo de estado | Escopo | Dono |
|----------------|--------|------|
| Estado efêmero de UI | Local da tela | Activity, Fragment ou Composable |
| Estado da tela | ViewModel da tela | ViewModel da feature |
| Estado da feature | ViewModel / StateHolder da feature | Módulo da feature |
| Estado de sessão | Escopo global do app | SessionManager / AuthRepository |
| Estado da viagem ativa | Escopo global do usuário logado | ActiveTripManager / TripRepository |
| Estado de conectividade | Escopo global do app | ConnectivityObserver |
| Estado de sincronização | Escopo de background/sincronização | LocationSyncManager / Foreground Service |
| Estado persistido local | Base local temporária | Room / Repositories |
| Dados sensíveis de sessão | Armazenamento seguro | EncryptedSharedPreferences / SessionManager |
| Preferências não sensíveis | Escopo do app ou usuário | DataStore |

---

#### Estado Efêmero de UI

Estados efêmeros são informações temporárias usadas apenas pela interface e que não precisam sobreviver ao fechamento da tela.

Exemplos:

- campo em foco;
- expansão de um card;
- exibição temporária de modal;
- controle de animações;
- estado local de seleção visual;
- rolagem da lista, quando não houver necessidade de persistência.

Esses estados devem ficar na própria tela ou componente visual.

---

#### Estado da Tela

Cada tela deve possuir um estado próprio exposto pelo `ViewModel`.

Exemplos de estados de tela:

- `loading`;
- `success`;
- `error`;
- `empty`;
- `offline`;
- `showConfirmation`;
- `showSuccessMessage`;
- `showErrorMessage`;
- dados carregados para exibição;
- filtros selecionados;
- dados temporários de formulário.

Telas que devem possuir estado próprio:

- Splash;
- Login;
- Cadastro de usuário;
- Recuperação de senha;
- Nova senha;
- Tela principal;
- Minhas viagens;
- Viagens acompanhadas;
- Detalhe da viagem;
- Cadastro de viagem;
- Edição de viagem;
- Envio de convite;
- Mapa;
- Perfil do usuário.

---

#### Estado de Sessão

O estado de sessão deve indicar se o usuário está autenticado ou não.

Esse estado deve considerar:

- existência de `accessToken`;
- existência de `refreshToken`;
- expiração do token;
- usuário logado atual;
- logout;
- sessão inválida;
- necessidade de redirecionamento para login.

Os tokens devem ser armazenados em armazenamento seguro, como `EncryptedSharedPreferences`.

---

#### Estado da Viagem Ativa

A viagem ativa deve ser tratada como um estado importante do aplicativo, pois controla a captura de coordenadas.

Esse estado deve indicar:

- se existe viagem ativa;
- `viagemId` da viagem ativa;
- status atual da viagem;
- se a captura de coordenadas está em execução;
- se existem coordenadas pendentes de envio;
- se há falha de sincronização;
- se a localização está indisponível ou sem permissão.

A viagem ativa deve ser salva localmente para que o aplicativo consiga identificar a viagem em andamento ao ser reaberto.

---

#### Estado de Conectividade

O aplicativo deve manter um estado observável de conectividade para orientar operações que dependem de internet.

Esse estado deve ser usado para:

- bloquear login offline;
- bloquear cadastro offline;
- bloquear recuperação de senha offline;
- bloquear criação, edição, exclusão e cancelamento de viagem quando exigirem API;
- informar que dados locais podem estar desatualizados;
- iniciar ou retomar sincronização de coordenadas pendentes;
- permitir atualização do mapa quando houver conexão.

---

#### Estado de Sincronização

A sincronização de coordenadas deve possuir estado próprio para indicar:

- sem coordenadas pendentes;
- coordenadas aguardando envio;
- sincronização em andamento;
- sincronização concluída;
- falha de sincronização;
- aguardando conexão.

As coordenadas devem ser salvas localmente a cada 10 segundos durante uma viagem ativa e enviadas para a API a cada 60 segundos quando houver conexão.

Após envio bem-sucedido, as coordenadas enviadas devem ser removidas do armazenamento local.

---

### 8.2 Primitivos Reativos/Assíncronos

<!-- ex.: Combine / AsyncStream / Flow / LiveData / RxSwift -->

| Plataforma | Primitivo | Uso |
|------------|-----------|-----|
| Android | Kotlin Coroutines | Execução assíncrona de chamadas de API, operações em banco local, validações e tarefas de sincronização. |
| Android | StateFlow | Exposição de estado contínuo das telas a partir dos ViewModels. |
| Android | SharedFlow | Emissão de eventos únicos, como mensagens, navegação, abertura de modal e confirmação de ações. |
| Android | Flow | Observação de dados locais vindos do Room, DataStore, sessão e conectividade. |
| Android | Foreground Service | Execução contínua da captura de coordenadas (a cada 10 segundos) e do envio ao endpoint (a cada 60 segundos) em segundo plano, inclusive com o app fechado. É o mecanismo principal para manter o rastreamento ativo durante uma viagem. Deve ser iniciado ao ativar a viagem e encerrado ao inativar, finalizar ou cancelar. |
| Android | WorkManager | Execução de tarefas agendadas complementares que tolerem latência maior, como reprocessamento de falhas de envio após reconexão. Não usar para os intervalos de 10 e 60 segundos, pois o intervalo mínimo do `PeriodicWorkRequest` é de 15 minutos. |
| Android | DataStore Flow | Observação de preferências não sensíveis do usuário. |
| Android | Room Flow | Observação reativa de dados locais, como viagens, viagens acompanhadas e coordenadas pendentes. |
| Android | LiveData | Evitar em novas features, exceto se houver necessidade de compatibilidade com código legado. |

---

### 8.3 Estados Padrão de Tela

As telas do aplicativo devem utilizar um padrão consistente de estado para facilitar manutenção, testes e previsibilidade da interface.

| Estado | Descrição | Exemplo de uso |
|--------|-----------|----------------|
| `Idle` | Estado inicial, antes de qualquer ação relevante. | Tela aberta aguardando interação. |
| `Loading` | Operação em andamento. | Login, cadastro, salvar viagem, carregar mapa. |
| `Success` | Operação concluída com sucesso. | Cadastro criado, viagem salva, convite aceito. |
| `Error` | Operação falhou. | Falha na API, erro de validação, falha de conexão. |
| `Empty` | Não existem dados para exibir. | Lista sem viagens ou sem convites. |
| `Offline` | Sem conexão com a internet. | Exibição de dados locais ou bloqueio de operação online. |
| `LocalData` | Dados exibidos a partir do armazenamento local. | Minhas viagens carregadas localmente. |
| `Unauthorized` | Sessão inválida ou ausente. | Redirecionar para login. |
| `PermissionRequired` | Permissão necessária não concedida. | Localização não autorizada. |

---

### 8.4 Eventos Únicos de UI

Eventos únicos não devem ser armazenados como estado permanente da tela. Eles devem ser emitidos uma única vez para evitar repetição após rotação, recriação da tela ou reobservação do estado.

Exemplos de eventos únicos:

| Evento | Uso |
|--------|-----|
| `NavigateToHome` | Após login bem-sucedido. |
| `NavigateToLogin` | Após logout ou sessão inválida. |
| `NavigateToTripDetail` | Ao selecionar uma viagem. |
| `NavigateToMap` | Ao abrir o mapa de uma viagem. |
| `ShowSuccessMessage` | Exibir mensagem de sucesso. |
| `ShowErrorMessage` | Exibir mensagem de erro. |
| `ShowConfirmationDialog` | Confirmar exclusão, cancelamento, rejeição ou logout. |
| `RequestLocationPermission` | Solicitar permissão de localização. |
| `OpenDeviceLocationSettings` | Orientar o usuário a ativar a localização do dispositivo. |

---

### 8.5 Estado por Feature

| Feature | Estado principal |
|---------|------------------|
| Autenticação | E-mail, senha, carregando, erro, sessão válida ou inválida. |
| Cadastro de usuário | Nome, e-mail, senha, confirmação de senha, validações e resultado do cadastro. |
| Recuperação de senha | E-mail informado, token recebido, token digitado, nova senha e resultado da alteração. |
| Tela principal | Aba selecionada, status de carregamento, conectividade e dados locais. |
| Minhas viagens | Lista de viagens, filtro por status, estado vazio, erro e carregamento. |
| Viagens acompanhadas | Lista de viagens acompanhadas, convites pendentes, filtro por status e estado vazio. |
| Detalhe da viagem | Dados da viagem, ações disponíveis conforme status e confirmações. |
| Cadastro/Edição de viagem | Campos do formulário, validações, carregamento, erro e sucesso. |
| Convites | E-mails informados, validação, envio, erro e sucesso. |
| Mapa | Coordenadas, última localização, carregamento, erro, sem novos pontos e dados locais. |
| Localização | Permissão, localização ativada/desativada, viagem ativa e captura em andamento. |
| Sincronização | Coordenadas pendentes, envio em andamento, sucesso, falha e aguardando conexão. |
| Perfil | Dados do usuário, e-mail somente leitura, validações, erro e sucesso. |
| Logout | Confirmação, limpeza local, remoção dos tokens e redirecionamento para login. |

---

### 8.6 Regras Gerais

1. A interface não deve acessar diretamente repositórios, banco local, API ou armazenamento seguro.
2. ViewModels devem chamar casos de uso ou repositórios, conforme definido na arquitetura.
3. Estados contínuos devem ser expostos preferencialmente com `StateFlow`.
4. Eventos únicos devem ser expostos preferencialmente com `SharedFlow`.
5. Dados locais observáveis devem ser expostos como `Flow`.
6. Operações assíncronas devem ser executadas com Coroutines.
7. Tokens e sessão devem ser acessados por um componente centralizado de sessão.
8. O estado da viagem ativa deve ser centralizado para evitar múltiplas viagens ativas simultaneamente.
9. O app deve evitar duplicidade de eventos após recriação de tela.
10. O estado exibido ao usuário deve refletir claramente se os dados são atualizados, locais ou possivelmente desatualizados.

## 9. Segurança

| Preocupação | Requisito | Implementação |
|-------------|-----------|---------------|
| Dados em repouso | Tokens de acesso, refresh token e dados sensíveis de sessão devem ser armazenados de forma segura. | Utilizar `EncryptedSharedPreferences` ou solução equivalente baseada no Android Keystore. |
| Dados em repouso | Dados locais temporários devem ser vinculados ao usuário logado. | As tabelas locais devem possuir vínculo com o usuário autenticado quando aplicável. |
| Dados em repouso | Dados locais devem ser apagados ao realizar logout. | Remover viagens locais, viagens acompanhadas, convites, coordenadas pendentes, viagem ativa em cache e dados de sessão. |
| Dados sensíveis | Tokens não devem ser armazenados em banco local comum, DataStore não criptografado ou arquivos simples. | Restringir tokens ao armazenamento seguro do Android. |
| Dados em trânsito | Toda comunicação com a API deve ocorrer por conexão segura. | Utilizar HTTPS com TLS 1.2 ou superior. |
| Dados em trânsito | O app não deve aceitar comunicação com endpoints inseguros em produção. | Bloquear chamadas HTTP não criptografadas em ambiente produtivo. |
| Autenticação | Funcionalidades protegidas devem exigir usuário autenticado. | Validar sessão antes de acessar viagens, convites, coordenadas, mapa e perfil. |
| Autenticação | Tokens expirados não devem permitir acesso a recursos protegidos. | Validar expiração do access token e usar refresh token quando aplicável. |
| Autenticação | Tokens jamais devem ser registrados em logs. | Aplicar redação ou bloqueio de logs contendo `accessToken`, `refreshToken` ou cabeçalhos de autenticação. |
| Autorização | Usuários não autorizados não devem acessar viagens ou coordenadas de outros usuários. | A API deve validar se o usuário é dono da viagem ou convidado autorizado. |
| Autorização | Viagens acompanhadas só devem ser acessadas por usuários com convite aceito. | Restringir acesso às coordenadas quando o convite estiver pendente, rejeitado ou removido. |
| Privacidade de localização | A localização só deve ser capturada quando houver usuário logado e viagem ativa. | Bloquear captura de coordenadas sem sessão válida ou sem viagem ativa. |
| Privacidade de localização | O usuário deve conseguir interromper o rastreamento. | Parar captura de coordenadas ao inativar, finalizar ou cancelar uma viagem. |
| Permissões | A permissão de localização deve ser solicitada de forma contextualizada. | Solicitar permissão apenas quando o usuário iniciar ou ativar uma viagem. |
| Permissões | O app deve tratar permissão de localização negada. | Exibir mensagem orientativa e impedir ativação do rastreamento quando a permissão for necessária. |
| Permissões | O app deve solicitar a permissão `ACCESS_BACKGROUND_LOCATION` para capturar localização com o app em segundo plano ou fechado (obrigatória no Android 10+ / API 29+). | Solicitar após concessão da permissão de localização em foreground, com explicação clara de que é necessária para continuar o rastreamento com o app fechado. Esta permissão exige revisão manual pela Google Play antes da publicação. |
| Permissões | O app deve declarar a permissão `FOREGROUND_SERVICE_LOCATION` para executar o Foreground Service do tipo location (obrigatória a partir do Android 14 / API 34). | Declarar no manifesto. Sem esta permissão, o sistema rejeita a criação do serviço em dispositivos com API 34 ou superior. |
| Logs | Logs não devem conter dados sensíveis ou localização detalhada. | Evitar registrar tokens, senha, coordenadas, e-mail completo ou payloads sensíveis. |
| Senhas | O app deve validar regras mínimas de senha. | Exigir no mínimo 6 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial. |
| Recuperação de senha | O token de recuperação deve ser validado antes da alteração da senha. | Comparar o token informado com o token recebido para validação antes de permitir nova senha. |
| Entrada de dados | Dados informados pelo usuário devem ser validados antes do envio. | Validar nome, e-mail, senha, confirmação de senha, dados de viagem e e-mails de convite. |
| Sincronização | Coordenadas pendentes não devem ser perdidas antes da confirmação de envio. | Remover coordenadas locais apenas após sucesso confirmado pela API. |
| Sincronização | Coordenadas não devem ser enviadas duplicadas como novos pontos. | Usar `coordenadaID` único para controle de envio e identificação no backend. |
| Detecção de root | Não obrigatório nesta versão. | Pode ser avaliado futuramente caso o produto passe a exigir maior proteção contra ambiente comprometido. |
| Autenticação biométrica | Opcional e fora do escopo da primeira versão. | Pode ser avaliada futuramente para facilitar acesso ao app sem substituir a autenticação por token. |
| Certificate pinning | Opcional nesta versão. | Pode ser avaliado futuramente para aumentar proteção contra interceptação, desde que exista estratégia segura de rotação de certificados. |

---

### Diretrizes de Segurança

1. O aplicativo deve tratar dados de localização como dados sensíveis.
2. O compartilhamento de localização deve ocorrer somente durante uma viagem ativa.
3. O usuário deve estar autenticado para cadastrar, alterar, ativar, inativar, cancelar ou acompanhar viagens.
4. Apenas o viajante e os convidados autorizados devem acessar os dados da viagem.
5. Tokens de autenticação devem ser armazenados em local seguro.
6. Tokens, senhas e coordenadas não devem aparecer em logs.
7. Ao realizar logout, todos os dados locais temporários do usuário devem ser removidos.
8. O app deve usar apenas comunicação segura com a API em produção.
9. A API deve ser responsável por validar permissões de acesso a viagens, convites e coordenadas.
10. A interface deve informar claramente quando a localização está sendo registrada.

---

### Observações

A primeira versão não exige detecção de root, autenticação biométrica ou certificate pinning obrigatório. Esses recursos podem ser avaliados em versões futuras, caso o risco do produto aumente ou o aplicativo passe a ter maior volume de usuários.

Para esta versão, os pontos mais importantes são:

- proteger tokens de autenticação;
- impedir acesso não autorizado a viagens e coordenadas;
- limpar dados locais no logout;
- capturar localização somente em viagem ativa;
- usar HTTPS em toda comunicação com a API;
- evitar qualquer registro sensível em logs.

## 10. Analytics e Observabilidade

### 10.1 Eventos de Analytics (Técnico)

<!-- Nomes e schemas finais dos eventos. Mapeia para eventos de produto na Spec de Produto §9. -->

Os eventos de analytics devem ser utilizados para acompanhar o uso das principais funcionalidades do aplicativo, identificar gargalos nos fluxos e apoiar decisões futuras de produto.

Os eventos não devem registrar dados sensíveis, como senha, tokens, coordenadas exatas, e-mail completo ou payloads da API.

| Nome do evento | Gatilho | Propriedades | Plataforma |
|----------------|---------|--------------|------------|
| `app_aberto` | App aberto ou retornando para foreground | `versao_so`, `versao_app`, `modelo_dispositivo`, `tem_sessao_salva` | Android |
| `splash_exibida` | Tela de Splash exibida | `versao_app` | Android |
| `sessao_validada` | App identifica sessão válida salva localmente | `usuario_autenticado`, `token_expirado` | Android |
| `sessao_invalida` | App não encontra sessão válida | `motivo` | Android |
| `login_iniciado` | Usuário toca no botão de login | `origem` | Android |
| `login_realizado` | Login concluído com sucesso | `duracao_ms` | Android |
| `login_falhou` | Login não concluído | `motivo`, `duracao_ms` | Android |
| `usuario_cadastro_iniciado` | Usuário acessa tela de cadastro | `origem` | Android |
| `usuario_cadastrado` | Cadastro concluído com sucesso | `duracao_ms` | Android |
| `usuario_cadastro_falhou` | Cadastro não concluído | `motivo`, `campos_invalidos` | Android |
| `recuperacao_senha_solicitada` | Usuário solicita token de recuperação | `duracao_ms` | Android |
| `recuperacao_senha_falhou` | Falha ao solicitar recuperação de senha | `motivo` | Android |
| `token_recuperacao_validado` | Token informado é validado com sucesso | `duracao_ms` | Android |
| `token_recuperacao_invalido` | Token informado é inválido | `motivo` | Android |
| `senha_alterada` | Senha alterada com sucesso | `duracao_ms` | Android |
| `senha_alteracao_falhou` | Falha na alteração da senha | `motivo` | Android |
| `home_carregada` | Tela principal carregada | `duracao_ms`, `qtd_minhas_viagens`, `qtd_viagens_acompanhadas`, `origem_dados` |
| `aba_minhas_viagens_aberta` | Usuário abre aba Minhas Viagens | `qtd_viagens`, `filtro_status` | Android |
| `aba_viagens_acompanhadas_aberta` | Usuário abre aba Viagens Acompanhadas | `qtd_viagens`, `qtd_convites_pendentes`, `filtro_status` | Android |
| `filtro_minhas_viagens_usado` | Usuário filtra minhas viagens | `status_filtro`, `qtd_resultados` | Android |
| `filtro_viagens_acompanhadas_usado` | Usuário filtra viagens acompanhadas | `status_filtro`, `qtd_resultados` | Android |
| `viagem_criacao_iniciada` | Usuário acessa tela de nova viagem | `origem` | Android |
| `viagem_criada` | Viagem criada com sucesso | `duracao_ms`, `status_inicial` | Android |
| `viagem_criacao_falhou` | Falha ao criar viagem | `motivo`, `campos_invalidos` | Android |
| `viagem_detalhe_aberto` | Usuário abre detalhes de uma viagem própria | `status_viagem` | Android |
| `viagem_alterada` | Viagem alterada com sucesso | `duracao_ms`, `status_viagem` | Android |
| `viagem_alteracao_falhou` | Falha ao alterar viagem | `motivo`, `status_viagem` | Android |
| `viagem_excluida` | Viagem excluída com sucesso | `duracao_ms`, `status_viagem` | Android |
| `viagem_exclusao_falhou` | Falha ao excluir viagem | `motivo`, `status_viagem` | Android |
| `viagem_ativada` | Viagem ativada com sucesso | `duracao_ms`, `permissao_localizacao`, `localizacao_ativa` | Android |
| `viagem_ativacao_falhou` | Falha ao ativar viagem | `motivo`, `permissao_localizacao`, `localizacao_ativa` | Android |
| `viagem_inativada` | Viagem inativada com sucesso | `duracao_ms`, `qtd_coordenadas_pendentes` | Android |
| `viagem_inativacao_falhou` | Falha ao inativar viagem | `motivo` | Android |
| `viagem_cancelada` | Viagem cancelada com sucesso | `duracao_ms`, `estava_ativa` | Android |
| `viagem_cancelamento_falhou` | Falha ao cancelar viagem | `motivo`, `estava_ativa` | Android |
| `permissao_localizacao_solicitada` | App solicita permissão de localização | `tipo_permissao`, `origem` | Android |
| `permissao_localizacao_concedida` | Usuário concede permissão de localização | `tipo_permissao` | Android |
| `permissao_localizacao_negada` | Usuário nega permissão de localização | `tipo_permissao`, `negacao_permanente` | Android |
| `localizacao_dispositivo_desativada` | App identifica localização desligada | `origem` | Android |
| `captura_coordenadas_iniciada` | App inicia captura durante viagem ativa | `viagem_status` | Android |
| `captura_coordenadas_parada` | App interrompe captura de coordenadas | `motivo`, `qtd_coordenadas_pendentes` | Android |
| `coordenada_salva_localmente` | Coordenada capturada e salva localmente | `qtd_pendentes`, `viagem_status` | Android |
| `coordenada_salvar_falhou` | Falha ao salvar coordenada localmente | `motivo` | Android |
| `sincronizacao_coordenadas_iniciada` | App inicia tentativa de envio de coordenadas pendentes | `qtd_pendentes`, `tem_conexao` | Android |
| `coordenadas_enviadas_api` | Coordenadas enviadas com sucesso para API | `qtd_enviadas`, `duracao_ms` | Android |
| `envio_coordenadas_falhou` | Falha ao enviar coordenadas para API | `motivo`, `qtd_pendentes` | Android |
| `coordenadas_removidas_localmente` | Coordenadas enviadas são removidas da base local | `qtd_removidas` | Android |
| `convite_envio_iniciado` | Usuário inicia envio de convite | `qtd_emails` | Android |
| `convite_enviado` | Convite enviado com sucesso | `qtd_emails`, `duracao_ms` | Android |
| `convite_envio_falhou` | Falha ao enviar convite | `motivo`, `qtd_emails` | Android |
| `convite_aceito` | Usuário aceita convite | `duracao_ms` | Android |
| `convite_aceite_falhou` | Falha ao aceitar convite | `motivo` | Android |
| `convite_rejeitado` | Usuário rejeita convite | `duracao_ms` | Android |
| `convite_rejeicao_falhou` | Falha ao rejeitar convite | `motivo` | Android |
| `viagem_acompanhada_aberta` | Usuário abre detalhes de viagem acompanhada | `status_viagem`, `status_convite` | Android |
| `viagem_acompanhada_removida` | Usuário remove viagem da lista de acompanhamento | `duracao_ms` | Android |
| `viagem_acompanhada_remocao_falhou` | Falha ao remover viagem acompanhada | `motivo` | Android |
| `mapa_aberto` | Usuário abre mapa da viagem | `tipo_viagem`, `status_viagem`, `origem_dados` | Android |
| `mapa_carregado` | Mapa carregado com sucesso | `duracao_ms`, `qtd_pontos`, `origem_dados` | Android |
| `mapa_carregamento_falhou` | Falha ao carregar mapa | `motivo`, `tipo_viagem` | Android |
| `mapa_atualizado` | Usuário atualiza coordenadas no mapa | `qtd_pontos`, `qtd_novos_pontos`, `duracao_ms` | Android |
| `mapa_sem_novos_pontos` | Atualização não retorna novas coordenadas | `qtd_pontos_atuais` | Android |
| `perfil_atualizado` | Dados do usuário atualizados com sucesso | `duracao_ms` | Android |
| `perfil_atualizacao_falhou` | Falha ao atualizar dados do usuário | `motivo`, `campos_invalidos` | Android |
| `logout_iniciado` | Usuário confirma saída da conta | `qtd_coordenadas_pendentes` | Android |
| `logout_realizado` | Logout concluído com sucesso | `dados_locais_removidos` | Android |
| `app_sem_conexao_exibido` | App identifica ausência de internet | `tela`, `operacao_bloqueada` | Android |
| `dados_locais_exibidos` | App exibe dados salvos localmente | `tela`, `tipo_dado`, `ultima_atualizacao_disponivel` | Android |
| `erro_generico_exibido` | App exibe erro genérico ao usuário | `tela`, `operacao` | Android |

---

#### Propriedades Padrão

Sempre que aplicável, os eventos devem incluir propriedades comuns para facilitar análise.

| Propriedade | Descrição |
|-------------|-----------|
| `versao_app` | Versão instalada do aplicativo. |
| `versao_so` | Versão do Android. |
| `modelo_dispositivo` | Modelo do dispositivo. |
| `ambiente` | Ambiente da aplicação: desenvolvimento, homologação ou produção. |
| `tela` | Tela onde o evento ocorreu. |
| `duracao_ms` | Tempo gasto para concluir a operação. |
| `tem_conexao` | Indica se havia conexão no momento do evento. |
| `origem_dados` | Indica se os dados vieram da API, base local ou cache. |
| `motivo` | Motivo resumido de falha, sem dados sensíveis. |

---

#### Dados que não devem ser enviados em Analytics

Os eventos de analytics não devem enviar:

- senha;
- token de acesso;
- refresh token;
- e-mail completo;
- nome completo do usuário;
- coordenadas exatas;
- payload completo de requisição ou resposta;
- dados pessoais sensíveis;
- identificadores sem anonimização quando não forem necessários para análise.

Quando for necessário identificar uma entidade para análise técnica, usar identificadores anonimizados, contadores ou categorias.

---

### 10.2 Relatório de Crashes

| Ferramenta | Configuração | Estratégia de breadcrumbs |
|------------|-------------|---------------------------|
| Firebase Crashlytics | Ativo em builds de homologação e produção. Desativado ou limitado em desenvolvimento. | Registrar navegação entre telas, início e fim de operações críticas, falhas de API sem payload sensível, mudanças de conectividade e status da sincronização. |
| Firebase Analytics | Ativo em produção para eventos de produto e funis principais. | Pode ser usado em conjunto com Crashlytics para correlacionar eventos com falhas. |
| Logcat | Uso restrito a desenvolvimento. | Não deve conter tokens, senhas, coordenadas exatas ou payloads sensíveis. |

---

#### Breadcrumbs Recomendados

Os breadcrumbs devem ajudar a entender o contexto de uma falha sem expor dados sensíveis.

| Breadcrumb | Quando registrar |
|------------|------------------|
| `screen_opened` | Ao abrir uma tela relevante. |
| `api_request_started` | Ao iniciar uma chamada de API, sem registrar payload ou token. |
| `api_request_failed` | Quando uma chamada de API falhar, registrando apenas endpoint lógico e status/categoria do erro. |
| `local_db_operation_failed` | Quando ocorrer falha ao consultar ou salvar no Room. |
| `location_capture_started` | Ao iniciar captura de localização. |
| `location_capture_stopped` | Ao interromper captura de localização. |
| `location_permission_denied` | Quando usuário negar permissão de localização. |
| `coordinates_sync_started` | Ao iniciar sincronização de coordenadas. |
| `coordinates_sync_failed` | Quando a sincronização falhar. |
| `connectivity_changed` | Quando houver mudança relevante de conectividade. |
| `logout_completed` | Quando o logout e limpeza local forem concluídos. |

---

### 10.3 Logging

| Nível | Quando usar | Persistido |
|-------|-------------|------------|
| DEBUG | Somente em desenvolvimento para investigar fluxo interno, estados de tela e validações locais. Nunca habilitar em builds de produção. | Não |
| INFO | Eventos-chave do ciclo de vida do app, como abertura de tela, início de sincronização, login iniciado e viagem ativada. | Não em produção, exceto quando convertido em breadcrumb seguro. |
| WARNING | Problemas recuperáveis, como ausência de internet, token expirado, permissão negada, falha temporária de API ou coordenadas pendentes. | Sim, apenas como breadcrumb ou ring buffer limitado e sem dados sensíveis. |
| ERROR | Falhas que impedem a conclusão de uma operação ou são exibidas ao usuário. | Sim, enviado ao relatório de crash quando aplicável. |
| FATAL | Crash ou falha crítica que encerra o app ou impede uso de fluxo principal. | Sim, enviado ao relatório de crash. |

---

#### Regras de Logging

1. Logs de produção não devem conter dados sensíveis.
2. Tokens, senhas e refresh tokens nunca devem ser logados.
3. Coordenadas exatas não devem ser registradas em logs ou breadcrumbs.
4. Payloads completos de requisições e respostas não devem ser registrados em produção.
5. Erros devem ser categorizados por tipo, como `network_error`, `api_error`, `validation_error`, `permission_error`, `database_error` ou `unknown_error`.
6. Logs de desenvolvimento devem poder ser desativados por configuração de build.
7. Logs persistidos devem ter retenção limitada.
8. Eventos técnicos devem ajudar no diagnóstico sem comprometer privacidade.
9. Falhas de sincronização devem informar quantidade de registros pendentes, mas não os dados das coordenadas.
10. Falhas de autenticação devem informar apenas o tipo de erro, nunca credenciais.

---

### 10.4 Métricas Técnicas Recomendadas

| Métrica | Objetivo |
|---------|----------|
| Tempo de cold start | Medir desempenho de abertura do app. |
| Tempo de login | Identificar lentidão no fluxo de autenticação. |
| Tempo de carregamento da tela principal | Medir experiência inicial após autenticação. |
| Taxa de falha no login | Identificar problemas de credenciais, API ou conectividade. |
| Taxa de falha na criação de viagem | Identificar problemas no fluxo de cadastro de viagem. |
| Taxa de falha na ativação da viagem | Identificar problemas com permissão, localização ou API. |
| Quantidade média de coordenadas pendentes | Avaliar eficiência da sincronização. |
| Taxa de sucesso no envio de coordenadas | Medir confiabilidade do rastreamento. |
| Tempo médio de sincronização de coordenadas | Avaliar desempenho da comunicação com API. |
| Taxa de falha ao abrir mapa | Identificar problemas no carregamento de mapa e coordenadas. |
| Taxa de negação de permissão de localização | Medir barreira para uso da funcionalidade principal. |
| Crash-free users | Medir estabilidade geral do aplicativo. |
| Crash-free sessions | Medir estabilidade por sessão de uso. |

---

## 11. Release e Distribuição

### 11.1 Build e Distribuição

| Etapa | Ferramenta | Observações |
|-------|------------|-------------|
| Automação de build | Gradle | O build do aplicativo Android deve ser executado via Gradle, utilizando configurações separadas por ambiente quando necessário. |
| Automação de release | Fastlane | Pode ser utilizado para automatizar versionamento, geração de APK/AAB, assinatura, envio para testes internos e publicação na Google Play. |
| Assinatura de código | Android Keystore | O app deve ser assinado com uma chave segura. A keystore de produção deve ser protegida e não deve ser versionada no repositório. |
| Distribuição interna | Firebase App Distribution | Usado para distribuir versões de teste para usuários internos, QA ou grupo reduzido de validadores. |
| Distribuição de homologação | Firebase App Distribution / Google Play Internal Testing | Usado para validar builds próximas da versão final antes da publicação oficial. |
| Distribuição de produção | Google Play Store | Canal oficial para disponibilizar o aplicativo Android aos usuários finais. |
| Relatório de crashes | Firebase Crashlytics | Deve estar ativo nas versões de homologação e produção para monitorar falhas. |
| Analytics | Firebase Analytics | Deve ser usado para acompanhar eventos principais do produto e indicadores de uso. |

---

#### Ambientes de Build

| Ambiente | Finalidade | Observações |
|----------|------------|-------------|
| Desenvolvimento | Uso local pelos desenvolvedores | Pode apontar para API de desenvolvimento e permitir logs mais detalhados. |
| Homologação | Testes internos e validação antes da publicação | Deve usar API de homologação e ferramentas de crash/analytics controladas. |
| Produção | Uso pelos usuários finais | Deve usar API de produção, logs restritos e configurações seguras. |

---

#### Tipos de Artefato

| Artefato | Uso |
|----------|-----|
| APK | Distribuição interna ou instalação manual em ambiente de teste. |
| AAB | Formato recomendado para publicação na Google Play Store. |

---

#### Regras de Release

1. Toda versão publicada deve possuir número de versão e código de versão incrementados.
2. Builds de produção devem estar assinadas com keystore de produção.
3. A keystore de produção não deve ser armazenada diretamente no repositório.
4. Builds de produção não devem conter logs sensíveis ou modo debug habilitado.
5. O app deve ser validado em pelo menos um dispositivo Android físico antes da publicação.
6. Fluxos críticos devem ser testados antes de cada release:
   - login;
   - cadastro de usuário;
   - recuperação de senha;
   - criação de viagem;
   - ativação de viagem;
   - captura de coordenadas;
   - sincronização de coordenadas;
   - envio de convite;
   - aceite de convite;
   - visualização do mapa;
   - logout e limpeza local.
7. A publicação em produção deve ser feita inicialmente de forma gradual, quando possível.
8. Crashlytics e analytics devem ser monitorados após cada publicação.

---

### 11.2 Feature Flags

| Flag | Escopo | Padrão | Plano de rollout |
|------|--------|--------|------------------|
| `enable_trip_tracking` | Ativação, captura e sincronização de coordenadas | Ativado | Liberar inicialmente para testadores internos. Manter controle para desativar rastreamento em caso de falha crítica. |
| `enable_trip_invitations` | Envio, aceite e rejeição de convites | Ativado | Liberar junto com a primeira versão, podendo ser desativado se houver falha no fluxo de convites. |
| `enable_map_view` | Visualização do mapa da viagem | Ativado | Liberar para todos os usuários da primeira versão. Pode ser desativado caso o provedor de mapa apresente instabilidade. |
| `enable_local_cache` | Exibição de dados locais de viagens e viagens acompanhadas | Ativado | Manter ativo, pois faz parte do comportamento principal offline parcial. |
| `enable_coordinate_sync` | Envio de coordenadas pendentes para API | Ativado | Liberar com monitoramento de falhas de sincronização. Pode ser desativado temporariamente se houver erro grave de API. |
| `enable_password_recovery` | Recuperação de senha por token | Ativado | Liberar para todos os usuários, pois é fluxo essencial de acesso. |
| `enable_crash_reporting` | Envio de relatórios de crash | Ativado em homologação e produção | Ativar em homologação e produção. Desativar em desenvolvimento, se necessário. |
| `enable_analytics` | Coleta de eventos de uso | Ativado em produção | Ativar em produção respeitando privacidade e sem enviar dados sensíveis. |

---

#### Estratégia de Feature Flags

As feature flags devem ser usadas para reduzir risco em funcionalidades críticas, principalmente aquelas que dependem de API, localização, sincronização e mapa.

As flags não devem substituir validações de segurança. Mesmo que uma funcionalidade esteja desativada no app, a API deve continuar protegendo os dados por autenticação e autorização.

---

### 11.3 Plano de Rollback

<!-- O que acontece se um bug crítico for encontrado após o lançamento? -->

Caso um bug crítico seja identificado após o lançamento, o plano de rollback deve priorizar a proteção dos dados do usuário, a interrupção de funcionalidades problemáticas e a restauração de uma versão estável do aplicativo.

---

#### Cenários Críticos

| Cenário | Ação recomendada |
|---------|------------------|
| Crash recorrente na abertura do app | Interromper rollout na Google Play, analisar Crashlytics e publicar hotfix. |
| Falha no login ou autenticação | Interromper rollout, validar API/autenticação e publicar correção emergencial. |
| Falha na captura de coordenadas | Desativar feature flag de rastreamento, se disponível, e publicar hotfix. |
| Falha no envio de coordenadas | Manter coordenadas pendentes localmente, monitorar API e publicar correção. |
| Perda de coordenadas pendentes | Interromper rollout imediatamente e corrigir fluxo de persistência/sincronização. |
| Acesso indevido a viagens ou coordenadas | Interromper rollout, bloquear funcionalidade afetada e corrigir API/app com prioridade máxima. |
| Falha no mapa | Desativar visualização de mapa, se possível, mantendo demais funcionalidades ativas. |
| Consumo excessivo de bateria | Reduzir ou desativar rastreamento via feature flag, investigar e publicar ajuste. |
| Falha no logout ou limpeza local | Publicar hotfix prioritário, pois envolve privacidade e segurança. |

---

#### Estratégia de Rollback

1. **Pausar o rollout**
   - Caso a publicação esteja em distribuição gradual, pausar imediatamente o avanço para novos usuários.

2. **Avaliar severidade**
   - Classificar o problema como baixo, médio, alto ou crítico.
   - Problemas envolvendo segurança, localização, perda de dados ou crash recorrente devem ser tratados como críticos.

3. **Usar feature flags**
   - Desativar temporariamente funcionalidades afetadas quando possível.
   - Priorizar flags de rastreamento, sincronização, mapa e convites.

4. **Publicar hotfix**
   - Corrigir o problema em uma nova versão.
   - Incrementar o código de versão.
   - Distribuir primeiro em canal interno ou homologação.
   - Publicar em produção após validação rápida dos fluxos críticos.

5. **Retornar para versão anterior**
   - Se a loja permitir e a versão anterior estiver estável, republicar ou promover a versão anterior.
   - Caso não seja possível retornar diretamente, publicar uma nova versão com comportamento equivalente à versão estável anterior.

6. **Monitorar após correção**
   - Acompanhar Crashlytics, analytics e feedback dos usuários.
   - Confirmar redução de crashes, falhas de API e erros nos fluxos principais.

---

#### Regras para Dados Locais Durante Rollback

1. O rollback não deve apagar coordenadas pendentes sem confirmação de envio para a API.
2. Migrações de banco local devem preservar coordenadas pendentes sempre que possível.
3. Dados de viagens e viagens acompanhadas podem ser recarregados pela API, caso o cache local precise ser invalidado.
4. Logout deve continuar limpando dados locais do usuário logado.
5. Tokens devem permanecer em armazenamento seguro ou ser removidos apenas em logout, sessão inválida ou correção de segurança.

---

#### Comunicação ao Usuário

Quando o problema afetar o uso do aplicativo de forma perceptível, o app deve apresentar mensagens claras e não técnicas.

Exemplos:

| Situação | Mensagem sugerida |
|----------|-------------------|
| Funcionalidade temporariamente indisponível | Esta funcionalidade está temporariamente indisponível. Tente novamente mais tarde. |
| Falha de sincronização | Não foi possível sincronizar as coordenadas agora. Elas serão mantidas para nova tentativa. |
| Falha de mapa | Não foi possível carregar o mapa no momento. Tente novamente mais tarde. |
| Atualização necessária | Uma nova versão do aplicativo está disponível. Atualize para continuar usando com segurança. |

---

### 11.4 Checklist de Publicação

| Item | Obrigatório |
|------|-------------|
| Versão do app incrementada | Sim |
| Código de versão incrementado | Sim |
| Build de produção assinado | Sim |
| Logs sensíveis removidos | Sim |
| API de produção configurada | Sim |
| Crashlytics validado | Sim |
| Analytics validado | Sim |
| Login testado | Sim |
| Cadastro testado | Sim |
| Recuperação de senha testada | Sim |
| Criação de viagem testada | Sim |
| Ativação de viagem testada | Sim |
| Captura de coordenadas testada | Sim |
| Sincronização de coordenadas testada | Sim |
| Convites testados | Sim |
| Mapa testado | Sim |
| Logout e limpeza local testados | Sim |
| Teste sem internet realizado | Sim |
| Teste de permissão de localização realizado | Sim |
| Política de privacidade revisada | Sim |

## 12. Questões Técnicas em Aberto

| # | Pergunta | Responsável | Prazo |
|---|----------|-------------|-------|

---

## 13. Histórico de Revisões

| Versão | Data | Autor | Resumo |
|--------|------|-------|--------|
| 0.1.0 | 2026-06-07 | Jose Julio | Rascunho inicial |
