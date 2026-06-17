# Feature Spec — [Nome da Feature]

> **Status:** `rascunho` | `revisão` | `aprovado` | `em-desenvolvimento` | `entregue` | `descontinuado`
> **Versão:** 0.1.0 · **Atualizada em:** AAAA-MM-DD
> **Vinculada ao APP-SPEC:** §[seção] · RF-[XX]

---

## 1. Resumo

### 1.1 O Que Faz
<!-- Um parágrafo. Sem detalhes de implementação. -->

### 1.2 Por Que Existe

**História de usuário:** [US-XX do APP-SPEC]
**Objetivo de negócio:** [O-XX do APP-SPEC]

### 1.3 Escopo

**Dentro:**
-

**Fora (nesta iteração):**
-

---

## 2. Comportamento do Usuário

### 2.1 Pontos de Entrada

| Ponto de entrada | Gatilho | Pré-condição |
|------------------|---------|--------------|
| [Tela de origem] | [Toque / Deep link / Notificação] | [ex.: usuário autenticado] |

### 2.2 Fluxo Principal

**Pré-condição:** [Estado inicial do app.]

1. O usuário [ação].
2. O app [resposta / feedback].
3. …
4. Objetivo concluído.

**Pós-condição:** [Estado dos dados / UI após o sucesso.]

### 2.3 Fluxos Alternativos

#### 2.3.1 [Nome — ex.: Retry após erro]
**Gatilho:** [O que causa este caminho.]
1.

#### 2.3.2 [Nome — ex.: Estado vazio]
**Gatilho:** [O que causa este caminho.]
1.

### 2.4 Casos Extremos

| Cenário | Comportamento esperado |
|---------|------------------------|
| Sem rede ao entrar | Banner offline; dados em cache ou ação bloqueada. |
| Lista vazia | Estado vazio com [texto + CTA]. |
| Máximo de itens | Desabilitar adição + mensagem de limite. |
| API lenta (> Xs) | Skeleton após [X] ms. |
| [Caso específico] | |

---

## 3. UI

### 3.1 Telas

| ID | Nome | Tipo | Descrição |
|----|------|------|-----------|
| TLA-01 | [Nome] | `push` / `modal` / `sheet` | |

### 3.2 Detalhe por Tela

#### TLA-01 — [Nome]

**Referência:** [Link Figma]
**Nome acessível:** "[String anunciada pelo TalkBack ao carregar]"

**Layout**

```
┌─────────────────────────────┐
│  Barra de Navegação         │
│  Título: "[Título]"         │
├─────────────────────────────┤
│  [Área de conteúdo]         │
│  ┌───────────────────────┐  │
│  │  [Componente A]       │  │
│  ├───────────────────────┤  │
│  │  [Componente B—lista] │  │
│  └───────────────────────┘  │
├─────────────────────────────┤
│  [Botão CTA]                │
└─────────────────────────────┘
```

**Apresentações da tela** *(cada linha corresponde a um método do `ViewContract`)*

| Apresentação | Gatilho | Método chamado | O que muda na UI |
|--------------|---------|----------------|------------------|
| Carregando | Feature inicia / ação disparada | `showLoading()` | Skeleton no lugar do conteúdo |
| Conteúdo | Dados recebidos com sucesso | `showContent(viewModel)` | Lista / conteúdo renderizado |
| Vazio | Response sem itens | `showEmpty()` | View de estado vazio |
| Erro | Falha de rede ou API | `showError(msg, canRetry)` | Banner de erro + botão retry |

**Elementos interativos**

| Elemento | Tipo | Ação | Rótulo TalkBack |
|----------|------|------|-----------------|
| [Botão CTA] | Button | Abre TLA-02 | "[Rótulo]" |
| [Item da lista] | Row | [ação] | "[Rótulo dinâmico]" |

**Componentes do Design System**

| Componente | Variante | Configuração |
|------------|----------|--------------|
| `BotaoPrimario` | Padrão | Rótulo: "[texto]", largura total |
| `LinhaLista` | Ícone + disclosure | Ícone: [nome] |

---

## 4. Design Técnico

> Padrão de arquitetura, pacotes, dependências e tratamento global de erros seguem o APP-SPEC.

### 4.1 Endpoints Utilizados

| Endpoint | Método | Request | Response | Observações |
|----------|--------|---------|----------|-------------|
| `/v1/[recurso]` | GET | — | `[DTO]` | |
| `/v1/[recurso]/{id}` | POST | `[DTO]` | `[DTO]` | |

### 4.2 Alterações no Schema Local

| Tabela / Entidade | Alteração | Migração |
|-------------------|-----------|----------|
| `[Entidade]` | Nova tabela / campo `nomeCampo: Tipo` | Room v[N] → v[N+1] |

> Se não há alteração de schema, remova esta seção.

---

## 5. Analytics

| Evento | Gatilho | Propriedades |
|--------|---------|--------------|
| `[feature]_viewed` | Tela aparece | `source: String`, `item_count: Int` |
| `[feature]_[action]_tapped` | Toque no CTA | `item_id: String` |
| `[feature]_completed` | Pós-condição atingida | `duration_ms: Int` |
| `[feature]_error` | Estado de erro exibido | `error_code: String` |

---

## 6. Permissões e Privacidade

| Permissão | Obrigatória | Quando solicitar | Se negada |
|-----------|-------------|------------------|-----------|
| [ex.: Câmera] | Sim / Não | Primeiro uso | [Desabilitar feature / Alternativa] |

**Dados persistidos localmente:** [Liste dados pessoais/sensíveis e motivo.]
**Dados enviados ao servidor:** [Quais e política de retenção.]
**Dados excluídos no logout:** Sim / Não — [quais campos.]

> Se a feature não coleta dados além do fluxo normal do app, remova esta seção.

---

## 7. Notificações

| Tipo | Gatilho | Título | Corpo | Deep link |
|------|---------|--------|-------|-----------|
| [Nome] | Push / Local | "[Título]" | "[Corpo]" | `app://[feature]/[id]` |

> Se não há notificações, remova esta seção.

---

## 8. Strings / Localização

**Arquivo:** `res/values/strings_[feature].xml`

| Chave | PT-BR | Observações |
|-------|-------|-------------|
| `[feature]_titulo` | "[Título]" | Máx. 20 chars |
| `[feature]_vazio_mensagem` | "[Mensagem]" | |
| `[feature]_erro_generico` | "[Mensagem]" | |

---

## 9. Definition of Done

- [ ] Critérios de aceite das US vinculadas verificados
- [ ] Cobertura unitária ≥ 80% (Interactor, Presenter, Worker)
- [ ] Testes de integração passando no CI
- [ ] Smoke test de UI verde
- [ ] Sem novos warnings de lint
- [ ] TalkBack auditado (ordem de foco, rótulos, área mínima 48×48dp)
- [ ] Eventos de analytics disparando (debug dashboard)
- [ ] Strings adicionadas para todos os idiomas suportados
- [ ] Feature flag configurada como `desativada` por padrão
- [ ] Aprovação de design
- [ ] Code review do Tech Lead aprovado
- [ ] Aceite do Product Owner confirmado

---

## 10. Dependências e Bloqueios

| Dependência | Tipo | Responsável | Status | Bloqueante |
|-------------|------|-------------|--------|------------|
| `GET /v1/[recurso]` | Backend | [Time] | Em andamento | Sim |
| Tokens de design v[N] | Design System | [Nome] | Concluído | Não |

---

## 11. Questões em Aberto

| # | Pergunta | Responsável | Prazo |
|---|----------|-------------|-------|
| F-01 | | | |

---

## Histórico de Revisões

| Versão | Data | Autor | Resumo |
|--------|------|-------|--------|
| 0.1.0 | AAAA-MM-DD | [Nome] | Rascunho inicial |