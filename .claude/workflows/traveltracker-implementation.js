export const meta = {
  name: 'traveltracker-implementation',
  description: 'Generate all Kotlin source files for TravelTracker Android app',
  phases: [
    { title: 'Core Infrastructure', detail: 'Theme, DTOs, entities, DAOs, database, network, security' },
    { title: 'App Entry & Navigation', detail: 'App class, MainActivity, NavRoutes, AppNavigation' },
    { title: 'Design System', detail: 'Reusable Compose components' },
    { title: 'Features', detail: 'Splash, Login, Register, Recover, Home' },
  ],
}

const BASE = 'C:\\claudecode\\travel-tracker-android\\app\\src\\main\\kotlin\\br\\com\\traveltracker'

// ─────────────────────────────────────────────────────────────────────────────
// Phase 1: Core Infrastructure (parallel batch)
// ─────────────────────────────────────────────────────────────────────────────
phase('Core Infrastructure')

const coreFiles = await parallel([
  () => agent(`Write the file at path "${BASE}/design_system/theme/Color.kt".

The file should contain:
- Package: br.com.traveltracker.design_system.theme
- Compose Color definitions for Material3 TravelTracker theme
- Travel/adventure palette: primary blue journey (Blue 800 = 0xFF1565C0), secondary orange adventure (Orange 700 = 0xFFEF6C00), background (0xFFFAFAFA), surface (0xFFFFFFFF), error (0xFFB00020)
- Dark variants too
- Keep it concise, no comments needed

Return the EXACT file contents that should be written, starting with the package declaration.`, { label: 'Color.kt' }),

  () => agent(`Write the file at path "${BASE}/design_system/theme/Type.kt".

The file should contain:
- Package: br.com.traveltracker.design_system.theme
- Compose Typography for Material3
- Uses default M3 typography with minor customization

Return the EXACT file contents.`, { label: 'Type.kt' }),

  () => agent(`Write the file at path "${BASE}/design_system/theme/Theme.kt".

The file should contain:
- Package: br.com.traveltracker.design_system.theme
- Jetpack Compose Material3 theme named TravelTrackerTheme
- Uses the colors from Color.kt and typography from Type.kt
- Supports dark/light mode with isSystemInDarkTheme()
- colorScheme with lightColorScheme and darkColorScheme using the travel palette
- Sets status bar color via WindowCompat

Return the EXACT file contents.`, { label: 'Theme.kt' }),

  () => agent(`Write the file at path "${BASE}/core/network/dto/AuthDtos.kt".

Package: br.com.traveltracker.core.network.dto

Data classes (use @SerializedName for snake_case ↔ camelCase):
- LoginRequest(email: String, password: String)
- LoginResponse(accessToken: String, refreshToken: String, tokenType: String)
- RegisterRequest(name: String, email: String, password: String)
- RegisterResponse(userId: String, name: String, email: String, createdAt: String)
- RecoverPasswordRequest(email: String)
- RecoverPasswordResponse(token: String, message: String)
- UpdatePasswordRequest(email: String, newPassword: String)
- UpdatePasswordResponse(message: String)

Return EXACT file contents.`, { label: 'AuthDtos.kt' }),

  () => agent(`Write the file at path "${BASE}/core/network/dto/TripDtos.kt".

Package: br.com.traveltracker.core.network.dto

Data classes (use @SerializedName):
- TripItemDto(id: String, userId: String, description: String, vehicle: String, startDate: String, endDate: String, status: String, createdAt: String)
- TrackedTripItemDto(id: String, userId: String, description: String, vehicle: String, startDate: String, endDate: String, status: String, createdAt: String, trackerStatus: String, ownerName: String)
- TripCompleteResponse(ownedTrips: List<TripItemDto>, trackedTrips: List<TrackedTripItemDto>)
- TrackingAcceptResponse(id: Int, tripId: String, userId: String, status: String, addedAt: String)

Return EXACT file contents.`, { label: 'TripDtos.kt' }),

  () => agent(`Write the file at path "${BASE}/core/network/ApiService.kt".

Package: br.com.traveltracker.core.network

Retrofit interface ApiService with these endpoints (all return suspend):
- POST /auth/register → RegisterResponse (no auth)
- POST /auth/login → LoginResponse (no auth)
- POST /auth/refresh → LoginResponse (no auth, body empty or unit)
- POST /auth/recover-password → RecoverPasswordResponse (no auth)
- POST /auth/update-password → UpdatePasswordResponse (no auth)
- GET /trips/all-user-trips/complete → TripCompleteResponse (needs Bearer auth via interceptor)
- PUT /tracking/{trip_id}/accept → TrackingAcceptResponse (needs Bearer auth)
- PUT /tracking/{trip_id}/reject → TrackingAcceptResponse (needs Bearer auth)

Imports from br.com.traveltracker.core.network.dto.*
Use retrofit2.http.* annotations.

Return EXACT file contents.`, { label: 'ApiService.kt' }),

  () => agent(`Write the file at path "${BASE}/core/network/AuthInterceptor.kt".

Package: br.com.traveltracker.core.network

OkHttp Interceptor that:
- Takes a token provider lambda: () -> String?
- In intercept(), gets the token, if non-null adds header "Authorization: Bearer <token>"
- Proceeds with the request

No Hilt annotation here since it uses a lambda.

Return EXACT file contents.`, { label: 'AuthInterceptor.kt' }),

  () => agent(`Write the file at path "${BASE}/core/network/ApiClient.kt".

Package: br.com.traveltracker.core.network

Object/companion that provides the base URL constant:
  const val BASE_URL = "https://api.example.com/"

Also a factory function buildRetrofit(tokenProvider: () -> String?): Retrofit that:
1. Creates OkHttpClient with AuthInterceptor(tokenProvider) and HttpLoggingInterceptor (BODY in debug)
2. Creates Retrofit with BASE_URL, GsonConverterFactory, the OkHttpClient
3. Returns the Retrofit instance

Return EXACT file contents.`, { label: 'ApiClient.kt' }),

  () => agent(`Write the file at path "${BASE}/core/security/SessionManager.kt".

Package: br.com.traveltracker.core.security

Class SessionManager @Inject constructor(context: Context):
- Uses EncryptedSharedPreferences with KEY_SCHEME_AES256_SIV and VALUE_SCHEME_AES256_GCM
- Keys: "access_token", "refresh_token", "user_id"
- Functions:
  - fun saveSession(accessToken: String, refreshToken: String, userId: String = "")
  - fun getAccessToken(): String?
  - fun getRefreshToken(): String?
  - fun clearSession()
  - fun isSessionValid(): Boolean  (returns getAccessToken() != null)

Inject with @Singleton. Annotate @Singleton on the class.

Return EXACT file contents.`, { label: 'SessionManager.kt' }),

  () => agent(`Write the file at path "${BASE}/core/persistence/entity/ViagemMinhaEntity.kt".

Package: br.com.traveltracker.core.persistence.entity

Room @Entity(tableName = "viagem_minha") data class ViagemMinhaEntity:
- id: String @PrimaryKey
- descricao: String
- veiculo: String
- inicio: String  (ISO date string)
- termino: String
- status: String  ("pending","active","inactive","canceled","finished")

Return EXACT file contents.`, { label: 'ViagemMinhaEntity.kt' }),

  () => agent(`Write the file at path "${BASE}/core/persistence/entity/ViagemAcompanhadaEntity.kt".

Package: br.com.traveltracker.core.persistence.entity

Room @Entity(tableName = "viagem_acompanhada") data class ViagemAcompanhadaEntity:
- id: String @PrimaryKey
- descricao: String
- veiculo: String
- inicio: String
- termino: String
- status: String
- statusConvite: String  ("pending","accepted","rejected")
- proprietarioNome: String

Return EXACT file contents.`, { label: 'ViagemAcompanhadaEntity.kt' }),

  () => agent(`Write the file at path "${BASE}/core/persistence/entity/CoordenadaEntity.kt".

Package: br.com.traveltracker.core.persistence.entity

Room @Entity(tableName = "coordenada") data class CoordenadaEntity:
- id: String @PrimaryKey  (GUID)
- dataHora: Long  (epoch millis)
- latitude: Double
- longitude: Double
- altitude: Double
- viagemId: String

Return EXACT file contents.`, { label: 'CoordenadaEntity.kt' }),

  () => agent(`Write the file at path "${BASE}/core/persistence/dao/ViagemMinhaDao.kt".

Package: br.com.traveltracker.core.persistence.dao

Room @Dao interface ViagemMinhaDao:
- @Query("SELECT * FROM viagem_minha ORDER BY inicio DESC") fun observeAll(): Flow<List<ViagemMinhaEntity>>
- @Insert(onConflict = OnConflictStrategy.REPLACE) suspend fun insertAll(viagens: List<ViagemMinhaEntity>)
- @Query("DELETE FROM viagem_minha") suspend fun deleteAll()

Imports: kotlinx.coroutines.flow.Flow, androidx.room.*

Return EXACT file contents.`, { label: 'ViagemMinhaDao.kt' }),

  () => agent(`Write the file at path "${BASE}/core/persistence/dao/ViagemAcompanhadaDao.kt".

Package: br.com.traveltracker.core.persistence.dao

Room @Dao interface ViagemAcompanhadaDao:
- @Query("SELECT * FROM viagem_acompanhada ORDER BY inicio DESC") fun observeAll(): Flow<List<ViagemAcompanhadaEntity>>
- @Query("SELECT COUNT(*) FROM viagem_acompanhada WHERE statusConvite = 'pending'") fun observePendingCount(): Flow<Int>
- @Insert(onConflict = OnConflictStrategy.REPLACE) suspend fun insertAll(viagens: List<ViagemAcompanhadaEntity>)
- @Query("DELETE FROM viagem_acompanhada") suspend fun deleteAll()
- @Query("UPDATE viagem_acompanhada SET statusConvite = :status WHERE id = :id") suspend fun updateStatus(id: String, status: String)

Return EXACT file contents.`, { label: 'ViagemAcompanhadaDao.kt' }),

  () => agent(`Write the file at path "${BASE}/core/persistence/dao/CoordenadaDao.kt".

Package: br.com.traveltracker.core.persistence.dao

Room @Dao interface CoordenadaDao:
- @Query("SELECT * FROM coordenada ORDER BY dataHora ASC") fun observeAll(): Flow<List<CoordenadaEntity>>
- @Insert(onConflict = OnConflictStrategy.REPLACE) suspend fun insert(coordenada: CoordenadaEntity)
- @Query("DELETE FROM coordenada WHERE id IN (:ids)") suspend fun deleteByIds(ids: List<String>)
- @Query("DELETE FROM coordenada") suspend fun deleteAll()

Return EXACT file contents.`, { label: 'CoordenadaDao.kt' }),

  () => agent(`Write the file at path "${BASE}/core/persistence/AppDatabase.kt".

Package: br.com.traveltracker.core.persistence

Room @Database:
- entities: [ViagemMinhaEntity::class, ViagemAcompanhadaEntity::class, CoordenadaEntity::class]
- version = 1
- exportSchema = false

Abstract class AppDatabase : RoomDatabase():
- abstract fun viagemMinhaDao(): ViagemMinhaDao
- abstract fun viagemAcompanhadaDao(): ViagemAcompanhadaDao
- abstract fun coordenadaDao(): CoordenadaDao

companion object with DATABASE_NAME = "travel_tracker_db"

Return EXACT file contents.`, { label: 'AppDatabase.kt' }),

  () => agent(`Write the file at path "${BASE}/core/connectivity/ConnectivityObserver.kt".

Package: br.com.traveltracker.core.connectivity

Class ConnectivityObserver @Inject constructor(@ApplicationContext context: Context):
- Uses ConnectivityManager.NetworkCallback
- Exposes isConnected: StateFlow<Boolean>
- On init: check current network and set initial value
- register NetworkCallback to update the StateFlow
- implement fun unregister() to remove callback

Mark @Singleton. No need for lifecycle awareness — just register in init.

Return EXACT file contents.`, { label: 'ConnectivityObserver.kt' }),
])

// DI modules
phase('Core Infrastructure')

const diFiles = await parallel([
  () => agent(`Write the file at path "${BASE}/core/di/DatabaseModule.kt".

Package: br.com.traveltracker.core.di

Hilt @Module @InstallIn(SingletonComponent::class) object DatabaseModule:
- @Provides @Singleton fun provideDatabase(@ApplicationContext context: Context): AppDatabase
  → Room.databaseBuilder(context, AppDatabase::class.java, AppDatabase.DATABASE_NAME).build()
- @Provides fun provideViagemMinhaDao(db: AppDatabase): ViagemMinhaDao = db.viagemMinhaDao()
- @Provides fun provideViagemAcompanhadaDao(db: AppDatabase): ViagemAcompanhadaDao = db.viagemAcompanhadaDao()
- @Provides fun provideCoordenadaDao(db: AppDatabase): CoordenadaDao = db.coordenadaDao()

Return EXACT file contents.`, { label: 'DatabaseModule.kt' }),

  () => agent(`Write the file at path "${BASE}/core/di/NetworkModule.kt".

Package: br.com.traveltracker.core.di

Hilt @Module @InstallIn(SingletonComponent::class) object NetworkModule:
- @Provides @Singleton fun provideSessionManager(@ApplicationContext context: Context): SessionManager
- @Provides @Singleton fun provideApiService(sessionManager: SessionManager): ApiService {
    val retrofit = ApiClient.buildRetrofit { sessionManager.getAccessToken() }
    return retrofit.create(ApiService::class.java)
  }

Return EXACT file contents.`, { label: 'NetworkModule.kt' }),
])

// ─────────────────────────────────────────────────────────────────────────────
// Phase 2: App entry point and navigation
// ─────────────────────────────────────────────────────────────────────────────
phase('App Entry & Navigation')

const appFiles = await parallel([
  () => agent(`Write the file at path "${BASE}/app/TravelTrackerApp.kt".

Package: br.com.traveltracker.app

@HiltAndroidApp class TravelTrackerApp : Application()

Return EXACT file contents.`, { label: 'TravelTrackerApp.kt' }),

  () => agent(`Write the file at path "${BASE}/app/MainActivity.kt".

Package: br.com.traveltracker.app

@AndroidEntryPoint class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()
    setContent {
      TravelTrackerTheme {
        AppNavigation()
      }
    }
  }
}

Imports: androidx.activity.ComponentActivity, androidx.activity.compose.setContent, androidx.activity.enableEdgeToEdge, dagger.hilt.android.AndroidEntryPoint, br.com.traveltracker.design_system.theme.TravelTrackerTheme, br.com.traveltracker.navigation.AppNavigation

Return EXACT file contents.`, { label: 'MainActivity.kt' }),

  () => agent(`Write the file at path "${BASE}/navigation/NavRoutes.kt".

Package: br.com.traveltracker.navigation

Sealed class Screen with object subclasses, each with a route: String property:
- Splash("splash")
- Login("login")
- Register("register")
- RecoverEmail("recover_email")
- RecoverToken("recover_token/{email}", with companion const ROUTE and fun createRoute(email: String))
- RecoverPassword("recover_password/{email}", same pattern)
- Home("home")

Return EXACT file contents.`, { label: 'NavRoutes.kt' }),

  () => agent(`Write the file at path "${BASE}/navigation/AppNavigation.kt".

Package: br.com.traveltracker.navigation

@Composable fun AppNavigation():
- val navController = rememberNavController()
- NavHost(navController, startDestination = Screen.Splash.route) with composable() for each route:
  - Screen.Splash.route → SplashScreen(onNavigateToLogin = { navController.navigate(Screen.Login.route) { popUpTo(Screen.Splash.route) { inclusive = true } } }, onNavigateToHome = { navController.navigate(Screen.Home.route) { popUpTo(Screen.Splash.route) { inclusive = true } } })
  - Screen.Login.route → LoginScreen(onNavigateToHome = { navController.navigate(Screen.Home.route) { popUpTo(0) { inclusive = true } } }, onNavigateToRegister = { navController.navigate(Screen.Register.route) }, onNavigateToRecover = { navController.navigate(Screen.RecoverEmail.route) })
  - Screen.Register.route → RegisterScreen(onNavigateBack = { navController.popBackStack() })
  - Screen.RecoverEmail.route → RecoverEmailScreen(onNavigateBack = { navController.popBackStack() }, onNavigateToToken = { email -> navController.navigate(Screen.RecoverToken.createRoute(email)) })
  - Screen.RecoverToken.route → ValidateTokenScreen with navBackStackEntry argument "email", onNavigateBack = { navController.popBackStack() }, onNavigateToPassword = { email -> navController.navigate(Screen.RecoverPassword.createRoute(email)) }
  - Screen.RecoverPassword.route → NewPasswordScreen with "email" argument, onNavigateToLogin = { navController.navigate(Screen.Login.route) { popUpTo(0) { inclusive = true } } }
  - Screen.Home.route → HomeScreen()

All imports explicit. Use hiltViewModel() from hilt-navigation-compose.

Return EXACT file contents.`, { label: 'AppNavigation.kt' }),
])

// ─────────────────────────────────────────────────────────────────────────────
// Phase 3: Design System components
// ─────────────────────────────────────────────────────────────────────────────
phase('Design System')

const dsFiles = await parallel([
  () => agent(`Write the file at path "${BASE}/design_system/components/AppTextField.kt".

Package: br.com.traveltracker.design_system.components

@Composable fun AppTextField(
  value: String,
  onValueChange: (String) -> Unit,
  label: String,
  modifier: Modifier = Modifier,
  errorMessage: String? = null,
  keyboardType: KeyboardType = KeyboardType.Text,
  imeAction: ImeAction = ImeAction.Next,
  onImeAction: () -> Unit = {}
):
- OutlinedTextField with label, isError = errorMessage != null
- if errorMessage != null show Text(errorMessage, color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.bodySmall) below
- keyboardOptions and keyboardActions wired up
- modifier fills max width

Return EXACT file contents.`, { label: 'AppTextField.kt' }),

  () => agent(`Write the file at path "${BASE}/design_system/components/AppPasswordField.kt".

Package: br.com.traveltracker.design_system.components

@Composable fun AppPasswordField(
  value: String,
  onValueChange: (String) -> Unit,
  label: String,
  modifier: Modifier = Modifier,
  errorMessage: String? = null,
  imeAction: ImeAction = ImeAction.Done,
  onImeAction: () -> Unit = {}
):
- var passwordVisible by remember { mutableStateOf(false) }
- OutlinedTextField with visualTransformation = if (passwordVisible) VisualTransformation.None else PasswordVisualTransformation()
- trailingIcon: IconButton that toggles passwordVisible, uses Icons.Default.Visibility / VisibilityOff
- isError wired to errorMessage
- error text below if errorMessage != null

Return EXACT file contents.`, { label: 'AppPasswordField.kt' }),

  () => agent(`Write the file at path "${BASE}/design_system/components/AppButton.kt".

Package: br.com.traveltracker.design_system.components

@Composable fun AppButton(
  text: String,
  onClick: () -> Unit,
  modifier: Modifier = Modifier,
  isLoading: Boolean = false,
  enabled: Boolean = true
):
- Button(onClick = onClick, modifier = modifier.fillMaxWidth().height(50.dp), enabled = enabled && !isLoading)
- content: if isLoading show CircularProgressIndicator(modifier = Modifier.size(20.dp), color = MaterialTheme.colorScheme.onPrimary, strokeWidth = 2.dp)
           else Text(text)

Return EXACT file contents.`, { label: 'AppButton.kt' }),

  () => agent(`Write the file at path "${BASE}/design_system/components/AppTextButton.kt".

Package: br.com.traveltracker.design_system.components

@Composable fun AppTextButton(
  text: String,
  onClick: () -> Unit,
  modifier: Modifier = Modifier
):
- TextButton(onClick = onClick, modifier = modifier)
- Text(text, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.primary)

Return EXACT file contents.`, { label: 'AppTextButton.kt' }),

  () => agent(`Write the file at path "${BASE}/design_system/components/ErrorBottomSheet.kt".

Package: br.com.traveltracker.design_system.components

@Composable fun ErrorBottomSheet(
  title: String,
  message: String,
  onDismiss: () -> Unit,
  onRetry: (() -> Unit)? = null
):
- Uses ModalBottomSheet(onDismissRequest = onDismiss)
- Column with padding 24.dp
- Text(title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
- Spacer(8.dp)
- Text(message, style = MaterialTheme.typography.bodyMedium)
- Spacer(16.dp)
- Row with buttons: if onRetry != null show OutlinedButton("Tentar novamente", onClick = onRetry) first; then Button("Entendi", onClick = onDismiss)
- Bottom padding for navigation bars

Return EXACT file contents.`, { label: 'ErrorBottomSheet.kt' }),

  () => agent(`Write the file at path "${BASE}/design_system/components/EmptyState.kt".

Package: br.com.traveltracker.design_system.components

@Composable fun EmptyState(
  message: String,
  modifier: Modifier = Modifier,
  ctaText: String? = null,
  onCtaClick: (() -> Unit)? = null
):
- Column centered vertically and horizontally, modifier + fillMaxWidth + padding(32.dp)
- Icon(Icons.Default.Inbox, contentDescription = null, tint = MaterialTheme.colorScheme.outline, modifier = Modifier.size(64.dp))
- Spacer(16.dp)
- Text(message, textAlign = TextAlign.Center, style = MaterialTheme.typography.bodyLarge, color = MaterialTheme.colorScheme.onSurfaceVariant)
- if ctaText != null && onCtaClick != null: Spacer(16.dp) + AppButton(ctaText, onCtaClick, modifier = Modifier.fillMaxWidth(0.6f))

Return EXACT file contents.`, { label: 'EmptyState.kt' }),
])

// ─────────────────────────────────────────────────────────────────────────────
// Phase 4: Features
// ─────────────────────────────────────────────────────────────────────────────
phase('Features')

const featureFiles = await parallel([
  // ── SPLASH ────────────────────────────────────────────────────────────────
  () => agent(`Write 4 files for the Splash feature. For each file give the path comment then the content.

FILE 1: ${BASE}/features/splash/SplashUiState.kt
Package: br.com.traveltracker.features.splash
data class SplashUiState(val isLoading: Boolean = true)

FILE 2: ${BASE}/features/splash/SplashUiEvent.kt
Package: br.com.traveltracker.features.splash
sealed class SplashUiEvent { object NavigateToLogin : SplashUiEvent(); object NavigateToHome : SplashUiEvent() }

FILE 3: ${BASE}/features/splash/SplashViewModel.kt
Package: br.com.traveltracker.features.splash
@HiltViewModel class SplashViewModel @Inject constructor(private val sessionManager: SessionManager) : ViewModel() {
  private val _uiState = MutableStateFlow(SplashUiState())
  val uiState: StateFlow<SplashUiState> = _uiState.asStateFlow()
  private val _events = MutableSharedFlow<SplashUiEvent>()
  val events: SharedFlow<SplashUiEvent> = _events.asSharedFlow()
  init { checkSession() }
  private fun checkSession() { viewModelScope.launch { delay(1500L) // show splash briefly
    if (sessionManager.isSessionValid()) _events.emit(SplashUiEvent.NavigateToHome)
    else _events.emit(SplashUiEvent.NavigateToLogin)
  } }
}

FILE 4: ${BASE}/features/splash/SplashScreen.kt
Package: br.com.traveltracker.features.splash
@Composable fun SplashScreen(onNavigateToLogin: () -> Unit, onNavigateToHome: () -> Unit, viewModel: SplashViewModel = hiltViewModel()):
- Collect events with LaunchedEffect
- Full screen Box with background color primaryContainer (or primary with alpha)
- Center: Column with Text("TravelTracker", style heading, color onPrimary) + Spacer + CircularProgressIndicator(color=white) + Spacer + Text("Carregando…", color=white)

Return all 4 files, each preceded by "=== FILE: <path> ===" header.`, { label: 'Splash feature' }),

  // ── AUTH DATA ─────────────────────────────────────────────────────────────
  () => agent(`Write 4 files for the Auth shared data layer.

FILE 1: ${BASE}/features/auth/data/AuthRepository.kt
Package: br.com.traveltracker.features.auth.data
interface AuthRepository {
  suspend fun login(email: String, password: String): Result<LoginResponse>
  suspend fun register(name: String, email: String, password: String): Result<RegisterResponse>
  suspend fun recoverPassword(email: String): Result<RecoverPasswordResponse>
  suspend fun updatePassword(email: String, newPassword: String): Result<UpdatePasswordResponse>
}

FILE 2: ${BASE}/features/auth/data/AuthRemoteDataSource.kt
Package: br.com.traveltracker.features.auth.data
class AuthRemoteDataSource @Inject constructor(private val apiService: ApiService) {
  suspend fun login(email: String, password: String): LoginResponse = apiService.login(LoginRequest(email, password))
  suspend fun register(name: String, email: String, password: String): RegisterResponse = apiService.register(RegisterRequest(name, email, password))
  suspend fun recoverPassword(email: String): RecoverPasswordResponse = apiService.recoverPassword(RecoverPasswordRequest(email))
  suspend fun updatePassword(email: String, newPassword: String): UpdatePasswordResponse = apiService.updatePassword(UpdatePasswordRequest(email, newPassword))
}

FILE 3: ${BASE}/features/auth/data/AuthRepositoryImpl.kt
Package: br.com.traveltracker.features.auth.data
class AuthRepositoryImpl @Inject constructor(private val remote: AuthRemoteDataSource, private val sessionManager: SessionManager) : AuthRepository {
  override suspend fun login(...): Result<LoginResponse> = runCatching { remote.login(email, password).also { sessionManager.saveSession(it.accessToken, it.refreshToken) } }
  // same pattern for register (no session save), recoverPassword, updatePassword
}

FILE 4: ${BASE}/features/auth/di/AuthModule.kt
Package: br.com.traveltracker.features.auth.di
@Module @InstallIn(SingletonComponent::class) abstract class AuthModule {
  @Binds abstract fun bindAuthRepository(impl: AuthRepositoryImpl): AuthRepository
}

Return all 4 files with "=== FILE: <path> ===" headers.`, { label: 'Auth data layer' }),

  // ── LOGIN ─────────────────────────────────────────────────────────────────
  () => agent(`Write 5 files for the Login feature.

FILE 1: ${BASE}/features/auth/login/LoginUiState.kt
Package: br.com.traveltracker.features.auth.login
data class LoginUiState(
  val email: String = "", val senha: String = "",
  val emailError: String? = null, val senhaError: String? = null,
  val isLoading: Boolean = false,
  val buttonEnabled: Boolean = true
)

FILE 2: ${BASE}/features/auth/login/LoginUiEvent.kt
Package: br.com.traveltracker.features.auth.login
sealed class LoginUiEvent {
  object NavigateToHome : LoginUiEvent()
  object NavigateToRegister : LoginUiEvent()
  object NavigateToRecover : LoginUiEvent()
  data class ShowError(val title: String, val message: String, val canRetry: Boolean = false) : LoginUiEvent()
}

FILE 3: ${BASE}/features/auth/login/domain/AuthenticateUserUseCase.kt
Package: br.com.traveltracker.features.auth.login.domain
class AuthenticateUserUseCase @Inject constructor(private val authRepository: AuthRepository) {
  suspend operator fun invoke(email: String, password: String): Result<Unit> =
    authRepository.login(email, password).map { Unit }
}

FILE 4: ${BASE}/features/auth/login/LoginViewModel.kt
Package: br.com.traveltracker.features.auth.login
@HiltViewModel class LoginViewModel @Inject constructor(private val authenticateUser: AuthenticateUserUseCase) : ViewModel():
- MutableStateFlow<LoginUiState> + MutableSharedFlow<LoginUiEvent>
- fun onEmailChange(value: String), fun onSenhaChange(value: String)
- fun onEntrarClick() : validates (email not blank, email regex valid, senha not blank), if error updates state; if valid sets isLoading=true, calls authenticateUser, on success emits NavigateToHome, on failure checks exception for 401/422 → ShowError with friendly messages
- fun onCriarContaClick() → emit NavigateToRegister
- fun onRecuperarSenhaClick() → emit NavigateToRecover
- Email validation regex: Patterns.EMAIL_ADDRESS

FILE 5: ${BASE}/features/auth/login/LoginScreen.kt
Package: br.com.traveltracker.features.auth.login
@Composable fun LoginScreen(onNavigateToHome: () -> Unit, onNavigateToRegister: () -> Unit, onNavigateToRecover: () -> Unit, viewModel: LoginViewModel = hiltViewModel()):
- Collect state and events
- var showErrorSheet by remember { mutableStateOf(false) }; var errorTitle/errorMessage/canRetry
- LaunchedEffect to handle events
- Scaffold with no top bar; Column (verticalScroll + padding):
  - Spacer(32.dp)
  - Text("TravelTracker", style=headlineLarge, color=primary, textAlign=Center) — logo substitute
  - Spacer(8.dp)
  - Text(stringResource(login_titulo), style=titleLarge, textAlign=Center)
  - Spacer(4.dp)
  - Text(stringResource(login_subtitulo), style=bodyMedium, textAlign=Center, color=onSurfaceVariant)
  - Spacer(32.dp)
  - AppTextField for email
  - Spacer(12.dp)
  - AppPasswordField for senha
  - Spacer(4.dp)
  - AppTextButton("Esqueci minha senha", onNavigateToRecover, Modifier.align(End))
  - Spacer(24.dp)
  - AppButton(if loading "Entrando…" else "Entrar", onClick = viewModel::onEntrarClick, isLoading = state.isLoading)
  - Spacer(16.dp)
  - Row centered: Text("Ainda não tem conta?") + AppTextButton("Criar minha conta", onNavigateToRegister)
- if showErrorSheet → ErrorBottomSheet(title, message, onDismiss = { showErrorSheet=false }, onRetry = if canRetry { { viewModel.onEntrarClick() } } else null)

Return all 5 files with "=== FILE: <path> ===" headers.`, { label: 'Login feature' }),

  // ── REGISTER ──────────────────────────────────────────────────────────────
  () => agent(`Write 5 files for the Cadastro (Register) feature.

FILE 1: ${BASE}/features/auth/register/RegisterUiState.kt
Package: br.com.traveltracker.features.auth.register
data class RegisterUiState(
  val nome: String = "", val email: String = "", val senha: String = "",
  val nomeError: String? = null, val emailError: String? = null, val senhaError: String? = null,
  val isLoading: Boolean = false
)

FILE 2: ${BASE}/features/auth/register/RegisterUiEvent.kt
Package: br.com.traveltracker.features.auth.register
sealed class RegisterUiEvent {
  object NavigateBackToLogin : RegisterUiEvent()
  data class ShowError(val title: String, val message: String) : RegisterUiEvent()
  data class ShowSuccess(val message: String) : RegisterUiEvent()
}

FILE 3: ${BASE}/features/auth/register/domain/RegisterUserUseCase.kt
Package: br.com.traveltracker.features.auth.register.domain
class RegisterUserUseCase @Inject constructor(private val authRepository: AuthRepository) {
  suspend operator fun invoke(nome: String, email: String, senha: String): Result<RegisterResponse> =
    authRepository.register(nome, email, senha)
}

FILE 4: ${BASE}/features/auth/register/RegisterViewModel.kt
Package: br.com.traveltracker.features.auth.register
@HiltViewModel class RegisterViewModel @Inject constructor(private val registerUser: RegisterUserUseCase) : ViewModel():
- onNomeChange, onEmailChange, onSenhaChange
- onSalvarClick():
  - validate: nome has at least 2 words (trim().split(" ").filter { it.isNotBlank() }.size >= 2), email regex valid, senha: length>=6 && has uppercase && has lowercase && has digit && has special char (!@#$%^&*()_+etc)
  - if errors, set errors in state and return
  - isLoading=true, call registerUser, on success emit ShowSuccess then NavigateBackToLogin, on 422 check for "email" in message → emailError, else ShowError

FILE 5: ${BASE}/features/auth/register/RegisterScreen.kt
Package: br.com.traveltracker.features.auth.register
@Composable fun RegisterScreen(onNavigateBack: () -> Unit, viewModel: RegisterViewModel = hiltViewModel()):
- Scaffold with TopAppBar("Criar conta", navigationIcon = back arrow → onNavigateBack)
- Column with scroll + padding 24.dp:
  - AppTextField for nome
  - Spacer(12.dp)
  - AppTextField for email (keyboardType=Email)
  - Spacer(12.dp)
  - AppPasswordField for senha (imeAction=Done)
  - Spacer(24.dp)
  - AppButton("Salvar", onClick=viewModel::onSalvarClick, isLoading=state.isLoading)
- Handle events: ShowSuccess → show Snackbar → then navigate back; ShowError → ErrorBottomSheet; NavigateBackToLogin → onNavigateBack()
- Use SnackbarHostState in Scaffold

Return all 5 files with "=== FILE: <path> ===" headers.`, { label: 'Register feature' }),

  // ── RECOVER PASSWORD ──────────────────────────────────────────────────────
  () => agent(`Write files for the Recuperar Senha feature (3 screens).

FILE 1: ${BASE}/features/auth/recover/domain/RequestRecoveryTokenUseCase.kt
class RequestRecoveryTokenUseCase @Inject constructor(private val authRepository: AuthRepository) {
  suspend operator fun invoke(email: String): Result<String> = // returns token
    authRepository.recoverPassword(email).map { it.token }
}

FILE 2: ${BASE}/features/auth/recover/domain/UpdatePasswordUseCase.kt
class UpdatePasswordUseCase @Inject constructor(private val authRepository: AuthRepository) {
  suspend operator fun invoke(email: String, newPassword: String): Result<Unit> =
    authRepository.updatePassword(email, newPassword).map { Unit }
}

FILE 3: ${BASE}/features/auth/recover/step1_email/RecoverEmailUiState.kt
data class RecoverEmailUiState(val email: String = "", val emailError: String? = null, val isLoading: Boolean = false)

FILE 4: ${BASE}/features/auth/recover/step1_email/RecoverEmailUiEvent.kt
sealed class RecoverEmailUiEvent {
  data class NavigateToToken(val email: String) : RecoverEmailUiEvent()
  data class ShowError(val title: String, val message: String) : RecoverEmailUiEvent()
}

FILE 5: ${BASE}/features/auth/recover/step1_email/RecoverEmailViewModel.kt
@HiltViewModel: validates email not blank + regex, calls RequestRecoveryTokenUseCase, on success emits NavigateToToken(email), on failure ShowError

FILE 6: ${BASE}/features/auth/recover/step1_email/RecoverEmailScreen.kt
TopAppBar("Recuperar senha") + back arrow; Column: explanatory text + AppTextField(email) + AppButton("Enviar código") + handle events with ErrorBottomSheet

FILE 7: ${BASE}/features/auth/recover/step2_token/ValidateTokenUiState.kt
data class ValidateTokenUiState(val digits: List<String> = List(6) { "" }, val error: String? = null, val isLoading: Boolean = false) {
  val isComplete: Boolean get() = digits.all { it.isNotEmpty() }
  val token: String get() = digits.joinToString("")
}

FILE 8: ${BASE}/features/auth/recover/step2_token/ValidateTokenUiEvent.kt
sealed class ValidateTokenUiEvent {
  data class NavigateToPassword(val email: String) : ValidateTokenUiEvent()
  data class ShowError(val title: String, val message: String) : ValidateTokenUiEvent()
  object ShowResendSuccess : ValidateTokenUiEvent()
}

FILE 9: ${BASE}/features/auth/recover/step2_token/ValidateTokenViewModel.kt
@HiltViewModel constructor(private val requestToken: RequestRecoveryTokenUseCase, savedStateHandle: SavedStateHandle):
- val email: String = savedStateHandle.get<String>("email") ?: ""
- var expectedToken: String = "" (set when screen is navigated from step1 via shared ViewModel OR passed via nav arg; for now receive it from the screen init or SharedViewModel)
- NOTE: The token comes from RecoverPasswordResponse. Pass it as a nav argument "token" in Screen.RecoverToken
- Actually, use savedStateHandle.get<String>("token") ?: ""
- fun onDigitChange(index: Int, value: String): updates digits
- fun onValidateClick(): compare token with expectedToken; if match → NavigateToPassword(email); if not → ShowError
- fun onResendClick(): re-call requestToken(email), update expectedToken on success, emit ShowResendSuccess

FILE 10: ${BASE}/features/auth/recover/step2_token/ValidateTokenScreen.kt
TopAppBar("Validar código") + back; Column: instruction text with email; 6 OTP-style boxes (Row of 6 OutlinedTextField each maxLines=1 width=40.dp, onValueChange auto-focus to next); AppButton("Validar código", enabled=state.isComplete); link "Reenviar código"

FILE 11: ${BASE}/features/auth/recover/step3_password/NewPasswordUiState.kt
data class NewPasswordUiState(val novaSenha: String = "", val confirmarSenha: String = "", val novaSenhaError: String? = null, val confirmarSenhaError: String? = null, val isLoading: Boolean = false)

FILE 12: ${BASE}/features/auth/recover/step3_password/NewPasswordUiEvent.kt
sealed class NewPasswordUiEvent { object NavigateToLogin : NewPasswordUiEvent(); data class ShowError(val title: String, val message: String) : NewPasswordUiEvent() }

FILE 13: ${BASE}/features/auth/recover/step3_password/NewPasswordViewModel.kt
@HiltViewModel, savedStateHandle for email; validates senha requirements + match; calls UpdatePasswordUseCase; on success emit NavigateToLogin

FILE 14: ${BASE}/features/auth/recover/step3_password/NewPasswordScreen.kt
TopAppBar("Nova senha") + back; Column: instructions + requirements list + AppPasswordField(novaSenha) + AppPasswordField(confirmar) + AppButton("Alterar senha") + handle events

Also update Screen.RecoverToken.createRoute to take both email and token params:
Actually keep it simple: RecoverToken takes only email as nav arg; the token from the API is stored in a shared ViewModel or passed differently. Use a shared RecoverViewModel at the recover nav graph level.

BUT for simplicity, instead: After step1 succeeds, navigate to step2 passing both email and token as nav args (URL-encoded). Update NavRoutes accordingly.

Return all 14 files with "=== FILE: <path> ===" headers. Make sure all packages are correct.`, { label: 'Recover Password feature' }),

  // ── HOME ─────────────────────────────────────────────────────────────────
  () => agent(`Write all files for the Home (Tela Principal) feature.

FILE 1: ${BASE}/features/home/HomeUiState.kt
Package: br.com.traveltracker.features.home

enum class MinhasViagensFilter { ATUAIS, FINALIZADAS, CANCELADAS, TODAS }
enum class AcompanhadasFilter { ACEITAS, PENDENTES, TODAS }
enum class HomeTab { MINHAS_VIAGENS, ACOMPANHADAS }

data class ViagemMinhaUi(val id: String, val descricao: String, val veiculo: String, val inicio: String, val termino: String, val status: String)
data class ViagemAcompanhadaUi(val id: String, val descricao: String, val veiculo: String, val inicio: String, val termino: String, val status: String, val statusConvite: String, val proprietarioNome: String)

data class HomeUiState(
  val abaAtiva: HomeTab = HomeTab.MINHAS_VIAGENS,
  val minhasViagens: List<ViagemMinhaUi> = emptyList(),
  val viagensAcompanhadas: List<ViagemAcompanhadaUi> = emptyList(),
  val filtroMinhasViagens: MinhasViagensFilter = MinhasViagensFilter.ATUAIS,
  val filtroAcompanhadas: AcompanhadasFilter = AcompanhadasFilter.TODAS,
  val convitesPendentes: Int = 0,
  val isLoading: Boolean = false
)

FILE 2: ${BASE}/features/home/HomeUiEvent.kt
sealed class HomeUiEvent {
  data class ShowError(val title: String, val message: String) : HomeUiEvent()
}

FILE 3: ${BASE}/features/home/data/TripLocalDataSource.kt
class TripLocalDataSource @Inject constructor(private val viagemMinhaDao: ViagemMinhaDao, private val viagemAcompanhadaDao: ViagemAcompanhadaDao) {
  fun observeMinhasViagens(): Flow<List<ViagemMinhaEntity>> = viagemMinhaDao.observeAll()
  fun observeViagenAcompanhadas(): Flow<List<ViagemAcompanhadaEntity>> = viagemAcompanhadaDao.observeAll()
  fun observePendingCount(): Flow<Int> = viagemAcompanhadaDao.observePendingCount()
  suspend fun updateConviteStatus(id: String, status: String) = viagemAcompanhadaDao.updateStatus(id, status)
}

FILE 4: ${BASE}/features/home/data/TrackingRemoteDataSource.kt
class TrackingRemoteDataSource @Inject constructor(private val apiService: ApiService) {
  suspend fun acceptInvite(tripId: String): TrackingAcceptResponse = apiService.acceptInvite(tripId)
  suspend fun rejectInvite(tripId: String): TrackingAcceptResponse = apiService.rejectInvite(tripId)
}

FILE 5: ${BASE}/features/home/data/HomeRepository.kt
interface HomeRepository {
  fun observeMinhasViagens(): Flow<List<ViagemMinhaEntity>>
  fun observeViagemAcompanhadas(): Flow<List<ViagemAcompanhadaEntity>>
  fun observePendingCount(): Flow<Int>
  suspend fun acceptInvite(tripId: String): Result<Unit>
  suspend fun rejectInvite(tripId: String): Result<Unit>
}

FILE 6: ${BASE}/features/home/data/HomeRepositoryImpl.kt
class HomeRepositoryImpl @Inject constructor(private val local: TripLocalDataSource, private val remote: TrackingRemoteDataSource) : HomeRepository {
  override fun observeMinhasViagens() = local.observeMinhasViagens()
  override fun observeViagemAcompanhadas() = local.observeViagenAcompanhadas()
  override fun observePendingCount() = local.observePendingCount()
  override suspend fun acceptInvite(tripId: String): Result<Unit> = runCatching { remote.acceptInvite(tripId); local.updateConviteStatus(tripId, "accepted") }
  override suspend fun rejectInvite(tripId: String): Result<Unit> = runCatching { remote.rejectInvite(tripId); local.updateConviteStatus(tripId, "rejected") }
}

FILE 7: ${BASE}/features/home/di/HomeModule.kt
@Module @InstallIn(SingletonComponent::class) abstract class HomeModule {
  @Binds abstract fun bindHomeRepository(impl: HomeRepositoryImpl): HomeRepository
}

FILE 8: ${BASE}/features/home/domain/ObserveMyTripsUseCase.kt
class ObserveMyTripsUseCase @Inject constructor(private val repo: HomeRepository) {
  operator fun invoke(filter: MinhasViagensFilter): Flow<List<ViagemMinhaEntity>> =
    repo.observeMinhasViagens().map { list ->
      when (filter) {
        MinhasViagensFilter.ATUAIS -> list.filter { it.status in listOf("active", "inactive") }
        MinhasViagensFilter.FINALIZADAS -> list.filter { it.status == "finished" }
        MinhasViagensFilter.CANCELADAS -> list.filter { it.status == "canceled" }
        MinhasViagensFilter.TODAS -> list
      }
    }
}

FILE 9: ${BASE}/features/home/domain/ObserveFollowedTripsUseCase.kt
similar for AcompanhadasFilter on statusConvite field

FILE 10: ${BASE}/features/home/domain/AcceptInviteUseCase.kt
class AcceptInviteUseCase @Inject constructor(private val repo: HomeRepository) {
  suspend operator fun invoke(tripId: String): Result<Unit> = repo.acceptInvite(tripId)
}

FILE 11: ${BASE}/features/home/domain/RejectInviteUseCase.kt
similar for reject

FILE 12: ${BASE}/features/home/HomeViewModel.kt
@HiltViewModel constructor observeMyTrips, observeFollowedTrips, acceptInvite, rejectInvite:
- Combines flows from use cases with current filter
- fun onTabChange(tab: HomeTab)
- fun onFiltroMinhasViagensChange(filter: MinhasViagensFilter) — restarts observation
- fun onFiltroAcompanhadasChange(filter: AcompanhadasFilter)
- fun onAceitarConvite(tripId: String) — calls acceptInvite, on error emits ShowError
- fun onRejeitarConvite(tripId: String)
- Maps entities to UI models

FILE 13: ${BASE}/features/home/components/TripCard.kt
@Composable fun TripCard(viagem: ViagemMinhaUi, onClick: () -> Unit):
Card with elevation, onClick:
- Row: vehicle emoji (fun vehicleEmoji(String): 🚗/🏍/🚌/🚲 based on veiculo toLowerCase) + Column(descricao bold + "Início: inicio" + "Término: termino") + StatusChip(status)

FILE 14: ${BASE}/features/home/components/FollowedTripCard.kt
@Composable fun FollowedTripCard(viagem: ViagemAcompanhadaUi, onAceitar: (() -> Unit)?, onRejeitar: (() -> Unit)?, onClick: () -> Unit):
Similar to TripCard but shows proprietarioNome at top; if statusConvite=="pending" shows Row with Aceitar/Rejeitar buttons; if "accepted" card is clickable; if "rejected" card is dimmed

FILE 15: ${BASE}/features/home/components/MinhasViagensTab.kt
@Composable fun MinhasViagensTab(state: HomeUiState, onFiltroChange: (MinhasViagensFilter) -> Unit, onNovaViagem: () -> Unit, onTripClick: (String) -> Unit):
- FilterChips row (Atuais, Finalizadas, Canceladas, Todas)
- if lista vazia: EmptyState("Você ainda não criou nenhuma viagem.", ctaText="Criar nova viagem", onCtaClick=onNovaViagem)
- else LazyColumn of TripCard items
- FAB ou Button "Nova viagem" at bottom

FILE 16: ${BASE}/features/home/components/ViagensAcompanhadasTab.kt
@Composable fun ViagensAcompanhadasTab(state: HomeUiState, onFiltroChange: (AcompanhadasFilter) -> Unit, onAceitar: (String) -> Unit, onRejeitar: (String) -> Unit, onTripClick: (String) -> Unit):
- FilterChips (Aceitas, Pendentes, Todas)
- if empty: EmptyState("Você ainda não está acompanhando nenhuma viagem.")
- else LazyColumn of FollowedTripCard items

FILE 17: ${BASE}/features/home/HomeScreen.kt
@Composable fun HomeScreen(viewModel: HomeViewModel = hiltViewModel()):
- val state by viewModel.uiState.collectAsStateWithLifecycle()
- var showErrorSheet + errorTitle + errorMessage
- LaunchedEffect for events
- Scaffold:
  - topBar: TopAppBar(title="TravelTracker", actions=[IconButton(Icon(AccountCircle)) {}])
  - bottomBar: NavigationBar {
      NavigationBarItem(selected=MINHAS_VIAGENS, icon=Luggage, label="Minhas Viagens", onClick=...)
      NavigationBarItem(selected=ACOMPANHADAS, icon=Group, label="Viagens Acompanhadas", badge = if convitesPendentes>0 Badge{Text(convitesPendentes)}, onClick=...)
    }
  - content: when (state.abaAtiva) { MINHAS_VIAGENS → MinhasViagensTab; ACOMPANHADAS → ViagensAcompanhadasTab }
- if showErrorSheet: ErrorBottomSheet(...)

Return all 17 files with "=== FILE: <path> ===" headers. Make all packages correct and all imports explicit.`, { label: 'Home feature' }),
])

log('All files generated — now writing them to disk')

// Write all generated content to files
phase('Writing Files')

const allContent = [...coreFiles, ...diFiles, ...appFiles, ...dsFiles, ...featureFiles]
  .filter(Boolean)
  .join('\n\n')

// Parse and write each file
await agent(`You have been given a large block of generated Kotlin source files. Each file section starts with "=== FILE: <path> ===".

Your job: for EACH file section, write the file to disk using the Write tool. Create the directory if needed (on Windows, use mkdir -p equivalent before writing).

The combined content is:

${allContent}

Write EVERY file. For each file:
1. Extract the path from "=== FILE: <path> ==="
2. Extract all content until the next "=== FILE:" marker
3. Write the file to disk using the Write tool with that exact path

IMPORTANT: Create parent directories first if they don't exist using Bash mkdir -p.

After writing all files, list the created files to confirm.`, { label: 'Write all files to disk' })

return 'Implementation complete'
