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
| TLA-01 | Login | Tela raiz / redirecionamento após Splash | Tela para autenticação do usuário por e-mail e senha. Também permite acessar cadastro de usuário e recuperação de senha. |
| TLA-02 | Carregamento de Login | Estado da TLA-01 | Estado visual exibido enquanto o app autentica o usuário. |
| TLA-03 | Erro de Login | Estado da TLA-01 | Estado visual exibido quando o login falha por credenciais inválidas, falha de conexão ou erro inesperado. |

---

### 3.2 Detalhe da Tela — TLA-01: Login

**Referência de design:** A definir  
**Nome acessível:** "Tela de login"

#### Layout

A tela de login deve apresentar uma estrutura simples, clara e focada na entrada do usuário no aplicativo.

```text
┌────────────────────────────────────┐
│ Logo / Identidade do aplicativo    │
│                                    │
├────────────────────────────────────┤
│ Campo: E-mail                      │
│ Campo: Senha                       │
│ Link: "Esqueci minha senha"        │
├────────────────────────────────────┤
│ Botão principal: "Entrar"          │
├────────────────────────────────────┤
│ Texto auxiliar                     │
│ Link: "Criar minha conta"          │
└────────────────────────────────────┘
```

#### Descrição das regiões
| Região | Descrição |
|--------|-----------|
| Cabeçalho | Deve exibir a identidade visual do aplicativo. |
| Formulário | Deve conter os campos de e-mail e senha, com validação visual e mensagens de erro próximas ao campo. |
| Ação principal | Deve conter o botão Entrar, usado para iniciar a autenticação. |
| Ações secundárias | Deve conter as opções Esqueci minha senha e Criar minha conta. |
| Feedback | Deve exibir mensagens de erro ou carregamento conforme o estado da autenticação. |

---

#### Estados
| Estado | Gatilho | O que muda na UI |
|--------|---------|------------------|
| Inicial | Tela aberta sem interação do usuário | Campos de e-mail e senha vazios, botão Entrar disponível e sem mensagens de erro. |
| Preenchimento | Usuário digita e-mail ou senha | Campos exibem o valor informado e removem mensagens de erro relacionadas quando corrigidos. |
| Validação local com erro | Usuário toca em Entrar com campos inválidos | Mensagens de erro são exibidas abaixo dos campos correspondentes. |
| Carregando | Usuário toca em Entrar com dados válidos | Botão Entrar fica temporariamente indisponível e exibe indicador de carregamento. |
| Login concluído | API autentica o usuário com sucesso | Usuário é direcionado para a tela principal. |
| Credenciais inválidas | API rejeita e-mail ou senha | Mensagem amigável é exibida na tela e o usuário permanece no login. |
| Sem conexão | Usuário tenta entrar sem internet | Mensagem de conexão é exibida e o usuário permanece no login. |
| Erro inesperado | API ou app retorna erro não tratado | Mensagem genérica é exibida e o usuário pode tentar novamente. |

---

#### Mensagens e validações 

| Situação | Mensagem |
|----------|----------|
| E-mail vazio | Este campo é obrigatório. |
| Senha vazia | Este campo é obrigatório. |
| E-mail inválido | Informe um e-mail válido. |
| Login inválido | E-mail ou senha inválidos. Verifique os dados e tente novamente. |
| Sem conexão | Não foi possível conectar ao servidor. Verifique sua internet e tente novamente. |
| Erro genérico | Não foi possível concluir a operação. Tente novamente em alguns instantes. |

---

#### Elementos Interativos
| Elemento | Tipo | Ação | Rótulo de acessibilidade |
|----------|------|------|--------------------------|
| Campo E-mail | Campo de texto | Permite informar o e-mail do usuário. | "Campo de e-mail" |
| Campo Senha | Campo de senha | Permite informar a senha do usuário. | "Campo de senha" |
| Exibir/Ocultar senha | Botão/Ícone | Alterna a visibilidade da senha digitada. | "Mostrar ou ocultar senha" |
| Entrar | Botão primário | Valida os campos e inicia autenticação. | "Entrar no aplicativo" |
| Esqueci minha senha | Link/Botão textual | Navega para o fluxo de recuperação de senha. | "Recuperar senha" |
| Criar minha conta | Link/Botão textual | Navega para o cadastro de novo usuário. | "Criar minha conta" |

---

### 3.3 Detalhe da tela - TLA-02: Carregamento de login

**Referência de design:** A definir  
**Nome acessível:** "Entrando no aplicativo"

#### Layout

Durante a autenticação, a tela deve manter o contexto visual do login e indicar que a operação está em andamento.

```text
┌────────────────────────────────────┐
│ Logo / Identidade do aplicativo    │
│                                    │
├────────────────────────────────────┤
│ Campo: E-mail                      │
│ Campo: Senha                       │
│ Link: "Esqueci minha senha"        │
├────────────────────────────────────┤
│ Botão principal: [loading]         │
├────────────────────────────────────┤
│ Texto auxiliar                     │
│ Link: "Criar minha conta"          │
└────────────────────────────────────┘
```
#### Estados
| Estado | Gatilho | O que muda na UI |
|--------|---------|------------------|
| Autenticando | Usuário toca em Entrar | Botão principal fica desabilitado e exibe carregamento. |
| Sucesso | API retorna autenticação válida | App navega para tela principal. |
| Falha | API retorna erro ou falha de rede | App volta para estado editável e exibe mensagem de erro. |

---

#### Elementos Interativos
| Elemento | Tipo | Ação | Rótulo de acessibilidade |
|----------|------|------|--------------------------|
| Entrando | Botão exibe um loading | Nenhuma ação enquanto a autenticação está em andamento. | "Entrando no aplicativo, aguarde" |

---

### 3.4 Detalhe da Tela — TLA-03: Erro de Login

**Referência de design:** A definir  
**Nome acessível:** "Erro ao entrar"

#### Comportamento

Todos os erros recebidos a partir da chamada de um endpoint devem ser apresentados em um **BottomSheet modal padrão**.  
Na feature de login, isso se aplica a erros retornados pela API, como credenciais inválidas, falha de autenticação, erro de servidor, timeout ou indisponibilidade do serviço.

Erros de validação local, como campo obrigatório ou e-mail em formato inválido, devem continuar sendo exibidos próximos aos campos correspondentes.

---

#### Layout

O erro de login retornado pela API deve ser exibido em um BottomSheet modal, mantendo a tela de login ao fundo.

```text
┌────────────────────────────────────┐
│ Logo / Identidade do aplicativo    │
│                                    │
├────────────────────────────────────┤
│ Campo: E-mail                      │
│ Campo: Senha                       │
│ Link: "Esqueci minha senha"        │
├────────────────────────────────────┤
│ BottomSheet Modal                  │
│ ┌────────────────────────────────┐ │
│ │ Título: "Não foi possível      │ │
│ │ entrar"                        │ │
│ │                                │ │
│ │ Mensagem do erro               │ │
│ │                                │ │
│ │ Botão: "Entendi"               │ │
│ │ Botão opcional: "Tentar        │ │
│ │ novamente"                     │ │
│ └────────────────────────────────┘ │
└────────────────────────────────────┘
```
#### Estados
| Estado | Gatilho | O que muda na UI |
|--------|---------|------------------|
| Erro de validação local | Campos obrigatórios ou e-mail inválido | Mensagem aparece abaixo do campo correspondente. |
| Erro de autenticação | API informa credenciais inválidas | BottomSheet modal é exibido com mensagem amigável. |
| Erro de conexão | Falha de internet, timeout ou servidor indisponível | BottomSheet modal é exibido com orientação para verificar a conexão e tentar novamente. |
| Erro inesperado | API retorna erro não tratado ou resposta inesperada | BottomSheet modal é exibido com mensagem genérica. |
| Fechar erro | Usuário toca em Entendi ou fecha o BottomSheet | BottomSheet é fechado e o usuário permanece na tela de login. |
| Tentar novamente | Usuário toca em Tentar novamente, quando disponível | BottomSheet é fechado e o app tenta executar novamente a autenticação. |

---

### Mensagens exibidas no BottomSheet
| Situação | Título | Mensagem | Ação principal | Ação secundária |
|----------|--------|----------|----------------|-----------------|
| Credenciais inválidas | Não foi possível entrar | E-mail ou senha inválidos. | Verifique os dados e tente novamente. | Entendi | Tentar novamente |
| Falha de conexão | Sem conexão com o servidor | Não foi possível conectar ao servidor. | Verifique sua internet e tente novamente. | Entendi | Tentar novamente |
| Timeout | Tempo de resposta excedido | O servidor demorou para responder. | Tente novamente em alguns instantes. | Entendi | Tentar novamente |
| Erro interno da API | Algo deu errado | Não foi possível concluir a operação. | Tente novamente em alguns instantes. | Entendi | Tentar novamente |
| Sessão inválida | Sessão expirada | Sua sessão expirou. | Entre novamente para continuar. | Entendi | |

---

#### Elementos Interativos
| Elemento | Tipo | Ação | Rótulo de acessibilidade |
|----------|------|------|--------------------------|
| BottomSheet de erro | Modal | Exibe erro retornado pela chamada de endpoint. | "Mensagem de erro" |
| Entendi | Botão primário ou secundário | Fecha o BottomSheet e mantém o usuário na tela de login. | "Fechar mensagem de erro" |
| Tentar novamente | Botão secundário ou primário, conforme contexto | Fecha o BottomSheet e executa novamente a tentativa de login. | "Tentar entrar novamente" |
| Fechar | Ícone/Botão opcional | Fecha o BottomSheet sem executar nova ação. | "Fechar" |

---

### 3.6 Regras de UI
1. O botão Entrar deve ficar indisponível enquanto o login estiver em andamento.
2. O usuário não deve conseguir disparar múltiplas tentativas simultâneas de login.
3. A senha deve poder ser exibida ou ocultada pelo usuário.
4. Mensagens de erro de campo devem aparecer próximas ao campo correspondente.
5. A mensagem de credenciais inválidas não deve informar se o erro está no e-mail ou na senha.
6. O app deve manter os dados digitados quando ocorrer falha, exceto a senha se a política de segurança decidir limpá-la.
7. A tela deve ser utilizável em diferentes tamanhos de tela Android.
8. A tela deve seguir o padrão visual do aplicativo, com botões e campos de cantos arredondados.
9. A navegação para cadastro e recuperação de senha deve estar visível na tela de login.
10. A tela deve ser compatível com leitor de tela e navegação acessível.
11. Todo erro retornado por chamada de endpoint deve ser exibido em um BottomSheet modal padrão.
12. O BottomSheet deve apresentar título, mensagem amigável e pelo menos uma ação para fechar.
13. Quando fizer sentido, o BottomSheet pode apresentar a opção Tentar novamente.
14. O texto exibido no BottomSheet não deve conter termos técnicos, código HTTP, stack trace ou detalhes internos da API.
15. O usuário deve permanecer na tela atual após fechar o BottomSheet.
16. O BottomSheet não deve limpar automaticamente os dados já digitados pelo usuário.
17. Erros de validação local continuam sendo exibidos próximos aos campos.
18. Erros de API relacionados a validação de negócio podem ser exibidos no BottomSheet quando forem retornados pelo endpoint.
19. O BottomSheet deve seguir o padrão visual do aplicativo, com cantos arredondados e linguagem clara.
20. O BottomSheet deve ser acessível por leitor de tela.
    
### 3.7 Catálogo de Componentes
<!-- Referencie componentes do Design System; especifique variante + configuração. -->

| Componente | Variante | Configuração |
|------------|----------|--------------|
| `LogoApp` | Padrão | Exibir identidade visual do aplicativo no topo da tela. |
| `CampoTexto` | E-mail | Rótulo: "E-mail"; teclado de e-mail; validação de formato. |
| `CampoSenha` | Senha com visibilidade alternável | Rótulo: "Senha"; opção para mostrar/ocultar senha. |
| `BotaoPrimario` | Padrão | Rótulo: "Entrar"; largura total; estado normal, carregando e desabilitado. |
| `BotaoTexto` | Link | Rótulo: "Esqueci minha senha". |
| `BotaoTexto` | Link | Rótulo: "Criar minha conta". |
| `MensagemErroCampo` | Inline | Exibida abaixo do campo com erro. |
| `MensagemErroGeral` | Banner ou texto destacado | Exibida para erro de login, conexão ou erro inesperado. |
| `IndicadorCarregamento` | Pequeno | Exibido no botão ou próximo ao botão durante autenticação. |

---

## 4. Design Técnico

### 4.1 Posicionamento no Módulo

<!-- Em qual módulo existente esta feature se encaixa, ou se um novo módulo é necessário. -->

**Módulo:** `features/auth/login`  
**Novo módulo necessário:** Sim

A feature de login deve ficar dentro do módulo de autenticação, pois faz parte do fluxo de acesso do usuário ao aplicativo. Esse módulo deve concentrar as responsabilidades relacionadas à entrada do usuário, validação de sessão, autenticação com a API, armazenamento seguro dos tokens e navegação após autenticação.

A feature de login deve depender de componentes compartilhados do app, como:

- módulo de navegação;
- módulo de design system;
- módulo de rede/API;
- módulo de sessão;
- módulo de armazenamento seguro;
- módulo de tratamento padrão de erros;
- componente padrão de BottomSheet modal para erros de endpoint.

---

### 4.2 Decomposição de Componentes / Classes

| Componente | Tipo | Responsabilidade |
|------------|------|-----------------|
| `LoginScreen` | View / Tela | Renderiza a tela de login, campos de e-mail e senha, botão de entrada, links para cadastro e recuperação de senha. Observa o estado exposto pelo ViewModel e dispara eventos de interação do usuário. |
| `LoginViewModel` | ViewModel / StateHolder | Mantém o estado da tela de login, valida campos, controla carregamento, aciona o caso de uso de autenticação e emite eventos de navegação ou erro. |
| `LoginUiState` | Estado de UI | Representa o estado visual da tela, incluindo e-mail, senha, campos inválidos, carregamento e disponibilidade do botão Entrar. |
| `LoginUiEvent` | Evento de UI | Representa eventos únicos da tela, como navegar para Home, navegar para cadastro, navegar para recuperação de senha e exibir BottomSheet de erro. |
| `LoginAction` | Ação de UI | Representa ações do usuário, como alterar e-mail, alterar senha, tocar em Entrar, tocar em Criar Conta e tocar em Esqueci Minha Senha. |
| `LoginFormValidator` | Validador | Valida campos locais antes da chamada de API, como e-mail obrigatório, senha obrigatória e formato válido de e-mail. |
| `AuthenticateUserUseCase` | Caso de Uso | Orquestra a autenticação do usuário com e-mail e senha. Chama o repositório de autenticação e retorna sucesso ou falha para o ViewModel. |
| `CheckSavedSessionUseCase` | Caso de Uso | Verifica se existe sessão válida salva localmente para decidir se o app deve exibir login ou redirecionar para a tela principal. |
| `SaveSessionUseCase` | Caso de Uso | Salva os dados de sessão após login bem-sucedido, incluindo `accessToken`, `refreshToken`, `usuarioId` e dados mínimos necessários. |
| `AuthRepository` | Repositório | Abstrai as operações de autenticação, como login, leitura de sessão salva, persistência segura dos tokens e limpeza de sessão. |
| `AuthRemoteDataSource` | Fonte de Dados Remota | Realiza a chamada ao endpoint de login da API e converte request/response em DTOs de autenticação. |
| `SessionLocalDataSource` | Fonte de Dados Local Segura | Lê e grava tokens e dados mínimos de sessão usando armazenamento seguro do Android. |
| `LoginRequestDto` | DTO de Request | Representa o corpo da requisição de login enviado para a API. |
| `LoginResponseDto` | DTO de Response | Representa a resposta de sucesso da API, contendo tokens e dados mínimos do usuário autenticado. |
| `AuthMapper` | Mapper | Converte DTOs da API em modelos de domínio ou modelos de sessão usados pelo app. |
| `SessionManager` | Gerenciador de Sessão | Centraliza o estado da sessão atual do usuário e disponibiliza informações como usuário logado, token válido e estado autenticado/não autenticado. |
| `EndpointErrorMapper` | Mapper de Erro | Converte erros retornados pela API em mensagens amigáveis para exibição no BottomSheet modal padrão. |
| `StandardErrorBottomSheet` | Componente de UI | Exibe erros recebidos de chamadas de endpoint em BottomSheet modal padrão, com título, mensagem e ações como Entendi ou Tentar novamente. |
| `AuthNavigator` | Router / Navigator | Gerencia a navegação da feature de login para Home, Cadastro de Usuário e Recuperação de Senha. |
| `ConnectivityObserver` | Serviço / Observer | Informa se há conexão com a internet antes ou durante a tentativa de login. |

---

### 4.3 Responsabilidades por Camada

| Camada | Responsabilidades na Feature de Login |
|--------|----------------------------------------|
| Apresentação | Exibir tela de login, receber e-mail e senha, apresentar validações locais, exibir estado de carregamento, abrir BottomSheet de erro e navegar após sucesso. |
| ViewModel | Controlar estado da tela, validar campos, chamar caso de uso de autenticação, tratar sucesso/erro e emitir eventos únicos de UI. |
| Domínio | Executar os casos de uso relacionados ao login, validação de sessão e salvamento da sessão autenticada. |
| Dados | Comunicar com a API de autenticação, persistir tokens em armazenamento seguro e mapear respostas da API. |
| Segurança | Garantir que tokens sejam armazenados de forma segura e nunca expostos em logs, telas ou mensagens de erro. |

---

### 4.4 Fluxo Técnico Resumido

1. `LoginScreen` exibe a tela de login.
2. O usuário informa e-mail e senha.
3. `LoginScreen` envia a ação para `LoginViewModel`.
4. `LoginViewModel` atualiza o `LoginUiState`.
5. O usuário toca em **Entrar**.
6. `LoginViewModel` executa validações locais.
7. Se houver erro local, o estado da tela é atualizado com mensagens nos campos.
8. Se os dados forem válidos, `LoginViewModel` aciona `AuthenticateUserUseCase`.
9. `AuthenticateUserUseCase` chama `AuthRepository`.
10. `AuthRepository` usa `AuthRemoteDataSource` para chamar a API.
11. A API retorna sucesso com tokens e dados mínimos do usuário.
12. `AuthRepository` salva os tokens usando `SessionLocalDataSource`.
13. `SessionManager` passa a considerar o usuário autenticado.
14. `LoginViewModel` emite evento de navegação para a tela principal.
15. Caso a API retorne erro, `EndpointErrorMapper` prepara a mensagem amigável.
16. `LoginViewModel` emite evento para exibir o `StandardErrorBottomSheet`.

---

### 4.5 Modelos de Request e Response

#### `LoginRequestDto`

```json
{
  "email": "usuario@gmail.com",
  "password": "Senh@123"
}
```

|-------|------|-------------|-----------|
| Campo      | Tipo   | Obrigatório | Descrição                      |
| ---------- | ------ | ----------- | ------------------------------ |
| `email`    | String | Sim         | E-mail informado pelo usuário. |
| `password` | String | Sim         | Senha informada pelo usuário.  |

---

### `LoginResponseDto`

```json
{
  "access_token": "string",
  "refresh_token": "string",
  "token_type": "bearer"
}
```

| Campo          | Tipo          | Obrigatório | Descrição                                       |
| -------------- | ------------- | ----------- | ----------------------------------------------- |
| `accessToken`  | String        | Sim         | Token de acesso para requisições autenticadas.  |
| `refreshToken` | String        | Sim         | Token usado para renovação da sessão.           |
| `token_type`   | String        | Sim         | Valor fixo `bearer`. |

---

### 4.6 Tratamento de erros

| Origem do erro | Exibição | Exemplo |
| -------------- | -------- | ------- |
| Validação local | Mensagem abaixo do campo | E-mail vazio, senha vazia, e-mail inválido. |
| Erro de endpoint | BottomSheet modal padrão | Credenciais inválidas, servidor indisponível, timeout, erro interno. |
| Sem conexão | BottomSheet modal padrão | Não foi possível conectar ao servidor. |
| Sessão inválida  | BottomSheet modal padrão ou redirecionamento para login | Sua sessão expirou. Entre novamente para continuar. |

---

### 4.7 Regras técnicas
1. A tela de login não deve acessar diretamente API, banco local ou armazenamento seguro.
2. O ViewModel deve controlar todo o estado da tela.
3. Validações locais devem ocorrer antes da chamada de API.
4. Enquanto o login estiver em andamento, o botão Entrar deve ficar indisponível.
5. O app não deve permitir múltiplas chamadas simultâneas de login.
6. Erros de validação local devem ser exibidos próximos aos campos.
7. Erros retornados por endpoint devem ser exibidos no BottomSheet modal padrão.
8. Tokens devem ser armazenados apenas em armazenamento seguro.
9. Tokens, senhas e cabeçalhos de autenticação não devem ser registrados em logs.
10. Após login com sucesso, o usuário deve ser direcionado para a tela principal.
11. O fluxo de cadastro e recuperação de senha deve ser acessível a partir da tela de login.
12. O e-mail digitado pode permanecer preenchido após falha.
13. A senha pode ser limpa após falha, caso a política de segurança do app defina esse comportamento.

### 4.8 Endpoints de API Utilizados

| Endpoint | Método | Contrato | Observações |
|----------|--------|----------|-------------|
| `/auth/login` | POST | Ver Spec Técnica §6.1 |  |

---

## 5. Eventos de Analytics

| Nome do evento | Gatilho | Propriedades |
|----------------|---------|--------------|
| `login_visualizado` | Tela de login aparece para o usuário | `origem: String`, `tem_sessao_salva: Boolean` |
| `login_email_preenchido` | Usuário preenche o campo de e-mail | `email_valido: Boolean` |
| `login_senha_preenchida` | Usuário preenche o campo de senha | `senha_preenchida: Boolean` |
| `login_senha_visibilidade_alterada` | Usuário toca na opção de mostrar ou ocultar senha | `visivel: Boolean` |
| `login_entrar_tocado` | Usuário toca no botão **Entrar** | `campos_preenchidos: Boolean`, `email_valido: Boolean` |
| `login_validacao_local_falhou` | App identifica erro antes de chamar a API | `campos_invalidos: String` |
| `login_iniciado` | App inicia a chamada de autenticação na API | `tem_conexao: Boolean` |
| `login_realizado` | Login concluído com sucesso | `duracao_ms: Int` |
| `login_falhou` | Login não foi concluído por erro da API, conexão ou timeout | `codigo_erro: String`, `tipo_erro: String`, `tentar_novamente: Boolean`, `duracao_ms: Int` |
| `login_bottomsheet_erro_exibido` | BottomSheet modal padrão de erro é exibido após falha de endpoint | `codigo_erro: String`, `tipo_erro: String`, `tentar_novamente: Boolean` |
| `login_bottomsheet_erro_fechado` | Usuário fecha o BottomSheet de erro | `acao: String` |
| `login_tentar_novamente_tocado` | Usuário toca em **Tentar novamente** no BottomSheet | `codigo_erro: String`, `tipo_erro: String` |
| `login_criar_conta_tocado` | Usuário toca em **Criar minha conta** | `origem: String` |
| `login_recuperar_senha_tocado` | Usuário toca em **Esqueci minha senha** | `origem: String` |
| `login_sessao_invalida_detectada` | App identifica sessão inválida e direciona para login | `motivo: String` |
| `login_sessao_valida_detectada` | App identifica sessão válida e não exibe login | `origem: String` |

---

### Propriedades dos Eventos

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `origem` | String | Indica de onde o usuário chegou ao login, como `splash`, `logout`, `sessao_expirada`, `cadastro_sucesso` ou `recuperacao_senha_sucesso`. |
| `tem_sessao_salva` | Boolean | Indica se existia alguma sessão salva localmente ao abrir o app. |
| `email_valido` | Boolean | Indica se o e-mail informado possui formato válido. Não deve enviar o e-mail digitado. |
| `senha_preenchida` | Boolean | Indica se o campo senha foi preenchido. Não deve enviar a senha. |
| `campos_preenchidos` | Boolean | Indica se os campos obrigatórios foram preenchidos. |
| `campos_invalidos` | String | Lista categorizada dos campos inválidos, como `email`, `senha` ou `email,senha`. |
| `tem_conexao` | Boolean | Indica se havia conexão com a internet no momento da tentativa. |
| `duracao_ms` | Int | Tempo gasto para concluir ou falhar a operação. |
| `codigo_erro` | String | Código ou categoria segura do erro, sem expor detalhes técnicos sensíveis. |
| `tipo_erro` | String | Categoria do erro, como `validacao`, `credenciais_invalidas`, `sem_conexao`, `timeout`, `servidor` ou `desconhecido`. |
| `tentar_novamente` | Boolean | Indica se o BottomSheet exibiu a opção de tentar novamente. |
| `acao` | String | Ação executada no BottomSheet, como `entendi`, `fechar` ou `tentar_novamente`. |
| `motivo` | String | Motivo seguro para redirecionamento ou falha, como `token_expirado`, `token_ausente`, `refresh_invalido` ou `api_rejeitou_sessao`. |
| `visivel` | Boolean | Indica se a senha foi alterada para visível ou oculta. |

---

### Regras de Analytics da Feature

1. Não enviar e-mail, senha, tokens ou qualquer credencial nos eventos.
2. Não enviar payload completo da requisição ou resposta da API.
3. Erros de endpoint devem registrar apenas categoria segura do erro.
4. O evento `login_realizado` deve ser disparado somente após autenticação concluída com sucesso e sessão salva.
5. O evento `login_falhou` deve ser disparado quando a autenticação não for concluída.
6. O evento `login_bottomsheet_erro_exibido` deve ser disparado sempre que erro de endpoint for apresentado no BottomSheet modal padrão.
7. O evento `login_validacao_local_falhou` deve ser usado apenas para erros identificados antes da chamada da API.
8. O tempo `duracao_ms` deve medir o intervalo entre o toque em **Entrar** e o retorno de sucesso ou falha.

## 6. Permissões e Privacidade

| Permissão | Obrigatória | Quando solicitada | Se negada |
|-----------|-------------|-------------------|-----------|

---

## 7. Notificações (se aplicável)

| Tipo de notificação | Gatilho | Título | Corpo | Deep link |
|---------------------|---------|--------|-------|-----------|

---

## 8. Localização

**Arquivo de strings / recurso:** `strings.xml`

| Chave | Padrão (PT-BR) | Observações |
|-------|----------------|-------------|
| `login.titulo` | "Entrar no aplicativo" | Título principal da tela de login. |
| `login.subtitulo` | "Acesse sua conta para gerenciar suas viagens e acompanhar trajetos compartilhados com você." | Texto explicativo abaixo do título. |
| `login.campo.email` | "E-mail" | Label do campo de e-mail. |
| `login.campo.email.placeholder` | "Informe seu e-mail" | Placeholder do campo de e-mail. |
| `login.campo.senha` | "Senha" | Label do campo de senha. |
| `login.campo.senha.placeholder` | "Informe sua senha" | Placeholder do campo de senha. |
| `login.botao.entrar` | "Entrar" | CTA principal da tela. |
| `login.botao.entrando` | "Entrando..." | Texto exibido durante carregamento. |
| `login.link.criar_conta` | "Criar minha conta" | Acesso ao fluxo de cadastro. |
| `login.link.recuperar_senha` | "Esqueci minha senha" | Acesso ao fluxo de recuperação de senha. |
| `login.senha.mostrar` | "Mostrar senha" | Acessibilidade do ícone de mostrar senha. |
| `login.senha.ocultar` | "Ocultar senha" | Acessibilidade do ícone de ocultar senha. |
| `login.validacao.email_obrigatorio` | "Este campo é obrigatório." | Exibido abaixo do campo e-mail quando vazio. |
| `login.validacao.senha_obrigatoria` | "Este campo é obrigatório." | Exibido abaixo do campo senha quando vazio. |
| `login.validacao.email_invalido` | "Informe um e-mail válido." | Exibido quando o formato do e-mail for inválido. |
| `login.erro.titulo` | "Não foi possível entrar" | Título do BottomSheet para erro de login. |
| `login.erro.credenciais_invalidas` | "E-mail ou senha inválidos. Verifique os dados e tente novamente." | Exibido no BottomSheet quando a API rejeitar as credenciais. |
| `login.erro.sem_conexao.titulo` | "Sem conexão com o servidor" | Título do BottomSheet para falha de conexão. |
| `login.erro.sem_conexao.mensagem` | "Não foi possível conectar ao servidor. Verifique sua internet e tente novamente." | Mensagem para falha de conexão. |
| `login.erro.timeout.titulo` | "Tempo de resposta excedido" | Título para timeout. |
| `login.erro.timeout.mensagem` | "O servidor demorou para responder. Tente novamente em alguns instantes." | Mensagem para timeout. |
| `login.erro.generico.titulo` | "Algo deu errado" | Título padrão para erro inesperado. |
| `login.erro.generico.mensagem` | "Não foi possível concluir a operação. Tente novamente em alguns instantes." | Mensagem padrão de erro. |
| `login.erro.sessao_expirada.titulo` | "Sessão expirada" | Título para sessão inválida ou expirada. |
| `login.erro.sessao_expirada.mensagem` | "Sua sessão expirou. Entre novamente para continuar." | Mensagem para sessão expirada. |
| `login.bottomsheet.botao.entendi` | "Entendi" | Botão para fechar o BottomSheet. |
| `login.bottomsheet.botao.tentar_novamente` | "Tentar novamente" | Botão para nova tentativa de login. |
| `login.bottomsheet.botao.fechar` | "Fechar" | Rótulo de acessibilidade ou ação de fechar. |
| `login.acessibilidade.tela` | "Tela de login" | Nome acessível da tela. |
| `login.acessibilidade.campo_email` | "Campo de e-mail" | Rótulo para leitor de tela. |
| `login.acessibilidade.campo_senha` | "Campo de senha" | Rótulo para leitor de tela. |
| `login.acessibilidade.botao_entrar` | "Entrar no aplicativo" | Rótulo acessível do botão Entrar. |
| `login.acessibilidade.entrando` | "Entrando no aplicativo, aguarde" | Rótulo durante carregamento. |
| `login.acessibilidade.recuperar_senha` | "Recuperar senha" | Rótulo acessível do link de recuperação. |
| `login.acessibilidade.criar_conta` | "Criar minha conta" | Rótulo acessível do link de cadastro. |
| `login.acessibilidade.erro` | "Mensagem de erro" | Rótulo acessível do BottomSheet de erro. |
| `login.acessibilidade.fechar_erro` | "Fechar mensagem de erro" | Rótulo acessível do botão Entendi/Fechar. |
| `login.acessibilidade.tentar_novamente` | "Tentar entrar novamente" | Rótulo acessível do botão Tentar novamente. |

---

### Observações

- Todas as mensagens de erro retornadas por endpoint devem ser exibidas no **BottomSheet modal padrão**.
- Erros de validação local, como campo obrigatório e e-mail inválido, devem ser exibidos próximos aos campos.
- Nenhuma mensagem deve exibir detalhes técnicos, código HTTP, stack trace ou payload da API.
- Os textos devem ser mantidos em português do Brasil nesta versão.
- As chaves seguem o prefixo `login.` para facilitar organização por feature.

---

## 9. Definição de Pronto (Definition of Done)



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
| 0.1.0 | 2026-06-08 | Jose Julio | Rascunho inicial |
