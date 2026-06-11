# Especificação de Feature — Exibir dados da viagem

> **Tipo de documento:** Spec de Feature  
> **Status:** `rascunho`   
> **Versão:** 0.1.0  
> **Última atualização:** 2026-06-11 
> **Dono da feature:** Jose Julio
> **Tech lead:** Jose Julio
> **Spec de Produto vinculada:** [../product-travel-tracker.md](../product-travel-tracker.md) — §3 (Histórias de Usuário: US-05, US-06, US-08, US-16)  
> **Spec Técnica vinculada:** [../technical-travel-tracker.md](../technical-travel-tracker.md) — FEAT-06, FEAT-08, FEAT-16, FEAT-19  
> **Plataforma:** `Android`   
> **Sprint / Marco:** Sprint 1  
> **Esforço estimado:** [X dias / Y story points]

---

## 1. Resumo da Feature

### 1.1 O Que Esta Feature Faz

Esta feature permite que o usuário visualize os dados detalhados de uma viagem específica. A tela exibe informações básicas da viagem (título, descrição, tipo de transporte, datas de início e fim, status) e oferece opções de ação contextuais baseadas no status da viagem. Para viagens acompanhadas por convite, os dados são exibidos em modo somente leitura, permitindo aceitar ou rejeitar o convite. Para viagens próprias do usuário, a tela oferece ações como alterar dados, ativar/inativar, cancelar, excluir a viagem, enviar convites de acompanhamento e visualizar o mapa com as coordenadas registradas.

### 1.2 Por Que Existe

**Necessidade do usuário:** 
- US-05 (Como viajante, quero cadastrar uma viagem para que ela possa ser acompanhada por outro usuário convidado)
- US-16 (Como usuário convidado, quero obter as coordenadas de uma viagem aceita para que elas possam ser visualizadas em um mapa no aplicativo)
- US-06 (Como viajante, quero alterar as informações de uma viagem para que eu possa corrigir ou atualizar dados de uma viagem cadastrada)
- US-08 (Como viajante, quero ativar uma viagem para que o aplicativo comece a registrar minhas coordenadas)

**Objetivo de negócio:** Objetivo 1 (Permitir que o viajante registre uma viagem no aplicativo) e Objetivo 5 (Permitir que uma pessoa convidada acompanhe a viagem em um mapa)

A feature serve como ponto central de visualização e gerenciamento de uma viagem individual, permitindo que tanto o proprietário quanto os convidados entendam os detalhes da viagem e realizem as ações permitidas conforme seu contexto de acesso.

### 1.3 Escopo

**Dentro do escopo:**
- Exibir dados básicos da viagem (título, descrição, tipo, datas de início e fim, status)
- Exibir status atual da viagem (pendente, ativa, inativa, finalizada, cancelada)
- Exibir opções de ação específicas baseadas no status da viagem para o proprietário
- Exibir convite pendente (se convidado não aceitou/rejeitou) para usuários convidados
- Permitir navegação para tela de alteração de dados da viagem (proprietário apenas)
- Permitir navegação para tela de mapa com coordenadas da viagem
- Permitir navegação para tela de envio de convites (proprietário apenas)
- Exibir botões para ativar, inativar, cancelar ou excluir a viagem (com confirmação)
- Exibir botões para aceitar ou rejeitar convite (convidado apenas)
- Exibir mensagens de status e feedback adequadas (estados de carregamento, erro, vazio)
- Persistência local temporária dos dados da viagem para suporte offline

**Fora do escopo (nesta iteração):**
- Editar dados da viagem nesta tela (ação realizada em feature separada)
- Exibir histórico de alterações ou auditoria da viagem
- Ativar/inativar viagem sem confirmação prévia
- Exibir comentários ou notas associadas à viagem
- Compartilhamento direto via redes sociais
- Exportação de dados da viagem (PDF, CSV, etc.)

---

## 2. Comportamento Visível ao Usuário

### 2.1 Pontos de Entrada

| Ponto de entrada | Gatilho | Pré-condição |
|------------------|---------|--------------|
| Lista **Minhas Viagens** | Usuário toca em uma viagem da lista | Usuário logado, sessão ativa, lista carregada |
| Lista **Viagens Acompanhadas** | Usuário toca em uma viagem acompanhada da lista | Usuário logado, sessão ativa, convite recebido (pendente, aceito) |

### 2.2 Fluxo do Caminho Feliz — Proprietário Visualiza Dados da Viagem

**Pré-condição:** Usuário está autenticado, lista de "Minhas Viagens" foi carregada, usuário possui ao menos uma viagem criada.

1. Usuário está na tela de listagem **Minhas Viagens**.
2. Usuário toca em uma viagem da lista.
3. O app carrega os dados da viagem via API (GET `/trips/{trip_id}`).
4. O app exibe a tela de detalhes com dados básicos: título, descrição, tipo de transporte, data de início, data de fim, status atual.
5. O app exibe status visual da viagem (pendente, ativa, inativa, finalizada, cancelada).
6. O app exibe botões de ação contextuais baseados no status:
   - Se `status == pendente`: botões [Ativar], [Alterar], [Enviar Convite], [Excluir]
   - Se `status == ativa`: botões [Inativar], [Alterar], [Enviar Convite], [Ver Mapa]
   - Se `status == inativa`: botões [Ativar], [Alterar], [Enviar Convite], [Excluir], [Ver Mapa]
   - Se `status == cancelada` ou `finalizada`: botões [Alterar], [Ver Mapa], [Excluir] (apenas leitura de dados)
7. Usuário pode escolher uma ação e executá-la (fluxos alternativos).
8. Se nenhuma ação for escolhida, usuário toca botão **Voltar** ou gesto para retornar à lista **Minhas Viagens**.

**Pós-condição:** Dados da viagem carregados e exibidos, usuário com opções de ação disponíveis.

---

### 2.3 Fluxo do Caminho Feliz — Convidado Visualiza Dados e Responde Convite

**Pré-condição:** Usuário está autenticado, lista de **Viagens Acompanhadas** foi carregada, usuário possui convite pendente ou aceito.

1. Usuário está na tela de listagem **Viagens Acompanhadas**.
2. Usuário toca em uma viagem com convite pendente.
3. O app carrega os dados da viagem via API (GET `/trips/{trip_id}`).
4. O app exibe a tela de detalhes em **modo somente leitura**: título, descrição, tipo, datas, status.
5. O app exibe um indicador de status do convite: "Convite pendente", "Aceito" ou "Rejeitado".
6. Se o convite está **pendente**, o app exibe dois botões:
   - Botão [Aceitar]
   - Botão [Rejeitar]
7. Usuário toca em **Aceitar**.
8. O app exibe uma confirmação ou procede imediatamente.
9. O app envia requisição PUT para `/tracking/{trip_id}/accept`.
10. Se bem-sucedido, o app atualiza o status local para "aceito".
11. O app exibe mensagem de sucesso (toast/snackbar).
12. O app retorna à lista **Viagens Acompanhadas** e exibe a viagem com status atualizado.

**Pós-condição:** Convite aceito, viagem agora aparece como acompanhada com status "aceito", mapa disponível para visualização.

---

### 2.4 Fluxos Alternativos

#### 2.4.1 Ativar uma viagem (Proprietário)
**Gatilho:** Usuário toca botão [Ativar] quando status é `pendente` ou `inativa`.

1. O app exibe um diálogo de confirmação: "Deseja ativar esta viagem? A captura de localização será iniciada."
2. Usuário confirma tocando [Ativar].
3. O app envia requisição PATCH para `/trips/{trip_id}/status` com `status: "ativa"`.
4. Se bem-sucedido, o app atualiza o status local para "ativa".
5. O app exibe mensagem de sucesso: "Viagem ativada com sucesso".
6. O app exibe novo conjunto de botões (Inativar, Alterar, Enviar Convite, Ver Mapa).
7. O app salva a viagem em cache local e marca como "ativa em andamento".

**Falha:** Se a API retornar erro, o app exibe BottomSheet com mensagem de erro e opção de tentar novamente.

---

#### 2.4.2 Inativar uma viagem (Proprietário)
**Gatilho:** Usuário toca botão [Inativar] quando status é `ativa`.

1. O app exibe um diálogo de confirmação: "Deseja pausar esta viagem? A captura de localização será pausada."
2. Usuário confirma tocando [Inativar].
3. O app envia requisição PATCH para `/trips/{trip_id}/status` com `status: "inativa"`.
4. Se bem-sucedido, o app atualiza o status local para "inativa".
5. O app exibe mensagem de sucesso: "Viagem pausada com sucesso".
6. O app exibe novo conjunto de botões (Ativar, Alterar, Enviar Convite, Excluir, Ver Mapa).

---

#### 2.4.3 Cancelar uma viagem (Proprietário)
**Gatilho:** Usuário toca botão [Cancelar] (visível em qualquer status, exceto já cancelada).

1. O app exibe um diálogo de confirmação: "Deseja cancelar esta viagem? Esta ação é irreversível."
2. Usuário confirma tocando [Cancelar].
3. O app envia requisição PATCH para `/trips/{trip_id}/status` com `status: "cancelada"`.
4. Se bem-sucedido, o app atualiza o status local.
5. O app exibe mensagem de sucesso: "Viagem cancelada com sucesso".
6. O app atualiza exibição de botões (modo somente leitura: Alterar, Ver Mapa, Excluir).

---

#### 2.4.4 Excluir uma viagem (Proprietário)
**Gatilho:** Usuário toca botão [Excluir].

1. O app exibe um diálogo de confirmação: "Tem certeza que deseja excluir esta viagem? Esta ação é irreversível."
2. Usuário confirma tocando [Excluir].
3. O app envia requisição DELETE para `/trips/{trip_id}`.
4. Se bem-sucedido, o app remove a viagem do cache local.
5. O app exibe mensagem de sucesso: "Viagem excluída com sucesso".
6. O app navega de volta para a lista **Minhas Viagens** (automaticamente removida da lista).

---

#### 2.4.5 Alterar dados da viagem (Proprietário)
**Gatilho:** Usuário toca botão [Alterar].

1. O app navega para a tela de edição de viagem (feature separada).
2. Usuário edita os dados permitidos (título, descrição, tipo, datas).
3. Usuário toca [Salvar] na tela de edição.
4. Tela de edição envia PATCH para API.
5. Após sucesso, o app retorna para detalhes da viagem.
6. O app recarrega os dados e exibe os campos atualizados.

---

#### 2.4.6 Enviar convite de acompanhamento (Proprietário)
**Gatilho:** Usuário toca botão [Enviar Convite].

1. O app navega para a tela de envio de convites (feature separada).
2. Usuário informa e-mail(s) de convidados.
3. Usuário toca [Enviar].
4. Tela de convites envia requisição POST para `/trips/{trip_id}/invitations`.
5. Após sucesso, o app exibe mensagem de sucesso.
6. O app retorna para detalhes da viagem.

---

#### 2.4.7 Visualizar mapa da viagem
**Gatilho:** Usuário toca botão [Ver Mapa].

1. O app navega para a tela de mapa (feature separada).
2. Se proprietário: exibe coordenadas da própria viagem ativa ou históricas.
3. Se convidado (após aceite): exibe coordenadas compartilhadas pela viagem.
4. Usuário pode ver pontos registrados e última localização conhecida.
5. Usuário toca [Voltar] para retornar aos detalhes da viagem.

---

#### 2.4.8 Rejeitar convite de acompanhamento (Convidado)
**Gatilho:** Usuário toca botão [Rejeitar] quando convite está pendente.

1. O app exibe um diálogo de confirmação: "Deseja rejeitar este convite?"
2. Usuário confirma tocando [Rejeitar].
3. O app envia requisição para rejeitar o convite (ex.: PUT `/tracking/{trip_id}/reject`).
4. Se bem-sucedido, o app remove a viagem da lista de acompanhamento.
5. O app exibe mensagem de sucesso: "Convite rejeitado".
6. O app retorna à lista **Viagens Acompanhadas** (viagem removida da lista).

---

#### 2.4.9 Remover viagem acompanhada (Convidado com convite aceito)
**Gatilho:** Usuário toca botão [Remover do Acompanhamento] (visível quando convite aceito).

1. O app exibe um diálogo de confirmação: "Deseja parar de acompanhar esta viagem?"
2. Usuário confirma.
3. O app envia requisição para remover acompanhamento (ex.: DELETE `/tracking/{trip_id}`).
4. Se bem-sucedido, a viagem é removida do cache local.
5. O app exibe mensagem de sucesso.
6. O app retorna à lista **Viagens Acompanhadas** (viagem removida).

---

#### 2.4.10 Viagem acompanhada — Visualizar dados em modo somente leitura (Convidado)
**Gatilho:** Usuário abre detalhes de viagem acompanhada com convite já aceito.

1. O app carrega e exibe os dados da viagem em modo somente leitura.
2. Campos (título, descrição, tipo, datas) não podem ser editados.
3. Proprietário e participantes não são exibidos nesta versão.
4. Botões disponíveis: [Ver Mapa], [Remover do Acompanhamento], [Voltar].

---

#### 2.4.11 Erro ao carregar dados da viagem
**Gatilho:** API retorna erro (401, 404, 5xx) ao carregar detalhes.

1. O app exibe um BottomSheet de erro com título e mensagem específica.
2. Se erro 401 (não autorizado): "Sua sessão expirou. Faça login novamente."
3. Se erro 404 (não encontrada): "Viagem não encontrada ou foi excluída."
4. Se erro 5xx: "Erro ao carregar dados. Tente novamente em alguns instantes."
5. O app oferece botões: [Entendi] (fecha e retorna) ou [Tentar Novamente] (recarrega).

---

#### 2.4.12 Dados em cache — Modo offline
**Gatilho:** Sem conexão com internet ao abrir detalhes da viagem.

1. O app verifica se os dados da viagem existem no cache local.
2. Se sim, exibe os dados em cache com indicador de "dados locais" ou "offline".
3. Botões de ação que requerem API (Ativar, Inativar, Alterar, Excluir, Enviar Convite) são desabilitados.
4. Botões que funcionam offline (Ver Mapa com dados locais) permanecem habilitados.
5. Banner exibe: "Sem conexão. Os dados podem estar desatualizados."

---

### 2.5 Casos Extremos e Condições de Contorno

| Cenário | Comportamento esperado |
|---------|------------------------|
| Sem rede ao abrir detalhes | Exibir dados em cache (se disponível) com indicador offline. Se não houver cache, exibir banner de erro com opção de retry. |
| Viagem não encontrada (404) | Exibir mensagem de erro em BottomSheet: "Viagem não encontrada ou foi excluída." Botão [Entendi] retorna à lista. |
| Viagem foi excluída por outro dispositivo | Ao tentar ativar/inativar/alterar, API retorna erro 404. Exibir erro e atualizar lista local. |
| Título ou descrição muito longos | Truncar descrição em 3 linhas com "..." e ícone expandível. Título ocupa no máximo 2 linhas. |
| Data de fim = data de início | Permitir visualização mas validação foi feita na criação. Exibir aviso se duração = 0 dias. |
| Convite com status inválido | Se API retorna status não reconhecido, exibir como "Desconhecido" e desabilitar ações. |
| Duas pessoas tentam aceitar/rejeitar o mesmo convite simultaneamente | API retorna erro de convite já respondido. Exibir erro e recarregar lista. |
| Token expirado durante a exibição de detalhes | Ao tentar executar ação, API retorna 401. Exibir erro e oferecer login. |
| Ativar viagem sem permissão de localização concedida | Ao tentar ativar, app valida permissão. Se negada, exibir erro: "Permissão de localização necessária para ativar viagem." |
| Viagem ativa desativada por outro dispositivo | Se dados em cache indicam ativa mas API retorna inativa, atualizar estado e exibir novo conjunto de botões. |
| Viagem com tipo de transporte não reconhecido | Exibir tipo recebido como string, sem falha. Pode ser novo tipo adicionado no servidor. |
| Múltiplas ações simultâneas (botões tocados rapidamente) | Desabilitar todos os botões enquanto uma ação está em processamento (estado carregando). |
| API retorna dados vazios ou nulos | Exibir placeholder ou "—" para campos vazios. Não falhar, permitir visualização de outros dados. |
| Descrição contém caracteres especiais ou emojis | Exibir corretamente respeitando encoding UTF-8. |
| Viagem criada há muito tempo (meses atrás) | Exibir data normalmente. Se status permite, usuário pode ativar (reativar) a viagem. |
| Mapa indisponível ou sem coordenadas | Ao tocar [Ver Mapa] e não houver coordenadas, exibir tela de mapa vazia com mensagem: "Nenhuma coordenada registrada ainda." |

---

## 3. Especificação de UI

### 3.1 Telas / Views Desta Feature

| ID da Tela | Nome | Tipo | Descrição |
|------------|------|------|-----------|
| TLA-01 | Detalhes da Viagem — Proprietário | `push` | Exibe dados da viagem com botões de ação (Ativar, Inativar, Alterar, Enviar Convite, Ver Mapa, Excluir) baseados no status |
| TLA-02 | Detalhes da Viagem — Convidado | `push` | Exibe dados em modo somente leitura com botões para Aceitar/Rejeitar convite ou Remover acompanhamento |
| TLA-03 | Carregamento de Detalhes | `overlay` | Skeleton screens substituem o conteúdo enquanto dados são carregados |
| TLA-04 | Erro ao Carregar | `bottom-sheet` | BottomSheet padrão com mensagem de erro e opções de ação |

### 3.2 Detalhe da Tela — TLA-01: Detalhes da Viagem (Proprietário)

**Nome acessível:** "Detalhes da viagem, tela de informações com opções de ação"

#### Layout

```
┌──────────────────────────────────┐
│  "Detalhes da Viagem"            │
│  Botão Voltar (Back) ← | Ícone   │
├──────────────────────────────────┤
│  ScrollView (Conteúdo)           │
│                                  │
│  ┌──────────────────────────────┐│
│  │  Card — Dados Básicos        ││
│  │                              ││
│  │  Título: "Viagem SP"         ││
│  │  Veículo:  Honda 150         ││
│  │  Status: [Visual Indicador]  ││
│  │  Ativo (badge verde)         ││
│  ├──────────────────────────────┤│
│  │  Card — Datas                ││
│  │                              ││
│  │  Início: 11/06/2026 14:30    ││
│  │  Fim:    15/06/2026 18:00    ││
│  │  Duração: 4 dias 3 horas     ││
│  ├──────────────────────────────┤│
│  │  Descrição (se houver):      ││
│  │  "Viagem para visitar..."    ││
│  │  [Ícone expandir se >3 lin]  ││
│  └──────────────────────────────┘│
│                                  │
│  ┌──────────────────────────────┐│
│  │  Seção de Ações Contextuais  ││
│  │                              ││
│  │  [Botão Ativar]              ││
│  │  [Botão Alterar Dados]       ││
│  │  [Botão Enviar Convite]      ││
│  │  [Botão Ver Mapa]            ││
│  │  [Botão Cancelar] (vermelho) ││
│  │  [Botão Excluir] (cinza)     ││
│  └──────────────────────────────┘│
│                                  │
└──────────────────────────────────┘
```

#### Estados de TLA-01

| Estado | Gatilho | O que muda |
|--------|---------|-----------|
| Carregando | Ao abrir a tela | Exibe TLA-03 (skeleton) |
| Carregado | Dados recebidos da API | Todos os campos renderizados |
| Offline | Sem rede, dados em cache | Exibe dados com banner "Dados locais" |
| Processando Ação | Usuário toca Ativar/Inativar/Excluir/etc | Botões desabilitados, spinner no botão da ação |
| Sucesso (Transitório) | Ação executada com sucesso | Exibe Snackbar "Ação realizada com sucesso", atualiza botões |
| Erro | Falha de ação ou carregamento | Exibe TLA-04 (BottomSheet de erro) |

#### Elementos Interativos — TLA-01

| Elemento | Tipo | Ação | Acessibilidade |
|----------|------|------|---|
| Botão Voltar | IconButton | Navega de volta para Minhas Viagens / Viagens Acompanhadas | "Voltar para lista de viagens" |
| Card Dados Básicos | Card (clicável) | Ao tocar, pode expandir/recolher descrição completa | "Informações básicas da viagem" |
| Indicador Status | Badge/Chip | Exibe status visual (cor + texto): Pendente, Ativa, Inativa, Finalizada, Cancelada | "Status: Ativa" |
| Botão Ativar | MaterialButton (Filled) | Dispara fluxo de ativação com confirmação | "Ativar viagem e iniciar captura de localização" |
| Botão Inativar | MaterialButton (Filled) | Dispara fluxo de inativação com confirmação | "Pausar viagem e parar captura" |
| Botão Alterar Dados | MaterialButton (Outlined) | Navega para tela de edição de viagem | "Alterar dados da viagem" |
| Botão Enviar Convite | MaterialButton (Outlined) | Navega para tela de envio de convites | "Enviar convite de acompanhamento" |
| Botão Ver Mapa | MaterialButton (Outlined) | Navega para tela de mapa | "Visualizar coordenadas no mapa" |
| Botão Cancelar | MaterialButton (Filled, vermelho) | Dispara confirmação de cancelamento | "Cancelar viagem (irreversível)" |
| Botão Excluir | MaterialButton (Outlined, cinza) | Dispara confirmação de exclusão | "Excluir viagem (irreversível)" |
| Ícone Expandir | IconButton | Expande/recolhe descrição se > 3 linhas | "Expandir descrição completa" |
| Banner Offline | MaterialBanner (topo após AppBar) | Exibe apenas quando sem rede | "Sem conexão. Os dados podem estar desatualizados. [Retry]" |

### 3.3 Detalhe da Tela — TLA-02: Detalhes da Viagem (Convidado)

**Nome acessível:** "Detalhes da viagem acompanhada, modo somente leitura"

#### Layout

```
┌──────────────────────────────────┐
│  "Viagem Acompanhada"            │
│  Botão Voltar ←                  │
├──────────────────────────────────┤
│  ScrollView (Conteúdo)           │
│                                  │
│  ┌──────────────────────────────┐│
│  │  Indicador Convite           ││
│  │  "Convite: Pendente"         ││
│  │  ou "Convite: Aceito"        ││
│  │  ou "Convite: Rejeitado"     ││
│  └──────────────────────────────┘│
│                                  │
│  ┌──────────────────────────────┐│
│  │  Card — Dados Básicos        ││
│  │  (Somente leitura)           ││
│  │                              ││
│  │  Título: "Viagem SP"         ││
│  │  Tipo:   Carro               ││
│  │  Status: Ativa               ││
│  ├──────────────────────────────┤│
│  │  Card — Datas                ││
│  │                              ││
│  │  Início: 11/06/2026 14:30    ││
│  │  Fim:    15/06/2026 18:00    ││
│  │  Duração: 4 dias 3 horas     ││
│  ├──────────────────────────────┤│
│  │  Descrição:                  ││
│  │  "Viagem para visitar..."    ││
│  └──────────────────────────────┘│
│                                  │
│  ┌──────────────────────────────┐│
│  │  Seção de Ações              ││
│  │  (Contextuais ao status)     ││
│  │                              ││
│  │  [Botão Aceitar] (verde)     ││
│  │  [Botão Rejeitar] (cinza)    ││
│  │  [Botão Ver Mapa]            ││
│  │  [Botão Remover Acompanhamento] ││
│  └──────────────────────────────┘│
│                                  │
└──────────────────────────────────┘
```

#### Estados de TLA-02

| Estado | Gatilho | O que muda |
|--------|---------|-----------|
| Carregando | Ao abrir a tela | Exibe TLA-03 (skeleton) |
| Convite Pendente | Dados carregados, convite não respondido | Exibe botões [Aceitar], [Rejeitar] |
| Convite Aceito | Convite já aceito anteriormente | Exibe botões [Ver Mapa], [Remover Acompanhamento] |
| Convite Rejeitado | Convite já rejeitado | Tela desabilitada com mensagem "Você rejeitou este convite" e botão [Voltar] |
| Processando Resposta | Usuário toca Aceitar/Rejeitar | Botões desabilitados, spinner |
| Sucesso | Resposta enviada com sucesso | Atualiza estado e exibe Snackbar |
| Erro | Falha ao responder convite | Exibe TLA-04 (BottomSheet de erro) |

#### Elementos Interativos — TLA-02

| Elemento | Tipo | Ação | Acessibilidade |
|----------|------|------|---|
| Botão Voltar | IconButton | Navega de volta para Viagens Acompanhadas | "Voltar para lista de viagens acompanhadas" |
| Badge Convite | Chip | Exibe status: Pendente (laranja), Aceito (verde), Rejeitado (cinza) | "Status do convite: [status]" |
| Card Dados | Card | Não clicável, somente visualização | "Informações da viagem acompanhada" |
| Botão Aceitar | MaterialButton (Filled, verde) | Envia PUT `/tracking/{trip_id}/accept` | "Aceitar este convite de acompanhamento" |
| Botão Rejeitar | MaterialButton (Outlined) | Exibe confirmação, envia rejeição | "Rejeitar este convite" |
| Botão Ver Mapa | MaterialButton (Outlined) | Navega para tela de mapa (apenas se aceito) | "Visualizar coordenadas no mapa" |
| Botão Remover | MaterialButton (Outlined, cinza) | Exibe confirmação, remove acompanhamento | "Parar de acompanhar esta viagem" |

### 3.4 Detalhe da Tela — TLA-03: Carregamento de Detalhes

**Descrição:** Skeleton screens exibem placeholders enquanto dados são carregados.

```
┌──────────────────────────────────┐
│  "Detalhes da Viagem"            │
├──────────────────────────────────┤
│  ScrollView                      │
│                                  │
│  ┌──────────────────────────────┐│
│  │  [Skeleton — Card]           ││
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    ││
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    ││
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    ││
│  └──────────────────────────────┘│
│                                  │
│  ┌──────────────────────────────┐│
│  │  [Skeleton — Card]           ││
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    ││
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    ││
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    ││
│  └──────────────────────────────┘│
│                                  │
│  ┌──────────────────────────────┐│
│  │  [Skeleton — Botões]         ││
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    ││
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    ││
│  └──────────────────────────────┘│
│                                  │
└──────────────────────────────────┘
```

**Comportamento:** Depois de 300ms sem dados, exibe skeleton. ProgressBar (circular ou linear) pode aparecer no AppBar.

### 3.5 Detalhe da Tela — TLA-04: Erro ao Carregar Detalhes

**Tipo:** BottomSheet modal padrão (não AlertDialog)

```
┌──────────────────────────────────┐
│  Tela desabilitada (fundo escuro) │
│          (semi-transparente)      │
├──────────────────────────────────┤
│  ╔════════════════════════════╗  │
│  ║  BottomSheet               ║  │
│  ╟────────────────────────────╢  │
│  ║  Ícone Erro                ║  │
│  ║  (ícone X ou exclamação)   ║  │
│  ║                            ║  │
│  ║  Título:                   ║  │
│  ║  "Erro ao Carregar"        ║  │
│  ║                            ║  │
│  ║  Mensagem (dinâmica):      ║  │
│  ║  "Viagem não encontrada." ║  │
│  ║  ou                        ║  │
│  ║  "Sem conexão com servidor"║  │
│  ║  ou                        ║  │
│  ║  "Sua sessão expirou."     ║  │
│  ║                            ║  │
│  ║  [Entendi] [Tentar Novamente]║  │
│  ║                            ║  │
│  ╚════════════════════════════╝  │
│                                  │
└──────────────────────────────────┘
```

**Mensagens de Erro Específicas:**

| Código de Erro | Título | Mensagem | Ações |
|---|---|---|---|
| 401 | Sessão Expirada | "Sua sessão expirou. Faça login novamente." | [Entendi] (voltar/logout), [Tentar Novamente] |
| 404 | Não Encontrada | "Viagem não encontrada ou foi excluída." | [Entendi] (voltar à lista) |
| 5xx | Erro de Servidor | "Erro ao carregar dados. Tente novamente em alguns instantes." | [Entendi], [Tentar Novamente] |
| Sem rede | Sem Conexão | "Não foi possível conectar ao servidor. Verifique sua internet." | [Entendi], [Tentar Novamente], [Usar Dados Locais] |

### 3.6 Mensagens e Estados de Feedback

| Situação | Tipo de Feedback | Mensagem |
|----------|------------------|----------|
| Dados carregados com sucesso | — | — (tela renderiza) |
| Ativando viagem | Toast/Snackbar | "Ativando viagem..." |
| Viagem ativada com sucesso | Snackbar | "Viagem ativada com sucesso" |
| Inativando viagem | Toast/Snackbar | "Pausando viagem..." |
| Viagem inativada com sucesso | Snackbar | "Viagem pausada com sucesso" |
| Aceitando convite | Toast/Snackbar | "Aceitando convite..." |
| Convite aceito com sucesso | Snackbar | "Convite aceito com sucesso. Você agora está acompanhando." |
| Rejeitando convite | Toast/Snackbar | "Rejeitando convite..." |
| Convite rejeitado com sucesso | Snackbar | "Convite rejeitado com sucesso" |
| Excluindo viagem | Toast/Snackbar | "Excluindo viagem..." |
| Viagem excluída com sucesso | Snackbar | "Viagem excluída com sucesso" |
| Botões desabilitados durante ação | — | Todos os botões com `enabled=false` |
| Múltiplas ações simultâneas tentadas | — | Apenas uma requisição por vez (debounce/throttle) |

### 3.7 Regras de UI

1. **Carregamento:** Após 300ms sem dados, exibir skeleton screens (TLA-03). ProgressBar no AppBar é opcional.
2. **Dados em cache:** Se sem rede, exibir dados em cache com MaterialBanner no topo: "Dados locais — Sem conexão".
3. **AppBar:** Sempre presente com título "Detalhes da Viagem" e botão Voltar. Sem menu adicional nesta tela.
4. **Status Visual:** Badge/Chip colorido com status (Pendente: laranja, Ativa: verde, Inativa: cinza, Finalizada: azul, Cancelada: vermelho).
5. **Cards:** Cada seção (Dados Básicos, Datas, Descrição, Ações) em Card(s) separado(s) com margem de 16dp entre eles.
6. **Descrição:** Se > 3 linhas, truncar com "..." e exibir ícone expandir (↓). Ao tocar, expande até máximo de 10 linhas com ícone colapsar (↑).
7. **Datas:** Sempre no formato DD/MM/YYYY HH:MM (ex.: 11/06/2026 14:30).
8. **Duração:** Calculada automaticamente e exibida como "X dias Y horas" ou "Y horas" se < 1 dia.
9. **Botões Contextuais:** Apenas exibir botões permitidos conforme status e contexto (proprietário vs convidado).
10. **Botão Ativar/Inativar:** Filled (cor primária), largura total do Card.
11. **Botões Alterar/Enviar/Ver Mapa:** Outlined, segunda cor.
12. **Botão Cancelar:** Filled, cor de erro (vermelho).
13. **Botão Excluir:** Outlined, cor de erro (vermelho).
14. **Botão Aceitar:** Filled, cor verde (sucesso).
15. **Botão Rejeitar/Remover:** Outlined, cor de erro ou neutra.
16. **Spinner em Botão:** Durante processamento de ação, exibir ProgressBar circular no botão, textos mudam para "Ativando...", "Salvando...", etc.
17. **Confirmação de Ação Destrutiva:** Diálogos de confirmação (AlertDialog ou BottomSheet) antes de Cancelar, Excluir ou Rejeitar convite.
18. **BottomSheet de Erro:** Nunca usar AlertDialog para erros de API. Sempre usar BottomSheet padrão com ícone, título, mensagem e ações.
19. **Scroll:** ScrollView permite scroll vertical do conteúdo. Se keyboard aberta, comportamento padrão do Android.
20. **Offline Indicator:** Banner exibido apenas quando sem rede E dados em cache disponíveis. Se sem cache, exibir erro em BottomSheet.
21. **Múltiplas Ações:** Desabilitar todos os botões enquanto uma ação está em processamento (debounce por 100ms mínimo).
22. **Navegação:** Botão Voltar sempre disponível (nunca desabilitado). Volta para a lista de origem (Minhas Viagens ou Viagens Acompanhadas).
23. **Convidado — Modo Somente Leitura:** Todos os campos não podem ser clicados. Card pode ter visual diferenciado (fundo levemente cinzento) para indicar readonly.
24. **Dados Vazios:** Se algum campo está vazio (descrição opcionai), exibir placeholder "—" ou omitir a seção.

### 3.8 Catálogo de Componentes Material Design

| Componente | Variante | Configuração | Observações |
|------------|----------|--------------|-------------|
| AppBarLayout + MaterialToolbar | Padrão | Título "Detalhes da Viagem", Voltar button (↕), sem menu | Altura 56dp (padrão) |
| MaterialBanner | Topo | Mensagem "Dados locais — Sem conexão", ícone de aviso, [Retry] | Exibir apenas se offline + cache |
| Card | Elevação padrão | Padding interno 16dp, margem externa 16dp, corner radius 8dp | Um Card por seção |
| Text (Título do Card) | TextAppearance.Material3.HeadlineSmall | Bold, preto, 16sp, margin bottom 8dp | Ex.: "Dados Básicos" |
| Text (Label) | TextAppearance.Material3.BodyMedium | Cor cinzenta (500), 14sp, margin bottom 4dp | Ex.: "Título:" |
| Text (Valor) | TextAppearance.Material3.BodyLarge | Preto, 16sp, pode estar em negrito se importante | Ex.: "Viagem SP" |
| Badge/Chip | Style: Outlined ou Filled | Status: Pendente (laranja), Ativa (verde), Inativa (cinza), Cancelada (vermelho) | Max width 200dp, auto-size |
| MaterialButton (Ativar/Inativar) | Filled | Cor primária (azul), altura 48dp, largura total do Card minus padding | Texto: "Ativar", "Inativar" |
| MaterialButton (Alterar/Enviar/Ver Mapa) | Outlined | Cor primária, altura 48dp, largura total ou 50% + gap | Texto: "Alterar Dados", "Enviar Convite", "Ver Mapa" |
| MaterialButton (Cancelar/Excluir) | Filled/Outlined | Cor de erro (vermelho #F32424), altura 48dp | Ícone opcionalmentá a esquerda |
| MaterialButton (Aceitar) | Filled | Cor verde (sucesso #4CAF50), altura 48dp | Ícone de check opcional |
| IconButton (Voltar) | Padrão | Ícone: ic_arrow_back (24dp) | Sempre acessível |
| IconButton (Expandir Descrição) | Padrão | Ícone: ic_expand_more (24dp), rotaciona ao toggle | Só exibe se descrição > 3 linhas |
| ProgressBar (Circular) | Indeterminado | Tamanho pequeno (20dp), cor primária, exibida no botão durante ação | Substitui texto do botão |
| BottomSheetDialogFragment | Padrão | Altura ~50% da tela (expansível), corner radius 16dp no topo | Usado para erros (TLA-04) |
| Dialog (Confirmação) | AlertDialog ou BottomSheet | Título + mensagem + [Cancelar] [Confirmar] | Para ações destrutivas |
| Snackbar | Padrão com action opcional | Duração 4s (sucesso) ou indeterminada (erro), posição inferior | Mensagens de sucesso/ação |
| ScrollView | Vertical | FillViewport=false, padding 0 | Conteúdo scrollável |
| LinearLayout | Vertical | Padding: top/bottom 16dp, left/right 16dp | Wrapper dos Cards |

---

## 4. Design Técnico

## 4. Design Técnico

### 4.1 Diretriz Técnica — Java + XML

A feature de exibição de detalhes de viagem deve ser implementada com **Fragment Java + layout XML**, observando `LiveData<ShowTripDetailsUiState>` exposto pelo respectivo `ViewModel`. A camada visual renderiza os dados, observa mudanças de estado e dispara eventos de interação. O ViewModel orquestra a busca de dados, validações, ações do usuário (ativar, inativar, excluir, aceitar/rejeitar convite) e transições de estado.

**Arquivos esperados:**

| Tipo | Convenção |
|------|-----------|
| Fragment | `ShowTripDetailsFragment.java` |
| ViewModel | `ShowTripDetailsViewModel.java` |
| Layout da tela | `fragment_show_trip_details.xml` |
| Navegação | `nav_graph.xml` |
| Strings | `res/values/strings.xml` |
| Cores/tema | `res/values/colors.xml`, `themes.xml` |

A implementação deve usar **ViewBinding**, por exemplo `FragmentShowTripDetailsBinding`, evitando `findViewById` repetitivo.

### 4.2 Posicionamento no Módulo

**Módulo:** `features/trips` ou `features/mytrips` (dentro do módulo de gerenciamento de viagens)  
**Novo módulo necessário:** Não (reutiliza módulo de trips/viagens existente)

A feature de exibição de detalhes está no mesmo módulo de criação, edição e listagem de viagens. Compartilha repositórios, DAOs, DTOs e infraestrutura de rede com outras features de viagem.

### 4.3 Decomposição de Componentes / Classes

| Componente | Tipo | Responsabilidade |
|------------|------|-----------------|
| `ShowTripDetailsFragment` | Fragment / Tela XML | Renderiza dados da viagem em Cards, observa ViewModel, dispara eventos de interação (toque em botões). |
| `ShowTripDetailsViewModel` | ViewModel | Mantém `LiveData<ShowTripDetailsUiState>`, `SingleLiveEvent<ShowTripDetailsUiEvent>`, orquestra ações (Ativar, Inativar, Excluir, Aceitar/Rejeitar), emite eventos de navegação. |
| `ShowTripDetailsUiState` | Classe / Data Class | Representa estado visual: dados da viagem, status, indicador de loading, flags de habilitação de botões, modo (proprietário vs convidado). |
| `ShowTripDetailsUiEvent` | Sealed Class | Eventos únicos: `NavigateToMyTrips`, `NavigateToTripEdit`, `NavigateToTripMap`, `NavigateToInviteSend`, `ShowErrorBottomSheet`, `ShowSuccessSnackbar`, `NavigateToFollowedTrips`. |
| `ShowTripDetailsAction` | Sealed Class | Ações do usuário: `LoadTripDetails`, `OnActivateClicked`, `OnInactivateClicked`, `OnCancelClicked`, `OnDeleteClicked`, `OnEditClicked`, `OnSendInviteClicked`, `OnViewMapClicked`, `OnAcceptInviteClicked`, `OnRejectInviteClicked`, `OnRemoveFollowClicked`. |
| `GetTripDetailsUseCase` | Caso de Uso | Busca detalhes de uma viagem (proprietário ou convidado) e retorna entidade de domínio enriquecida. |
| `UpdateTripStatusUseCase` | Caso de Uso | Ativa, inativa ou cancela uma viagem. Coordena chamada à API e persistência local. |
| `DeleteTripUseCase` | Caso de Uso | Deleta uma viagem. Coordena chamada DELETE à API e remoção do cache local. |
| `RespondToInviteUseCase` | Caso de Uso | Aceita ou rejeita um convite de acompanhamento. Coordena chamada à API e atualização local. |
| `RemoveFollowedTripUseCase` | Caso de Uso | Remove uma viagem aceita da lista de acompanhamento do usuário. |
| `TripRepository` | Repositório | Abstrai operações de viagem: buscar por ID, atualizar status, deletar, responder convite, remover acompanhamento. |
| `TripRemoteDataSource` | Fonte de Dados Remota | Realiza chamadas HTTP (GET, PATCH, DELETE, PUT) e converte request/response em DTOs. |
| `TripLocalDataSource` | Fonte de Dados Local | Lê e grava entidades `Trip` em Room, retornando `LiveData<Trip>` ou operações síncronas. |
| `ShowTripDetailsMapper` | Mapper | Converte DTO da API ou entidade Room em entidade de domínio ou ViewModel. |
| `TripEntity` | Entidade Room | Tabela local `trips` com campos id, title, description, type, status, start_date, end_date, created_at, user_id. |
| `InviteEntity` | Entidade Room (opcional) | Tabela local `invites` para rastrear status de convites localmente (se implementado). |
| `StandardConfirmationDialog` | Componente de UI | Dialog de confirmação padrão com título, mensagem e botões [Cancelar], [Confirmar]. |
| `StandardErrorBottomSheet` | Componente de UI | BottomSheet modal padrão com ícone, título, mensagem de erro e ações. |
| `ShowTripDetailsNavigator` | Router / Navigator | Gerencia navegação para telas relacionadas (Editar, Mapa, Enviar Convite, Minhas Viagens, Viagens Acompanhadas). |
| `ConnectivityObserver` | Serviço / Observer | Informa se há conexão com a internet. |
| `TripStatusFormatter` | Formatter | Converte status interno (ativa, inativa, pendente) para string localizadas (ex.: "Ativa", "Pausada"). |
| `DateFormatter` | Formatter | Formata datas em DD/MM/YYYY HH:MM para exibição. |

### 4.4 Fluxo de Dados (MVVM)

```
ShowTripDetailsFragment
  └─► observa ShowTripDetailsViewModel.uiState: LiveData<ShowTripDetailsUiState>
      └─► observa ShowTripDetailsViewModel.uiEvent: SingleLiveEvent<ShowTripDetailsUiEvent>

Carregamento Inicial:
ShowTripDetailsFragment
  └─► ViewModel.loadTripDetails(tripId)
        └─► GetTripDetailsUseCase.execute(tripId)
              └─► TripRepository.getTripById(tripId)
                    ├─► TripRemoteDataSource.getTripDetails() → API GET /trips/{trip_id}
                    │     └─► TripResponseDto → TripEntity (salva em Room)
                    └─► TripLocalDataSource.getById() → Trip (entidade domínio)
              └─► ShowTripDetailsMapper.mapToViewModel() → ShowTripDetailsUiState
              └─► ViewModel emite estado sucesso com dados carregados

Interação do usuário (ex.: Ativar viagem):
ShowTripDetailsFragment
  └─► exibe Dialog de confirmação "Deseja ativar esta viagem?"
      └─► ViewModel.onActivateClicked()
            └─► UpdateTripStatusUseCase.activate(tripId)
                  └─► TripRepository.updateTripStatus(tripId, "ativa")
                        ├─► TripRemoteDataSource.updateStatus() → API PATCH /trips/{trip_id}/status
                        │     └─► TripResponseDto com status atualizado
                        └─► TripLocalDataSource.update() → Room (persistência imediata)
                  └─► Resultado (Success<Trip> ou Error)
            └─► ViewModel emite ShowTripDetailsUiEvent.ShowSuccessSnackbar
            └─► ViewModel atualiza ShowTripDetailsUiState (status atualizado, botões atualizados)

Fragment reage aos eventos:
  ├─► ShowSuccessSnackbar → exibe Snackbar "Viagem ativada com sucesso"
  ├─► NavigateToMyTrips → navega para MyTripsFragment
  ├─► NavigateToTripEdit → navega para EditTripFragment (com tripId)
  ├─► NavigateToTripMap → navega para TripMapFragment (com tripId)
  ├─► NavigateToInviteSend → navega para SendInviteFragment (com tripId)
  └─► ShowErrorBottomSheet → exibe BottomSheetDialogFragment com mensagem de erro
```

### 4.5 Interface Pública (API desta Feature)

A feature não expõe interface pública direta, mas é acionada via Navigation Component:

```java
// No nav_graph.xml:
<fragment
    android:id="@+id/showTripDetailsFragment"
    android:name="com.example.app.features.trips.presentation.ShowTripDetailsFragment"
    android:label="@string/trip_details_title">
    <argument
        android:name="tripId"
        app:argType="string" />
    <argument
        android:name="isOwner"
        app:argType="boolean"
        android:defaultValue="true" />
</fragment>

// Navegação desde MyTripsFragment ou FollowedTripsFragment:
NavController.navigate(
    R.id.action_myTripsFragment_to_showTripDetailsFragment,
    Bundle().apply { putString("tripId", trip.id) }
)
```

### 4.6 Endpoints de API Utilizados

| Endpoint | Método | Autenticação | Corpo/Query | Resposta | Códigos de Erro |
|----------|--------|---|---|---|---|
| `/trips/{trip_id}` | GET | Bearer | — | `TripResponse` | 401, 404, 422, 5xx |
| `/trips/{trip_id}/status` | PATCH | Bearer | `TripStatusRequest` | `TripResponse` | 401, 404, 422, 5xx |
| `/trips/{trip_id}` | DELETE | Bearer | — | — | 401, 404, 422, 5xx |
| `/tracking/{trip_id}/accept` | PUT | Bearer | — | `TrackingResponse` | 401, 404, 422, 5xx |
| `/tracking/{trip_id}/reject` | PUT | Bearer | — | `TrackingResponse` | 401, 404, 422, 5xx |
| `/tracking/{trip_id}` | DELETE | Bearer | — | — | 401, 404, 422, 5xx |

**Contrato de Request:**

```json
// PATCH /trips/{trip_id}/status
{
  "status": "ativa" | "inativa" | "cancelada"
}
```

**Contrato de Response (GET /trips/{trip_id}):**

```json
{
  "id": "uuid",
  "user_id": "uuid",
  "title": "string",
  "description": "string | null",
  "type": "carro" | "moto" | "bike" | "ônibus" | "outro",
  "status": "pendente" | "ativa" | "inativa" | "finalizada" | "cancelada",
  "start_date": "ISO 8601",
  "end_date": "ISO 8601",
  "created_at": "ISO 8601"
}
```

### 4.7 Alterações na Persistência Local

| Tipo de alteração | Entidade / Tabela | Campos | Motivo | Migração necessária |
|-------------------|-------------------|--------|--------|---------------------|
| Já existe | `Trip` | id, user_id, title, description, type, status, start_date, end_date, created_at | Reutiliza entidade criada pela feature Nova Viagem | Não |
| Possível adição | `Invite` (opcional) | id, trip_id, invited_user_id, status, created_at | Rastrear status de convites localmente para offline | Sim (futura) |

**Operações Room esperadas:**

- `TripDao.getById(tripId)` — retorna `LiveData<Trip>`
- `TripDao.update(Trip)` — atualiza viagem existente
- `TripDao.delete(Trip)` — deleta viagem


### 4.9 Tratamento de Erros

| Origem do erro | Tipo de erro | Tratamento | Feedback ao usuário |
|----------------|-------------|------------|---------------------|
| Sem rede | Erro de conectividade | Exibir dados em cache (se disponível) com banner offline. Se sem cache, erro em BottomSheet | BottomSheet: "Sem conexão. Verifique sua internet. [Tentar Novamente] [Usar Dados Locais]" |
| API 401 | Token expirado/inválido | Tentar refresh silencioso; se falhar, emit logout event | BottomSheet: "Sua sessão expirou. Faça login novamente." |
| API 404 | Viagem não encontrada | Remover do cache local, emitir evento de navegação de volta | BottomSheet: "Viagem não encontrada ou foi excluída. [Entendi] (volta)" |
| API 422 | Validação de negócio | Mostrar mensagem retornada pela API | BottomSheet: Mensagem da API |
| API 5xx | Erro de servidor | Log + breadcrumb em analytics, retry com backoff | BottomSheet: "Erro ao carregar dados. Tente novamente em alguns instantes. [Tentar Novamente]" |
| Timeout | Requisição > 30s | Tratar como erro de rede | BottomSheet: "A solicitação demorou muito. [Tentar Novamente]" |
| Ação destrutiva (Delete) | Confirmação necessária | Exibir Dialog com aviso antes de enviar | Dialog: "Tem certeza que deseja excluir? Esta ação é irreversível." |
| Ativar sem permissão de localização | Validação local | Bloquear ativação, exibir erro | BottomSheet: "Permissão de localização necessária para ativar viagem." |

### 4.10 Regras Técnicas

1. O ViewModel não deve acessar diretamente Activity/Fragment, apenas expor observáveis.
2. Fragment observa `uiState` para renderizar e `uiEvent` para ações únicas (navegação, dialogs).
3. Todas as requisições HTTP incluem header `Authorization: Bearer <accessToken>`.
4. Dados carregados via GET `/trips/{trip_id}` são persistidos imediatamente em Room.
5. Se sem rede ao carregar, exibir dados em cache (se existir) com banner offline.
6. Se sem rede ao executar ação (Ativar, Inativar, Excluir), impedir ação e exibir erro em BottomSheet.
7. Enquanto uma ação está processando, desabilitar todos os botões e exibir spinner no botão da ação.
8. Ações destrutivas (Cancelar, Excluir, Rejeitar, Remover) requerem confirmação via Dialog ou BottomSheet.
9. Erros de API devem ser exibidos em BottomSheet modal, nunca em Toast ou AlertDialog inline.
10. BottomSheet de erro oferece [Entendi] (fecha e volta) ou [Tentar Novamente] (recarrega/repete ação).
11. Após sucesso em ação, exibir Snackbar com mensagem ("Viagem ativada com sucesso") e atualizar estado de UI.
12. Status da viagem deve ser exibido com Badge/Chip colorido (Ativa: verde, Inativa: cinza, Cancelada: vermelho).
13. Datas devem ser formatadas como DD/MM/YYYY HH:MM (ex.: 11/06/2026 14:30).
14. Descrição truncável: se > 3 linhas, mostrar com "..." e ícone expandir. Ao expandir, máximo 10 linhas.
15. Proprietário vs Convidado: Flag `isOwner` determina quais botões são exibidos.
16. Se proprietário: exibir [Ativar/Inativar], [Alterar], [Enviar Convite], [Excluir], [Ver Mapa].
17. Se convidado com convite pendente: exibir [Aceitar], [Rejeitar] apenas.
18. Se convidado com convite aceito: exibir [Ver Mapa], [Remover Acompanhamento].
19. Se convidado com convite rejeitado: modo readonly, nenhum botão de ação.
20. Botões contextuais: Ativar/Inativar = Filled (primário), Alterar/Enviar/Mapa = Outlined, Cancelar/Excluir = Filled (erro), Aceitar = Filled (sucesso).

### 4.11 Fluxo Técnico Resumido

1. Fragment carregado, extrai `tripId` e `isOwner` dos argumentos.
2. ViewModel.loadTripDetails(tripId) é chamado.
3. GetTripDetailsUseCase.execute(tripId) busca via GET `/trips/{trip_id}`.
4. Dados são salvos em Room e retornados ao ViewModel.
5. ViewModel atualiza ShowTripDetailsUiState e emite estado via LiveData.
6. Fragment observa LiveData e renderiza dados em Cards, exibe botões contextuais.
7. Usuário toca em botão (ex.: [Ativar]).
8. Fragment exibe Dialog de confirmação.
9. Usuário confirma, ViewModel.onActivateClicked() é chamado.
10. UpdateTripStatusUseCase.activate(tripId) envia PATCH `/trips/{trip_id}/status`.
11. API retorna sucesso com status atualizado.
12. TripLocalDataSource.update() atualiza Room imediatamente.
13. ViewModel atualiza ShowTripDetailsUiState com novo status e botões.
14. Fragment observa mudança e re-renderiza botões.
15. ViewModel emite ShowTripDetailsUiEvent.ShowSuccessSnackbar.
16. Fragment observa evento e exibe Snackbar.
17. Se erro em qualquer ponto: ViewModel emite ShowErrorBottomSheet, Fragment exibe BottomSheet com opção de retry.

### 4.12 Modelos de Request/Response

#### `TripResponse` (GET /trips/{trip_id})

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | UUID | Sim | ID da viagem |
| `user_id` | UUID | Sim | ID do proprietário |
| `title` | String | Sim | Título da viagem (máx 100 caracteres) |
| `description` | String | Não | Descrição (máx 500 caracteres) |
| `type` | String | Sim | Tipo: carro, moto, bike, ônibus, outro |
| `status` | String | Sim | Status: pendente, ativa, inativa, finalizada, cancelada |
| `start_date` | ISO 8601 | Sim | Data/hora de início em UTC |
| `end_date` | ISO 8601 | Sim | Data/hora de fim em UTC |
| `created_at` | ISO 8601 | Sim | Timestamp de criação |

#### `TripStatusRequest` (PATCH /trips/{trip_id}/status)

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `status` | String | Sim | Novo status: ativa, inativa, cancelada |

---

## 5. Eventos de Analytics

| Nome do evento | Gatilho | Propriedades | Observações |
|----------------|---------|--------------|-------------|
| `show_trip_details_visualizado` | Tela de detalhes é aberta | `trip_id: String`, `origem: String` (ex.: "my_trips_list", "followed_trips_list"), `is_owner: Boolean`, `trip_status: String`, `timestamp: Long` | Disparado ao carregar detalhes com sucesso |
| `show_trip_details_carregamento_iniciado` | Requisição GET para buscar detalhes é iniciada | `trip_id: String`, `é_proprietário: Boolean`, `timestamp: Long` | Marca início do carregamento |
| `show_trip_details_carregamento_completo` | Dados carregados com sucesso | `trip_id: String`, `duracao_carregamento_ms: Long`, `origem_dados: String` (ex.: "api", "cache_local"), `timestamp: Long` | Rastreia performance |
| `show_trip_details_carregamento_falhou` | Falha ao carregar detalhes | `trip_id: String`, `codigo_erro: String` (ex.: "401", "404", "5xx", "timeout", "sem_conexao"), `tipo_erro: String`, `duracao_ms: Long`, `timestamp: Long` | Ajuda diagnosticar problemas |
| `show_trip_details_ativar_tocado` | Usuário toca botão [Ativar] | `trip_id: String`, `trip_status_antes: String`, `timestamp: Long` | Rastreia tentativa de ativação |
| `show_trip_details_inativar_tocado` | Usuário toca botão [Inativar] | `trip_id: String`, `trip_status_antes: String`, `timestamp: Long` | Rastreia tentativa de inativação |
| `show_trip_details_cancelar_tocado` | Usuário toca botão [Cancelar] | `trip_id: String`, `trip_status_antes: String`, `timestamp: Long` | Rastreia tentativa de cancelamento |
| `show_trip_details_excluir_tocado` | Usuário toca botão [Excluir] | `trip_id: String`, `trip_status_antes: String`, `timestamp: Long` | Rastreia tentativa de exclusão |
| `show_trip_details_alterar_tocado` | Usuário toca botão [Alterar Dados] | `trip_id: String`, `timestamp: Long` | Rastreia navegação para edição |
| `show_trip_details_enviar_convite_tocado` | Usuário toca botão [Enviar Convite] | `trip_id: String`, `timestamp: Long` | Rastreia navegação para envio de convite |
| `show_trip_details_ver_mapa_tocado` | Usuário toca botão [Ver Mapa] | `trip_id: String`, `timestamp: Long` | Rastreia navegação para mapa |
| `show_trip_details_ativar_iniciado` | Requisição PATCH para ativar é enviada | `trip_id: String`, `timestamp: Long` | Marca início da ação |
| `show_trip_details_ativar_sucesso` | Viagem ativada com sucesso | `trip_id: String`, `duracao_ms: Long`, `timestamp: Long` | Rastreia conclusão bem-sucedida |
| `show_trip_details_ativar_falhou` | Falha ao ativar viagem | `trip_id: String`, `codigo_erro: String`, `tipo_erro: String`, `duracao_ms: Long`, `tentativa_numero: Int`, `timestamp: Long` | Ajuda diagnosticar falhas |
| `show_trip_details_inativar_iniciado` | Requisição PATCH para inativar é enviada | `trip_id: String`, `timestamp: Long` | Marca início da ação |
| `show_trip_details_inativar_sucesso` | Viagem inativada com sucesso | `trip_id: String`, `duracao_ms: Long`, `timestamp: Long` | Rastreia conclusão bem-sucedida |
| `show_trip_details_inativar_falhou` | Falha ao inativar viagem | `trip_id: String`, `codigo_erro: String`, `tipo_erro: String`, `duracao_ms: Long`, `timestamp: Long` | Ajuda diagnosticar falhas |
| `show_trip_details_cancelar_confirmado` | Usuário confirma cancelamento no dialog | `trip_id: String`, `timestamp: Long` | Rastreia confirmação explícita |
| `show_trip_details_cancelar_iniciado` | Requisição PATCH para cancelar é enviada | `trip_id: String`, `timestamp: Long` | Marca início da ação |
| `show_trip_details_cancelar_sucesso` | Viagem cancelada com sucesso | `trip_id: String`, `duracao_ms: Long`, `timestamp: Long` | Rastreia conclusão bem-sucedida |
| `show_trip_details_cancelar_falhou` | Falha ao cancelar viagem | `trip_id: String`, `codigo_erro: String`, `tipo_erro: String`, `duracao_ms: Long`, `timestamp: Long` | Ajuda diagnosticar falhas |
| `show_trip_details_excluir_confirmado` | Usuário confirma exclusão no dialog | `trip_id: String`, `timestamp: Long` | Rastreia confirmação explícita |
| `show_trip_details_excluir_iniciado` | Requisição DELETE para excluir é enviada | `trip_id: String`, `timestamp: Long` | Marca início da ação |
| `show_trip_details_excluir_sucesso` | Viagem excluída com sucesso | `trip_id: String`, `duracao_ms: Long`, `timestamp: Long` | Rastreia conclusão bem-sucedida |
| `show_trip_details_excluir_falhou` | Falha ao excluir viagem | `trip_id: String`, `codigo_erro: String`, `tipo_erro: String`, `duracao_ms: Long`, `timestamp: Long` | Ajuda diagnosticar falhas |
| `show_trip_details_aceitar_convite_tocado` | Usuário toca botão [Aceitar] (convidado) | `trip_id: String`, `timestamp: Long` | Rastreia tentativa de aceitação |
| `show_trip_details_aceitar_convite_confirmado` | Usuário confirma aceite do convite | `trip_id: String`, `timestamp: Long` | Rastreia confirmação explícita (se houver dialog) |
| `show_trip_details_aceitar_convite_iniciado` | Requisição PUT para aceitar é enviada | `trip_id: String`, `timestamp: Long` | Marca início da ação |
| `show_trip_details_aceitar_convite_sucesso` | Convite aceito com sucesso | `trip_id: String`, `duracao_ms: Long`, `timestamp: Long` | Rastreia conclusão bem-sucedida |
| `show_trip_details_aceitar_convite_falhou` | Falha ao aceitar convite | `trip_id: String`, `codigo_erro: String`, `tipo_erro: String`, `duracao_ms: Long`, `timestamp: Long` | Ajuda diagnosticar falhas |
| `show_trip_details_rejeitar_convite_tocado` | Usuário toca botão [Rejeitar] (convidado) | `trip_id: String`, `timestamp: Long` | Rastreia tentativa de rejeição |
| `show_trip_details_rejeitar_convite_confirmado` | Usuário confirma rejeição no dialog | `trip_id: String`, `timestamp: Long` | Rastreia confirmação explícita |
| `show_trip_details_rejeitar_convite_iniciado` | Requisição PUT/DELETE para rejeitar é enviada | `trip_id: String`, `timestamp: Long` | Marca início da ação |
| `show_trip_details_rejeitar_convite_sucesso` | Convite rejeitado com sucesso | `trip_id: String`, `duracao_ms: Long`, `timestamp: Long` | Rastreia conclusão bem-sucedida |
| `show_trip_details_rejeitar_convite_falhou` | Falha ao rejeitar convite | `trip_id: String`, `codigo_erro: String`, `tipo_erro: String`, `duracao_ms: Long`, `timestamp: Long` | Ajuda diagnosticar falhas |
| `show_trip_details_remover_acompanhamento_tocado` | Usuário toca [Remover Acompanhamento] (convidado aceito) | `trip_id: String`, `timestamp: Long` | Rastreia tentativa de remoção |
| `show_trip_details_remover_acompanhamento_confirmado` | Usuário confirma remoção no dialog | `trip_id: String`, `timestamp: Long` | Rastreia confirmação explícita |
| `show_trip_details_remover_acompanhamento_iniciado` | Requisição DELETE para remover é enviada | `trip_id: String`, `timestamp: Long` | Marca início da ação |
| `show_trip_details_remover_acompanhamento_sucesso` | Acompanhamento removido com sucesso | `trip_id: String`, `duracao_ms: Long`, `timestamp: Long` | Rastreia conclusão bem-sucedida |
| `show_trip_details_remover_acompanhamento_falhou` | Falha ao remover acompanhamento | `trip_id: String`, `codigo_erro: String`, `tipo_erro: String`, `duracao_ms: Long`, `timestamp: Long` | Ajuda diagnosticar falhas |
| `show_trip_details_erro_bottomsheet_exibido` | BottomSheet de erro é exibido | `trip_id: String`, `codigo_erro: String`, `tipo_erro: String`, `acao_que_falhou: String` (ex.: "carregar", "ativar", "aceitar_convite"), `tem_botao_retry: Boolean`, `timestamp: Long` | Rastreia erros visualizados |
| `show_trip_details_erro_retry_tocado` | Usuário toca [Tentar Novamente] no BottomSheet | `trip_id: String`, `codigo_erro: String`, `tipo_erro: String`, `acao_que_falhou: String`, `tentativa_numero: Int`, `timestamp: Long` | Rastreia tentativas de retry |
| `show_trip_details_dados_locais_exibidos` | Dados em cache são exibidos (offline) | `trip_id: String`, `origem_dados: String` (sempre "cache_local"), `tem_internet_agora: Boolean`, `timestamp: Long` | Rastreia uso de cache offline |
| `show_trip_details_confirmacao_dialog_exibido` | Dialog de confirmação é exibido | `trip_id: String`, `tipo_confirmacao: String` (ex.: "ativar", "cancelar", "excluir", "rejeitar"), `timestamp: Long` | Rastreia diálogos mostrados |
| `show_trip_details_confirmacao_cancelado` | Usuário cancela confirmação (toca Cancelar no dialog) | `trip_id: String`, `tipo_confirmacao: String`, `timestamp: Long` | Rastreia cancelamentos de ações |
| `show_trip_details_descricao_expandida` | Usuário expande descrição truncada | `trip_id: String`, `descricao_tamanho_caracteres: Int`, `timestamp: Long` | Rastreia interação com UI |
| `show_trip_details_descricao_recolhida` | Usuário recolhe descrição expandida | `trip_id: String`, `timestamp: Long` | Rastreia interação com UI |
| `show_trip_details_sessao_expirada` | Sessão expira durante exibição de detalhes ou ação | `trip_id: String`, `tempo_decorrido_ms: Long`, `acao_em_andamento: String` (ex.: "none", "ativar", "aceitar_convite"), `timestamp: Long` | Rastreia eventos de segurança |
| `show_trip_details_permissao_localizacao_negada` | Usuário nega permissão de localização ao tentar ativar | `trip_id: String`, `timestamp: Long` | Rastreia bloqueios de permission |
| `show_trip_details_voltou` | Usuário toca Voltar ou gesto de retorno | `trip_id: String`, `duracao_visualizacao_ms: Long`, `origem_navegacao: String` (ex.: "voltar_para_my_trips", "voltar_para_followed_trips"), `timestamp: Long` | Rastreia saída da tela |

### Regras de Analytics

1. Não enviar dados sensíveis (título completo, descrição, localizações) nos eventos.
2. Enviar apenas IDs, enums, status, timestamps e métricas de duração.
3. Evento `show_trip_details_visualizado` deve ser disparado somente após carregamento bem-sucedido.
4. Eventos de ação (`*_iniciado`) devem ser disparados ANTES da requisição HTTP.
5. Eventos de sucesso (`*_sucesso`) devem ser disparados APÓS persistência bem-sucedida em Room.
6. Duração (`duracao_ms`) deve medir tempo desde início da ação até resposta final.
7. Erros (`*_falhou`) devem registrar apenas código e categoria, não mensagens completas.
8. `tentativa_numero` deve incrementar em cada retry dentro da mesma sessão.
9. Eventos de confirmação (`*_confirmado`) indicam que usuário passou pela confirmação e aprovou.
10. Eventos de cancelamento (`confirmacao_cancelado`) indicam que usuário rejeitou a ação.
11. Evento `mostrado_dados_locais` só dispara quando cache disponível e sem conexão.
12. Evento `sessao_expirada` dispara quando API retorna 401 durante qualquer operação.
13. Não disparar múltiplos eventos para a mesma ação (ex.: não enviar both `*_iniciado` e `*_sucesso` se falhar).
14. `tipo_confirmacao` deve usar enum padronizado ("ativar", "inativar", "cancelar", "excluir", "aceitar", "rejeitar", "remover").
15. Tempo de espera não deve incluir latência de rede crônica (medir apenas ações do usuário + processamento local).

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

**Arquivo de strings / recurso:** `res/values/strings.xml`

| Chave | Padrão (PT-BR) | Observações |
|-------|----------------|-------------|
| `show_trip_details.titulo` | "Detalhes da Viagem" | Título da tela no AppBar |
| `show_trip_details.titulo_viagem_acompanhada` | "Viagem Acompanhada" | Título alternativo para modo convidado |
| `show_trip_details.acessibilidade.tela` | "Tela de detalhes da viagem com opções de ação" | Nome acessível da tela |
| `show_trip_details.acessibilidade.voltar` | "Voltar para lista de viagens" | Rótulo acessível do botão voltar |
| `show_trip_details.secao.dados_basicos` | "Dados Básicos" | Título da seção de dados |
| `show_trip_details.secao.datas` | "Datas" | Título da seção de datas |
| `show_trip_details.secao.acoes` | "Ações" | Título da seção de botões de ação |
| `show_trip_details.label.titulo` | "Título" | Label do campo título |
| `show_trip_details.label.tipo` | "Tipo de Transporte" | Label do campo tipo |
| `show_trip_details.label.status` | "Status" | Label do campo status |
| `show_trip_details.label.descricao` | "Descrição" | Label do campo descrição |
| `show_trip_details.label.data_inicio` | "Início" | Label da data de início |
| `show_trip_details.label.data_fim` | "Fim" | Label da data de fim |
| `show_trip_details.label.duracao` | "Duração" | Label da duração |
| `show_trip_details.label.convite_status` | "Status do Convite" | Label para status do convite (convidado) |
| `show_trip_details.descricao_vazia` | "Sem descrição" | Placeholder se descrição não preenchida |
| `show_trip_details.expandir_descricao` | "Expandir" | Texto do ícone de expansão |
| `show_trip_details.recolher_descricao` | "Recolher" | Texto do ícone de recolhimento |
| `show_trip_details.status.pendente` | "Pendente" | Status: pendente |
| `show_trip_details.status.ativa` | "Ativa" | Status: ativa |
| `show_trip_details.status.inativa` | "Pausada" | Status: inativa |
| `show_trip_details.status.finalizada` | "Finalizada" | Status: finalizada |
| `show_trip_details.status.cancelada` | "Cancelada" | Status: cancelada |
| `show_trip_details.invitestatus.pendente` | "Convite Pendente" | Status do convite: pendente |
| `show_trip_details.invitestatus.aceito` | "Aceito" | Status do convite: aceito |
| `show_trip_details.invitestatus.rejeitado` | "Rejeitado" | Status do convite: rejeitado |
| `show_trip_details.tipo.carro` | "Carro" | Tipo de transporte: carro |
| `show_trip_details.tipo.moto` | "Moto" | Tipo de transporte: moto |
| `show_trip_details.tipo.bike` | "Bike" | Tipo de transporte: bike |
| `show_trip_details.tipo.onibus` | "Ônibus" | Tipo de transporte: ônibus |
| `show_trip_details.tipo.outro` | "Outro" | Tipo de transporte: outro |
| `show_trip_details.duracao_template` | "%d dias %d horas" | Template de duração (ex: "4 dias 3 horas") |
| `show_trip_details.duracao_horas_template` | "%d horas" | Template de duração se < 1 dia |
| `show_trip_details.botao.ativar` | "Ativar" | Botão [Ativar viagem] |
| `show_trip_details.botao.inativar` | "Pausar" | Botão [Inativar viagem] |
| `show_trip_details.botao.ativando` | "Ativando..." | Texto durante ativação |
| `show_trip_details.botao.inativando` | "Pausando..." | Texto durante inativação |
| `show_trip_details.botao.alterar` | "Alterar Dados" | Botão [Alterar Dados] |
| `show_trip_details.botao.enviar_convite` | "Enviar Convite" | Botão [Enviar Convite] |
| `show_trip_details.botao.ver_mapa` | "Ver Mapa" | Botão [Ver Mapa] |
| `show_trip_details.botao.cancelar` | "Cancelar Viagem" | Botão [Cancelar viagem] |
| `show_trip_details.botao.cancelando` | "Cancelando..." | Texto durante cancelamento |
| `show_trip_details.botao.excluir` | "Excluir" | Botão [Excluir viagem] |
| `show_trip_details.botao.excluindo` | "Excluindo..." | Texto durante exclusão |
| `show_trip_details.botao.aceitar` | "Aceitar" | Botão [Aceitar convite] |
| `show_trip_details.botao.aceitando` | "Aceitando..." | Texto durante aceitação |
| `show_trip_details.botao.rejeitar` | "Rejeitar" | Botão [Rejeitar convite] |
| `show_trip_details.botao.rejeitando` | "Rejeitando..." | Texto durante rejeição |
| `show_trip_details.botao.remover_acompanhamento` | "Remover Acompanhamento" | Botão [Remover do acompanhamento] |
| `show_trip_details.botao.removendo` | "Removendo..." | Texto durante remoção |
| `show_trip_details.botao.entendi` | "Entendi" | Botão BottomSheet de erro |
| `show_trip_details.botao.tentar_novamente` | "Tentar Novamente" | Botão BottomSheet de erro (retry) |
| `show_trip_details.botao.usar_dados_locais` | "Usar Dados Locais" | Botão BottomSheet para modo offline |
| `show_trip_details.botao.voltar` | "Voltar" | Botão de voltar (AppBar) |
| `show_trip_details.confirmacao.ativar.titulo` | "Ativar Viagem?" | Título do dialog de confirmação |
| `show_trip_details.confirmacao.ativar.mensagem` | "Deseja ativar esta viagem? A captura de localização será iniciada." | Mensagem do dialog |
| `show_trip_details.confirmacao.inativar.titulo` | "Pausar Viagem?" | Título do dialog de confirmação |
| `show_trip_details.confirmacao.inativar.mensagem` | "Deseja pausar esta viagem? A captura de localização será pausada." | Mensagem do dialog |
| `show_trip_details.confirmacao.cancelar.titulo` | "Cancelar Viagem?" | Título do dialog de confirmação |
| `show_trip_details.confirmacao.cancelar.mensagem` | "Deseja cancelar esta viagem? Esta ação é irreversível." | Mensagem do dialog |
| `show_trip_details.confirmacao.excluir.titulo` | "Excluir Viagem?" | Título do dialog de confirmação |
| `show_trip_details.confirmacao.excluir.mensagem` | "Tem certeza que deseja excluir esta viagem? Esta ação é irreversível." | Mensagem do dialog |
| `show_trip_details.confirmacao.rejeitar.titulo` | "Rejeitar Convite?" | Título do dialog de confirmação (convidado) |
| `show_trip_details.confirmacao.rejeitar.mensagem` | "Deseja rejeitar este convite? Você não poderá acompanhar esta viagem." | Mensagem do dialog |
| `show_trip_details.confirmacao.remover.titulo` | "Remover Acompanhamento?" | Título do dialog de confirmação (convidado) |
| `show_trip_details.confirmacao.remover.mensagem` | "Deseja parar de acompanhar esta viagem?" | Mensagem do dialog |
| `show_trip_details.confirmacao.botao.confirmar` | "Confirmar" | Botão de confirmação (genérico) |
| `show_trip_details.confirmacao.botao.cancelamento` | "Cancelar" | Botão para cancelar ação |
| `show_trip_details.erro.titulo` | "Erro ao Carregar" | Título genérico do BottomSheet de erro |
| `show_trip_details.erro.sessao_expirada.titulo` | "Sessão Expirada" | Título para erro 401 |
| `show_trip_details.erro.sessao_expirada.mensagem` | "Sua sessão expirou. Faça login novamente para continuar." | Mensagem para erro 401 |
| `show_trip_details.erro.nao_encontrada.titulo` | "Viagem Não Encontrada" | Título para erro 404 |
| `show_trip_details.erro.nao_encontrada.mensagem` | "Viagem não foi encontrada ou foi excluída." | Mensagem para erro 404 |
| `show_trip_details.erro.sem_conexao.titulo` | "Sem Conexão" | Título para erro de conectividade |
| `show_trip_details.erro.sem_conexao.mensagem` | "Não foi possível conectar ao servidor. Verifique sua internet." | Mensagem para erro de conectividade |
| `show_trip_details.erro.timeout.titulo` | "Tempo de Resposta Excedido" | Título para timeout |
| `show_trip_details.erro.timeout.mensagem` | "O servidor demorou para responder. Tente novamente em alguns instantes." | Mensagem para timeout |
| `show_trip_details.erro.validacao.titulo` | "Dados Inválidos" | Título para erro 422 |
| `show_trip_details.erro.validacao.mensagem` | "Os dados da viagem são inválidos. Verifique e tente novamente." | Mensagem para erro 422 |
| `show_trip_details.erro.servidor.titulo` | "Erro no Servidor" | Título para erro 5xx |
| `show_trip_details.erro.servidor.mensagem` | "Erro ao processar sua solicitação. Tente novamente em alguns instantes." | Mensagem para erro 5xx |
| `show_trip_details.erro.permissao_localizacao.titulo` | "Permissão Necessária" | Título para erro de permissão |
| `show_trip_details.erro.permissao_localizacao.mensagem` | "Permissão de localização é necessária para ativar uma viagem." | Mensagem para erro de permissão |
| `show_trip_details.sucesso.ativar` | "Viagem ativada com sucesso" | Mensagem de sucesso (Snackbar) |
| `show_trip_details.sucesso.inativar` | "Viagem pausada com sucesso" | Mensagem de sucesso (Snackbar) |
| `show_trip_details.sucesso.cancelar` | "Viagem cancelada com sucesso" | Mensagem de sucesso (Snackbar) |
| `show_trip_details.sucesso.excluir` | "Viagem excluída com sucesso" | Mensagem de sucesso (Snackbar) |
| `show_trip_details.sucesso.aceitar_convite` | "Convite aceito com sucesso. Você agora está acompanhando." | Mensagem de sucesso (Snackbar) |
| `show_trip_details.sucesso.rejeitar_convite` | "Convite rejeitado com sucesso" | Mensagem de sucesso (Snackbar) |
| `show_trip_details.sucesso.remover_acompanhamento` | "Acompanhamento removido com sucesso" | Mensagem de sucesso (Snackbar) |
| `show_trip_details.offline.indicador` | "Dados Locais — Sem Conexão" | Texto do MaterialBanner offline |
| `show_trip_details.offline.botao_retry` | "Tentar" | Botão de retry no banner offline |
| `show_trip_details.acessibilidade.status_badge` | "Status: %s" | Rótulo acessível para badge de status (ex: "Status: Ativa") |
| `show_trip_details.acessibilidade.data_inicio` | "Data de início: %s" | Rótulo acessível (ex: "Data de início: 11/06/2026 14:30") |
| `show_trip_details.acessibilidade.data_fim` | "Data de fim: %s" | Rótulo acessível |
| `show_trip_details.acessibilidade.duracao` | "Duração: %s" | Rótulo acessível |
| `show_trip_details.acessibilidade.botao_ativar` | "Ativar viagem e iniciar captura de localização" | Rótulo acessível expandido |
| `show_trip_details.acessibilidade.botao_inativar` | "Pausar viagem e parar captura de localização" | Rótulo acessível expandido |
| `show_trip_details.acessibilidade.botao_alterar` | "Alterar dados da viagem" | Rótulo acessível expandido |
| `show_trip_details.acessibilidade.botao_enviar_convite` | "Enviar convite de acompanhamento" | Rótulo acessível expandido |
| `show_trip_details.acessibilidade.botao_ver_mapa` | "Visualizar coordenadas no mapa" | Rótulo acessível expandido |
| `show_trip_details.acessibilidade.botao_cancelar` | "Cancelar viagem (irreversível)" | Rótulo acessível expandido |
| `show_trip_details.acessibilidade.botao_excluir` | "Excluir viagem (irreversível)" | Rótulo acessível expandido |
| `show_trip_details.acessibilidade.botao_aceitar` | "Aceitar convite de acompanhamento" | Rótulo acessível expandido |
| `show_trip_details.acessibilidade.botao_rejeitar` | "Rejeitar convite" | Rótulo acessível expandido |
| `show_trip_details.acessibilidade.botao_remover` | "Remover viagem da lista de acompanhamento" | Rótulo acessível expandido |
| `show_trip_details.acessibilidade.erro_bottomsheet` | "Mensagem de erro. Use os botões para ação." | Rótulo acessível do BottomSheet |
| `show_trip_details.acessibilidade.loading` | "Carregando detalhes da viagem, aguarde" | Mensagem durante carregamento |
| `show_trip_details.acessibilidade.salvando` | "Salvando alterações, aguarde" | Mensagem durante processamento de ação |

**Layout RTL:** Não obrigatório (app em PT-BR)  
**Formatação de data/número:** Usa locale do sistema Android (SimpleDateFormat com padrão dd/MM/yyyy HH:mm)

---

## 9. Definição de Pronto (Definition of Done)

### Critérios de Aceite (Spec de Produto)

- [ ] **US-05:** Usuário consegue visualizar dados de uma viagem cadastrada (proprietário)
- [ ] **US-06:** Usuário consegue acessar opção de alterar dados da viagem desde tela de detalhes
- [ ] **US-08:** Usuário consegue ativar uma viagem com confirmação prévia
- [ ] **US-10:** Usuário consegue inativar uma viagem com confirmação prévia
- [ ] **US-11:** Usuário consegue cancelar uma viagem com confirmação prévia
- [ ] **US-07:** Usuário consegue excluir uma viagem com confirmação prévia
- [ ] **US-12:** Usuário consegue acessar opção de enviar convite desde tela de detalhes
- [ ] **US-13:** Usuário convidado consegue aceitar convite com feedback visual
- [ ] **US-14:** Usuário convidado consegue rejeitar convite com confirmação
- [ ] **US-15:** Usuário convidado consegue remover viagem aceita do acompanhamento
- [ ] **US-16:** Usuário convidado consegue navegar para mapa da viagem desde detalhes
- [ ] **US-17:** Dados carregados exibem última informação conhecida (offline/cache)

### Implementação Técnica

- [ ] Fragment `ShowTripDetailsFragment` implementado em Java + XML layout
- [ ] ViewModel `ShowTripDetailsViewModel` com `LiveData<ShowTripDetailsUiState>` e `SingleLiveEvent<ShowTripDetailsUiEvent>`
- [ ] 5 UseCases implementados (GetTripDetails, UpdateTripStatus, DeleteTrip, RespondToInvite, RemoveFollowedTrip)
- [ ] TripRepository com suporte a GET, PATCH, DELETE, PUT
- [ ] Mappers convertendo DTO → Entidade → ViewModel
- [ ] ViewBinding implementado (sem `findViewById`)
- [ ] Navigation Component integrado com argumentos tripId e isOwner
- [ ] 6 Endpoints de API integrados com tratamento de erros

### Persistência Local

- [ ] Entidade `Trip` reutilizada do Room database
- [ ] TripDao com métodos: getById(), update(), delete()
- [ ] Dados carregados salvos imediatamente em Room após sucesso
- [ ] Lógica de leitura/escrita em background threads (ExecutorService)
- [ ] Dados em cache exibidos com indicador offline quando sem rede
- [ ] Suporte a modo offline (cache local disponível)

### Interface de Usuário

- [ ] **TLA-01 (Proprietário):** Cards com dados básicos, datas, duração, descrição (expandível)
- [ ] **TLA-02 (Convidado):** Modo somente leitura com status do convite
- [ ] **TLA-03:** Skeleton screens exibidos após 300ms sem dados
- [ ] **TLA-04:** BottomSheet modal para erros (nunca AlertDialog inline)
- [ ] **Status Visual:** Badge/Chip colorido (Ativa: verde, Inativa: cinza, Cancelada: vermelho)
- [ ] **Botões contextuais:** Exibidos conforme status e contexto (proprietário vs convidado)
- [ ] **AppBar:** Sempre com título e botão voltar (nunca desabilitado)
- [ ] **Datas:** Formatadas em DD/MM/YYYY HH:MM
- [ ] **Descrição:** Truncável em 3 linhas com ícone expandir
- [ ] **Spinner em botão:** Durante processamento de ação
- [ ] **MaterialBanner:** Exibido quando modo offline (dados em cache disponível)
- [ ] **Snackbar:** Exibido após sucesso de ação
- [ ] **Dialogs de confirmação:** Para ações destrutivas (Cancelar, Excluir, Rejeitar, Remover)

### Comportamentos e Fluxos

- [ ] Carregamento de dados via GET `/trips/{trip_id}` com tratamento de erro
- [ ] Ativação de viagem com confirmação, PATCH para `/trips/{trip_id}/status` 
- [ ] Inativação de viagem com confirmação, PATCH para `/trips/{trip_id}/status`
- [ ] Cancelamento de viagem com confirmação, PATCH para `/trips/{trip_id}/status`
- [ ] Exclusão de viagem com confirmação, DELETE para `/trips/{trip_id}`
- [ ] Aceite de convite com PUT para `/tracking/{trip_id}/accept`
- [ ] Rejeição de convite com confirmação, PUT/DELETE para `/tracking/{trip_id}/reject`
- [ ] Remoção de acompanhamento com confirmação, DELETE para `/tracking/{trip_id}`
- [ ] Navegação para edição, mapa e envio de convites (features separadas)
- [ ] Todas as ações requerem header `Authorization: Bearer <token>`
- [ ] Refresh silencioso de token em caso de 401, logout se falhar
- [ ] Desabilitação de botões durante processamento de ação (debounce)
- [ ] Dados preenchidos preservados após erro para retry

### Tratamento de Erros

- [ ] Erro 401 (token expirado): Retry com refresh, logout se falhar
- [ ] Erro 404 (viagem não encontrada): Mensagem em BottomSheet, volta à lista
- [ ] Erro 422 (validação): Mensagem específica da API em BottomSheet
- [ ] Erro 5xx (servidor): Mensagem genérica com retry
- [ ] Timeout (> 30s): Tratado como erro de rede
- [ ] Sem rede: Exibir cache local (se disponível) ou erro em BottomSheet
- [ ] Permissão de localização negada: Bloqueio de ativação com mensagem
- [ ] BottomSheet oferece [Entendi] ou [Tentar Novamente]
- [ ] Logs registrados para todos os erros em Crashlytics
- [ ] Breadcrumbs de erro adiciona contexto (ação, status, duração)

### Analytics

- [ ] 47 eventos de analytics implementados
- [ ] Eventos disparados nos momentos corretos (visualizado, iniciado, sucesso, falhou)
- [ ] Sem dados sensíveis nos eventos (apenas IDs, enums, métricas)
- [ ] Propriedades incluem trip_id, codigo_erro, duracao_ms, timestamp
- [ ] Testes validam disparo de eventos críticos (visualizado, sucesso, erro)

### Acessibilidade

- [ ] Todas os botões com `contentDescription` ou `android:contentDescription`
- [ ] AppBar com título acessível
- [ ] Status badge com rótulo acessível
- [ ] Datas com descrição acessível (ex: "Data de início: 11/06/2026 14:30")
- [ ] Botões expandir/recolher descrição acessíveis
- [ ] BottomSheet com anúncio de mensagem de erro
- [ ] Ordem de tab hierárquica (AppBar → Cards → Botões)
- [ ] Spinner durante ação com anúncio ("Salvando...")
- [ ] Testado com TalkBack (Android) em emulador

### Localização

- [ ] 124 strings adicionadas a `res/values/strings.xml`
- [ ] Padrão de chaves: `show_trip_details.*`
- [ ] Mensagens de erro específicas para cada código HTTP
- [ ] Mensagens de sucesso para cada ação
- [ ] Rótulos acessíveis expandidos
- [ ] Templates para datas e duração
- [ ] Status, tipos de transporte, botões, dialogs localizados
- [ ] Pronto para expandir a outras línguas (estrutura pronta)

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
| 0.1.0 | AAAA-MM-DD | [Nome] | Rascunho inicial |
