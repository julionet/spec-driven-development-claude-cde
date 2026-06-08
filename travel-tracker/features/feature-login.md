# Especificação de Feature — Login

> **Tipo de documento:** Spec de Feature  
> **Status:** `rascunho`  
> **Versão:** 0.1.0  
> **Última atualização:** 2026-06-07  
> **Dono da feature:** Jose Julio 
> **Tech lead:** Jose Julio  
> **Spec de Produto vinculada:** [../product-travel-tracker.md](../product-travel-tracker.md) — §[seção]  
> **Spec Técnica vinculada:** [../technical-travel-tracker.md](../technical-travel-tracker.md) — RF-[XX]  
> **Plataforma:** `Android`  
> **Sprint / Marco:** Sprint 1  
> **Esforço estimado:** [X dias / Y story points]

---

## 1. Resumo da Feature

### 1.1 O Que Esta Feature Faz

A feature de login permite que um usuário cadastrado acesse o aplicativo utilizando e-mail e senha. Após a autenticação com sucesso, o aplicativo mantém a sessão do usuário de forma segura, permitindo acesso às funcionalidades protegidas, como visualizar viagens, cadastrar viagens, acompanhar viagens compartilhadas, receber convites e acessar o mapa.

### 1.2 Por Que Existe

Esta feature existe para garantir que apenas usuários autenticados possam acessar dados de viagens, convites e localização. Como o aplicativo trabalha com informações sensíveis, principalmente dados de localização durante viagens, é necessário identificar o usuário antes de permitir qualquer ação protegida.

**Necessidade do usuário:** US-02 — Como usuário, quero realizar login no aplicativo para que eu possa acessar minhas viagens e funcionalidades protegidas.  
**Objetivo de negócio:** Permitir que o aplicativo centralize o registro de viagens, o compartilhamento de localização e o acompanhamento por usuários autorizados dentro de uma experiência segura e autenticada.

### 1.3 Escopo

**Dentro do escopo:**
- Permitir login com e-mail e senha.
- Validar se os campos obrigatórios foram preenchidos.
- Validar o formato do e-mail antes do envio.
- Enviar as credenciais para a API de autenticação.
- Receber `accessToken`, `refreshToken` e dados mínimos do usuário autenticado.
- Armazenar `accessToken` e `refreshToken` de forma segura no dispositivo.
- Manter o usuário autenticado quando existir sessão válida salva localmente.
- Direcionar o usuário para a tela principal após login com sucesso.
- Exibir mensagem clara em caso de e-mail ou senha inválidos.
- Exibir mensagem clara em caso de falha de conexão ou erro da API.
- Bloquear acesso às funcionalidades protegidas quando não houver sessão válida.
- Permitir acesso aos fluxos de cadastro de usuário e recuperação de senha a partir da tela de login.

**Fora do escopo (nesta iteração):**
- Login com redes sociais, como Google, Apple, Facebook ou Microsoft.
- Login por biometria.
- Login por número de telefone.
- Login por código enviado por SMS.
- Autenticação multifator.
- Alteração de senha dentro da tela de login.
- Cadastro de novo usuário.
- Recuperação de senha.
- Renovação automática avançada de token com múltiplas sessões.
- Gerenciamento de dispositivos conectados.
- Detecção de root ou ambiente comprometido.

## 2. Comportamento Visível ao Usuário

### 2.1 Pontos de Entrada

<!-- De onde / como o usuário chega a esta feature. -->

| Ponto de entrada | Gatilho | Pré-condição |
|------------------|---------|--------------|
| Splash | Abertura do aplicativo | Não existir sessão válida salva localmente ou a sessão salva estar expirada/inválida. |
| Tela de Login | Redirecionamento automático após Splash | Usuário não autenticado. |
| Tela de Login | Logout realizado pelo usuário | Sessão anterior encerrada e dados locais removidos. |
| Tela de Login | Sessão inválida durante uso do app | Token ausente, expirado ou rejeitado pela API. |
| Tela de Login | Retorno após cadastro de usuário com sucesso | Usuário cadastrado, mas ainda não autenticado. |
| Tela de Login | Retorno após recuperação de senha com sucesso | Senha alterada com sucesso e usuário precisa autenticar novamente. |

---

### 2.2 Fluxo do Caminho Feliz

<!-- Passo a passo na perspectiva do usuário. Sem código, sem nomes de componentes. -->

**Pré-condição:**  
O usuário possui cadastro no aplicativo e não existe uma sessão válida salva localmente.

1. O usuário abre o aplicativo.
2. O app apresenta a tela de Splash durante o carregamento inicial.
3. O app verifica que não existe sessão válida salva localmente.
4. O app apresenta a tela de login.
5. O usuário informa e-mail e senha.
6. O usuário seleciona a opção **Entrar**.
7. O app valida se os campos obrigatórios foram preenchidos.
8. O app valida se o e-mail possui formato válido.
9. O app envia os dados de login para autenticação.
10. O app recebe a confirmação de autenticação com sucesso.
11. O app mantém a sessão do usuário de forma segura.
12. O app apresenta a tela principal.
13. O usuário visualiza as abas **Minhas viagens** e **Viagens acompanhadas**.

**Pós-condição:**  
O usuário está autenticado, a sessão está salva de forma segura e o app permite acesso às funcionalidades protegidas.

---

### 2.3 Fluxos Alternativos

#### 2.3.1 Usuário já autenticado

**Gatilho:**  
O usuário abre o aplicativo e já existe uma sessão válida salva localmente.

1. O usuário abre o aplicativo.
2. O app apresenta a tela de Splash.
3. O app verifica que existe uma sessão válida.
4. O app realiza o carregamento inicial das informações do usuário.
5. O app apresenta diretamente a tela principal.
6. O usuário não precisa informar e-mail e senha novamente.

---

#### 2.3.2 E-mail ou senha inválidos

**Gatilho:**  
A API rejeita as credenciais informadas pelo usuário.

1. O usuário informa e-mail e senha.
2. O usuário seleciona a opção **Entrar**.
3. O app envia os dados para autenticação.
4. O app recebe a informação de que o e-mail ou senha são inválidos.
5. O app exibe a mensagem: **“E-mail ou senha inválidos. Verifique os dados e tente novamente.”**
6. O usuário permanece na tela de login.
7. O usuário pode corrigir os dados e tentar novamente.

---

#### 2.3.3 Campos obrigatórios não preenchidos

**Gatilho:**  
O usuário tenta entrar sem informar e-mail ou senha.

1. O usuário deixa um ou mais campos obrigatórios em branco.
2. O usuário seleciona a opção **Entrar**.
3. O app valida os campos informados.
4. O app exibe a mensagem **“Este campo é obrigatório.”** no campo correspondente.
5. O usuário permanece na tela de login.
6. O usuário pode preencher os campos e tentar novamente.

---

#### 2.3.4 E-mail com formato inválido

**Gatilho:**  
O usuário informa um e-mail em formato inválido.

1. O usuário informa um texto que não possui formato válido de e-mail.
2. O usuário seleciona a opção **Entrar**.
3. O app valida o formato do e-mail.
4. O app exibe a mensagem: **“Informe um e-mail válido.”**
5. O usuário permanece na tela de login.
6. O usuário pode corrigir o e-mail e tentar novamente.

---

#### 2.3.5 Falha de conexão no login

**Gatilho:**  
O usuário tenta realizar login sem conexão com a internet ou ocorre falha de comunicação.

1. O usuário informa e-mail e senha.
2. O usuário seleciona a opção **Entrar**.
3. O app tenta autenticar o usuário.
4. O app não consegue concluir a autenticação por falta de conexão ou falha de comunicação.
5. O app exibe a mensagem: **“Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.”**
6. O usuário permanece na tela de login.
7. O usuário pode tentar novamente quando houver conexão disponível.

---

#### 2.3.6 API lenta durante login

**Gatilho:**  
A autenticação demora mais do que o tempo esperado.

1. O usuário informa e-mail e senha.
2. O usuário seleciona a opção **Entrar**.
3. O app exibe um estado de carregamento.
4. Enquanto a autenticação estiver em andamento, o botão de entrada fica temporariamente indisponível.
5. Quando a autenticação for concluída com sucesso, o app apresenta a tela principal.
6. Se a autenticação falhar, o app exibe uma mensagem de erro amigável.

---

#### 2.3.7 Acessar cadastro de usuário

**Gatilho:**  
O usuário ainda não possui conta e seleciona a opção de cadastro.

1. O usuário seleciona a opção **Criar minha conta**.
2. O app apresenta a tela de cadastro de novo usuário.
3. O fluxo de login é interrompido temporariamente.
4. Após cadastro com sucesso, o usuário retorna para a tela de login.

---

#### 2.3.8 Acessar recuperação de senha

**Gatilho:**  
O usuário esqueceu sua senha e seleciona a opção de recuperação.

1. O usuário seleciona a opção **Esqueci minha senha**.
2. O app apresenta a tela de recuperação de senha.
3. O fluxo de login é interrompido temporariamente.
4. Após recuperação de senha com sucesso, o usuário retorna para a tela de login.

---

#### 2.3.9 Sessão inválida durante uso do app

**Gatilho:**  
Durante o uso do aplicativo, a sessão deixa de ser válida.

1. O usuário tenta acessar uma funcionalidade protegida.
2. O app identifica que a sessão está inválida ou expirada.
3. O app encerra a sessão local inválida.
4. O app redireciona o usuário para a tela de login.
5. O app pode exibir uma mensagem informando que é necessário entrar novamente.

---

### 2.4 Casos Extremos e Condições de Contorno

| Cenário | Comportamento esperado |
|---------|------------------------|
| Sem rede ao entrar na feature | Exibir mensagem informando ausência de conexão e bloquear a tentativa de login, pois a autenticação depende da API. |
| Sem sessão válida salva localmente | Exibir tela de login. |
| Sessão válida salva localmente | Pular login e direcionar o usuário para a tela principal. |
| Sessão expirada | Tentar renovar a sessão, quando aplicável. Se não for possível, redirecionar para login. |
| Access token ausente | Considerar sessão inválida e exibir tela de login. |
| Refresh token ausente | Considerar sessão inválida quando o access token estiver expirado. |
| E-mail vazio | Exibir mensagem de campo obrigatório. |
| Senha vazia | Exibir mensagem de campo obrigatório. |
| E-mail em formato inválido | Exibir mensagem orientando o usuário a informar um e-mail válido. |
| E-mail ou senha inválidos | Exibir mensagem amigável sem informar qual dos dois campos está incorreto. |
| API lenta (> 1s) | Exibir estado de carregamento. |
| API lenta (> 10s) | Manter carregamento e permitir que o usuário tente novamente caso ocorra timeout. |
| Toques repetidos no botão Entrar | Evitar múltiplas tentativas simultâneas; manter o botão temporariamente indisponível durante o carregamento. |
| Erro interno da API | Exibir mensagem genérica: “Não foi possível concluir a operação. Tente novamente em alguns instantes.” |
| Usuário retorna do cadastro | Exibir tela de login para que ele entre com a conta criada. |
| Usuário retorna da recuperação de senha | Exibir tela de login para que ele entre com a nova senha. |
| App fechado durante login | Ao reabrir, verificar se existe sessão válida; se não existir, exibir login. |
| Logout realizado | Remover sessão e dados locais do usuário; retornar para tela de login. |

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
