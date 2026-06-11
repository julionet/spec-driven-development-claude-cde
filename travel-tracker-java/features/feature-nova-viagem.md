# Especificação de Feature — Nova viagem

> **Tipo de documento:** Spec de Feature  
> **Status:** `rascunho`   
> **Versão:** 0.1.0  
> **Última atualização:** 2026-06-11  
> **Dono da feature:** Jose Julio
> **Tech lead:** Jose Julio  
> **Spec de Produto vinculada:** [../product-travel-tracker.md](../product-travel-tracker.md) — §3 US-05, §4 Cadastrar nova viagem com sucesso/falha  
> **Spec Técnica vinculada:** [../technical-travel-tracker.md](../technical-travel-tracker.md) — FEAT-07, §6.1 `POST /trips`  
> **Plataforma:** `Android`  
> **Sprint / Marco:** Sprint 1  
> **Esforço estimado:** [X dias / Y story points]

---

## 1. Resumo da Feature

### 1.1 O Que Esta Feature Faz

Permite que um viajante cadastre uma nova viagem informando dados básicos como título, descrição, tipo de transporte e datas de início e fim. Após o cadastro com sucesso, a viagem é criada com status inicial **pendente** e passa a estar disponível para visualização e gerenciamento pelo viajante na tela **Minhas Viagens**.

### 1.2 Por Que Existe

**Necessidade do usuário:** [US-05](../product-travel-tracker.md#us-05) — Como viajante, quero cadastrar uma viagem para que ela possa ser acompanhada por outro usuário convidado.

**Objetivo de negócio:** [Objetivo 1](../product-travel-tracker.md#13-objetivos) da Spec de Produto — Permitir que o viajante registre uma viagem no aplicativo com dados básicos. Essa é uma funcionalidade essencial para o fluxo principal do produto e um pré-requisito para ativar uma viagem, capturar coordenadas e enviar convites de acompanhamento.

### 1.3 Escopo

**Dentro do escopo:**
- Formulário de cadastro com campos obrigatórios: `title`, `description`, `type`, `start_date`, `end_date`
- Validação de campos obrigatórios e formato antes do envio
- Validação de datas (data de início deve ser anterior à data de fim)
- Envio dos dados para a API via `POST /trips` com autenticação Bearer
- Criação da viagem com status inicial `pendente`
- Retorno para a tela **Minhas Viagens** após sucesso
- Exibição da nova viagem na lista com os dados atualizados
- Tratamento de erros 422 (validação) e outros erros de rede
- Exibição de mensagens de erro clara ao usuário
- Estados de carregamento, sucesso e erro na tela

**Fora do escopo (nesta iteração):**
- Planejamento ou traçado prévio de rota antes do cadastro
- Integração com mapas para edição de coordenadas de rota
- Compartilhamento de viagem durante o cadastro (convites são enviados em feature separada)
- Cálculo automático de distância ou duração estimada
- Criação de múltiplas viagens em lote

---

## 2. Comportamento Visível ao Usuário

### 2.1 Pontos de Entrada

| Ponto de entrada | Gatilho | Pré-condição |
|------------------|---------|--------------|
| Tela **Minhas Viagens** | Toque no botão **+ Nova Viagem** (ou equivalente) | Usuário autenticado e tela principal carregada |
| Tela **Minhas Viagens** | Toque em ícone de adicionar na barra de ação | Usuário autenticado com acesso a viagens |

### 2.2 Fluxo do Caminho Feliz

**Pré-condição:** Usuário está autenticado e visualiza a tela **Minhas Viagens**.

1. O usuário toca no botão **+ Nova Viagem**.
2. O app exibe a tela de cadastro com formulário contendo campos: **Título**, **Descrição**, **Tipo de Transporte**, **Data de Início**, **Data de Fim** e botões **Salvar** e **Cancelar**.
3. O usuário preenche todos os campos obrigatórios com dados válidos.
4. O usuário toca no botão **Salvar**.
5. O app valida os campos localmente (presença, formato, datas válidas) e exibe estado de carregamento (spinner/skeleton).
6. O app envia os dados para a API via `POST /trips` com autenticação Bearer.
7. A API retorna sucesso com status HTTP 200 e o ID da viagem criada com status `pendente`.
8. O app exibe mensagem de sucesso (toast ou feedback inline) e navega de volta para a tela **Minhas Viagens**.
9. A nova viagem aparece na lista com os dados informados e status **Pendente**.

**Pós-condição:** A viagem foi criada com sucesso, está visível na lista de **Minhas Viagens** com status `pendente`, e o usuário pode ativar, editar ou compartilhar a viagem.

### 2.3 Fluxos Alternativos

#### 2.3.1 Cadastro com Validação Local Falha
**Gatilho:** Usuário toca **Salvar** com campos vazios, formato inválido ou datas inconsistentes.

1. O app detecta que um ou mais campos obrigatórios estão vazios ou com valores inválidos.
2. O app exibe mensagem de erro específica para cada campo (ex.: "Título é obrigatório" ou "Data de início deve ser anterior à data de fim").
3. O formulário permanece aberto com os dados já preenchidos pelo usuário.
4. O usuário ajusta os dados e toca **Salvar** novamente.
5. Se válido, o fluxo continua como no caminho feliz.

#### 2.3.2 Cadastro com Erro de Rede/API
**Gatilho:** Durante o envio, falha de conexão ou a API retorna erro (422, 500, timeout).

1. O usuário preenche o formulário e toca **Salvar**.
2. O app valida localmente (passa).
3. O app exibe estado de carregamento e inicia o envio para a API.
4. A requisição falha (sem conexão, timeout, erro 4xx/5xx).
5. O app exibe banner ou modal de erro com mensagem clara (ex.: "Não foi possível salvar a viagem. Verifique sua conexão e tente novamente.").
6. O formulário permanece aberto com os dados preservados.
7. Usuário pode ajustar os dados ou tocar em **Tentar Novamente** / **Salvar** para fazer nova tentativa.
8. Após sucesso na retentativa, o fluxo continua como no caminho feliz.

#### 2.3.3 Usuário Cancela o Cadastro
**Gatilho:** Usuário toca no botão **Cancelar** ou gesto de voltar antes de salvar.

1. O app fecha o formulário de cadastro sem salvar dados.
2. O app retorna para a tela **Minhas Viagens**.
3. Nenhuma viagem foi criada.
4. Os dados preenchidos são descartados. 

### 2.4 Casos Extremos e Condições de Contorno

| Cenário | Comportamento esperado |
|---------|--------------------------|
| Sem rede ao abrir formulário | Formulário é exibido normalmente (é uma tela local). Ao tocar **Salvar**, exibir banner: "Sem conexão com a internet. Conecte-se para salvar a viagem." |
| Sem rede ao tentar salvar | Exibir erro de rede com opção de retry quando houver conexão. |
| Campo de texto muito longo (ex.: descrição > 500 caracteres) | Permitir entrada; truncar visualmente na UI se necessário; validar comprimento máximo conforme API (se houver limite). |
| Datas iguais (início = fim) | Aceitar ou bloquear conforme regra de negócio; se bloqueado, exibir: "Data de fim deve ser posterior à data de início." |
| Data de fim anterior à data de início | Exibir erro: "Data de fim deve ser posterior à data de início." |
| Título vazio ou só espaços | Exibir erro: "Título é obrigatório e não pode conter apenas espaços." |
| Descrição vazia (se obrigatória) | Exibir erro: "Descrição é obrigatória." (ou marcar como opcional no form) |
| Tipo de transporte não selecionado | Exibir erro: "Selecione um tipo de transporte." |
| API retorna erro 422 (validação) | Exibir mensagem de erro retornada pela API de forma clara ao usuário. |
| API retorna erro 500+ (servidor) | Exibir mensagem genérica: "Erro ao salvar a viagem. Tente novamente mais tarde." |
| Timeout (requisição > 30s) | Exibir erro de timeout: "A solicitação demorou muito tempo. Tente novamente." |
| Token expirado durante o envio | Tentar renovar token silenciosamente (refresh); se falhar, redirecionar para login. |
| Usuário fica offline durante o envio | Capturar erro de rede; manter formulário aberto com dados; sugerir retry quando houver conexão. |
| Formulário aberto há muito tempo sem interação | Sem timeout automático no formulário; dados permanecem intactos até o usuário agir. |

---

## 3. Especificação de UI

### 3.1 Telas / Views Desta Feature

| ID da Tela | Nome | Tipo | Descrição |
|------------|------|------|-----------|
| TLA-01 | Formulário de Nova Viagem | Dialog/Modal/Fragment com push | Tela de cadastro de nova viagem com campos para título, descrição, tipo de transporte e datas |
| TLA-02 | Carregamento de Cadastro | Estado de TLA-01 | Estado visual exibido enquanto o app envia dados para a API |
| TLA-03 | Erro de Cadastro | Estado de TLA-01 | Estado visual exibido quando o cadastro falha por validação, rede ou erro da API |

### 3.2 Detalhe da Tela — TLA-01: Formulário de Nova Viagem

**Referência de design:** A definir - Figma/Wireframe  
**Nome acessível:** "Formulário para criar uma nova viagem"

#### Layout

```text
┌─────────────────────────────────┐
│  Barra Superior / AppBar        │
│  Título: "Nova Viagem"          │
│  Botão Fechar (X) - direita     │
├─────────────────────────────────┤
│  ScrollView (conteúdo)          │
│                                 │
│  ┌─────────────────────────┐    │
│  │  Label: Título *        │    │
│  │  [TextInputEditText]    │    │
│  │  hint: "Ex: SP para RJ" │    │
│  │  [erro abaixo]          │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │  Label: Descrição       │    │
│  │  [TextInputEditText]    │    │
│  │  multiline              │    │
│  │  hint: "Detalhes..."    │    │
│  │  [opcional]             │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │  Label: Veículo *       │    │
│  │  [TextInputEditText]    │    │
│  │  hint: "Ex: Honda 150"  │    │
│  │  [erro abaixo]          │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │  Label: Data Início *   │    │
│  │  [EditText clickable]   │    │
│  │  "DD/MM/YYYY"           │    │
│  │  [erro abaixo]          │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │  Label: Data Fim *      │    │
│  │  [EditText clickable]   │    │
│  │  "DD/MM/YYYY"           │    │
│  │  [erro abaixo]          │    │
│  └─────────────────────────┘    │
│                                 │
├─────────────────────────────────┤
│  [Botão Salvar]                 │
└─────────────────────────────────┘
```

#### Descrição das Regiões

| Região | Descrição |
|--------|-----------|
| Barra Superior | AppBar com título "Nova Viagem" e botão Fechar (X) para descartar o formulário |
| Formulário | ScrollView com 5 campos editáveis, labels, hints e espaço para mensagens de erro inline |
| Botões de Ação | Dois botões horizontalmente dispostos: Salvar (largura total ou compartilhada) e Cancelar |
| Feedback de Erros | Mensagens de erro aparecem sob os campos correspondentes em cor vermelha |

#### Estados

| Estado | Gatilho | O que muda na UI |
|--------|---------|------------------|
| Inicial | Formulário abre | Campos vazios, labels visíveis, hints exibidos, botões habilitados, sem mensagens de erro |
| Preenchimento | Usuário digita em qualquer campo | Campos exibem valores inseridos, hints podem desaparecer ou reduzir opacidade |
| Validação Local (Erro) | Usuário toca **Salvar** com dados inválidos | Campos com erro ganham borda vermelha, ícone de erro, e mensagem específica aparece sob cada campo |
| Validação Local (OK) | Usuário corrige os erros | Erros desaparecem gradualmente conforme usuário corrige |
| Carregando | Usuário toca **Salvar** com dados válidos | Spinner aparece no botão **Salvar**, texto muda para "[ícone] Salvando...", campos e botão **Cancelar** desabilitados, backdrop semi-transparente opcional |
| Sucesso (Transitório) | API retorna 201/200 | Toast/Snackbar de sucesso aparece: "Viagem criada com sucesso"; após 1-2s, navega para **Minhas Viagens** |
| Erro de Rede/API | Requisição falha (4xx, 5xx, timeout, sem conexão) | BottomSheet modal padrão é exibido com título, mensagem amigável e botões "Entendi" e "Tentar Novamente"; campos preservam dados |

#### Mensagens de Validação

| Campo | Situação | Mensagem |
|-------|----------|----------|
| Título | Vazio | "Este campo é obrigatório." |
| Título | Só espaços | "Título não pode conter apenas espaços." |
| Título | Muito longo (> 100 caracteres) | "Máximo de 100 caracteres." |
| Descrição | Muito longa (> 500 caracteres) | "Máximo de 500 caracteres." |
| Tipo | Não selecionado | "Selecione um tipo de transporte." |
| Data Início | Vazia | "Este campo é obrigatório." |
| Data Fim | Vazia | "Este campo é obrigatório." |
| Data Fim | Anterior a Data Início | "Data de fim deve ser posterior à data de início." |
| Data Início / Fim | Data no passado | "Data não pode ser no passado." |
| Geral (API) | Validação 422 | Mensagem retornada pela API exibida no BottomSheet |
| Geral (API) | Sem conexão | "Não foi possível salvar. Verifique sua internet e tente novamente." |
| Geral (API) | Timeout | "A solicitação demorou muito. Tente novamente." |
| Geral (API) | Erro 5xx | "Erro ao salvar a viagem. Tente novamente em alguns instantes." |

#### Elementos Interativos

| Elemento | Tipo | Ação | Rótulo de Acessibilidade |
|----------|------|------|--------------------------|
| Campo Título | TextInputEditText | Captura o título da viagem (obrigatório) | "Título da viagem, campo obrigatório" |
| Campo Descrição | TextInputEditText (multiline) | Captura descrição/detalhes (opcional) | "Descrição da viagem, campo opcional" |
| Campo Tipo | Spinner / MaterialAutoCompleteTextView | Abre dropdown com opções: Carro, Moto, Bike, Ônibus, Outro | "Tipo de transporte, campo obrigatório" |
| Campo Data Início | EditText + DatePickerDialog | Abre calendário ao tocar; captura data em formato DD/MM/YYYY | "Data de início, campo obrigatório, toque para abrir calendário" |
| Campo Data Fim | EditText + DatePickerDialog | Abre calendário ao tocar; captura data em formato DD/MM/YYYY | "Data de fim, campo obrigatório, toque para abrir calendário" |
| Botão Salvar | MaterialButton (Contained) | Valida campos localmente; se OK, envia dados para API | "Salvar nova viagem" |
| Botão Cancelar | MaterialButton (Outlined) | Descarta o formulário e volta para **Minhas Viagens** | "Cancelar cadastro e voltar" |
| Botão Fechar (X) | IconButton | Descarta o formulário (mesmo comportamento que Cancelar) | "Fechar formulário" |
| Mensagens de Erro (inline) | TextInputLayout.error | Aparecem sob cada campo com texto de erro em vermelho | "[Campo]: [Mensagem de erro dinâmica]" |
| BottomSheet de Erro | Material BottomSheet modal | Exibe erro retornado pela API com título, mensagem, botões "Entendi" e "Tentar Novamente" | "Mensagem de erro do servidor" |
| Toast/Snackbar Sucesso | Snackbar temporário | Exibe "Viagem criada com sucesso" por 1-2 segundos | "Viagem criada com sucesso" |

### 3.3 Detalhe da Tela — TLA-02: Carregamento de Cadastro

**Referência de design:** A definir - Figma/Wireframe  
**Nome acessível:** "Salvando nova viagem"

#### Layout

Durante o envio dos dados, a tela deve manter o contexto visual do formulário e indicar que a operação está em andamento.

```text
┌─────────────────────────────────┐
│  Barra Superior / AppBar        │
│  Título: "Nova Viagem"          │
│  Botão Fechar (X) - desabilitado│
├─────────────────────────────────┤
│  ScrollView (conteúdo desabilitado)
│                                 │
│  [Campos com aparência reduzida │
│   ou semitransparentes]         │
│                                 │
├─────────────────────────────────┤
│  [Botão Salvar] [loading]       │
└─────────────────────────────────┘
```

#### Estados

| Estado | Gatilho | O que muda na UI |
|--------|---------|------------------|
| Salvando | Usuário toca **Salvar** com dados válidos | Botão Salvar exibe spinner + "Salvando...", campos desabilitados, botão Cancelar desabilitado, botão Fechar desabilitado |
| Sucesso | API retorna 201/200 | Tela fecha automaticamente; toast de sucesso aparece brevemente; usuário é redirecionado para **Minhas Viagens** |
| Falha | API retorna erro ou falha de rede | Tela volta para estado normal; BottomSheet modal é exibido com mensagem de erro |

#### Elementos Interativos

| Elemento | Tipo | Ação | Rótulo de Acessibilidade |
|----------|------|------|--------------------------|
| Botão Salvar (Loading) | MaterialButton + ProgressBar | Desabilitado; exibe spinner e texto "Salvando..." | "Salvando nova viagem, aguarde" |
| Botão Fechar (X) | IconButton | Desabilitado temporariamente | "Fechar desabilitado durante salvamento" |

---

### 3.4 Detalhe da Tela — TLA-03: Erro de Cadastro

**Referência de design:** A definir - Figma/Wireframe  
**Nome acessível:** "Erro ao salvar viagem"

#### Comportamento

Todos os erros retornados pela API devem ser apresentados em um **BottomSheet modal padrão**.  
Erros de validação local (campo obrigatório, data inválida, etc.) continuam sendo exibidos próximos aos campos correspondentes.

#### Layout

O BottomSheet modal deve aparecer acima do formulário, permitindo que o usuário veja os campos preenchidos ao fundo.

```text
┌─────────────────────────────────┐
│  Formulário (fundo)             │
│  [campos semitransparentes]     │
│                                 │
│  ┌─────────────────────────┐    │
│  │ BottomSheet Modal       │    │
│  ├─────────────────────────┤    │
│  │ Título: "Não foi        │    │
│  │ possível salvar"        │    │
│  │                         │    │
│  │ Mensagem do erro        │    │
│  │ (dinâmica)              │    │
│  │                         │    │
│  │ [Botão Entendi]         │    │
│  │ [Botão Tentar Nov.]     │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

#### Estados

| Estado | Gatilho | O que muda na UI |
|--------|---------|------------------|
| Erro de Validação Local | Campos obrigatórios vazios ou formato inválido | Mensagem aparece sob o campo em vermelho; nenhum BottomSheet é exibido |
| Erro de API (422) | Validação de negócio falhou | BottomSheet modal é exibido com mensagem específica retornada pela API |
| Erro de Conexão | Sem internet ou timeout | BottomSheet modal é exibido com mensagem "Não foi possível conectar" |
| Erro 5xx | Erro interno do servidor | BottomSheet modal é exibido com mensagem genérica "Erro ao salvar a viagem" |
| Fechar Erro | Usuário toca **Entendi** | BottomSheet fecha; formulário volta ao estado editável |
| Tentar Novamente | Usuário toca **Tentar Novamente** | BottomSheet fecha; botão Salvar é reativado; formulário mantém os dados |

#### Mensagens Exibidas no BottomSheet

| Situação | Título | Mensagem | Ação Principal | Ação Secundária |
|----------|--------|----------|----------------|-----------------|
| Validação de negócio | Não foi possível salvar | [Mensagem retornada pela API] | Entendi | Tentar Novamente |
| Falha de conexão | Sem conexão com servidor | Não foi possível conectar. Verifique sua internet e tente novamente. | Entendi | Tentar Novamente |
| Timeout | Tempo de resposta excedido | O servidor demorou para responder. Tente novamente em alguns instantes. | Entendi | Tentar Novamente |
| Erro interno (5xx) | Algo deu errado | Não foi possível salvar a viagem. Tente novamente em alguns instantes. | Entendi | Tentar Novamente |
| Token expirado | Sessão expirada | Sua sessão expirou. Faça login novamente para continuar. | Entendi | (sem ação secundária) |

#### Elementos Interativos

| Elemento | Tipo | Ação | Rótulo de Acessibilidade |
|----------|------|------|--------------------------|
| BottomSheet de erro | Modal | Exibe erro retornado pela API ou erro de rede | "Mensagem de erro" |
| Botão Entendi | MaterialButton | Fecha o BottomSheet e mantém o usuário no formulário | "Entendi, fechar mensagem de erro" |
| Botão Tentar Novamente | MaterialButton | Fecha o BottomSheet e habilita novo envio | "Tentar salvar novamente" |
| Fechar (X) | IconButton | Fecha o BottomSheet sem executar nova ação | "Fechar" |

---

### 3.5 Regras de UI

1. O botão **Salvar** deve ficar indisponível enquanto o cadastro estiver em andamento.
2. O usuário não deve conseguir disparar múltiplas tentativas simultâneas de salvamento.
3. Os campos obrigatórios devem estar claramente marcados com asterisco (*) no label.
4. Mensagens de erro de campo devem aparecer próximas ao campo correspondente em cor vermelha.
5. A validação local deve ocorrer imediatamente quando o usuário sai do campo (blur) ou ao tocar em **Salvar**.
6. Os campos devem ser desabilitados enquanto o salvamento estiver em andamento.
7. A data deve ser selecionada por um `DatePickerDialog`, não por digitação livre.
8. A data deve ser exibida em formato DD/MM/YYYY na tela.
9. O `Spinner` ou `MaterialAutoCompleteTextView` deve oferecer uma lista pré-definida de tipos de transporte.
10. Descrição é opcional, mas se preenchida, pode ter máximo de 500 caracteres com contador visual (opcional).
11. Título é obrigatório, com máximo de 100 caracteres.
12. A tela deve ser utilizável em diferentes tamanhos de tela Android (phone, tablet).
13. A tela deve seguir o padrão visual do aplicativo (cores, tipografia, cantos arredondados).
14. Mensagens de erro retornadas por API devem ser exibidas no BottomSheet modal padrão, nunca em AlertDialog ou outros componentes.
15. O BottomSheet deve apresentar título, mensagem e pelo menos uma ação (Entendi ou Tentar Novamente).
16. O texto exibido no BottomSheet não deve conter termos técnicos, código HTTP, stack trace ou payload da API.
17. O usuário deve permanecer no formulário após fechar o BottomSheet de erro.
18. Os dados preenchidos devem ser preservados após erro, permitindo correção e retentativa.
19. A senha (se houver) pode ser limpa após erro conforme política de segurança, mas dados de viagem devem ser preservados.
20. O BottomSheet deve seguir padrão visual do aplicativo com cantos arredondados, padding adequado e linguagem clara.
21. O BottomSheet deve ser acessível para leitores de tela.
22. Ao tocar em **Fechar**, o formulário deve ser descartado sem salvar nada.
23. A barra superior (AppBar) deve permitir fechar o formulário por um ícone X ou gesto de voltar (quando apropriado).
24. O formulário deve funcionar em modo retrato e paisagem, com layout responsivo.

---

### 3.6 Catálogo de Componentes

| Componente | Variante | Configuração |
|------------|----------|--------------|
| `AppBarLayout` | Padrão | Título: "Nova Viagem", botão fechar (X), elevação padrão |
| `TextInputLayout` + `TextInputEditText` | Padrão | Rótulo: "Título", hint: "Ex: Viagem para SP", maxLength: 100, obrigatório, validação ao perder foco |
| `TextInputLayout` + `TextInputEditText` | Multiline | Rótulo: "Descrição", hint: "Ex: Viagem de bike...", maxLines: 5, maxLength: 500, opcional, contador caracteres opcional |
| `MaterialAutoCompleteTextView` ou `Spinner` | Dropdown | Rótulo: "Tipo de Transporte", opções: ["Carro", "Moto", "Bike", "Ônibus", "Outro"], obrigatório, dropdown expandido ao tocar |
| `TextInputLayout` + `EditText` + `DatePickerDialog` | Date Picker | Rótulo: "Data de Início", readOnly: true, clickable: true, formato exibido: DD/MM/YYYY, obrigatório |
| `TextInputLayout` + `EditText` + `DatePickerDialog` | Date Picker | Rótulo: "Data de Fim", readOnly: true, clickable: true, formato exibido: DD/MM/YYYY, obrigatório |
| `MaterialButton` | Contained (Padrão) | Rótulo: "Salvar", largura match_parent, background color: primary, estado normal/carregando/desabilitado |
| `MaterialButton` | Outlined | Rótulo: "Cancelar", largura wrap_content ou compartilhada, background: transparent, border: stroke |
| `IconButton` | Padrão | Ícone: Close (X), tamanho: 24dp, acessibilidade: "Fechar" |
| `ProgressBar` | Circular (Indeterminate) | Tamanho: small (16dp-20dp), exibido no centro do botão Salvar durante carregamento |
| `TextInputLayout.error` | Erro inline | Cor: error color (vermelho), tamanho: small, altura: wrap_content, exibida sob cada campo |
| `BottomSheetDialogFragment` | Material | Behavior: expanded/peek_height, padding: 16dp, cantos arredondados, elevação |
| `MaterialButton` (no BottomSheet) | Contained/Outlined | Rótulos: "Entendi", "Tentar Novamente", distribuição: vertical ou horizontal conforme espaço |
| `TextView` (BottomSheet Título) | Bold | Tamanho: 18sp, cor: text primary, padding: 16dp |
| `TextView` (BottomSheet Mensagem) | Regular | Tamanho: 14sp, cor: text secondary, padding: 16dp, line spacing: 1.5 |
| `Snackbar` | Sucesso | Mensagem: "Viagem criada com sucesso", duração: 1500-2000ms, cor background: green/success |
| `ScrollView` | Wrapper | Contém todos os campos do formulário, fillViewport: true |
| `LinearLayout` | Vertical | Contém os dois botões de ação (Salvar e Cancelar) com espaçamento apropriado |

---

## 4. Design Técnico

### 4.1 Diretriz Técnica — Java + XML

A feature de cadastro de nova viagem deve ser implementada com **Fragment Java + layout XML**, observando `LiveData<CreateTripUiState>` exposto pelo respectivo `ViewModel`. A camada visual não deve conter regra de negócio; ela apenas coleta eventos do usuário, atualiza campos visuais, exibe mensagens e navega conforme eventos emitidos pelo ViewModel.

**Arquivos esperados:**

| Tipo | Convenção |
|------|-----------|
| Fragment | `CreateTripFragment.java` |
| ViewModel | `CreateTripViewModel.java` |
| Layout da tela | `fragment_create_trip.xml` |
| Navegação | `nav_graph.xml` |
| Strings | `res/values/strings.xml` |
| Cores/tema | `res/values/colors.xml`, `themes.xml` |

A implementação deve usar **ViewBinding**, por exemplo `FragmentCreateTripBinding`, evitando `findViewById` repetitivo.

### 4.2 Posicionamento no Módulo

**Módulo:** `features/trips/create` (ou `features/mytrips/create`)  
**Novo módulo necessário:** Sim (dentro de features/trips ou features/mytrips)

A feature de criação de viagem deve ficar dentro do módulo de gerenciamento de viagens (trips). Esse módulo deve concentrar responsabilidades relacionadas ao ciclo de vida da viagem: criação, edição, exclusão, ativação e listagem.

A feature deve depender de:
- Módulo de navegação (AndroidX Navigation Component)
- Design System (componentes reutilizáveis)
- Core/Network (Retrofit client para API)
- Core/Persistence (Room database)
- SharedDomain (Trip entity e DTOs)
- Componente padrão de BottomSheet modal para erros de endpoint

### 4.3 Decomposição de Componentes / Classes

| Componente | Tipo | Responsabilidade |
|------------|------|-----------------|
| `CreateTripFragment` | Fragment / Tela XML | Renderiza o formulário com 5 campos de entrada, botões de ação, valida feedback inline, observa ViewModel, dispara eventos de interação. |
| `CreateTripViewModel` | ViewModel | Mantém `LiveData<CreateTripUiState>`, `SingleLiveEvent<CreateTripUiEvent>`, valida campos localmente, aciona `CreateTripUseCase`, emite eventos de navegação ou erro. |
| `CreateTripUiState` | Classe / Data Class | Representa o estado visual da tela: valores dos campos, erros inline, estado de carregamento, disponibilidade de botões. |
| `CreateTripUiEvent` | Classe / Sealed Class | Representa eventos únicos: `NavigateToMyTrips`, `ShowErrorBottomSheet`, `ShowSuccessSnackbar`. |
| `CreateTripAction` | Classe / Sealed Class | Representa ações do usuário: `UpdateTitle`, `UpdateDescription`, `UpdateType`, `UpdateStartDate`, `UpdateEndDate`, `OnSaveClicked`, `OnCancelClicked`. |
| `CreateTripFormValidator` | Validador | Valida campos localmente antes da chamada de API: título obrigatório, descrição (opcional), tipo obrigatório, datas válidas, data fim > data início. |
| `CreateTripUseCase` | Caso de Uso | Orquestra a criação de viagem: chama `TripRepository.createTrip()` e retorna sucesso ou falha para o ViewModel. |
| `TripRepository` | Repositório | Abstrai operações de viagem (criar, listar, editar, deletar). Coordena entre `TripRemoteDataSource` e `TripLocalDataSource`. |
| `TripRemoteDataSource` | Fonte de Dados Remota | Realiza chamada ao endpoint `POST /trips` e converte request/response em DTOs. |
| `TripLocalDataSource` | Fonte de Dados Local | Lê e grava entidades `Trip` no banco Room, retornando `LiveData<Trip>` ou operações síncronas. |
| `CreateTripRequestDto` | DTO de Request | Representa o corpo da requisição enviado para a API: `title`, `description`, `type`, `start_date`, `end_date`. |
| `TripResponseDto` | DTO de Response | Representa a resposta de sucesso da API: `id`, `title`, `description`, `type`, `status` (`pending`), `start_date`, `end_date`, `created_at`. |
| `TripMapper` | Mapper | Converte DTOs da API em entidades de domínio ou Room. |
| `TripEntity` | Entidade Room | Tabela local `trips` com colunas: `id` (PK), `title`, `description`, `type`, `status`, `start_date`, `end_date`, `created_at`, `user_id`. |
| `StandardErrorBottomSheet` | Componente de UI | Exibe erros de API em BottomSheet modal padrão com título, mensagem e ações. |
| `CreateTripNavigator` | Router / Navigator | Gerencia navegação da feature para **Minhas Viagens** após sucesso ou cancelamento. |
| `ConnectivityObserver` | Serviço / Observer | Informa se há conexão com a internet. |

### 4.4 Fluxo de Dados (MVVM)

```
CreateTripFragment
  └─► observa CreateTripViewModel.uiState: LiveData<CreateTripUiState>
      └─► observa CreateTripViewModel.uiEvent: SingleLiveEvent<CreateTripUiEvent>

Interação do usuário:
CreateTripFragment
  └─► ViewModel.onAction(CreateTripAction)
        └─► atualiza CreateTripUiState (valores dos campos, erros)
        └─► (se botão Salvar) valida localmente com CreateTripFormValidator
        └─► (se OK) aciona CreateTripUseCase.execute(tripData)
              └─► TripRepository.createTrip(CreateTripRequestDto)
                    ├─► TripRemoteDataSource.createTrip() → API POST /trips
                    │     ├─► sucesso → TripResponseDto
                    │     │     └─► TripMapper.dtoToEntity() → TripEntity
                    │     │           └─► TripLocalDataSource.insert() → Room
                    │     │                 └─► retorna Trip (domínio)
                    │     └─► erro → Exception
                    └─► Resultado (Success<Trip> ou Error)
              └─► ViewModel emite CreateTripUiEvent
                    ├─► NavigateToMyTrips (sucesso)
                    └─► ShowErrorBottomSheet (erro)

Fragment reage aos eventos:
  ├─► NavigateToMyTrips → navega para MyTripsFragment
  └─► ShowErrorBottomSheet → exibe BottomSheetDialogFragment com mensagem
```

### 4.5 Endpoints de API Utilizados

| Endpoint | Método | Contrato | Observações |
|----------|--------|----------|-------------|
| `/trips` | POST | Ver Spec Técnica §6.1 - `TripRequest` → `TripResponse` | Requer autenticação Bearer. Cria viagem com status inicial `pendente`. |

**Contrato de Request:**

```json
{
  "title": "string (obrigatório, máx 100 caracteres)",
  "description": "string (opcional, máx 500 caracteres)",
  "type": "string (obrigatório, enum: ['carro', 'moto', 'bike', 'ônibus', 'outro'])",
  "start_date": "ISO 8601 (obrigatório, formato: 2026-06-11T10:30:00Z)",
  "end_date": "ISO 8601 (obrigatório, deve ser posterior a start_date)"
}
```

**Contrato de Response (sucesso - 201/200):**

```json
{
  "id": "uuid",
  "user_id": "uuid",
  "title": "string",
  "description": "string | null",
  "type": "string",
  "status": "pending",
  "start_date": "ISO 8601",
  "end_date": "ISO 8601",
  "created_at": "ISO 8601"
}
```

**Códigos de Erro:**
- `400 Bad Request`: Dados malformados
- `422 Unprocessable Entity`: Validação de negócio (ex.: data inválida)
- `401 Unauthorized`: Token ausente ou expirado
- `500+ Server Error`: Erro interno do servidor

### 4.6 Alterações na Persistência Local

| Tipo de alteração | Entidade / Tabela | Campos | Migração necessária |
|-------------------|-------------------|--------|---------------------|
| Nova entidade | `Trip` | `id (String, PK), user_id (String, FK), title (String), description (String?), type (String), status (String), start_date (Long), end_date (Long), created_at (Long)` | Sim — versão N→N+1 |

**Motivo:** Armazenar viagens do usuário logado localmente para permitir exibição offline da lista e, após criar nova viagem, inseri-la imediatamente no banco local sem aguardar novas sincronizações.

**Operações Room esperadas:**
- `TripDao.insert(Trip)` — insere nova viagem
- `TripDao.getTripsForUser(userId)` — retorna `LiveData<List<Trip>>`
- `TripDao.getById(tripId)` — retorna uma viagem por ID
- `TripDao.update(Trip)` — atualiza viagem existente
- `TripDao.delete(Trip)` — deleta viagem

### 4.7 Definição de Estado (UI State)

```java
// CreateTripUiState.java
public class CreateTripUiState {
    // Dados do formulário
    private String title;
    private String description;
    private String type;
    private Long startDate; // timestamp em ms
    private Long endDate;
    
    // Erros de validação local
    private String titleError;
    private String descriptionError;
    private String typeError;
    private String startDateError;
    private String endDateError;
    
    // Estados de UI
    private boolean isLoading;
    private boolean isSaveButtonEnabled;
    private boolean isCancelButtonEnabled;
    private boolean areFieldsEnabled;
    
    // Getters/Setters/Constructors
}
```

### 4.8 Definição de Eventos (UI Event)

```java
// CreateTripUiEvent.java (Sealed Class ou Enum)
public sealed class CreateTripUiEvent {
    public static class NavigateToMyTrips extends CreateTripUiEvent {}
    
    public static class ShowErrorBottomSheet extends CreateTripUiEvent {
        public final String title;
        public final String message;
        public final boolean canRetry;
        // Constructor
    }
    
    public static class ShowSuccessSnackbar extends CreateTripUiEvent {
        public final String message;
        // Constructor
    }
}
```

### 4.9 Tratamento de Erros

| Origem do erro | Tipo de erro | Tratamento | Feedback ao usuário |
|----------------|-------------|------------|---------------------|
| Validação local | Campo obrigatório vazio | Exibir mensagem sob o campo | "Este campo é obrigatório." |
| Validação local | Formato inválido (ex.: datas) | Exibir mensagem sob o campo | "Informe uma data válida." ou "Data de fim deve ser posterior..." |
| Sem rede | Erro de conectividade | Capturar `IOException`, registrar log | BottomSheet: "Sem conexão. Verifique sua internet e tente novamente." |
| API 422 | Validação de negócio | Extrair mensagem da resposta da API, registrar log | BottomSheet: mensagem retornada pela API |
| API 401 | Token expirado/inválido | Tentar refresh silencioso; se falhar, logout | BottomSheet: "Sua sessão expirou. Faça login novamente." |
| API 5xx | Erro de servidor | Registrar log + breadcrumb em analytics | BottomSheet: "Erro ao salvar a viagem. Tente novamente em alguns instantes." |
| Timeout | Requisição > 30s | Tratar como erro de rede | BottomSheet: "A solicitação demorou muito. Tente novamente." |

### 4.10 Regras Técnicas

1. O ViewModel não deve acessar diretamente API, banco local ou SharedPreferences.
2. Todas as validações locais devem ocorrer antes da chamada de API.
3. Enquanto o cadastro estiver em andamento, campos e botões devem ser desabilitados.
4. O botão **Salvar** deve ficar desabilitado enquanto `isLoading == true`.
5. Não deve ser possível disparar múltiplas requisições simultâneas (prevent duplicate submission).
6. Campos obrigatórios devem ser marcados com asterisco (*).
7. Erros de validação local devem aparecer imediatamente sob os campos.
8. Erros de API devem ser exibidos em BottomSheet modal padrão, nunca em AlertDialog.
9. O BottomSheet deve oferecer ações como "Entendi" ou "Tentar Novamente".
10. Dados preenchidos devem ser preservados após erro para retry.
11. DatePickerDialog deve ser usado para seleção de datas, não digitação livre.
12. Datas devem ser armazenadas como timestamp (Long) internamente, exibidas como DD/MM/YYYY.
13. Tipos de transporte devem ser fornecidos por Spinner/MaterialAutoCompleteTextView, não entrada de texto.
14. O título é obrigatório e limitado a 100 caracteres.
15. A descrição é opcional e limitada a 500 caracteres.
16. Após sucesso na criação, o ViewModel deve emitir evento de navegação para MyTripsFragment.
17. Após sucesso, um Snackbar ou Toast deve exibir "Viagem criada com sucesso".
18. Ao cancelar, o formulário deve descartar dados sem salvar e retornar para MyTripsFragment.
19. O Trip criado deve ser inserido imediatamente no banco local (Room) após sucesso da API.
20. A requisição para criar viagem deve incluir o header `Authorization: Bearer <accessToken>`.

### 4.11 Fluxo Técnico Resumido

1. `CreateTripFragment` renderiza o formulário vazio.
2. Usuário preenche os campos (valores emitidos como `UpdateTitle`, `UpdateDescription`, etc.).
3. `CreateTripViewModel` atualiza `CreateTripUiState` com os novos valores.
4. Usuário toca **Salvar**.
5. `CreateTripViewModel.onSaveClicked()` é chamado.
6. `CreateTripFormValidator` valida os campos localmente.
7. Se houver erro, `CreateTripUiState` é atualizado com mensagens de erro; nenhuma chamada de API é feita.
8. Se válidos, `CreateTripViewModel` emite um evento para desabilitar os campos e mostrar loading.
9. `CreateTripUseCase.execute()` é chamado.
10. `CreateTripUseCase` chama `TripRepository.createTrip(requestDto)`.
11. `TripRepository` chama `TripRemoteDataSource.createTrip()` (POST /trips).
12. A API retorna sucesso (201) com a viagem criada (status `pending`).
13. `TripMapper` converte o DTO em entidade Room.
14. `TripLocalDataSource.insert()` salva a viagem no banco.
15. `CreateTripUseCase` retorna `Success<Trip>`.
16. `CreateTripViewModel` emite `CreateTripUiEvent.NavigateToMyTrips`.
17. `CreateTripFragment` navega para `MyTripsFragment`.
18. Um Snackbar de sucesso pode ser exibido antes da navegação.
19. Se houver erro em qualquer etapa, `CreateTripViewModel` emite `ShowErrorBottomSheet`.
20. `CreateTripFragment` exibe o BottomSheet com mensagem de erro e opção de retry.

### 4.12 Modelos de Request/Response

#### `CreateTripRequestDto`

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `title` | String | Sim | Título da viagem (máx 100 caracteres) |
| `description` | String | Não | Descrição (máx 500 caracteres) |
| `type` | String (Enum) | Sim | Tipo de transporte: "carro", "moto", "bike", "ônibus", "outro" |
| `start_date` | ISO 8601 | Sim | Data/hora de início em UTC |
| `end_date` | ISO 8601 | Sim | Data/hora de fim em UTC (deve ser > start_date) |

#### `TripResponseDto`

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | UUID | Sim | ID da viagem gerado pela API |
| `user_id` | UUID | Sim | ID do usuário proprietário da viagem |
| `title` | String | Sim | Título da viagem |
| `description` | String | Não | Descrição |
| `type` | String | Sim | Tipo de transporte |
| `status` | String | Sim | Status inicial: "pending" |
| `start_date` | ISO 8601 | Sim | Data de início |
| `end_date` | ISO 8601 | Sim | Data de fim |
| `created_at` | ISO 8601 | Sim | Timestamp de criação |

---

## 5. Eventos de Analytics

| Nome do evento | Gatilho | Propriedades |
|----------------|---------|--------------|
| `create_trip_visualizado` | Tela de cadastro de viagem é aberta | `origem: String` (ex.: "my_trips_list", "fab_button"), `timestamp: Long` |
| `create_trip_titulo_preenchido` | Usuário preenche o campo Título | `titulo_vazio: Boolean`, `titulo_tamanho: Int` |
| `create_trip_descricao_preenchida` | Usuário preenche o campo Descrição | `descricao_vazia: Boolean`, `descricao_tamanho: Int` |
| `create_trip_tipo_selecionado` | Usuário seleciona o Tipo de Transporte | `tipo: String` |
| `create_trip_data_inicio_selecionada` | Usuário seleciona Data de Início | `data_valida: Boolean` |
| `create_trip_data_fim_selecionada` | Usuário seleciona Data de Fim | `data_valida: Boolean`, `intervalo_dias: Int` |
| `create_trip_validacao_local_falhou` | Usuário toca Salvar e validação local falha | `campos_invalidos: String` (ex.: "titulo,tipo"), `total_erros: Int` |
| `create_trip_salvando_iniciado` | App inicia o envio para a API | `tem_descricao: Boolean`, `duracao_preenchimento_ms: Int` |
| `create_trip_criado` | Viagem criada com sucesso na API | `trip_id: String`, `duracao_total_ms: Int`, `tipo: String` |
| `create_trip_criacao_falhou` | Criação falha por erro de API, rede ou timeout | `codigo_erro: String`, `tipo_erro: String` (ex.: "sem_conexao", "validacao_api", "timeout", "servidor"), `tentativa_numero: Int`, `duracao_ms: Int` |
| `create_trip_erro_bottomsheet_exibido` | BottomSheet de erro é exibido | `codigo_erro: String`, `tipo_erro: String`, `tem_botao_retry: Boolean` |
| `create_trip_tentar_novamente_tocado` | Usuário toca "Tentar Novamente" no BottomSheet | `codigo_erro: String`, `tipo_erro: String` |
| `create_trip_cancelado` | Usuário toca Cancelar ou Fechar antes de salvar | `tempo_em_formulario_ms: Int` |
| `create_trip_sessao_expirada` | Sessão expira durante o formulário ou envio | `tempo_decorrido_ms: Int` |

### Regras de Analytics

1. Não enviar título, descrição ou dados sensíveis nos eventos.
2. Não enviar payload completo de requisições/respostas da API.
3. Erros de endpoint devem registrar apenas código/categoria segura.
4. O evento `create_trip_criado` deve ser disparado somente após persistência bem-sucedida em Room.
5. O tempo `duracao_ms` deve medir o intervalo desde o toque em **Salvar** até sucesso/falha.
6. Erros de validação local devem registrar apenas categorias dos campos, não valores.
7. BottomSheet de erro deve sempre gerar um evento `create_trip_erro_bottomsheet_exibido`.

---

## 6. Permissões e Privacidade

| Permissão | Obrigatória | Quando solicitada | Se negada |
|-----------|-------------|-------------------|-----------|
| — | — | — | — |

**Nota:** Criar viagem não requer permissões especiais do Android.

**Dados armazenados localmente:**
- Trip entity em Room: `title`, `description`, `type`, `status`, `start_date`, `end_date`, `created_at`
- **Motivo:** Permitir exibição offline da lista de viagens e sincronização imediata após criar

**Dados enviados ao servidor:**
- `title`, `description`, `type`, `start_date`, `end_date` via POST /trips
- **Política de retenção:** A viagem é armazenada indefinidamente no servidor, com status `pending` até ativação

**Dados excluídos no logout:**
- Sim — Todas as viagens do usuário logado são deletadas do Room (cascata)

---

## 7. Notificações (se aplicável)

| Tipo de notificação | Gatilho | Título | Corpo | Ação |
|---------------------|---------|--------|-------|------|
| — | — | — | — | — |

**Nota:** Criar viagem não dispara notificações push nesta versão.

---

## 8. Localização (Strings)

**Arquivo de strings / recurso:** `res/values/strings.xml`

| Chave | Padrão (PT-BR) | Observações |
|-------|----------------|-------------|
| `create_trip.titulo` | "Nova Viagem" | Título da tela / AppBar |
| `create_trip.label.titulo` | "Título *" | Label do campo obrigatório |
| `create_trip.hint.titulo` | "Ex: Viagem para SP" | Placeholder |
| `create_trip.label.descricao` | "Descrição" | Label do campo opcional |
| `create_trip.hint.descricao` | "Ex: Detalhes da viagem..." | Placeholder |
| `create_trip.label.tipo` | "Tipo de Transporte *" | Label do dropdown obrigatório |
| `create_trip.hint.tipo` | "Selecione um tipo" | Hint do dropdown |
| `create_trip.tipo.carro` | "Carro" | Opção do dropdown |
| `create_trip.tipo.moto` | "Moto" | Opção do dropdown |
| `create_trip.tipo.bike` | "Bike" | Opção do dropdown |
| `create_trip.tipo.onibus` | "Ônibus" | Opção do dropdown |
| `create_trip.tipo.outro` | "Outro" | Opção do dropdown |
| `create_trip.label.data_inicio` | "Data de Início *" | Label do date picker obrigatório |
| `create_trip.hint.data_inicio` | "DD/MM/YYYY" | Placeholder |
| `create_trip.label.data_fim` | "Data de Fim *" | Label do date picker obrigatório |
| `create_trip.hint.data_fim` | "DD/MM/YYYY" | Placeholder |
| `create_trip.botao.salvar` | "Salvar" | CTA principal |
| `create_trip.botao.cancelar` | "Cancelar" | CTA secundário |
| `create_trip.botao.tentando` | "Salvando..." | Estado durante carregamento |
| `create_trip.validacao.titulo_obrigatorio` | "Este campo é obrigatório." | Erro de campo vazio |
| `create_trip.validacao.titulo_espacos` | "Título não pode conter apenas espaços." | Erro de validação |
| `create_trip.validacao.titulo_maximo` | "Máximo de 100 caracteres." | Erro de comprimento |
| `create_trip.validacao.descricao_maximo` | "Máximo de 500 caracteres." | Erro de comprimento |
| `create_trip.validacao.tipo_obrigatorio` | "Selecione um tipo de transporte." | Erro de campo vazio |
| `create_trip.validacao.data_inicio_obrigatoria` | "Este campo é obrigatório." | Erro de campo vazio |
| `create_trip.validacao.data_fim_obrigatoria` | "Este campo é obrigatório." | Erro de campo vazio |
| `create_trip.validacao.data_fim_posterior` | "Data de fim deve ser posterior à data de início." | Erro de validação de datas |
| `create_trip.validacao.data_passado` | "Data não pode ser no passado." | Erro de validação de data |
| `create_trip.validacao.data_invalida` | "Informe uma data válida." | Erro genérico de data |
| `create_trip.erro.titulo` | "Não foi possível salvar" | Título do BottomSheet de erro |
| `create_trip.erro.sem_conexao.titulo` | "Sem conexão com servidor" | Título para falha de rede |
| `create_trip.erro.sem_conexao.mensagem` | "Não foi possível conectar. Verifique sua internet e tente novamente." | Mensagem de erro |
| `create_trip.erro.timeout.titulo` | "Tempo de resposta excedido" | Título para timeout |
| `create_trip.erro.timeout.mensagem` | "O servidor demorou para responder. Tente novamente em alguns instantes." | Mensagem de erro |
| `create_trip.erro.validacao.titulo` | "Dados inválidos" | Título para erro 422 |
| `create_trip.erro.validacao.mensagem` | "Verifique os dados e tente novamente." | Mensagem padrão |
| `create_trip.erro.servidor.titulo` | "Algo deu errado" | Título para erro 5xx |
| `create_trip.erro.servidor.mensagem` | "Não foi possível salvar a viagem. Tente novamente em alguns instantes." | Mensagem de erro |
| `create_trip.erro.sessao_expirada.titulo` | "Sessão expirada" | Título para erro 401 |
| `create_trip.erro.sessao_expirada.mensagem` | "Sua sessão expirou. Faça login novamente para continuar." | Mensagem de erro |
| `create_trip.bottomsheet.botao.entendi` | "Entendi" | Botão para fechar BottomSheet |
| `create_trip.bottomsheet.botao.tentar_novamente` | "Tentar Novamente" | Botão para retry |
| `create_trip.sucesso.mensagem` | "Viagem criada com sucesso" | Mensagem de Snackbar/Toast |
| `create_trip.acessibilidade.tela` | "Formulário para criar uma nova viagem" | Nome acessível da tela |
| `create_trip.acessibilidade.campo_titulo` | "Título da viagem, campo obrigatório" | Descrição acessível |
| `create_trip.acessibilidade.campo_descricao` | "Descrição da viagem, campo opcional" | Descrição acessível |
| `create_trip.acessibilidade.campo_tipo` | "Tipo de transporte, campo obrigatório" | Descrição acessível |
| `create_trip.acessibilidade.campo_data_inicio` | "Data de início, campo obrigatório, toque para abrir calendário" | Descrição acessível |
| `create_trip.acessibilidade.campo_data_fim` | "Data de fim, campo obrigatório, toque para abrir calendário" | Descrição acessível |
| `create_trip.acessibilidade.botao_salvar` | "Salvar nova viagem" | Descrição acessível |
| `create_trip.acessibilidade.salvando` | "Salvando nova viagem, aguarde" | Durante carregamento |
| `create_trip.acessibilidade.botao_cancelar` | "Cancelar cadastro e voltar" | Descrição acessível |
| `create_trip.acessibilidade.botao_fechar` | "Fechar formulário" | Descrição acessível |
| `create_trip.acessibilidade.erro` | "Mensagem de erro" | Descrição acessível do BottomSheet |
| `create_trip.acessibilidade.fechar_erro` | "Fechar mensagem de erro" | Descrição acessível do botão Entendi |
| `create_trip.acessibilidade.tentar_novamente` | "Tentar salvar novamente" | Descrição acessível |

---

## 9. Definição de Pronto (Definition of Done)

- [ ] Todos os campos do formulário implementados com validação local
- [ ] DatePickerDialog integrando com campos de data
- [ ] ViewModel com CreateTripUiState e CreateTripUiEvent
- [ ] UseCase e Repository implementados
- [ ] Integração com POST /trips
- [ ] Persistência em Room (TripEntity)
- [ ] BottomSheet modal padrão para erros de API
- [ ] Estados de carregamento e desabilitação de campos
- [ ] Analytics disparados em todos os eventos críticos
- [ ] Testes unitários para ViewModel e Validator
- [ ] Testes de UI para fluxo de criação de viagem
- [ ] Strings localizadas em `strings.xml`
- [ ] Acessibilidade (contentDescription) em todos os elementos
- [ ] Testes em múltiplos tamanhos de tela
- [ ] Documentação técnica atualizada (este arquivo)

---

## 10. Dependências e Bloqueios

| Dependência | Tipo | Responsável | Status | Bloqueante |
|-------------|------|-------------|--------|------------|
| Design System (BottomSheet padrão, componentes) | Interna | @Design | Não definido | Sim |
| Core/Network (Retrofit + interceptadores) | Interna | @Backend | Não definido | Sim |
| Core/Persistence (Room + DAOs) | Interna | @Backend | Não definido | Sim |
| API endpoint POST /trips finalizado | Externa | @APITeam | Não definido | Sim |

---

## 11. Questões em Aberto

| # | Pergunta | Responsável | Prazo |
|---|----------|-------------|-------|
| 1 | Qual é o comprimento máximo de `description` aceito pela API? | @APITeam | — |
| 2 | A API valida datas em formato ISO 8601 ou timestamp Unix? | @APITeam | — |
| 3 | Tipos de transporte são case-sensitive na API? | @APITeam | — |
| 4 | Qual é a política de retry para timeouts? | @Backend | — |
| 5 | LocalDateTime ou UTC obrigatório para datas? | @APITeam | — |

---

## 12. Histórico de Revisões

| Versão | Data | Autor | Resumo |
|--------|------|-------|--------|
| 0.1.0 | 2026-06-11 | Jose Julio | Rascunho inicial com seções 1-3 completas |
| 0.2.0 | 2026-06-11 | Jose Julio | Seções 4-8 implementadas com Design Técnico detalhado |

---
