# APP-SPEC — [Nome do Aplicativo]

> **Status:** `rascunho` | `revisão` | `aprovado` | `descontinuado`
> **Versão:** 0.1.0 · **Atualizado em:** AAAA-MM-DD
> **Plataforma:** Android · **Stack:** Kotlin · XML Views

---

## PARTE 1 · PRODUTO

### 1.1 Visão Geral

| Campo | Descrição |
|-------|-----------|
| **Problema** | [Qual dor existe hoje? Para quem?] |
| **Oportunidade** | [Por que resolver agora?] |
| **Não-Objetivos** | [O que esta versão NÃO resolve] |

### 1.2 Objetivos de Negócio

| ID | Objetivo | Métrica | Meta |
|----|----------|---------|------|
| O-01 | | | |
| O-02 | | | |

### 1.3 Usuário-Alvo

**Primário**
- **Quem:** [Papel / persona]
- **Contexto:** [Onde e quando usa o app]
- **Motivação:** [O que tenta realizar]
- **Frustração atual:** [O que está quebrado ou faltando]

**Secundários**

| Usuário | Principal necessidade |
|---------|-----------------------|
| | |

---

### 1.4 Histórias de Usuário

> **P0** = obrigatório · **P1** = importante · **P2** = desejável

| ID | História | P | Critérios de Aceite |
|----|----------|----|---------------------|
| US-01 | Como [usuário], quero [ação] para [resultado]. | P0 | - [ ] critério 1 · - [ ] critério 2 |
| US-02 | | P1 | |

---

### 1.5 Requisitos Funcionais

| ID | Requisito | P | US |
|----|-----------|---|----|
| RF-01 | O app deve [comportamento]. | P0 | US-01 |
| RF-02 | | P1 | |

---

### 1.6 Requisitos Não-Funcionais

| Categoria | Requisito | Critério de Aceite |
|-----------|-----------|-------------------|
| Performance | Cold start em dispositivo intermediário | ≤ 2s |
| Offline | Fluxo principal sem conexão | 100% do fluxo core |
| Acessibilidade | TalkBack + área mínima de toque | 48×48dp · contraste 4,5:1 |
| Localização | Idiomas suportados | pt-BR · [outros] |

---

### 1.7 UX e Navegação

**Telas Principais**

| Tela | Descrição | Figma |
|------|-----------|-------|
| [Nome] | | |

**Mapa de Navegação**

```
[Descreva o modelo: BottomNav, Drawer, back stack, modais]

Ex.:
BottomNavigationView
├── Tab A  →  ScreenA  →  ScreenA2 (push)
├── Tab B  →  ScreenB  →  DialogB (modal)
└── Tab C  →  ScreenC
```

**Padrões de Interação:** [gestos nativos Android, transições Material, feedback tátil]

---

### 1.8 Analytics

| Evento | Gatilho | Por que importa |
|--------|---------|-----------------|
| `app_opened` | App em foreground | Base de DAU |
| `[feature]_completed` | Conclusão do fluxo principal | Conversão core |

---

## PARTE 2 · TÉCNICA — ANDROID

### 2.1 Ambiente e Build

| Item | Valor |
|------|-------|
| `minSdk` | API [X] — Android [Y] |
| `targetSdk` | API [X] — Android [Y] |
| Linguagem | Kotlin |
| UI Toolkit | XML + Views |
| Build System | Gradle [versão] |

| Ambiente | Finalidade | Base URL |
|----------|------------|----------|
| `debug` | Dev local + QA | |
| `staging` | Validação pré-release | |
| `release` | Produção — Google Play | |

---

### 2.2 Arquitetura VIP

**Padrão:** VIP — View · Interactor · Presenter
**Princípio:** fluxo de dados unidirecional. A View dispara eventos → Interactor executa a lógica → Presenter formata → View renderiza.

```
┌─────────────────────────────────────────────────────┐
│                    Feature / Scene                  │
│                                                     │
│  ┌──────────┐  Request  ┌─────────────┐             │
│  │          │ ────────► │             │             │
│  │   View   │           │  Interactor │ ◄─ Worker   │
│  │(Activity │ ◄──────── │             │             │
│  │/Fragment)│ ViewModel └──────┬──────┘             │
│  └────┬─────┘          Response│                    │
│       │                 ┌──────▼──────┐             │
│       │    ViewModel    │             │             │
│       └─────────────────│  Presenter  │             │
│                         └─────────────┘             │
│                                                     │
│  ┌───────────┐   ┌────────────────────────────────┐ │
│  │  Router   │   │   Contracts (interfaces)       │ │
│  │(navegação)│   │  ViewContract                  │ │
│  └───────────┘   │  InteractorContract            │ │
│  ┌───────────┐   │  PresenterContract             │ │
│  │Configurator│  │  RouterContract                │ │
│  │(wiring/DI)│   └────────────────────────────────┘ │
│  └───────────┘                                      │
│  ┌────────────────────────────────────────────────┐ │
│  │  Models: Request · Response · ViewModel        │ │
│  └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

**Responsabilidades das camadas:**

| Camada | Classe Android | Responsabilidade |
|--------|---------------|-----------------|
| `View` | `Activity` / `Fragment` | Renderiza UI, captura eventos, delega ao Interactor |
| `Interactor` | Classe pura | Lógica de negócio; orquestra Workers |
| `Presenter` | Classe pura | Converte Response em ViewModel exibível |
| `Router` | Classe c/ ref. à Activity | Navegação entre telas / scenes |
| `Worker` | Classe pura | Operação isolada: API, banco, sensor, etc. |
| `Models` | Data classes | `Request`, `Response`, `ViewModel` por caso de uso |
| `Contracts` | Interfaces | Contratos entre as camadas (testabilidade) |
| `Configurator` | Object / companion | Instancia e conecta todas as peças da scene |

---

### 2.3 Estrutura de Pacotes

```
com.[empresa].[app]/
├── app/                        # Application, inicializações globais
├── core/
│   ├── network/                # Retrofit, OkHttp, AuthInterceptor
│   ├── persistence/            # Room DB, DAOs
│   ├── session/                # SessionManager, TokenStorage
│   └── extensions/             # Kotlin extensions, utils
├── designsystem/               # Tema Material 3, componentes reutilizáveis
├── features/
│   └── [featureName]/          # Uma pasta por feature/scene
│       ├── [Feature]Activity.kt          ← View (Activity)
│       ├── [Feature]Fragment.kt          ← View (Fragment, quando aplicável)
│       ├── [Feature]Interactor.kt        ← Interactor
│       ├── [Feature]Presenter.kt         ← Presenter
│       ├── [Feature]Router.kt            ← Router
│       ├── [Feature]Worker.kt            ← Worker
│       ├── [Feature]Contracts.kt         ← Contracts
│       ├── [Feature]Configurator.kt      ← Configurator
│       └── [Feature]Models.kt            ← Models
└── shared/
    ├── ui/                   # User interfaces
    └── utils/                # Utils
```

---

### 2.4 Templates de Arquivos VIP (Kotlin)

> Ao criar uma nova feature, copie os templates abaixo substituindo `Template` / `template` pelo nome da feature (ex.: `Login`, `login`). O pacote base é `br.com.chronus.app.features.[featureName]`.
>
> **Regra de escolha do Router:** use o template de **Activity** quando a scene é uma `AppCompatActivity`; use o template de **Fragment** quando a scene vive dentro de um `Fragment`.

---

#### 2.4.1 `[Feature]Contracts.kt`

Define todos os contratos (interfaces) entre as camadas da scene.

```kotlin
package br.com.chronus.app.features.template

import br.com.chronus.app.shared.interfaces.BaseView

object TemplateContracts {
    interface Interactor {
        fun unload()
        // Ex.: fun loadData(request: TemplateModels.Request)
    }

    interface Presenter {
        fun unload()
        // Ex.: fun presentData(response: TemplateModels.Response)
    }

    interface Router {
        fun unload()
        // Ex.: fun navigateToDetail(itemId: String)
    }

    interface View : BaseView
    // Ex.:
    // fun showLoading()
    // fun showContent(viewModel: TemplateModels.ViewModel)
    // fun showError(message: String, canRetry: Boolean)

    interface Worker
    // Ex.: fun fetchData(callback: (TemplateModels.Response) -> Unit)
}
```

---

#### 2.4.2 `[Feature]Models.kt`

Modelos de dados trafegados entre as camadas.

```kotlin
package br.com.chronus.app.features.template

object TemplateModels {

    /** Enviado pela View ao Interactor. */
    class Request(
        // Ex.: val itemId: String = ""
    )

    /** Enviado pelo Interactor ao Presenter. */
    class Response(
        // Ex.: val items: List<ItemData> = emptyList(),
        // Ex.: val errorMessage: String? = null
    )

    /** Enviado pelo Presenter à View — dados já formatados para exibição. */
    class ViewModel(
        // Ex.: val title: String = "",
        // Ex.: val items: List<ItemViewModel> = emptyList(),
        // Ex.: val showRetryButton: Boolean = false
    )
}
```

---

#### 2.4.3 `[Feature]Worker.kt`

Operação isolada (chamada de API, acesso ao banco, sensor, etc.).

```kotlin
package br.com.chronus.app.features.template

class TemplateWorker : TemplateContracts.Worker {
    // Ex.:
    // fun fetchData(callback: (TemplateModels.Response) -> Unit) {
    //     // Chamada Retrofit / Room aqui
    // }
}
```

---

#### 2.4.4 `[Feature]Interactor.kt`

Lógica de negócio da scene; orquestra o Worker e delega ao Presenter.

```kotlin
package br.com.chronus.app.features.template

class TemplateInteractor(
    private var presenter: TemplateContracts.Presenter?
) : TemplateContracts.Interactor {

    private var worker: TemplateContracts.Worker? = null

    fun setWorker(worker: TemplateContracts.Worker) {
        this.worker = worker
    }

    // Ex.:
    // fun loadData(request: TemplateModels.Request) {
    //     (worker as? TemplateWorker)?.fetchData { response ->
    //         presenter?.presentData(response)
    //     }
    // }

    override fun unload() {
        presenter?.unload()
        presenter = null
        worker = null
    }
}
```

---

#### 2.4.5 `[Feature]Presenter.kt`

Converte `Response` (dados brutos) em `ViewModel` (dados formatados para UI) e chama a View.

```kotlin
package br.com.chronus.app.features.template

class TemplatePresenter(
    private var view: TemplateContracts.View?
) : TemplateContracts.Presenter {

    // Ex.:
    // fun presentData(response: TemplateModels.Response) {
    //     val viewModel = TemplateModels.ViewModel(
    //         title = response.items.firstOrNull()?.name ?: ""
    //     )
    //     view?.showContent(viewModel)
    // }

    override fun unload() {
        view = null
    }
}
```

---

#### 2.4.6 `[Feature]Router.kt` — Activity

Use quando a View da scene é uma `AppCompatActivity`.

```kotlin
package br.com.chronus.app.features.template

import androidx.appcompat.app.AppCompatActivity

class TemplateRouter(
    private var view: AppCompatActivity?
) : TemplateContracts.Router {

    // Ex.:
    // fun navigateToDetail(itemId: String) {
    //     val intent = Intent(view, DetailActivity::class.java)
    //         .putExtra("ITEM_ID", itemId)
    //     view?.startActivity(intent)
    // }

    override fun unload() {
        view = null
    }
}
```

---

#### 2.4.7 `[Feature]Router.kt` — Fragment

Use quando a View da scene é um `Fragment`.

```kotlin
package br.com.chronus.app.features.template

import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity

class TemplateRouter(fragment: Fragment) : TemplateContracts.Router {

    private var activity: FragmentActivity? = fragment.requireActivity()

    // Ex.:
    // fun navigateToDetail(itemId: String) {
    //     activity?.supportFragmentManager?.beginTransaction()
    //         ?.replace(R.id.container, DetailFragment.newInstance(itemId))
    //         ?.addToBackStack(null)
    //         ?.commit()
    // }

    override fun unload() {
        activity = null
    }
}
```

---

#### 2.4.8 `[Feature]Configurator.kt`

Instancia e conecta todas as peças da scene (wiring / DI manual).

```kotlin
package br.com.chronus.app.features.template

import br.com.chronus.app.shared.interfaces.Configurator

class TemplateConfigurator : Configurator<TemplateView> {
    override fun configure(view: TemplateView) {
        val presenter  = TemplatePresenter(view)
        val interactor = TemplateInteractor(presenter)
        val router     = TemplateRouter(view)        // Activity variant
        // val router  = TemplateRouter(view)        // Fragment variant — ajuste a assinatura
        val worker     = TemplateWorker()
        interactor.setWorker(worker)
        view.interactor = interactor
        view.router     = router
    }
}
```

---

#### 2.4.9 `[Feature]View.kt` — Activity

Use quando a scene é uma `AppCompatActivity`.

```kotlin
package br.com.chronus.app.features.template

import android.content.Context
import android.content.res.Resources
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import br.com.chronus.app.features.template.TemplateContracts

class TemplateView : AppCompatActivity(), TemplateContracts.View {

    var interactor: TemplateContracts.Interactor? = null
    var router: TemplateContracts.Router? = null

    protected var TAG: String? = null
    protected var context: Context? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        TAG = localClassName
        context = this
        // setContentView(R.layout.activity_template)
        configure()
    }

    override fun onDestroy() {
        context = null
        interactor?.unload()
        interactor = null
        router?.unload()
        router = null
        super.onDestroy()
    }

    private fun configure() {
        TemplateConfigurator().configure(this)
    }

    override fun getResourcesInstance(): Resources = resources
}
```

---

#### 2.4.10 `[Feature]Fragment.kt` — Fragment

Use quando a scene vive dentro de um `Fragment`.

```kotlin
package br.com.chronus.app.features.template

import android.content.Context
import android.content.res.Resources
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import br.com.chronus.app.features.template.TemplateContracts

class TemplateFragment : Fragment(), TemplateContracts.View {

    var interactor: TemplateContracts.Interactor? = null
    var router: TemplateContracts.Router? = null

    protected var context: Context? = null

    override fun onAttach(context: Context) {
        super.onAttach(context)
        this.context = context
        configure()
    }

    override fun onResume() {
        super.onResume()
        // Ex.: interactor?.loadData(TemplateModels.Request())
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return null // Substitua por: inflater.inflate(R.layout.fragment_template, container, false)
    }

    override fun onDetach() {
        super.onDetach()
        context = null
        interactor?.unload()
        interactor = null
        router?.unload()
        router = null
    }

    private fun configure() {
        TemplateConfigurator().configure(this)
    }

    override fun getResourcesInstance(): Resources = resources

    companion object {
        fun newInstance(): TemplateFragment = TemplateFragment()
    }
}
```

---

### 2.5 Dependências Principais

| Biblioteca | Finalidade | Licença |
|------------|------------|---------|
| Retrofit 2 + OkHttp 4 | Cliente HTTP | Apache 2.0 |
| Gson / Moshi | Serialização JSON | Apache 2.0 |
| Room | Banco de dados local (SQLite) | Apache 2.0 |
| EncryptedSharedPreferences | Armazenamento seguro | Apache 2.0 |
| Glide / Coil | Carregamento de imagens | Apache 2.0 |
| [Outras] | | |

> ⚠️ Restrições: sem licenças GPL; preferir Apache 2.0 ou MIT.

---

### 2.6 Networking

**Autenticação:**

| Aspecto | Decisão |
|---------|---------|
| Tipo de token | JWT |
| Armazenamento | `EncryptedSharedPreferences` |
| Refresh | Silencioso via `AuthInterceptor` |
| Expiração | Refresh Token |

**Endpoints — resumo** *(detalhes em cada FEATURE-SPEC)*

| Endpoint | Método | Auth | Response | Erros |
|----------|--------|------|----------|-------|
| `/v1/[recurso]` | GET | Bearer | `[DTO]` | 401, 404 |

**Tratamento de erros:**

| Tipo | Comportamento | Feedback ao usuário |
|------|--------------|---------------------|
| Sem conexão | Retry com exponential backoff | Snackbar / banner |
| 4xx | Log + mensagem específica | AlertDialog / inline |
| 5xx | Log + 1 retry automático | Erro genérico + botão retry |

---

### 2.7 Persistência Local

| Dado | Tecnologia |
|------|------------|
| Dados estruturados | Room (SQLite) |
| Preferências do usuário | DataStore / SharedPreferences |
| Dados sensíveis | EncryptedSharedPreferences |
| Cache de mídia | Cache dir + FileProvider |

**Entidades Room** *(schema detalhado em cada FEATURE-SPEC)*

```
[Ex.: UserEntity(id, name, email, createdAt)]
[Ex.: TripEntity(id, userId, origin, destination, startedAt)]
```

**Migração:** Room `Migration` explícita a cada alteração de schema; sem `fallbackToDestructiveMigration` em produção.

---

### 2.8 Segurança

| Preocupação | Implementação |
|-------------|--------------|
| Dados em repouso | `EncryptedSharedPreferences`; Room com SQLCipher se necessário |
| Tráfego | TLS 1.2+ obrigatório — `network_security_config.xml` |
| Tokens | Jamais logados; redação obrigatória em logs de produção |
| Detecção de root | [Obrigatório / Não obrigatório] |
| Biometria | [Obrigatório / Opcional] — `BiometricPrompt` API |

---

### 2.9 Observabilidade

**Crash reporting:** Firebase Crashlytics / Sentry

**Logging:**

| Nível | Uso | Produção |
|-------|-----|----------|
| `DEBUG` | Diagnóstico de desenvolvimento | ❌ Removido pelo ProGuard |
| `INFO` | Eventos de ciclo de vida | ✅ |
| `ERROR` | Falhas visíveis ao usuário | ✅ Enviado ao crash report |

**Eventos de analytics:**

| Evento | Gatilho | Propriedades |
|--------|---------|-------------|
| `app_opened` | App em foreground | `os_version`, `app_version` |
| `[feature]_completed` | Conclusão do caso de uso | `duration_ms` |

---

### 2.10 Features — Índice

> Cada feature tem seu arquivo detalhado em `/docs/features/`.

| Feature | Arquivo | RFs | Status |
|---------|---------|-----|--------|
| [NomeDaFeature] | [FEATURE-nome.md](./features/FEATURE-nome.md) | RF-01, RF-02 | `pendente` |

---

### 2.11 Release e Distribuição

| Etapa | Ferramenta |
|-------|------------|
| Build automation | Gradle + Fastlane / GitHub Actions |
| Assinatura | Keystore gerenciado via CI secrets |
| Distribuição interna | Firebase App Distribution |
| Produção | Google Play: internal → alpha → production |
| Feature flags | Remote Config / [ferramenta] — rollout gradual 0 → 100% |

---

## PARTE 3 · RISCOS E QUESTÕES EM ABERTO

### 3.1 Riscos

| ID | Tipo | Descrição | Mitigação |
|----|------|-----------|-----------|
| R-01 | Premissa de usuário | | |
| R-02 | Técnico | | |

### 3.2 Questões em Aberto

| ID | Pergunta | Responsável | Prazo |
|----|----------|-------------|-------|
| Q-01 | Detalhes das camadas VIP a confirmar (Configurator, DI manual vs Hilt) | Tech Lead | |
| Q-02 | | | |

---

## Histórico de Revisões

| Versão | Data | Autor | Resumo |
|--------|------|-------|--------|
| 0.1.0 | 2026-06-16 | Jose Julio | Esboço inicial unificado — Android · VIP |
| 0.2.0 | 2026-06-16 | Jose Julio | §2.4 adicionado: templates de arquivos VIP (Kotlin) |