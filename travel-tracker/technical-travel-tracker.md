# Especificação Técnica

> **Tipo de documento:** Spec Técnica  
> **Status:** `rascunho` | `revisão` | `aprovado` | `descontinuado`  
> **Versão:** 0.1.0  
> **Última atualização:** 2026-06-04
> **Tech Lead:** Jose Julio
> **Spec de Produto vinculada:** product-travel-tracker.md (./product-travel-tracker.md)  
> **Plataforma:** `Android`
> **Linguagem / Framework:** Kotlin / Jetpack Compose

---

## 1. Visão Geral da Arquitetura

### 1.1 Padrão Arquitetural

<!-- ex.: MVVM, MVI, Clean Architecture, TCA, VIPER, Composable Architecture -->

**Padrão:** MVVM — Model-View-ViewModel

**Justificativa:**  
O padrão arquitetural escolhido para o aplicativo será o **MVVM**, por ser amplamente utilizado no desenvolvimento de aplicativos Android e por oferecer uma boa separação de responsabilidades entre interface, regras de apresentação e dados.

Esse padrão facilita a organização do projeto, melhora a manutenção do código e torna o desenvolvimento mais previsível, principalmente em aplicativos que possuem telas com formulários, listas, estados de carregamento, mapas, autenticação e sincronização de dados.

No contexto deste produto, o MVVM é adequado porque permite que as telas do aplicativo sejam responsáveis apenas pela exibição das informações e interação com o usuário, enquanto as regras de apresentação, validações, estados da tela e comunicação com as camadas de dados ficam concentradas no ViewModel.

Além disso, o MVVM possui boa aderência às práticas modernas do Android, sendo compatível com componentes como ViewModel, LiveData, StateFlow, Coroutines e bibliotecas de persistência local. Isso torna sua implementação mais simples, padronizada e alinhada com aplicações Android utilizadas no mercado.

#### Benefícios Esperados

- Melhor separação entre interface e regras de apresentação.
- Facilidade para manter e evoluir o aplicativo.
- Melhor organização das telas e seus estados.
- Facilidade para trabalhar com carregamento, erro, sucesso e dados vazios.
- Maior testabilidade das regras de apresentação.
- Boa compatibilidade com recursos modernos do Android.
- Curva de aprendizado menor para desenvolvedores Android.

#### Aplicação no Produto

O MVVM deverá ser aplicado nas principais áreas do aplicativo, como:

- Login e autenticação.
- Cadastro de usuário.
- Recuperação de senha.
- Listagem de minhas viagens.
- Listagem de viagens acompanhadas.
- Cadastro e edição de viagem.
- Gerenciamento de convites.
- Exibição do mapa.
- Captura e sincronização de coordenadas.

### 1.2 Diagrama de Componentes (Alto Nível)

<!-- Diagrama ASCII ou Mermaid mostrando as camadas principais e seus relacionamentos. -->

O diagrama proposto está correto como visão inicial, porém pode ser ajustado para representar melhor a arquitetura do aplicativo Android com **MVVM**, separação de responsabilidades, uso de API remota e base local para cache/sincronização das coordenadas.

A estrutura recomendada é:

```text
┌────────────────────────────────────────────────────────────┐
│                    Camada de Apresentação                   │
│                                                            │
│  Activities / Fragments / Composables / Views              │
│  ViewModels                                                │
│  Estados de Tela / Eventos de UI                           │
└───────────────────────────────┬────────────────────────────┘
                                │
                                ▼
┌────────────────────────────────────────────────────────────┐
│                       Camada de Domínio                     │
│                                                            │
│  Casos de Uso                                              │
│  Regras de Negócio                                         │
│  Entidades de Domínio                                      │
│                                                            │
│  Exemplos:                                                 │
│  - Autenticar usuário                                      │
│  - Cadastrar viagem                                        │
│  - Ativar viagem                                           │
│  - Enviar convite                                          │
│  - Aceitar convite                                         │
│  - Registrar coordenada                                    │
│  - Sincronizar coordenadas                                 │
└───────────────────────────────┬────────────────────────────┘
                                │
                                ▼
┌────────────────────────────────────────────────────────────┐
│                        Camada de Dados                      │
│                                                            │
│  Repositórios                                              │
│  Mapeadores                                                │
│  Fontes de Dados Remotas                                   │
│  Fontes de Dados Locais                                    │
└───────────────┬──────────────────────────────┬─────────────┘
                │                              │
                ▼                              ▼
┌──────────────────────────────┐   ┌─────────────────────────┐
│        Fonte Remota           │   │       Fonte Local        │
│                              │   │                         │
│  Cliente HTTP / API REST      │   │  Banco local do app      │
│  Endpoints de autenticação    │   │  Cache de sessão         │
│  Endpoints de viagens         │   │  Cache de viagens        │
│  Endpoints de convites        │   │  Coordenadas pendentes   │
│  Endpoints de coordenadas     │   │  Dados sincronizados     │
└──────────────────────────────┘   └─────────────────────────┘
```

### 1.3 Estrutura de Módulos / Pacotes
<!-- Liste os módulos/targets de nível superior e suas responsabilidades. -->

| Módulo | Responsabilidade |
|--------|-----------------|
| `App` | Ponto de entrada, raiz de DI, host de navegação |
| `Features/[NomeDaFeature]` | Fatia vertical autocontida por feature |
| `Core/Network` | Cliente de API, interceptores, autenticação |
| `Core/Persistence` | Banco de dados local, armazenamento de arquivos |
| `Core/Analytics` | Abstração de rastreamento de eventos |
| `DesignSystem` | Componentes de UI reutilizáveis, tokens de tema |
| `SharedDomain` | Entidades compartilhadas, protocolos/interfaces |

---

## 2. Plataforma e Ambiente

### 2.1 Versões Mínimas de SO
| Plataforma | Versão Mínima | Justificativa |
|------------|---------------|---------------|
| Android | API 30 | |

### 2.2 Dispositivos-Alvo
<!-- Fatores de forma, tamanhos de tela e orientações suportadas. -->

| Fator de forma | Suportado | Observações |
|----------------|-----------|-------------|
| Celular (retrato) | ✅ | Principal |
| Tablet | ⬜ | Opcional |

### 2.3 Ambientes de Build
| Ambiente | Finalidade | URL Base / Configuração |
|----------|------------|-------------------------|
| `desenvolvimento` | Dev local + QA | |
| `homologação` | Validação pré-lançamento | |
| `produção` | Usuários em produção | |

---

## 3. Gerenciamento de Dependências

### 3.1 Dependências de Terceiros
<!-- Liste apenas bibliotecas externas. Módulos internos ficam na seção 1.3. -->

| Biblioteca | Versão | Finalidade | Licença |
|------------|--------|------------|---------|

### 3.2 Restrições de Dependências
<!-- Restrições: sem GPL, deve suportar Xcode N+, deve compilar para ARM64, etc. -->

---

## 4. Mapeamento de Requisitos de Features

<!-- Relacione cada RF da Spec de Produto ao seu escopo de implementação técnica. -->

| ID RF | Requisito (resumo) | Solução Técnica (resumo) | Spec de Feature |
|-------|--------------------|--------------------------|-----------------|
| RF-01 | | | [FEATURE-[nome].md](./features/FEATURE-[nome].md) |

---

## 5. Arquitetura de Navegação

### 5.1 Padrão de Navegação
<!-- Pilha, tab-bar, coordinator, estratégia de tratamento de deep links. -->

Nao havera deeplinks

### 5.2 Esquema de Deep Links
| Intenção | Padrão de URL | Destino |
|----------|---------------|---------|

### 5.3 Mapa de Navegação (simplificado)

```text
App
├── Splash
│   ├── Sessão válida
│   │   └── Tela principal
│   └── Sessão inválida ou inexistente
│       └── Login
│           ├── Cadastrar usuário
│           └── Recuperar senha
│               └── Nova senha
│
└── Tela principal
    ├── Minhas viagens
    │   ├── Cadastrar viagem
    │   ├── Visualizar dados da viagem
    │   │   ├── Alterar dados da viagem
    │   │   ├── Ativar viagem
    │   │   ├── Inativar / finalizar viagem
    │   │   ├── Cancelar viagem
    │   │   ├── Excluir viagem
    │   │   ├── Enviar convite
    │   │   ├── Visualizar convites da viagem
    │   │   └── Visualizar mapa
    │   └── Filtrar minhas viagens por status
    │
    ├── Viagens acompanhadas
    │   ├── Visualizar convites recebidos
    │   │   ├── Aceitar convite
    │   │   └── Rejeitar convite
    │   ├── Visualizar dados da viagem acompanhada
    │   │   ├── Visualizar mapa
    │   │   └── Remover acompanhamento
    │   └── Filtrar viagens acompanhadas por status
    │
    └── Perfil / Configurações
        ├── Alterar dados do usuário
        └── Sair da conta

```

---

## 6. Rede (Networking)

### 6.1 Contrato de API
| Endpoint | Método | Auth | Corpo da requisição | Resposta | Códigos de erro |
|----------|--------|------|---------------------|----------|-----------------|
| `/v1/recurso` | GET | Bearer | — | `RecursoDTO` | 401, 404 |

### 6.2 Autenticação e Autorização
<!-- Tipo de token, local de armazenamento, estratégia de refresh, fluxo de logout. -->

| Aspecto | Decisão |
|---------|---------|
| Tipo de token | JWT |
| Armazenamento | EncryptedSharedPreferences |
| Estratégia de refresh | Refresh silencioso |
| Expiração | Xd refresh |

### 6.3 Estratégia de Offline e Cache
| Dado | TTL do cache | Comportamento offline |
|------|--------------|-----------------------|
| [Recurso] | [Xs / Sem cache] | [Servir dado antigo / Bloquear / Erro] |

### 6.4 Tratamento de Erros de Rede
<!-- Como erros de rede chegam ao usuário e ao sistema de crash/analytics. -->

| Tipo de erro | Tratamento | Feedback ao usuário |
|--------------|------------|---------------------|
| Sem conectividade | Retry com backoff exponencial | Banner de erro inline |
| Erro 4xx (cliente) | Registrar log, exibir mensagem | Alerta ou mensagem inline |
| Erro 5xx (servidor) | Registrar log, retry uma vez | Erro genérico + CTA de retry |

---

## 7. Persistência Local

### 7.1 Tecnologias de Armazenamento
| Caso de uso | Tecnologia | Justificativa |
|-------------|------------|---------------|
| Dados estruturados | Room | |
| Preferências do usuário | DataStore| |
| Dados sensíveis | EncryptedSharedPreferences | |
| Cache de arquivos/mídia | | |

### 7.2 Modelos de Dados
<!-- Schema de cada entidade persistida. Manter normalizado. -->

**Entidade: `[NomeDaEntidade]`**
| Campo | Tipo | Nulável | Observações |
|-------|------|---------|-------------|
| `id` | UUID / String | Não | Chave primária |
| `criadoEm` | DateTime | Não | |

### 7.3 Estratégia de Migração
<!-- Como alterações de schema são tratadas entre versões do app. -->

---

## 8. Gerenciamento de Estado

### 8.1 Abordagem
<!-- Onde o estado vive: componente local, ViewModel compartilhado, store global, etc. -->

| Tipo de estado | Escopo | Dono |
|----------------|--------|------|
| Efêmero de UI | Local (View / ViewController) | Componente |
| Sessão da feature | ViewModel / StateHolder da feature | Módulo da feature |
| Estado global do app | Store / singleton de nível de app | Módulo Core |

### 8.2 Primitivos Reativos/Assíncronos
<!-- ex.: Combine / AsyncStream / Flow / LiveData / RxSwift -->

| Plataforma | Primitivo | Uso |
|------------|-----------|-----|
| Android | [ex.: StateFlow, SharedFlow] | [para quê] |

---

## 9. Segurança

| Preocupação | Requisito | Implementação |
|-------------|-----------|---------------|
| Dados em repouso | Campos sensíveis criptografados | Keychain / EncryptedSharedPreferences |
| Dados em trânsito | TLS 1.2+ obrigatório | Certificate pinning (se necessário) |
| Autenticação | Tokens jamais registrados em log | Redação nos logs |
| Detecção de jailbreak / root | [Obrigatório / Não obrigatório] | [Biblioteca / Customizado] |
| Autenticação biométrica | [Obrigatório / Opcional] | APIs biométricas da plataforma |

---

## 10. Analytics e Observabilidade

### 10.1 Eventos de Analytics (Técnico)
<!-- Nomes e schemas finais dos eventos. Mapeia para eventos de produto na Spec de Produto §9. -->

| Nome do evento | Gatilho | Propriedades | Plataforma |
|----------------|---------|--------------|------------|
| `app_aberto` | App em foreground | `versao_so`, `versao_app` | Ambas |
| `[feature]_concluida` | Sucesso do caso de uso | `duracao_ms`, `qtd_itens` | Ambas |

### 10.2 Relatório de Crashes
| Ferramenta | Configuração | Estratégia de breadcrumbs |
|------------|-------------|---------------------------|
| [ex.: Crashlytics / Sentry] | | |

### 10.3 Logging
| Nível | Quando usar | Persistido |
|-------|------------|------------|
| DEBUG | Somente em dev — nunca em builds de produção | Não |
| INFO | Eventos-chave do ciclo de vida | Não |
| WARNING | Problemas recuperáveis | Sim (ring buffer) |
| ERROR | Falhas exibidas ao usuário | Sim, enviado ao relatório de crash |

---

## 11. Orçamentos de Desempenho

| Métrica | Meta | Método de medição |
|---------|------|-------------------|
| Cold start até interativo | ≤ Xs | Profiler da plataforma |
| Orçamento de frame na thread principal | 16ms (60fps) / 8ms (120fps) | Instruments / Android Studio |
| Teto de memória | ≤ XMB típico, ≤ YMB pico | Instruments de alocação |
| Delta do tamanho do binário (por release) | ≤ XMB | Verificação de tamanho no CI |
| Payload de rede (resposta de lista) | ≤ XKB | Proxy / Charles |

---

## 12. Acessibilidade (Técnica)

| Requisito | Implementação |
|-----------|---------------|
| VoiceOver / TalkBack | Todos os elementos interativos possuem `accessibilityLabel` |
| Dynamic Type / escala de fonte | Layouts usam unidades relativas; sem alturas fixas em contêineres de texto |
| Área mínima de toque | 44×44pt (iOS) / 48×48dp (Android) |
| Razão de contraste | Mínimo 4,5:1 para texto |
| Reduzir Movimento | Respeitar `prefersReducedMotion` / `REDUCE_MOTION` |

---

## 13. Estratégia de Testes

### 13.1 Pirâmide de Testes
| Camada | Meta de cobertura | Ferramentas |
|--------|------------------|-------------|
| Unitários (domínio + dados) | ≥ 80% | XCTest / JUnit |
| Integração (repositórios + API) | Caminhos principais | XCTest / JUnit + servidor mock |
| UI / E2E | Jornadas críticas do usuário | XCUITest / Espresso |
| Snapshot | Componentes do Design System | [SnapshotTesting / Paparazzi] |

### 13.2 Estratégia de Dados de Teste
<!-- Como os dados de teste são provisionados: fixtures, factories, mocks, stubs. -->

### 13.3 Gates de CI
| Gate | Condição para passar |
|------|----------------------|
| Testes unitários | 100% passando, sem retries por instabilidade |
| Lint / análise estática | Zero novos warnings |
| Verificação de tamanho | Delta dentro do orçamento |
| Testes de UI (smoke) | Jornadas críticas verdes |

---

## 14. Release e Distribuição

### 14.1 Build e Distribuição
| Etapa | Ferramenta | Observações |
|-------|------------|-------------|
| Automação de build | [Fastlane / Gradle / Xcode Cloud / Bitrise] | |
| Assinatura de código | [Certificados + Profiles / Keystore] | |
| Distribuição (interna) | [TestFlight / Firebase App Distribution] | |
| Distribuição (produção) | [App Store / Google Play] | |

### 14.2 Feature Flags
| Flag | Escopo | Padrão | Plano de rollout |
|------|--------|--------|------------------|
| `feature_[nome]_habilitada` | Remoto | `false` | Gradual 0% → 100% |

### 14.3 Plano de Rollback
<!-- O que acontece se um bug crítico for encontrado após o lançamento? -->

---

## 15. Questões Técnicas em Aberto

| # | Pergunta | Responsável | Prazo |
|---|----------|-------------|-------|

---

## 16. Histórico de Revisões

| Versão | Data | Autor | Resumo |
|--------|------|-------|--------|
| 0.1.0 | AAAA-MM-DD | [Nome] | Rascunho inicial |
