# Especificação de Feature — Recuperar senha

> **Tipo de documento:** Spec de Feature  
> **Status:** `rascunho`  
> **Versão:** 0.1.0  
> **Última atualização:** 2026-06-09  
> **Dono da feature:** Jose Julio
> **Tech lead:** Jose Julio  
> **Spec de Produto vinculada:** [../product-travel-tracker.md](../product-travel-tracker.md) — §3 US-04, §4.1  
> **Spec Técnica vinculada:** [../technical-travel-tracker.md](../technical-travel-tracker.md) — FEAT-03, §6.1 `/auth/recover-password`, `/auth/update-password`  
> **Plataforma:** `Android`  
> **Sprint / Marco:** Sprint 1  
> **Esforço estimado:** [X dias / Y story points]

---

> **Stack de desenvolvimento revisada:** este documento foi atualizado para orientar o desenvolvimento do aplicativo Android utilizando **Java**, **layouts XML**, **arquitetura MVVM**, **Activities/Fragments**, **ViewModel**, **LiveData**, **ViewBinding**, **Retrofit**, **Room** e componentes Android tradicionais. Referências anteriores a Kotlin, Jetpack Compose, Composables, StateFlow, SharedFlow, Flow e Coroutines devem ser consideradas obsoletas nesta versão e substituídas por alternativas compatíveis com Java e XML.


## 1. Resumo da Feature

### 1.1 O Que Esta Feature Faz

A feature de recuperação de senha permite que um usuário cadastrado recupere o acesso ao aplicativo quando esquecer sua senha. O usuário informa o e-mail cadastrado para receber um token de recuperação, valida o token recebido e define uma nova senha. Após a alteração com sucesso, o usuário é redirecionado para a tela de login, onde pode acessar o aplicativo com a nova senha.

### 1.2 Por Que Existe

Esta feature existe para garantir que o usuário consiga recuperar o acesso à sua conta de forma segura quando esquecer a senha, sem necessidade de suporte manual. Como o aplicativo armazena dados sensíveis de localização e viagens, a segurança da conta é essencial, e a recuperação por e-mail com token garante que apenas o dono do e-mail cadastrado possa redefinir a senha.

**Necessidade do usuário:** US-04 — Como usuário, quero informar meu e-mail para receber um token de recuperação para que eu possa alterar minha senha.  
**Objetivo de negócio:** Permitir que o aplicativo mantenha usuários autenticados de forma segura e autônoma, reduzindo a dependência de suporte manual para recuperação de acesso.

### 1.3 Escopo

**Dentro do escopo:**
- Permitir que o usuário informe o e-mail cadastrado para solicitar recuperação de senha.
- Enviar o e-mail informado para a API (`/auth/recover-password`).
- A API gera e envia um token de recuperação para o e-mail do usuário.
- Receber a confirmação de envio do token.
- Permitir que o usuário informe o token recebido por e-mail.
- Validar se o token informado é válido.
- Permitir que o usuário informe uma nova senha e sua confirmação.
- Validar que a nova senha atende aos requisitos mínimos (6 caracteres, letra maiúscula, letra minúscula, número e caractere especial).
- Enviar a nova senha para a API (`/auth/update-password`).
- Exibir mensagem de sucesso após a alteração.
- Redirecionar o usuário para a tela de login após a conclusão.
- Exibir mensagens de erro claras para e-mail inválido, token inválido ou falha de conexão.

**Fora do escopo (nesta iteração):**
- Recuperação de senha por SMS ou telefone.
- Recuperação de senha por redes sociais.
- Alteração de senha com usuário já logado (feature de perfil).
- Geração ou validação de token no lado do cliente (o token é gerado e validado pela API).
- Recuperação de senha sem conexão com a internet.
- Suporte a recuperação de senha para e-mail não cadastrado.

---

## 2. Comportamento Visível ao Usuário

### 2.1 Pontos de Entrada

| Ponto de entrada | Gatilho | Pré-condição |
|------------------|---------|--------------|
| Tela de Login | Toque em "Esqueci minha senha" | Usuário não autenticado na tela de login. |

### 2.2 Fluxo do Caminho Feliz

**Pré-condição:**  
O usuário possui cadastro no aplicativo, não existe uma sessão válida salva localmente e o usuário está na tela de login.

1. O usuário seleciona a opção **Esqueci minha senha** na tela de login.
2. O app apresenta a tela de recuperação de senha com campo para informar o e-mail.
3. O usuário informa o e-mail cadastrado.
4. O usuário seleciona a opção **Enviar**.
5. O app envia o e-mail para a API (`/auth/recover-password`).
6. A API gera e envia um token de recuperação para o e-mail do usuário.
7. O app recebe a confirmação de que o token foi enviado com sucesso.
8. O app apresenta um campo para o usuário informar o token recebido.
9. O usuário informa o token recebido por e-mail.
10. O usuário seleciona a opção **Validar**.
11. O app valida o token informado junto à confirmação recebida anteriormente.
12. O app apresenta a tela de alteração de senha com campos para nova senha e confirmação.
13. O usuário informa a nova senha e a confirmação.
14. O usuário seleciona a opção **Alterar senha**.
15. O app valida se a nova senha atende aos requisitos (mín. 6 caracteres, letra maiúscula, letra minúscula, número e caractere especial).
16. O app envia a nova senha para a API (`/auth/update-password`).
17. O sistema recebe a confirmação de que a senha foi alterada com sucesso.
18. O app exibe uma mensagem de sucesso.
19. O app retorna para a tela de login.
20. O usuário pode acessar o aplicativo utilizando o e-mail e a nova senha.

**Pós-condição:**  
A senha do usuário foi alterada com sucesso no servidor. O usuário está na tela de login e pode autenticar-se com a nova senha.

### 2.3 Fluxos Alternativos

#### 2.3.1 Falha no envio do token
**Gatilho:**  
A API não consegue gerar ou enviar o token de recuperação para o e-mail informado.

1. O usuário informa o e-mail e seleciona **Enviar**.
2. O app envia o e-mail para a API.
3. O sistema retorna uma falha ao tentar gerar ou enviar o token.
4. O app exibe a mensagem: **"Não foi possível enviar o token de recuperação. Verifique o e-mail informado e tente novamente."**
5. O usuário permanece na tela de recuperação com o campo de e-mail preenchido.
6. O usuário pode corrigir o e-mail ou tentar novamente.

#### 2.3.2 Token inválido
**Gatilho:**  
O token informado pelo usuário não corresponde ao token gerado pela API.

1. O usuário informa o token recebido e seleciona **Validar**.
2. O app verifica se o token informado é válido.
3. O app identifica que o token é inválido.
4. O app exibe a mensagem: **"Token inválido. Verifique o código recebido por e-mail e tente novamente."**
5. O usuário permanece na tela de validação do token.
6. O usuário pode corrigir o token e tentar novamente, ou solicitar um novo envio.

#### 2.3.3 E-mail não informado
**Gatilho:**  
O usuário tenta enviar a solicitação sem informar o e-mail.

1. O usuário deixa o campo de e-mail em branco e seleciona **Enviar**.
2. O app valida o campo obrigatório.
3. O app exibe a mensagem: **"Informe o e-mail cadastrado."** no campo correspondente.
4. O usuário permanece na tela de recuperação.
5. O usuário pode preencher o e-mail e tentar novamente.

#### 2.3.4 Token não informado
**Gatilho:**  
O usuário tenta validar o token sem informá-lo.

1. O usuário deixa o campo de token em branco e seleciona **Validar**.
2. O app valida o campo obrigatório.
3. O app exibe a mensagem: **"Informe o token recebido por e-mail."** no campo correspondente.
4. O usuário permanece na tela de validação.
5. O usuário pode informar o token e tentar novamente.

#### 2.3.5 Nova senha não atende aos requisitos
**Gatilho:**  
O usuário informa uma nova senha que não atende aos critérios mínimos.

1. O usuário informa a nova senha e a confirmação, e seleciona **Alterar senha**.
2. O app valida a senha informada.
3. O app identifica que a senha não atende aos requisitos.
4. O app exibe a mensagem: **"A senha deve ter no mínimo 6 caracteres, incluindo letra maiúscula, letra minúscula, um número e um caractere especial."**
5. O usuário permanece na tela de alteração de senha.
6. O usuário pode corrigir a senha e tentar novamente.

#### 2.3.6 Confirmação de senha não coincide
**Gatilho:**  
Os campos "nova senha" e "confirmar senha" não são iguais.

1. O usuário informa valores diferentes nos dois campos e seleciona **Alterar senha**.
2. O app valida se os campos coincidem.
3. O app exibe a mensagem: **"As senhas não conferem. Verifique os campos e tente novamente."**
4. O usuário permanece na tela de alteração de senha.
5. O usuário pode corrigir os campos e tentar novamente.

#### 2.3.7 Falha de conexão durante recuperação
**Gatilho:**  
O usuário tenta realizar qualquer etapa da recuperação sem conexão com a internet.

1. O usuário executa uma ação que depende da API (enviar e-mail, validar token, alterar senha).
2. O app não consegue concluir a operação por falta de conexão.
3. O app exibe a mensagem: **"Sem conexão com a internet. Conecte-se para continuar."**
4. O usuário permanece na tela atual.
5. O usuário pode tentar novamente quando houver conexão disponível.

#### 2.3.8 Erro inesperado da API
**Gatilho:**  
A API retorna um erro interno do servidor (5xx) durante qualquer etapa.

1. O app envia uma requisição para a API.
2. O servidor retorna um erro 5xx.
3. O app exibe a mensagem: **"Não foi possível concluir a operação. Tente novamente em alguns instantes."**
4. O usuário permanece na tela atual.
5. O usuário pode tentar novamente.

### 2.4 Casos Extremos e Condições de Contorno

| Cenário | Comportamento esperado |
|---------|------------------------|
| Sem rede ao entrar na feature | Exibir mensagem informando ausência de conexão e bloquear qualquer ação que dependa da API. |
| E-mail em formato inválido | Exibir mensagem orientando o usuário a informar um e-mail válido. |
| E-mail não cadastrado | A API não deve informar se o e-mail existe ou não por segurança. Exibir mensagem genérica de falha no envio. |
| Token expirado | Exibir mensagem informando que o token expirou e orientar o usuário a solicitar um novo envio. |
| Token com formato inválido | Exibir mensagem de token inválido e solicitar correção. |
| Senha muito longa | Validar limite máximo no frontend (ex.: 72 caracteres) e exibir mensagem se ultrapassado. |
| Toques repetidos no botão Enviar / Validar / Alterar | Evitar múltiplas tentativas simultâneas; manter o botão temporariamente indisponível durante o carregamento. |
| API lenta (> 1s) | Exibir estado de carregamento com indicador visual. |
| API lenta (> 10s) | Manter carregamento e permitir que o usuário tente novamente caso ocorra timeout. |
| App fechado durante recuperação | Ao reabrir, o app deve verificar a sessão. Como o usuário não está autenticado, deve exibir a tela de login. O progresso da recuperação não é preservado. |
| Usuário retorna da recuperação com sucesso | Exibir tela de login para que o usuário entre com a nova senha. |

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
| TLA-01 | Solicitar E-mail | `push` | Tela para o usuário informar o e-mail cadastrado e solicitar o envio do token de recuperação. |
| TLA-02 | Validar Token | `push` | Tela com 6 campos de edição individuais para o usuário informar o token dígito a dígito e validá-lo. |
| TLA-03 | Alterar Senha | `push` | Tela para o usuário informar a nova senha e a confirmação, validar localmente e enviar para a API. |

### 3.2 Detalhe da Tela — TLA-01: Solicitar E-mail

**Referência de design:** A definir  
**Nome acessível:** "Recuperar senha - informar e-mail"

#### Layout

A tela deve apresentar um formulário simples com campo de e-mail e botão de envio, mantendo o usuário informado sobre o propósito da tela.

```
┌────────────────────────────────────┐
│  ← Voltar                          │
│  Título: "Recuperar senha"         │
├────────────────────────────────────┤
│                                    │
│  Texto explicativo:                │
│  "Informe seu e-mail cadastrado    │
│   para receber um código de        │
│   recuperação."                    │
│                                    │
│  Campo: E-mail                     │
│                                    │
├────────────────────────────────────┤
│  Botão: "Enviar código"            │
│                                    │
└────────────────────────────────────┘
```

#### Descrição das regiões
| Região | Descrição |
|--------|-----------|
| Cabeçalho | Barra de navegação com botão de voltar e título "Recuperar senha". |
| Texto explicativo | Instrução curta orientando o usuário a informar o e-mail. |
| Formulário | Campo de e-mail com validação de formato e mensagem de erro próxima ao campo. |
| Ação principal | Botão "Enviar código" que dispara a requisição para a API. |
| Feedback | Mensagens de erro ou carregamento conforme o estado da operação. |

#### Estados
| Estado | Gatilho | O que muda na UI |
|--------|---------|------------------|
| Inicial | Tela aberta sem interação | Campo de e-mail vazio, botão "Enviar código" disponível. |
| Preenchimento | Usuário digita o e-mail | Campo exibe o valor informado; mensagens de erro são removidas ao corrigir. |
| Validação local com erro | Usuário toca em Enviar com campo inválido | Mensagem de erro exibida abaixo do campo. |
| Carregando | Usuário toca em Enviar com dados válidos | Botão fica temporariamente indisponível e exibe indicador de carregamento. |
| Sucesso | Confirmação de envio recebida da API | Navega para TLA-02 (Validar Token). |
| Erro de API | API retorna falha no envio | Mensagem de erro amigável exibida na tela; usuário pode tentar novamente. |
| Sem conexão | Usuário tenta enviar sem internet | Mensagem de conexão exibida; usuário permanece na tela. |

#### Mensagens e validações
| Situação | Mensagem |
|----------|----------|
| E-mail vazio | Informe o e-mail cadastrado. |
| E-mail em formato inválido | Informe um e-mail válido. |
| Falha no envio do token | Não foi possível enviar o código de recuperação. Verifique o e-mail e tente novamente. |
| Sem conexão | Sem conexão com a internet. Conecte-se para continuar. |
| Erro genérico | Não foi possível concluir a operação. Tente novamente em alguns instantes. |

#### Elementos Interativos
| Elemento | Tipo | Ação | Rótulo de acessibilidade |
|----------|------|------|--------------------------|
| Voltar | Botão de navegação | Retorna para a tela de login. | "Voltar para o login" |
| Campo E-mail | Campo de texto | Permite informar o e-mail do usuário. | "Campo de e-mail" |
| Enviar código | Botão primário | Valida o e-mail e envia a solicitação para a API. | "Enviar código de recuperação" |

---

### 3.3 Detalhe da Tela — TLA-02: Validar Token

**Referência de design:** A definir  
**Nome acessível:** "Validar código de recuperação"

#### Layout

A tela deve exibir 6 campos de edição lado a lado, cada um aceitando no máximo 1 dígito numérico. O foco deve avançar automaticamente para o próximo campo ao digitar um dígito. Abaixo dos campos, deve haver o botão de validação.

```
┌────────────────────────────────────┐
│  ← Voltar                          │
│  Título: "Validar código"          │
├────────────────────────────────────┤
│                                    │
│  Texto explicativo:                │
│  "Informe o código de 6 dígitos    │
│   enviado para [e-mail]."          │
│                                    │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐   │
│  │  │ │  │ │  │ │  │ │  │ │  │   │
│  └──┘ └──┘ └──┘ └──┘ └──┘ └──┘   │
│                                    │
│  Link: "Reenviar código"           │
│                                    │
├────────────────────────────────────┤
│  Botão: "Validar código"           │
│                                    │
└────────────────────────────────────┘
```

#### Descrição das regiões
| Região | Descrição |
|--------|-----------|
| Cabeçalho | Barra de navegação com botão de voltar e título "Validar código". |
| Texto explicativo | Instrução informando que o código foi enviado para o e-mail do usuário. |
| Campos do token | 6 campos lado a lado, cada um aceitando exatamente 1 dígito numérico. O campo seguinte recebe foco automaticamente ao preencher o anterior. O campo anterior recebe foco ao apagar o atual. |
| Ação secundária | Link "Reenviar código" para solicitar um novo token, caso necessário. |
| Ação principal | Botão "Validar código" que concatena os 6 dígitos e verifica o token. |
| Feedback | Mensagens de erro exibidas abaixo dos campos ou como alerta. |

#### Comportamento dos campos de token
| Comportamento | Descrição |
|---------------|-----------|
| Tipo de entrada | `Numeric` — apenas caracteres numéricos. |
| Máximo de caracteres | 1 dígito por campo. |
| Avanço automático | Ao preencher um campo, o foco move-se automaticamente para o próximo campo vazio. |
| Retorno automático | Ao apagar o conteúdo de um campo, o foco retorna ao campo anterior. |
| Estado preenchido | Assim que o 6º dígito for informado, o botão "Validar código" deve ficar habilitado. |
| Estado incompleto | Se algum campo estiver vazio, o botão "Validar código" deve permanecer desabilitado. |

#### Estados
| Estado | Gatilho | O que muda na UI |
|--------|---------|------------------|
| Inicial | Tela aberta | 6 campos vazios, botão desabilitado. |
| Preenchendo | Usuário digita dígitos | Foco avança automaticamente; botão habilita quando todos os 6 campos estiverem preenchidos. |
| Carregando | Usuário toca em Validar | Botão fica temporariamente indisponível com indicador de carregamento. |
| Token válido | API ou lógica local confirma token | Navega para TLA-03 (Alterar Senha). |
| Token inválido | Token não corresponde ao esperado | Mensagem de erro exibida; campos são limpos; foco retorna ao primeiro campo. |
| Sem conexão | Usuário tenta validar sem internet | Mensagem de conexão exibida; usuário permanece na tela. |
| Erro inesperado | Falha não tratada | Mensagem genérica exibida. |

#### Mensagens e validações
| Situação | Mensagem |
|----------|----------|
| Campos incompletos | Preencha todos os 6 dígitos do código. |
| Dígito não numérico | Informe apenas números. |
| Token inválido | Código inválido. Verifique o e-mail e tente novamente. |
| Token expirado | Código expirado. Solicite um novo código. |
| Reenvio solicitado | Um novo código foi enviado para o seu e-mail. |
| Falha no reenvio | Não foi possível reenviar o código. Tente novamente. |
| Sem conexão | Sem conexão com a internet. Conecte-se para continuar. |

#### Elementos Interativos
| Elemento | Tipo | Ação | Rótulo de acessibilidade |
|----------|------|------|--------------------------|
| Voltar | Botão de navegação | Retorna para TLA-01 (Solicitar E-mail). | "Voltar para informar e-mail" |
| Campo dígito 1 a 6 | Campo de texto (1 dígito) | Permite informar cada dígito do token. | "Dígito 1 do código" a "Dígito 6 do código" |
| Reenviar código | Link textual | Solicita novo token à API. | "Reenviar código de recuperação" |
| Validar código | Botão primário | Concatena os 6 dígitos e valida o token. | "Validar código de recuperação" |

---

### 3.4 Detalhe da Tela — TLA-03: Alterar Senha

**Referência de design:** A definir  
**Nome acessível:** "Alterar senha"

#### Layout

A tela deve exibir dois campos de senha (nova senha e confirmação) e um botão de envio. A validação dos requisitos da senha deve ocorrer antes do envio para a API.

```
┌────────────────────────────────────┐
│  ← Voltar                          │
│  Título: "Nova senha"              │
├────────────────────────────────────┤
│                                    │
│  Texto explicativo:                │
│  "Crie uma nova senha para sua     │
│   conta."                          │
│                                    │
│  Requisitos da senha:              │
│  • Mínimo 6 caracteres             │
│  • 1 letra maiúscula               │
│  • 1 letra minúscula               │
│  • 1 número                        │
│  • 1 caractere especial            │
│                                    │
│  Campo: Nova senha                  │
│  Campo: Confirmar senha            │
│                                    │
├────────────────────────────────────┤
│  Botão: "Alterar senha"            │
│                                    │
└────────────────────────────────────┘
```

#### Descrição das regiões
| Região | Descrição |
|--------|-----------|
| Cabeçalho | Barra de navegação com botão de voltar e título "Nova senha". |
| Texto explicativo | Instrução e lista de requisitos da senha para orientar o usuário. |
| Formulário | Dois campos de senha (Nova senha e Confirmar senha) com exibição/ocultação de caracteres. |
| Ação principal | Botão "Alterar senha" que valida os campos localmente e envia para a API. |
| Feedback | Mensagens de erro exibidas abaixo dos campos. |

#### Estados
| Estado | Gatilho | O que muda na UI |
|--------|---------|------------------|
| Inicial | Tela aberta | Campos vazios, botão "Alterar senha" disponível. |
| Preenchimento | Usuário digita nos campos | Campos exibem o valor; ícone de exibir/ocultar senha disponível em cada campo. |
| Validação local com erro | Usuário toca em Alterar com dados inválidos | Mensagens de erro exibidas abaixo dos campos correspondentes. |
| Carregando | Usuário toca em Alterar com dados válidos | Botão fica temporariamente indisponível com indicador de carregamento. |
| Sucesso | API confirma alteração de senha | Mensagem de sucesso exibida; app redireciona para a tela de login. |
| Erro de API | API retorna falha na alteração | Mensagem de erro amigável exibida; usuário pode tentar novamente. |
| Sem conexão | Usuário tenta alterar sem internet | Mensagem de conexão exibida; usuário permanece na tela. |

#### Mensagens e validações
| Situação | Mensagem |
|----------|----------|
| Nova senha vazia | Informe a nova senha. |
| Confirmação vazia | Confirme a nova senha. |
| Senha não atende aos requisitos | A senha deve ter no mínimo 6 caracteres, incluindo letra maiúscula, letra minúscula, um número e um caractere especial. |
| Confirmação diferente de nova senha | As senhas não conferem. |
| Senha alterada com sucesso | Senha alterada com sucesso! Você será redirecionado para o login. |
| Erro na API | Não foi possível alterar a senha. Tente novamente em alguns instantes. |
| Sem conexão | Sem conexão com a internet. Conecte-se para continuar. |

#### Elementos Interativos
| Elemento | Tipo | Ação | Rótulo de acessibilidade |
|----------|------|------|--------------------------|
| Voltar | Botão de navegação | Retorna para TLA-02 (Validar Token). | "Voltar para validar código" |
| Campo Nova senha | Campo de senha | Permite informar a nova senha. | "Nova senha" |
| Exibir/Ocultar senha (Nova senha) | Botão/Ícone | Alterna visibilidade da nova senha. | "Mostrar ou ocultar nova senha" |
| Campo Confirmar senha | Campo de senha | Permite confirmar a nova senha. | "Confirmar senha" |
| Exibir/Ocultar senha (Confirmar) | Botão/Ícone | Alterna visibilidade da confirmação. | "Mostrar ou ocultar confirmação de senha" |
| Alterar senha | Botão primário | Valida os campos e envia a nova senha para a API. Em caso de sucesso, exibe mensagem e redireciona para a tela de login. | "Alterar senha" |

---

### 3.5 Catálogo de Componentes

| Componente | Variante | Configuração |
|------------|----------|--------------|
| `MaterialButton` | Padrão | Rótulo: "Enviar código" / "Validar código" / "Alterar senha", largura total |
| `TextInputLayout` + `TextInputEditText` | E-mail | Placeholder: "seu@email.com", teclado tipo e-mail, validação de formato |
| `TextInputLayout` + `TextInputEditText` | Senha | Ícone de exibir/ocultar, validação de requisitos |
| `TextInputLayout` + `TextInputEditText` | Token | 1 dígito, entrada numérica, foco automático, máximo 1 caractere |
| `ContainerToken` | 6 dígitos alinhados | Componente encapsulando 6 campos de token, espaçamento uniforme, navegação entre campos |
| `LinkTextual` | Padrão | Rótulo: "Reenviar código", cor de destaque |
| `BarraNavegacao` | Padrão | Título dinâmico por tela, botão de retorno |

---

## 4. Design Técnico

### 4.1 Posicionamento no Módulo

**Módulo:** `features/auth/recover-password`  
**Novo módulo necessário:** Sim

A feature de recuperação de senha deve ficar dentro do módulo de autenticação, pois faz parte do fluxo de acesso do usuário ao aplicativo. Esse módulo deve concentrar as responsabilidades relacionadas à solicitação do token de recuperação e alteração da senha.

A feature de recuperação de senha deve depender de componentes compartilhados do app, como:

- módulo de navegação;
- módulo de design system;
- módulo de rede/API;
- módulo de sessão;
- módulo de tratamento padrão de erros;
- componente padrão de BottomSheet modal para erros de endpoint.

### 4.2 Decomposição de Componentes / Classes

| Componente | Tipo | Responsabilidade |
|------------|------|-----------------|
| `RecuperarSenhaRouter` | Router / Navigator | Gerencia a navegação entre TLA-01 (Solicitar E-mail), TLA-02 (Validar Token) e TLA-03 (Alterar Senha), além do retorno para a tela de login. |
| `SolicitarEmailScreen` | Fragment / Tela XML | Renderiza TLA-01 com campo de e-mail e botão "Enviar código". Observa o estado do ViewModel e dispara eventos de interação. |
| `ValidarTokenScreen` | Fragment / Tela XML | Renderiza TLA-02 com 6 campos de dígito, link "Reenviar código" e botão "Validar código". Inclui lógica de foco automático entre campos. |
| `AlterarSenhaScreen` | Fragment / Tela XML | Renderiza TLA-03 com campos "Nova senha" e "Confirmar senha", lista de requisitos e botão "Alterar senha". |
| `SolicitarEmailViewModel` | ViewModel | Mantém o estado da TLA-01, valida o e-mail localmente, aciona o caso de uso de solicitação de token e emite eventos de navegação ou erro. |
| `ValidarTokenViewModel` | ViewModel | Mantém o estado da TLA-02, controla os 6 campos de dígito e validação local, aciona o caso de uso de validação do token e emite eventos de navegação ou erro. |
| `AlterarSenhaViewModel` | ViewModel | Mantém o estado da TLA-03, valida os campos localmente (requisitos da senha, igualdade das confirmações), aciona o caso de uso de alteração e emite eventos de navegação ou erro. |
| `SolicitarEmailUiState` | Estado de UI | Representa o estado visual da TLA-01: e-mail, validação de campo, carregamento, disponibilidade do botão. |
| `ValidarTokenUiState` | Estado de UI | Representa o estado visual da TLA-02: 6 dígitos, validação, carregamento, disponibilidade do botão. |
| `AlterarSenhaUiState` | Estado de UI | Representa o estado visual da TLA-03: nova senha, confirmação, validações, carregamento. |
| `SolicitarEmailUiEvent` | Evento de UI | Eventos únicos da TLA-01: navegar para TLA-02, exibir BottomSheet de erro. |
| `ValidarTokenUiEvent` | Evento de UI | Eventos únicos da TLA-02: navegar para TLA-03, exibir BottomSheet de erro. |
| `AlterarSenhaUiEvent` | Evento de UI | Eventos únicos da TLA-03: navegar para login com mensagem de sucesso, exibir BottomSheet de erro. |
| `SolicitarTokenUseCase` | Caso de Uso | Orquestra a solicitação do token de recuperação. Chama o repositório de autenticação com o e-mail informado e retorna o token recebido ou falha. |
| `AlterarSenhaUseCase` | Caso de Uso | Orquestra a alteração da senha. Chama o repositório de autenticação com o e-mail e a nova senha e retorna sucesso ou falha. |
| `AuthRepository` | Repositório | Abstrai as operações de autenticação, incluindo solicitação de token de recuperação e alteração de senha. |
| `AuthRemoteDataSource` | Fonte de Dados Remota | Realiza as chamadas aos endpoints `/auth/recover-password` e `/auth/update-password` da API e converte request/response em DTOs. |
| `RecoverPasswordRequestDto` | DTO de Request | Representa o corpo da requisição para `/auth/recover-password` contendo o e-mail. |
| `RecoverPasswordResponseDto` | DTO de Response | Representa a resposta da API contendo o token e mensagem de confirmação. |
| `UpdatePasswordRequestDto` | DTO de Request | Representa o corpo da requisição para `/auth/update-password` contendo e-mail e nova senha. |
| `UpdatePasswordResponseDto` | DTO de Response | Representa a resposta da API contendo a mensagem de confirmação. |
| `PasswordValidator` | Validador | Valida se a nova senha atende aos requisitos mínimos (6 caracteres, letra maiúscula, letra minúscula, número e caractere especial). |
| `EmailValidator` | Validador | Valida o formato do e-mail antes do envio para a API. |
| `EndpointErrorMapper` | Mapper de Erro | Converte erros retornados pela API em mensagens amigáveis para exibição no BottomSheet modal padrão. |
| `ConnectivityObserver` | Serviço / Observer | Informa se há conexão com a internet antes ou durante qualquer operação que dependa da API. |

### 4.3 Endpoints de API Utilizados

| Endpoint | Método | Contrato | Observações |
|----------|--------|----------|-------------|
| `/auth/recover-password` | POST | Ver Spec Técnica §6.1 — `RecoverPasswordRequest` / `RecoverPasswordResponse` | Sem autenticação. Envia e-mail para gerar token. |
| `/auth/update-password` | POST | Ver Spec Técnica §6.1 — `UpdatePasswordRequest` / `UpdatePasswordResponse` | Sem autenticação. Envia e-mail e nova senha. |

#### `RecoverPasswordRequest`

```json
{
  "email": "usuario@gmail.com"
}
```

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `email` | String | Sim | E-mail cadastrado do usuário. |

#### `RecoverPasswordResponse`

```json
{
  "token": "string",
  "message": "string"
}
```

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `token` | String | Sim | Token de recuperação gerado pela API. Deve ser armazenado em memória para validação posterior. |
| `message` | String | Sim | Mensagem de confirmação de envio. |

#### `UpdatePasswordRequest`

```json
{
  "email": "usuario@gmail.com",
  "new_password": "Nova@Senha123"
}
```

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `email` | String | Sim | E-mail cadastrado do usuário. |
| `new_password` | String | Sim | Nova senha escolhida pelo usuário. |

#### `UpdatePasswordResponse`

```json
{
  "message": "string"
}
```

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `message` | String | Sim | Mensagem de confirmação de alteração. |

### 4.4 Alterações na Persistência Local

| Tipo de alteração | Entidade / Tabela | Campos adicionados / removidos | Migração necessária |
|-------------------|-------------------|-------------------------------|---------------------|
| Nenhuma | — | — | Não |

A feature de recuperação de senha não requer alterações na persistência local. O token recebido da API deve ser mantido apenas em memória durante o fluxo (no ViewModel) e descartado ao sair da feature. Nenhum dado de recuperação deve ser salvo em banco local, SharedPreferences ou armazenamento seguro.

### 4.5 Tratamento de Erros

| Origem do erro | Tipo de erro | Tratamento | Mensagem ao usuário |
|----------------|-------------|------------|---------------------|
| Sem rede | Erro de conectividade | Bloquear operação; exibir mensagem | "Sem conexão com a internet. Conecte-se para continuar." |
| 422 — E-mail inválido | Erro de validação da API | Exibir mensagem amigável | "E-mail inválido. Verifique o endereço informado e tente novamente." |
| 422 — Token inválido | Erro de validação da API | Limpar campos de token; exibir mensagem | "Código inválido. Verifique o e-mail e tente novamente." |
| 422 — Senha fora dos requisitos | Erro de validação da API | Exibir mensagem com os requisitos | "A senha deve ter no mínimo 6 caracteres, incluindo letra maiúscula, letra minúscula, um número e um caractere especial." |
| 5xx Servidor | Erro de servidor | Log + breadcrumb no Crashlytics; exibir erro genérico | "Não foi possível concluir a operação. Tente novamente em alguns instantes." |
| Timeout (> 10s) | Timeout de rede | Bloquear operação; exibir mensagem | "O servidor demorou para responder. Verifique sua internet e tente novamente." |

### 4.6 Regras Técnicas

1. As telas de recuperação de senha não devem acessar diretamente API, banco local ou armazenamento seguro.
2. O token retornado por `/auth/recover-password` deve ser mantido apenas em memória no ViewModel e nunca armazenado em disco.
3. A validação do token (6 dígitos) deve ser feita localmente comparando o token informado com o token armazenado em memória.
4. Validações locais (formato de e-mail, requisitos da senha, igualdade das confirmações) devem ocorrer antes da chamada de API.
5. Enquanto uma operação estiver em andamento, o botão correspondente deve ficar indisponível.
6. O app não deve permitir múltiplas chamadas simultâneas para a API.
7. Erros de validação local devem ser exibidos próximos aos campos correspondentes.
8. Erros retornados por endpoint devem ser exibidos no BottomSheet modal padrão.
9. E-mail, senha, token e qualquer credencial não devem ser registrados em logs ou enviados em eventos de analytics.
10. Após alteração de senha com sucesso, o usuário deve ser redirecionado para a tela de login.
11. O fluxo de recuperação não deve manter sessão autenticada após a conclusão.
12. Ao retornar para a tela de login, os campos de e-mail podem permanecer preenchidos com o e-mail informado na recuperação.

---

## 5. Eventos de Analytics

| Nome do evento | Gatilho | Propriedades |
|----------------|---------|--------------|
| `recuperar_senha_visualizada` | Tela de recuperação de senha (TLA-01) é exibida | `origem: String` |
| `recuperar_senha_email_preenchido` | Usuário preenche o campo de e-mail | `email_valido: Boolean` |
| `recuperar_senha_enviar_tocado` | Usuário toca em **Enviar código** | `email_valido: Boolean` |
| `recuperar_senha_token_solicitado` | App inicia chamada à API `/auth/recover-password` | `tem_conexao: Boolean` |
| `recuperar_senha_token_enviado` | API confirma envio do token com sucesso | `duracao_ms: Int` |
| `recuperar_senha_token_falhou` | API retorna erro ao solicitar token | `codigo_erro: String`, `tipo_erro: String`, `duracao_ms: Int` |
| `recuperar_senha_validar_token_visualizada` | Tela de validação do token (TLA-02) é exibida | — |
| `recuperar_senha_token_digitos_preenchidos` | Todos os 6 dígitos do token são informados | — |
| `recuperar_senha_validar_tocado` | Usuário toca em **Validar código** | — |
| `recuperar_senha_token_valido` | Token informado é validado com sucesso | — |
| `recuperar_senha_token_invalido` | Token informado não corresponde ao esperado | — |
| `recuperar_senha_reenviar_tocado` | Usuário toca em **Reenviar código** | — |
| `recuperar_senha_alterar_senha_visualizada` | Tela de alteração de senha (TLA-03) é exibida | — |
| `recuperar_senha_alterar_tocado` | Usuário toca em **Alterar senha** | `senha_valida: Boolean`, `confirmacao_igual: Boolean` |
| `recuperar_senha_alterada` | API confirma alteração de senha com sucesso | `duracao_ms: Int` |
| `recuperar_senha_alteracao_falhou` | API retorna erro ao alterar senha | `codigo_erro: String`, `tipo_erro: String`, `duracao_ms: Int` |
| `recuperar_senha_erro_exibido` | BottomSheet de erro é exibido após falha de endpoint | `codigo_erro: String`, `tipo_erro: String`, `tela: String` |
| `recuperar_senha_bottomsheet_fechado` | Usuário fecha o BottomSheet de erro | `acao: String`, `tela: String` |

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

**Arquivo de strings / recurso:** `strings.xml`

| Chave | Padrão (PT-BR) | Observações |
|-------|----------------|-------------|
| `recuperar_senha.titulo` | "Recuperar senha" | Título da TLA-01 (Solicitar E-mail). |
| `recuperar_senha.instrucao` | "Informe seu e-mail cadastrado para receber um código de recuperação." | Texto explicativo da TLA-01. |
| `recuperar_senha.campo.email` | "E-mail" | Label do campo de e-mail. |
| `recuperar_senha.campo.email.placeholder` | "seu@email.com" | Placeholder do campo de e-mail. |
| `recuperar_senha.botao.enviar` | "Enviar código" | CTA da TLA-01. |
| `recuperar_senha.botao.enviando` | "Enviando..." | Texto exibido durante carregamento na TLA-01. |
| `recuperar_senha.validacao.email_obrigatorio` | "Informe o e-mail cadastrado." | Exibido quando e-mail vazio. |
| `recuperar_senha.validacao.email_invalido` | "Informe um e-mail válido." | Exibido quando formato inválido. |
| `recuperar_senha.validar_token.titulo` | "Validar código" | Título da TLA-02. |
| `recuperar_senha.validar_token.instrucao` | "Informe o código de 6 dígitos enviado para {email}." | `{email}` é substituído pelo e-mail informado. |
| `recuperar_senha.validar_token.digito_label` | "Dígito {n}" | Rótulo de cada campo, `{n}` de 1 a 6. |
| `recuperar_senha.validar_token.botao.validar` | "Validar código" | CTA da TLA-02. |
| `recuperar_senha.validar_token.botao.validando` | "Validando..." | Texto durante carregamento na TLA-02. |
| `recuperar_senha.validar_token.link.reenviar` | "Reenviar código" | Link para solicitar novo token. |
| `recuperar_senha.validar_token.campos_incompletos` | "Preencha todos os 6 dígitos do código." | Validação de campos incompletos. |
| `recuperar_senha.validar_token.digito_nao_numerico` | "Informe apenas números." | Validação de caractere não numérico. |
| `recuperar_senha.validar_token.invalido` | "Código inválido. Verifique o e-mail e tente novamente." | Token não corresponde. |
| `recuperar_senha.validar_token.expirado` | "Código expirado. Solicite um novo código." | Token expirado. |
| `recuperar_senha.validar_token.reenvio_sucesso` | "Um novo código foi enviado para o seu e-mail." | Reenvio bem-sucedido. |
| `recuperar_senha.alterar_senha.titulo` | "Nova senha" | Título da TLA-03. |
| `recuperar_senha.alterar_senha.instrucao` | "Crie uma nova senha para sua conta." | Texto explicativo da TLA-03. |
| `recuperar_senha.alterar_senha.requisitos` | "A senha deve ter no mínimo 6 caracteres, incluindo letra maiúscula, letra minúscula, um número e um caractere especial." | Requisitos exibidos na TLA-03. |
| `recuperar_senha.alterar_senha.campo.nova_senha` | "Nova senha" | Label do campo de nova senha. |
| `recuperar_senha.alterar_senha.campo.confirmar_senha` | "Confirmar senha" | Label do campo de confirmação. |
| `recuperar_senha.alterar_senha.senha.mostrar` | "Mostrar senha" | Acessibilidade do ícone de mostrar senha. |
| `recuperar_senha.alterar_senha.senha.ocultar` | "Ocultar senha" | Acessibilidade do ícone de ocultar senha. |
| `recuperar_senha.alterar_senha.botao.alterar` | "Alterar senha" | CTA da TLA-03. |
| `recuperar_senha.alterar_senha.botao.alterando` | "Alterando..." | Texto durante carregamento na TLA-03. |
| `recuperar_senha.alterar_senha.validacao.nova_senha_obrigatoria` | "Informe a nova senha." | Nova senha vazia. |
| `recuperar_senha.alterar_senha.validacao.confirmacao_obrigatoria` | "Confirme a nova senha." | Confirmação vazia. |
| `recuperar_senha.alterar_senha.validacao.confirmacao_diferente` | "As senhas não conferem. Verifique os campos e tente novamente." | Confirmação diferente da nova senha. |
| `recuperar_senha.alterar_senha.sucesso` | "Senha alterada com sucesso! Você será redirecionado para o login." | Mensagem de sucesso. |
| `recuperar_senha.erro.envio_token` | "Não foi possível enviar o código de recuperação. Verifique o e-mail e tente novamente." | Falha no envio do token. |
| `recuperar_senha.erro.token_invalido` | "Código inválido. Verifique o e-mail e tente novamente." | Token inválido retornado pela API. |
| `recuperar_senha.erro.sem_conexao` | "Sem conexão com a internet. Conecte-se para continuar." | Falha de conexão. |
| `recuperar_senha.erro.timeout` | "O servidor demorou para responder. Verifique sua internet e tente novamente." | Timeout de rede. |
| `recuperar_senha.erro.generico` | "Não foi possível concluir a operação. Tente novamente em alguns instantes." | Erro inesperado. |
| `recuperar_senha.erro.titulo` | "Não foi possível recuperar a senha" | Título do BottomSheet de erro. |
| `recuperar_senha.bottomsheet.botao.entendi` | "Entendi" | Fechar BottomSheet. |
| `recuperar_senha.bottomsheet.botao.tentar_novamente` | "Tentar novamente" | Nova tentativa no BottomSheet. |
| `recuperar_senha.acessibilidade.tela_solicitar_email` | "Recuperar senha - informar e-mail" | Nome acessível da TLA-01. |
| `recuperar_senha.acessibilidade.tela_validar_token` | "Validar código de recuperação" | Nome acessível da TLA-02. |
| `recuperar_senha.acessibilidade.tela_alterar_senha` | "Alterar senha" | Nome acessível da TLA-03. |
| `recuperar_senha.acessibilidade.campo_email` | "Campo de e-mail" | Rótulo acessível do campo de e-mail. |
| `recuperar_senha.acessibilidade.botao_enviar` | "Enviar código de recuperação" | Rótulo acessível do botão Enviar. |
| `recuperar_senha.acessibilidade.botao_validar` | "Validar código de recuperação" | Rótulo acessível do botão Validar. |
| `recuperar_senha.acessibilidade.botao_alterar` | "Alterar senha" | Rótulo acessível do botão Alterar. |
| `recuperar_senha.acessibilidade.link_reenviar` | "Reenviar código de recuperação" | Rótulo acessível do link Reenviar. |
| `recuperar_senha.acessibilidade.voltar_para_login` | "Voltar para o login" | Rótulo acessível do botão Voltar na TLA-01. |
| `recuperar_senha.acessibilidade.voltar_para_email` | "Voltar para informar e-mail" | Rótulo acessível do botão Voltar na TLA-02. |
| `recuperar_senha.acessibilidade.voltar_para_token` | "Voltar para validar código" | Rótulo acessível do botão Voltar na TLA-03. |
| `recuperar_senha.acessibilidade.erro` | "Mensagem de erro" | Rótulo acessível do BottomSheet de erro. |

**Layout RTL:** Não obrigatório  
**Formatação de data/número:** Usa locale do sistema

---

## 9. Definição de Pronto (Definition of Done)

- [ ] Todos os critérios de aceite da US-04 (Spec de Produto §3) verificados.
- [ ] Cobertura de testes unitários ≥ 80% nos casos de uso, validadores e ViewModels da feature.
- [ ] Testes de integração dos endpoints `/auth/recover-password` e `/auth/update-password` passando no CI.
- [ ] Teste de UI do caminho feliz completo (TLA-01 → TLA-02 → TLA-03 → Login) verde.
- [ ] Testes de fluxos alternativos (token inválido, senha fora dos requisitos, confirmação divergente, sem conexão, timeout) aprovados.
- [ ] Sem novos warnings de lint / análise estática no módulo `features/auth/recover-password`.
- [ ] Auditoria de acessibilidade aprovada (TalkBack) nas 3 telas.
- [ ] Eventos de analytics (seção 5) disparando e verificados no dashboard de debug.
- [ ] Chaves de localização (seção 8) adicionadas ao `strings.xml`.
- [ ] Feature flag implementada e configurada como `desativada` por padrão.
- [ ] Revisão de design aprovada para as 3 telas.
- [ ] Code review do tech lead aprovado.
- [ ] Aceite do product owner confirmado.
- [ ] Entrada nas notas de release redigida.
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
| 0.1.0 | 2026-06-09 | Jose Julio | Rascunho inicial |
