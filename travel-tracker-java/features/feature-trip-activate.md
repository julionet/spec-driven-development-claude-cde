# Especificação de Feature — Ativar Viagem

> **Tipo de documento:** Spec de Feature
> **Status:** `rascunho`
> **Versão:** 0.1.0
> **Última atualização:** 2026-06-16
> **Dono da feature:** Jose Julio
> **Tech lead:** Jose Julio
> **Spec de Produto vinculada:** [../product-travel-tracker.md](../product-travel-tracker.md) — US-08
> **Spec Técnica vinculada:** [../technical-travel-tracker.md](../technical-travel-tracker.md) — FEAT-10
> **Plataforma:** `Android`
> **Sprint / Marco:** Sprint 1
> **Esforço estimado:** [X dias / Y story points]

---

> **Stack de desenvolvimento revisada:** este documento foi atualizado para orientar o desenvolvimento do aplicativo Android utilizando **Java**, **layouts XML**, **arquitetura MVVM**, **Activities/Fragments**, **ViewModel**, **LiveData**, **ViewBinding**, **Retrofit**, **Room** e componentes Android tradicionais. Referências anteriores a Kotlin, Jetpack Compose, Composables, StateFlow, SharedFlow, Flow e Coroutines devem ser consideradas obsoletas nesta versão e substituídas por alternativas compatíveis com Java e XML.

---

## 1. Resumo da Feature

### 1.1 O Que Esta Feature Faz

A feature de ativação de viagem permite que o viajante ative uma viagem cadastrada para que o aplicativo comece a registrar suas coordenadas de localização. Quando ativa, a viagem inicia a captura contínua de coordenadas via Foreground Service.

### 1.2 Por Que Existe

Esta feature existe para que o viajante possa iniciar o registro de sua trajetória durante uma viagem. A ativação é o gatilho para o início da captura de coordenadas, que acontece de forma contínua enquanto a viagem permanecer ativa.

**Necessidade do usuário:** US-08 — Como viajante, quero ativar uma viagem para que o aplicativo comece a registrar minhas coordenadas.
**Objetivo de negócio:** Permitir que o usuário registre sua trajetória em tempo real durante uma viagem ativa.

### 1.3 Escopo

**Dentro do escopo:**
- Validar se a viagem pode ser ativada (status `pending` ou `inactive`).
- Verificar permissão de localização antes da ativação.
- Exibir confirmação antes da ativação.
- Enviar solicitação de ativação para a API via PATCH status.
- Atualizar status localmente após ativação bem-sucedida.
- Iniciar o Foreground Service de captura de coordenadas.
- Atualizar a lista de viagens após ativação.
- Exibir mensagens de erro em caso de falha.

**Fora do escopo (nesta iteração):**
- Captura e sincronização de coordenadas (FEAT-13 e FEAT-14).
- Ativação automática baseada em geofencing.
- Histórico de ativações anteriores.

---

## 2. Comportamento Visível ao Usuário

### 2.1 Pontos de Entrada

| Ponto de entrada | Gatilho | Pré-condição |
|------------------|---------|--------------|
| Detalhes da Viagem (Tela de viagem própria) | Usuário toca no botão "Ativar" | Viagem carregada, status é `pending` ou `inactive`, usuário é dono da viagem, permissão de localização concedida. |

---

### 2.2 Fluxo do Caminho Feliz

**Pré-condição:**
O usuário está na tela de detalhes de uma viagem própria, com status `pending` ou `inactive`, e possui permissão de localização.

1. O usuário toca no botão **Ativar**.
2. O app exibe uma caixa de confirmação: "Deseja ativar esta viagem? A captura de localização será iniciada."
3. O usuário confirma a ativação tocando em **Ativar**.
4. O app verifica se há permissão de localização.
5. O app envia a solicitação de ativação para a API (PATCH status para `active`).
6. O app exibe um indicador de carregamento no botão.
7. O app recebe confirmação de ativação bem-sucedida.
8. O app inicia o Foreground Service de captura de coordenadas.
9. O app exibe mensagem de sucesso: "Viagem ativada com sucesso."
10. O app atualiza a UI com os novos botões de ação (Inativar, Ver Mapa, etc.).

**Pós-condição:**
A viagem está com status `active`, o Foreground Service está capturando coordenadas a cada 10 segundos, e o usuário vê os botões de ação atualizados.

---

### 2.3 Fluxos Alternativos

#### 2.3.1 Ativação cancelada pelo usuário

**Gatilho:**
Usuário toca em "Cancelar" na caixa de confirmação.

1. O usuário toca no botão **Ativar**.
2. O app exibe a caixa de confirmação.
3. O usuário toca em **Cancelar**.
4. O app fecha a caixa de confirmação.
5. O usuário permanece na tela de detalhes da viagem.

---

#### 2.3.2 Permissão de localização negada

**Gatilho:**
Usuário tenta ativar uma viagem sem permissão de localização.

1. O usuário toca no botão **Ativar**.
2. O app exibe a caixa de confirmação.
3. O usuário confirma a ativação.
4. O app verifica a permissão de localização.
5. O app detecta que a permissão não foi concedida.
6. O app exibe mensagem de erro: "Permissão de localização é necessária para ativar uma viagem."
7. O app permanece na tela de detalhes.

---

#### 2.3.3 Viagem já está ativa

**Gatilho:**
Usuário tenta ativar uma viagem que já está com status `active`.

1. O app não exibe o botão **Ativar** quando a viagem está ativa.
2. Se por algum motivo o usuário acessar a ação, o app exibe mensagem: "Esta viagem já está ativa."

---

#### 2.3.4 Falha de conexão na ativação

**Gatilho:**
Não há conexão com a internet no momento da ativação.

1. O usuário toca no botão **Ativar**.
2. O app exibe a caixa de confirmação.
3. O usuário confirma a ativação.
4. O app tenta enviar a solicitação.
5. O app detecta ausência de conexão.
6. O app exibe mensagem de erro: "Sem conexão com a internet. Conecte-se para ativar a viagem."
7. O app permanece na tela de detalhes.

---

#### 2.3.5 Erro da API na ativação

**Gatilho:**
A API retorna erro ao processar a solicitação de ativação.

1. O usuário toca no botão **Ativar**.
2. O app exibe a caixa de confirmação.
3. O usuário confirma a ativação.
4. O app envia a solicitação.
5. A API retorna erro.
6. O app exibe mensagem de erro: "Não foi possível ativar a viagem. Tente novamente."
7. O app permanece na tela de detalhes.

---

### 2.4 Casos Extremos e Condições de Contorno

| Cenário | Comportamento esperado |
|---------|------------------------|
| Ativar viagem pendente | Permitir ativação normalmente após confirmação. |
| Ativar viagem inativa | Permitir ativação normalmente após confirmação. |
| Ativar viagem ativa | Não permitir; botão não é exibido. |
| Ativar sem permissão de localização | Exibir erro orientando sobre a permissão. |
| Sem conexão ao ativar | Exibir mensagem de erro orientando sobre a conexão. |
| API retorna erro 404 | Exibir mensagem de erro e atualizar lista local. |
| API retorna erro 422 | Exibir mensagem de erro de validação. |
| API retorna erro 500 | Exibir mensagem de erro genérica. |
| Timeout na ativação | Exibir mensagem de erro e permitir retry. |
| Toques múltiplos no botão | Garantir que apenas uma ativação seja enviada. |

---

## 3. Especificação de UI

### Diretriz técnica de UI — Java + XML

A tela desta feature deve ser implementada com **Fragment Java + layout XML**, observando `LiveData` exposto pelo respectivo `ViewModel`. A camada visual não deve conter regra de negócio; ela apenas coleta eventos do usuário, atualiza campos visuais, exibe mensagens e navega conforme eventos emitidos pelo ViewModel.

**Arquivos esperados:**

| Tipo | Convenção |
|------|-----------|
| ViewModel | `TripActivateViewModel.java` |
| UiState | `TripActivateUiState.java` |
| UiEvent | `TripActivateUiEvent.java` |
| Dialog/BottomSheet | `bottom_sheet_trip_activate_confirmation.xml` |
| Strings | `res/values/strings.xml` |

---

### 3.1 Telas / Views Desta Feature

| ID da Tela | Nome | Tipo | Descrição |
|------------|------|------|-----------|
| TLA-01 | Confirmação de Ativação | BottomSheetDialog | Diálogo de confirmação antes de ativar a viagem. |
| TLA-02 | Carregamento | Estado da TLA-01 | Estado visual enquanto a ativação está em andamento. |
| TLA-03 | Sucesso | Estado transitório da TLA-01 | Mensagem de sucesso antes de fechar. |
| TLA-04 | Erro | BottomSheet de erro | Exibido quando a ativação falha. |

---

### 3.2 Detalhe da Tela — TLA-01: Confirmação de Ativação

**Referência de design:** A definir
**Nome acessível:** "Confirmar ativação de viagem"

#### Layout

```text
┌────────────────────────────────────┐
│  Ícone de localização              │
│  "Ativar Viagem?"                 │
│                                    │
│  Deseja ativar esta viagem?        │
│  A captura de localização será   │
│  iniciada.                        │
│                                    │
│  [Cancelar]  [Ativar]             │
└────────────────────────────────────┘
```

#### Estados

| Estado | Gatilho | O que muda na UI |
|--------|---------|------------------|
| Inicial | BottomSheet aberto | Botões Cancelar e Ativar disponíveis. |
| Carregando | Usuário toca em Ativar | Botão Ativar exibe spinner, botão Cancelar desabilitado. |
| Sucesso | API confirma ativação | Mensagem de sucesso exibida brevemente, BottomSheet fecha. |
| Erro | API retorna erro | Mensagem de erro exibida no BottomSheet. |

---

### 3.3 Regras de UI

1. O BottomSheet de confirmação deve ser exibido antes de qualquer ativação.
2. O botão "Cancelar" deve fechar o BottomSheet sem executar ativação.
3. O botão "Ativar" deve ter cor que indique ação positiva (primária/azul).
4. Durante o carregamento, ambos os botões devem estar desabilitados.
5. Apenas uma ativação pode ser enviada por vez.
6. Após ativação bem-sucedida, o BottomSheet fecha automaticamente.
7. Após falha, o usuário deve poder tentar novamente ou cancelar.
8. A mensagem de erro deve ser clara e amigável.

---

### 3.4 Catálogo de Componentes

| Componente | Variante | Configuração |
|------------|----------|--------------|
| `BottomSheetDialog` | Confirmação | Container com ícone, título, mensagem e botões. |
| `MaterialButton` | Cancelar | Texto "Cancelar", cor secundária. |
| `MaterialButton` | Ativar | Texto "Ativar", cor primária. |
| `ProgressIndicator` | Spinner | Exibido no lugar do texto do botão durante carregamento. |

---

## 4. Design Técnico

### 4.1 Posicionamento no Módulo

**Módulo:** `features/trip/activate`
**Novo módulo necessário:** Sim

A feature de ativação de viagem deve ficar dentro do módulo de trip, pois está diretamente relacionada ao gerenciamento de viagens. Pode ser implementada como um DialogFragment ou BottomSheet que é aberto a partir da tela de detalhes da viagem.

---

### 4.2 Decomposição de Componentes / Classes

| Componente | Tipo | Responsabilidade |
|------------|------|-----------------|
| `TripActivateBottomSheet` | BottomSheetDialogFragment | Renderiza o diálogo de confirmação, observa ViewModel e envia eventos. |
| `TripActivateViewModel` | ViewModel | Controla estado da ativação, validações, verificação de permissão e chamada de API. |
| `TripActivateUiState` | Estado de UI | Representa o estado visual: inicial, carregando, sucesso, erro. |
| `TripActivateUiEvent` | Evento de UI | Eventos únicos: ativação concluída, erro, navegação. |
| `LocationPermissionChecker` | Utilitário | Verifica e solicita permissão de localização. |
| `TripRepository` | Repositório | Abstrai operações de viagem, incluindo alteração de status. |
| `ActiveTripManager` | Gerenciador | Controla qual viagem está ativa e gerencia o Foreground Service. |

---

### 4.3 Endpoints de API Utilizados

| Endpoint | Método | Contrato | Observações |
|----------|--------|----------|-------------|
| `/trips/{trip_id}/status` | PATCH | Ver Spec Técnica §6.1 | Requer autenticação. Body: `{"status": "active"}`. Retorna 200 em sucesso. |

---

### 4.4 Modelos de Request e Response

#### `TripStatusRequest`

```json
{
  "status": "active"
}
```

| Campo | Descrição |
|-------|-----------|
| `status` | Novo status da viagem. Para ativação, deve ser `"active"`. |

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
  "status": "active",
  "created_at": "2026-06-08T00:03:07.306Z"
}
```

---

### 4.5 Tratamento de Erros

| Origem do erro | Tipo de erro | Tratamento | Mensagem ao usuário |
|----------------|-------------|------------|---------------------|
| Sem conexão | ConnectivityError | Exibir mensagem offline | "Sem conexão com a internet. Conecte-se para ativar a viagem." |
| Permissão negada | PermissionError | Solicitar permissão ou exibir erro | "Permissão de localização é necessária para ativar uma viagem." |
| 404 Não encontrado | NotFoundError | Exibir erro e atualizar lista | "Viagem não encontrada." |
| 422 Validação | ValidationError | Exibir erro de validação | "Não é possível ativar esta viagem." |
| 500 Servidor | ServerError | Log + exibir erro genérico | "Não foi possível ativar a viagem. Tente novamente." |

---

### 4.6 Regras Técnicas

1. A ativação deve ser confirmada antes de enviar solicitação à API.
2. Viagens com status `active` não podem ser reativadas.
3. O ID da viagem a ser ativada deve vir dos argumentos do Fragment ou do estado do ViewModel.
4. A permissão de localização deve ser verificada antes da ativação.
5. Após ativação bem-sucedida, o Foreground Service deve ser iniciado.
6. O ViewModel deve expor estado reativo via LiveData.
7. O Fragment/BottomSheet deve observar o estado e atualizar a UI соответственно.
8. Apenas uma viagem pode estar ativa por vez (gerenciado por ActiveTripManager).

---

## 5. Eventos de Analytics

| Nome do evento | Gatilho | Propriedades |
|----------------|---------|--------------|
| `trip_activate_confirmation_shown` | BottomSheet de confirmação exibido | `trip_id: String` |
| `trip_activate_confirmed` | Usuário confirma ativação | `trip_id: String` |
| `trip_activate_cancelled` | Usuário cancela ativação | `trip_id: String` |
| `trip_activate_started` | Requisição PATCH enviada | `trip_id: String` |
| `trip_activate_completed` | Ativação concluída com sucesso | `trip_id: String`, `duracao_ms: Int` |
| `trip_activate_failed` | Ativação falhou | `trip_id: String`, `motivo: String`, `tipo_erro: String` |
| `trip_activate_permission_denied` | Permissão de localização negada | `trip_id: String` |

---

### Regras de Analytics

1. Não enviar dados sensíveis nos eventos.
2. O `trip_id` pode ser enviado como identificador da viagem.
3. O tempo de duração deve medir do clique em "Ativar" até a confirmação da API.
4. Erro deve categorizar o tipo: `sem_conexao`, `permissao_negada`, `nao_encontrado`, `validacao`, `servidor`, `timeout`.

---

## 6. Localização

**Arquivo de strings / recurso:** `strings.xml`

| Chave | Padrão (PT-BR) | Observações |
|-------|----------------|-------------|
| `trip_activate.title` | "Ativar Viagem?" | Título do BottomSheet. |
| `trip_activate.message` | "Deseja ativar esta viagem? A captura de localização será iniciada." | Mensagem de confirmação. |
| `trip_activate.cancel` | "Cancelar" | Botão de cancelar. |
| `trip_activate.confirm` | "Ativar" | Botão de confirmar ativação. |
| `trip_activate.loading` | "Ativando…" | Texto durante carregamento. |
| `trip_activate.success` | "Viagem ativada com sucesso." | Mensagem de sucesso em Snackbar. |
| `trip_activate.error.no_connection` | "Sem conexão com a internet. Conecte-se para ativar a viagem." | Erro de conexão. |
| `trip_activate.error.not_found` | "Viagem não encontrada." | Erro 404. |
| `trip_activate.error.permission_denied` | "Permissão de localização é necessária para ativar uma viagem." | Erro de permissão. |
| `trip_activate.error.generic` | "Não foi possível ativar a viagem. Tente novamente." | Erro genérico. |
| `trip_activate.error.already_active` | "Esta viagem já está ativa." | Viagem já ativa. |
| `trip_activate.accessibility.icon` | "Ícone de localização para ativação" | Acessibilidade. |

---

## 7. Definição de Pronto (Definition of Done)

- [ ] Botão de ativação visível apenas para viagens com status `pending` ou `inactive`.
- [ ] Confirmação exibida antes da ativação.
- [ ] Permissão de localização verificada antes da ativação.
- [ ] Ativação enviada para API via endpoint PATCH status.
- [ ] Foreground Service iniciado após ativação bem-sucedida.
- [ ] Status local atualizado após sucesso.
- [ ] Lista de viagens atualizada após ativação.
- [ ] Mensagens de erro claras exibidas em caso de falha.
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
