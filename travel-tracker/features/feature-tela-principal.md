# Especificação de Feature — Tela principal

> **Tipo de documento:** Spec de Feature  
> **Status:** `rascunho` 
> **Versão:** 0.1.0  
> **Última atualização:** 2026-06-09  
> **Dono da feature:** Jose Julio
> **Tech lead:** Jose Julio
> **Spec de Produto vinculada:** [../product-travel-tracker.md](../product-travel-tracker.md) — §3 US-03, US-05, US-13, US-16, §4.1  
> **Spec Técnica vinculada:** [../technical-travel-tracker.md](../technical-travel-tracker.md) — FEAT-04, §5.3, §7.2 `ViagemMinha`, `ViagemAcompanhada`  
> **Plataforma:** `Android`
> **Sprint / Marco:** Sprint 1
> **Esforço estimado:** [X dias / Y story points]

---

## 1. Resumo da Feature

### 1.1 O Que Esta Feature Faz

A feature de tela principal é a tela exibida imediatamente após o login ou quando uma sessão válida é detectada. Ela apresenta uma barra de navegação inferior com duas abas: **Minhas Viagens**, que lista as viagens criadas pelo usuário, e **Viagens Acompanhadas**, que lista as viagens que o usuário foi convidado a acompanhar, incluindo convites pendentes. A partir dela, o usuário pode acessar detalhes, criar novas viagens, gerenciar convites e navegar para o mapa.

### 1.2 Por Que Existe

Esta feature existe para ser o centro de navegação do aplicativo após a autenticação, organizando o conteúdo do usuário em duas categorias principais: viagens próprias e viagens acompanhadas. A separação em abas permite que o usuário encontre rapidamente o que precisa, seja gerenciar suas próprias viagens ou responder a convites recebidos.

**Necessidade do usuário:** US-05 — Como viajante, quero cadastrar uma viagem para que ela possa ser acompanhada por outro usuário convidado. / US-13 — Como usuário convidado, quero aceitar um convite de acompanhamento de viagem para que eu possa acompanhar a viagem no aplicativo.  
**Objetivo de negócio:** Centralizar o registro de viagens, o compartilhamento de localização e o acompanhamento por usuários autorizados dentro de uma experiência segura e autenticada.

### 1.3 Escopo

**Dentro do escopo:**
- Exibir barra de navegação inferior com duas abas: "Minhas Viagens" e "Viagens Acompanhadas".
- Exibir a lista de viagens criadas pelo usuário logado na aba "Minhas Viagens" a partir dos dados previamente salvos no banco local (Room).
- Exibir a lista de viagens acompanhadas e convites pendentes na aba "Viagens Acompanhadas" a partir dos dados previamente salvos no banco local (Room).
- Exibir o status de cada viagem (pendente, ativa, inativa, cancelada, finalizada).
- Exibir o status de cada convite (pendente, aceito, rejeitado).
- Permitir filtrar as viagens por status em cada aba (filtro aplicado sobre os dados locais).
- Navegar para cadastro de nova viagem, detalhes da viagem, mapa e perfil do usuário.
- Indicar visualmente quando a aba "Viagens Acompanhadas" possui convites pendentes.
- Exibir dados locais imediatamente ao abrir a tela, sem depender de consulta à API (o carregamento inicial é feito pela feature Splash).

**Fora do escopo (nesta iteração):**
- Personalização da ordem das abas.
- Abas adicionais (configurações, notificações, etc.).
- Recarregamento automático em tempo real via WebSocket.
- Suporte a múltiplas contas simultâneas.

---

## 2. Comportamento Visível ao Usuário

### 2.1 Pontos de Entrada

| Ponto de entrada | Gatilho | Pré-condição |
|------------------|---------|--------------|
| Splash | Abertura do aplicativo com sessão válida detectada | Usuário autenticado com sessão salva localmente. |
| Tela de Login | Login realizado com sucesso | Usuário autenticado após informar credenciais válidas. |
| Tela de Login | Retorno após recuperação de senha com sucesso | Senha alterada e usuário autenticado com a nova senha. |
| Tela de Login | Retorno após cadastro de usuário com sucesso | Usuário cadastrado e autenticado. |

### 2.2 Fluxo do Caminho Feliz

**Pré-condição:**  
O usuário está autenticado e a feature Splash já concluiu o carregamento inicial, salvando as viagens e viagens acompanhadas no banco local (Room).

1. O aplicativo navega para a tela principal (após splash/login).
2. O aplicativo lê as viagens do banco local (entidade `ViagemMinha`) e as viagens acompanhadas (entidade `ViagemAcompanhada`) previamente salvas pela feature Splash.
3. O usuário visualiza a barra de navegação inferior com duas abas: **Minhas Viagens** e **Viagens Acompanhadas**.
4. O usuário visualiza na aba **Minhas Viagens** a lista de viagens que criou, cada uma exibindo descrição, veículo, data e status.
5. O usuário pode tocar em uma viagem para visualizar seus detalhes e ações disponíveis.
6. O usuário pode tocar em um botão de ação (ex.: "Nova viagem", "Filtrar") disponível na aba.
7. O usuário alterna para a aba **Viagens Acompanhadas** e visualiza a lista de viagens que acompanha, incluindo convites pendentes.
8. A aba **Viagens Acompanhadas** exibe um indicador visual (badge) quando existem convites pendentes.
9. O usuário pode tocar em uma viagem acompanhada para visualizar seus detalhes e ações (aceitar/rejeitar convite, visualizar mapa).

**Pós-condição:**  
O usuário visualiza as listas de viagens e viagens acompanhadas carregadas do banco local e pode navegar para as demais funcionalidades do aplicativo. Os dados permanecem disponíveis para exibição imediata em aberturas futuras, mesmo sem conexão, pois foram salvos localmente durante o splash.

### 2.3 Fluxos Alternativos

#### 2.3.1 Dados locais indisponíveis (nunca carregados)
**Gatilho:**  
A feature Splash não conseguiu carregar os dados (falha de conexão e nenhum cache local disponível) e mesmo assim navegou para a tela principal.

1. A tela principal é exibida sem dados nas duas abas.
2. A aba **Minhas Viagens** exibe estado vazio com a mensagem: **"Sem conexão com a internet. Conecte-se para visualizar suas viagens."**
3. A aba **Viagens Acompanhadas** exibe estado vazio com a mesma mensagem.
4. O usuário pode tentar navegar para outras telas (perfil, etc.) que não dependem da lista de viagens.

#### 2.3.2 Aba "Minhas Viagens" vazia (dados locais existem, mas sem viagens próprias)
**Gatilho:**  
O usuário não possui nenhuma viagem cadastrada.

1. A aba **Minhas Viagens** exibe estado vazio com a mensagem: **"Você ainda não criou nenhuma viagem."**
2. O aplicativo exibe um botão ou CTA: **"Criar nova viagem"**.
3. O usuário pode tocar no CTA para navegar para a tela de cadastro de viagem.

#### 2.3.3 Aba "Viagens Acompanhadas" vazia
**Gatilho:**  
O usuário não possui nenhuma viagem acompanhada ou convite pendente.

1. A aba **Viagens Acompanhadas** exibe estado vazio com a mensagem: **"Você ainda não está acompanhando nenhuma viagem."**
2. Nenhum CTA de ação é exibido nesta aba (o convite depende de outro usuário).

#### 2.3.4 Badge de convite pendente
**Gatilho:**  
Existem convites com status `pending` na entidade `ViagemAcompanhada` salva localmente.

1. O ícone da aba **Viagens Acompanhadas** exibe um badge com a quantidade de convites pendentes.
2. O badge é atualizado sempre que o dado local é modificado (aceite, rejeição ou novo carregamento pelo splash).
3. Ao tocar na aba, o usuário visualiza os convites pendentes no topo ou destacados na lista.

### 2.4 Casos Extremos e Condições de Contorno

| Cenário | Comportamento esperado |
|---------|------------------------|
| Dados locais indisponíveis em ambas as abas | Exibir estado vazio em cada aba com mensagem de conexão necessária. |
| Lista de viagens vazia na aba "Minhas Viagens" | Exibir estado vazio com CTA "Criar nova viagem". |
| Lista de viagens vazia na aba "Viagens Acompanhadas" | Exibir estado vazio sem CTA (depende de convite de terceiros). |
| Muitas viagens (mais de 20) | Exibir lista scrollável; não paginar nesta iteração. |
| Descrição de viagem muito longa | Truncar em 60 caracteres com reticências. |
| Sessão expirada durante uso | Redirecionar para tela de login ao tentar qualquer ação que exija autenticação. |
| Badge de convite pendente | Exibir badge numerado no ícone da aba "Viagens Acompanhadas" quando houver convites com status `pending` no banco local. |
| Toque em viagem com status `pending` (própria) | Navegar para detalhes da viagem; exibir opção de ativar. |
| Toque em convite com status `pending` (acompanhada) | Navegar para detalhes da viagem; exibir opções de aceitar/rejeitar. |
| Dados locais foram atualizados pelo Splash em segundo plano | A tela principal deve observar o banco local (Flow do Room) e refletir as alterações automaticamente. |

---

## 3. Especificação de UI

### 3.1 Telas / Views Desta Feature

| ID da Tela | Nome | Tipo | Descrição |
|------------|------|------|-----------|
| TLA-01 | Tela Principal | `raiz de aba` | Tela raiz do aplicativo após autenticação. Contém barra superior com título e ação de perfil, barra de navegação inferior com duas abas e conteúdo da aba selecionada. |
| TLA-01-A | Aba Minhas Viagens | Conteúdo de aba | Lista de viagens criadas pelo usuário, com filtro por status e botão de nova viagem. |
| TLA-01-B | Aba Viagens Acompanhadas | Conteúdo de aba | Lista de viagens acompanhadas e convites pendentes, com filtro por status. |

### 3.2 Detalhe da Tela — TLA-01: Tela Principal

**Referência de design:** A definir  
**Nome acessível:** "Tela principal"

#### Layout

A tela principal deve seguir a estrutura de navegação por abas inferior, comuns no padrão Android. A barra superior exibe o título dinâmico conforme a aba ativa e um ícone para acesso ao perfil.

```
┌────────────────────────────────────┐
│  "TravelTracker"          [👤]     │
├────────────────────────────────────┤
│                                    │
│  [Conteúdo da aba selecionada]     │
│  ┌────────────────────────────┐    │
│  │  Lista de viagens           │    │
│  │  ┌────────────────────────┐ │    │
│  │  │ Item de viagem         │ │    │
│  │  │ Descrição, veículo,    │ │    │
│  │  │ data, status           │ │    │
│  │  └────────────────────────┘ │    │
│  │  ┌────────────────────────┐ │    │
│  │  │ Item de viagem         │ │    │
│  │  │ ...                    │ │    │
│  │  └────────────────────────┘ │    │
│  └────────────────────────────┘    │
│                                    │
├────────────────────────────────────┤
│  [📋 Minhas]  [👥 Acompanhadas]   │
│  🟦 Viagens       Viagens          │
└────────────────────────────────────┘
```

#### Descrição das regiões
| Região | Descrição |
|--------|-----------|
| Barra superior | Exibe o nome do aplicativo "TravelTracker" à esquerda e um ícone de perfil (👤) à direita, que navega para a tela de perfil do usuário. |
| Conteúdo | Área que exibe o conteúdo da aba selecionada: lista de viagens, estado vazio, ou indicador de carregamento. |
| Barra de navegação inferior | Exibe duas abas com ícone e rótulo: "Minhas Viagens" e "Viagens Acompanhadas". A aba ativa é destacada visualmente. A aba "Viagens Acompanhadas" exibe badge numerado com a quantidade de convites pendentes. |

#### Navegação entre abas
| Ação | Comportamento |
|------|---------------|
| Toque na aba "Minhas Viagens" | Exibe o conteúdo TLA-01-A (lista de viagens do usuário). Título da barra superior permanece "TravelTracker". |
| Toque na aba "Viagens Acompanhadas" | Exibe o conteúdo TLA-01-B (lista de viagens acompanhadas e convites). Título da barra superior permanece "TravelTracker". |
| Toque no ícone de perfil | Navega para a tela de perfil do usuário (FEAT-05). |

#### Estados
| Estado | Gatilho | O que muda na UI |
|--------|---------|------------------|
| Com dados | Dados locais disponíveis em ambas as abas | Listas de viagens renderizadas na aba ativa. Badge visível se houver convites pendentes. |
| Aba sem dados | Banco local não contém registros para a aba atual | Exibe estado vazio específico da aba com mensagem e CTA quando aplicável. |
| Dados indisponíveis (sem cache) | Splash não conseguiu carregar dados | Exibe estado vazio em ambas as abas com mensagem de conexão necessária. |

---

### 3.3 Detalhe do Conteúdo — TLA-01-A: Aba Minhas Viagens

**Nome acessível:** "Minhas viagens, aba 1 de 2"

#### Layout

```
┌────────────────────────────────────┐
│  [Atuais] [Finalizadas]            │
│  [Canceladas] [Todas]              │
├────────────────────────────────────┤
│  ┌──────────────────────────────┐  │
│  │  🚗 São Paulo → Rio          │  │
│  │  Veículo: Carro              │  │
│  │  Início: 10/06/2026 08:00    │  │
│  │  Término: 12/06/2026 18:00   │  │
│  │  Status: ✅ Ativa             │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │  🏍️ Curitiba → Floripa       │  │
│  │  Veículo: Moto               │  │
│  │  Início: 15/06/2026 06:00    │  │
│  │  Término: 15/06/2026 12:00   │  │
│  │  Status: ⏸️ Inativa           │  │
│  └──────────────────────────────┘  │
│                                    │
│  [+  Nova viagem]                  │
└────────────────────────────────────┘
```

#### Descrição das regiões
| Região | Descrição |
|--------|-----------|
| Filter Chips | Chips de seleção horizontal com as opções: `Atuais`, `Finalizadas`, `Canceladas`, `Todas`. O chip `Atuais` é o selecionado por padrão. |
| Lista | Lista scrollável de cards de viagens do usuário. Cada card exibe descrição, veículo, data de início, data de término e status. |
| Ação principal | Botão flutuante ou fixo no final da lista: "Nova viagem". Navega para a tela de cadastro de viagem (FEAT-07). |

#### Comportamento dos Filter Chips
| Chip | Viagens exibidas |
|------|------------------|
| `Atuais` (padrão) | Viagens com status `active` ou `inactive`. |
| `Finalizadas` | Viagens com status `finished`. |
| `Canceladas` | Viagens com status `canceled`. |
| `Todas` | Todas as viagens, independente do status (`pending`, `active`, `inactive`, `finished`, `canceled`). |

#### Estados
| Estado | Gatilho | O que muda na UI |
|--------|---------|------------------|
| Lista preenchida | Banco local possui viagens do usuário | Cards renderizados conforme o chip de filtro selecionado. |
| Lista vazia | Banco local não possui viagens do usuário | Exibe estado vazio com mensagem e CTA "Criar nova viagem". |
| Filtro ativo | Usuário seleciona um chip | Lista é reexibida contendo apenas viagens que se enquadram no chip selecionado (filtro aplicado sobre os dados locais). |
| Filtro sem resultados | Nenhuma viagem corresponde ao chip selecionado | Exibe mensagem: "Nenhuma viagem encontrada para o filtro selecionado." |

#### Elementos Interativos
| Elemento | Tipo | Ação | Rótulo de acessibilidade |
|----------|------|------|--------------------------|
| Card de viagem | Card | Navega para detalhes da viagem (push). | "[Descrição], veículo [veículo], início [data], término [data], status [status]" |
| Chip de filtro | Filter Chip | Filtra a lista conforme opção selecionada. | "Filtrar por [nome do chip]" |
| Nova viagem | Botão | Navega para cadastro de viagem (push). | "Criar nova viagem" |

#### Itens da lista (ViagemMinha)
Cada card exibe:
- Ícone ou emoji representando o veículo (🚗 carro, 🏍️ moto, 🚌 ônibus, 🚲 bike)
- Descrição da viagem (ex.: "São Paulo → Rio")
- Veículo (ex.: "Veículo: Carro")
- Data de início formatada (ex.: "Início: 10/06/2026 08:00")
- Data de término formatada (ex.: "Término: 12/06/2026 18:00")
- Status formatado com cor e rótulo (ex.: ✅ Ativa, ⏸️ Inativa, 🏁 Finalizada, ❌ Cancelada, ⏳ Pendente)

---

### 3.4 Detalhe do Conteúdo — TLA-01-B: Aba Viagens Acompanhadas

**Nome acessível:** "Viagens acompanhadas, aba 2 de 2"

#### Layout

```
┌────────────────────────────────────┐
│  [Aceitas] [Pendentes] [Todas]     │
├────────────────────────────────────┤
│  ┌──────────────────────────────┐  │
│  │  🔵 Ana Maria                │  │
│  │  🚗 São Paulo → Rio          │  │
│  │  Veículo: Carro              │  │
│  │  Início: 10/06/2026 08:00    │  │
│  │  Término: 12/06/2026 18:00   │  │
│  │  Convite: ✅ Aceito           │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │  🟡 Convidado por Carlos     │  │
│  │  🏍️ Curitiba → Floripa       │  │
│  │  Veículo: Moto               │  │
│  │  Início: 15/06/2026 06:00    │  │
│  │  Término: 15/06/2026 12:00   │  │
│  │  Convite: ⏳ Pendente         │  │
│  │  [✅ Aceitar] [❌ Rejeitar]   │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │  🔵 Maria Eduarda            │  │
│  │  🚌 São Paulo → Curitiba     │  │
│  │  Veículo: Ônibus             │  │
│  │  Início: 20/06/2026 22:00    │  │
│  │  Término: 21/06/2026 06:00   │  │
│  │  Convite: ❌ Rejeitado        │  │
│  └──────────────────────────────┘  │
└────────────────────────────────────┘
```

#### Descrição das regiões
| Região | Descrição |
|--------|-----------|
| Filter Chips | Chips de seleção horizontal com as opções: `Aceitas`, `Pendentes`, `Todas`. O chip `Todas` é o selecionado por padrão. |
| Lista | Lista scrollável de cards de viagens acompanhadas. Cada card exibe nome do proprietário, descrição, veículo, data de início, data de término e status do convite. Itens com convite `pending` exibem ações de aceitar/rejeitar. |

#### Comportamento dos Filter Chips
| Chip | Viagens exibidas |
|------|------------------|
| `Aceitas` | Viagens com `statusConvite = "accepted"`. |
| `Pendentes` | Viagens com `statusConvite = "pending"`. |
| `Todas` (padrão) | Todas as viagens acompanhadas, independente do status do convite. |

#### Estados
| Estado | Gatilho | O que muda na UI |
|--------|---------|------------------|
| Lista preenchida | Banco local possui viagens acompanhadas | Cards renderizados conforme o chip selecionado. |
| Lista vazia | Banco local não possui viagens acompanhadas | Exibe estado vazio sem CTA (depende de convite de terceiros). |
| Filtro ativo | Usuário seleciona um chip | Lista é reexibida contendo apenas itens que se enquadram no chip selecionado. |
| Filtro sem resultados | Nenhum item corresponde ao chip selecionado | Exibe mensagem: "Nenhuma viagem acompanhada encontrada para o filtro selecionado." |

#### Badge de convites pendentes
| Situação | Comportamento |
|----------|---------------|
| Existem convites com status `pending` | O ícone da aba "Viagens Acompanhadas" exibe um badge circular com o número de convites pendentes. |
| Nenhum convite pendente | Badge oculto. |
| Usuário aceita ou rejeita um convite | Badge é atualizado (decrementado) em tempo real conforme o dado local muda. |

#### Elementos Interativos
| Elemento | Tipo | Ação | Rótulo de acessibilidade |
|----------|------|------|--------------------------|
| Card de viagem (status `accepted`) | Card | Navega para detalhes da viagem acompanhada (push). | "[Descrição], viagem de [proprietário], convite aceito" |
| Card de viagem (status `pending`) | Card com ações | Card com dois botões de ação. | "[Descrição], convite pendente de [proprietário]" |
| Aceitar convite | Botão (no card) | Aceita o convite de acompanhamento. | "Aceitar convite de [proprietário]" |
| Rejeitar convite | Botão (no card) | Rejeita o convite de acompanhamento. | "Rejeitar convite de [proprietário]" |
| Chip de filtro | Filter Chip | Filtra a lista conforme opção selecionada. | "Filtrar por [nome do chip]" |

#### Itens da lista (ViagemAcompanhada)
Cada card exibe:
- Nome do proprietário da viagem (ex.: "Ana Maria" ou "Convidado por Carlos")
- Ícone ou emoji representando o veículo
- Descrição da viagem (ex.: "São Paulo → Rio")
- Veículo (ex.: "Veículo: Carro")
- Data de início formatada (ex.: "Início: 10/06/2026 08:00")
- Data de término formatada (ex.: "Término: 12/06/2026 18:00")
- Status do convite formatado:
  - `accepted`: ✅ Aceito — card clicável para visualizar detalhes/mapa
  - `pending`: ⏳ Pendente — card com dois botões de ação (✅ Aceitar / ❌ Rejeitar)
  - `rejected`: ❌ Rejeitado — card exibido com estilo atenuado, sem ações

---

### 3.5 Catálogo de Componentes

| Componente | Variante | Configuração |
|------------|----------|--------------|
| `BarraSuperior` | Padrão | Título: "TravelTracker", ícone de perfil à direita |
| `NavegacaoInferior` | Duas abas | Aba 1: ícone + "Minhas Viagens". Aba 2: ícone + "Viagens Acompanhadas" com badge. |
| `Badge` | Numérico | Exibido no ícone da aba "Viagens Acompanhadas"; valor dinâmico = contagem de `statusConvite == "pending"`. |
| `ListaViagens` | Scrollável | Lista de cards `CardViagem` ou `CardViagemAcompanhada`. |
| `CardViagem` | Card | Ícone do veículo, descrição, veículo, data de início, data de término, status. Ação: navegar para detalhes. |
| `CardViagemAcompanhada` | Card | Nome do proprietário, ícone do veículo, descrição, veículo, data de início, data de término, status do convite. Ações: navegar para detalhes (se aceito) ou aceitar/rejeitar (se pendente). |
| `FilterChip` | Horizontal | Conjunto de chips selecionáveis. Opções "Minhas Viagens": `Atuais`, `Finalizadas`, `Canceladas`, `Todas`. Opções "Viagens Acompanhadas": `Aceitas`, `Pendentes`, `Todas`. |
| `BotaoPrimario` | Flutuante / Fixo | Rótulo: "Nova viagem", visível apenas na aba "Minhas Viagens". |
| `EstadoVazio` | Texto + CTA | Mensagem descritiva + botão de ação (quando aplicável). |

---

## 4. Design Técnico

### 4.1 Posicionamento no Módulo

**Módulo:** `features/home`  
**Novo módulo necessário:** Sim

A feature de tela principal deve ficar em um módulo próprio, pois é a tela raiz do aplicativo após a autenticação e serve como host de navegação para as demais features (viagens, perfil, mapa, etc.).

A feature de tela principal deve depender de componentes compartilhados do app, como:

- módulo de navegação;
- módulo de design system;
- módulo de persistência local (Room);
- módulo de sessão;
- `SharedDomain` (entidades `ViagemMinha`, `ViagemAcompanhada`).

### 4.2 Decomposição de Componentes / Classes

| Componente | Tipo | Responsabilidade |
|------------|------|-----------------|
| `HomeScreen` | View / Tela | Renderiza a tela principal com barra superior, barra de navegação inferior com duas abas e conteúdo da aba ativa. Observa o estado do ViewModel e dispara eventos de interação. |
| `MinhasViagensTab` | View / Composable | Renderiza o conteúdo da aba "Minhas Viagens": filter chips, lista de cards e botão "Nova viagem". |
| `ViagensAcompanhadasTab` | View / Composable | Renderiza o conteúdo da aba "Viagens Acompanhadas": filter chips e lista de cards com ações de aceitar/rejeitar. |
| `CardViagem` | View / Composable | Card individual de uma viagem própria com ícone, descrição, veículo, datas e status. |
| `CardViagemAcompanhada` | View / Composable | Card individual de uma viagem acompanhada com nome do proprietário, descrição, veículo, datas e status do convite. Inclui botões de ação para convites pendentes. |
| `HomeViewModel` | ViewModel / StateHolder | Mantém o estado da tela principal, incluindo aba ativa, dados das listas, filtro selecionado em cada aba e badge de convites pendentes. |
| `HomeUiState` | Estado de UI | Representa o estado visual da tela: aba ativa, listas filtradas de `ViagemMinha` e `ViagemAcompanhada`, chip selecionado em cada aba, contagem de convites pendentes. |
| `HomeUiEvent` | Evento de UI | Eventos únicos da tela: navegar para cadastro de viagem, navegar para detalhes da viagem, navegar para perfil, navegar para mapa. |
| `ObserveMyTripsUseCase` | Caso de Uso | Observa o banco local (Flow do Room) e retorna as viagens do usuário (`ViagemMinha`) filtrando conforme o chip selecionado (`ativas`, `finalizadas`, `canceladas`, `todas`). |
| `ObserveFollowedTripsUseCase` | Caso de Uso | Observa o banco local (Flow do Room) e retorna as viagens acompanhadas (`ViagemAcompanhada`) filtrando conforme o chip selecionado (`aceitas`, `pendentes`, `todas`). |
| `AcceptInviteUseCase` | Caso de Uso | Aceita um convite de acompanhamento. Chama a API (`/tracking/{trip_id}/accept`) e atualiza o status local. |
| `RejectInviteUseCase` | Caso de Uso | Rejeita um convite de acompanhamento. Chama a API e atualiza o status local. |
| `HomeRepository` | Repositório | Abstrai o acesso aos dados locais de viagens e viagens acompanhadas, além das operações de aceitar/rejeitar convite. |
| `TripLocalDataSource` | Fonte de Dados Local | Acessa as entidades `ViagemMinha` e `ViagemAcompanhada` no Room via DAO. Expõe Fluxos reativos (Flow) para observação de dados. |
| `TrackingRemoteDataSource` | Fonte de Dados Remota | Chama os endpoints de aceitar e rejeitar convite na API. |
| `HomeRouter` | Router / Navigator | Gerencia a navegação a partir da tela principal para: cadastro de viagem, detalhes da viagem, mapa, perfil do usuário. |
| `MyTripsFilter` | Filtro | Enum que define os filtros disponíveis para a aba "Minhas Viagens": `atuais` (active + inactive), `finalizadas` (finished), `canceladas` (canceled), `todas`. |
| `FollowedTripsFilter` | Filtro | Enum que define os filtros disponíveis para a aba "Viagens Acompanhadas": `aceitas` (accepted), `pendentes` (pending), `todas`. |

### 4.3 Fluxo de Dados

```
HomeScreen
  └─► HomeViewModel
        ├─► ObserveMyTripsUseCase
        │     └─► HomeRepository
        │           └─► TripLocalDataSource (Room Flow → ViagemMinha)
        │                 └─► Banco local (pré-carregado pelo Splash)
        │
        ├─► ObserveFollowedTripsUseCase
        │     └─► HomeRepository
        │           └─► TripLocalDataSource (Room Flow → ViagemAcompanhada)
        │                 └─► Banco local (pré-carregado pelo Splash)
        │
        └─► AcceptInviteUseCase / RejectInviteUseCase
              └─► HomeRepository
                    ├─► TrackingRemoteDataSource → API → PATCH /tracking/{id}/accept
                    └─► TripLocalDataSource → Atualiza statusConvite no Room
```

**Fluxo de exibição:**

1. `HomeScreen` é exibida após navegação do Splash ou Login.
2. `HomeViewModel` inicia `ObserveMyTripsUseCase` e `ObserveFollowedTripsUseCase`.
3. Cada caso de uso consulta o Room via Flow (reativo) e aplica o filtro selecionado.
4. O Room retorna os dados previamente salvos pela feature Splash.
5. `HomeViewModel` atualiza o `HomeUiState` com as listas filtradas.
6. `HomeScreen` re-renderiza conforme o estado.
7. Quando o usuário altera o chip de filtro, o ViewModel reaplica o filtro sobre os dados do Flow.
8. Quando o Splash atualiza os dados em segundo plano, o Flow do Room emite novos valores e a tela é atualizada automaticamente.

### 4.4 Interface Pública (API desta Feature)

```
// Pseudocódigo — intenção independente de linguagem

interface HomeEntry {
    fun iniciar(com contexto: HomeContext): HomeRouter
}

data class HomeContext {
    val origem: OrigemNavegacao  // .splash | .login | .recuperacaoSenha
}
```

### 4.5 Endpoints de API Utilizados

A tela principal não consulta endpoints para carregar a lista de viagens — os dados já foram carregados e persistidos localmente pela feature Splash, que utiliza o endpoint `/trips/all-user-trips/complete`.

Os únicos endpoints chamados diretamente por esta feature são para aceitar ou rejeitar convites:

| Endpoint | Método | Contrato | Observações |
|----------|--------|----------|-------------|
| `/tracking/{trip_id}/accept` | PUT | Ver Spec Técnica §6.1 — `TrackingAcceptResponse` | Chamado ao aceitar um convite. Exige conexão. |
| `/tracking/{trip_id}/reject` | PUT | Ver Spec Técnica §6.1 | Chamado ao rejeitar um convite. Exige conexão. |

### 4.6 Alterações na Persistência Local

| Tipo de alteração | Entidade / Tabela | Campos adicionados / removidos | Migração necessária |
|-------------------|-------------------|-------------------------------|---------------------|
| Nenhuma | — | — | Não |

A feature de tela principal não introduz novas entidades ou campos no banco local. Ela apenas consome as entidades `ViagemMinha` e `ViagemAcompanhada` que já existem no schema do Room, previamente populadas pela feature Splash.

### 4.7 Definição de Estado

```
// Pseudocódigo

enum AbaAtiva {
    minhasViagens
    viagensAcompanhadas
}

enum FiltroMinhasViagens {
    atuais      // active + inactive
    finalizadas // finished
    canceladas  // canceled
    todas
}

enum FiltroViagensAcompanhadas {
    aceitas   // accepted
    pendentes // pending
    todas
}

data class HomeUiState {
    val abaAtiva: AbaAtiva
    val minhasViagens: List<ViagemMinha>
    val viagensAcompanhadas: List<ViagemAcompanhada>
    val filtroMinhasViagens: FiltroMinhasViagens
    val filtroViagensAcompanhadas: FiltroViagensAcompanhadas
    val convitesPendentes: Int
    val carregando: Boolean
}
```

### 4.8 Tratamento de Erros

| Origem do erro | Tipo de erro | Tratamento | Mensagem ao usuário |
|----------------|-------------|------------|---------------------|
| Sem rede ao aceitar/rejeitar convite | Erro de conectividade | Bloquear operação; exibir Snackbar | "Sem conexão com a internet. Conecte-se para continuar." |
| 401 Não autorizado | Erro de autenticação | Disparar refresh do token → re-chamada → se falhar, logout | "Sessão expirada. Faça login novamente." |
| 404 ao aceitar convite | Erro do cliente | Exibir Snackbar | "Convite não encontrado ou já foi respondido." |
| 5xx Servidor | Erro de servidor | Log + breadcrumb no Crashlytics; exibir Snackbar | "Não foi possível concluir a operação. Tente novamente." |
| Timeout ao aceitar/rejeitar | Timeout de rede | Bloquear operação; exibir Snackbar | "O servidor demorou para responder. Tente novamente." |

> **Nota:** Erros relacionados ao carregamento das listas de viagens não são tratados nesta feature, pois o carregamento é responsabilidade da feature Splash.

---

## 5. Eventos de Analytics

| Nome do evento | Gatilho | Propriedades |
|----------------|---------|--------------|
| `home_visualizada` | Tela principal é exibida | `origem: String`, `qtd_minhas_viagens: Int`, `qtd_acompanhadas: Int`, `convites_pendentes: Int` |
| `home_aba_alternada` | Usuário alterna entre as abas | `aba: String` |
| `home_aba_acompanhadas_badge_visualizado` | Badge de convites pendentes é exibido | `qtd_pendentes: Int` |
| `home_minhas_viagens_filtro_alterado` | Usuário seleciona um chip de filtro na aba "Minhas Viagens" | `filtro: String`, `qtd_resultados: Int` |
| `home_acompanhadas_filtro_alterado` | Usuário seleciona um chip de filtro na aba "Viagens Acompanhadas" | `filtro: String`, `qtd_resultados: Int` |
| `home_minhas_viagens_item_tocado` | Usuário toca em um card de viagem própria | `viagem_id: String`, `status: String` |
| `home_acompanhadas_item_tocado` | Usuário toca em um card de viagem acompanhada | `viagem_id: String`, `status_convite: String` |
| `home_nova_viagem_tocado` | Usuário toca no botão "Nova viagem" | — |
| `home_perfil_tocado` | Usuário toca no ícone de perfil | — |
| `home_convite_aceito` | Usuário aceita um convite de acompanhamento | `viagem_id: String`, `proprietario: String` |
| `home_convite_rejeitado` | Usuário rejeita um convite de acompanhamento | `viagem_id: String`, `proprietario: String` |
| `home_convite_erro` | Ocorre erro ao aceitar ou rejeitar um convite | `tipo: String` (aceitar/rejeitar), `codigo_erro: String`, `mensagem: String` |

### Propriedades dos Eventos

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `origem` | String | Indica de onde o usuário veio: `splash`, `login`, `recuperacao_senha`, `cadastro`. |
| `aba` | String | Nome da aba selecionada: `minhas_viagens`, `viagens_acompanhadas`. |
| `filtro` | String | Filtro selecionado: `atuais`, `finalizadas`, `canceladas`, `todas`, `aceitas`, `pendentes`. |
| `qtd_resultados` | Int | Quantidade de itens exibidos após aplicar o filtro. |
| `qtd_minhas_viagens` | Int | Quantidade total de viagens próprias do usuário. |
| `qtd_acompanhadas` | Int | Quantidade total de viagens acompanhadas. |
| `convites_pendentes` | Int | Quantidade de convites com status `pending`. |
| `viagem_id` | String | Identificador da viagem. Não deve conter dados pessoais. |
| `status` | String | Status da viagem no momento do toque: `pending`, `active`, `inactive`, `finished`, `canceled`. |
| `status_convite` | String | Status do convite: `pending`, `accepted`, `rejected`. |
| `proprietario` | String | Nome do proprietário da viagem. |
| `tipo` | String | Tipo da operação: `aceitar`, `rejeitar`. |
| `codigo_erro` | String | Código ou categoria segura do erro. |
| `mensagem` | String | Mensagem amigável ou categoria do erro exibida ao usuário. |

### Regras de Analytics da Feature

1. Não enviar e-mail, tokens ou qualquer credencial nos eventos.
2. O evento `home_visualizada` deve ser disparado sempre que a tela principal for exibida.
3. O evento `home_aba_alternada` deve ser disparado apenas quando o usuário alternar manualmente entre abas.
4. O filtro selecionado por padrão (`atuais` ou `todas`) não deve disparar evento de filtro na abertura da tela.
5. Eventos de toque em itens devem registrar apenas o identificador da viagem, nunca dados completos.

---

## 6. Permissões e Privacidade

| Permissão | Obrigatória | Quando solicitada | Se negada |
|-----------|-------------|-------------------|-----------|

---

## 7. Notificações (se aplicável)

| Tipo de notificação | Gatilho | Título | Corpo | Deep link |
|---------------------|---------|--------|-------|-----------|

---

## 8. Localização

**Arquivo de strings / recurso:** `strings.xml`

| Chave | Padrão (PT-BR) | Observações |
|-------|----------------|-------------|
| `tela_principal.titulo` | "TravelTracker" | Título da barra superior. |
| `tela_principal.aba.minhas_viagens` | "Minhas Viagens" | Rótulo da aba inferior. |
| `tela_principal.aba.viagens_acompanhadas` | "Viagens Acompanhadas" | Rótulo da aba inferior. |
| `tela_principal.acessibilidade.tela` | "Tela principal" | Nome acessível da tela. |
| `tela_principal.acessibilidade.aba.minhas_viagens` | "Minhas viagens, aba 1 de 2" | Rótulo acessível da aba. |
| `tela_principal.acessibilidade.aba.viagens_acompanhadas` | "Viagens acompanhadas, aba 2 de 2" | Rótulo acessível da aba. |
| `tela_principal.acessibilidade.perfil` | "Perfil do usuário" | Rótulo acessível do ícone de perfil. |
| `tela_principal.minhas_viagens.filtro.atuais` | "Atuais" | Chip de filtro para viagens ativas/inativas. |
| `tela_principal.minhas_viagens.filtro.finalizadas` | "Finalizadas" | Chip de filtro para viagens finalizadas. |
| `tela_principal.minhas_viagens.filtro.canceladas` | "Canceladas" | Chip de filtro para viagens canceladas. |
| `tela_principal.minhas_viagens.filtro.todas` | "Todas" | Chip de filtro para todas as viagens. |
| `tela_principal.minhas_viagens.vazio` | "Você ainda não criou nenhuma viagem." | Mensagem de estado vazio. |
| `tela_principal.minhas_viagens.vazio.cta` | "Criar nova viagem" | CTA do estado vazio. |
| `tela_principal.minhas_viagens.filtro_sem_resultados` | "Nenhuma viagem encontrada para o filtro selecionado." | Mensagem quando filtro não retorna resultados. |
| `tela_principal.minhas_viagens.nova_viagem` | "Nova viagem" | Botão para criar nova viagem. |
| `tela_principal.minhas_viagens.acessibilidade.card` | "{descricao}, veículo {veiculo}, início {data_inicio}, término {data_termino}, status {status}" | Rótulo acessível do card de viagem. |
| `tela_principal.minhas_viagens.acessibilidade.filtro` | "Filtrar por {filtro}" | Rótulo acessível dos chips de filtro. |
| `tela_principal.minhas_viagens.acessibilidade.nova_viagem` | "Criar nova viagem" | Rótulo acessível do botão Nova viagem. |
| `tela_principal.acompanhadas.filtro.aceitas` | "Aceitas" | Chip de filtro para convites aceitos. |
| `tela_principal.acompanhadas.filtro.pendentes` | "Pendentes" | Chip de filtro para convites pendentes. |
| `tela_principal.acompanhadas.filtro.todas` | "Todas" | Chip de filtro para todas as viagens acompanhadas. |
| `tela_principal.acompanhadas.vazio` | "Você ainda não está acompanhando nenhuma viagem." | Mensagem de estado vazio. |
| `tela_principal.acompanhadas.filtro_sem_resultados` | "Nenhuma viagem acompanhada encontrada para o filtro selecionado." | Mensagem quando filtro não retorna resultados. |
| `tela_principal.acompanhadas.acessibilidade.card_aceito` | "{descricao}, viagem de {proprietario}, convite aceito" | Rótulo acessível do card com convite aceito. |
| `tela_principal.acompanhadas.acessibilidade.card_pendente` | "{descricao}, convite pendente de {proprietario}" | Rótulo acessível do card com convite pendente. |
| `tela_principal.acompanhadas.acessibilidade.aceitar` | "Aceitar convite de {proprietario}" | Rótulo acessível do botão Aceitar. |
| `tela_principal.acompanhadas.acessibilidade.rejeitar` | "Rejeitar convite de {proprietario}" | Rótulo acessível do botão Rejeitar. |
| `tela_principal.erro.sem_conexao` | "Sem conexão com a internet. Conecte-se para visualizar suas viagens." | Mensagem exibida quando não há dados e sem conexão. |
| `tela_principal.erro.convite.aceitar` | "Não foi possível aceitar o convite. Tente novamente." | Erro ao aceitar convite. |
| `tela_principal.erro.convite.rejeitar` | "Não foi possível rejeitar o convite. Tente novamente." | Erro ao rejeitar convite. |
| `tela_principal.erro.convite.nao_encontrado` | "Convite não encontrado ou já foi respondido." | Erro 404 ao aceitar/rejeitar. |
| `tela_principal.erro.generico` | "Não foi possível concluir a operação. Tente novamente." | Erro inesperado. |

**Layout RTL:** Não obrigatório  
**Formatação de data/número:** Usa locale do sistema

---

## 9. Definição de Pronto (Definition of Done)

- [ ] Todos os critérios de aceite das US-03, US-05, US-13 e US-16 (Spec de Produto §3) verificados.
- [ ] Barra de navegação inferior com duas abas funcionando corretamente, com alternância entre "Minhas Viagens" e "Viagens Acompanhadas".
- [ ] Badge de convites pendentes exibido na aba "Viagens Acompanhadas" e atualizado em tempo real ao aceitar/rejeitar.
- [ ] Filter Chips da aba "Minhas Viagens" (`Atuais`, `Finalizadas`, `Canceladas`, `Todas`) filtrando corretamente os dados locais, com `Atuais` como padrão exibindo `active` + `inactive`.
- [ ] Filter Chips da aba "Viagens Acompanhadas" (`Aceitas`, `Pendentes`, `Todas`) filtrando corretamente os dados locais, com `Todas` como padrão.
- [ ] Cards de viagem exibindo todas as informações (descrição, veículo, data de início, data de término, status) conforme especificado na seção 3.
- [ ] Cards de viagem acompanhada com ações de aceitar/rejeitar para convites `pending`, e navegação para detalhes para convites `accepted`.
- [ ] Listas alimentadas exclusivamente por dados do banco local (Room) — sem chamada de API para carregamento inicial.
- [ ] Dados reativos: alterações no Room (via Splash ou aceite/rejeição de convite) refletidas automaticamente na UI via Flow.
- [ ] Estados vazios exibidos corretamente em cada aba conforme a disponibilidade de dados.
- [ ] Cobertura de testes unitários ≥ 80% nos UseCases, ViewModel e filtros da feature.
- [ ] Testes de integração dos fluxos de aceitar e rejeitar convite passando no CI.
- [ ] Testes de UI do caminho feliz (navegação entre abas, filtros, toque em cards) verdes.
- [ ] Testes de UI dos fluxos alternativos (aceitar/rejeitar convite, abas vazias, filtro sem resultados) verdes.
- [ ] Sem novos warnings de lint / análise estática no módulo `features/home`.
- [ ] Auditoria de acessibilidade aprovada (TalkBack) — navegação entre abas, cards, filtros e ações de aceitar/rejeitar.
- [ ] Eventos de analytics (seção 5) disparando e verificados no dashboard de debug.
- [ ] Chaves de localização (seção 8) adicionadas ao `strings.xml`.
- [ ] Feature flag implementada e configurada como `desativada` por padrão.
- [ ] Revisão de design aprovada.
- [ ] Code review do tech lead aprovado.
- [ ] Aceite do product owner confirmado.
- [ ] Entrada nas notas de release redigida.

---

## 10. Dependências e Bloqueios

| Dependência | Tipo | Responsável | Status | Bloqueante |
|-------------|------|-------------|--------|------------|

---

## 11. Questões em Aberto

| # | Pergunta | Responsável | Prazo |
|---|----------|-------------|-------|

---

## 12. Histórico de Revisões

| Versão | Data | Autor | Resumo |
|--------|------|-------|--------|
| 0.1.0 | 2026-06-09 | Jose Julio | Rascunho inicial |
