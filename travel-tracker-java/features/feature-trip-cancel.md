# Especificação de Feature — Cancelar Viagem

> **Tipo de documento:** Spec de Feature
> **Status:** `rascunho`
> **Versão:** 0.1.0
> **Última atualização:** 2026-06-16
> **Dono da feature:** Jose Julio
> **Tech lead:** Jose Julio
> **Spec de Produto vinculada:** [../product-travel-tracker.md](../product-travel-tracker.md) — US-11
> **Spec Técnica vinculada:** [../technical-travel-tracker.md](../technical-travel-tracker.md) — FEAT-12
> **Plataforma:** `Android`
> **Sprint / Marco:** Sprint 1
> **Esforço estimado:** [X dias / Y story points]

---

> **Stack de desenvolvimento revisada:** este documento foi atualizado para orientar o desenvolvimento do aplicativo Android utilizando **Java**, **layouts XML**, **arquitetura MVVM**, **Activities/Fragments**, **ViewModel**, **LiveData**, **ViewBinding**, **Retrofit**, **Room** e componentes Android tradicionais. Referências anteriores a Kotlin, Jetpack Compose, Composables, StateFlow, SharedFlow, Flow e Coroutines devem ser consideradas obsoletas nesta versão e substituídas por alternativas compatíveis com Java e XML.

---

## 1. Resumo da Feature

### 1.1 O Que Esta Feature Faz

A feature de cancelamento de viagem permite que o viajante cancele uma viagem cadastrada, indicando que ela não será mais realizada. O cancelamento é uma ação definitiva que interrompe definitivamente o acompanhamento da viagem.

### 1.2 Por Que Existe

Esta feature existe para que o viajante possa gerenciar suas viagens, cancelando viagens que não serão mais realizadas. O cancelamento é uma ação irreversível que indica que a viagem foi abandonada e não será mais rastreada ou acompanhada.

**Necessidade do usuário:** US-11 — Como viajante, quero cancelar uma viagem para que eu possa indicar que ela não será mais realizada ou acompanhada.
**Objetivo de negócio:** Permitir que o usuário gerencie suas viagens, cancelando itens indesejados ou que não serão mais realizados.

### 1.3 Escopo

**Dentro do escopo:**
- Validar se a viagem pode ser cancelada (status `pending`, `inactive` ou `active`).
- Exibir confirmação com aviso de irreversibilidade antes do cancelamento.
- Interromper o Foreground Service de captura de coordenadas se a viagem estiver ativa.
- Enviar solicitação de cancelamento para a API via PATCH status.
- Atualizar status localmente após cancelamento bem-sucedido.
- Atualizar a lista de viagens após cancelamento.
- Exibir mensagens de erro em caso de falha.

**Fora do escopo (nesta iteração):**
- Notificação aos convidados sobre o cancelamento.
- Histórico de cancelamentos.
- Restauração de viagem cancelada.

---

## 2. Comportamento Visível ao Usuário

### 2.1 Pontos de Entrada

| Ponto de entrada | Gatilho | Pré-condição |
|------------------|---------|--------------|
| Detalhes da Viagem (Tela de viagem própria) | Usuário toca no botão "Cancelar" | Viagem carregada, status não é `canceled`, usuário é dono da viagem. |

---

### 2.2 Fluxo do Caminho Feliz

**Pré-condição:**
O usuário está na tela de detalhes de uma viagem própria, com status diferente de `canceled`.

1. O usuário toca no botão **Cancelar**.
2. O app exibe uma caixa de confirmação com aviso de irreversibilidade: "Deseja cancelar esta viagem? Esta ação é irreversível."
3. O usuário confirma o cancelamento tocando em **Cancelar Viagem**.
4. Se a viagem estiver ativa, o app interrompe imediatamente o Foreground Service de captura de coordenadas.
5. O app envia a solicitação de cancelamento para a API (PATCH status para `canceled`).
6. O app exibe um indicador de carregamento no botão.
7. O app recebe confirmação de cancelamento bem-sucedido.
8. O app remove a viagem ativa do cache local (se aplicável).
9. O app exibe mensagem de sucesso: "Viagem cancelada."
10. O app navega de volta para a lista de viagens.

**Pós-condição:**
A viagem está com status `canceled`, não pode mais ser ativada ou rastreada, e não aparece mais na lista de viagens ativas.

---

### 2.3 Fluxos Alternativos

#### 2.3.1 Cancelamento cancelado pelo usuário

**Gatilho:**
Usuário toca em "Voltar" ou "Cancelar" na caixa de confirmação.

1. O usuário toca no botão **Cancelar**.
2. O app exibe a caixa de confirmação com aviso de irreversibilidade.
3. O usuário toca em **Voltar** ou **Cancelar**.
4. O app fecha a caixa de confirmação.
5. O usuário permanece na tela de detalhes da viagem.
6. Se a viagem estava ativa, o Foreground Service continua normalmente.

---

#### 2.3.2 Viagem já está cancelada

**Gatilho:**
Usuário tenta cancelar uma viagem que já está com status `canceled`.

1. O app não exibe o botão **Cancelar** quando a viagem está cancelada.
2. Se por algum motivo o usuário acessar a ação, o app exibe mensagem: "Esta viagem já está cancelada."

---

#### 2.3.3 Falha de conexão no cancelamento

**Gatilho:**
Não há conexão com a internet no momento do cancelamento.

1. O usuário toca no botão **Cancelar**.
2. O app exibe a caixa de confirmação.
3. O usuário confirma o cancelamento.
4. Se a viagem estiver ativa, o app interrompe imediatamente o Foreground Service localmente.
5. O app tenta enviar a solicitação.
6. O app detecta ausência de conexão.
7. O app marca a viagem como `canceled` localmente para síncronização posterior.
8. O app exibe mensagem: "Viagem cancelada. A sincronização será feita quando houver conexão."
9. O app navega de volta para a lista de viagens.

---

#### 2.3.4 Erro da API no cancelamento

**Gatilho:**
A API retorna erro ao processar a solicitação de cancelamento.

1. O usuário toca no botão **Cancelar**.
2. O app exibe a caixa de confirmação.
3. O usuário confirma o cancelamento.
4. Se a viagem estiver ativa, o app interrompe imediatamente o Foreground Service localmente.
5. O app envia a solicitação para a API.
6. A API retorna erro.
7. O app mantém o status local como `canceled` (pois a ação local já foi executada).
8. O app exibe mensagem: "Não foi possível sincronizar o cancelamento. A viagem foi cancelada localmente."
9. O app navega de volta para a lista de viagens.

---

### 2.4 Casos Extremos e Condições de Contorno

| Cenário | Comportamento esperado |
|---------|------------------------|
| Cancelar viagem pendente | Permitir cancelamento normalmente após confirmação. |
| Cancelar viagem inativa | Permitir cancelamento normalmente após confirmação. |
| Cancelar viagem ativa | Permitir cancelamento, interromper Foreground Service primeiro. |
| Cancelar viagem já cancelada | Não permitir; botão não é exibido. |
| Cancelar com conexão | Interromper serviço (se ativo), enviar para API, confirmar. |
| Cancelar sem conexão | Interromper serviço localmente (se ativo), marcar para sincronização. |
| API retorna erro 404 | Manter cancelamento local, exibir mensagem. |
| API retorna erro 500 | Manter cancelamento local, exibir mensagem. |
| Foreground Service em execução | Parar imediatamente ao confirmar cancelamento. |
| Coordenadas pendentes | Manter coordenadas localmente para referência (não serão sincronizadas após cancelamento). |
| Toques múltiplos no botão | Garantir que apenas um cancelamento seja enviado. |

---

## 3. Especificação de UI

### Diretriz técnica de UI — Java + XML

A tela desta feature deve ser implementada com **Fragment Java + layout XML**, observando `LiveData` exposto pelo respectivo `ViewModel`. A camada visual não deve conter regra de negócio; ela apenas coleta eventos do usuário, atualiza campos visuais, exibe mensagens e navega conforme eventos emitidos pelo ViewModel.

**Arquivos esperados:**

| Tipo | Convenção |
|------|-----------|
| ViewModel | `TripCancelViewModel.java` |
| UiState | `TripCancelUiState.java` |
| UiEvent | `TripCancelUiEvent.java` |
| Dialog/BottomSheet | `bottom_sheet_trip_cancel_confirmation.xml` |
| Strings | `res/values/strings.xml` |

---

### 3.1 Telas / Views Desta Feature

| ID da Tela | Nome | Tipo | Descrição |
|------------|------|------|-----------|
| TLC-01 | Confirmação de Cancelamento | BottomSheetDialog | Diálogo de confirmação antes de cancelar a viagem com aviso de irreversibilidade. |
| TLC-02 | Carregamento | Estado da TLC-01 | Estado visual enquanto o cancelamento está em andamento. |
| TLC-03 | Sucesso | Estado transitório da TLC-01 | Mensagem de sucesso antes de fechar. |
| TLC-04 | Erro | BottomSheet de erro | Exibido quando o cancelamento falha na API (mas ação local foi executada). |

---

### 3.2 Detalhe da Tela — TLC-01: Confirmação de Cancelamento

**Referência de design:** A definir
**Nome acessível:** "Confirmar cancelamento de viagem"

#### Layout

```text
┌────────────────────────────────────┐
│  Ícone de atenção (vermelho)       │
│  "Cancelar Viagem?"               │
│                                    │
│  Deseja cancelar esta viagem?       │
│  Esta ação é irreversível.         │
│                                    │
│  [Voltar]  [Cancelar Viagem]      │
└────────────────────────────────────┘
```

#### Estados

| Estado | Gatilho | O que muda na UI |
|--------|---------|------------------|
| Inicial | BottomSheet aberto | Botões Voltar e Cancelar Viagem disponíveis. |
| Carregando | Usuário toca em Cancelar Viagem | Botão Cancelar Viagem exibe spinner, botão Voltar desabilitado. |
| Sucesso | API confirma cancelamento | Mensagem de sucesso exibida brevemente, BottomSheet fecha. |
| Erro (sincronização) | API retorna erro | Mensagem informativa exibida, BottomSheet fecha (ação local já executada). |

---

### 3.3 Regras de UI

1. O BottomSheet de confirmação deve ser exibido antes de qualquer cancelamento.
2. O botão "Voltar" deve fechar o BottomSheet sem executar cancelamento.
3. O botão "Cancelar Viagem" deve ter cor que indique ação destrutiva (vermelho).
4. A mensagem de confirmação deve deixar claro que a ação é irreversível.
5. Durante o carregamento, ambos os botões devem estar desabilitados.
6. Apenas um cancelamento pode ser enviado por vez.
7. Após cancelamento bem-sucedido, o BottomSheet fecha e o app navega para a lista.
8. Após falha de API (mas com ação local executada), o BottomSheet fecha com mensagem informativa.
9. A mensagem de erro deve ser clara e indicar que a ação local foi executada.

---

### 3.4 Catálogo de Componentes

| Componente | Variante | Configuração |
|------------|----------|--------------|
| `BottomSheetDialog` | Confirmação | Container com ícone (vermelho), título, mensagem e botões. |
| `MaterialButton` | Voltar | Texto "Voltar", cor secundária. |
| `MaterialButton` | Cancelar Viagem | Texto "Cancelar Viagem", cor destrutiva (vermelho). |
| `ProgressIndicator` | Spinner | Exibido no lugar do texto do botão durante carregamento. |

---

## 4. Design Técnico

### 4.1 Posicionamento no Módulo

**Módulo:** `features/trip/cancel`
**Novo módulo necessário:** Sim

A feature de cancelamento de viagem deve ficar dentro do módulo de trip, pois está diretamente relacionada ao gerenciamento de viagens. Pode ser implementada como um DialogFragment ou BottomSheet que é aberto a partir da tela de detalhes da viagem.

---

### 4.2 Decomposição de Componentes / Classes

| Componente | Tipo | Responsabilidade |
|------------|------|-----------------|
| `TripCancelBottomSheet` | BottomSheetDialogFragment | Renderiza o diálogo de confirmação, observa ViewModel e envia eventos. |
| `TripCancelViewModel` | ViewModel | Controla estado do cancelamento, validações e chamada de API. |
| `TripCancelUiState` | Estado de UI | Representa o estado visual: inicial, carregando, sucesso, erro. |
| `TripCancelUiEvent` | Evento de UI | Eventos únicos: cancelamento concluído, erro, navegação. |
| `ActiveTripManager` | Gerenciador | Controla qual viagem está ativa e gerencia o Foreground Service. |
| `TripRepository` | Repositório | Abstrai operações de viagem, incluindo alteração de status. |

---

### 4.3 Endpoints de API Utilizados

| Endpoint | Método | Contrato | Observações |
|----------|--------|----------|-------------|
| `/trips/{trip_id}/status` | PATCH | Ver Spec Técnica §6.1 | Requer autenticação. Body: `{"status": "canceled"}`. Retorna 200 em sucesso. |

---

### 4.4 Modelos de Request e Response

#### `TripStatusRequest`

```json
{
  "status": "canceled"
}
```

| Campo | Descrição |
|-------|-----------|
| `status` | Novo status da viagem. Para cancelamento, deve ser `"canceled"`. |

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
  "status": "canceled",
  "created_at": "2026-06-08T00:03:07.306Z"
}
```

---

### 4.5 Tratamento de Erros

| Origem do erro | Tipo de erro | Tratamento | Mensagem ao usuário |
|----------------|-------------|------------|---------------------|
| Sem conexão | ConnectivityError | Interromper serviço localmente (se ativo), marcar para sincronização | "Viagem cancelada. A sincronização será feita quando houver conexão." |
| 404 Não encontrado | NotFoundError | Manter cancelamento local, exibir mensagem | "Viagem não encontrada." |
| 422 Validação | ValidationError | Exibir erro de validação | "Não é possível cancelar esta viagem." |
| 500 Servidor | ServerError | Interromper serviço localmente (se ativo), marcar para sincronização | "Não foi possível sincronizar o cancelamento. A viagem foi cancelada localmente." |

---

### 4.6 Regras Técnicas

1. O cancelamento deve ser confirmado antes de enviar solicitação à API.
2. Viagens com status `canceled` não podem ser canceladas novamente.
3. Se a viagem estiver ativa, o Foreground Service deve ser interrompido **imediatamente** após confirmação do usuário, antes mesmo da chamada à API.
4. A ação local (interrupção do serviço) tem prioridade sobre a sincronização com a API.
5. O ID da viagem a ser cancelada deve vir dos argumentos do Fragment ou do estado do ViewModel.
6. Após cancelamento bem-sucedido, a viagem ativa deve ser limpa do cache local.
7. O ViewModel deve expor estado reativo via LiveData.
8. O Fragment/BottomSheet deve observar o estado e atualizar a UI соответственно.
9. Coordenadas pendentes de envio devem ser mantidas localmente para referência (viagem cancelada não pode mais ser rastreada).

---

## 5. Eventos de Analytics

| Nome do evento | Gatilho | Propriedades |
|----------------|---------|--------------|
| `trip_cancel_confirmation_shown` | BottomSheet de confirmação exibido | `trip_id: String` |
| `trip_cancel_confirmed` | Usuário confirma cancelamento | `trip_id: String` |
| `trip_cancel_cancelled` | Usuário cancela confirmação | `trip_id: String` |
| `trip_cancel_started` | Requisição PATCH enviada ou ação local executada | `trip_id: String` |
| `trip_cancel_completed` | Cancelamento concluído com sucesso na API | `trip_id: String`, `duracao_ms: Int` |
| `trip_cancel_completed_local` | Cancelamento executado localmente (sem API) | `trip_id: String` |
| `trip_cancel_failed` | Cancelamento falhou | `trip_id: String`, `motivo: String`, `tipo_erro: String` |
| `trip_cancel_service_stopped` | Foreground Service interrompido | `trip_id: String`, `had_pending_coordinates: Boolean` |

---

### Regras de Analytics

1. Não enviar dados sensíveis nos eventos.
2. O `trip_id` pode ser enviado como identificador da viagem.
3. O tempo de duração deve medir do clique em "Cancelar Viagem" até a confirmação da API (ou até a execução local se sem conexão).
4. Erro deve categorizar o tipo: `sem_conexao`, `nao_encontrado`, `validacao`, `servidor`, `timeout`.

---

## 6. Localização

**Arquivo de strings / recurso:** `strings.xml`

| Chave | Padrão (PT-BR) | Observações |
|-------|----------------|-------------|
| `trip_cancel.title` | "Cancelar Viagem?" | Título do BottomSheet. |
| `trip_cancel.message` | "Deseja cancelar esta viagem? Esta ação é irreversível." | Mensagem de confirmação com aviso. |
| `trip_cancel.cancel` | "Voltar" | Botão de cancelar confirmação. |
| `trip_cancel.confirm` | "Cancelar Viagem" | Botão de confirmar cancelamento. |
| `trip_cancel.loading` | "Cancelando…" | Texto durante carregamento. |
| `trip_cancel.success` | "Viagem cancelada." | Mensagem de sucesso em Snackbar. |
| `trip_cancel.success_offline` | "Viagem cancelada. A sincronização será feita quando houver conexão." | Mensagem quando sem internet. |
| `trip_cancel.error.no_connection` | "Sem conexão. A viagem foi cancelada localmente." | Erro de conexão. |
| `trip_cancel.error.not_found` | "Viagem não encontrada." | Erro 404. |
| `trip_cancel.error.generic` | "Não foi possível sincronizar o cancelamento. A viagem foi cancelada localmente." | Erro genérico. |
| `trip_cancel.error.already_canceled` | "Esta viagem já está cancelada." | Viagem já cancelada. |
| `trip_cancel.accessibility.icon` | "Ícone de cancelamento de viagem" | Acessibilidade. |

---

## 7. Definição de Pronto (Definition of Done)

- [ ] Botão de cancelamento visível apenas para viagens com status diferente de `canceled`.
- [ ] Confirmação exibida antes do cancelamento com aviso de irreversibilidade.
- [ ] Foreground Service interrompido imediatamente após confirmação (se viagem ativa).
- [ ] Cancelamento enviado para API via endpoint PATCH status.
- [ ] Status local atualizado após sucesso ou falha (ação local prioritária).
- [ ] Lista de viagens atualizada após cancelamento.
- [ ] Coordenadas pendentes mantidas localmente para referência.
- [ ] Navegação de volta para lista após cancelamento.
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
