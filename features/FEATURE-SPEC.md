# Especificação de Feature — [Nome da Feature]

> **Tipo de documento:** Spec de Feature  
> **Status:** `rascunho` | `revisão` | `aprovado` | `em-desenvolvimento` | `entregue` | `descontinuado`  
> **Versão:** 0.1.0  
> **Última atualização:** AAAA-MM-DD  
> **Dono da feature:** [Nome]  
> **Tech lead:** [Nome]  
> **Spec de Produto vinculada:** [../PRODUCT-SPEC.md](../PRODUCT-SPEC.md) — §[seção]  
> **Spec Técnica vinculada:** [../TECHNICAL-SPEC.md](../TECHNICAL-SPEC.md) — RF-[XX]  
> **Plataforma:** `iOS` | `Android` | `iOS + Android`  
> **Sprint / Marco:** [Sprint N / Nome do marco]  
> **Esforço estimado:** [X dias / Y story points]

---

## 1. Resumo da Feature

### 1.1 O Que Esta Feature Faz
<!-- Um parágrafo. Linguagem simples. Sem detalhes de implementação. -->

### 1.2 Por Que Existe
<!-- Vincule ao problema do usuário e ao objetivo de produto que atende. -->

**Necessidade do usuário:** [US-XX da Spec de Produto]  
**Objetivo de negócio:** [Objetivo da Spec de Produto §1.3]

### 1.3 Escopo

**Dentro do escopo:**
- 

**Fora do escopo (nesta iteração):**
- 

---

## 2. Comportamento Visível ao Usuário

### 2.1 Pontos de Entrada
<!-- De onde / como o usuário chega a esta feature. -->

| Ponto de entrada | Gatilho | Pré-condição |
|------------------|---------|--------------|
| [Nome da tela] | [Toque / Swipe / Deep link / Notificação] | [Usuário logado / etc.] |

### 2.2 Fluxo do Caminho Feliz
<!-- Passo a passo na perspectiva do usuário. Sem código, sem nomes de componentes. -->

**Pré-condição:** [Estado em que o app deve estar antes do passo 1.]

1. O usuário [ação].
2. O app [resposta / feedback].
3. O usuário [ação].
4. O app [resposta].
5. O objetivo da feature está concluído.

**Pós-condição:** [Estado do app / dados após o sucesso.]

### 2.3 Fluxos Alternativos

#### 2.3.1 [Nome do Fluxo Alternativo — ex.: Retry após erro]
**Gatilho:** [O que causa este caminho.]

1. 

#### 2.3.2 [Nome do Fluxo Alternativo — ex.: Estado vazio]
**Gatilho:** [O que causa este caminho.]

1. 

### 2.4 Casos Extremos e Condições de Contorno

| Cenário | Comportamento esperado |
|---------|------------------------|
| Sem rede ao entrar na feature | Exibir banner offline; bloquear ação ou servir dados em cache. |
| Lista vazia / zero resultados | Exibir estado vazio com [texto + CTA]. |
| Item único | [Ocultar ou exibir indicador de quantidade — especifique.] |
| Máximo de itens atingido | [Desabilitar botão de adicionar + exibir mensagem de limite.] |
| Texto muito longo | Truncar em [N] caracteres; exibir contador a partir de [N-20]. |
| API lenta (> Xs) | Exibir skeleton / estado de carregamento após [X]ms. |

---

## 3. Especificação de UI

### 3.1 Telas / Views Desta Feature

| ID da Tela | Nome | Tipo | Descrição |
|------------|------|------|-----------|
| TLA-01 | [Nome] | `push` / `modal` / `sheet` / `raiz de aba` | |
| TLA-02 | | | |

### 3.2 Detalhe da Tela — TLA-01: [Nome]

**Referência de design:** [Link Figma / wireframe]  
**Nome acessível:** "[String anunciada pelo leitor de tela ao carregar a tela]"

#### Layout
<!-- Descreva regiões de layout e hierarquia de componentes. Sem coordenadas. -->

```
┌─────────────────────────────┐
│  Barra de Navegação         │
│  Título: "[Título da tela]" │
├─────────────────────────────┤
│  [Descrição da área de      │
│   conteúdo]                 │
│  ┌───────────────────────┐  │
│  │  [Componente A]       │  │
│  ├───────────────────────┤  │
│  │  [Componente B—lista] │  │
│  │  · Item 1             │  │
│  │  · Item 2             │  │
│  └───────────────────────┘  │
├─────────────────────────────┤
│  [Botão CTA principal]      │
└─────────────────────────────┘
```

#### Estados
| Estado | Gatilho | O que muda na UI |
|--------|---------|------------------|
| Carregando | Feature entra / atualização de dados | Skeleton substitui o conteúdo |
| Carregado | Dados recebidos | Conteúdo é renderizado |
| Vazio | Resposta está vazia | View de estado vazio substitui a lista |
| Erro | Falha de rede / API | Banner de erro + botão de retry |

#### Elementos Interativos
| Elemento | Tipo | Ação | Rótulo de acessibilidade |
|----------|------|------|--------------------------|
| [Botão CTA] | Botão | Abre TLA-02 (push) | "[Rótulo para o leitor de tela]" |
| [Item da lista] | Linha da lista | [ação] | "[Rótulo dinâmico]" |

### 3.3 Catálogo de Componentes
<!-- Referencie componentes do Design System; especifique variante + configuração. -->

| Componente | Variante | Configuração |
|------------|----------|--------------|
| `BotaoPrimario` | Padrão | Rótulo: "[texto]", largura total |
| `LinhaLista` | Ícone + disclosure | Ícone à esquerda: [nome do ícone] |

---

## 4. Design Técnico

### 4.1 Posicionamento no Módulo
<!-- Em qual módulo existente esta feature se encaixa, ou se um novo módulo é necessário. -->

**Módulo:** `Features/[NomeDaFeature]`  
**Novo módulo necessário:** Sim / Não

### 4.2 Decomposição de Componentes / Classes

| Componente | Tipo | Responsabilidade |
|------------|------|-----------------|
| `[NomeDaFeature]View` | View | Renderiza TLA-01; vincula ao ViewModel |
| `[NomeDaFeature]ViewModel` | ViewModel / StateHolder | Mantém estado de UI; chama caso de uso |
| `[Acao]UseCase` | Caso de Uso / Interator | Orquestra a lógica de domínio |
| `[Recurso]Repository` | Repositório | Abstrai a fonte de dados |
| `[Recurso]RemoteSource` | Fonte de Dados | Chama API; mapeia DTO → entidade |
| `[Recurso]LocalSource` | Fonte de Dados | Lê/escreve no BD local |
| `[NomeDaFeature]Router` | Router / Coordinator | Gerencia a navegação desta feature |

### 4.3 Fluxo de Dados

```
View
  └─► ViewModel.aoAcionar()
        └─► UseCase.executar()
              ├─► Repository.buscar()
              │     ├─► FonteRemota → API → DTO → Entidade
              │     └─► FonteLocal  → BD  → Entidade
              └─► ViewModel.estado ← Result<[Entidade], Erro>
                    └─► View re-renderiza
```

### 4.4 Interface Pública (API desta Feature)
<!-- Se outros módulos/features dependem desta, defina a superfície pública. -->

```
// Pseudocódigo — intenção independente de linguagem

interface [NomeDaFeature]Entry {
    func iniciar(com contexto: [ContextoDaFeature]) -> [Manipulador de navegação]
}

struct [ContextoDaFeature] {
    idItem: String
    origem: OrigemNavegacao  // ex.: .deepLink | .push | .modal
}
```

### 4.5 Endpoints de API Utilizados

| Endpoint | Método | Contrato | Observações |
|----------|--------|----------|-------------|
| `/v1/[recurso]` | GET | Ver Spec Técnica §6.1 | Paginado, baseado em cursor |
| `/v1/[recurso]/{id}` | POST | | |

### 4.6 Alterações na Persistência Local

| Tipo de alteração | Entidade / Tabela | Campos adicionados / removidos | Migração necessária |
|-------------------|-------------------|-------------------------------|---------------------|
| Nova entidade | `[Entidade]` | — | Sim — versão N→N+1 |
| Adicionar campo | `[Entidade]` | `nomeCampo: Tipo` | Sim |
| Remover campo | | | Sim |

### 4.7 Definição de Estado

```
// Pseudocódigo

enum EstadoDaTela {
    ocioso
    carregando
    carregado(itens: [Item])
    vazio
    erro(mensagem: String, tentarNovamente: Bool)
}

struct Item {
    id: String
    titulo: String
    subtitulo: String?
    urlImagem: URL?
}
```

### 4.8 Tratamento de Erros

| Origem do erro | Tipo de erro | Tratamento | Mensagem ao usuário |
|----------------|-------------|------------|---------------------|
| Sem rede | Erro de conectividade | Retry com backoff exponencial (máx. 3×) | "Sem conexão. [Tentar novamente]" |
| 401 Não autorizado | Erro de autenticação | Disparar refresh do token → re-chamada → se falhar, logout | "Sessão expirada. Faça login novamente." |
| 404 Não encontrado | Erro do cliente | Remover item do cache local; exibir toast | "Item não está mais disponível." |
| 5xx Servidor | Erro de servidor | Log + breadcrumb no Crashlytics; exibir erro genérico | "Algo deu errado. [Tentar novamente]" |
| Timeout (> Xs) | Timeout de rede | Tratar como erro de conectividade | Igual a sem rede |

---

## 5. Eventos de Analytics

| Nome do evento | Gatilho | Propriedades |
|----------------|---------|--------------|
| `[feature]_visualizada` | Tela aparece | `origem: String`, `qtd_itens: Int` |
| `[feature]_[acao]_tocado` | Usuário toca no CTA | `id_item: String` |
| `[feature]_concluida` | Pós-condição de sucesso atingida | `duracao_ms: Int` |
| `[feature]_erro` | Estado de erro exibido | `codigo_erro: String`, `tentarNovamente: Bool` |

---

## 6. Permissões e Privacidade

| Permissão | Obrigatória | Quando solicitada | Se negada |
|-----------|-------------|-------------------|-----------|
| [ex.: Câmera] | [Obrigatória / Opcional] | [Primeiro uso / Sob demanda] | [Desabilitar feature / Exibir alternativa] |
| [ex.: Notificações] | Opcional | Após primeiro sucesso | Feature continua funcionando; sem badge de notificação |

**Dados armazenados localmente:** [Liste quaisquer dados pessoais ou sensíveis persistidos e o motivo.]  
**Dados enviados ao servidor:** [Liste quais dados do usuário são transmitidos e a política de retenção.]  
**Dados excluídos no logout:** [Sim / Não — quais campos.]

---

## 7. Notificações (se aplicável)

| Tipo de notificação | Gatilho | Título | Corpo | Deep link |
|---------------------|---------|--------|-------|-----------|
| [Nome] | [Push do servidor / Local] | "[Título]" | "[Texto do corpo]" | `app://feature/[id]` |

---

## 8. Localização

**Arquivo de strings / recurso:** `[NomeDaFeature].strings` / `strings.xml`

| Chave | Padrão (PT-BR) | Observações |
|-------|----------------|-------------|
| `feature.titulo` | "[Título]" | Máx. 20 caracteres — trunca na barra de navegação |
| `feature.vazio.mensagem` | "[Mensagem de vazio]" | |
| `feature.erro.generico` | "[Mensagem de erro]" | |

**Layout RTL:** Obrigatório / Não obrigatório  
**Formatação de data/número:** Usa locale do sistema / Formato fixo [especificar]

---

## 9. Plano de Testes

### 9.1 Testes Unitários

| O que testar | Alvo de teste | Entrada | Saída esperada |
|--------------|---------------|---------|----------------|
| Sucesso de `[Acao]UseCase` | `[NomeDaFeature]Tests` | DTO válido | Entidade mapeada retornada |
| Erro de rede em `[Acao]UseCase` | | Mock 5xx | Estado `.erro` emitido |
| Mapeamento de `[Entidade]` | | DTO bruto | Todos os campos mapeados corretamente |
| Transições de estado do ViewModel | | `.carregando` → dados | Estado se torna `.carregado` |

### 9.2 Testes de Integração

| Cenário | Configuração | Asserções |
|---------|-------------|-----------|
| Buscar + persistir + ler | BD real, rede mockada | Dados em disco coincidem com resposta da API |
| Leitura offline após busca | BD seedado, rede cortada | Dados locais servidos corretamente |

### 9.3 Testes de UI / E2E

| Jornada | Passos | Asserções |
|---------|--------|-----------|
| Caminho feliz | Iniciar → navegar para a feature → concluir ação | Estado de sucesso visível |
| Estado vazio | Iniciar com dados seed vazios | View de vazio visível |
| Erro + retry | Mock 500 → usuário toca retry → mock 200 | Conteúdo carrega após retry |

### 9.4 Testes de Acessibilidade

- [ ] Ordem de travessia do VoiceOver / TalkBack correta
- [ ] Todos os botões e elementos interativos anunciados
- [ ] Dynamic Type: layout íntegro em Accessibility Extra Large
- [ ] Contraste de cor aprovado em 4,5:1

---

## 10. Definição de Pronto (Definition of Done)

- [ ] Todos os critérios de aceite das Histórias de Usuário (Spec de Produto) verificados
- [ ] Cobertura de testes unitários ≥ 80% nas camadas de domínio + dados
- [ ] Testes de integração passando no CI
- [ ] Teste de UI smoke verde
- [ ] Sem novos warnings de lint / análise estática
- [ ] Auditoria de acessibilidade aprovada (VoiceOver / TalkBack)
- [ ] Eventos de analytics disparando (verificado no dashboard de debug)
- [ ] Chaves de localização adicionadas para todos os idiomas suportados
- [ ] Feature flag implementada e configurada como `desativada` por padrão
- [ ] Revisão de design aprovada
- [ ] Code review do tech lead aprovado
- [ ] Aceite do product owner confirmado
- [ ] Entrada nas notas de release redigida

---

## 11. Dependências e Bloqueios

| Dependência | Tipo | Responsável | Status | Bloqueante |
|-------------|------|-------------|--------|------------|
| Endpoint de API `/v1/[recurso]` | Backend | [Time] | Em andamento | Sim |
| Tokens de design v2 | Design System | [Nome] | Concluído | Não |

---

## 12. Questões em Aberto

| # | Pergunta | Responsável | Prazo |
|---|----------|-------------|-------|
| F-01 | | | |

---

## 13. Histórico de Revisões

| Versão | Data | Autor | Resumo |
|--------|------|-------|--------|
| 0.1.0 | AAAA-MM-DD | [Nome] | Rascunho inicial |
