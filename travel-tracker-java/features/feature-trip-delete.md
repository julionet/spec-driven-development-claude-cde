# Especificação de Feature — Excluir Viagem

> **Tipo de documento:** Spec de Feature
> **Status:** `rascunho`
> **Versão:** 0.1.0
> **Última atualização:** 2026-06-16
> **Dono da feature:** Jose Julio
> **Tech lead:** Jose Julio
> **Spec de Produto vinculada:** [../product-travel-tracker.md](../product-travel-tracker.md) — US-07, RF-22, RF-23
> **Spec Técnica vinculada:** [../technical-travel-tracker.md](../technical-travel-tracker.md) — FEAT-09
> **Plataforma:** `Android`
> **Sprint / Marco:** Sprint 1
> **Esforço estimado:** [X dias / Y story points]

---

> **Stack de desenvolvimento revisada:** este documento foi atualizado para orientar o desenvolvimento do aplicativo Android utilizando **Java**, **layouts XML**, **arquitetura MVVM**, **Activities/Fragments**, **ViewModel**, **LiveData**, **ViewBinding**, **Retrofit**, **Room** e componentes Android tradicionais. Referências anteriores a Kotlin, Jetpack Compose, Composables, StateFlow, SharedFlow, Flow e Coroutines devem ser consideradas obsoletas nesta versão e substituídas por alternativas compatíveis com Java e XML.

---

## 1. Resumo da Feature

### 1.1 O Que Esta Feature Faz

A feature de exclusão de viagem permite que o viajante remova uma viagem cadastrada e não realizada do aplicativo, após confirmação explícita. A exclusão remove permanentemente a viagem da lista do usuário.

### 1.2 Por Que Existe

Esta feature existe para que o viajante possa gerenciar suas viagens cadastradas, removendo viagens que não serão mais realizadas ou que foram criadas por engano, mantendo a lista de viagens organizada e atualizada.

**Necessidade do usuário:** US-07 — Como viajante, quero excluir uma viagem cadastrada e não realizada para que ela seja removida do aplicativo.
**Objetivo de negócio:** Permitir que o usuário gerencie suas viagens, removendo itens indesejados ou incorretos da lista.

### 1.3 Escopo

**Dentro do escopo:**
- Exibir botão de exclusão na tela de detalhes da viagem.
- Validar se a viagem pode ser excluída (não pode estar ativa).
- Exibir confirmação antes da exclusão.
- Enviar solicitação de exclusão para a API.
- Remover a viagem localmente após exclusão bem-sucedida.
- Atualizar a lista de viagens após exclusão.
- Exibir mensagens de erro em caso de falha.

**Fora do escopo (nesta iteração):**
- Exclusão de viagem ativa em andamento.
- Exclusão de viagem de outro usuário.
- Exclusão em cascata de convites associados.
- Restore de viagem excluída.

---

## 2. Comportamento Visível ao Usuário

### 2.1 Pontos de Entrada

| Ponto de entrada | Gatilho | Pré-condição |
|------------------|---------|--------------|
| Detalhes da Viagem (Tela de viagem própria) | Usuário toca no botão "Excluir" | Viagem carregada, status não é "active", usuário é dono da viagem. |

---

### 2.2 Fluxo do Caminho Feliz

**Pré-condição:**
O usuário está na tela de detalhes de uma viagem própria, com status diferente de "active".

1. O usuário toca no botão **Excluir**.
2. O app exibe uma caixa de confirmação com a mensagem: "Tem certeza que deseja excluir esta viagem? Esta ação não pode ser desfeita."
3. O usuário confirma a exclusão tocando em **Excluir**.
4. O app envia a solicitação de exclusão para a API.
5. O app exibe um indicador de carregamento no botão.
6. O app recebe confirmação de exclusão bem-sucedida.
7. O app remove a viagem da lista local.
8. O app exibe mensagem de sucesso: "Viagem excluída com sucesso."
9. O app navega de volta para a lista de viagens.

**Pós-condição:**
A viagem não aparece mais na lista de viagens do usuário.

---

### 2.3 Fluxos Alternativos

#### 2.3.1 Exclusão cancelada pelo usuário

**Gatilho:**
Usuário toca em "Cancelar" na caixa de confirmação.

1. O usuário toca no botão **Excluir**.
2. O app exibe a caixa de confirmação.
3. O usuário toca em **Cancelar**.
4. O app fecha a caixa de confirmação.
5. O usuário permanece na tela de detalhes da viagem.

---

#### 2.3.2 Viagem ativa não pode ser excluída

**Gatilho:**
Usuário tenta excluir uma viagem com status "active".

1. O app não exibe o botão **Excluir** quando a viagem está ativa.
2. Se por algum motivo o usuário acessar a ação, o app exibe mensagem: "Não é possível excluir uma viagem ativa. Inative a viagem primeiro."

---

#### 2.3.3 Falha de conexão na exclusão

**Gatilho:**
Não há conexão com a internet no momento da exclusão.

1. O usuário toca no botão **Excluir**.
2. O app exibe a caixa de confirmação.
3. O usuário confirma a exclusão.
4. O app tenta enviar a solicitação.
5. O app detecta ausência de conexão.
6. O app exibe mensagem de erro: "Sem conexão com a internet. Conecte-se para excluir a viagem."
7. O app permanece na tela de detalhes.

---

#### 2.3.4 Erro da API na exclusão

**Gatilho:**
A API retorna erro ao processar a solicitação de exclusão.

1. O usuário toca no botão **Excluir**.
2. O app exibe a caixa de confirmação.
3. O usuário confirma a exclusão.
4. O app envia a solicitação.
5. A API retorna erro.
6. O app exibe mensagem de erro: "Não foi possível excluir a viagem. Tente novamente."
7. O app permanece na tela de detalhes.

---

### 2.4 Casos Extremos e Condições de Contorno

| Cenário | Comportamento esperado |
|---------|------------------------|
| Excluir viagem pendente | Permitir exclusão normalmente após confirmação. |
| Excluir viagem inativa | Permitir exclusão normalmente após confirmação. |
| Excluir viagem finalizada | Permitir exclusão normalmente após confirmação. |
| Excluir viagem ativa | Não permitir; botão não é exibido. |
| Excluir viagem cancelada | Permitir exclusão normalmente após confirmação. |
| Sem conexão ao excluir | Exibir mensagem de erro orientando sobre a conexão. |
| API retorna erro 404 | Remover viagem local e exibir mensagem. |
| API retorna erro 500 | Exibir mensagem de erro genérica. |
| Timeout na exclusão | Exibir mensagem de erro e permitir retry. |
| Toques múltiplos no botão | Garantir que apenas uma exclusão seja enviada. |

---

## 3. Especificação de UI

### Diretriz técnica de UI — Java + XML

A tela desta feature deve ser implementada com **Fragment Java + layout XML**, observando `LiveData` exposto pelo respectivo `ViewModel`. A camada visual não deve conter regra de negócio; ela apenas coleta eventos do usuário, atualiza campos visuais, exibe mensagens e navega conforme eventos emitidos pelo ViewModel.

**Arquivos esperados:**

| Tipo | Convenção |
|------|-----------|
| Fragment | `TripDeleteFragment.java` |
| ViewModel | `TripDeleteViewModel.java` |
| Layout da tela | `fragment_trip_delete_confirmation.xml` |
| Dialog/BottomSheet | `bottom_sheet_trip_delete_confirmation.xml` |
| Navegação | `nav_graph.xml` |
| Strings | `res/values/strings.xml` |

---

### 3.1 Telas / Views Desta Feature

| ID da Tela | Nome | Tipo | Descrição |
|------------|------|------|-----------|
| TLA-01 | Confirmação de Exclusão | BottomSheetDialog | Diálogo de confirmação antes de excluir a viagem. |
| TLA-02 | Carregamento | Estado da TLA-01 | Estado visual enquanto a exclusão está em andamento. |
| TLA-03 | Sucesso | Estado transitório da TLA-01 | Mensagem de sucesso antes de fechar. |
| TLA-04 | Erro | BottomSheet de erro | Exibido quando a exclusão falha. |

---

### 3.2 Detalhe da Tela — TLA-01: Confirmação de Exclusão

**Referência de design:** A definir
**Nome acessível:** "Confirmar exclusão de viagem"

#### Layout

```text
┌────────────────────────────────────┐
│  Ícone de atenção                  │
│  "Excluir viagem?"                │
│                                    │
│  Tem certeza que deseja excluir    │
│  esta viagem? Esta ação não pode │
│  ser desfeita.                    │
│                                    │
│  [Cancelar]  [Excluir]           │
└────────────────────────────────────┘
```

#### Estados

| Estado | Gatilho | O que muda na UI |
|--------|---------|------------------|
| Inicial | BottomSheet aberto | Botões Cancelar e Excluir disponíveis. |
| Carregando | Usuário toca em Excluir | Botão Excluir exibe spinner, botão Cancelar desabilitado. |
| Sucesso | API confirma exclusão | Mensagem de sucesso exibida brevemente, BottomSheet fecha. |
| Erro | API retorna erro | Mensagem de erro exibida no BottomSheet. |

---

### 3.3 Regras de UI

1. O BottomSheet de confirmação deve ser exibido antes de qualquer exclusão.
2. O botão "Cancelar" deve fechar o BottomSheet sem executar exclusão.
3. O botão "Excluir" deve ter cor que indique ação destrutiva (vermelho).
4. Durante o carregamento, ambos os botões devem estar desabilitados.
5. Apenas uma exclusão pode ser enviada por vez.
6. Após exclusão bem-sucedida, o BottomSheet fecha automaticamente.
7. Após falha, o usuário deve poder tentar novamente ou cancelar.
8. A mensagem de erro deve ser clara e amigável.

---

### 3.4 Catálogo de Componentes

| Componente | Variante | Configuração |
|------------|----------|--------------|
| `BottomSheetDialog` | Confirmação | Container com ícone, título, mensagem e botões. |
| `MaterialButton` | Cancelar | Texto "Cancelar", cor secundária. |
| `MaterialButton` | Excluir | Texto "Excluir", cor destrutiva (vermelho). |
| `ProgressIndicator` | Spinner | Exibido no lugar do texto do botão durante carregamento. |

---

## 4. Design Técnico

### 4.1 Posicionamento no Módulo

**Módulo:** `features/trip/delete`
**Novo módulo necessário:** Sim

A feature de exclusão de viagem deve ficar dentro do módulo de trip, pois está diretamente relacionada ao gerenciamento de viagens. Pode ser implementada como um DialogFragment ou BottomSheet que é aberto a partir da tela de detalhes da viagem.

---

### 4.2 Decomposição de Componentes / Classes

| Componente | Tipo | Responsabilidade |
|------------|------|-----------------|
| `TripDeleteBottomSheet` | BottomSheetDialogFragment | Renderiza o diálogo de confirmação, observa ViewModel e envia eventos. |
| `TripDeleteViewModel` | ViewModel | Controla estado da exclusão, validações e chamada de API. |
| `TripDeleteUiState` | Estado de UI | Representa o estado visual: inicial, carregando, sucesso, erro. |
| `TripDeleteUiEvent` | Evento de UI | Eventos únicos: exclusão concluída, erro, navegação. |
| `DeleteTripUseCase` | Caso de Uso | Orquestra a lógica de exclusão da viagem. |
| `TripRepository` | Repositório | Abstrai operações de viagem, incluindo exclusão. |
| `TripRemoteDataSource` | Fonte de Dados Remota | Chama endpoint DELETE da API. |
| `TripLocalDataSource` | Fonte de Dados Local | Remove viagem do banco local após sucesso da API. |
| `DeleteTripRequestDto` | DTO | Representa a requisição de exclusão. |
| `DeleteTripResponseDto` | DTO | Representa a resposta da API. |

---

### 4.3 Endpoints de API Utilizados

| Endpoint | Método | Contrato | Observações |
|----------|--------|----------|-------------|
| `/trips/{trip_id}` | DELETE | Ver Spec Técnica §6.1 | Requer autenticação. Retorna 204 em sucesso. |

---

### 4.4 Modelos de Request e Response

#### `DeleteTripRequestDto`

```json
// Sem body necessário - ID da viagem vem do path
```

| Campo | Descrição |
|-------|-----------|
| — | A viagem é identificada pelo `trip_id` no path da URL. |

---

#### `DeleteTripResponseDto`

```json
// Sucesso: HTTP 204 No Content
// Erro: HTTP 404 Not Found ou HTTP 422 Unprocessable Entity
```

---

### 4.5 Tratamento de Erros

| Origem do erro | Tipo de erro | Tratamento | Mensagem ao usuário |
|----------------|-------------|------------|---------------------|
| Sem conexão | ConnectivityError | Exibir mensagem offline | "Sem conexão com a internet. Conecte-se para excluir a viagem." |
| 404 Não encontrado | NotFoundError | Remover local se existir, exibir erro | "Viagem não encontrada." |
| 422 Validação | ValidationError | Exibir erro de validação | "Não é possível excluir esta viagem." |
| 500 Servidor | ServerError | Log + exibir erro genérico | "Não foi possível excluir a viagem. Tente novamente." |

---

### 4.6 Regras Técnicas

1. A exclusão deve ser confirmada antes de enviar solicitação à API.
2. Viagens com status "active" não podem ser excluídas.
3. O ID da viagem a ser excluída deve vir dos argumentos do Fragment ou do estado do ViewModel.
4. Após exclusão bem-sucedida, a viagem deve ser removida do banco local.
5. Eventos de analytics devem ser disparados para exclusão iniciada, concluída e falhada.
6. Erros de rede devem ser tratados com retry ou mensagem amigável.
7. O ViewModel deve expor estado reativo via LiveData.
8. O Fragment/BottomSheet deve observar o estado e atualizar a UI соответственно.

---

## 5. Eventos de Analytics

| Nome do evento | Gatilho | Propriedades |
|----------------|---------|--------------|
| `trip_delete_confirmation_shown` | BottomSheet de confirmação exibido | `trip_id: String` |
| `trip_delete_confirmed` | Usuário confirma exclusão | `trip_id: String` |
| `trip_delete_cancelled` | Usuário cancela exclusão | `trip_id: String` |
| `trip_delete_completed` | Exclusão concluída com sucesso | `trip_id: String`, `duracao_ms: Int` |
| `trip_delete_failed` | Exclusão falhou | `trip_id: String`, `motivo: String`, `tipo_erro: String` |

---

### Regras de Analytics

1. Não enviar dados sensíveis nos eventos.
2. O `trip_id` pode ser enviado como identificador da viagem.
3. O tempo de duração deve medir do clique em "Excluir" até a confirmação da API.
4. Erro deve categorizar o tipo: `sem_conexao`, `nao_encontrado`, `validacao`, `servidor`, `timeout`.

---

## 6. Localização

**Arquivo de strings / recurso:** `strings.xml`

| Chave | Padrão (PT-BR) | Observações |
|-------|----------------|-------------|
| `trip_delete.title` | "Excluir viagem?" | Título do BottomSheet. |
| `trip_delete.message` | "Tem certeza que deseja excluir esta viagem? Esta ação não pode ser desfeita." | Mensagem de confirmação. |
| `trip_delete.cancel` | "Cancelar" | Botão de cancelar. |
| `trip_delete.confirm` | "Excluir" | Botão de confirmar exclusão. |
| `trip_delete.loading` | "Excluindo…" | Texto durante carregamento. |
| `trip_delete.success` | "Viagem excluída com sucesso." | Mensagem de sucesso em Snackbar. |
| `trip_delete.error.no_connection` | "Sem conexão com a internet. Conecte-se para excluir a viagem." | Erro de conexão. |
| `trip_delete.error.not_found` | "Viagem não encontrada." | Erro 404. |
| `trip_delete.error.active_trip` | "Não é possível excluir uma viagem ativa." | Validação de status. |
| `trip_delete.error.generic` | "Não foi possível excluir a viagem. Tente novamente." | Erro genérico. |
| `trip_delete.accessibility.icon` | "Ícone de alerta de exclusão" | Acessibilidade. |

---

## 7. Definição de Pronto (Definition of Done)

- [ ] Botão de exclusão visível apenas para viagens não ativas.
- [ ] Confirmação exibida antes da exclusão.
- [ ] Exclusão enviada para API via endpoint DELETE.
- [ ] Viagem removida localmente após sucesso.
- [ ] Lista de viagens atualizada após exclusão.
- [ ] Mensagens de erro claras exibidas em caso de falha.
- [ ] Eventos de analytics implementados.
- [ ] Strings de localização adicionadas.
- [ ] Code review aprovado.

---

## 8. Dependências e Bloqueios

| Dependência | Tipo | Responsável | Status | Bloqueante |
|-------------|------|-------------|--------|------------|
| Detalhes da Viagem (feature-show-data-trip.md) | Feature dependente | Jose Julio | Em desenvolvimento | Sim |
| Endpoint DELETE /trips/{trip_id} | Backend | Backend | A definir | Sim |

---

## 9. Histórico de Revisões

| Versão | Data | Autor | Resumo |
|--------|------|-------|--------|
| 0.1.0 | 2026-06-16 | Jose Julio | Rascunho inicial |
