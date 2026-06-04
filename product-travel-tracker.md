# Especificação de Produto

> **Tipo de documento:** Spec de Produto  
> **Status:** `rascunho` | `revisão` | `aprovado` | `descontinuado`  
> **Versão:** 0.1.0  
> **Última atualização:** 2026-06-04  
> **Product Owner:** Jose Julio  
> **Partes interessadas:** Jose Julio

---

## 1. Visão Geral

### 1.1 Declaração do Problema
<!-- Descreva o problema que este produto/funcionalidade resolve. Responda: qual é a dor existente hoje? Para quem? -->
1.1 Declaração do Problema

Atualmente, viajantes que realizam trajetos de bike, moto, carro ou ônibus muitas vezes precisam compartilhar sua localização manualmente com familiares, amigos ou pessoas próximas durante a viagem. Esse processo pode ser pouco prático, inseguro e fragmentado, principalmente em viagens longas, onde há mudanças constantes de localização e nem sempre é possível enviar atualizações frequentes.

Além disso, as pessoas que acompanham o viajante nem sempre possuem uma forma simples e centralizada de visualizar o percurso realizado, os pontos por onde ele passou e sua posição mais recente em um mapa. Isso gera preocupação, falta de informação e dificuldade para acompanhar a viagem do início ao fim.

O produto resolve esse problema ao permitir que o viajante compartilhe sua localização durante o trajeto, enquanto pessoas convidadas podem acompanhar os pontos registrados diretamente em um mapa, dentro do mesmo aplicativo. Dessa forma, familiares, amigos ou outros convidados conseguem visualizar a evolução da viagem de maneira clara, organizada e segura, desde o início até o encerramento do percurso.

### 1.2 Oportunidade
<!-- Por que agora? Qual mudança de mercado, usuário ou negócio torna este o momento certo? -->
1.2 Oportunidade

O momento é oportuno para o desenvolvimento deste produto devido à crescente necessidade de compartilhar informações de localização de forma simples, prática e segura durante viagens. Cada vez mais pessoas realizam trajetos de bike, moto, carro ou ônibus e desejam manter familiares, amigos ou pessoas próximas informadas sobre seu deslocamento.

Inicialmente, o aplicativo surge como uma solução para uso próprio, atendendo à necessidade de registrar e compartilhar viagens de maneira organizada. No entanto, essa mesma necessidade também pode existir para outros viajantes que desejam permitir que pessoas convidadas acompanhem seus trajetos em tempo real ou por meio dos pontos registrados ao longo do percurso.

Dessa forma, o produto representa uma oportunidade de criar uma solução útil tanto para o uso pessoal quanto para um público mais amplo interessado em segurança, acompanhamento de viagens e compartilhamento de rotas de forma centralizada em um único aplicativo.

### 1.3 Objetivos
<!-- O que precisa ser verdade para que esta iniciativa seja considerada bem-sucedida? Liste de 2 a 5 objetivos mensuráveis. -->

| # | Objetivo | Métrica de Sucesso | Meta |
|---|----------|--------------------|------|
| 1 |  Permitir que o viajante registre uma viagem no aplicativo
Viagem criada com dados básicos, como título, data de início, tipo de transporte e status
O usuário deve conseguir criar uma nova viagem com sucesso | Viagem criada com dados básicos, como título, data de início, tipo de transporte e status | O usuário deve conseguir criar uma nova viagem com sucesso |
| 2 | Permitir que a localização do dispositivo seja capturada e enviada para um endpoint durante a viagem | Coordenadas de latitude, longitude, data e hora enviadas corretamente para a API | O aplicativo deve enviar pontos de localização enquanto a viagem estiver ativa |
| 3 | Permitir que o viajante convide outras pessoas para acompanhar uma viagem | Convite criado e associado à viagem e ao usuário convidado | O usuário deve conseguir enviar convites para rastreamento de uma viagem |
| 4 | Permitir que o usuário convidado aceite ou rejeite o convite de rastreamento | Status do convite atualizado para aceito ou rejeitado | O convidado deve conseguir responder ao convite dentro do aplicativo |
| 5 | Permitir que uma pessoa convidada acompanhe a viagem em um mapa | Pontos da viagem exibidos em mapa para convidados autorizados | O convidado deve visualizar o trajeto e a última localização registrada da viagem |

Texto complementar para a especificação:
O sucesso desta iniciativa será medido pela capacidade do aplicativo de centralizar todo o fluxo de acompanhamento de viagens em uma única solução. O aplicativo deverá permitir que o viajante registre uma viagem, compartilhe sua localização durante o trajeto e convide outras pessoas para acompanhar o deslocamento.
Para que o acompanhamento seja seguro e controlado, os convidados deverão receber um convite de rastreamento e poderão aceitar ou rejeitar a solicitação. Somente após o aceite, o usuário convidado poderá visualizar os pontos compartilhados pelo viajante em um mapa dentro do próprio aplicativo.
Dessa forma, a iniciativa será considerada bem-sucedida quando o aplicativo permitir, de ponta a ponta, o registro da viagem, o envio da localização para um endpoint, o gerenciamento de convites e a visualização do trajeto por usuários autorizados.

### 1.4 Não-Objetivos
<!-- Lista explícita do que este produto NÃO pretende resolver nesta versão. -->

Nesta versão, o produto terá um escopo limitado ao registro da viagem, compartilhamento da localização durante o trajeto e acompanhamento por usuários convidados. As funcionalidades abaixo não fazem parte do escopo desta versão:

1. Traçar rota antecipadamente: O aplicativo não permitirá planejar ou desenhar previamente a rota da viagem antes do seu início. O trajeto será formado a partir dos pontos de localização registrados durante a viagem.
2. Acompanhar viagem sem conexão com a internet: O aplicativo não garantirá o envio ou acompanhamento da localização em tempo real quando o dispositivo estiver sem conexão com a internet.
3. Compartilhar coordenadas sem autenticação: O aplicativo não permitirá o compartilhamento de coordenadas por usuários não autenticados. O usuário deverá estar logado para iniciar e compartilhar uma viagem.
4. Compartilhar coordenadas sem viagem ativa: O aplicativo não enviará localização para rastreamento caso não exista uma viagem ativa vinculada ao usuário.
5. Acompanhamento público da viagem: O aplicativo não permitirá que qualquer pessoa acompanhe uma viagem livremente. Apenas usuários convidados e autorizados poderão visualizar os pontos compartilhados.

Texto complementar para a especificação:
O produto não tem como objetivo, nesta primeira versão, funcionar como um planejador de rotas ou navegador GPS. A rota exibida no mapa será construída com base nas coordenadas enviadas pelo dispositivo do viajante durante uma viagem ativa.
Também não faz parte do escopo permitir o acompanhamento completo sem conexão com a internet, pois o envio e a visualização dos pontos dependem da comunicação com o servidor. Além disso, por questões de segurança e controle de acesso, o compartilhamento de localização somente poderá ocorrer quando o usuário estiver autenticado e possuir uma viagem ativa.
Dessa forma, o aplicativo manterá o foco principal em registrar viagens, enviar localização durante o deslocamento e permitir o acompanhamento apenas por pessoas convidadas e autorizadas.

---

## 2. Usuários-Alvo

### 2.1 Usuário Primário
<!-- Quem é o usuário principal? Papel, contexto, dispositivo, nível de familiaridade com tecnologia. -->

**Quem:** Viajante 
**Contexto:** Durante uma viagem
**Motivação:** Compartilhar as localizacoes durante uma viagem 
**Frustração hoje:** Conseguir compartilhar coordenada da viagem de forma contínua 

### 2.2 Usuários Secundários
<!-- Outros usuários que interagem com o produto, mesmo que indiretamente. -->

| Usuário | Relação com o produto | Principal necessidade |
|---------|-----------------------|-----------------------|
| Outros usuarios | Acompanhar uma viagem | Obter as coordenadas historicas de uma viagem |

---

## 3. Histórias de Usuário

<!-- Formato: Como [usuário], quero [ação] para que [resultado].
     Prioridade: P0 = deve entregar / P1 = deveria entregar / P2 = seria bom ter -->

| ID | História | Prioridade | Critérios de Aceite |
|----|----------|------------|---------------------|
| US-01 | Como usuário, quero cadastrar meus dados e criar uma senha para que eu possa acessar o aplicativo de forma autenticada. | P0 | - [ ] O usuário deve conseguir informar nome, e-mail e senha.<br>- [ ] O sistema deve validar se os dados obrigatórios foram preenchidos.<br>- [ ] O sistema deve impedir o cadastro com e-mail já existente.<br>- [ ] Após o cadastro, o usuário deve conseguir realizar login no aplicativo. |
| US-02 | Como usuário, quero realizar login no aplicativo para que eu possa acessar minhas viagens e funcionalidades protegidas. | P0 | - [ ] O usuário deve conseguir informar e-mail e senha.<br>- [ ] O sistema deve validar as credenciais informadas.<br>- [ ] Em caso de sucesso, o aplicativo deve armazenar as informações necessárias para manter o usuário autenticado.<br>- [ ] Em caso de erro, o sistema deve exibir uma mensagem clara ao usuário. |
| US-03 | Como usuário, quero que o aplicativo não solicite login quando minhas informações de autenticação já estiverem salvas em cache para que eu possa acessar o aplicativo mais rapidamente. | P1 | - [ ] O aplicativo deve verificar se existe uma sessão válida armazenada localmente.<br>- [ ] Se a sessão for válida, o usuário deve ser direcionado para a tela principal.<br>- [ ] Se a sessão estiver ausente ou inválida, o usuário deve ser direcionado para a tela de login. |
| US-04 | Como usuário, quero informar meu e-mail para receber um token de recuperação para que eu possa alterar minha senha. | P0 | - [ ] O usuário deve conseguir informar o e-mail cadastrado.<br>- [ ] O sistema deve enviar ou gerar um token de recuperação de senha.<br>- [ ] O usuário deve conseguir informar o token recebido e uma nova senha.<br>- [ ] O sistema deve validar o token antes de permitir a alteração da senha. |
| US-05 | Como viajante, quero cadastrar uma viagem para que ela possa ser acompanhada por outro usuário convidado. | P0 | - [ ] O viajante deve conseguir informar os dados básicos da viagem.<br>- [ ] O sistema deve criar a viagem com status inicial adequado, como “cadastrada” ou “pendente”.<br>- [ ] A viagem cadastrada deve ficar disponível para visualização e gerenciamento pelo viajante. |
| US-06 | Como viajante, quero alterar as informações de uma viagem para que eu possa corrigir ou atualizar dados de uma viagem cadastrada. | P1 | - [ ] O viajante deve conseguir editar os dados de uma viagem cadastrada.<br>- [ ] O sistema deve validar os campos obrigatórios antes de salvar.<br>- [ ] As alterações devem ser refletidas na listagem e nos detalhes da viagem.<br>- [ ] O sistema não deve permitir alterações incompatíveis com o status da viagem, quando aplicável. |
| US-07 | Como viajante, quero excluir uma viagem cadastrada e não realizada para que ela seja removida do aplicativo. | P1 | - [ ] O viajante deve conseguir excluir apenas viagens permitidas pelo sistema.<br>- [ ] O sistema deve solicitar confirmação antes da exclusão.<br>- [ ] Após a exclusão, a viagem não deve mais aparecer para o viajante.<br>- [ ] O sistema não deve permitir excluir uma viagem ativa em andamento. |
| US-08 | Como viajante, quero ativar uma viagem para que o aplicativo comece a compartilhar minhas coordenadas. | P0 | - [ ] O viajante deve conseguir ativar uma viagem cadastrada.<br>- [ ] Ao ativar a viagem, o status deve ser alterado para “ativa” ou equivalente.<br>- [ ] O aplicativo deve iniciar a captura das coordenadas do dispositivo.<br>- [ ] O aplicativo deve enviar as coordenadas para o endpoint configurado enquanto a viagem estiver ativa. |
| US-09 | Como viajante, quero compartilhar as coordenadas do meu dispositivo com um endpoint para que minha viagem possa ser acompanhada. | P0 | - [ ] O aplicativo deve capturar latitude, longitude, data e hora da localização.<br>- [ ] O aplicativo deve enviar as coordenadas para o endpoint da API.<br>- [ ] O envio deve estar associado ao usuário autenticado e à viagem ativa.<br>- [ ] O aplicativo não deve enviar coordenadas quando não houver viagem ativa. |
| US-10 | Como viajante, quero inativar uma viagem para que o aplicativo pare de compartilhar minhas coordenadas. | P0 | - [ ] O viajante deve conseguir encerrar ou inativar uma viagem ativa.<br>- [ ] Após a inativação, o aplicativo deve parar de capturar e enviar coordenadas.<br>- [ ] O status da viagem deve ser atualizado para “inativa”, “finalizada” ou equivalente.<br>- [ ] A viagem deve permanecer disponível para consulta posterior, se permitido pelo sistema. |
| US-11 | Como viajante, quero cancelar uma viagem para que eu possa indicar que ela não será mais realizada ou acompanhada. | P1 | - [ ] O viajante deve conseguir cancelar uma viagem quando permitido pelo status atual.<br>- [ ] O sistema deve solicitar confirmação antes do cancelamento.<br>- [ ] Uma viagem cancelada não deve permitir envio de novas coordenadas.<br>- [ ] Os convidados devem deixar de acompanhar a viagem cancelada. |
| US-12 | Como viajante, quero convidar outro usuário para acompanhar uma viagem para que ele possa visualizar meu deslocamento no mapa. | P0 | - [ ] O viajante deve conseguir informar o usuário convidado, por e-mail ou identificador definido pelo sistema.<br>- [ ] O sistema deve criar um convite vinculado à viagem.<br>- [ ] O convite deve possuir status inicial, como “pendente”.<br>- [ ] O usuário convidado deve conseguir visualizar o convite recebido. |
| US-13 | Como usuário convidado, quero aceitar um convite de acompanhamento de viagem para que eu possa acompanhar a viagem no aplicativo. | P0 | - [ ] O usuário deve conseguir visualizar convites pendentes.<br>- [ ] O usuário deve conseguir aceitar um convite recebido.<br>- [ ] Após o aceite, o convite deve ter seu status atualizado para “aceito”.<br>- [ ] Após aceitar, o usuário deve conseguir visualizar a viagem no mapa. |
| US-14 | Como usuário convidado, quero rejeitar um convite de acompanhamento de viagem para que eu possa não acompanhar uma viagem. | P0 | - [ ] O usuário deve conseguir rejeitar um convite recebido.<br>- [ ] Após a rejeição, o convite deve ter seu status atualizado para “rejeitado”.<br>- [ ] O usuário não deve ter acesso ao mapa da viagem rejeitada.<br>- [ ] A viagem rejeitada não deve aparecer como viagem acompanhada pelo usuário. |
| US-15 | Como usuário convidado, quero excluir uma viagem aceita da minha lista de acompanhamento para que eu pare de acompanhar essa viagem. | P1 | - [ ] O usuário deve conseguir remover uma viagem aceita da sua lista de acompanhamento.<br>- [ ] Após a remoção, a viagem não deve mais aparecer para acompanhamento do usuário.<br>- [ ] A remoção deve afetar apenas o usuário convidado, sem excluir a viagem original do viajante.<br>- [ ] O viajante deve continuar tendo acesso à viagem. |
| US-16 | Como usuário convidado, quero obter as coordenadas de uma viagem aceita para que elas possam ser visualizadas em um mapa no aplicativo. | P0 | - [ ] O aplicativo deve buscar as coordenadas da viagem aceita.<br>- [ ] O sistema deve permitir acesso somente a usuários autorizados.<br>- [ ] As coordenadas devem estar associadas à viagem correta.<br>- [ ] O aplicativo deve exibir os pontos da viagem no mapa. |
| US-17 | Como usuário, quero obter e atualizar as coordenadas da viagem para que o mapa seja atualizado com novos pontos durante o acompanhamento. | P0 | - [ ] O aplicativo deve buscar novas coordenadas periodicamente ou mediante atualização manual.<br>- [ ] O mapa deve ser atualizado quando novas coordenadas forem recebidas.<br>- [ ] A última localização conhecida da viagem deve ser destacada no mapa.<br>- [ ] O sistema deve tratar situações em que não existam novas coordenadas disponíveis. |

---

## 4. Jornadas do Usuário

### 4.1 Jornada Principal — [Nome da Jornada]
<!-- Narrativa passo a passo do fluxo principal na perspectiva do usuário.
     Sem detalhes de implementação técnica aqui. -->

1. O usuário abre o app e vê [tela].
2. O usuário toca em [elemento] para [ação].
3. O sistema responde com [feedback].
4. O usuário conclui [objetivo].

### 4.2 Jornadas Alternativas
<!-- Variações, casos extremos ou caminhos secundários. -->

#### 4.2.1 [Nome da Jornada Alternativa]
1. 

---

## 5. Requisitos Funcionais

<!-- O que o produto deve FAZER. Sem COMO. Numerado para rastreabilidade. -->

| ID | Requisito | Prioridade | História Vinculada |
|----|-----------|------------|--------------------|
| RF-01 | O app deve [comportamento]. | P0 | US-01 |
| RF-02 |  | P1 |  |

---

## 6. Requisitos Não-Funcionais (Perspectiva de Produto)

<!-- Qualidades observáveis pelo usuário — não restrições de implementação. -->

| Categoria | Requisito | Limiar de Aceite |
|-----------|-----------|------------------|
| Desempenho | App inicia em até [X]s em dispositivo intermediário | ≤ Xs (cold start) |
| Disponibilidade | Funcionalidade opera totalmente offline | 100% do fluxo principal offline |
| Acessibilidade | Atende às diretrizes de acessibilidade da plataforma-alvo | WCAG 2.1 AA / equivalente da plataforma |
| Localização | Suporta [idiomas] | [lista] |

---

## 7. UX e Design

### 7.1 Princípios de Design
<!-- De 3 a 5 princípios norteadores das decisões de UX neste produto. -->

1. 
2. 
3. 

### 7.2 Telas / Views Principais
<!-- Liste as telas principais; anexe wireframes ou links do Figma. Sem código de layout. -->

| Tela | Descrição | Link Figma / Wireframe |
|------|-----------|------------------------|
| Home |           |                        |

### 7.3 Modelo de Navegação
<!-- Descreva como os usuários se movem entre as áreas principais: abas, pilha, drawer, modal, etc. -->

### 7.4 Padrões de Interação
<!-- Convenções nativas da plataforma a seguir: gestos, haptics, transições. -->

---

## 8. Conteúdo e Textos (Copy)

<!-- Strings principais, estados vazios, mensagens de erro como o usuário as vê. Tom, não código. -->

| Contexto | Texto | Tom |
|----------|-------|-----|
| Título do onboarding |  | Acolhedor |
| Estado vazio — sem itens |  | Útil |
| Erro genérico |  | Amigável, não técnico |

---

## 9. Analytics e Acompanhamento de Sucesso

<!-- Eventos a rastrear na perspectiva de produto. Os nomes finais serão definidos na Spec Técnica. -->

| Evento | Gatilho | Por que importa |
|--------|---------|-----------------|
| app_aberto | Usuário abre o app | Base de DAU |
| [feature]_concluida | Usuário finaliza o fluxo principal | Conversão principal |

### 9.1 KPIs
| KPI | Linha de base | Meta após [N semanas] |
|-----|---------------|-----------------------|
|     |               |                       |

---

## 10. Monetização e Modelo de Negócio
<!-- Precificação, posicionamento de paywall, camadas gratuita vs. paga — decisões de produto apenas. -->

---

## 11. Riscos e Premissas

| # | Tipo | Descrição | Mitigação |
|---|------|-----------|-----------|
| R-01 | Premissa sobre usuário | Usuários irão [comportamento]. | Validar por meio de [método]. |
| R-02 | Risco de mercado |  |  |

---

## 12. Questões em Aberto
<!-- Perguntas que precisam ser resolvidas antes ou durante o desenvolvimento. Responsável + prazo. -->

| # | Pergunta | Responsável | Prazo |
|---|----------|-------------|-------|
| Q-01 |  |  |  |

---

## 13. Histórico de Revisões

| Versão | Data | Autor | Resumo |
|--------|------|-------|--------|
| 0.1.0 | AAAA-MM-DD | [Nome] | Rascunho inicial |

