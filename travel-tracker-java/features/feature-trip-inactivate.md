# Especificação de Feature — Inativar Viagem

> **Tipo de documento:** Spec de Feature
> **Status:** `rascunho`
> **Versão:** 0.1.0
> **Última atualização:** 2026-06-16
> **Dono da feature:** Jose Julio
> **Tech lead:** Jose Julio
> **Spec de Produto vinculada:** [../product-travel-tracker.md](../product-travel-tracker.md) — US-10
> **Spec Técnica vinculada:** [../technical-travel-tracker.md](../technical-travel-tracker.md) — FEAT-11
> **Plataforma:** `Android`
> **Sprint / Marco:** Sprint 1
> **Esforço estimado:** [X dias / Y story points]

---

> **Stack de desenvolvimento revisada:** este documento foi atualizado para orientar o desenvolvimento do aplicativo Android utilizando **Java**, **layouts XML**, **arquitetura MVVM**, **Activities/Fragments**, **ViewModel**, **LiveData**, **ViewBinding**, **Retrofit**, **Room** e componentes Android tradicionais. Referências anteriores a Kotlin, Jetpack Compose, Composables, StateFlow, SharedFlow, Flow e Coroutines devem ser consideradas obsoletas nesta versão e substituídas por alternativas compatíveis com Java e XML.

---

## 1. Resumo da Feature

### 1.1 O Que Esta Feature Faz

A feature de inativação de viagem permite que o viajante pause uma viagem ativa, interrompendo a captura e o envio de coordenadas. A inativação é o mecanismo de pausa que protege a privacidade do usuário sem cancelar definitivamente a viagem.

### 1.2 Por Que Existe

Esta feature existe para que o viajante possa interromper temporariamente o registro de sua trajetória durante uma viagem. A inativação para a captura de coordenadas para proteger a privacidade do usuário quando ele não deseja mais ser rastreado, mas pretende retomar a viagem posteriormente.

**Necessidade do usuário:** US-10 — Como viajante, quero inativar uma viagem para que o aplicativo pare de registrar e compartilhar minhas coordenadas.
**Objetivo de negócio:** Permitir que o usuário controle quando deseja ou não ser rastreado, respeitando sua privacidade.

### 1.3 Escopo

**Dentro do escopo:**
- Validar se a viagem pode ser inativada (status `active`).
- Exibir confirmação antes da inativação.
- Interromper o Foreground Service de captura de coordenadas localmente.
- Enviar solicitação de inativação para a API via PATCH status.
- Atualizar status localmente após inativação bem-sucedida.
- Atualizar a lista de viagens após inativação.
- Exibir mensagens de erro em caso de falha.

**Fora do escopo (nesta iteração):**
- Reativação automática.
- Histórico de inativações.
- Notificações de pausa.

---

## 2. Comportamento Visível ao Usuário

### 2.1 Pontos de Entrada

| Ponto de entrada | Gatilho | Pré-condição |
|------------------|---------|--------------|
| Detalhes da Viagem (Tela de viagem própria) | Usuário toca no botão "Inativar" | Viagem carregada, status é `active`, usuário é dono da viagem. |

---

### 2.2 Fluxo do Caminho Feliz

**Pré-condição:**
O usuário está na tela de detalhes de uma viagem ativa.

1. O usuário toca no botão **Inativar**.
2. O app exibe uma caixa de confirmação: "Deseja pausar esta viagem? O registro da localização será interrompido."
3. O usuário confirma a inativação tocando em **Inativar**.
4. O app interrompe imediatamente o Foreground Service de captura de coordenadas.
5. O app envia a solicitação de inativação para a API (PATCH status para `inactive`).
6. O app exibe um indicador de carregamento no botão.
7. O app recebe confirmação de inativação bem-sucedida.
8. O app atualiza a viagem ativa no cache local.
9. O app exibe mensagem de sucesso: "Viagem pausada. O registro da localização foi interrompido."
10. O app atualiza a UI com os novos botões de ação (Ativar, Ver Mapa, etc.).

**Pós-condição:**
A viagem está com status `inactive`, o Foreground Service está parado, e o usuário vê os botões de ação atualizados.

---

### 2.3 Fluxos Alternativos

#### 2.3.1 Inativação cancelada pelo usuário

**Gatilho:**
Usuário toca em "Cancelar" na caixa de confirmação.

1. O usuário toca no botão **Inativar**.
2. O app exibe a caixa de confirmação.
3. O usuário toca em **Cancelar**.
4. O app fecha a caixa de confirmação.
5. O usuário permanece na tela de detalhes da viagem.
6. O Foreground Service continua capturando coordenadas normalmente.

---

#### 2.3.2 Viagem não está ativa

**Gatilho:**
Usuário tenta inativar uma viagem que não está com status `active`.

1. O app não exibe o botão **Inativar** quando a viagem não está ativa.
2. Se por algum motivo o usuário acessar a ação, o app exibe mensagem: "Esta viagem não está ativa."

---

#### 2.3.3 Falha de conexão na inativação

**Gatilho:**
Não há conexão com a internet no momento da inativação.

1. O usuário toca no botão **Inativar**.
2. O app exibe a caixa de confirmação.
3. O usuário confirma a inativação.
4. O app interrompe imediatamente o Foreground Service localmente (ação local prioritária).
5. O app tenta enviar a solicitação para a API.
6. O app detecta ausência de conexão.
7. O app marca a viagem como `inactive` localmente para síncronização posterior.
8. O app exibe mensagem: "Viagem pausada. A sincronização será feita quando houver conexão."
9. O app atualiza a UI.

---

#### 2.3.4 Erro da API na inativação

**Gatilho:**
A API retorna erro ao processar a solicitação de inativação.

1. O usuário toca no botão **Inativar**.
2. O app exibe a caixa de confirmação.
3. O usuário confirma a inativação.
4. O app interrompe imediatamente o Foreground Service localmente.
5. O app envia a solicitação para a API.
6. A API retorna erro.
7. O app mantém o status local como `inactive` (pois a ação local já foi executada).
8. O app exibe mensagem de erro: "Não foi possível sincronizar a pausa. A viagem foi pausada localmente."
9. O app atualiza a UI.

---

### 2.4 Casos Extremos e Condições de Contorno

| Cenário | Comportamento esperado |
|---------|------------------------|
| Inativar viagem ativa | Permitir inativação normalmente após confirmação. |
| Inativar viagem não ativa | Não permitir; botão não é exibido. |
| Inativar com conexão | Interromper serviço, enviar para API, confirmar. |
| Inativar sem conexão | Interromper serviço localmente, marcar para sincronização. |
| API retorna erro 404 | Marcar como inativa localmente, exibir mensagem. |
| API retorna erro 500 | Marcar como inativa localmente, exibir mensagem. |
| Foreground Service em execução | Parar imediatamente ao confirmar inativação. |
| Coordenadas pendentes | Manter coordenadas pendentes localmente para posterior envio se reativada. |
| Toques múltiplos no botão | Garantir que apenas uma inativação seja enviada. |

---

## 3. Especificação de UI

### Diretriz técnica de UI — Java + XML

A tela desta feature deve ser implementada com **Fragment Java + layout XML**, observando `LiveData` exposto pelo respectivo `ViewModel`. A camada visual não deve conter regra de negócio; ela apenas coleta eventos do usuário, atualiza campos visuais, exibe mensagens e navega conforme eventos emitidos pelo ViewModel.

**Arquivos esperados:**

| Tipo | Convenção |
|------|-----------|
| ViewModel | `TripInactivateViewModel.java` |
| UiState | `TripInactivateUiState.java` |
| UiEvent | `TripInactivateUiEvent.java` |
| Dialog/BottomSheet | `bottom_sheet_trip_inactivate_confirmation.xml` |
| Strings | `res/values/strings.xml` |

---

### 3.1 Telas / Views Desta Feature

| ID da Tela | Nome | Tipo | Descrição |
|------------|------|------|-----------|
| TLI-01 | Confirmação de Inativação | BottomSheetDialog | Diálogo de confirmação antes de inativar a viagem. |
| TLI-02 | Carregamento | Estado da TLI-01 | Estado visual enquanto a inativação está em andamento. |
| TLI-03 | Sucesso | Estado transitório da TLI-01 | Mensagem de sucesso antes de fechar. |
| TLI-04 | Erro | BottomSheet de erro | Exibido quando a inativação falha na API (mas ação local foi executada). |

---

### 3.2 Detalhe da Tela — TLI-01: Confirmação de Inativação

**Referência de design:** A definir
**Nome acessível:** "Confirmar pausa de viagem"

#### Layout

```text
┌────────────────────────────────────┐
│  Ícone de pausa                   │
│  "Pausar Viagem?"                 │
│                                    │
│  Deseja pausar esta viagem?        │
│  O registro da localização será   │
│  interrompido.                     │
│                                    │
│  [Cancelar]  [Pausar]             │
└────────────────────────────────────┘
```

#### Estados

| Estado | Gatilho | O que muda na UI |
|--------|---------|------------------|
| Inicial | BottomSheet aberto | Botões Cancelar e Pausar disponíveis. |
| Carregando | Usuário toca em Pausar | Botão Pausar exibe spinner, botão Cancelar desabilitado. |
| Sucesso | API confirma inativação | Mensagem de sucesso exibida brevemente, BottomSheet fecha. |
| Erro (sincronização) | API retorna erro | Mensagem informativa exibida, BottomSheet fecha (ação local já executada). |

---

### 3.3 Regras de UI

1. O BottomSheet de confirmação deve ser exibido antes de qualquer inativação.
2. O botão "Cancelar" deve fechar o BottomSheet sem executar inativação.
3. O botão "Pausar" deve ter cor que indique ação de pausa (secundária).
4. Durante o carregamento, ambos os botões devem estar desabilitados.
5. Apenas uma inativação pode ser enviada por vez.
6. Após inativação bem-sucedida, o BottomSheet fecha automaticamente.
7. Após falha de API (mas com ação local executada), o BottomSheet fecha com mensagem informativa.
8. A mensagem de erro deve ser clara e indicar que a ação local foi executada.

---

### 3.4 Catálogo de Componentes

| Componente | Variante | Configuração |
|------------|----------|--------------|
| `BottomSheetDialog` | Confirmação | Container com ícone, título, mensagem e botões. |
| `MaterialButton` | Cancelar | Texto "Cancelar", cor secundária. |
| `MaterialButton` | Pausar | Texto "Pausar", cor secundária ou outlined. |
| `ProgressIndicator` | Spinner | Exibido no lugar do texto do botão durante carregamento. |

---

## 4. Design Técnico

### 4.1 Posicionamento no Módulo

**Módulo:** `features/trip/inactivate`
**Novo módulo necessário:** Sim

A feature de inativação de viagem deve ficar dentro do módulo de trip, pois está diretamente relacionada ao gerenciamento de viagens. Pode ser implementada como um DialogFragment ou BottomSheet que é aberto a partir da tela de detalhes da viagem.

---

### 4.2 Decomposição de Componentes / Classes

| Componente | Tipo | Responsabilidade |
|------------|------|-----------------|
| `TripInactivateBottomSheet` | BottomSheetDialogFragment | Renderiza o diálogo de confirmação, observa ViewModel e envia eventos. |
| `TripInactivateViewModel` | ViewModel | Controla estado da inativação, validações e chamada de API. |
| `TripInactivateUiState` | Estado de UI | Representa o estado visual: inicial, carregando, sucesso, erro. |
| `TripInactivateUiEvent` | Evento de UI | Eventos únicos: inativação concluída, erro, navegação. |
| `ActiveTripManager` | Gerenciador | Controla qual viagem está ativa e gerencia o Foreground Service. |
| `TripRepository` | Repositório | Abstrai operações de viagem, incluindo alteração de status. |

---

### 4.3 Endpoints de API Utilizados

| Endpoint | Método | Contrato | Observações |
|----------|--------|----------|-------------|
| `/trips/{trip_id}/status` | PATCH | Ver Spec Técnica §6.1 | Requer autenticação. Body: `{"status": "inactive"}`. Retorna 200 em sucesso. |

---

### 4.4 Modelos de Request e Response

#### `TripStatusRequest`

```json
{
  "status": "inactive"
}
```

| Campo | Descrição |
|-------|-----------|
| `status` | Novo status da viagem. Para inativação, deve ser `"inactive"`. |

---

#### `TripResponse`

```json
{
  "id": "string",
  "user_id": "string",
  "description": "string",
  "vehicle": "string",
  "start_date": "2026-06-08T00:03:07.306Z",
  "end_date": "2026-06-08T00:03:07.306Z",
  "status": "inactive",
  "created_at": "2026-06-08T00:03:07.306Z"
}
```

---

### 4.5 Tratamento de Erros

| Origem do erro | Tipo de erro | Tratamento | Mensagem ao usuário |
|----------------|-------------|------------|---------------------|
| Sem conexão | ConnectivityError | Interromper serviço localmente, marcar para sincronização | "Viagem pausada. A sincronização será feita quando houver conexão." |
| 404 Não encontrado | NotFoundError | Manter inativação local, exibir mensagem | "Viagem não encontrada." |
| 422 Validação | ValidationError | Exibir erro de validação | "Não é possível pausar esta viagem." |
| 500 Servidor | ServerError | Interromper serviço localmente, marcar para sincronização | "Não foi possível sincronizar a pausa. A viagem foi pausada localmente." |

---

### 4.6 Regras Técnicas

1. A inativação deve ser confirmada antes de enviar solicitação à API.
2. Viagens com status diferente de `active` não podem ser inativadas.
3. O Foreground Service deve ser interrompido **imediatamente** após confirmação do usuário, antes mesmo da chamada à API.
4. A ação local (interrupção do serviço) tem prioridade sobre a sincronização com a API.
5. O ID da viagem a ser inativada deve vir dos argumentos do Fragment ou do estado do ViewModel.
6. Após inativação bem-sucedida, a viagem ativa deve ser limpa do cache local.
7. O ViewModel deve expor estado reativo via LiveData.
8. O Fragment/BottomSheet deve observar o estado e atualizar a UI соответственно.
9. Coordenadas pendentes de envio devem ser mantidas localmente caso a viagem seja reativada posteriormente.

---

## 5. Eventos de Analytics

| Nome do evento | Gatilho | Propriedades |
|----------------|---------|--------------|
| `trip_inactivate_confirmation_shown` | BottomSheet de confirmação exibido | `trip_id: String` |
| `trip_inactivate_confirmed` | Usuário confirma inativação | `trip_id: String` |
| `trip_inactivate_cancelled` | Usuário cancela inativação | `trip_id: String` |
| `trip_inactivate_started` | Requisição PATCH enviada ou ação local executada | `trip_id: String` |
| `trip_inactivate_completed` | Inativação concluída com sucesso na API | `trip_id: String`, `duracao_ms: Int` |
| `trip_inactivate_completed_local` | Inativação executada localmente (sem API) | `trip_id: String` |
| `trip_inactivate_failed` | Inativação falhou | `trip_id: String`, `motivo: String`, `tipo_erro: String` |

---

### Regras de Analytics

1. Não enviar dados sensíveis nos eventos.
2. O `trip_id` pode ser enviado como identificador da viagem.
3. O tempo de duração deve medir do clique em "Pausar" até a confirmação da API (ou até a execução local se sem conexão).
4. Erro deve categorizar o tipo: `sem_conexao`, `nao_encontrado`, `validacao`, `servidor`, `timeout`.

---

## 6. Localização

**Arquivo de strings / recurso:** `strings.xml`

| Chave | Padrão (PT-BR) | Observações |
|-------|----------------|-------------|
| `trip_inactivate.title` | "Pausar Viagem?" | Título do BottomSheet. |
| `trip_inactivate.message` | "Deseja pausar esta viagem? O registro da localização será interrompido." | Mensagem de confirmação. |
| `trip_inactivate.cancel` | "Cancelar" | Botão de cancelar. |
| `trip_inactivate.confirm` | "Pausar" | Botão de confirmar inativação. |
| `trip_inactivate.loading` | "Pausando…" | Texto durante carregamento. |
| `trip_inactivate.success` | "Viagem pausada. O registro da localização foi interrompido." | Mensagem de sucesso em Snackbar. |
| `trip_inactivate.success_offline` | "Viagem pausada. A sincronização será feita quando houver conexão." | Mensagem quando sem internet. |
| `trip_inactivate.error.no_connection` | "Sem conexão. A viagem foi pausada localmente." | Erro de conexão. |
| `trip_inactivate.error.not_found` | "Viagem não encontrada." | Erro 404. |
| `trip_inactivate.error.generic` | "Não foi possível sincronizar a pausa. A viagem foi pausada localmente." | Erro genérico. |
| `trip_inactivate.error.not_active` | "Esta viagem não está ativa." | Viagem não ativa. |
| `trip_inactivate.accessibility.icon` | "Ícone de pausa de viagem" | Acessibilidade. |

---

## 7. Definição de Pronto (Definition of Done)

- [ ] Botão de inativação visível apenas para viagens com status `active`.
- [ ] Confirmação exibida antes da inativação.
- [ ] Foreground Service interrompido imediatamente após confirmação.
- [ ] Inativação enviada para API via endpoint PATCH status.
- [ ] Status local atualizado após sucesso ou falha (ação local prioritária).
- [ ] Lista de viagens atualizada após inativação.
- [ ] Coordenadas pendentes mantidas localmente para possível reativação.
- [ ] Mensagens claras exibidas em caso de sucesso ou falha.
- [ ] Eventos de analytics implementados.
- [ ] Strings de localização adicionadas.
- [ ] Code review aprovado.

---

## 8. Dependências e Bloqueios

| Dependência | Tipo | Responsável | Status | Bloqueante |
|-------------|------|-------------|--------|------------|
| Detalhes da Viagem (feature-show-data-trip.md) | Feature dependente | Jose Julio | Em desenvolvimento | Sim |
| Captura de coordenadas (FEAT-13) | Feature dependente | Jose Julio | A definir | Sim |
| Foreground Service de localização | Infraestrutura | Jose Julio | A definir | Sim |
| Endpoint PATCH /trips/{trip_id}/status | Backend | Backend | A definir | Sim |

---

## 9. Histórico de Revisões

| Versão | Data | Autor | Resumo |
|--------|------|-------|--------|
| 0.1.0 | 2026-06-16 | Jose Julio | Rascunho inicial |
