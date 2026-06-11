# Especificação de Feature — Cadastrar novo usuário

> **Tipo de documento:** Spec de Feature  
> **Status:** `rascunho`  
> **Versão:** 0.1.0  
> **Última atualização:** 2026-06-09  
> **Dono da feature:** Jose Julio
> **Tech lead:** Jose Julio
> **Spec de Produto vinculada:** [../product-travel-tracker.md](../product-travel-tracker.md) — §3 US-01, §4.1  
> **Spec Técnica vinculada:** [../technical-travel-tracker.md](../technical-travel-tracker.md) — FEAT-02, §6.1 `/auth/register`  
> **Plataforma:** `Android`  
> **Sprint / Marco:** Sprint 1  
> **Esforço estimado:** [X dias / Y story points]

---

> **Stack de desenvolvimento revisada:** este documento foi atualizado para orientar o desenvolvimento do aplicativo Android utilizando **Java**, **layouts XML**, **arquitetura MVVM**, **Activities/Fragments**, **ViewModel**, **LiveData**, **ViewBinding**, **Retrofit**, **Room** e componentes Android tradicionais. Referências anteriores a Kotlin, Jetpack Compose, Composables, StateFlow, SharedFlow, Flow e Coroutines devem ser consideradas obsoletas nesta versão e substituídas por alternativas compatíveis com Java e XML.


## 1. Resumo da Feature

### 1.1 O Que Esta Feature Faz

Permite que um novo usuário crie sua conta no aplicativo informando nome completo, e-mail e senha. Após o cadastro bem-sucedido, o usuário é redirecionado para a tela de login, onde pode acessar o aplicativo com as credenciais recém-criadas.

### 1.2 Por Que Existe

O aplicativo exige autenticação para todas as operações principais — criar viagens, compartilhar localização e acompanhar trajetos de outras pessoas. Sem um mecanismo de cadastro, nenhum usuário novo consegue acessar essas funcionalidades.

**Necessidade do usuário:** US-01 — Como usuário, quero cadastrar meus dados e criar uma senha para que eu possa acessar o aplicativo de forma autenticada.  
**Objetivo de negócio:** Objetivo 1 (§1.3) — Permitir que o viajante registre uma viagem no aplicativo, o que pressupõe a existência de uma conta autenticada.

### 1.3 Escopo

**Dentro do escopo:**
- Tela de cadastro acessível a partir da tela de login
- Coleta e validação de nome completo (mínimo duas palavras), e-mail único e senha forte (mín. 6 caracteres, com maiúscula, minúscula, número e caractere especial)
- Envio dos dados ao endpoint `POST /auth/register`
- Exibição de mensagem de erro clara em caso de falha (ex.: e-mail já cadastrado, erro 422)
- Redirecionamento para a tela de login após cadastro bem-sucedido
- Bloqueio da ação quando não há conexão com a internet

**Fora do escopo (nesta iteração):**
- Login automático após o cadastro (o usuário deve fazer login manualmente)
- Verificação de e-mail por link/token pós-cadastro
- Cadastro via redes sociais (Google, Apple, etc.)
- Edição de dados cadastrais (coberta por FEAT-05 — Perfil do usuário)

---

## 2. Comportamento Visível ao Usuário

### 2.1 Pontos de Entrada

| Ponto de entrada | Gatilho | Pré-condição |
|------------------|---------|--------------|
| Tela de Login | Toque no botão "Criar conta" | Usuário não autenticado; app na tela de login |

### 2.2 Fluxo do Caminho Feliz

**Pré-condição:** O app está na tela de login e o usuário não possui conta cadastrada.

1. O usuário toca no botão "Criar conta" na tela de login.
2. O app exibe a tela de cadastro com os campos: nome completo, e-mail e senha.
3. O usuário preenche os três campos.
4. O usuário toca no botão "Cadastrar".
5. O app valida os campos localmente (nome com no mínimo duas palavras, e-mail no formato válido, senha com no mínimo 6 caracteres contendo maiúscula, minúscula, número e caractere especial).
6. O app exibe indicador de carregamento e envia os dados para a API (`POST /auth/register`).
7. A API retorna confirmação de cadastro com sucesso.
8. O app exibe uma mensagem de sucesso informando que o cadastro foi realizado.
9. O app retorna automaticamente para a tela de login.

**Pós-condição:** A conta do usuário está criada no servidor. O usuário está na tela de login e pode acessar o app com o e-mail e senha recém-cadastrados.

### 2.3 Fluxos Alternativos

#### 2.3.1 Erro de validação local
**Gatilho:** O usuário toca em "Cadastrar" com um ou mais campos inválidos (nome com uma única palavra, e-mail malformado ou senha fora das regras).

1. O app interrompe o envio antes de chamar a API.
2. O app destaca cada campo inválido com uma mensagem de erro inline (ex.: "O nome deve conter pelo menos duas palavras", "E-mail inválido", "A senha deve ter pelo menos 6 caracteres, incluindo maiúscula, minúscula, número e caractere especial").
3. O usuário corrige os campos sinalizados.
4. O fluxo retorna ao passo 4 do caminho feliz.

#### 2.3.2 E-mail já cadastrado (erro 422 da API)
**Gatilho:** A API rejeita o cadastro porque o e-mail informado já existe na base de dados.

1. O app remove o indicador de carregamento.
2. O app exibe uma mensagem de erro no campo de e-mail: "Este e-mail já está em uso. Tente outro ou faça login."
3. Os demais campos permanecem preenchidos.
4. O usuário corrige o e-mail e pode tentar novamente (retorna ao passo 4 do caminho feliz).

#### 2.3.3 Sem conexão com a internet
**Gatilho:** O dispositivo não possui conexão no momento em que o usuário toca em "Cadastrar".

1. O app bloqueia o envio e exibe uma mensagem: "Sem conexão. Verifique sua internet e tente novamente."
2. O botão "Cadastrar" permanece habilitado para nova tentativa.
3. Os campos permanecem preenchidos.
4. Quando a conexão for restabelecida, o usuário pode tentar novamente (retorna ao passo 4 do caminho feliz).

#### 2.3.4 Erro de servidor (5xx)
**Gatilho:** A API retorna um erro inesperado (5xx) durante o cadastro.

1. O app remove o indicador de carregamento.
2. O app exibe uma mensagem de erro genérica: "Algo deu errado. Tente novamente."
3. Os campos permanecem preenchidos.
4. O usuário pode tentar novamente (retorna ao passo 4 do caminho feliz).

### 2.4 Casos Extremos e Condições de Contorno

| Cenário | Comportamento esperado |
|---------|------------------------|
| Sem rede ao abrir a tela de cadastro | Tela exibe normalmente; o bloqueio ocorre apenas ao tentar enviar o formulário. |
| Nome com apenas uma palavra | Erro inline: "O nome deve conter pelo menos duas palavras." |
| Senha sem caractere especial / número / maiúscula | Erro inline descrevendo a regra violada. |
| E-mail com espaços ou formato inválido | Erro inline: "Informe um e-mail válido." |
| Toque em "Cadastrar" com todos os campos vazios | Todos os campos destacados com suas respectivas mensagens de erro. |
| API lenta (> 3 s) | Exibir indicador de carregamento a partir de 300 ms após o toque em "Cadastrar". |
| Usuário toca em voltar durante o carregamento | Cancelar a requisição e retornar para a tela de login sem salvar dados locais. |

---

## 3. Especificação de UI

### Diretriz técnica de UI — Java + XML

A tela desta feature deve ser implementada com **Fragment Java + layout XML**, observando `LiveData` exposto pelo respectivo `ViewModel`. A camada visual não deve conter regra de negócio; ela apenas coleta eventos do usuário, atualiza campos visuais, exibe mensagens e navega conforme eventos emitidos pelo ViewModel.

**Arquivos esperados:**

| Tipo | Convenção |
|------|-----------|
| Fragment | `NomeDaFeatureFragment.java` |
| ViewModel | `NomeDaFeatureViewModel.java` |
| Layout da tela | `fragment_nome_da_feature.xml` |
| Itens de lista | `item_nome_do_item.xml` |
| Navegação | `nav_graph.xml` |
| Strings | `res/values/strings.xml` |
| Cores/tema | `res/values/colors.xml`, `themes.xml` |

A implementação deve usar **ViewBinding**, por exemplo `FragmentLoginBinding`, evitando `findViewById` repetitivo e reduzindo risco de erro de referência de views.


### 3.1 Telas / Views Desta Feature

| ID da Tela | Nome | Tipo | Descrição |
|------------|------|------|-----------|
| TLA-01 | Tela de Cadastro | `push` | Formulário de criação de conta; empilhada sobre a tela de login |

### 3.2 Detalhe da Tela — TLA-01: Tela de Cadastro

**Referência de design:** —  
**Nome acessível:** "Criar conta"

#### Layout

```
┌─────────────────────────────┐
│  ← Voltar   Criar conta     │  ← Barra de navegação
├─────────────────────────────┤
│                             │
│  ┌───────────────────────┐  │
│  │  Nome                 │  │  ← Campo de texto (nome completo)
│  └───────────────────────┘  │
│  ⚠ mensagem de erro inline  │
│                             │
│  ┌───────────────────────┐  │
│  │  E-mail               │  │  ← Campo de texto (e-mail)
│  └───────────────────────┘  │
│  ⚠ mensagem de erro inline  │
│                             │
│  ┌─────────────────── 👁 ┐  │
│  │  Senha                │  │  ← Campo de senha com alternância visível/oculto
│  └───────────────────────┘  │
│  ⚠ mensagem de erro inline  │
│                             │
├─────────────────────────────┤
│  [ Salvar ]                 │  ← Botão primário, largura total
└─────────────────────────────┘
```

#### Estados

| Estado | Gatilho | O que muda na UI |
|--------|---------|------------------|
| Ocioso | Tela abre | Todos os campos vazios e habilitados; botão Salvar habilitado |
| Preenchendo | Usuário digita em qualquer campo | Campo ativo com borda destacada; erros inline somem ao corrigir |
| Validação com erro | Toque em "Salvar" com campo(s) inválido(s) | Campos inválidos destacados em vermelho; mensagem de erro inline abaixo de cada um; foco movido para o primeiro campo com erro |
| Carregando | Validação local passou; requisição enviada | Botão Salvar exibe indicador de progresso (circular); todos os campos e o botão ficam desabilitados |
| Erro de API | Resposta da API com falha (422 ou 5xx) | Indicador de progresso removido; campos reabilitados; mensagem de erro exibida (inline no campo e-mail para e-mail duplicado, ou snackbar para erros genéricos) |
| Sucesso | API confirma cadastro | Snackbar de sucesso exibido brevemente; tela é removida da pilha e o usuário retorna à tela de login |

#### Elementos Interativos

| Elemento | Tipo | Ação | Rótulo de acessibilidade |
|----------|------|------|--------------------------|
| Botão Voltar (← ) | Botão de navegação | Remove a tela e retorna à tela de login | "Voltar" |
| Campo Nome | Campo de texto | Entrada de texto livre; teclado padrão; capitalização de palavras | "Nome completo" |
| Campo E-mail | Campo de texto | Entrada de e-mail; teclado tipo e-mail; sem capitalização automática | "E-mail" |
| Campo Senha | Campo de senha | Entrada oculta por padrão; teclado padrão | "Senha" |
| Ícone alternar visibilidade da senha (👁) | Botão de ícone | Alterna entre ocultar e exibir o texto da senha | "Mostrar senha" / "Ocultar senha" |
| Botão Salvar | Botão primário | Aciona validação local e, se aprovada, envia formulário à API | "Salvar" |

### 3.3 Catálogo de Componentes

| Componente | Variante | Configuração |
|------------|----------|--------------|
| `TextInputLayout` + `TextInputEditText` | Padrão | Rótulo: "Nome", tipo: texto, capitalização: palavras, largura total |
| `TextInputLayout` + `TextInputEditText` | Padrão | Rótulo: "E-mail", tipo: email, `android:inputType="textEmailAddress"`, sem capitalização, largura total |
| `TextInputLayout` + `TextInputEditText` senha | Com alternância de visibilidade | Rótulo: "Senha", oculto por padrão, ícone de olho à direita, largura total |
| `MensagemErroInline` | Erro de campo | Exibida abaixo do campo correspondente; visível apenas quando há erro |
| `MaterialButton` | Padrão | Rótulo: "Salvar", largura total; estado de carregamento com `ProgressBar` |
| `Snackbar` | Sucesso | Mensagem: "Conta criada com sucesso!"; descarta automaticamente após 3 s |
| `Snackbar` | Erro | Mensagem: "Algo deu errado. Tente novamente."; ação: "Tentar novamente" |

---

## 4. Design Técnico

### 4.1 Posicionamento no Módulo

**Módulo:** `Features/CadastroUsuario`  
**Novo módulo necessário:** Sim

### 4.2 Decomposição de Componentes / Classes

| Componente | Tipo | Responsabilidade |
|------------|------|-----------------|
| `CadastroUsuarioFragment` | Fragment / layout XML (View) | Renderiza TLA-01; observa `LiveData<CadastroUsuarioUiState>` do ViewModel |
| `CadastroUsuarioViewModel` | ViewModel | Mantém o estado de UI; executa validação local; chama `CadastrarUsuarioUseCase` |
| `CadastrarUsuarioUseCase` | Caso de Uso | Valida regras de negócio (nome, e-mail, senha); delega o envio ao `AuthRepository` |
| `AuthRepository` | Repositório | Interface que abstrai a fonte de dados de autenticação |
| `AuthRepositoryImpl` | Repositório (impl) | Implementa `AuthRepository`; delega à `AuthRemoteDataSource` |
| `AuthRemoteDataSource` | Fonte de Dados Remota | Chama `POST /auth/register`; mapeia `RegisterRequest` → `RegisterResponse` → `Usuario` |

### 4.3 Fluxo de Dados

```
CadastroUsuarioFragment
  └─► ViewModel.onSalvarClicado(nome, email, senha)
        ├─► [validação local] → emite erros inline se inválido
        └─► CadastrarUsuarioUseCase.executar(nome, email, senha)
              └─► AuthRepository.cadastrar(RegisterRequest)
                    └─► AuthRemoteDataSource → POST /auth/register
                          ├─► 200 OK → RegisterResponse → Usuario
                          │     └─► ViewModel.estado = Sucesso
                          │           └─► Screen navega de volta ao Login
                          └─► Erro (422 / 5xx / sem rede)
                                └─► ViewModel.estado = Erro(tipo)
                                      └─► Screen exibe feedback adequado
```

### 4.4 Interface Pública (API desta Feature)

```kotlin
// Pseudocódigo — intenção independente de linguagem

interface CadastroUsuarioEntry {
    fun iniciar(navController: NavController)
}

// Não recebe contexto externo — a tela é autossuficiente.
// Após o sucesso, emite evento de navegação para a rota de Login
// via SingleLiveEvent ou Event wrapper com LiveData no ViewModel; o caller apenas observa esse evento.
```

### 4.5 Endpoints de API Utilizados

| Endpoint | Método | Contrato | Observações |
|----------|--------|----------|-------------|
| `/auth/register` | POST | Ver Spec Técnica §6.1 | Sem autenticação; retorna dados do usuário criado |

**Corpo da requisição — `RegisterRequest`:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Resposta de sucesso — `RegisterResponse` (200):**
```json
{
  "user_id": "string",
  "name": "string",
  "email": "string",
  "created_at": "2026-06-07T19:30:00Z"
}
```

**Códigos de erro:** `422` (dados inválidos ou e-mail duplicado)

### 4.6 Alterações na Persistência Local

Nenhuma. O cadastro é uma operação exclusivamente remota. Nenhum dado é persistido localmente após o cadastro — o usuário deve fazer login separadamente para que o token seja armazenado via `EncryptedSharedPreferences`.

### 4.7 Definição de Estado

```kotlin
// Pseudocódigo

sealed class CadastroUsuarioUiState {
    object Ocioso : CadastroUsuarioUiState()
    object Carregando : CadastroUsuarioUiState()
    object Sucesso : CadastroUsuarioUiState()
    data class ErroDeValidacao(
        val erroNome: String?,
        val erroEmail: String?,
        val erroSenha: String?
    ) : CadastroUsuarioUiState()
    data class ErroDeApi(val mensagem: String) : CadastroUsuarioUiState()
}

data class CadastroUsuarioFormState(
    val nome: String = "",
    val email: String = "",
    val senha: String = "",
    val senhaVisivel: Boolean = false
)
```

### 4.8 Tratamento de Erros

| Origem do erro | Tipo de erro | Tratamento | Mensagem ao usuário |
|----------------|-------------|------------|---------------------|
| Campo inválido (local) | Validação de formulário | Bloquear envio; emitir `ErroDeValidacao` com campo específico | Inline abaixo do campo: "O nome deve conter pelo menos duas palavras." / "Informe um e-mail válido." / "A senha deve ter pelo menos 6 caracteres, incluindo maiúscula, minúscula, número e caractere especial." |
| Sem rede | Erro de conectividade | Bloquear envio antes da chamada de rede | Snackbar: "Sem conexão. Verifique sua internet e tente novamente." |
| 422 e-mail duplicado | Erro de negócio da API | Emitir `ErroDeApi`; exibir erro inline no campo e-mail | "Este e-mail já está em uso. Tente outro ou faça login." |
| 422 outros | Erro de validação da API | Emitir `ErroDeApi`; exibir snackbar genérico | "Não foi possível criar a conta. Verifique os dados e tente novamente." |
| 5xx | Erro de servidor | Log no Crashlytics; emitir `ErroDeApi` | Snackbar: "Algo deu errado. Tente novamente." |
| Timeout | Timeout de rede | Tratar como sem rede | Snackbar: "Sem conexão. Verifique sua internet e tente novamente." |

---

## 5. Eventos de Analytics

> Fonte: Spec Técnica §10.1. Nenhum evento deve incluir senha, e-mail completo, nome completo ou tokens.

| Nome do evento | Gatilho | Propriedades específicas | Propriedades padrão incluídas |
|----------------|---------|--------------------------|-------------------------------|
| `usuario_cadastro_iniciado` | Tela de cadastro é exibida (usuário chegou a partir do botão "Criar conta") | `origem: String` — valor fixo `"tela_login"` | `versao_app`, `versao_so`, `modelo_dispositivo`, `ambiente`, `tela` |
| `usuario_cadastrado` | Cadastro concluído com sucesso; API retornou 200 | `duracao_ms: Int` — tempo entre toque em "Salvar" e retorno ao login | `versao_app`, `versao_so`, `modelo_dispositivo`, `ambiente`, `tela`, `tem_conexao` |
| `usuario_cadastro_falhou` | Cadastro não concluído por qualquer motivo (validação local ou erro de API) | `motivo: String` — ex.: `"validacao_local"`, `"email_duplicado"`, `"sem_conexao"`, `"erro_servidor"`; `campos_invalidos: String` — ex.: `"nome,senha"` (somente para `motivo = "validacao_local"`) | `versao_app`, `versao_so`, `modelo_dispositivo`, `ambiente`, `tela`, `tem_conexao` |
| `app_sem_conexao_exibido` | App detecta ausência de internet no momento do toque em "Salvar" | `tela: String` — valor fixo `"cadastro_usuario"`; `operacao_bloqueada: String` — valor fixo `"cadastro"` | `versao_app`, `ambiente` |
| `erro_generico_exibido` | Snackbar de erro genérico é exibido (5xx ou 422 não mapeado) | `tela: String` — valor fixo `"cadastro_usuario"`; `operacao: String` — valor fixo `"cadastro"` | `versao_app`, `ambiente` |

**Restrições:** não enviar senha, token, e-mail completo, nome completo ou payload bruto da API (ver Spec Técnica §10.1 — Dados que não devem ser enviados em Analytics).

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

**Arquivo de strings / recurso:** `res/values/strings.xml` (módulo `Features/CadastroUsuario`)

| Chave | Padrão (PT-BR) | Observações |
|-------|----------------|-------------|
| `cadastro_titulo` | "Criar conta" | Título da barra de navegação; máx. ~20 caracteres |
| `cadastro_campo_nome` | "Nome" | Rótulo do campo Nome |
| `cadastro_campo_email` | "E-mail" | Rótulo do campo E-mail |
| `cadastro_campo_senha` | "Senha" | Rótulo do campo Senha |
| `cadastro_botao_salvar` | "Salvar" | Rótulo do botão primário |
| `cadastro_senha_mostrar` | "Mostrar senha" | Rótulo de acessibilidade do ícone de visibilidade (estado: oculto) |
| `cadastro_senha_ocultar` | "Ocultar senha" | Rótulo de acessibilidade do ícone de visibilidade (estado: visível) |
| `cadastro_erro_nome_invalido` | "O nome deve conter pelo menos duas palavras." | Erro inline campo Nome |
| `cadastro_erro_email_invalido` | "Informe um e-mail válido." | Erro inline campo E-mail |
| `cadastro_erro_email_duplicado` | "Este e-mail já está em uso. Tente outro ou faça login." | Erro inline campo E-mail — retorno 422 com e-mail duplicado |
| `cadastro_erro_senha_invalida` | "A senha deve ter pelo menos 6 caracteres, incluindo maiúscula, minúscula, número e caractere especial." | Erro inline campo Senha |
| `cadastro_erro_sem_conexao` | "Sem conexão. Verifique sua internet e tente novamente." | Snackbar — sem rede ao tentar salvar |
| `cadastro_erro_generico` | "Algo deu errado. Tente novamente." | Snackbar — 5xx ou 422 não mapeado |
| `cadastro_erro_dados_invalidos` | "Não foi possível criar a conta. Verifique os dados e tente novamente." | Snackbar — 422 genérico (não e-mail duplicado) |
| `cadastro_sucesso` | "Conta criada com sucesso!" | Snackbar de sucesso exibido antes de retornar ao login |

**Layout RTL:** Não obrigatório (app disponível apenas em pt-BR nesta versão)  
**Formatação de data/número:** Não aplicável a esta feature

---

## 9. Plano de Testes

### 9.1 Testes Unitários

| O que testar | Alvo de teste | Entrada | Saída esperada |
|--------------|---------------|---------|----------------|
| Nome válido (duas ou mais palavras) | `CadastrarUsuarioUseCase` | `"José Silva"` | Validação passa; nenhum erro emitido |
| Nome inválido (uma palavra) | `CadastrarUsuarioUseCase` | `"José"` | `ErroDeValidacao(erroNome = "O nome deve conter pelo menos duas palavras.")` |
| E-mail válido | `CadastrarUsuarioUseCase` | `"jose@email.com"` | Validação passa |
| E-mail malformado | `CadastrarUsuarioUseCase` | `"jose@"` | `ErroDeValidacao(erroEmail = "Informe um e-mail válido.")` |
| Senha válida | `CadastrarUsuarioUseCase` | `"Abc@1234"` | Validação passa |
| Senha sem maiúscula | `CadastrarUsuarioUseCase` | `"abc@1234"` | `ErroDeValidacao(erroSenha = ...)` |
| Senha sem caractere especial | `CadastrarUsuarioUseCase` | `"Abc12345"` | `ErroDeValidacao(erroSenha = ...)` |
| Senha com menos de 6 caracteres | `CadastrarUsuarioUseCase` | `"Ab@1"` | `ErroDeValidacao(erroSenha = ...)` |
| Cadastro bem-sucedido | `CadastrarUsuarioUseCase` | `RegisterRequest` válido; mock retorna `RegisterResponse` | `Result.Success(Usuario)` |
| Erro 422 e-mail duplicado | `CadastrarUsuarioUseCase` | Mock da API retorna 422 com mensagem de e-mail duplicado | `Result.Failure(EmailDuplicadoException)` |
| Erro 5xx | `CadastrarUsuarioUseCase` | Mock da API retorna 500 | `Result.Failure(ErroServidorException)` |
| Mapeamento `RegisterResponse` → `Usuario` | `AuthRemoteDataSource` | JSON `RegisterResponse` bruto | Todos os campos (`user_id`, `name`, `email`, `created_at`) mapeados corretamente |
| Transição de estado: Ocioso → Carregando | `CadastroUsuarioViewModel` | `onSalvarClicado` com dados válidos | Estado emitido = `Carregando` antes da resposta da API |
| Transição de estado: Carregando → Sucesso | `CadastroUsuarioViewModel` | Caso de uso retorna sucesso | Estado emitido = `Sucesso`; evento de navegação emitido via `SingleLiveEvent ou Event wrapper com LiveData` |
| Transição de estado: Carregando → ErroDeApi | `CadastroUsuarioViewModel` | Caso de uso retorna falha | Estado emitido = `ErroDeApi(mensagem)` |

### 9.2 Testes de Integração

| Cenário | Configuração | Asserções |
|---------|-------------|-----------|
| Cadastro bem-sucedido ponta a ponta | Servidor mock retorna `RegisterResponse` 200 | `AuthRemoteDataSource` retorna `Usuario` sem erro; nenhum dado persistido localmente |
| E-mail duplicado ponta a ponta | Servidor mock retorna 422 | `CadastrarUsuarioUseCase` propaga `EmailDuplicadoException`; `ViewModel` emite `ErroDeApi` |
| Sem conexão na chamada | Rede cortada antes da requisição | `CadastrarUsuarioUseCase` propaga erro de conectividade; `ViewModel` emite `ErroDeApi` com `motivo = "sem_conexao"` |

### 9.3 Testes de UI / E2E

| Jornada | Passos | Asserções |
|---------|--------|-----------|
| Caminho feliz | Navegar para tela de cadastro → preencher nome, e-mail e senha válidos → tocar em "Salvar" → mock 200 | Snackbar "Conta criada com sucesso!" visível; tela de login exibida |
| Validação local — todos os campos vazios | Tocar em "Salvar" sem preencher nenhum campo | Três mensagens de erro inline visíveis; nenhuma chamada de rede realizada |
| Validação local — nome inválido | Preencher nome com uma palavra, demais campos válidos → "Salvar" | Erro inline abaixo do campo Nome; campos E-mail e Senha sem erro |
| E-mail duplicado | Preencher dados válidos → "Salvar" → mock 422 e-mail duplicado | Erro inline abaixo do campo E-mail: "Este e-mail já está em uso…"; campos mantidos preenchidos |
| Sem conexão | Preencher dados válidos → desligar rede → "Salvar" | Snackbar "Sem conexão…" visível; campos mantidos; botão habilitado para nova tentativa |
| Erro de servidor | Preencher dados válidos → "Salvar" → mock 500 | Snackbar "Algo deu errado…" visível; campos mantidos |
| Alternância de visibilidade da senha | Tocar no ícone de olho no campo Senha | Texto da senha alterna entre oculto e visível; rótulo de acessibilidade atualizado |

### 9.4 Testes de Acessibilidade

- [ ] Ordem de travessia do TalkBack correta: Voltar → Nome → E-mail → Senha → Salvar
- [ ] Todos os campos e botões anunciados com rótulos corretos pelo TalkBack
- [ ] Ícone de visibilidade da senha anuncia "Mostrar senha" / "Ocultar senha" conforme estado
- [ ] Mensagens de erro inline associadas ao campo correspondente (atributo `contentDescription` ou `semantics`)
- [ ] Contraste de cor aprovado em 4,5:1 para textos e bordas de campo com erro
- [ ] Campos não ficam inacessíveis durante o estado Carregando (foco não deve travar)

---

## 10. Definição de Pronto (Definition of Done)

- [ ] Todos os critérios de aceite da US-01 verificados
- [ ] Cobertura de testes unitários ≥ 80% em `CadastrarUsuarioUseCase` e `CadastroUsuarioViewModel`
- [ ] Testes de integração passando no CI
- [ ] Testes de UI smoke verde (caminho feliz + erro de validação + sem conexão)
- [ ] Sem novos warnings de lint / análise estática
- [ ] Auditoria de acessibilidade aprovada (TalkBack)
- [ ] Eventos `usuario_cadastro_iniciado`, `usuario_cadastrado` e `usuario_cadastro_falhou` disparando corretamente (verificado no Firebase DebugView)
- [ ] Todas as chaves de `strings.xml` adicionadas (§8)
- [ ] Revisão de design aprovada
- [ ] Code review do tech lead aprovado
- [ ] Aceite do product owner confirmado
- [ ] Entrada nas notas de release redigida

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
