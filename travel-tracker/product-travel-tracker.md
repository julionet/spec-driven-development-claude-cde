# Especificação de Produto

> **Tipo de documento:** Spec de Produto  
> **Status:** `rascunho`
> **Versão:** 0.1.0  
> **Última atualização:** 2026-06-04  
> **Product Owner:** Jose Julio  
> **Partes interessadas:** Jose Julio

---

## 1. Visão Geral

### 1.1 Declaração do Problema
<!-- Descreva o problema que este produto/funcionalidade resolve. Responda: qual é a dor existente hoje? Para quem? -->

Atualmente, viajantes que realizam trajetos de bike, moto, carro ou ônibus muitas vezes precisam compartilhar sua localização manualmente com familiares, amigos ou pessoas próximas durante a viagem. Esse processo pode ser pouco prático, inseguro e fragmentado, principalmente em viagens longas, onde há mudanças constantes de localização e nem sempre é possível enviar atualizações frequentes.

Além disso, as pessoas que acompanham o viajante nem sempre possuem uma forma simples e centralizada de visualizar o percurso realizado, os pontos por onde ele passou e sua posição mais recente em um mapa. Isso gera preocupação, falta de informação e dificuldade para acompanhar a viagem do início ao fim.

O produto resolve esse problema ao permitir que o viajante compartilhe sua localização durante o trajeto, enquanto pessoas convidadas podem acompanhar os pontos registrados diretamente em um mapa, dentro do mesmo aplicativo. Dessa forma, familiares, amigos ou outros convidados conseguem visualizar a evolução da viagem de maneira clara, organizada e segura, desde o início até o encerramento do percurso.

### 1.2 Oportunidade
<!-- Por que agora? Qual mudança de mercado, usuário ou negócio torna este o momento certo? -->

O momento é oportuno para o desenvolvimento deste produto devido à crescente necessidade de compartilhar informações de localização de forma simples, prática e segura durante viagens. Cada vez mais pessoas realizam trajetos de bike, moto, carro ou ônibus e desejam manter familiares, amigos ou pessoas próximas informadas sobre seu deslocamento.

Inicialmente, o aplicativo surge como uma solução para uso próprio, atendendo à necessidade de registrar e compartilhar viagens de maneira organizada. No entanto, essa mesma necessidade também pode existir para outros viajantes que desejam permitir que pessoas convidadas acompanhem seus trajetos em tempo real ou por meio dos pontos registrados ao longo do percurso.

Dessa forma, o produto representa uma oportunidade de criar uma solução útil tanto para o uso pessoal quanto para um público mais amplo interessado em segurança, acompanhamento de viagens e compartilhamento de rotas de forma centralizada em um único aplicativo.

### 1.3 Objetivos
<!-- O que precisa ser verdade para que esta iniciativa seja considerada bem-sucedida? Liste de 2 a 5 objetivos mensuráveis. -->

| # | Objetivo | Métrica de Sucesso | Meta |
|---|----------|--------------------|------|
| 1 | Permitir que o viajante registre uma viagem no aplicativo | Viagem criada com dados básicos, como título, data de início, tipo de transporte e status | O usuário deve conseguir criar uma nova viagem com sucesso |
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
| US-01 | Como usuário, quero cadastrar meus dados e criar uma senha para que eu possa acessar o aplicativo de forma autenticada. | P0 | - [ ] O usuário deve conseguir informar nome, e-mail e senha.<br>- [ ] O sistema deve validar se os dados obrigatórios foram preenchidos.<br>- [ ] O nome do usuário deve conter pelo menos duas palavras, como “José Eduardo” ou “Maria Eduarda”.<br>- [ ] A senha deve ter no mínimo 6 caracteres, contendo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.<br>- [ ] O sistema deve impedir o cadastro com e-mail já existente.<br>- [ ] Após o cadastro, o usuário deve conseguir realizar login no aplicativo. |
| US-02 | Como usuário, quero realizar login no aplicativo para que eu possa acessar minhas viagens e funcionalidades protegidas. | P0 | - [ ] O usuário deve conseguir informar e-mail e senha.<br>- [ ] O sistema deve validar as credenciais informadas.<br>- [ ] Em caso de sucesso, o aplicativo deve armazenar as informações necessárias para manter o usuário autenticado.<br>- [ ] Em caso de erro, o sistema deve exibir uma mensagem clara ao usuário. |
| US-03 | Como usuário, quero que o aplicativo não solicite login quando minhas informações de autenticação já estiverem salvas em cache para que eu possa acessar o aplicativo mais rapidamente. | P1 | - [ ] O aplicativo deve verificar se existe uma sessão válida armazenada localmente.<br>- [ ] Se a sessão for válida, o usuário deve ser direcionado para a tela principal.<br>- [ ] Se a sessão estiver ausente ou inválida, o usuário deve ser direcionado para a tela de login. |
| US-04 | Como usuário, quero informar meu e-mail para receber um token de recuperação para que eu possa alterar minha senha. | P0 | - [ ] O usuário deve conseguir informar o e-mail cadastrado.<br>- [ ] O aplicativo deve enviar o e-mail informado para a API para que a API gere e envie um token de recuperação de senha para o e-mail do usuário.<br>- [ ] O aplicativo deve receber a confirmação de que o token foi enviado com sucesso.<br>- [ ] O usuário deve conseguir informar o token recebido por e-mail.<br>- [ ] O aplicativo deve validar se o token informado pelo usuário é igual ao token armazenado após a solicitação de recuperação.<br>- [ ] O usuário deve conseguir informar uma nova senha após a validação do token.<br>- [ ] A nova senha deve ter no mínimo 6 caracteres, contendo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.<br>- [ ] O sistema deve permitir a alteração da senha somente quando o token informado for válido. |
| US-05 | Como viajante, quero cadastrar uma viagem para que ela possa ser acompanhada por outro usuário convidado. | P0 | - [ ] O viajante deve conseguir informar os dados básicos da viagem.<br>- [ ] O sistema deve criar a viagem com status inicial “pendente”.<br>- [ ] A viagem cadastrada deve ficar disponível para visualização e gerenciamento pelo viajante. |
| US-06 | Como viajante, quero alterar as informações de uma viagem para que eu possa corrigir ou atualizar dados de uma viagem cadastrada. | P1 | - [ ] O viajante deve conseguir editar os dados de uma viagem cadastrada.<br>- [ ] O sistema deve validar os campos obrigatórios antes de salvar.<br>- [ ] As alterações devem ser refletidas na listagem e nos detalhes da viagem.<br>- [ ] O sistema não deve permitir alterações incompatíveis com o status da viagem, quando aplicável. |
| US-07 | Como viajante, quero excluir uma viagem cadastrada e não realizada para que ela seja removida do aplicativo. | P1 | - [ ] O viajante deve conseguir excluir apenas viagens permitidas pelo sistema.<br>- [ ] O sistema deve solicitar confirmação antes da exclusão.<br>- [ ] Após a exclusão, a viagem não deve mais aparecer para o viajante.<br>- [ ] O sistema não deve permitir excluir uma viagem ativa em andamento. |
| US-08 | Como viajante, quero ativar uma viagem para que o aplicativo comece a registrar minhas coordenadas. | P0 | - [ ] O viajante deve conseguir ativar uma viagem cadastrada.<br>- [ ] Ao ativar a viagem, o status deve ser alterado para “ativa”.<br>- [ ] O aplicativo deve iniciar a captura das coordenadas do dispositivo.<br>- [ ] O aplicativo deve salvar as coordenadas localmente no dispositivo enquanto a viagem estiver ativa.<br>- [ ] As coordenadas obtidas devem ser salvas localmente no dispositivo a cada 10 segundos.<br>- [ ] Cada coordenada salva localmente deve conter id da coordenada no formato GUID, data/hora, latitude, longitude e altitude.<br>- [ ] As coordenadas salvas localmente devem ser enviadas para o endpoint a cada 60 segundos, quando houver conexão com a internet.<br>- [ ] Ao enviar as coordenadas para o endpoint, devem ser enviados: data/hora, latitude, longitude, altitude, viagemID e coordenadaID.<br>- [ ] Quando o envio das coordenadas for concluído com sucesso, as coordenadas enviadas devem ser removidas do armazenamento local.<br>- [ ] Caso o envio falhe, as coordenadas devem permanecer salvas localmente para nova tentativa posterior.<br>- [ ] A captura de coordenadas e o envio para o endpoint devem continuar funcionando mesmo que o aplicativo seja fechado ou movido para segundo plano, desde que a viagem permaneça ativa. |
| US-09 | Como viajante, quero compartilhar as coordenadas do meu dispositivo com um endpoint para que minha viagem possa ser acompanhada. | P0 | - [ ] O aplicativo deve capturar latitude, longitude, altitude, data e hora da localização do dispositivo.<br>- [ ] O aplicativo deve salvar localmente as coordenadas capturadas enquanto houver uma viagem ativa.<br>- [ ] As coordenadas obtidas devem ser salvas localmente no dispositivo a cada 10 segundos.<br>- [ ] Cada coordenada salva localmente deve conter id da coordenada no formato GUID, data/hora, latitude, longitude e altitude.<br>- [ ] As coordenadas salvas localmente devem ser enviadas para o endpoint a cada 60 segundos, somente quando houver conexão com a internet.<br>- [ ] Ao enviar as coordenadas para o endpoint, devem ser enviados: data/hora, latitude, longitude, altitude, viagemID e coordenadaID.<br>- [ ] Após o envio bem-sucedido, as coordenadas enviadas devem ser removidas do armazenamento local.<br>- [ ] Caso o envio falhe, as coordenadas devem permanecer salvas localmente para nova tentativa posterior.<br>- [ ] O envio deve estar associado ao usuário autenticado e à viagem ativa.<br>- [ ] O aplicativo não deve capturar, salvar ou enviar coordenadas quando não houver viagem ativa.<br>- [ ] A captura e o envio de coordenadas devem funcionar em segundo plano, mesmo com o aplicativo fechado, enquanto houver uma viagem ativa. |
| US-10 | Como viajante, quero inativar uma viagem para que o aplicativo pare de registrar e compartilhar minhas coordenadas. | P0 | - [ ] O viajante deve conseguir inativar uma viagem ativa.<br>- [ ] Após a inativação, o aplicativo deve parar de capturar coordenadas do dispositivo.<br>- [ ] Após a inativação, o aplicativo deve parar de salvar novas coordenadas localmente.<br>- [ ] Após a inativação, o aplicativo deve parar de enviar novas coordenadas para o endpoint.<br>- [ ] O status da viagem deve ser atualizado para “inativa”.<br>- [ ] A viagem deve permanecer disponível para consulta posterior, se permitido pelo sistema. |
| US-11 | Como viajante, quero cancelar uma viagem para que eu possa indicar que ela não será mais realizada ou acompanhada. | P1 | - [ ] O viajante deve conseguir cancelar uma viagem quando permitido pelo status atual.<br>- [ ] O sistema deve solicitar confirmação antes do cancelamento.<br>- [ ] Uma viagem cancelada não deve permitir envio de novas coordenadas.<br>- [ ] Os convidados devem deixar de acompanhar a viagem cancelada. |
| US-12 | Como viajante, quero convidar outro usuário para acompanhar uma viagem para que ele possa visualizar meu deslocamento no mapa. | P0 | - [ ] O viajante deve conseguir informar o usuário convidado, por e-mail ou identificador definido pelo sistema.<br>- [ ] O sistema deve criar um convite vinculado à viagem.<br>- [ ] O convite deve possuir status inicial, como “pendente”.<br>- [ ] O usuário convidado deve conseguir visualizar o convite recebido. |
| US-13 | Como usuário convidado, quero aceitar um convite de acompanhamento de viagem para que eu possa acompanhar a viagem no aplicativo. | P0 | - [ ] O usuário deve conseguir visualizar convites pendentes.<br>- [ ] O usuário deve conseguir aceitar um convite recebido.<br>- [ ] Após o aceite, o convite deve ter seu status atualizado para “aceito”.<br>- [ ] Após aceitar, o usuário deve conseguir visualizar a viagem no mapa. |
| US-14 | Como usuário convidado, quero rejeitar um convite de acompanhamento de viagem para que eu possa não acompanhar uma viagem. | P0 | - [ ] O usuário deve conseguir rejeitar um convite recebido.<br>- [ ] Após a rejeição, o convite deve ter seu status atualizado para “rejeitado”.<br>- [ ] O usuário não deve ter acesso ao mapa da viagem rejeitada.<br>- [ ] A viagem rejeitada não deve aparecer como viagem acompanhada pelo usuário. |
| US-15 | Como usuário convidado, quero excluir uma viagem aceita da minha lista de acompanhamento para que eu pare de acompanhar essa viagem. | P1 | - [ ] O usuário deve conseguir remover uma viagem aceita da sua lista de acompanhamento.<br>- [ ] Após a remoção, a viagem não deve mais aparecer para acompanhamento do usuário.<br>- [ ] A remoção deve afetar apenas o usuário convidado, sem excluir a viagem original do viajante.<br>- [ ] O viajante deve continuar tendo acesso à viagem. |
| US-16 | Como usuário convidado, quero obter as coordenadas de uma viagem aceita para que elas possam ser visualizadas em um mapa no aplicativo. | P0 | - [ ] O aplicativo deve buscar as coordenadas da viagem aceita.<br>- [ ] O sistema deve permitir acesso somente a usuários autorizados.<br>- [ ] As coordenadas devem estar associadas à viagem correta.<br>- [ ] O aplicativo deve exibir os pontos da viagem no mapa. |
| US-17 | Como usuário, quero obter e atualizar as coordenadas da viagem para que o mapa seja atualizado com novos pontos durante o acompanhamento. | P0 | - [ ] O aplicativo deve buscar novas coordenadas periodicamente ou mediante atualização manual.<br>- [ ] O mapa deve ser atualizado quando novas coordenadas forem recebidas.<br>- [ ] A última localização conhecida da viagem deve ser destacada no mapa.<br>- [ ] O sistema deve tratar situações em que não existam novas coordenadas disponíveis. |
| US-18 | Como usuário, quero alterar as informações do meu cadastro após estar logado para que meus dados permaneçam atualizados. | P1 | - [ ] O usuário deve conseguir acessar uma tela de edição dos seus dados cadastrais.<br>- [ ] O sistema deve exibir os dados atuais do usuário.<br>- [ ] O usuário deve conseguir alterar os dados permitidos pelo sistema.<br>- [ ] O sistema deve validar os campos obrigatórios antes de salvar.<br>- [ ] Caso o nome seja alterado, ele deve conter pelo menos duas palavras, como “José Eduardo” ou “Maria Eduarda”.<br>- [ ] Após a alteração, os dados atualizados devem ser exibidos no aplicativo. |

---

## 4. Jornadas do Usuário

### 4.1 Jornada Principal — Acesso ao Aplicativo

<!-- Narrativa passo a passo do fluxo principal na perspectiva do usuário.
     Sem detalhes de implementação técnica aqui. -->

1. O usuário abre o aplicativo.
2. O aplicativo apresenta a tela de Splash enquanto prepara a experiência inicial.
3. O aplicativo realiza o carregamento inicial e verifica se existe uma sessão válida.
4. Caso não exista uma sessão válida, o aplicativo exibe a tela de login.
5. O usuário informa e-mail e senha.
6. O usuário toca no botão **Entrar**.
7. O aplicativo valida as informações informadas pelo usuário.
8. Caso os dados estejam corretos, o aplicativo autentica o usuário com sucesso.
9. O aplicativo mantém as informações necessárias para que o usuário permaneça autenticado em acessos futuros.
10. O aplicativo apresenta a tela inicial.
11. Na tela inicial, o usuário visualiza as opções principais do aplicativo, separadas entre **Minhas Viagens** e **Viagens Acompanhadas**.

#### Resultado Esperado

Ao final desta jornada, o usuário deve estar autenticado e visualizar a tela principal do aplicativo, podendo acessar suas viagens, viagens acompanhadas, convites e demais funcionalidades disponíveis.

---

### 4.1.1 Fluxos Alternativos

#### Usuário já autenticado

1. O usuário abre o aplicativo.
2. O aplicativo apresenta a tela de Splash.
3. O aplicativo verifica que já existe uma sessão válida.
4. O aplicativo realiza o carregamento inicial das informações do usuário.
5. O aplicativo apresenta diretamente a tela inicial, sem solicitar login novamente.

---

#### Login inválido

1. O usuário informa e-mail e senha.
2. O usuário toca no botão **Entrar**.
3. O aplicativo identifica que os dados informados são inválidos.
4. O aplicativo exibe uma mensagem informando que o e-mail ou senha estão incorretos.
5. O usuário pode corrigir os dados e tentar novamente.

---

#### Falha de conexão no login

1. O usuário informa e-mail e senha.
2. O usuário toca no botão **Entrar**.
3. O aplicativo não consegue concluir a autenticação por falta de conexão ou falha de comunicação.
4. O aplicativo exibe uma mensagem amigável informando que não foi possível conectar ao servidor.
5. O usuário pode tentar novamente quando houver conexão disponível.

---

#### Cadastrar novo usuário com sucesso

1. O usuário seleciona a opção para cadastrar um novo usuário.
2. O aplicativo exibe a tela de cadastro de novo usuário.
3. O usuário informa os dados necessários para o cadastro.
4. O usuário seleciona a opção para salvar os dados.
5. O aplicativo valida as informações informadas.
6. O aplicativo envia os dados para cadastro.
7. O sistema recebe a confirmação de que os dados foram validados e salvos com sucesso.
8. O aplicativo retorna para a tela de login.
9. O usuário pode acessar o aplicativo utilizando o e-mail e a senha cadastrados.

---

#### Cadastrar novo usuário com falha

1. O usuário seleciona a opção para cadastrar um novo usuário.
2. O aplicativo exibe a tela de cadastro de novo usuário.
3. O usuário informa os dados necessários para o cadastro.
4. O usuário seleciona a opção para salvar os dados.
5. O aplicativo valida as informações informadas.
6. O aplicativo envia os dados para cadastro.
7. O sistema recebe uma falha ao validar ou salvar os dados.
8. O aplicativo apresenta uma mensagem de erro clara para o usuário.
9. O usuário pode corrigir os dados informados.
10. O usuário pode tentar salvar novamente.

---

#### Recuperar senha com sucesso

1. O usuário seleciona a opção para recuperar senha na tela de login.
2. O aplicativo apresenta a tela de recuperação de senha.
3. O usuário informa o e-mail cadastrado para receber um token de recuperação.
4. O usuário seleciona a opção para enviar o e-mail.
5. O aplicativo envia o e-mail informado para a API.
6. A API envia um token de recuperação para o e-mail do usuário.
7. O aplicativo recebe a confirmação de que o token foi enviado com sucesso.
8. O aplicativo apresenta a tela para informar o token recebido por e-mail.
9. O usuário informa o token recebido.
10. O usuário seleciona a opção para validar o token.
11. O aplicativo verifica se o token informado é igual ao token recebido para validação.
12. Se o token for válido, o aplicativo apresenta a tela de alteração de senha.
13. O usuário informa a nova senha e a confirmação da nova senha.
14. O usuário seleciona a opção para continuar.
15. O aplicativo valida a nova senha e envia a solicitação de alteração.
16. O sistema recebe a confirmação de que a senha foi alterada com sucesso.
17. O aplicativo apresenta uma mensagem de sucesso.
18. O aplicativo retorna para a tela de login.

---

#### Recuperar senha com falha no envio do token

1. O usuário seleciona a opção para recuperar senha na tela de login.
2. O aplicativo apresenta a tela de recuperação de senha.
3. O usuário informa o e-mail cadastrado.
4. O usuário seleciona a opção para enviar o e-mail.
5. O aplicativo envia o e-mail informado para a API.
6. O sistema recebe uma falha ao tentar enviar o token.
7. O aplicativo apresenta uma mensagem de erro clara para o usuário.
8. O usuário pode corrigir o e-mail informado ou tentar novamente.

---

#### Recuperar senha com token inválido

1. O usuário informa o token recebido por e-mail.
2. O usuário seleciona a opção para validar o token.
3. O aplicativo verifica se o token informado é igual ao token recebido para validação.
4. O aplicativo identifica que o token informado é inválido.
5. O aplicativo apresenta uma mensagem informando que o token é inválido.
6. O usuário pode corrigir o token informado ou solicitar um novo token.

---

#### Cadastrar nova viagem com sucesso

1. O usuário seleciona a opção para incluir uma nova viagem.
2. O aplicativo apresenta a tela de cadastro de nova viagem.
3. O usuário informa os dados da viagem.
4. O usuário seleciona a opção para salvar.
5. O aplicativo valida as informações informadas.
6. O aplicativo envia os dados da viagem para a API.
7. O sistema recebe a confirmação de que os dados foram salvos com sucesso.
8. O aplicativo retorna para a tela **Minhas Viagens**.
9. A nova viagem passa a ser exibida na lista de viagens do usuário.

---

#### Cadastrar nova viagem com falha

1. O usuário seleciona a opção para incluir uma nova viagem.
2. O aplicativo apresenta a tela de cadastro de nova viagem.
3. O usuário informa os dados da viagem.
4. O usuário seleciona a opção para salvar.
5. O aplicativo valida as informações informadas.
6. O aplicativo envia os dados da viagem para a API.
7. O sistema recebe uma mensagem de erro ao salvar os dados da viagem.
8. O aplicativo apresenta a mensagem de erro para o usuário.
9. O usuário pode ajustar os dados ou corrigir o problema informado.
10. O usuário pode tentar salvar novamente.

---

#### Ativar uma viagem

1. O usuário acessa a lista **Minhas Viagens**.
2. O usuário seleciona uma viagem.
3. O aplicativo apresenta os dados da viagem e as opções de ação disponíveis.
4. O usuário seleciona a opção para iniciar a viagem.
5. O aplicativo solicita confirmação para iniciar a viagem.
6. O usuário confirma o início da viagem.
7. O aplicativo altera o status da viagem para **ativa**.
8. O aplicativo salva a viagem ativa em cache local.
9. O aplicativo inicia a captura das coordenadas do dispositivo.
10. O aplicativo salva as coordenadas localmente enquanto a viagem estiver ativa.

---

#### Inativar uma viagem

1. O usuário acessa a lista **Minhas Viagens**.
2. O usuário seleciona uma viagem ativa.
3. O aplicativo apresenta os dados da viagem e as opções de ação disponíveis.
4. O usuário seleciona a opção para pausar ou inativar a viagem.
5. O aplicativo solicita confirmação para inativar a viagem.
6. O usuário confirma a pausa ou inativação da viagem.
7. O aplicativo altera o status da viagem para **inativa**.
8. O aplicativo para a captura de coordenadas.
9. O aplicativo deixa de salvar novas coordenadas localmente.
10. A viagem permanece disponível para consulta posterior.

---

#### Cancelar uma viagem

1. O usuário acessa a lista **Minhas Viagens**.
2. O usuário seleciona uma viagem.
3. O aplicativo apresenta os dados da viagem e as opções de ação disponíveis.
4. O usuário seleciona a opção para cancelar a viagem.
5. O aplicativo solicita confirmação para cancelar a viagem.
6. O usuário confirma o cancelamento da viagem.
7. O aplicativo altera o status da viagem para **cancelada**.
8. O aplicativo para a captura de coordenadas, caso a viagem esteja ativa.
9. O aplicativo impede o envio de novas coordenadas para a viagem cancelada.
10. A viagem cancelada permanece disponível para consulta, conforme regra definida para o produto.

---

#### Enviar convite de acompanhamento

1. O usuário acessa a lista **Minhas Viagens**.
2. O usuário seleciona uma viagem.
3. O aplicativo apresenta os dados da viagem e as opções de ação disponíveis.
4. O usuário seleciona a opção para envio de convite de acompanhamento.
5. O aplicativo apresenta uma tela para informar os e-mails dos usuários convidados.
6. O usuário informa um ou mais e-mails para envio do convite.
7. O usuário seleciona a opção para enviar os convites.
8. O aplicativo valida os e-mails informados.
9. O aplicativo envia os dados para a API.
10. A API executa o envio dos convites de acompanhamento.
11. O aplicativo recebe a confirmação de envio dos convites.
12. O aplicativo apresenta uma mensagem de sucesso no envio dos convites.

---

#### Enviar convite de acompanhamento com falha

1. O usuário acessa a lista **Minhas Viagens**.
2. O usuário seleciona uma viagem.
3. O aplicativo apresenta os dados da viagem e as opções de ação disponíveis.
4. O usuário seleciona a opção para envio de convite de acompanhamento.
5. O aplicativo apresenta uma tela para informar os e-mails dos usuários convidados.
6. O usuário informa um ou mais e-mails para envio do convite.
7. O usuário seleciona a opção para enviar os convites.
8. O aplicativo valida os e-mails informados.
9. O aplicativo envia os dados para a API.
10. O sistema recebe uma falha ao enviar os convites.
11. O aplicativo apresenta uma mensagem de erro clara para o usuário.
12. O usuário pode corrigir os e-mails informados ou tentar enviar novamente.

---

#### Alterar dados da viagem com sucesso

1. O usuário acessa a lista **Minhas Viagens**.
2. O usuário seleciona uma viagem.
3. O aplicativo apresenta os dados da viagem selecionada.
4. O usuário altera os dados permitidos da viagem.
5. O usuário seleciona a opção para salvar.
6. O aplicativo valida as informações alteradas.
7. O aplicativo envia os dados atualizados da viagem para a API.
8. O sistema recebe a confirmação de que os dados foram salvos com sucesso.
9. O aplicativo retorna para a lista **Minhas Viagens**.
10. A lista de viagens é apresentada com os dados atualizados.

---

#### Alterar dados da viagem com falha

1. O usuário acessa a lista **Minhas Viagens**.
2. O usuário seleciona uma viagem.
3. O aplicativo apresenta os dados da viagem selecionada.
4. O usuário altera os dados permitidos da viagem.
5. O usuário seleciona a opção para salvar.
6. O aplicativo valida as informações alteradas.
7. O aplicativo envia os dados atualizados da viagem para a API.
8. O sistema recebe uma falha ao salvar os dados da viagem.
9. O aplicativo apresenta uma mensagem de erro clara para o usuário.
10. O usuário pode ajustar os dados da viagem.
11. O usuário pode tentar salvar novamente.

---

#### Excluir viagem com sucesso

1. O usuário acessa a lista **Minhas Viagens**.
2. O usuário seleciona uma viagem.
3. O aplicativo apresenta os dados da viagem selecionada e as opções de ação disponíveis.
4. O usuário seleciona a opção para excluir a viagem.
5. O aplicativo solicita confirmação para exclusão da viagem.
6. O usuário confirma a exclusão.
7. O aplicativo envia a solicitação de exclusão para a API.
8. O sistema recebe a confirmação de que a viagem foi excluída com sucesso.
9. O aplicativo retorna para a lista **Minhas Viagens**.
10. A lista de viagens é apresentada atualizada, sem a viagem excluída.

---

#### Excluir viagem com falha

1. O usuário acessa a lista **Minhas Viagens**.
2. O usuário seleciona uma viagem.
3. O aplicativo apresenta os dados da viagem selecionada e as opções de ação disponíveis.
4. O usuário seleciona a opção para excluir a viagem.
5. O aplicativo solicita confirmação para exclusão da viagem.
6. O usuário confirma a exclusão.
7. O aplicativo envia a solicitação de exclusão para a API.
8. O sistema recebe uma falha ao excluir a viagem.
9. O aplicativo apresenta uma mensagem de erro clara para o usuário.
10. A viagem permanece disponível na lista **Minhas Viagens**.

---

#### Aceitar convite de acompanhamento de viagem

1. O aplicativo apresenta a lista **Viagens Acompanhadas**.
2. O usuário seleciona uma viagem acompanhada com convite pendente.
3. O aplicativo apresenta os dados da viagem em modo somente leitura.
4. O aplicativo apresenta as opções de ação disponíveis para o convite.
5. O usuário seleciona a opção para aceitar o convite.
6. O aplicativo envia o aceite do convite para a API.
7. O sistema recebe a confirmação de aceite do convite.
8. O aplicativo apresenta uma mensagem informando que o convite foi aceito com sucesso.
9. O aplicativo retorna para a lista **Viagens Acompanhadas**.
10. A lista de viagens acompanhadas é apresentada atualizada.

---

#### Rejeitar convite de acompanhamento de viagem

1. O aplicativo apresenta a lista **Viagens Acompanhadas**.
2. O usuário seleciona uma viagem acompanhada com convite pendente.
3. O aplicativo apresenta os dados da viagem em modo somente leitura.
4. O aplicativo apresenta as opções de ação disponíveis para o convite.
5. O usuário seleciona a opção para rejeitar o convite.
6. O aplicativo apresenta uma mensagem de confirmação.
7. O usuário confirma a rejeição do convite.
8. O aplicativo envia a rejeição do convite para a API.
9. O sistema recebe a confirmação de rejeição do convite.
10. O aplicativo apresenta uma mensagem informando que o convite foi rejeitado com sucesso.
11. O aplicativo retorna para a lista **Viagens Acompanhadas**.
12. A lista de viagens acompanhadas é apresentada atualizada.

---

#### Excluir viagem acompanhada

1. O aplicativo apresenta a lista **Viagens Acompanhadas**.
2. O usuário seleciona uma viagem acompanhada.
3. O aplicativo apresenta os dados da viagem em modo somente leitura.
4. O aplicativo apresenta as opções de ação disponíveis.
5. O usuário seleciona a opção para excluir ou remover a viagem da lista de acompanhamento.
6. O aplicativo apresenta uma mensagem de confirmação.
7. O usuário confirma a exclusão ou remoção da viagem acompanhada.
8. O aplicativo envia a solicitação para a API.
9. O sistema recebe a confirmação de que a viagem acompanhada foi removida com sucesso.
10. O aplicativo apresenta uma mensagem informando que a exclusão foi realizada com sucesso.
11. O aplicativo retorna para a lista **Viagens Acompanhadas**.
12. A lista de viagens acompanhadas é apresentada atualizada.

---

#### Exibir mapa com coordenadas da viagem

1. O aplicativo apresenta a lista **Viagens Acompanhadas**.
2. O usuário seleciona uma viagem acompanhada.
3. O aplicativo apresenta os dados da viagem em modo somente leitura.
4. O aplicativo apresenta as opções de ação disponíveis.
5. O usuário seleciona a opção para exibir o mapa.
6. O aplicativo busca as coordenadas da viagem.
7. O aplicativo apresenta o mapa da viagem.
8. O aplicativo exibe no mapa os pontos de coordenadas retornados.
9. O aplicativo destaca a última localização conhecida da viagem.

---

#### Atualizar mapa

1. O usuário está na tela de mapa de uma viagem acompanhada.
2. O usuário seleciona a opção para atualizar as coordenadas da viagem.
3. O aplicativo busca as coordenadas mais recentes da viagem.
4. O aplicativo atualiza os pontos exibidos no mapa.
5. O aplicativo destaca a última localização conhecida da viagem.
6. Caso não existam novas coordenadas, o aplicativo informa que o mapa já está atualizado.

---

#### Atualizar dados do usuário

1. O usuário seleciona a opção para alterar seus dados cadastrais.
2. O aplicativo apresenta os dados atuais do usuário.
3. O aplicativo exibe o e-mail do usuário em modo somente leitura.
4. O usuário modifica as informações permitidas do cadastro.
5. O usuário seleciona a opção para salvar os dados.
6. O aplicativo valida as informações alteradas.
7. O aplicativo envia os dados atualizados para a API.
8. O sistema recebe a confirmação de que os dados foram salvos com sucesso.
9. O aplicativo retorna para a tela principal.
10. Os dados atualizados do usuário passam a ser considerados pelo aplicativo.

---

## 5. Requisitos Funcionais

<!-- O que o produto deve FAZER. Sem COMO. Numerado para rastreabilidade. -->

| ID | Requisito | Prioridade | História Vinculada |
|----|-----------|------------|--------------------|
| RF-01 | O app deve permitir que um novo usuário realize cadastro informando nome, e-mail e senha. | P0 | US-01 |
| RF-02 | O app deve validar que o nome do usuário tenha pelo menos duas palavras. | P0 | US-01 |
| RF-03 | O app deve validar que a senha tenha no mínimo 6 caracteres, contendo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial. | P0 | US-01, US-04 |
| RF-04 | O app deve impedir o cadastro de usuário com e-mail já existente. | P0 | US-01 |
| RF-05 | O app deve solicitar login por e-mail e senha quando não existir uma sessão válida salva localmente. | P0 | US-02, US-03 |
| RF-06 | O app deve manter o usuário autenticado quando existir uma sessão válida salva localmente. | P1 | US-03 |
| RF-07 | O app deve armazenar os tokens de acesso e refresh token em armazenamento seguro do Android. | P0 | US-02, US-03 |
| RF-08 | O app deve permitir que o usuário informe seu e-mail para solicitar a recuperação de senha. | P0 | US-04 |
| RF-09 | O app deve enviar o e-mail informado para a API para que a API gere e envie um token de recuperação de senha ao usuário. | P0 | US-04 |
| RF-10 | O app deve permitir que o usuário informe o token recebido por e-mail. | P0 | US-04 |
| RF-11 | O app deve validar se o token informado pelo usuário é igual ao token recebido para validação. | P0 | US-04 |
| RF-12 | O app deve permitir que o usuário altere sua senha após informar um token válido. | P0 | US-04 |
| RF-13 | O app deve permitir que o usuário logado altere as informações do seu cadastro. | P1 | US-18 |
| RF-14 | O app não deve permitir alteração do e-mail do usuário na tela de edição de cadastro. | P1 | US-18 |
| RF-15 | O app deve permitir que o usuário logado encerre sua sessão. | P1 | US-02 |
| RF-16 | O app deve apagar os dados locais do usuário logado ao realizar logout. | P0 | US-02, US-03 |
| RF-17 | O app deve exibir as viagens cadastradas pelo usuário logado. | P0 | US-05 |
| RF-18 | O app deve salvar localmente as viagens vinculadas ao usuário logado após o carregamento inicial. | P0 | US-03, US-05 |
| RF-19 | O app deve permitir que o usuário logado cadastre uma nova viagem. | P0 | US-05 |
| RF-20 | O app deve criar uma nova viagem com status inicial “pendente”. | P0 | US-05 |
| RF-21 | O app deve permitir que o usuário logado altere as informações de uma viagem cadastrada. | P1 | US-06 |
| RF-22 | O app deve permitir que o usuário logado exclua uma viagem cadastrada e não realizada. | P1 | US-07 |
| RF-23 | O app deve solicitar confirmação antes de excluir uma viagem. | P1 | US-07 |
| RF-24 | O app deve permitir que o usuário logado ative uma viagem cadastrada. | P0 | US-08 |
| RF-25 | O app deve alterar o status da viagem para “ativa” quando o usuário iniciar uma viagem. | P0 | US-08 |
| RF-26 | O app deve salvar localmente a viagem ativa atual. | P0 | US-08 |
| RF-27 | O app deve iniciar a captura das coordenadas do dispositivo quando uma viagem for ativada, por meio de um serviço executado em segundo plano, de forma independente do estado da interface do usuário. | P0 | US-08, US-09 |
| RF-28 | O app deve salvar localmente as coordenadas capturadas enquanto existir uma viagem ativa. | P0 | US-08, US-09 |
| RF-29 | O app deve salvar localmente uma nova coordenada a cada 10 segundos durante uma viagem ativa. | P0 | US-08, US-09 |
| RF-30 | O app deve salvar em cada coordenada local os dados: coordenadaID, data/hora, latitude, longitude e altitude. | P0 | US-08, US-09 |
| RF-31 | O app deve tentar enviar as coordenadas locais pendentes para o endpoint a cada 60 segundos quando houver conexão com a internet, por meio de um serviço executado em segundo plano, de forma independente do estado da interface do usuário. | P0 | US-08, US-09 |
| RF-32 | O app deve enviar para o endpoint os dados: coordenadaID, viagemID, data/hora, latitude, longitude e altitude. | P0 | US-08, US-09 |
| RF-33 | O app deve remover do armazenamento local as coordenadas enviadas com sucesso para a API. | P0 | US-08, US-09 |
| RF-34 | O app deve manter no armazenamento local as coordenadas que não forem enviadas com sucesso. | P0 | US-08, US-09 |
| RF-35 | O app deve associar cada coordenada salva ou enviada ao usuário logado e à viagem ativa. | P0 | US-09 |
| RF-36 | O app deve impedir a captura, armazenamento e envio de coordenadas quando não houver usuário autenticado. | P0 | US-09 |
| RF-37 | O app deve impedir a captura, armazenamento e envio de coordenadas quando não houver viagem ativa. | P0 | US-09 |
| RF-38 | O app deve permitir que o usuário logado inative uma viagem ativa. | P0 | US-10 |
| RF-39 | O app deve alterar o status da viagem para “inativa” quando o usuário inativar uma viagem. | P0 | US-10 |
| RF-40 | O app deve parar a captura de novas coordenadas quando uma viagem for inativada. | P0 | US-10 |
| RF-41 | O app deve permitir que o usuário logado cancele uma viagem. | P1 | US-11 |
| RF-42 | O app deve solicitar confirmação antes de cancelar uma viagem. | P1 | US-11 |
| RF-43 | O app deve parar a captura de coordenadas quando uma viagem ativa for cancelada. | P0 | US-11 |
| RF-44 | O app deve permitir que o viajante envie convite para outro usuário acompanhar uma viagem. | P0 | US-12 |
| RF-45 | O app deve permitir que o viajante informe um ou mais e-mails para envio de convite de acompanhamento. | P0 | US-12 |
| RF-46 | O app deve exibir confirmação quando o convite de acompanhamento for enviado com sucesso. | P0 | US-12 |
| RF-47 | O app deve exibir os convites de acompanhamento recebidos pelo usuário logado. | P0 | US-13, US-14 |
| RF-48 | O app deve permitir que o usuário aceite um convite de acompanhamento de viagem. | P0 | US-13 |
| RF-49 | O app deve permitir que o usuário rejeite um convite de acompanhamento de viagem. | P0 | US-14 |
| RF-50 | O app deve solicitar confirmação antes de rejeitar um convite de acompanhamento. | P1 | US-14 |
| RF-51 | O app deve permitir que o usuário visualize as viagens com convite aceito. | P0 | US-15, US-16 |
| RF-52 | O app deve salvar localmente as viagens acompanhadas vinculadas ao usuário logado após o carregamento inicial. | P0 | US-03, US-16 |
| RF-53 | O app deve permitir que o usuário remova uma viagem aceita da sua lista de acompanhamento. | P1 | US-15 |
| RF-54 | O app deve solicitar confirmação antes de remover uma viagem acompanhada. | P1 | US-15 |
| RF-55 | O app deve exibir, em uma mesma tela, as viagens criadas pelo usuário e as viagens acompanhadas, separadas por opções distintas. | P0 | US-05, US-16 |
| RF-56 | O app deve permitir filtrar as viagens criadas pelo usuário por status. | P1 | US-05 |
| RF-57 | O app deve permitir filtrar as viagens acompanhadas por status, incluindo viagens aceitas e convites ainda não aceitos. | P1 | US-13, US-14, US-16 |
| RF-58 | O app deve permitir visualizar as coordenadas de uma viagem acompanhada em um mapa. | P0 | US-16 |
| RF-59 | O app deve exibir no mapa os pontos registrados durante a viagem acompanhada. | P0 | US-16 |
| RF-60 | O app deve destacar no mapa a última localização conhecida da viagem acompanhada. | P0 | US-17 |
| RF-61 | O app deve permitir atualizar as coordenadas visualizadas no mapa. | P0 | US-17 |
| RF-62 | O app deve informar quando não existirem novas coordenadas disponíveis para atualização do mapa. | P1 | US-17 |
| RF-63 | O app deve restringir a visualização das coordenadas apenas aos usuários autorizados a acompanhar a viagem. | P0 | US-13, US-16 |
| RF-64 | O app deve exibir mensagens de erro ou alerta quando uma operação não puder ser concluída. | P1 | US-01, US-02, US-04, US-05, US-06, US-07, US-09, US-12, US-13, US-14, US-18 |
| RF-65 | O app deve exibir o status atual de cada viagem, como pendente, ativa, inativa, finalizada ou cancelada. | P0 | US-05, US-08, US-10, US-11 |
| RF-66 | O app deve exibir o status atual de cada convite, como pendente, aceito ou rejeitado. | P0 | US-12, US-13, US-14 |
| RF-67 | O app deve permitir que o usuário visualize os dados de uma viagem criada antes de executar ações como alterar, ativar, inativar, cancelar, excluir ou enviar convite. | P0 | US-06, US-07, US-08, US-10, US-11, US-12 |
| RF-68 | O app deve permitir que o usuário visualize os dados de uma viagem acompanhada em modo somente leitura. | P0 | US-13, US-14, US-15, US-16 |
| RF-69 | O app deve exibir mensagens de sucesso após operações concluídas, como cadastro, recuperação de senha, criação de viagem, alteração de viagem, aceite de convite e envio de convite. | P1 | US-01, US-04, US-05, US-06, US-12, US-13, US-18 |
| RF-70 | O app deve executar a captura de coordenadas por meio de um serviço em segundo plano que continue funcionando mesmo que o usuário feche ou minimize o aplicativo, desde que exista uma viagem ativa. | P0 | US-08, US-09 |
| RF-71 | O app deve executar o envio de coordenadas pendentes para o endpoint por meio de um serviço em segundo plano que continue funcionando mesmo que o usuário feche ou minimize o aplicativo, desde que exista uma viagem ativa e haja conexão com a internet. | P0 | US-08, US-09 |

---

## 6. Requisitos Não-Funcionais (Perspectiva de Produto)

<!-- Qualidades observáveis pelo usuário — não restrições de implementação. -->

| Categoria | Requisito | Limiar de Aceite |
|-----------|-----------|------------------|
| Plataforma | O app deve ser desenvolvido exclusivamente para Android nesta versão. | O produto deve ser disponibilizado apenas para dispositivos Android. |
| Plataforma | O app deve seguir padrões de experiência esperados para aplicativos Android. | Navegação, permissões, mensagens, botões e comportamento de retorno devem ser compatíveis com o padrão Android. |
| Desempenho | O app deve iniciar em tempo aceitável em um dispositivo Android intermediário. | Cold start em até 3 segundos em condições normais. |
| Desempenho | O app deve carregar a tela inicial com as viagens do usuário e viagens acompanhadas em tempo aceitável. | Dados exibidos em até 3 segundos quando houver informações locais disponíveis. |
| Desempenho | O app deve exibir dados locais rapidamente enquanto dados atualizados são consultados na API. | Quando houver dados locais disponíveis, eles devem ser exibidos antes ou durante a sincronização com a API. |
| Desempenho | O app deve manter a navegação fluida durante o uso das listas e do mapa. | O usuário não deve perceber travamentos relevantes ao navegar entre telas, listas de viagens e mapa. |
| Armazenamento Local | O armazenamento local deve ser temporário e vinculado ao usuário logado. | Todos os dados locais devem pertencer exclusivamente ao usuário autenticado no momento. |
| Armazenamento Local | Ao carregar o app, as viagens do usuário logado devem ser consultadas na API e salvas na base local do aplicativo. | As viagens retornadas pela API devem ficar disponíveis localmente após o carregamento com sucesso. |
| Armazenamento Local | Ao carregar o app, as viagens acompanhadas pelo usuário devem ser consultadas na API e salvas na base local do aplicativo. | As viagens acompanhadas retornadas pela API devem ficar disponíveis localmente após o carregamento com sucesso. |
| Armazenamento Local | A viagem ativa atual deve ser mantida em cache local enquanto estiver em andamento. | Ao reabrir o app, a viagem ativa deve continuar identificável para o usuário logado. |
| Armazenamento Local | As coordenadas capturadas durante uma viagem ativa devem ser salvas temporariamente na base local do aplicativo até o envio com sucesso. | Cada coordenada pendente deve conter coordenadaID, viagemID, data/hora, latitude, longitude e altitude. |
| Armazenamento Local | Ao realizar logout, o app deve apagar os dados locais vinculados ao usuário logado. | Viagens locais, viagens acompanhadas, convites, coordenadas pendentes, viagem ativa em cache e dados de sessão devem ser removidos. |
| Captura de Localização | O app deve capturar e salvar localmente as coordenadas do dispositivo a cada 10 segundos enquanto houver uma viagem ativa. | Uma nova coordenada deve ser registrada localmente a cada 10 segundos, desde que o app possua permissão de localização e exista viagem ativa. |
| Captura de Localização | A captura de coordenadas e o envio para o endpoint devem continuar funcionando mesmo que o aplicativo seja fechado ou esteja em segundo plano, desde que exista uma viagem ativa. | O rastreamento não deve ser interrompido pelo fechamento do aplicativo. A interrupção deve ocorrer apenas quando a viagem for inativada, finalizada ou cancelada, ou quando o usuário revogar a permissão de localização. |
| Captura de Localização | O app deve interromper a captura de localização quando a viagem for inativada, finalizada ou cancelada. | Nenhuma nova coordenada deve ser capturada após a interrupção da viagem. |
| Captura de Localização | O app deve deixar claro ao usuário quando a localização estiver sendo registrada. | Durante uma viagem ativa, a interface deve indicar que o rastreamento está em andamento. |
| Sincronização | O app deve tentar enviar as coordenadas salvas localmente para o endpoint da API a cada 60 segundos. | A tentativa de envio deve ocorrer a cada 60 segundos enquanto houver coordenadas pendentes e conexão com a internet. |
| Sincronização | O app deve enviar coordenadas para o endpoint somente quando houver conexão com a internet. | Caso não exista conexão, as coordenadas devem permanecer salvas localmente para envio posterior. |
| Sincronização | Após o envio bem-sucedido das coordenadas para a API, o app deve remover da base local as coordenadas já sincronizadas. | Coordenadas enviadas com sucesso não devem permanecer como pendentes na base local. |
| Sincronização | Caso o envio das coordenadas falhe, o app deve manter os dados na base local para nova tentativa posterior. | Nenhuma coordenada deve ser excluída localmente quando o envio para a API falhar. |
| Sincronização | O app deve evitar duplicidade perceptível de coordenadas no acompanhamento da viagem. | Coordenadas já enviadas com sucesso não devem ser reenviadas como novos pontos. |
| Disponibilidade | Algumas funcionalidades devem estar disponíveis mesmo sem conexão com a internet. | O usuário deve conseguir visualizar dados já carregados anteriormente, como minhas viagens, viagens acompanhadas e coordenadas salvas localmente. |
| Disponibilidade | O app deve informar claramente quando não houver conexão com a internet. | Mensagem exibida sempre que uma operação depender de conexão e não puder ser concluída. |
| Disponibilidade | O app deve diferenciar dados locais de dados atualizados quando isso for relevante para o usuário. | Quando uma informação puder estar desatualizada, o app deve indicar a última atualização ou informar que os dados são locais. |
| Conectividade | As informações principais do aplicativo devem ser salvas e consultadas por meio de endpoints de uma API. | Operações como login, cadastro, viagens, convites e sincronização devem comunicar sucesso ou falha ao usuário. |
| Conectividade | O app deve tratar falhas de comunicação com a API de forma clara. | Em caso de erro, timeout ou indisponibilidade, o usuário deve receber mensagem compreensível. |
| Conectividade | O app deve permitir nova tentativa em operações que falharem por conexão ou indisponibilidade temporária. | Erros de rede ou API devem permitir tentar novamente quando aplicável. |
| Permissões | O app deve solicitar as permissões necessárias para seu funcionamento apenas quando forem necessárias. | Permissões de localização devem ser solicitadas de forma contextualizada. |
| Permissões | O app deve explicar ao usuário por que precisa acessar a localização do dispositivo. | O app deve informar que a localização será usada para registrar e compartilhar coordenadas durante viagens ativas. |
| Permissões | O app deve orientar o usuário quando a permissão de localização for negada. | O app deve exibir mensagem explicando que a viagem não poderá ser rastreada sem a permissão necessária. |
| Permissões | O app deve orientar o usuário quando a localização do dispositivo estiver desativada. | O app deve exibir mensagem solicitando a ativação da localização para registrar os pontos da viagem. |
| Segurança | O app deve proteger o acesso às funcionalidades por autenticação. | Funcionalidades de viagem, convites e localização devem exigir usuário autenticado. |
| Segurança | O app não deve permitir acesso a viagens ou coordenadas por usuários não autorizados. | Apenas o viajante e convidados autorizados devem acessar dados da viagem. |
| Segurança | Os tokens de acesso e refresh token devem ser armazenados de forma segura no dispositivo. | Tokens não devem ficar disponíveis em armazenamento local comum ou não protegido. |
| Segurança | Os dados locais de um usuário não devem ser exibidos para outro usuário. | Ao trocar de usuário ou realizar logout, dados locais anteriores não devem ser reaproveitados indevidamente. |
| Privacidade | O app deve compartilhar localização somente quando houver uma viagem ativa. | Nenhuma coordenada deve ser capturada, salva ou enviada sem viagem ativa e usuário logado. |
| Privacidade | O usuário deve conseguir interromper o compartilhamento de localização. | Ao inativar, finalizar ou cancelar a viagem, a captura e o envio de coordenadas devem parar. |
| Privacidade | O app deve deixar claro quem pode acompanhar uma viagem. | Apenas usuários convidados e autorizados devem aparecer como participantes ou acompanhantes da viagem. |
| Privacidade | O app deve evitar compartilhamento público de viagens nesta versão. | Nenhuma viagem deve ser acessível publicamente sem convite e autorização. |
| Usabilidade | O app deve apresentar mensagens claras para erros, alertas e confirmações. | Todas as ações críticas devem apresentar retorno visual compreensível ao usuário. |
| Usabilidade | O app deve solicitar confirmação antes de ações irreversíveis ou sensíveis. | Excluir viagem, cancelar viagem, rejeitar convite, remover acompanhamento e sair da conta devem exigir confirmação. |
| Usabilidade | O app deve apresentar estados vazios claros nas listas. | Listas sem viagens, sem convites ou sem coordenadas devem exibir mensagem orientativa. |
| Usabilidade | O app deve indicar visualmente o status das viagens e convites. | O usuário deve conseguir identificar rapidamente viagens pendentes, ativas, inativas, canceladas e convites pendentes, aceitos ou rejeitados. |
| Usabilidade | O app deve evitar que ações indisponíveis sejam executadas em status incompatíveis. | Ações como ativar, excluir, cancelar ou inativar devem estar disponíveis apenas quando fizerem sentido para o status atual. |
| Acessibilidade | O app deve seguir boas práticas de acessibilidade para Android. | Elementos interativos devem possuir descrição acessível e tamanho adequado para toque. |
| Acessibilidade | O app deve permitir leitura adequada por tecnologias assistivas do Android. | Campos, botões e mensagens principais devem ser compatíveis com leitores de tela. |
| Acessibilidade | O app deve manter contraste adequado entre textos, botões e fundos. | As principais informações devem ser legíveis em diferentes condições de luminosidade. |
| Localização | O app deve utilizar idioma português do Brasil na primeira versão. | Todos os textos da interface devem estar em pt-BR. |
| Localização | Datas, horários e formatos numéricos devem seguir o padrão brasileiro. | Exibir datas, horários e números em formato compatível com pt-BR. |
| Compatibilidade | O app deve funcionar adequadamente em dispositivos Android modernos. | Deve funcionar na versão mínima de Android definida pelo projeto. |
| Compatibilidade | O app deve se adaptar a diferentes tamanhos de tela de smartphones Android. | Telas principais devem permanecer utilizáveis em dispositivos pequenos, médios e grandes. |
| Consistência Visual | O app deve manter uma experiência visual consistente entre telas. | Cores, botões, textos, ícones e estados devem seguir o padrão visual definido para o produto. |
| Feedback ao Usuário | O app deve indicar carregamento em operações que dependem de comunicação com a API. | Operações como login, cadastro, envio de convite, carregamento de viagens e atualização de mapa devem exibir estado de carregamento. |
| Feedback ao Usuário | O app deve exibir mensagens de sucesso após operações concluídas. | Ações como cadastro, alteração de senha, criação de viagem, envio de convite e aceite de convite devem apresentar confirmação. |
| Integridade dos Dados | O app deve evitar exibir dados desatualizados como se fossem atuais. | Quando os dados forem carregados localmente ou estiverem sem atualização recente, o app deve indicar essa condição quando relevante. |
| Integridade dos Dados | O app deve preservar coordenadas pendentes até que o envio seja confirmado com sucesso. | Coordenadas não enviadas não devem ser removidas do armazenamento local. |
| Integridade dos Dados | O app deve limpar dados temporários quando eles não forem mais necessários. | Coordenadas enviadas com sucesso e dados locais após logout devem ser removidos. |
| Consumo de Bateria | O app deve minimizar impacto perceptível no consumo de bateria durante viagens. | A captura de localização a cada 10 segundos deve ser executada sem consumo excessivo de bateria. |
| Consumo de Bateria | O app deve evitar captura de localização quando não houver viagem ativa. | Nenhum rastreamento de localização deve ocorrer fora de uma viagem ativa. |
| Recuperação de Erros | O app deve permitir que o usuário tente novamente operações que falharem. | Erros de rede ou API devem permitir nova tentativa quando aplicável. |
| Recuperação de Erros | O app deve manter o usuário no contexto da ação quando ocorrer uma falha. | Em falhas de cadastro, edição, convite ou viagem, os dados informados devem permanecer disponíveis para correção. |

---

### Observações de Produto

O aplicativo será desenvolvido inicialmente apenas para Android. Nesta versão, o produto deverá priorizar o funcionamento confiável do rastreamento de viagens, mesmo em situações de instabilidade de conexão.

Durante uma viagem ativa, as coordenadas do dispositivo deverão ser capturadas e salvas na base local do aplicativo a cada 10 segundos. O envio dessas coordenadas para a API deverá ocorrer a cada 1 minuto, desde que exista conexão com a internet. Caso o dispositivo esteja sem conexão ou ocorra falha no envio, as coordenadas deverão permanecer armazenadas localmente para uma nova tentativa posterior.

Após o envio bem-sucedido das coordenadas para o endpoint da API, os registros enviados deverão ser removidos da base local do aplicativo, evitando duplicidade de envio e acúmulo desnecessário de dados locais.

Ao carregar o aplicativo, as viagens cadastradas pelo usuário e as viagens acompanhadas deverão ser consultadas nos endpoints da API e salvas localmente. Isso permitirá que o usuário visualize informações já carregadas anteriormente mesmo em momentos sem conexão com a internet.

O compartilhamento de localização deverá ocorrer somente quando o usuário estiver autenticado e possuir uma viagem ativa. Ao inativar, finalizar ou cancelar uma viagem, o aplicativo deverá interromper a captura e o envio das coordenadas.

## 7. UX e Design

### 7.1 Princípios de Design

<!-- De 3 a 5 princípios norteadores das decisões de UX neste produto. -->

1. **Identidade visual inspirada em viagens**  
   A interface deve utilizar uma paleta de cores alinhada ao tema de viagens, aventura, estrada, mapas e deslocamento, transmitindo sensação de movimento, segurança e exploração.

2. **Interface simples, clara e objetiva**  
   O aplicativo deve priorizar telas fáceis de entender, com informações diretas e ações bem visíveis, evitando excesso de elementos visuais que dificultem o uso durante uma viagem.

3. **Componentes com aparência amigável e moderna**  
   Botões, cards, caixas de texto, filtros e demais componentes visuais devem utilizar cantos arredondados para criar uma experiência visual mais leve, moderna e agradável.

4. **Organização clara entre minhas viagens e viagens acompanhadas**  
   A tela principal deve utilizar navegação por abas, como Tab Pages, para separar as viagens criadas pelo usuário das viagens que ele acompanha como convidado.

5. **Prioridade para segurança e controle do usuário**  
   A interface deve deixar claro quando uma viagem está ativa, quando a localização está sendo compartilhada e quando o usuário pode interromper o rastreamento.

6. **Feedback visual para ações importantes**  
   O aplicativo deve apresentar retornos visuais claros para ações como ativar viagem, cancelar viagem, aceitar convite, rejeitar convite, atualizar mapa e enviar coordenadas.

7. **Mapa como elemento central da experiência**  
   A visualização em mapa deve ser tratada como uma funcionalidade principal do produto, destacando os pontos da viagem, a última localização conhecida e o status do acompanhamento.

8. **Consistência visual em todas as telas**  
   Cores, tipografia, botões, ícones, cards, mensagens e estados visuais devem seguir um mesmo padrão para tornar o aplicativo previsível e fácil de usar.

9. **Acessibilidade e legibilidade**  
   Textos, botões e ícones devem ter tamanho adequado, bom contraste e descrições claras, permitindo o uso confortável em diferentes condições de luminosidade.

10. **Experiência adequada ao uso em movimento**  
   O aplicativo deve considerar que o usuário pode estar em deslocamento, portanto as principais ações devem exigir poucos toques e ser fáceis de identificar rapidamente.

### 7.2 Telas / Views Principais

<!-- Liste as telas principais; anexe wireframes ou links do Figma. Sem código de layout. -->

| Tela | Descrição | Link Figma / Wireframe |
|------|-----------|------------------------|
| Splash | Tela inicial exibida ao abrir o aplicativo, enquanto o app realiza o carregamento inicial e verifica se existe uma sessão válida do usuário. | A definir |
| Login | Tela para autenticação do usuário por e-mail e senha. Deve permitir acesso ao cadastro de usuário e recuperação de senha. | A definir |
| Cadastrar Usuário | Tela para criação de uma nova conta no aplicativo, com dados básicos do usuário e definição de senha. | A definir |
| Recuperar Senha | Tela onde o usuário informa seu e-mail para receber um token de recuperação de senha. | A definir |
| Nova Senha | Tela onde o usuário informa o token recebido e cadastra uma nova senha de acesso. | A definir |
| Principal | Tela principal do aplicativo após o login. Deve exibir as opções **Minhas Viagens** e **Viagens Acompanhadas** em abas distintas. | A definir |
| Minhas Viagens | Aba ou seção da tela principal que lista as viagens cadastradas pelo usuário logado, com opção de filtro por status e acesso às ações da viagem. | A definir |
| Viagens Acompanhadas | Aba ou seção da tela principal que lista viagens que o usuário acompanha, convites pendentes e opções para aceitar ou rejeitar convites. | A definir |
| Detalhe da Viagem | Tela para visualizar informações completas de uma viagem, seu status, ações disponíveis e acesso ao mapa. | A definir |
| Cadastrar Viagem | Tela para criar uma nova viagem, informando os dados necessários para seu registro. | A definir |
| Alterar Dados da Viagem | Tela para editar informações de uma viagem cadastrada, desde que seu status permita alteração. | A definir |
| Mapa | Tela para visualizar as coordenadas registradas de uma viagem em um mapa, destacando os pontos do trajeto e a última localização conhecida. | A definir |
| Alterar Dados do Usuário | Tela para o usuário visualizar e atualizar seus dados cadastrais após estar logado. | A definir |

---

### 7.3 Modelo de Navegação

<!-- Descreva como os usuários se movem entre as áreas principais: abas, pilha, drawer, modal, etc. -->

O aplicativo deve utilizar um modelo de navegação simples, organizado e compatível com a experiência esperada em aplicativos Android. A navegação principal deve priorizar o acesso rápido às viagens do usuário, viagens acompanhadas, convites e configurações da conta.

#### Navegação Principal

A tela principal do aplicativo deve utilizar navegação por abas para separar os dois principais contextos de uso:

1. **Minhas Viagens**  
   Exibe as viagens criadas pelo usuário logado, permitindo visualizar, cadastrar, alterar, ativar, inativar, cancelar, excluir e acessar detalhes de uma viagem.

2. **Viagens Acompanhadas**  
   Exibe as viagens que o usuário foi convidado a acompanhar, incluindo viagens aceitas, convites pendentes e viagens acompanhadas anteriormente.

#### Estrutura Geral de Navegação

| Área | Tipo de Navegação | Descrição |
|------|-------------------|-----------|
| Login | Tela inicial condicional | Exibida quando não existir sessão válida salva localmente. |
| Cadastro de Usuário | Pilha de navegação | Acessada a partir da tela de login para criação de nova conta. |
| Recuperação de Senha | Pilha de navegação | Acessada a partir da tela de login para solicitação e validação de token. |
| Tela Principal | Abas / Tab Pages | Exibe “Minhas Viagens” e “Viagens Acompanhadas”. |
| Detalhe da Viagem | Pilha de navegação | Acessada ao selecionar uma viagem na listagem. |
| Cadastro/Edição de Viagem | Tela de formulário | Acessada a partir da tela principal ou do detalhe da viagem. |
| Mapa da Viagem | Pilha de navegação | Exibe as coordenadas da viagem selecionada em um mapa. |
| Convites | Lista ou seção dentro de Viagens Acompanhadas | Exibe convites pendentes, aceitos e rejeitados. |
| Perfil do Usuário | Pilha de navegação ou menu superior | Permite visualizar e alterar dados cadastrais. |
| Configurações | Pilha de navegação ou menu superior | Permite acessar preferências, logout e informações do app. |

#### Fluxo Inicial do Aplicativo

Ao abrir o aplicativo, o sistema deve verificar se existe uma sessão válida salva localmente.

- Se existir sessão válida, o usuário deve ser direcionado para a tela principal.
- Se não existir sessão válida, o usuário deve ser direcionado para a tela de login.
- Durante o carregamento inicial, o app deve sincronizar as viagens do usuário e viagens acompanhadas, quando houver conexão com a internet.
- Caso não haja conexão, o app deve exibir os dados salvos localmente, quando disponíveis.

#### Fluxo de Minhas Viagens

Na aba **Minhas Viagens**, o usuário deve conseguir:

- Visualizar suas viagens cadastradas.
- Filtrar viagens por status.
- Criar uma nova viagem.
- Acessar os detalhes de uma viagem.
- Alterar informações de uma viagem.
- Ativar uma viagem.
- Inativar ou finalizar uma viagem ativa.
- Cancelar uma viagem.
- Excluir uma viagem permitida.
- Convidar outro usuário para acompanhar a viagem.
- Acessar o mapa da viagem.

#### Fluxo de Viagens Acompanhadas

Na aba **Viagens Acompanhadas**, o usuário deve conseguir:

- Visualizar viagens aceitas para acompanhamento.
- Visualizar convites pendentes.
- Filtrar viagens acompanhadas por status.
- Aceitar ou rejeitar convites.
- Remover uma viagem da lista de acompanhamento.
- Acessar o mapa de uma viagem aceita.
- Atualizar as coordenadas exibidas no mapa.

#### Uso de Modais e Confirmações

Ações sensíveis devem utilizar modal ou diálogo de confirmação antes de serem executadas.

Devem exigir confirmação:

- Excluir viagem.
- Cancelar viagem.
- Inativar ou finalizar viagem ativa.
- Rejeitar convite.
- Remover viagem acompanhada.
- Encerrar sessão do usuário.

#### Navegação para Mapa

A tela de mapa deve ser acessada a partir:

- Do detalhe de uma viagem criada pelo usuário.
- De uma viagem acompanhada aceita.
- De uma ação direta na listagem, quando aplicável.

O mapa deve permitir retorno simples para a tela anterior, mantendo o contexto da viagem selecionada.

---

### 7.4 Padrões de Interação

<!-- Convenções nativas da plataforma a seguir: gestos, haptics, transições. -->

O aplicativo deve seguir padrões de interação nativos do Android, garantindo uma experiência familiar, previsível e fácil de usar. As interações devem priorizar clareza, segurança e baixo esforço do usuário.

#### Interações Gerais

| Padrão | Aplicação |
|--------|-----------|
| Toque simples | Deve ser usado para selecionar viagens, abrir detalhes, acionar botões e executar ações principais. |
| Toque longo | Pode ser usado para exibir opções contextuais, quando necessário, mas não deve ser a única forma de acessar ações importantes. |
| Pull to refresh | Deve ser usado para atualizar listas de viagens, convites e coordenadas do mapa quando aplicável. |
| Swipe | Pode ser usado para alternar entre abas, desde que também exista navegação visível por Tab Pages. |
| Botão voltar do Android | Deve retornar para a tela anterior respeitando a pilha de navegação. |
| Confirmação por modal | Deve ser usada para ações sensíveis ou destrutivas. |

#### Feedback Visual

O aplicativo deve fornecer feedback visual claro para todas as ações relevantes.

Exemplos:

- Exibir indicador de carregamento durante login, cadastro, sincronização, envio de convite e carregamento do mapa.
- Exibir mensagem de sucesso após criar viagem, alterar dados, aceitar convite ou finalizar viagem.
- Exibir mensagem de erro quando uma operação falhar.
- Destacar visualmente viagens ativas.
- Indicar quando a localização está sendo capturada e compartilhada.
- Indicar quando existem coordenadas pendentes de envio.
- Indicar quando o app está sem conexão com a internet.

#### Feedback Tátil

Quando disponível no dispositivo, o app pode utilizar feedback tátil discreto em ações importantes.

Exemplos:

- Confirmação de ativação de viagem.
- Confirmação de finalização de viagem.
- Aceite ou rejeição de convite.
- Erros de validação em formulários.
- Ações destrutivas confirmadas.

O feedback tátil não deve ser excessivo nem substituir mensagens visuais.

#### Formulários

Os formulários devem seguir padrões nativos de entrada de dados no Android.

Devem ser aplicados os seguintes padrões:

- Campos obrigatórios devem ser identificados claramente.
- Erros de validação devem ser exibidos próximos ao campo correspondente.
- O teclado exibido deve ser adequado ao tipo de campo, como e-mail, senha, texto ou número.
- Campos de senha devem permitir exibir ou ocultar o conteúdo.
- Ações de salvar devem permanecer visíveis ou facilmente acessíveis.
- O usuário deve receber confirmação após salvar alterações.

#### Listas e Filtros

As listas de viagens e convites devem ser simples e objetivas.

Cada item da lista deve exibir, quando aplicável:

- Nome ou título da viagem.
- Status da viagem.
- Data de início.
- Última atualização.
- Indicação visual se a viagem está ativa.
- Indicação visual se existe convite pendente.

Os filtros devem permitir seleção clara por status e devem possuir opção para limpar o filtro aplicado.

#### Mapa

A tela de mapa deve seguir interações comuns de mapas em dispositivos móveis.

O usuário deve conseguir:

- Mover o mapa com gesto de arrastar.
- Aproximar e afastar com gesto de pinça.
- Visualizar os pontos registrados da viagem.
- Identificar a última localização conhecida.
- Atualizar manualmente as coordenadas, quando aplicável.
- Retornar para a tela anterior sem perder o contexto da viagem.

#### Estados de Tela

As telas devem prever estados claros para diferentes situações.

| Estado | Comportamento Esperado |
|--------|------------------------|
| Carregando | Exibir indicador visual de carregamento. |
| Sem dados | Exibir mensagem explicando que não existem registros disponíveis. |
| Sem conexão | Exibir aviso de falta de internet e permitir uso de dados locais quando disponíveis. |
| Erro | Exibir mensagem clara e, quando possível, opção para tentar novamente. |
| Sucesso | Exibir confirmação visual da ação realizada. |
| Sincronização pendente | Indicar que existem dados locais aguardando envio para a API. |

#### Transições

As transições entre telas devem ser suaves e consistentes com o padrão Android.

Recomendações:

- Usar transições simples entre listas, detalhes e mapa.
- Evitar animações longas ou excessivas.
- Manter o usuário orientado sobre onde está e como retornar.
- Preservar o contexto ao voltar de uma tela de detalhe para a listagem.

#### Ações Destrutivas

Ações destrutivas ou irreversíveis devem ser tratadas com cuidado.

Exemplos:

- Excluir viagem.
- Cancelar viagem.
- Rejeitar convite.
- Remover viagem acompanhada.
- Encerrar sessão.

Essas ações devem:

- Exibir confirmação antes da execução.
- Informar claramente a consequência da ação.
- Diferenciar visualmente ações destrutivas das ações principais.
- Exibir retorno após a conclusão.

---

## 8. Conteúdo e Textos (Copy)

<!-- Strings principais, estados vazios, mensagens de erro como o usuário as vê. Tom, não código. -->

| Contexto | Texto | Tom |
|----------|-------|-----|
| Título do onboarding | Acompanhe suas viagens com mais segurança | Acolhedor |
| Subtítulo do onboarding | Compartilhe sua localização durante uma viagem e permita que pessoas convidadas acompanhem seu trajeto pelo mapa. | Claro |
| Botão principal do onboarding | Começar agora | Direto |
| Tela de login — título | Entrar no aplicativo | Direto |
| Tela de login — subtítulo | Acesse sua conta para gerenciar suas viagens e acompanhar trajetos compartilhados com você. | Informativo |
| Campo de e-mail | E-mail | Neutro |
| Campo de senha | Senha | Neutro |
| Botão de login | Entrar | Direto |
| Link de cadastro | Criar minha conta | Convidativo |
| Link de recuperação de senha | Esqueci minha senha | Útil |
| Erro de login inválido | E-mail ou senha inválidos. Verifique os dados e tente novamente. | Amigável, não técnico |
| Erro de campo obrigatório | Este campo é obrigatório. | Direto |
| Erro de e-mail inválido | Informe um e-mail válido. | Orientativo |
| Erro de nome inválido | Informe seu nome completo, com pelo menos duas palavras. | Orientativo |
| Erro de senha inválida | A senha deve ter no mínimo 6 caracteres, incluindo letra maiúscula, letra minúscula, número e caractere especial. | Orientativo |
| Erro de confirmação de senha | A confirmação da senha deve ser igual à senha informada. | Orientativo |
| Cadastro — título | Criar conta | Direto |
| Cadastro — subtítulo | Cadastre-se para registrar suas viagens e acompanhar viagens compartilhadas com você. | Informativo |
| Cadastro — sucesso | Conta criada com sucesso. Agora você já pode acessar o aplicativo. | Positivo |
| Cadastro — erro e-mail existente | Já existe uma conta cadastrada com este e-mail. | Orientativo |
| Recuperação de senha — título | Recuperar senha | Direto |
| Recuperação de senha — instrução | Informe seu e-mail cadastrado para receber um token de recuperação. | Orientativo |
| Recuperação de senha — sucesso | Enviamos um token de recuperação para o e-mail informado. | Informativo |
| Recuperação de senha — erro envio token | Não foi possível enviar o token de recuperação. Verifique o e-mail e tente novamente. | Amigável, não técnico |
| Validação de token — título | Validar token | Direto |
| Validação de token — instrução | Informe o token recebido no seu e-mail para continuar. | Orientativo |
| Validação de token — botão | Validar token | Direto |
| Erro de token inválido | Token inválido ou expirado. Verifique o código informado ou solicite um novo token. | Orientativo |
| Alteração de senha — título | Criar nova senha | Direto |
| Alteração de senha — instrução | Informe uma nova senha seguindo os critérios de segurança. | Orientativo |
| Alteração de senha — sucesso | Senha alterada com sucesso. Use sua nova senha para acessar o aplicativo. | Positivo |
| Tela principal — aba Minhas Viagens | Minhas viagens | Direto |
| Tela principal — aba Viagens Acompanhadas | Viagens acompanhadas | Direto |
| Estado vazio — sem minhas viagens | Você ainda não cadastrou nenhuma viagem. Crie uma nova viagem para começar. | Útil |
| Estado vazio — sem viagens acompanhadas | Você ainda não acompanha nenhuma viagem. Quando aceitar um convite, ela aparecerá aqui. | Útil |
| Estado vazio — sem convites | Você não possui convites pendentes no momento. | Neutro |
| Botão nova viagem | Nova viagem | Direto |
| Cadastro de viagem — título | Nova viagem | Direto |
| Cadastro de viagem — sucesso | Viagem cadastrada com sucesso. | Positivo |
| Cadastro de viagem — status inicial | Sua viagem foi criada com status pendente. | Informativo |
| Cadastro de viagem — erro | Não foi possível cadastrar a viagem. Verifique os dados e tente novamente. | Amigável, não técnico |
| Edição de viagem — título | Editar viagem | Direto |
| Edição de viagem — sucesso | Viagem atualizada com sucesso. | Positivo |
| Edição de viagem — erro | Não foi possível atualizar a viagem. Verifique os dados e tente novamente. | Amigável, não técnico |
| Exclusão de viagem — confirmação | Deseja excluir esta viagem? Essa ação não poderá ser desfeita. | Cauteloso |
| Exclusão de viagem — sucesso | Viagem excluída com sucesso. | Positivo |
| Exclusão de viagem — erro | Não foi possível excluir a viagem. Tente novamente. | Amigável, não técnico |
| Cancelamento de viagem — confirmação | Deseja cancelar esta viagem? Após o cancelamento, ela não poderá ser acompanhada. | Cauteloso |
| Cancelamento de viagem — sucesso | Viagem cancelada com sucesso. | Positivo |
| Cancelamento de viagem — erro | Não foi possível cancelar a viagem. Tente novamente. | Amigável, não técnico |
| Ativar viagem — confirmação | Deseja iniciar esta viagem e começar o registro da sua localização? | Cauteloso |
| Ativar viagem — sucesso | Viagem ativada. Sua localização será registrada durante o trajeto. | Informativo |
| Ativar viagem — erro | Não foi possível ativar a viagem. Tente novamente. | Amigável, não técnico |
| Inativar viagem — confirmação | Deseja pausar esta viagem e interromper o registro da localização? | Cauteloso |
| Inativar viagem — sucesso | Viagem inativada. O registro da localização foi interrompido. | Informativo |
| Inativar viagem — erro | Não foi possível inativar a viagem. Tente novamente. | Amigável, não técnico |
| Finalizar viagem — confirmação | Deseja finalizar esta viagem e parar o compartilhamento da localização? | Cauteloso |
| Finalizar viagem — sucesso | Viagem finalizada. O compartilhamento da localização foi interrompido. | Informativo |
| Status viagem pendente | Pendente | Neutro |
| Status viagem ativa | Ativa | Informativo |
| Status viagem inativa | Inativa | Neutro |
| Status viagem finalizada | Finalizada | Neutro |
| Status viagem cancelada | Cancelada | Neutro |
| Convite — título | Convite de acompanhamento | Direto |
| Convite — recebido | Você recebeu um convite para acompanhar uma viagem. | Informativo |
| Convite — informar e-mails | Informe os e-mails das pessoas que deseja convidar. | Orientativo |
| Convite — enviar | Enviar convite | Direto |
| Convite — envio sucesso | Convite enviado com sucesso. | Positivo |
| Convite — envio erro | Não foi possível enviar o convite. Verifique os e-mails e tente novamente. | Amigável, não técnico |
| Convite — aceitar | Aceitar convite | Direto |
| Convite — rejeitar | Rejeitar convite | Direto |
| Convite — aceito | Convite aceito. Agora você pode acompanhar a viagem no mapa. | Positivo |
| Convite — rejeição confirmação | Deseja rejeitar este convite de acompanhamento? | Cauteloso |
| Convite — rejeitado | Convite rejeitado. Você não acompanhará esta viagem. | Neutro |
| Convite — erro aceite | Não foi possível aceitar o convite. Tente novamente. | Amigável, não técnico |
| Convite — erro rejeição | Não foi possível rejeitar o convite. Tente novamente. | Amigável, não técnico |
| Remover acompanhamento — confirmação | Deseja remover esta viagem da sua lista de acompanhamento? | Cauteloso |
| Remover acompanhamento — sucesso | Viagem removida da sua lista de acompanhamento. | Neutro |
| Remover acompanhamento — erro | Não foi possível remover a viagem acompanhada. Tente novamente. | Amigável, não técnico |
| Mapa — título | Mapa da viagem | Direto |
| Mapa — última localização | Última localização registrada | Informativo |
| Mapa — atualizar | Atualizar mapa | Direto |
| Mapa — sem coordenadas | Ainda não há coordenadas registradas para esta viagem. | Útil |
| Mapa — atualização sem novos pontos | O mapa já está atualizado. Não há novos pontos no momento. | Neutro |
| Mapa — erro coordenadas | Não foi possível carregar as coordenadas da viagem. Tente novamente. | Amigável, não técnico |
| Coordenadas — registro ativo | Registro de localização em andamento. | Informativo |
| Coordenadas — registro pausado | Registro de localização pausado. | Informativo |
| Coordenadas — pendentes | Existem coordenadas aguardando envio. Elas serão sincronizadas quando houver internet. | Informativo |
| Coordenadas — sincronização concluída | Coordenadas sincronizadas com sucesso. | Positivo |
| Coordenadas — sincronização falhou | Não foi possível sincronizar as coordenadas agora. Elas serão mantidas para nova tentativa. | Amigável, não técnico |
| Sem conexão | Sem conexão com a internet. Alguns dados podem estar desatualizados. | Amigável, não técnico |
| Dados locais | Exibindo informações salvas no dispositivo. | Informativo |
| Dados desatualizados | Estes dados podem estar desatualizados. Atualize quando houver internet. | Informativo |
| Erro de conexão | Não foi possível conectar ao servidor. Verifique sua internet e tente novamente. | Amigável, não técnico |
| Erro genérico | Não foi possível concluir a operação. Tente novamente em alguns instantes. | Amigável, não técnico |
| Erro ao carregar viagens | Não foi possível carregar suas viagens. Tente novamente. | Útil |
| Erro ao carregar convites | Não foi possível carregar seus convites. Tente novamente. | Útil |
| Erro ao carregar mapa | Não foi possível carregar o mapa da viagem. Tente novamente. | Útil |
| Erro de permissão de localização | Para registrar sua viagem, permita o acesso à localização do dispositivo. | Orientativo |
| Permissão de localização — explicação | Usamos sua localização apenas durante viagens ativas para registrar os pontos do trajeto. | Transparente |
| Permissão de localização — negada | Sem a permissão de localização, não será possível registrar os pontos da viagem. | Orientativo |
| Localização desativada | Ative a localização do dispositivo para registrar os pontos da viagem. | Orientativo |
| Ação indisponível | Esta ação não está disponível para o status atual da viagem. | Orientativo |
| Logout — confirmação | Deseja sair da sua conta? Os dados salvos localmente serão removidos deste dispositivo. | Cauteloso |
| Logout — sucesso | Você saiu da sua conta. | Neutro |
| Perfil — título | Meu perfil | Direto |
| Perfil — e-mail bloqueado | O e-mail não pode ser alterado. | Informativo |
| Perfil — salvar | Salvar alterações | Direto |
| Perfil — sucesso | Seus dados foram atualizados com sucesso. | Positivo |
| Perfil — erro | Não foi possível atualizar seus dados. Verifique as informações e tente novamente. | Amigável, não técnico |
| Botão cancelar | Cancelar | Direto |
| Botão confirmar | Confirmar | Direto |
| Botão continuar | Continuar | Direto |
| Botão salvar | Salvar | Direto |
| Botão excluir | Excluir | Direto |
| Botão tentar novamente | Tentar novamente | Direto |
| Botão voltar | Voltar | Direto |

---

### Diretrizes de Tom de Voz

O aplicativo deve utilizar uma comunicação clara, objetiva e amigável. As mensagens devem evitar termos técnicos sempre que possível e orientar o usuário sobre o que aconteceu e qual ação ele pode tomar.

#### Recomendações

- Usar frases curtas e diretas.
- Evitar termos técnicos como `endpoint`, `token expirado pelo servidor`, `erro HTTP` ou `falha de sincronização`.
- Explicar situações de erro de forma simples.
- Confirmar ações importantes com mensagens claras.
- Informar quando a localização estiver sendo compartilhada.
- Reforçar que a localização será usada apenas durante viagens ativas.
- Usar tom calmo em mensagens de erro.
- Usar tom cauteloso em ações sensíveis, como excluir, cancelar ou finalizar viagens.

## 9. Analytics e Acompanhamento de Sucesso

<!-- Eventos a rastrear na perspectiva de produto. Os nomes finais serão definidos na Spec Técnica. -->

| Evento | Gatilho | Por que importa |
|--------|---------|-----------------|
| app_aberto | Usuário abre o app | Mede uso geral do aplicativo e serve como base para usuários ativos. |
| usuario_cadastrado | Usuário conclui o cadastro com sucesso | Mede conversão de novos usuários. |
| login_realizado | Usuário realiza login com sucesso | Mede acesso autenticado ao aplicativo. |
| login_falhou | Tentativa de login não é concluída | Ajuda a identificar problemas de acesso, credenciais ou experiência de login. |
| recuperacao_senha_solicitada | Usuário solicita recuperação de senha por e-mail | Mede necessidade de recuperação de conta. |
| senha_alterada | Usuário altera a senha com sucesso usando token | Mede conclusão do fluxo de recuperação de senha. |
| viagem_criada | Usuário cadastra uma nova viagem | Mede adoção da funcionalidade principal pelo viajante. |
| viagem_alterada | Usuário altera dados de uma viagem cadastrada | Mede uso de manutenção e gerenciamento das viagens. |
| viagem_excluida | Usuário exclui uma viagem cadastrada | Ajuda a entender desistências ou cadastros incorretos. |
| viagem_ativada | Usuário ativa uma viagem | Mede início real do fluxo principal de rastreamento. |
| viagem_finalizada | Usuário inativa ou finaliza uma viagem ativa | Mede conclusão do ciclo de uma viagem acompanhada. |
| viagem_cancelada | Usuário cancela uma viagem | Ajuda a entender interrupções antes ou durante o acompanhamento. |
| coordenada_salva_localmente | App salva coordenada na base local durante viagem ativa | Mede se a captura local de localização está funcionando. |
| coordenadas_enviadas_api | App envia coordenadas com sucesso para a API | Mede sucesso da sincronização de localização. |
| envio_coordenadas_falhou | App tenta enviar coordenadas e não consegue | Ajuda a identificar falhas de conexão, API ou sincronização. |
| coordenadas_pendentes_sincronizacao | Existem coordenadas locais aguardando envio | Ajuda a acompanhar o acúmulo de dados pendentes. |
| convite_enviado | Viajante envia convite para acompanhamento de viagem | Mede compartilhamento da viagem com outros usuários. |
| convite_aceito | Usuário convidado aceita acompanhar uma viagem | Mede conversão de convite em acompanhamento real. |
| convite_rejeitado | Usuário convidado rejeita acompanhar uma viagem | Ajuda a entender rejeição de convites. |
| viagem_acompanhada_aberta | Usuário abre uma viagem acompanhada | Mede interesse e uso da funcionalidade de acompanhamento. |
| mapa_aberto | Usuário abre o mapa de uma viagem | Mede uso da visualização principal de acompanhamento. |
| mapa_atualizado | Usuário atualiza manualmente as coordenadas no mapa | Mede necessidade de atualização manual e uso do mapa. |
| filtro_minhas_viagens_usado | Usuário filtra suas viagens por status | Mede uso de organização e consulta das viagens. |
| filtro_viagens_acompanhadas_usado | Usuário filtra viagens acompanhadas ou convites | Mede uso de organização na área de acompanhamento. |
| perfil_atualizado | Usuário altera dados do seu cadastro | Mede uso da manutenção de perfil. |
| logout_realizado | Usuário encerra a sessão | Mede encerramento voluntário da sessão. |
| erro_generico_exibido | App exibe mensagem de erro genérico | Ajuda a monitorar problemas recorrentes na experiência. |
| app_sem_conexao_exibido | App identifica ausência de internet | Ajuda a entender impacto de uso offline ou instabilidade de conexão. |
| permissao_localizacao_solicitada | App solicita permissão de localização | Mede exposição ao pedido de permissão essencial. |
| permissao_localizacao_concedida | Usuário concede permissão de localização | Mede viabilidade do rastreamento. |
| permissao_localizacao_negada | Usuário nega permissão de localização | Ajuda a identificar barreiras para uso da funcionalidade principal. |

---

### 9.1 KPIs

| KPI | Linha de base | Meta após 8 semanas |
|-----|---------------|---------------------|
| Usuários cadastrados | 0 usuários | Alcançar pelo menos 50 usuários cadastrados. |
| Taxa de conclusão de cadastro | Sem linha de base inicial | Pelo menos 80% dos usuários que iniciarem o cadastro devem concluí-lo. |
| Taxa de login bem-sucedido | Sem linha de base inicial | Pelo menos 90% das tentativas de login devem ser concluídas com sucesso. |
| Viagens criadas | 0 viagens | Alcançar pelo menos 30 viagens cadastradas. |
| Viagens ativadas | 0 viagens ativas | Pelo menos 60% das viagens cadastradas devem ser ativadas. |
| Viagens finalizadas corretamente | 0 viagens finalizadas | Pelo menos 70% das viagens ativadas devem ser finalizadas ou inativadas pelo usuário. |
| Convites enviados | 0 convites | Pelo menos 20 convites enviados para acompanhamento. |
| Taxa de aceite de convites | Sem linha de base inicial | Pelo menos 50% dos convites enviados devem ser aceitos. |
| Viagens acompanhadas com mapa aberto | 0 viagens acompanhadas | Pelo menos 70% das viagens aceitas devem ter o mapa aberto ao menos uma vez. |
| Sucesso no envio de coordenadas | Sem linha de base inicial | Pelo menos 95% das tentativas de envio devem ser concluídas com sucesso quando houver internet. |
| Coordenadas pendentes por mais de 24 horas | Sem linha de base inicial | Menos de 5% das coordenadas devem permanecer pendentes por mais de 24 horas. |
| Permissão de localização concedida | Sem linha de base inicial | Pelo menos 80% dos usuários que ativarem uma viagem devem conceder permissão de localização. |
| Erros críticos no fluxo principal | Sem linha de base inicial | Menos de 3% das sessões devem apresentar erro crítico em login, ativação de viagem ou envio de coordenadas. |
| Retenção de usuários | Sem linha de base inicial | Pelo menos 30% dos usuários cadastrados devem retornar ao app em até 7 dias. |

---

### Observações de Produto

Os eventos de analytics devem ser usados para acompanhar se o aplicativo está cumprindo seu objetivo principal: permitir que um viajante registre uma viagem, compartilhe suas coordenadas e permita que convidados acompanhem o trajeto em um mapa.

Os KPIs mais importantes para validar o sucesso do produto nesta primeira versão são:

- Quantidade de viagens criadas.
- Quantidade de viagens ativadas.
- Taxa de sucesso no envio das coordenadas.
- Quantidade de convites enviados.
- Taxa de aceite dos convites.
- Uso do mapa pelos convidados.
- Baixa quantidade de erros no fluxo principal.

Como o produto ainda não possui linha de base, os primeiros indicadores deverão servir também para aprendizado e ajuste das metas futuras. Após as primeiras semanas de uso, as metas poderão ser revisadas com base no comportamento real dos usuários.

## 10. Monetização e Modelo de Negócio

<!-- Precificação, posicionamento de paywall, camadas gratuita vs. paga — decisões de produto apenas. -->

Nesta versão, o aplicativo será disponibilizado de forma gratuita, sem anúncios, sem compras internas e sem cobrança por funcionalidades. O objetivo principal é validar o produto, permitir o uso próprio e disponibilizar a solução para outras pessoas interessadas em registrar e acompanhar viagens.

| Item | Decisão |
|------|---------|
| Modelo de monetização | Gratuito |
| Anúncios | Não haverá anúncios nesta versão |
| Compras internas | Não haverá compras internas nesta versão |
| Assinatura | Não haverá plano de assinatura nesta versão |
| Paywall | Não haverá bloqueio de funcionalidades por pagamento |
| Público-alvo inicial | Usuários que desejam registrar viagens e compartilhar localização com pessoas convidadas |
| Objetivo de negócio inicial | Validar o uso do produto, a utilidade do rastreamento e o interesse de outros usuários |

### 10.1 Camada Gratuita

Todas as funcionalidades previstas para a primeira versão estarão disponíveis gratuitamente para os usuários.

Funcionalidades incluídas:

- Cadastro de usuário.
- Login e recuperação de senha.
- Cadastro de viagens.
- Alteração, exclusão, ativação, inativação e cancelamento de viagens.
- Envio de convites para acompanhamento.
- Aceite ou rejeição de convites.
- Acompanhamento de viagens em mapa.
- Captura local de coordenadas.
- Envio de coordenadas para a API.
- Visualização de viagens próprias e viagens acompanhadas.

### 10.2 Estratégia Inicial

A estratégia inicial do produto será focada em adoção, aprendizado e validação. Como o aplicativo não terá cobrança nesta versão, o sucesso será medido principalmente pelo uso real das funcionalidades principais, como criação de viagens, ativação do rastreamento, envio de convites e acompanhamento pelo mapa.

### 10.3 Possibilidades Futuras

Embora a primeira versão seja totalmente gratuita, futuras versões poderão avaliar modelos de monetização, caso exista demanda e crescimento de uso.

Possibilidades futuras, fora do escopo desta versão:

- Plano premium para histórico avançado de viagens.
- Compartilhamento público de rotas.
- Exportação de trajetos.
- Relatórios detalhados de viagem.
- Armazenamento ampliado de histórico.
- Recursos para grupos, motoclubes ou equipes.
- Integração com redes sociais.

Essas possibilidades não fazem parte da versão atual e deverão ser avaliadas somente após validação do produto e entendimento do comportamento dos usuários.

## 11. Riscos e Premissas

| # | Tipo | Descrição | Mitigação |
|---|------|-----------|-----------|
| R-01 | Premissa sobre usuário | Usuários viajantes terão interesse em registrar viagens e compartilhar sua localização com pessoas convidadas. | Validar com uso próprio, testes com usuários próximos e acompanhamento dos eventos de criação, ativação e finalização de viagens. |
| R-02 | Premissa sobre usuário | Familiares, amigos ou convidados terão interesse em acompanhar viagens pelo mapa dentro do aplicativo. | Validar pela taxa de aceite de convites, abertura do mapa e frequência de atualização das viagens acompanhadas. |
| R-03 | Premissa sobre usuário | Os usuários aceitarão conceder permissão de localização para que o app registre as coordenadas durante uma viagem ativa. | Explicar claramente o motivo da permissão e rastrear a taxa de permissão concedida ou negada. |
| R-04 | Premissa técnica | O dispositivo Android conseguirá capturar coordenadas a cada 10 segundos durante uma viagem ativa com precisão suficiente. | Testar em diferentes dispositivos Android, versões do sistema, condições de sinal GPS e cenários de deslocamento. |
| R-05 | Premissa técnica | A estratégia de salvar coordenadas localmente e enviar para a API a cada 1 minuto será suficiente para manter o acompanhamento útil. | Validar em testes reais de viagem e ajustar a frequência de captura ou envio caso necessário. |
| R-06 | Risco de conectividade | Durante viagens, o usuário pode passar por áreas sem internet, impedindo o envio imediato das coordenadas. | Salvar coordenadas localmente, manter fila de sincronização e enviar os dados automaticamente quando houver conexão. |
| R-07 | Risco de sincronização | Coordenadas podem não ser enviadas corretamente para a API, gerando atraso ou perda no acompanhamento da viagem. | Manter registros pendentes na base local até confirmação de envio bem-sucedido e permitir nova tentativa automática. |
| R-08 | Risco de duplicidade | Coordenadas podem ser enviadas mais de uma vez em caso de falha parcial ou resposta inconsistente da API. | Definir identificador único para cada coordenada e garantir controle de sincronização para evitar duplicidade no servidor. |
| R-09 | Risco de perda de dados | Coordenadas salvas localmente podem ser perdidas se o app for desinstalado, tiver dados apagados ou ocorrer falha local. | Informar que dados pendentes dependem da base local e priorizar sincronização sempre que houver internet. |
| R-10 | Risco de bateria | A captura de localização a cada 10 segundos pode aumentar o consumo de bateria durante viagens longas. | Monitorar consumo em testes reais, informar ao usuário quando a viagem estiver ativa e avaliar otimizações futuras. |
| R-11 | Risco de permissão | O usuário pode negar a permissão de localização, impedindo a funcionalidade principal de rastreamento. | Exibir mensagem clara explicando que a localização é necessária apenas durante viagens ativas. |
| R-12 | Risco de privacidade | Usuários podem se preocupar com o compartilhamento da localização em tempo real ou com acesso indevido aos dados da viagem. | Compartilhar localização apenas com viagem ativa, usuário autenticado e convidados autorizados; deixar claro quando o rastreamento estiver ativo. |
| R-13 | Risco de segurança | Pessoas não autorizadas podem tentar acessar coordenadas ou viagens de outros usuários. | Exigir autenticação, validar permissões no backend e permitir acesso apenas ao viajante e convidados autorizados. |
| R-14 | Risco de usabilidade | Usuários podem não entender a diferença entre viagem cadastrada, ativa, finalizada, cancelada ou acompanhada. | Utilizar textos claros, status visuais, filtros e mensagens explicativas em cada ação importante. |
| R-15 | Risco de adoção | O aplicativo pode ter baixa adesão se o fluxo de cadastro, convite ou aceite for considerado complexo. | Simplificar o onboarding, reduzir etapas obrigatórias e medir abandono nos fluxos principais. |
| R-16 | Risco de acompanhamento | Convidados podem não acompanhar a viagem se precisarem instalar o app e criar conta antes de aceitar o convite. | Avaliar futuramente fluxo simplificado de convite, mas manter autenticação na primeira versão por segurança. |
| R-17 | Risco de precisão | O GPS pode registrar coordenadas imprecisas em áreas urbanas, túneis, serras, áreas fechadas ou locais com baixa visibilidade de satélite. | Exibir última localização registrada e horário da atualização, evitando comunicar precisão absoluta. |
| R-18 | Risco de experiência offline | O usuário pode esperar que o acompanhamento funcione totalmente offline, mesmo sem envio para a API. | Deixar claro que dados locais podem ser visualizados, mas o acompanhamento por convidados depende de sincronização com internet. |
| R-19 | Risco operacional | A API pode ficar indisponível e impedir login, sincronização, convites ou atualização do mapa. | Exibir mensagens amigáveis, manter dados locais quando possível e permitir nova tentativa quando a API voltar. |
| R-20 | Risco de escala | O volume de coordenadas pode crescer rapidamente em viagens longas ou com muitos usuários ativos. | Monitorar volume de dados, taxa de envio e armazenamento; avaliar políticas futuras de retenção e compactação de histórico. |
| R-21 | Risco legal/LGPD | Dados de localização são sensíveis e podem exigir cuidado adicional com consentimento, finalidade e controle de acesso. | Informar finalidade do uso da localização, restringir acesso por autorização e prever termos de uso e política de privacidade. |
| R-22 | Premissa de produto | A primeira versão gratuita, sem anúncios e sem compras internas, será suficiente para validar interesse e utilidade do produto. | Acompanhar KPIs de uso, retenção, convites aceitos e viagens ativadas antes de avaliar monetização futura. |
| R-23 | Premissa de plataforma | Desenvolver apenas para Android atenderá ao público inicial do produto. | Validar perfil dos usuários interessados e avaliar versão iOS somente após validação da primeira versão. |
| R-24 | Risco de manutenção | O app pode exigir ajustes frequentes por mudanças de permissões, políticas de background location ou versões do Android. | Considerar essas limitações na especificação técnica e testar em versões Android suportadas. |
| R-25 | Risco de notificação | Usuários podem não perceber convites recebidos ou mudanças importantes no status da viagem. | Avaliar uso de notificações em versão futura ou destacar convites pendentes na tela principal. |

---

### Principais Premissas

- O usuário viajante deseja compartilhar sua localização de forma controlada durante uma viagem.
- O usuário convidado aceita acompanhar uma viagem dentro do aplicativo.
- A autenticação é necessária para garantir segurança e controle de acesso.
- A localização só deve ser capturada e enviada quando houver uma viagem ativa.
- A base local será suficiente para armazenar coordenadas pendentes até a sincronização.
- A conexão com a internet pode falhar durante viagens, por isso o app precisa funcionar parcialmente offline.
- O desenvolvimento inicial apenas para Android é suficiente para validar o produto.
- O modelo gratuito será adequado para a primeira versão.

### Principais Riscos

- Negação da permissão de localização.
- Consumo elevado de bateria.
- Falhas de conexão durante viagens.
- Atrasos na sincronização das coordenadas.
- Baixa adesão de convidados por necessidade de cadastro.
- Dificuldade de entendimento dos status da viagem.
- Preocupações com privacidade e segurança dos dados de localização.
- Dependência da disponibilidade da API.
- Crescimento do volume de coordenadas armazenadas e sincronizadas.

---

## 12. Questões em Aberto
<!-- Perguntas que precisam ser resolvidas antes ou durante o desenvolvimento. Responsável + prazo. -->

| # | Pergunta | Responsável | Prazo |
|---|----------|-------------|-------|

---

## 13. Histórico de Revisões

| Versão | Data | Autor | Resumo |
|--------|------|-------|--------|
| 0.1.0 | 2026-06-04 | Jose Julio | Rascunho inicial |

