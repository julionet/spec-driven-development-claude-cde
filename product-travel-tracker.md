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

Texto complementar para a especificação:
O sucesso desta iniciativa será medido pela capacidade do aplicativo de centralizar todo o fluxo de acompanhamento de viagens em uma única solução. O aplicativo deverá permitir que o viajante registre uma viagem, compartilhe sua localização durante o trajeto e convide outras pessoas para acompanhar o deslocamento.
Para que o acompanhamento seja seguro e controlado, os convidados deverão receber um convite de rastreamento e poderão aceitar ou rejeitar a solicitação. Somente após o aceite, o usuário convidado poderá visualizar os pontos compartilhados pelo viajante em um mapa dentro do próprio aplicativo.
Dessa forma, a iniciativa será considerada bem-sucedida quando o aplicativo permitir, de ponta a ponta, o registro da viagem, o envio da localização para um endpoint, o gerenciamento de convites e a visualização do trajeto por usuários autorizados.

### 1.4 Não-Objetivos
<!-- Lista explícita do que este produto NÃO pretende resolver nesta versão. -->

- 

---

## 2. Usuários-Alvo

### 2.1 Usuário Primário
<!-- Quem é o usuário principal? Papel, contexto, dispositivo, nível de familiaridade com tecnologia. -->

**Quem:** [Papel / nome da persona]  
**Contexto:** [Onde e quando usa o app]  
**Motivação:** [O que tenta realizar]  
**Frustração hoje:** [O que está quebrado ou faltando]

### 2.2 Usuários Secundários
<!-- Outros usuários que interagem com o produto, mesmo que indiretamente. -->

| Usuário | Relação com o produto | Principal necessidade |
|---------|-----------------------|-----------------------|
|         |                       |                       |

---

## 3. Histórias de Usuário

<!-- Formato: Como [usuário], quero [ação] para que [resultado].
     Prioridade: P0 = deve entregar / P1 = deveria entregar / P2 = seria bom ter -->

| ID | História | Prioridade | Critérios de Aceite |
|----|----------|------------|---------------------|
| US-01 | Como [usuário], quero [ação] para que [resultado]. | P0 | - [ ] critério 1<br>- [ ] critério 2 |
| US-02 |  | P1 |  |

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

