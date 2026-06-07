# Spec-Driven Development — Templates

Templates para desenvolvimento de aplicativos nativos (iOS / Android) baseados em especificação.  
Independentes de linguagem — funcionam com Swift/SwiftUI, Kotlin/Compose, Objective-C, Java, ou qualquer stack nativa.

---

## Estrutura

```
spec-driven-development/
├── PRODUCT-SPEC.md          ← Especificação de produto (sem detalhes técnicos)
├── TECHNICAL-SPEC.md        ← Especificação técnica (sem decisões de produto)
└── features/
    └── FEATURE-SPEC.md      ← Especificação de feature individual
```

---

## Hierarquia e responsabilidade de cada template

```
PRODUCT-SPEC
    "O quê e por quê"
    Problema, usuários, jornadas, requisitos funcionais,
    UX, copy, analytics (semântico), KPIs, riscos de produto.
         │
         └─► TECHNICAL-SPEC
                 "Como — decisões de plataforma"
                 Arquitetura, dependências, navegação, rede,
                 persistência, segurança, observabilidade,
                 budgets de performance, estratégia de testes,
                 distribuição, feature flags.
                      │
                      └─► features/FEATURE-SPEC
                              "Como — implementação de uma feature"
                              Comportamento detalhado, fluxos, edge cases,
                              design de UI (telas, estados, componentes),
                              design técnico (classes, data flow, API,
                              persistência local, estado, erros),
                              analytics, permissões, l10n, plano de testes,
                              Definition of Done.
```

---

## Quando criar cada documento

| Evento | Documento |
|--------|-----------|
| Nova iniciativa / produto | `PRODUCT-SPEC.md` |
| Primeira decisão de stack ou arquitetura | `TECHNICAL-SPEC.md` |
| Início de cada feature do backlog | `features/FEATURE-[nome].md` |

Copie o template e renomeie. Ex: `features/FEATURE-authentication.md`

---

## Regra de separação produto × técnico

| Informação | Onde vai |
|------------|----------|
| Problema do usuário | PRODUCT-SPEC |
| User Stories + critérios de aceite | PRODUCT-SPEC |
| Jornadas e fluxos (perspectiva do usuário) | PRODUCT-SPEC |
| Copy / strings de interface | PRODUCT-SPEC |
| KPIs e eventos de analytics (semântico) | PRODUCT-SPEC |
| Monetização e modelo de negócio | PRODUCT-SPEC |
| Linguagem / framework / bibliotecas | TECHNICAL-SPEC |
| Arquitetura e padrões de código | TECHNICAL-SPEC |
| Contratos de API (endpoints, autenticação) | TECHNICAL-SPEC |
| Schema de banco de dados e migrações | TECHNICAL-SPEC |
| Estratégia de cache e offline | TECHNICAL-SPEC |
| Segurança e armazenamento de credenciais | TECHNICAL-SPEC |
| Budgets de performance e memória | TECHNICAL-SPEC |
| CI/CD e distribuição | TECHNICAL-SPEC |
| Componentes, ViewModels, Use Cases da feature | FEATURE-SPEC |
| Data flow interno da feature | FEATURE-SPEC |
| Estados de tela e edge cases | FEATURE-SPEC |
| Plano de testes da feature | FEATURE-SPEC |
| Definition of Done da feature | FEATURE-SPEC |
