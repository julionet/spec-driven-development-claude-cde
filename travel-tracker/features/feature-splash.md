# Especificação de Feature — Splash

> **Tipo de documento:** Spec de Feature  
> **Status:** `rascunho` 
> **Versão:** 0.1.0  
> **Última atualização:** 2026-06-08  
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

A feature **Splash** é responsável por iniciar o aplicativo, apresentar uma tela inicial de carregamento e preparar o estado necessário para direcionar o usuário corretamente. Durante essa etapa, o app verifica se existe conexão com a internet, valida se há sessão salva no dispositivo, identifica se o usuário já está autenticado, carrega as viagens do usuário e as viagens acompanhadas quando possível, verifica permissões necessárias e direciona o usuário para a tela principal ou para a tela de login.

### 1.2 Por Que Existe

Esta feature existe para garantir que o aplicativo seja iniciado de forma organizada, segura e consistente. Como o app depende de autenticação, dados locais temporários, conexão com a API, permissões de localização e carregamento inicial de viagens, a tela de Splash centraliza essas verificações antes de liberar o uso das funcionalidades principais.

**Necessidade do usuário:**  
US-03 — Como usuário, quero que o aplicativo não solicite login quando minhas informações de autenticação já estiverem salvas em cache para que eu possa acessar o aplicativo mais rapidamente.

**Objetivo de negócio:**  
Permitir que o aplicativo centralize o registro de viagens, o compartilhamento de localização e o acompanhamento por usuários autorizados, garantindo que o usuário autenticado acesse rapidamente suas viagens e viagens acompanhadas com segurança.

### 1.3 Escopo

**Dentro do escopo:**
- Exibir a tela de Splash ao abrir o aplicativo.
- Verificar se há conexão com a internet.
- Verificar se existe sessão salva localmente.
- Validar se a sessão salva ainda é válida.
- Verificar a existência de `accessToken` e `refreshToken` salvos em armazenamento seguro.
- Direcionar o usuário para a tela de login quando não houver sessão válida.
- Direcionar o usuário para a tela principal quando houver sessão válida.
- Carregar os dados do usuário autenticado quando houver sessão válida.
- Consultar na API as viagens cadastradas pelo usuário logado quando houver conexão.
- Salvar localmente as viagens do usuário após carregamento com sucesso.
- Consultar na API as viagens acompanhadas pelo usuário logado quando houver conexão.
- Salvar localmente as viagens acompanhadas após carregamento com sucesso.
- Exibir dados locais quando houver sessão válida, mas não houver conexão com a internet.
- Verificar se existe uma viagem ativa salva localmente.
- Manter a viagem ativa identificável após reabertura do aplicativo.
- Verificar se existem coordenadas pendentes de envio.
- Preparar o processo de sincronização de coordenadas pendentes quando houver conexão.
- Verificar permissões necessárias para o funcionamento do app.
- Solicitar permissões necessárias quando forem obrigatórias para continuar algum fluxo.
- Identificar se a permissão de localização foi concedida.
- Identificar se a localização do dispositivo está ativada.
- Tratar ausência de permissão de localização quando houver viagem ativa.
- Exibir mensagens amigáveis em caso de falha no carregamento inicial.
- Evitar que o usuário veja dados locais de outro usuário.
- Garantir que os dados locais carregados pertençam ao usuário autenticado atual.

**Fora do escopo (nesta iteração):**
- Realizar cadastro de novo usuário.
- Realizar login manual com e-mail e senha.
- Recuperar senha.
- Criar nova viagem.
- Alterar dados de viagem.
- Ativar viagem manualmente a partir da Splash.
- Inativar, finalizar ou cancelar viagem a partir da Splash.
- Enviar convite de acompanhamento.
- Aceitar ou rejeitar convite.
- Exibir mapa da viagem.
- Solicitar permissões que não sejam necessárias para os fluxos atuais.
- Executar atualização visual completa das listas de viagens na própria Splash.
- Exibir detalhes de viagem durante a Splash.
- Exibir onboarding completo nesta feature.
- Realizar logout automático sem confirmação, exceto quando a sessão salva estiver inválida ou inutilizável.
- Garantir funcionamento completo offline para operações que dependem da API.
- Resolver conflitos complexos de sincronização entre dados locais e remotos.

## 2. Comportamento Visível ao Usuário

### 2.1 Pontos de Entrada

<!-- De onde / como o usuário chega a esta feature. -->

| Ponto de entrada | Gatilho | Pré-condição |
|------------------|---------|--------------|
| Inicialização do aplicativo | Usuário abre o app pelo ícone do Android | Aplicativo instalado no dispositivo. |
| Retorno do app em memória | Usuário retorna para o app após ele estar em segundo plano | Aplicativo ainda está em execução ou será recriado pelo Android. |
| Deep link futuro | Usuário abre o app por um link externo | Fora do escopo desta iteração, mas a Splash deve continuar sendo o ponto inicial de validação. |
| Notificação futura | Usuário abre o app por uma notificação | Fora do escopo desta iteração, mas a Splash deve continuar validando sessão antes de direcionar o usuário. |

---

### 2.2 Fluxo do Caminho Feliz

<!-- Passo a passo na perspectiva do usuário. Sem código, sem nomes de componentes. -->

**Pré-condição:**  
O usuário já realizou login anteriormente, possui sessão válida salva no dispositivo e existe conexão com a internet.

1. O usuário abre o aplicativo.
2. O app apresenta a tela de Splash com a identidade visual do produto.
3. O app verifica se existe conexão com a internet.
4. O app verifica se existe uma sessão salva no dispositivo.
5. O app valida se a sessão salva ainda pode ser utilizada.
6. O app identifica o usuário autenticado.
7. O app carrega as viagens cadastradas pelo usuário.
8. O app carrega as viagens acompanhadas pelo usuário.
9. O app salva localmente as viagens carregadas com sucesso.
10. O app verifica se existe viagem ativa salva localmente.
11. O app verifica se existem coordenadas pendentes de envio.
12. O app verifica as permissões necessárias para os fluxos do aplicativo.
13. Caso não exista impedimento, o app direciona o usuário para a tela principal.
14. O usuário visualiza a tela principal com as abas **Minhas viagens** e **Viagens acompanhadas**.

**Pós-condição:**  
O usuário está autenticado, os dados iniciais foram carregados ou atualizados, as informações locais pertencem ao usuário logado e o app está pronto para uso na tela principal.

---

### 2.3 Fluxos Alternativos

#### 2.3.1 Usuário sem sessão salva

**Gatilho:**  
O app não encontra tokens ou dados de sessão salvos no dispositivo.

1. O usuário abre o aplicativo.
2. O app apresenta a tela de Splash.
3. O app verifica que não existe sessão salva.
4. O app direciona o usuário para a tela de login.
5. O usuário poderá informar e-mail e senha para acessar o aplicativo.

---

#### 2.3.2 Sessão salva inválida ou expirada

**Gatilho:**  
O app encontra uma sessão salva, mas ela está inválida, expirada ou não pode ser utilizada.

1. O usuário abre o aplicativo.
2. O app apresenta a tela de Splash.
3. O app identifica uma sessão salva no dispositivo.
4. O app verifica que a sessão não é válida.
5. O app remove os dados de sessão inválidos.
6. O app direciona o usuário para a tela de login.
7. O usuário poderá realizar login novamente.

---

#### 2.3.3 Usuário autenticado sem conexão com a internet

**Gatilho:**  
O app encontra sessão válida, mas o dispositivo está sem conexão com a internet.

1. O usuário abre o aplicativo.
2. O app apresenta a tela de Splash.
3. O app verifica que não existe conexão com a internet.
4. O app verifica se existe sessão válida salva.
5. Se a sessão for válida, o app carrega os dados locais disponíveis.
6. O app informa, quando necessário, que os dados podem estar desatualizados.
7. O app direciona o usuário para a tela principal.
8. O usuário visualiza as informações salvas localmente, quando disponíveis.

---

#### 2.3.4 Usuário sem sessão e sem conexão com a internet

**Gatilho:**  
O app não encontra sessão válida e o dispositivo está sem conexão.

1. O usuário abre o aplicativo.
2. O app apresenta a tela de Splash.
3. O app verifica que não existe conexão com a internet.
4. O app verifica que não existe sessão válida salva.
5. O app direciona o usuário para a tela de login.
6. O app informa que é necessário conexão com a internet para entrar na conta.

---

#### 2.3.5 Falha ao carregar minhas viagens

**Gatilho:**  
O usuário possui sessão válida, mas ocorre falha ao buscar as viagens cadastradas pela API.

1. O usuário abre o aplicativo.
2. O app apresenta a tela de Splash.
3. O app valida a sessão do usuário.
4. O app tenta carregar as viagens cadastradas pelo usuário.
5. O app recebe uma falha ao carregar as viagens.
6. Se houver viagens salvas localmente, o app mantém esses dados disponíveis.
7. O app direciona o usuário para a tela principal.
8. O app informa que não foi possível atualizar as viagens naquele momento.

---

#### 2.3.6 Falha ao carregar viagens acompanhadas

**Gatilho:**  
O usuário possui sessão válida, mas ocorre falha ao buscar viagens acompanhadas pela API.

1. O usuário abre o aplicativo.
2. O app apresenta a tela de Splash.
3. O app valida a sessão do usuário.
4. O app tenta carregar as viagens acompanhadas pelo usuário.
5. O app recebe uma falha ao carregar as viagens acompanhadas.
6. Se houver viagens acompanhadas salvas localmente, o app mantém esses dados disponíveis.
7. O app direciona o usuário para a tela principal.
8. O app informa que não foi possível atualizar as viagens acompanhadas naquele momento.

---

#### 2.3.7 Permissão de localização ainda não concedida

**Gatilho:**  
O app identifica que a permissão de localização necessária ainda não foi concedida.

1. O usuário abre o aplicativo.
2. O app apresenta a tela de Splash.
3. O app verifica as permissões necessárias.
4. Se não houver viagem ativa, o app não deve bloquear a entrada do usuário.
5. O app direciona o usuário para a tela principal.
6. A permissão de localização será solicitada quando o usuário tentar ativar uma viagem.

---

#### 2.3.8 Permissão de localização ausente com viagem ativa

**Gatilho:**  
O app identifica uma viagem ativa salva localmente, mas a permissão de localização não está concedida.

1. O usuário abre o aplicativo.
2. O app apresenta a tela de Splash.
3. O app identifica que existe uma viagem ativa.
4. O app verifica que a permissão de localização não está concedida.
5. O app solicita a permissão de localização ao usuário.
6. Se o usuário conceder a permissão, o app poderá retomar o registro das coordenadas.
7. Se o usuário negar a permissão, o app direciona para a tela principal e informa que o registro da viagem não poderá continuar sem a permissão.

---

#### 2.3.9 Localização do dispositivo desativada com viagem ativa

**Gatilho:**  
O app identifica uma viagem ativa, mas a localização do dispositivo está desativada.

1. O usuário abre o aplicativo.
2. O app apresenta a tela de Splash.
3. O app identifica que existe uma viagem ativa.
4. O app verifica que a localização do dispositivo está desativada.
5. O app informa que é necessário ativar a localização para continuar registrando os pontos da viagem.
6. O app direciona o usuário para a tela principal.
7. O usuário poderá ativar a localização do dispositivo e continuar o registro da viagem.

---

#### 2.3.10 Coordenadas pendentes de envio

**Gatilho:**  
O app identifica coordenadas salvas localmente que ainda não foram enviadas para a API.

1. O usuário abre o aplicativo.
2. O app apresenta a tela de Splash.
3. O app verifica se existem coordenadas pendentes.
4. Se houver conexão com a internet, o app prepara a sincronização das coordenadas pendentes.
5. Se não houver conexão, as coordenadas permanecem salvas localmente.
6. O app direciona o usuário para a tela principal.
7. O usuário poderá ser informado de que existem coordenadas aguardando envio, quando isso for relevante.

---

#### 2.3.11 Falha geral no carregamento inicial

**Gatilho:**  
Ocorre uma falha inesperada durante o carregamento inicial do aplicativo.

1. O usuário abre o aplicativo.
2. O app apresenta a tela de Splash.
3. O app tenta realizar as verificações iniciais.
4. O app encontra uma falha inesperada.
5. O app apresenta uma mensagem amigável informando que não foi possível carregar o aplicativo corretamente.
6. O usuário pode tentar novamente.
7. Se possível, o app direciona o usuário para a tela segura mais adequada, como login ou tela principal com dados locais.

---

### 2.4 Casos Extremos e Condições de Contorno

| Cenário | Comportamento esperado |
|---------|------------------------|
| Sem rede ao entrar na feature com sessão válida | Exibir dados locais disponíveis e informar que alguns dados podem estar desatualizados. |
| Sem rede ao entrar na feature sem sessão válida | Direcionar para login e informar que é necessário conexão para entrar. |
| Sessão válida salva | Direcionar para tela principal após carregamento inicial. |
| Sessão ausente | Direcionar para tela de login. |
| Sessão expirada | Remover sessão inválida e direcionar para login. |
| Access token ausente | Considerar sessão inválida e direcionar para login. |
| Refresh token ausente | Considerar sessão inválida quando não for possível validar ou renovar a sessão. |
| Tokens corrompidos ou ilegíveis | Limpar sessão inválida e direcionar para login. |
| Minhas viagens vazias | Exibir tela principal com estado vazio em **Minhas viagens**. |
| Viagens acompanhadas vazias | Exibir tela principal com estado vazio em **Viagens acompanhadas**. |
| Falha ao carregar minhas viagens | Usar dados locais, se disponíveis; caso contrário, exibir estado vazio ou erro na tela principal. |
| Falha ao carregar viagens acompanhadas | Usar dados locais, se disponíveis; caso contrário, exibir estado vazio ou erro na tela principal. |
| Dados locais pertencem a outro usuário | Não exibir os dados; limpar dados incompatíveis e carregar dados do usuário atual. |
| Existe viagem ativa salva localmente | Manter a viagem ativa identificável e preparar o app para continuar o registro, se houver permissão. |
| Existe viagem ativa, mas permissão de localização foi negada | Informar que não será possível continuar registrando coordenadas sem permissão. |
| Existe viagem ativa, mas localização do dispositivo está desligada | Informar que a localização do dispositivo precisa ser ativada. |
| Existem coordenadas pendentes com internet | Preparar sincronização das coordenadas pendentes. |
| Existem coordenadas pendentes sem internet | Manter coordenadas salvas localmente para envio posterior. |
| Falha ao sincronizar coordenadas pendentes | Manter coordenadas salvas localmente para nova tentativa. |
| API lenta (> 1s) | Manter a tela de Splash com estado de carregamento. |
| API lenta (> 10s) | Se houver dados locais e sessão válida, direcionar para tela principal e informar possível desatualização. |
| App fechado durante Splash | Ao reabrir, executar novamente as verificações iniciais. |
| Usuário revogou permissões fora do app | Detectar no carregamento e solicitar novamente apenas quando necessário. |
| Primeira instalação do app | Não haverá sessão salva; direcionar para login. |
| Logout anterior realizado | Não deve existir sessão nem dados locais do usuário anterior; direcionar para login. |

---

## 3. Especificação de UI

### 3.1 Telas / Views Desta Feature

| ID da Tela | Nome | Tipo | Descrição |
|------------|------|------|-----------|
| TLA-01 | Splash | Tela inicial / raiz temporária | Tela exibida ao iniciar o aplicativo enquanto o app verifica conexão, sessão salva, permissões, viagem ativa, coordenadas pendentes e realiza o carregamento inicial dos dados do usuário. |
| TLA-02 | Splash com Erro | Estado da TLA-01 | Estado exibido quando ocorre uma falha durante o carregamento inicial que impede a navegação automática para Login ou Tela Principal. |

---

### 3.2 Detalhe da Tela — TLA-01: Splash

**Referência de design:** A definir  
**Nome acessível:** "Carregando aplicativo"

#### Layout

A tela de Splash deve ser simples, limpa e focada na identidade visual do aplicativo.  
Ela deve apresentar o **logo centralizado na tela** e, na parte inferior, um indicador de carregamento com o texto **"Carregando..."** logo abaixo.

```text
┌────────────────────────────────────┐
│                                    │
│                                    │
│                                    │
│                                    │
│            Logo do App             │
│                                    │
│                                    │
│                                    │
│                                    │
│                                    │
│                                    │
│                                    │
│         Indicador de loading       │
│             "Carregando..."        │
│                                    │
└────────────────────────────────────┘
```

#### Descrição das regiões

| Região | Descrição |
|--------|-----------|
| Área central | Deve exibir o logo do aplicativo centralizado horizontalmente e verticalmente, reforçando a identidade visual do produto. |
| Área inferior | Deve exibir um indicador de carregamento e o texto **"Carregando..."** logo abaixo. |
| Fundo | Deve seguir a paleta visual do aplicativo, mantendo bom contraste com o logo e o texto. |
| Navegação | A tela não deve exibir barra de navegação, abas, menu ou botões. |
| Conteúdo textual | Deve ser mínimo, exibindo apenas o texto de carregamento. |

---

#### Estados

| Estado | Gatilho | O que muda na UI |
|--------|---------|------------------|
| Carregando | App é aberto | Logo é exibido no centro da tela, loading é exibido na parte inferior e texto **"Carregando..."** aparece logo abaixo. |
| Verificando sessão | App verifica se existe sessão salva | A UI permanece igual ao estado carregando. |
| Carregando dados iniciais | App carrega minhas viagens e viagens acompanhadas | A UI permanece igual ao estado carregando. |
| Verificando permissões | App verifica permissões necessárias | A UI permanece igual ao estado carregando. |
| Sucesso com sessão válida | Sessão válida e carregamento concluído | App navega automaticamente para a tela principal. |
| Sucesso sem sessão válida | Não existe sessão válida salva | App navega automaticamente para a tela de login. |
| Sem internet com sessão válida | App está sem conexão, mas possui sessão válida e dados locais | App navega para a tela principal usando dados locais disponíveis. |
| Sem internet sem sessão válida | App está sem conexão e não possui sessão válida | App navega para login e informa que é necessário conexão para entrar. |
| Erro no carregamento inicial | Ocorre falha que impede conclusão do fluxo | App exibe estado de erro ou BottomSheet modal padrão, conforme a origem do erro. |

---

#### Elementos Interativos

A tela de Splash, em seu estado normal, não possui elementos interativos.

| Elemento | Tipo | Ação | Rótulo de acessibilidade |
|----------|------|------|--------------------------|
| Logo do aplicativo | Imagem | Nenhuma ação. Apenas identificação visual. | "Logo do aplicativo" |
| Indicador de carregamento | Loading | Indica que o aplicativo está carregando. | "Carregando" |
| Texto de carregamento | Texto | Informa que o aplicativo está em carregamento. | "Carregando aplicativo" |

---

### 3.3 Detalhe da Tela — TLA-02: Splash com Erro

**Referência de design:** A definir  
**Nome acessível:** "Erro ao carregar aplicativo"

#### Comportamento

Caso ocorra um erro durante o carregamento inicial, a tela de Splash deve apresentar uma mensagem clara ao usuário.  
Quando o erro for resultado de uma chamada de endpoint, a mensagem deve ser exibida no **BottomSheet modal padrão** do aplicativo.

Erros locais simples, como ausência de conexão sem sessão válida, podem direcionar o usuário para a tela de login com mensagem apropriada.

#### Layout com BottomSheet de erro

```text
┌────────────────────────────────────┐
│                                    │
│            Logo do App             │
│                                    │
│                                    │
│         Indicador de loading       │
│             "Carregando..."        │
│                                    │
├────────────────────────────────────┤
│ BottomSheet Modal                  │
│ ┌────────────────────────────────┐ │
│ │ Título: "Não foi possível      │ │
│ │ carregar o aplicativo"         │ │
│ │                                │ │
│ │ Mensagem amigável do erro      │ │
│ │                                │ │
│ │ Botão: "Tentar novamente"     │ │
│ │ Botão: "Ir para login"        │ │
│ └────────────────────────────────┘ │
└────────────────────────────────────┘
```

#### Estados

| Estado | Gatilho | O que muda na UI |
|--------|---------|------------------|
| Erro de endpoint | Falha ao carregar dados iniciais pela API | BottomSheet modal padrão é exibido com mensagem amigável. |
| Erro de conexão | App não consegue acessar a API | BottomSheet ou redirecionamento para login, conforme existência de sessão válida. |
| Sessão inválida | Tokens ausentes, expirados ou inválidos | App limpa a sessão inválida e direciona para login. |
| Tentar novamente | Usuário seleciona **Tentar novamente** | App executa novamente o carregamento inicial. |
| Ir para login | Usuário seleciona **Ir para login** | App navega para a tela de login. |

#### Elementos Interativos

| Elemento | Tipo | Ação | Rótulo de acessibilidade |
|----------|------|------|--------------------------|
| BottomSheet de erro | Modal | Exibe erro ocorrido durante o carregamento inicial. | "Mensagem de erro ao carregar aplicativo" |
| Tentar novamente | Botão primário | Executa novamente as verificações iniciais. | "Tentar carregar novamente" |
| Ir para login | Botão secundário | Direciona o usuário para a tela de login. | "Ir para tela de login" |
| Fechar | Ícone/Botão opcional | Fecha o BottomSheet, quando aplicável. | "Fechar mensagem de erro" |

---

### 3.4 Catálogo de Componentes

<!-- Referencie componentes do Design System; especifique variante + configuração. -->

| Componente | Variante | Configuração |
|------------|----------|--------------|
| `LogoApp` | Splash | Exibir logo centralizado na tela, com tamanho adequado para diferentes dispositivos Android. |
| `TelaBase` | Splash | Tela sem barra de navegação, sem abas e sem botões de ação. |
| `IndicadorCarregamento` | Circular / padrão Android | Exibir na parte inferior da tela, acima do texto de carregamento. |
| `TextoCarregamento` | Texto auxiliar | Rótulo: "Carregando..."; posicionado logo abaixo do loading. |
| `BottomSheetErroPadrao` | Modal | Usado para erros vindos de endpoints durante o carregamento inicial. |
| `BotaoPrimario` | Padrão | Rótulo: "Tentar novamente", quando existir erro recuperável. |
| `BotaoSecundario` | Padrão | Rótulo: "Ir para login", quando a sessão estiver inválida ou não for possível continuar. |

---

### 3.5 Regras de UI

1. A tela de Splash deve ser exibida imediatamente ao abrir o aplicativo.
2. A tela deve exibir o logo do aplicativo centralizado.
3. A tela deve exibir um indicador de carregamento na parte inferior.
4. O texto **"Carregando..."** deve ser exibido logo abaixo do indicador de carregamento.
5. A tela de Splash não deve possuir ações manuais no fluxo normal.
6. A tela de Splash não deve exibir menus, abas, barra de navegação ou formulário.
7. A navegação para Login ou Tela Principal deve acontecer automaticamente após as verificações iniciais.
8. Erros retornados por endpoint devem ser exibidos usando o BottomSheet modal padrão.
9. Se houver sessão válida e dados locais disponíveis, o app pode seguir para a tela principal mesmo sem internet.
10. Se não houver sessão válida, o app deve seguir para a tela de login.
11. Caso exista viagem ativa, a Splash pode verificar permissões de localização antes de permitir retomada do registro.
12. A Splash não deve solicitar permissão de localização sem contexto, exceto quando houver viagem ativa em andamento.
13. O tempo de exibição da Splash deve ser apenas o necessário para concluir as verificações iniciais.
14. A tela deve ser compatível com leitores de tela.
15. O texto e o loading devem manter contraste adequado em tema claro e escuro.

## 4. Design Técnico

### 4.1 Posicionamento no Módulo

<!-- Em qual módulo existente esta feature se encaixa, ou se um novo módulo é necessário. -->

**Módulo:** `features/splash`  
**Novo módulo necessário:** Sim

A feature **Splash** deve ser um módulo próprio, pois concentra o fluxo inicial do aplicativo. Ela será responsável por validar o estado inicial do app, verificar sessão salva, verificar conectividade, carregar dados iniciais do usuário, verificar permissões relevantes e decidir a navegação inicial para **Login** ou **Tela Principal**.

Essa feature deve depender de componentes compartilhados do app, como:

- módulo de autenticação;
- módulo de sessão;
- módulo de conectividade;
- módulo de permissões;
- módulo de viagens;
- módulo de viagens acompanhadas;
- módulo de coordenadas;
- módulo de persistência local;
- módulo de navegação;
- componente padrão de BottomSheet para erros vindos de endpoints.

---

### 4.2 Decomposição de Componentes / Classes

| Componente | Tipo | Responsabilidade |
|------------|------|-----------------|
| `SplashScreen` | View / Tela | Renderiza a tela de Splash com logo centralizado, loading inferior e texto **"Carregando..."**. Observa o estado do `SplashViewModel` e executa a navegação conforme evento emitido. |
| `SplashViewModel` | ViewModel / StateHolder | Controla o estado inicial da Splash, executa verificações iniciais, chama casos de uso e emite eventos de navegação para Login ou Tela Principal. |
| `SplashUiState` | Estado de UI | Representa o estado visual da Splash, como carregando, erro, sem conexão, verificando sessão ou carregando dados. |
| `SplashUiEvent` | Evento de UI | Representa eventos únicos, como navegar para Login, navegar para Home, solicitar permissão, exibir BottomSheet de erro ou tentar novamente. |
| `InitializeAppUseCase` | Caso de Uso | Orquestra o fluxo inicial do aplicativo: conectividade, sessão, dados locais, dados remotos, viagem ativa, coordenadas pendentes e permissões. |
| `CheckConnectivityUseCase` | Caso de Uso | Verifica se o dispositivo possui conexão com a internet. |
| `CheckSavedSessionUseCase` | Caso de Uso | Verifica se existe sessão salva em armazenamento seguro. |
| `ValidateSessionUseCase` | Caso de Uso | Valida se a sessão salva ainda pode ser utilizada. |
| `RefreshTokenUseCase` | Caso de Uso | Tenta renovar o access token usando refresh token, quando aplicável. |
| `LoadCurrentUserUseCase` | Caso de Uso | Carrega os dados mínimos do usuário autenticado. |
| `LoadMyTripsUseCase` | Caso de Uso | Busca as viagens cadastradas pelo usuário na API e salva localmente após sucesso. |
| `LoadFollowedTripsUseCase` | Caso de Uso | Busca as viagens acompanhadas pelo usuário na API e salva localmente após sucesso. |
| `GetLocalMyTripsUseCase` | Caso de Uso | Carrega minhas viagens salvas localmente quando não houver conexão ou quando a API falhar. |
| `GetLocalFollowedTripsUseCase` | Caso de Uso | Carrega viagens acompanhadas salvas localmente quando não houver conexão ou quando a API falhar. |
| `CheckActiveTripUseCase` | Caso de Uso | Verifica se existe uma viagem ativa salva localmente para o usuário logado. |
| `CheckPendingCoordinatesUseCase` | Caso de Uso | Verifica se existem coordenadas pendentes de envio na base local. |
| `PrepareCoordinateSyncUseCase` | Caso de Uso | Prepara a sincronização das coordenadas pendentes quando houver conexão com a internet. |
| `CheckLocationPermissionUseCase` | Caso de Uso | Verifica se a permissão de localização necessária está concedida. |
| `CheckLocationEnabledUseCase` | Caso de Uso | Verifica se a localização do dispositivo está ativada. |
| `RequestLocationPermissionHandler` | Handler / UI Contract | Dispara a solicitação de permissão quando houver viagem ativa e a permissão for necessária. |
| `SessionRepository` | Repositório | Abstrai leitura, validação, renovação e limpeza da sessão salva. |
| `AuthRemoteDataSource` | Fonte de Dados Remota | Chama endpoint de renovação de token, quando necessário. |
| `SessionLocalDataSource` | Fonte de Dados Local Segura | Lê e grava `accessToken`, `refreshToken` e dados mínimos de sessão usando armazenamento seguro. |
| `TripRepository` | Repositório | Abstrai carregamento remoto e local das viagens do usuário. |
| `TripRemoteDataSource` | Fonte de Dados Remota | Chama endpoints relacionados às viagens do usuário. |
| `TripLocalDataSource` | Fonte de Dados Local | Lê e grava viagens do usuário na base local temporária. |
| `FollowedTripRepository` | Repositório | Abstrai carregamento remoto e local das viagens acompanhadas. |
| `FollowedTripRemoteDataSource` | Fonte de Dados Remota | Chama endpoints relacionados às viagens acompanhadas. |
| `FollowedTripLocalDataSource` | Fonte de Dados Local | Lê e grava viagens acompanhadas na base local temporária. |
| `CoordinateRepository` | Repositório | Abstrai consulta de coordenadas pendentes e preparação de sincronização. |
| `CoordinateLocalDataSource` | Fonte de Dados Local | Consulta coordenadas pendentes salvas localmente. |
| `PermissionRepository` | Repositório / Service | Centraliza verificações de permissões necessárias ao app. |
| `ConnectivityObserver` | Serviço / Observer | Informa se existe conexão com a internet. |
| `EndpointErrorMapper` | Mapper de Erro | Converte erros de endpoint em mensagens amigáveis para o BottomSheet modal padrão. |
| `StandardErrorBottomSheet` | Componente de UI | Exibe erros recebidos de endpoints em BottomSheet modal padrão. |
| `SplashNavigator` | Router / Navigator | Gerencia a navegação da Splash para Login ou Tela Principal. |

---

### 4.3 Endpoints de API Utilizados

| Endpoint | Método | Contrato | Observações |
|----------|--------|----------|-------------|
| `/auth/refresh` | POST | Ver Spec Técnica §6.1 | Utilizado quando houver refresh token salvo e o access token estiver expirado ou próximo da expiração. |
| `/trips/all-user-trips/complete` | GET | Ver Spec Técnica §6.1 | Utilizado para obter minhas viagens e viagens acompanhadas |

---

### 4.4 Tratamento de Erros

| Origem do erro | Tipo de erro | Tratamento | Mensagem ao usuário |
|----------------|-------------|------------|---------------------|
| Sem rede com sessão válida | Conectividade | Usar dados locais disponíveis e seguir para a tela principal. Indicar que os dados podem estar desatualizados quando necessário. | "Sem conexão com a internet. Alguns dados podem estar desatualizados." |
| Sem rede sem sessão válida | Conectividade | Direcionar para Login e bloquear autenticação até existir conexão. | "Para entrar na sua conta, conecte-se à internet." |
| Access token ausente | Sessão inválida | Limpar sessão inválida e direcionar para Login. | "Sua sessão expirou. Entre novamente para continuar." |
| Refresh token ausente | Sessão inválida | Limpar sessão inválida e direcionar para Login. | "Sua sessão expirou. Entre novamente para continuar." |
| Token expirado | Autenticação | Tentar renovar sessão com refresh token. Se falhar, limpar sessão e direcionar para Login. | "Sua sessão expirou. Entre novamente para continuar." |
| 401 Não autorizado | Autenticação | Tentar refresh token. Se a renovação falhar, limpar sessão e redirecionar para Login. | "Sua sessão expirou. Entre novamente para continuar." |
| 403 Proibido | Autorização | Encerrar acesso ao recurso, manter usuário autenticado se sessão for válida e registrar breadcrumb seguro. | "Você não tem permissão para acessar estas informações." |
| Falha ao carregar minhas viagens | API / Servidor | Manter dados locais se existirem. Seguir para Home e exibir aviso quando necessário. | "Não foi possível atualizar suas viagens agora." |
| Falha ao carregar viagens acompanhadas | API / Servidor | Manter dados locais se existirem. Seguir para Home e exibir aviso quando necessário. | "Não foi possível atualizar suas viagens acompanhadas agora." |
| Falha ao consultar viagem ativa | API / Servidor | Usar viagem ativa salva localmente, se existir. Caso contrário, seguir fluxo normal. | "Não foi possível verificar a viagem ativa agora." |
| Falha ao preparar sincronização de coordenadas | Sincronização | Manter coordenadas pendentes salvas localmente para nova tentativa posterior. | "Existem coordenadas aguardando envio. Elas serão sincronizadas quando possível." |
| Permissão de localização negada sem viagem ativa | Permissão | Não bloquear a entrada. Solicitar permissão apenas quando o usuário tentar ativar uma viagem. | Nenhuma mensagem obrigatória na Splash. |
| Permissão de localização negada com viagem ativa | Permissão | Informar que o registro da viagem não poderá continuar sem permissão. Seguir para Home com aviso. | "Para continuar registrando sua viagem, permita o acesso à localização." |
| Localização do dispositivo desativada com viagem ativa | Configuração do dispositivo | Informar que a localização precisa estar ativa para continuar registrando pontos. | "Ative a localização do dispositivo para registrar os pontos da viagem." |
| 5xx Servidor | Erro de servidor | Registrar breadcrumb seguro e, se possível, seguir com dados locais. Caso impeça o fluxo, exibir BottomSheet modal padrão. | "Não foi possível carregar o aplicativo agora. Tente novamente." |
| Timeout | Timeout de rede | Tratar como falha de conectividade. Se houver dados locais e sessão válida, seguir para Home. | "O servidor demorou para responder. Tente novamente em alguns instantes." |
| Erro inesperado | Erro desconhecido | Registrar erro seguro, exibir BottomSheet modal padrão e permitir tentativa novamente. | "Não foi possível carregar o aplicativo corretamente. Tente novamente." |

---

### 4.5 Fluxo Técnico Resumido

1. `SplashScreen` é exibida ao abrir o aplicativo.
2. `SplashViewModel` inicia o carregamento inicial.
3. `InitializeAppUseCase` verifica a conectividade.
4. `CheckSavedSessionUseCase` verifica se existem tokens salvos em armazenamento seguro.
5. Se não existir sessão salva, o app navega para Login.
6. Se existir sessão salva, `ValidateSessionUseCase` valida se a sessão pode ser usada.
7. Se o access token estiver expirado, `RefreshTokenUseCase` tenta renovar a sessão.
8. Se a sessão for inválida ou não puder ser renovada, a sessão local é removida e o app navega para Login.
9. Se a sessão for válida, o app identifica o usuário logado.
10. Com internet disponível, o app carrega minhas viagens e viagens acompanhadas pela API.
11. Após sucesso, as viagens carregadas são salvas localmente.
12. Sem internet ou em caso de falha parcial, o app utiliza dados locais disponíveis.
13. O app verifica se existe viagem ativa salva localmente.
14. O app verifica se existem coordenadas pendentes.
15. Com internet disponível, o app prepara a sincronização das coordenadas pendentes.
16. O app verifica permissões de localização.
17. Se houver viagem ativa e a permissão estiver ausente, o app solicita ou orienta o usuário.
18. Ao concluir as verificações, o app navega para a Tela Principal.
19. Se ocorrer erro impeditivo, o app exibe o BottomSheet modal padrão com opção de tentar novamente ou ir para Login.

---

### 4.6 Regras Técnicas

1. A Splash deve ser a primeira feature executada ao abrir o aplicativo.
2. A Splash não deve conter lógica de negócio diretamente na View.
3. O `SplashViewModel` deve orquestrar o fluxo por meio de casos de uso.
4. A sessão deve ser lida apenas a partir de armazenamento seguro.
5. Tokens inválidos, ausentes ou corrompidos devem resultar em redirecionamento para Login.
6. Dados locais só podem ser exibidos se estiverem vinculados ao usuário autenticado atual.
7. Viagens e viagens acompanhadas carregadas com sucesso da API devem atualizar o armazenamento local.
8. Falhas parciais no carregamento das listas não devem impedir entrada no app quando houver sessão válida.
9. Coordenadas pendentes não devem ser apagadas durante a Splash.
10. Coordenadas pendentes devem ser sincronizadas apenas quando houver conexão.
11. Se a sincronização falhar, as coordenadas devem permanecer salvas localmente.
12. A permissão de localização não deve ser solicitada sem contexto, exceto se houver viagem ativa em andamento.
13. Se não houver viagem ativa, a permissão de localização deve ser solicitada apenas no fluxo de ativação de viagem.
14. Erros vindos de endpoints devem ser exibidos no BottomSheet modal padrão.
15. A Splash deve evitar loops infinitos de carregamento.
16. Em caso de erro recuperável, o usuário deve poder tentar novamente.
17. Em caso de sessão inválida, o usuário deve ser redirecionado para Login.
18. A Splash deve registrar eventos de analytics sem enviar tokens, e-mails completos ou coordenadas.
19. A Splash deve registrar breadcrumbs seguros em falhas relevantes.
20. A navegação deve acontecer por evento único, evitando navegação duplicada após recriação da tela.

---

## 5. Eventos de Analytics

| Nome do evento | Gatilho | Propriedades |
|----------------|---------|--------------|
| `splash_visualizada` | Tela de Splash aparece ao abrir o aplicativo | `origem: String`, `versao_app: String`, `versao_so: String` |
| `splash_carregamento_iniciado` | App inicia as verificações iniciais | `tem_conexao: Boolean`, `tem_sessao_salva: Boolean` |
| `splash_conectividade_verificada` | App verifica se há conexão com a internet | `tem_conexao: Boolean` |
| `splash_sessao_verificada` | App verifica se existe sessão salva localmente | `tem_sessao_salva: Boolean`, `sessao_valida: Boolean` |
| `splash_sessao_valida_detectada` | App identifica sessão válida salva no dispositivo | `origem: String` |
| `splash_sessao_invalida_detectada` | App identifica sessão ausente, expirada ou inválida | `motivo: String` |
| `splash_refresh_token_iniciado` | App tenta renovar o token de acesso | `motivo: String` |
| `splash_refresh_token_concluido` | Token de acesso renovado com sucesso | `duracao_ms: Int` |
| `splash_refresh_token_falhou` | Falha ao renovar token de acesso | `codigo_erro: String`, `tipo_erro: String` |
| `splash_usuario_carregado` | Dados mínimos do usuário são carregados com sucesso | `duracao_ms: Int`, `origem_dados: String` |
| `splash_minhas_viagens_carregadas` | Minhas viagens são carregadas com sucesso | `duracao_ms: Int`, `qtd_viagens: Int`, `origem_dados: String` |
| `splash_viagens_acompanhadas_carregadas` | Viagens acompanhadas são carregadas com sucesso | `duracao_ms: Int`, `qtd_viagens: Int`, `qtd_convites_pendentes: Int`, `origem_dados: String` |
| `splash_dados_locais_utilizados` | App utiliza dados locais por ausência de conexão ou falha parcial da API | `tipo_dado: String`, `qtd_itens: Int`, `motivo: String` |
| `splash_viagem_ativa_verificada` | App verifica se existe viagem ativa salva localmente | `tem_viagem_ativa: Boolean` |
| `splash_coordenadas_pendentes_verificadas` | App verifica coordenadas pendentes de envio | `qtd_coordenadas_pendentes: Int`, `tem_conexao: Boolean` |
| `splash_sincronizacao_coordenadas_preparada` | App prepara sincronização de coordenadas pendentes | `qtd_coordenadas_pendentes: Int`, `tem_conexao: Boolean` |
| `splash_permissao_localizacao_verificada` | App verifica permissão de localização | `permissao_concedida: Boolean`, `tem_viagem_ativa: Boolean` |
| `splash_localizacao_dispositivo_verificada` | App verifica se a localização do dispositivo está ativa | `localizacao_ativa: Boolean`, `tem_viagem_ativa: Boolean` |
| `splash_permissao_localizacao_solicitada` | App solicita permissão de localização durante Splash | `motivo: String`, `tem_viagem_ativa: Boolean` |
| `splash_permissao_localizacao_concedida` | Usuário concede permissão de localização solicitada na Splash | `motivo: String` |
| `splash_permissao_localizacao_negada` | Usuário nega permissão de localização solicitada na Splash | `motivo: String`, `negacao_permanente: Boolean` |
| `splash_navegou_login` | App direciona o usuário para a tela de login | `motivo: String`, `tem_conexao: Boolean` |
| `splash_navegou_home` | App direciona o usuário para a tela principal | `duracao_ms: Int`, `origem_dados: String`, `tem_conexao: Boolean` |
| `splash_bottomsheet_erro_exibido` | App exibe BottomSheet modal padrão por erro de endpoint | `codigo_erro: String`, `tipo_erro: String`, `tentar_novamente: Boolean` |
| `splash_tentar_novamente_tocado` | Usuário toca em **Tentar novamente** após erro na Splash | `codigo_erro: String`, `tipo_erro: String` |
| `splash_ir_para_login_tocado` | Usuário toca em **Ir para login** após erro na Splash | `motivo: String` |
| `splash_carregamento_concluido` | Fluxo inicial da Splash é concluído com sucesso | `duracao_ms: Int`, `destino: String`, `tem_conexao: Boolean`, `origem_dados: String` |
| `splash_erro` | Ocorre erro durante o carregamento inicial | `codigo_erro: String`, `tipo_erro: String`, `tentar_novamente: Boolean`, `etapa: String` |

---

### Propriedades dos Eventos

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `origem` | String | Indica de onde a Splash foi iniciada, como `app_aberto`, `retorno_background`, `deep_link` ou `notificacao`. |
| `versao_app` | String | Versão instalada do aplicativo. |
| `versao_so` | String | Versão do Android do dispositivo. |
| `tem_conexao` | Boolean | Indica se havia conexão com a internet durante o carregamento. |
| `tem_sessao_salva` | Boolean | Indica se existiam tokens ou dados de sessão salvos no dispositivo. |
| `sessao_valida` | Boolean | Indica se a sessão salva pôde ser considerada válida. |
| `motivo` | String | Motivo seguro do fluxo, como `sem_sessao`, `sessao_expirada`, `token_invalido`, `logout_anterior`, `sem_conexao`, `falha_api` ou `viagem_ativa`. |
| `codigo_erro` | String | Código ou categoria segura do erro. Não deve conter stack trace ou payload da API. |
| `tipo_erro` | String | Categoria do erro, como `conectividade`, `autenticacao`, `autorizacao`, `timeout`, `servidor`, `permissao`, `localizacao_desativada`, `sincronizacao` ou `desconhecido`. |
| `duracao_ms` | Int | Tempo gasto para concluir uma etapa ou todo o carregamento inicial. |
| `origem_dados` | String | Indica se os dados exibidos vieram da `api`, `local` ou `misto`. |
| `qtd_viagens` | Int | Quantidade de viagens carregadas. |
| `qtd_convites_pendentes` | Int | Quantidade de convites pendentes carregados. |
| `qtd_itens` | Int | Quantidade genérica de itens locais carregados. |
| `tipo_dado` | String | Tipo de dado local utilizado, como `minhas_viagens`, `viagens_acompanhadas`, `convites` ou `viagem_ativa`. |
| `tem_viagem_ativa` | Boolean | Indica se existe viagem ativa salva localmente. |
| `qtd_coordenadas_pendentes` | Int | Quantidade de coordenadas pendentes de envio no armazenamento local. |
| `permissao_concedida` | Boolean | Indica se a permissão de localização está concedida. |
| `localizacao_ativa` | Boolean | Indica se a localização do dispositivo está ativada. |
| `negacao_permanente` | Boolean | Indica se a permissão foi negada de forma permanente pelo usuário. |
| `tentar_novamente` | Boolean | Indica se o BottomSheet exibiu opção de tentar novamente. |
| `destino` | String | Destino da navegação após a Splash, como `login` ou `home`. |
| `etapa` | String | Etapa em que o erro ocorreu, como `verificar_conexao`, `validar_sessao`, `carregar_usuario`, `carregar_viagens`, `carregar_viagens_acompanhadas`, `verificar_permissao` ou `sincronizar_coordenadas`. |

---

### Regras de Analytics da Feature

1. Nenhum evento deve enviar `accessToken`, `refreshToken`, senha, e-mail completo, nome completo ou coordenadas exatas.
2. Eventos de erro devem registrar apenas categorias seguras, como tipo do erro e etapa onde ocorreu.
3. O evento `splash_visualizada` deve ser disparado sempre que a tela de Splash for exibida.
4. O evento `splash_carregamento_concluido` deve ser disparado apenas quando a Splash concluir seu fluxo e definir um destino de navegação.
5. O evento `splash_navegou_home` deve ser disparado quando o usuário for direcionado para a tela principal.
6. O evento `splash_navegou_login` deve ser disparado quando o usuário for direcionado para a tela de login.
7. O evento `splash_bottomsheet_erro_exibido` deve ser disparado sempre que erro de endpoint for exibido em BottomSheet modal padrão.
8. O evento `splash_dados_locais_utilizados` deve ser disparado quando o app usar dados locais por falta de internet ou falha parcial de API.
9. O evento `splash_erro` deve informar a etapa em que ocorreu a falha, sem expor detalhes técnicos sensíveis.
10. O tempo `duracao_ms` deve medir o carregamento real da etapa ou do fluxo completo da Splash.

## 6. Permissões e Privacidade

| Permissão | Obrigatória | Quando solicitada | Se negada |
|-----------|-------------|-------------------|-----------|
| Localização aproximada / precisa | Sim, para ativar e rastrear uma viagem | Quando o usuário tentar ativar uma viagem pela primeira vez ou iniciar o registro de coordenadas | O app deve informar que não será possível registrar os pontos da viagem sem permissão de localização. A viagem não deve ser ativada para rastreamento. |
| Localização em segundo plano | Sim, se o app precisar continuar registrando coordenadas com o app em segundo plano | Após a permissão de localização principal ser concedida e antes de iniciar uma viagem que precise continuar sendo registrada fora da tela aberta | O app deve informar que o registro da viagem pode parar quando o app estiver em segundo plano. A ativação da viagem deve ser bloqueada ou limitada, conforme regra definida para o produto. |
| Internet / acesso à rede | Sim | Permissão declarada no manifesto; não exige solicitação visual ao usuário | Sem conexão, o app deve bloquear login, cadastro, recuperação de senha e operações que dependem da API. Coordenadas pendentes devem permanecer salvas localmente. |
| Notificações | Não nesta iteração | Fora do escopo da primeira versão, a menos que seja incluído aviso de convite ou rastreamento ativo | Se negada, o app deve continuar funcionando sem notificações. Convites e estados devem ser exibidos dentro do aplicativo. |

**Dados armazenados localmente:**

| Dado | Sensível | Onde é armazenado | Motivo |
|------|----------|-------------------|--------|
| `accessToken` | Sim | Armazenamento seguro, como `EncryptedSharedPreferences` | Manter o usuário autenticado e permitir chamadas autenticadas à API. |
| `refreshToken` | Sim | Armazenamento seguro, como `EncryptedSharedPreferences` | Permitir renovação da sessão quando aplicável. |
| `usuarioId` | Sim | Armazenamento seguro e/ou base local vinculado ao usuário logado | Associar dados locais ao usuário autenticado. |
| Dados mínimos do usuário | Sim | Base local temporária ou armazenamento seguro, conforme necessidade | Exibir informações do usuário e manter contexto da sessão. |
| Minhas viagens | Sim | Room / base local temporária | Permitir carregamento rápido e visualização offline parcial. |
| Viagens acompanhadas | Sim | Room / base local temporária | Permitir carregamento rápido e visualização offline parcial. |
| Viagem ativa atual | Sim | Room ou DataStore, vinculada ao usuário logado | Permitir que o app saiba qual viagem está em andamento. |
| Coordenadas pendentes | Sim | Room / base local temporária | Manter coordenadas capturadas até o envio bem-sucedido para a API. |
| Preferências não sensíveis | Não | DataStore | Guardar configurações simples, como última aba acessada ou preferências visuais. |

---

**Dados enviados ao servidor:**

| Dado enviado | Quando é enviado | Motivo |
|-------------|------------------|--------|
| E-mail e senha | Login | Autenticar o usuário. |

---

**Política de retenção dos dados enviados ao servidor:**

A retenção dos dados no servidor deve ser definida pela API e pela política de privacidade do produto. Como regra de produto, os dados de localização devem ser usados apenas para registrar e acompanhar viagens autorizadas.

Recomendações:

- coordenadas devem ser vinculadas a uma viagem específica;
- coordenadas não devem ser públicas;
- apenas o viajante e usuários autorizados devem acessar os dados da viagem;
- dados de localização devem ser mantidos apenas pelo tempo necessário para a finalidade do produto;
- uma política de privacidade deve informar como os dados são coletados, usados, armazenados e excluídos.

---

**Dados excluídos no logout:** Sim.

Ao realizar logout, o app deve excluir os dados locais vinculados ao usuário logado:

| Dado | Excluir no logout |
|------|-------------------|
| `accessToken` | Sim |
| `refreshToken` | Sim |
| Dados mínimos de sessão | Sim |
| Dados locais do usuário | Sim |
| Minhas viagens salvas localmente | Sim |
| Viagens acompanhadas salvas localmente | Sim |
| Convites salvos localmente | Sim |
| Viagem ativa em cache | Sim |
| Coordenadas pendentes | Sim |
| Preferências não sensíveis globais do app | Não, exceto se forem específicas do usuário |

---

### Regras de Privacidade

1. A localização só deve ser capturada quando houver usuário autenticado e viagem ativa.
2. A localização não deve ser capturada durante viagens pendentes, inativas, canceladas ou finalizadas.
3. O usuário deve ser informado quando o registro de localização estiver em andamento.
4. O usuário deve conseguir interromper o registro ao inativar, finalizar ou cancelar a viagem.
5. Coordenadas devem ser salvas localmente apenas até o envio bem-sucedido para a API.
6. Coordenadas enviadas com sucesso devem ser removidas da base local.
7. Coordenadas não enviadas devem permanecer localmente até nova tentativa, salvo logout.
8. Ao realizar logout, todos os dados locais do usuário devem ser removidos.
9. Dados de localização não devem ser enviados para analytics, logs ou relatórios de crash.
10. Tokens, senhas e dados sensíveis não devem ser registrados em logs.
11. O app não deve permitir acompanhamento público de viagens nesta versão.
12. Apenas usuários convidados e autorizados devem visualizar coordenadas de uma viagem.

## 7. Notificações (se aplicável)

| Tipo de notificação | Gatilho | Título | Corpo | Deep link |
|---------------------|---------|--------|-------|-----------|

---

## 8. Localização

**Arquivo de strings / recurso:** `strings.xml`

| Chave | Padrão (PT-BR) | Observações |
|-------|----------------|-------------|
| `splash.acessibilidade.tela` | "Carregando aplicativo" | Nome acessível anunciado ao abrir a Splash. |
| `splash.acessibilidade.logo` | "Logo do aplicativo" | Rótulo acessível do logo. |
| `splash.acessibilidade.loading` | "Carregando" | Rótulo acessível do indicador de carregamento. |
| `splash.loading.texto` | "Carregando..." | Texto exibido abaixo do loading na parte inferior da tela. |
| `splash.erro.titulo` | "Não foi possível carregar o aplicativo" | Título do BottomSheet de erro na Splash. |
| `splash.erro.generico` | "Não foi possível carregar o aplicativo corretamente. Tente novamente." | Mensagem genérica para falha inesperada. |
| `splash.erro.sem_conexao` | "Sem conexão com a internet. Alguns dados podem estar desatualizados." | Usada quando há sessão válida e dados locais disponíveis. |
| `splash.erro.sem_conexao_login` | "Para entrar na sua conta, conecte-se à internet." | Usada quando não há sessão válida e o login depende de internet. |
| `splash.erro.sessao_expirada.titulo` | "Sessão expirada" | Título para sessão inválida ou expirada. |
| `splash.erro.sessao_expirada.mensagem` | "Sua sessão expirou. Entre novamente para continuar." | Mensagem exibida quando a sessão salva não pode ser usada. |
| `splash.erro.carregar_minhas_viagens` | "Não foi possível atualizar suas viagens agora." | Mensagem para falha ao carregar minhas viagens. |
| `splash.erro.carregar_viagens_acompanhadas` | "Não foi possível atualizar suas viagens acompanhadas agora." | Mensagem para falha ao carregar viagens acompanhadas. |
| `splash.erro.verificar_viagem_ativa` | "Não foi possível verificar a viagem ativa agora." | Mensagem para falha ao verificar viagem ativa. |
| `splash.erro.servidor` | "Não foi possível carregar o aplicativo agora. Tente novamente." | Mensagem para erro de servidor. |
| `splash.erro.timeout.titulo` | "Tempo de resposta excedido" | Título para timeout. |
| `splash.erro.timeout.mensagem` | "O servidor demorou para responder. Tente novamente em alguns instantes." | Mensagem para timeout. |
| `splash.erro.permissao_localizacao` | "Para continuar registrando sua viagem, permita o acesso à localização." | Usada quando existe viagem ativa e a permissão de localização não foi concedida. |
| `splash.erro.localizacao_desativada` | "Ative a localização do dispositivo para registrar os pontos da viagem." | Usada quando existe viagem ativa e a localização do dispositivo está desligada. |
| `splash.coordenadas.pendentes` | "Existem coordenadas aguardando envio. Elas serão sincronizadas quando possível." | Mensagem informativa sobre coordenadas pendentes. |
| `splash.dados_locais` | "Exibindo informações salvas no dispositivo." | Mensagem quando dados locais são usados. |
| `splash.dados_desatualizados` | "Estes dados podem estar desatualizados. Atualize quando houver internet." | Mensagem quando os dados podem não estar atualizados. |
| `splash.bottomsheet.botao.tentar_novamente` | "Tentar novamente" | Ação principal do BottomSheet de erro recuperável. |
| `splash.bottomsheet.botao.ir_login` | "Ir para login" | Ação para redirecionar para a tela de login. |
| `splash.bottomsheet.botao.entendi` | "Entendi" | Ação para fechar mensagem informativa. |
| `splash.bottomsheet.botao.fechar` | "Fechar" | Rótulo de acessibilidade ou ação de fechar. |
| `splash.acessibilidade.erro` | "Mensagem de erro ao carregar aplicativo" | Rótulo acessível do BottomSheet de erro. |
| `splash.acessibilidade.tentar_novamente` | "Tentar carregar novamente" | Rótulo acessível do botão tentar novamente. |
| `splash.acessibilidade.ir_login` | "Ir para tela de login" | Rótulo acessível do botão ir para login. |
| `splash.acessibilidade.fechar_erro` | "Fechar mensagem de erro" | Rótulo acessível do botão fechar. |

---

### Observações

- A tela de Splash deve exibir apenas o logo, o loading e o texto **"Carregando..."** no fluxo normal.
- Mensagens de erro de chamadas de endpoint devem ser exibidas no **BottomSheet modal padrão**.
- A Splash não deve exibir termos técnicos como `token`, `endpoint`, `HTTP`, `cache` ou `API` para o usuário final.
- Quando houver sessão válida e dados locais disponíveis, o app pode seguir para a tela principal e informar que os dados podem estar desatualizados.
- Quando não houver sessão válida, o app deve direcionar o usuário para a tela de login.
  
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
