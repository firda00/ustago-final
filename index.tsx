import React, { useState, useEffect, useMemo, createContext, useContext, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Wrench, Star, CheckCircle2, X, Phone, User, Home, Shield, Clock, 
  LogOut, Loader2, Verified, Truck, Award, ThumbsUp, ArrowLeft, Check, 
  Calendar, Activity, ShieldCheck, ScanSearch, Crown, ZapIcon, PieChart, 
  MessageCircle, TrendingUp, Zap, Wallet, Send, ShieldAlert, Settings,
  Menu, Info, ChevronRight, DollarSign, Hammer, MapPin, Globe, BookOpen,
  Briefcase, FileText, CloudFog, Target, Eye, Gem, Edit3, Save, BarChart3, 
  Users, Layers, Trash2, Plus, Search, AlertCircle, UserRoundPen, 
  ArrowUpRight, Target as TargetIcon, Lock, Mail, EyeOff
} from 'lucide-react';

// --- Types ---
type Lang = 'en' | 'ru' | 'uz';
type View = 'landing' | 'service' | 'works' | 'prices' | 'about' | 'support' | 'auth' | 'dashboard' | 'master-docs' | 'admin';
type Role = 'client' | 'master' | 'admin';

// --- Contexts ---
type ToastType = 'error' | 'success' | 'info';
interface Toast { id: number; message: string; type: ToastType; }
const ToastContext = createContext<{ showToast: (message: string, type?: ToastType) => void; }>({ showToast: () => {} });
const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }: { children?: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] w-full max-w-xs space-y-2 pointer-events-none px-4">
        {toasts.map(toast => (
          <div key={toast.id} className={`pointer-events-auto p-4 rounded-2xl shadow-2xl border flex items-center gap-3 animate-in slide-in-from-top-4 fade-in duration-300 ${toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-600' : toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-600' : 'bg-gray-900 border-gray-800 text-white'}`}>
            {toast.type === 'error' ? <ShieldAlert size={18} /> : toast.type === 'success' ? <CheckCircle2 size={18} /> : <Shield size={18} />}
            <span className="text-[11px] font-black uppercase leading-tight text-center w-full">{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// --- Translation Engine ---

const INITIAL_TRANSLATIONS = {
  en: {
    home: "HOME", profile: "PROFILE", fleet: "MASTERS", heroTitle: "MOBILE REPAIR.", heroDesc: "Elite on-site car service in Uzbekistan. We bring the garage to your doorstep.", getQuote: "BOOK NOW", login: "Login", signUp: "Sign Up", logout: "Sign Out",
    servicesTitle: "Select Services", makeLabel: "Car Brand", modelLabel: "Car Model", yearLabel: "Production Year (>=1990)", phoneLabel: "Phone Number", plateLabel: "License Plate", vinLabel: "VIN Number", back: "Back", next: "NEXT", submit: "CONFIRM MISSION",
    paymentTitle: "Validation", masterSelect: "CHOOSE MASTER", dateSelect: "Choose Date",
    orderStatusPending: "Searching...", orderStatusInProgress: "Active", orderStatusCompleted: "Done",
    admin: "Admin", support: "Support", wallet: "Points", history: "HISTORY", activeMissions: "ACTIVE MISSIONS",
    stageLabel: "STAGE", scheduleHeader: "DEPLOYMENT SCHEDULE", nodeLabel: "Platform Node",
    googleSignIn: "Sign in with Google", googleWelcome: "Welcome", googleDesc: "Authorize your secure platform credentials.",
    masterIncome: "Income", masterStats: "Stats", masterSchedule: "Scheduled", masterReviews: "Reviews",
    accept: "Accept Mission", decline: "Decline", complete: "Mission Accomplished", earnings: "Total Earnings", jobs: "Total Jobs",
    dutyOn: "On Duty", dutyOff: "Duty Off", rating: "Fleet Rating",
    about: "About Us", works: "How it Works", prices: "Pricing",
    serviceList: "Service Catalog", regionLabel: "Select Region", districtLabel: "Select District",
    demoUser: "Client Access", demoMaster: "Master Portal", registerRole: "Select Identity",
    chatInit: "UstaGo Mission Control online. Transmit your signal.", chatWait: "Protocol received. A specialized technician is analyzing your node.",
    missionLocked: "Mission Locked!", missionPreparing: "Our specialist is preparing for departure. Check telemetry in profile.",
    radar: "RADAR", scheduled: "SCHEDULED", missions: "MISSIONS", catalog: "CATALOG", masterDocs: "MASTER PROTOCOL",
    rateMaster: "Rate Service", thankYouRating: "Thank you for your rating!", submitRating: "Submit Rating",
    experienceLabel: "Years of Experience", specializationsLabel: "Specializations", toolsLabel: "Tools/Equipment",
    autoAccept: "Auto-Accept On", plannedChecks: "Planned Protocol",
    vetted: "Protocol Vetted", missionTelemetry: "Check telemetry in profile.", readySync: "READY FOR SYNC",
    driver: "PRIME DRIVER", fleetMember: "ELITE FLEET", authorizeMission: "AUTHORIZE MISSION", pts: "pts",
    backDashboard: "BACK TO DASHBOARD", onlineStatus: "LIVE SYNC NODE", onlineSignal: "Protocol Signal Offline",
    fullName: "Full Name", emailProtocol: "Email Protocol", operationalRegion: "Operational Region", serviceSpecialty: "Service Node Specialty",
    whyTrustTitle: "WHY TRUST USTAGO?",
    whyTrustDesc: "We provide an uncompromising level of transparency and technical excellence for your vehicle.",
    benefit1Title: "VERIFIED MASTERS",
    benefit1Desc: "Every technician passes a 3-stage validation: technical interview, tool calibration check, and criminal background vetting.",
    benefit2Title: "FIXED PRICING",
    benefit2Desc: "No hidden costs. The price you see during the booking protocol is the final price for the mission.",
    benefit3Title: "TRANSPARENT PROTOCOLS",
    benefit3Desc: "Real-time logging of all diagnostics and repairs. Access your car's digital health history at any time.",
    missionMainTitle: "OUR MISSION",
    missionMainDesc: "To transform automotive care in Uzbekistan through mobility, precision, and elite technical sync.",
    verificationProcessTitle: "ELITE NETWORK ADMISSION",
    vStep1: "Document Clearance",
    vStep1Desc: "Full verification of professional certifications and identity.",
    vStep2: "Technical Trial",
    vStep2Desc: "Live assessment of repair skills on modern vehicle nodes.",
    vStep3: "Equipment Audit",
    vStep3Desc: "Mandatory check of diagnostic tools for precision and safety.",
    shareLocation: "SHARE LOCATION",
    locationShared: "LOCATION SHARED",
    locationError: "Location access denied",
    adminTerminal: "ADMIN TERMINAL",
    turnover: "TURNOVER",
    totalMissions: "TOTAL MISSIONS",
    activeFleet: "ACTIVE FLEET",
    manageServices: "SERVICES",
    manageCities: "LOCATIONS",
    manageCommissions: "COMMISSIONS",
    addService: "ADD SERVICE PROTOCOL",
    commissionLabel: "Commission (%)",
    searchPlaceholder: "Search Make, Model, Year...",
    worksStep1Title: "Lock Order",
    worksStep1Desc: "Select services, master and schedule. We lock your node instantly.",
    worksStep2Title: "Verification",
    worksStep2Desc: "Expert master validates the mission protocol for security.",
    worksStep3Title: "Deployment",
    worksStep3Desc: "Mobile unit arrives at your sync coordinate on schedule.",
    worksStep4Title: "Completion",
    worksStep4Desc: "Service finalized, diagnostics logged, node archived.",
    aboutStrategyTitle: "Strategy",
    aboutStrategyDesc: "We use telemetry nodes to sync missions live, ensuring reliability for every Prime Driver.",
    aboutIntegrityTitle: "Integrity",
    aboutIntegrityDesc: "Our platform protocol authorizes only the top verified masters in the region.",
    docsTitle1: "Mission Readiness",
    docsDesc1: "Every UstaGo mission requires a fully synchronized mobile unit with verified diagnostic tools.",
    docsTitle2: "Operational Standards",
    docsDesc2: "Masters must perform a pre-check of the service point environment before mission initialization.",
    docsTitle3: "Equipment Protocol",
    docsDesc3: "Tools must be calibrated according to UstaGo Elite Fleet standards every 30 operational days.",
    docsTitle4: "Geolocation Accuracy",
    docsDesc4: "Masters must keep GPS telemetry active from mission acceptance until protocol completion.",
    docsTitle5: "Visibility Protocol",
    docsDesc5: "Under low visibility nodes (fog, storm), use mandatory high-intensity signaling equipment.",
    liveTelemetry: "Live Telemetry",
    noNodesFound: "No mission nodes found matching query.",
    basePrice: "Base Price",
    financialProtocols: "Financial Protocols",
    financialDesc: "System-wide commission is calculated dynamically per service protocol. Manual adjustments below sync all nodes immediately.",
    fleetRetention: "Average Fleet Retention",
    uzsStarting: "UZS STARTING PROTOCOL",
    errEnterCredentials: "Enter name and email credentials",
    errInvalidExperience: "Experience must be a positive number",
    errEnterSpecializations: "Please specify your technical specializations",
    errEnterTools: "Please list your mandatory equipment/tools",
    arrivalProtocol: "ARRIVAL PROTOCOL",
    helpNow: "HELP NOW",
    helpNowDesc: "Engineer departs immediately to your current node.",
    planSync: "PLAN SYNC",
    planSyncDesc: "Schedule a precise window for future service.",
    immediateSync: "IMMEDIATE SYNC",
    editProfile: "Edit Profile",
    saveProfile: "Save Profile",
    cancel: "Cancel",
    profileSynced: "Profile Protocols Synced",
    weeklyPerformance: "WEEKLY PERFORMANCE",
    last7Days: "Last 7 Days",
    weeklyJobs: "Completed Jobs",
    weeklyRating: "Avg Rating",
    weeklyEarnings: "Weekly Points",
    passwordLabel: "Password Protocol",
    errAuthFailed: "Email or password incorrect",
    loginNow: "LOGIN NOW",
    switchRegister: "Don't have a node? Register",
    switchLogin: "Already have a node? Login",
    authTerminal: "AUTH TERMINAL"
  },
  ru: {
    home: "ГЛАВНАЯ", profile: "ПРОФИЛЬ", fleet: "МАСТЕРАМ", heroTitle: "МОБИЛЬНЫЙ СЕРВИС.", heroDesc: "Экспертный выездной сервис в Узбекистане. Мы привозим гараж к вашему порогу.", getQuote: "ЗАПИСАТЬСЯ", login: "Войти", signUp: "Регистрация", logout: "Выйти",
    servicesTitle: "Выберите услуги", makeLabel: "Марка авто", modelLabel: "Модель авто", yearLabel: "Год выпуска (>=1990)", phoneLabel: "Номер телефона", plateLabel: "Гос. номер", vinLabel: "VIN номер", back: "Назад", next: "ДАЛЕЕ", submit: "ПОДТВЕРДИТЬ",
    paymentTitle: "Валидация", masterSelect: "ВЫБОР МАСТЕРА", dateSelect: "Дата и время",
    orderStatusPending: "Поиск...", orderStatusInProgress: "В процессе", orderStatusCompleted: "Завершен",
    admin: "Админ", support: "Поддержка", wallet: "Баллы", history: "ИСТОРИЯ", activeMissions: "АКТИВНЫЕ МИССИИ",
    stageLabel: "ЭТАП", scheduleHeader: "ГРАФИК ВЫЕЗДА", nodeLabel: "Платформа Нода",
    googleSignIn: "Войти через Google", googleWelcome: "Добро пожаловать", googleDesc: "Авторизуйте свои учетные данные для доступа к платформе.",
    masterIncome: "Доход", masterStats: "Статистика", masterSchedule: "Плановые", masterReviews: "Отзывы",
    accept: "Принять миссию", decline: "Отклонить", complete: "Завершить миссию", earnings: "Всего заработано", jobs: "Заказов выполнено",
    dutyOn: "На смене", dutyOff: "Отдых", rating: "Рейтинг мастера",
    about: "О нас", works: "Как это работает", prices: "Цены",
    serviceList: "Каталог услуг", regionLabel: "Выберите область", districtLabel: "Выберите район",
    demoUser: "Вход Клиента", demoMaster: "Портал Мастера", registerRole: "Выберите роль",
    chatInit: "UstaGo Центр Управления онлайн. Передайте сигнал.", chatWait: "Протокол получен. Специализированный техник анализирует ваш узел.",
    missionLocked: "Миссия заблокирована!", missionPreparing: "Наш специалист готовится к выезду. Следите за телеметрией в профиле.",
    radar: "РАДАР", scheduled: "ПЛАНОВЫЕ", missions: "МИССИИ", catalog: "КАТАЛОГ", masterDocs: "ПРОТОКОЛ МАСТЕРА",
    rateMaster: "Оцените сервис", thankYouRating: "Спасибо за вашу оценку!", submitRating: "Отправить отзыв",
    experienceLabel: "Стаж работы (лет)", specializationsLabel: "Специализации", toolsLabel: "Инструменты/Оборудование",
    autoAccept: "Авто-принятие", plannedChecks: "Плановый Протокол",
    vetted: "Протокол Проверен", missionTelemetry: "Следите за телеметрией в профиле.", readySync: "ГОТОВ К СИНХРОНИЗАЦИИ",
    driver: "ПРАЙМ ВОДИТЕЛЬ", fleetMember: "ЭЛИТНЫЙ ФЛОТ", authorizeMission: "АВТОРИЗОВАТЬ МИССИЮ", pts: "балл",
    backDashboard: "НАЗАД В ПАНЕЛЬ", onlineStatus: "УЗЕЛ СИНХРОНИЗАЦИИ LIVE", onlineSignal: "Сигнал Протокола Оффлайн",
    fullName: "Полное Имя", emailProtocol: "Протокол Email", operationalRegion: "Операционный Регион", serviceSpecialty: "Специализация Узла",
    whyTrustTitle: "ПОЧЕМУ ДОВЕРЯЮТ USTAGO?",
    whyTrustDesc: "Мы обеспечиваем бескомпромиссный уровень прозрачности и технического превосходства для вашего авто.",
    benefit1Title: "ПРОВЕРЕННЫЕ МАСТЕРА",
    benefit1Desc: "Каждый техник проходит 3-этапную валидацию: тех. интервью, проверку калибровки инструмента и проверку биографии.",
    benefit2Title: "ФИКСИРОВАННЫЕ ЦЕНЫ",
    benefit2Desc: "Никаких скрытых расходов. Цена, которую вы видите в протоколе бронирования, является окончательной.",
    benefit3Title: "ПР ОЗРАЧНЫЕ ПРОТОКОЛЫ",
    benefit3Desc: "Логирование всех диагностик и ремонтов в реальном времени. Доступ к цифровой истории авто в любое время.",
    missionMainTitle: "НАША МИССИЯ",
    missionMainDesc: "Трансформировать уход за автомобилем в Узбекистане через мобильность, точность и элитную техническую синхронизацию.",
    verificationProcessTitle: "ПРИЕМ В ЭЛИТНУЮ СЕТЬ",
    vStep1: "Проверка Документов",
    vStep1Desc: "Полная верификация профессиональных сертификатов и личности.",
    vStep2: "Техническое Испытание",
    vStep2Desc: "Живая оценка навыков ремонта на современных узлах автомобилей.",
    vStep3: "Аудит Оборудования",
    vStep3Desc: "Обязательная проверка диагностических инструментов на точность и безопасность.",
    shareLocation: "ПОДЕЛИТЬСЯ ГЕОПОЗИЦИЕЙ",
    locationShared: "ПОЗИЦИЯ ОТПРАВЛЕНА",
    locationError: "Доступ к геопозиции отклонен",
    adminTerminal: "АДМИН ТЕРМИНАЛ",
    turnover: "ОБОРОТ",
    totalMissions: "ВСЕГО ЗАКАЗОВ",
    activeFleet: "АКТИВНЫЙ ФЛОТ",
    manageServices: "УСЛУГИ",
    manageCities: "ЛОКАЦИИ",
    manageCommissions: "КОМИССИИ",
    addService: "ДОБАВИТЬ ПРОТОКОЛ УСЛУГИ",
    commissionLabel: "Комиссия (%)",
    searchPlaceholder: "Поиск: Марка, Модель, Год...",
    worksStep1Title: "Оформление",
    worksStep1Desc: "Выберите услуги, мастера и время. Мы мгновенно бронируем ваш узел.",
    worksStep2Title: "Верификация",
    worksStep2Desc: "Эксперт подтверждает протокол миссии для безопасности.",
    worksStep3Title: "Выезд",
    worksStep3Desc: "Мобильный юнит прибывает по вашим координатам вовремя.",
    worksStep4Title: "Завершение",
    worksStep4Desc: "Сервис выполнен, диагностика сохранена, узел архивирован.",
    aboutStrategyTitle: "Стратегия",
    aboutStrategyDesc: "Мы используем телеметрические узлы для синхронизации миссий, обеспечивая надежность.",
    aboutIntegrityTitle: "Целостность",
    aboutIntegrityDesc: "Наш протокол авторизует только лучших проверенных мастеров в регионе.",
    docsTitle1: "Готовность к миссии",
    docsDesc1: "Каждая миссия UstaGo требует полностью синхронизированного мобильного модуля.",
    docsTitle2: "Операционные стандарты",
    docsDesc2: "Мастера должны проверить окружение перед инициализацией протокола.",
    docsTitle3: "Протокол оборудования",
    docsDesc3: "Инструменты должны калиброваться согласно стандартам каждые 30 дней.",
    docsTitle4: "Точность геолокации",
    docsDesc4: "Мастера обязаны держать GPS активным до завершения миссии.",
    docsTitle5: "Протокол видимости",
    docsDesc5: "При низкой видимости используйте обязательное сигнальное оборудование.",
    liveTelemetry: "Живая телеметрия",
    noNodesFound: "Узлы миссий не найдены по запросу.",
    basePrice: "Базовая цена",
    financialProtocols: "Финансовые протоколы",
    financialDesc: "Комиссия системы рассчитывается динамически. Ручные изменения синхронизируют все узлы.",
    fleetRetention: "Среднее удержание флота",
    uzsStarting: "UZS СТАРТОВЫЙ ПРОТОКОЛ",
    errEnterCredentials: "Введите имя и email",
    errInvalidExperience: "Стаж должен быть положительным числом",
    errEnterSpecializations: "Укажите ваши технические специализации",
    errEnterTools: "Перечислите ваше оборудование и инструменты",
    arrivalProtocol: "ПРОТОКОЛ ПРИБЫТИЯ",
    helpNow: "ПОМОЩЬ СЕЙЧАС",
    helpNowDesc: "Инженер выезжает немедленно по вашим координатам.",
    planSync: "ПЛАНОВЫЙ ВЫЕЗД",
    planSyncDesc: "Запланируйте точное время для будущего сервиса.",
    immediateSync: "МГНОВЕННЫЙ ВЫЕЗД",
    editProfile: "Редактировать профиль",
    saveProfile: "Сохранить профиль",
    cancel: "Отмена",
    profileSynced: "Протоколы профиля синхронизированы",
    weeklyPerformance: "НЕДЕЛЬНАЯ СТАТИСТИКА",
    last7Days: "Последние 7 дней",
    weeklyJobs: "Выполнено заказов",
    weeklyRating: "Средний рейтинг",
    weeklyEarnings: "Баллы за неделю",
    passwordLabel: "Протокол Пароля",
    errAuthFailed: "Email или пароль неверны",
    loginNow: "АВТОРИЗОВАТЬСЯ",
    switchRegister: "Нет узла? Регистрация",
    switchLogin: "Есть узел? Войти",
    authTerminal: "ТЕРМИНАЛ АВТОРИЗАЦИИ"
  },
  uz: {
    home: "ASOSIY", profile: "PROFIL", fleet: "USTALAR", heroTitle: "MOBIL XIZMAT.", heroDesc: "O'zbekistondagi expert mobil avtoservis. Garajni eshigingizgacha olib boramiz.", getQuote: "YOZILISH", login: "Kirish", signUp: "Ro'yxatdan o'tish", logout: "Chiqish",
    servicesTitle: "Xizmatlarni tanlang", makeLabel: "Avto markasi", modelLabel: "Avto modeli", yearLabel: "Ishlab chiqarilgan yili (>=1990)", phoneLabel: "Telefon raqami", plateLabel: "Davlat raqami", vinra: "VIN raqami", back: "Orqaga", next: "KEYINGI", submit: "TASDIQLASH",
    paymentTitle: "Tekshiruv", masterSelect: "USTANI TANLANG", dateSelect: "Sana va vaqt",
    orderStatusPending: "Qidiruv...", orderStatusInProgress: "Jarayonda", orderStatusCompleted: "Tugallandi",
    admin: "Admin", support: "Yordam", wallet: "Ballar", history: "TARIX", activeMissions: "HOZIRGI ISHLAR",
    stageLabel: "BOSQICH", scheduleHeader: "CHIQISH JADVALI", nodeLabel: "Platforma Nuqtasi",
    googleSignIn: "Google orqali kirish", googleWelcome: "Xush kelibsiz", googleDesc: "Platformaga kirish uchun ma'lumotlaringizni tasdiqlang.",
    masterIncome: "Daromad", masterStats: "Statistika", masterSchedule: "Rejali", masterReviews: "Sharhlar",
    accept: "Missiyani olish", decline: "Rad etish", complete: "Missiyani yakunlash", earnings: "Umumiy daromad", jobs: "Bajarilgan ishlar",
    dutyOn: "Navbatchilikda", dutyOff: "Dam olishda", rating: "Usta reytingi",
    about: "Biz haqimizda", works: "Qanday ishlaydi", prices: "Narxlar",
    serviceList: "Xizmatlar katalogi", regionLabel: "Viloyatni tanlang", districtLabel: "Tumanni tanlang",
    demoUser: "Mijoz Kirishi", demoMaster: "Usta Portali", registerRole: "Rolni tanlang",
    chatInit: "UstaGo Boshqaruv Markazi onlayn. Signalni yuboring.", chatWait: "Protokol qabul qilindi. Mutaxassis sizning tuguningizni tahlil qilmoqda.",
    missionLocked: "Missiya qulflangan!", missionPreparing: "Mutaxassisimiz jo'nab ketishga tayyorlanmoqda. Profilingizda telemetriyani kuzatib boring.",
    radar: "RADAR", scheduled: "REJALI", missions: "MISSIYALAR", catalog: "KATALOG", masterDocs: "USTA PROTOKOLI",
    rateMaster: "Xizmatni baholang", thankYouRating: "Baholaganingiz uchun rahmat!", submitRating: "Bahoni yuborish",
    experienceLabel: "Ish tajribasi (yil)", specializationsLabel: "Mutaxassisliklar", toolsLabel: "Asbob-uskunalar",
    autoAccept: "Avto-qabul", plannedChecks: "Rejali Protokol",
    vetted: "Protokol Tasdiqlandi", missionTelemetry: "Profilingizda telemetriyani kuzatib boring.", readySync: "SINKRONLASHGA TAYYOR",
    driver: "PRIME HAYDOVCHI", fleetMember: "ELITA FLOTI", authorizeMission: "MISSIYANI TASDIQLASH", pts: "ball",
    backDashboard: "PANELGA QAYTISH", onlineStatus: "LIVE SINKRONLASH TUGUNI", onlineSignal: "Protokol Signali Oflayn",
    fullName: "To'liq Ism", emailProtocol: "Email Protokoli", operationalRegion: "Operatsion Hudud", serviceSpecialty: "Tugun Ixtisosligi",
    whyTrustTitle: "NEGA USTAGO'GA ISHONISH KERAK?",
    whyTrustDesc: "Biz avtomobilingiz uchun shaffoflik va texnik mukammallikning murosasiz darajasini va'da qilamiz.",
    benefit1Title: "TASDIQLANGAN USTALAR",
    benefit1Desc: "Har bir texnik 3 bosqichli tekshiruvdan o'tadi: texnik suhbat, asboblar kalibrlashini tekshirish va biografiya tekshiruvi.",
    benefit2Title: "BELGILANGAN NARXLAR",
    benefit2Desc: "Yashirin xarajatlar yo'q. Band qilish protokolida ko'rsatilgan narx missiya uchun yakuniy narx hisoblanadi.",
    benefit3Title: "SHAFFAF PROTOKOLLAR",
    benefit3Desc: "Barcha diagnostika va ta'mirlash ishlarini real vaqt rejimida qayd etish. Avtomobilingizning raqamli tarixiga istalgan vaqtda kiring.",
    missionMainTitle: "BIZNING MISSIYA",
    missionMainDesc: "Harakatchanlik, aniqlik va elita texnik sinxronlash orqali O'zbekistonda avtoulov parvarishini o'zgartirish.",
    verificationProcessTitle: "ELITA TARMOG'IGA QABUL",
    vStep1: "Hujjatlarni Tasdiqlash",
    vStep1Desc: "Professional sertifikatlar va shaxsni to'liq tekshirish.",
    vStep2: "Texnik Sinov",
    vStep2Desc: "Zamonaviy avtomobil tugunlarida ta'mirlash mahoratini jonli baholash.",
    vStep3: "Uskunalar Auditi",
    vStep3Desc: "Diagnostika vositalarini aniqlik va xavfsizlik bo'yicha majburiy tekshirish.",
    shareLocation: "JOYLASHUVNI YUBORISH",
    locationShared: "POZITSIYA YUBORILDI",
    locationError: "Joylashuvga ruxsat berilmadi",
    adminTerminal: "ADMIN TERMINAL",
    turnover: "OBOROT",
    totalMissions: "BARCHA BUYURTMALAR",
    activeFleet: "FAOL FLOT",
    manageServices: "XIZMATLAR",
    manageCities: "LOKATSIYALAR",
    manageCommissions: "KOMISSIYALAR",
    addService: "XIZMAT PROTOKOLINI QO'SHISH",
    commissionLabel: "Komissiya (%)",
    searchPlaceholder: "Qidiruv: Marka, Model, Yil...",
    worksStep1Title: "Buyurtma",
    worksStep1Desc: "Xizmatlar, usta va vaqtni tanlang. Biz darhol tuguningizni band qilamiz.",
    worksStep2Title: "Tasdiqlash",
    worksStep2Desc: "Ekspert xavfsizlik uchun missiya protokolini tasdiqlaydi.",
    worksStep3Title: "Chiqish",
    worksStep3Desc: "Mobil unit koordinatangiz bo'yicha o'z vaqtida yetib keladi.",
    worksStep4Title: "Yakunlash",
    worksStep4Desc: "Xizmat bajarildi, diagnostika saqlandi, tugun arxivlandi.",
    aboutStrategyTitle: "Strategiya",
    aboutStrategyDesc: "Biz missiyalarni sinxronlash uchun telemetriya tugunlaridan foydalanamiz.",
    aboutIntegrityTitle: "Yaxlitlik",
    aboutIntegrityDesc: "Bizning protokolimiz mintaqadagi faqat eng yaxshi ustalariga ruxsat beradi.",
    docsTitle1: "Missiya tayyorgarligi",
    docsDesc1: "Har bir UstaGo missiyasi to'liq sinxronlangan mobil modulni talab qiladi.",
    docsTitle2: "Operatsion standartlar",
    docsDesc2: "Ustalar protokolni ishga tushirishdan oldin atrof-muhitni tekshirishlari shart.",
    docsTitle3: "Uskunalar protokoli",
    docsDesc3: "Asboblar har 30 kunda standartlar bo'yicha kalibrlanishi kerak.",
    docsTitle4: "Geolokatsiya aniqligi",
    docsDesc4: "Ustalar missiya yakunigacha GPSni faol holda saqlashlari shart.",
    docsTitle5: "Ko'rinish protokoli",
    docsDesc5: "Past ko'rinish sharoitida majburiy signal uskunalaridan foydalaning.",
    liveTelemetry: "Jonli telemetriya",
    noNodesFound: "So'rov bo'yicha hech qanday missiya tugunlari topilmadi.",
    basePrice: "Boshlang'ich narx",
    financialProtocols: "Moliyaviy protokollar",
    financialDesc: "Tizim komissiyasi dinamik ravishda hisoblanadi. Qo'lda o'zgartirishlar barcha tugunlarni sinxronlaydi.",
    fleetRetention: "O'rtacha flotni ushlab qolish",
    uzsStarting: "UZS BOSHLANG'ICH PROTOKOLI",
    errEnterCredentials: "Ism va emailni kiriting",
    errInvalidExperience: "Ish tajribasi musbat son bo'lishi kerak",
    errEnterSpecializations: "Texnik ixtisosliklaringizni ko'rsating",
    errEnterTools: "Uskunalar va asboblaringizni ro'yxat qiling",
    arrivalProtocol: "KELISH PROTOKOLI",
    helpNow: "HOZIR YORDAM",
    helpNowDesc: "Muhandis darhol koordinatangizga jo'nab ketadi.",
    planSync: "REJALI CHIQISH",
    planSyncDesc: "Kelajakdagi xizmat uchun aniq vaqtni belgilang.",
    immediateSync: "TEZKOR CHIQISH",
    editProfile: "Profilni tahrirlash",
    saveProfile: "Profilni saqlash",
    cancel: "Bekor qilish",
    profileSynced: "Profil protokollari sinxronlandi",
    weeklyPerformance: "HAFTALIK STATISTIKA",
    last7Days: "Oxirgi 7 kun",
    weeklyJobs: "Bajarilgan ishlar",
    weeklyRating: "O'rtacha reyting",
    weeklyEarnings: "Haftalik ballar",
    passwordLabel: "Parol Protokoli",
    errAuthFailed: "Email yoki parol xato",
    loginNow: "KIRISH",
    switchRegister: "Tugun yo'qmi? Ro'yxatdan o'tish",
    switchLogin: "Tugun bormi? Kirish",
    authTerminal: "AVTORIZATSIYA TERMINALI"
  }
};

const TranslationContext = createContext<{
  dictionary: any;
  lang: Lang;
  setLang: (l: Lang) => void;
  editMode: boolean;
  setEditMode: (v: boolean) => void;
  updateTranslation: (key: string, value: string) => void;
}>({
  dictionary: INITIAL_TRANSLATIONS,
  lang: 'ru',
  setLang: () => {},
  editMode: false,
  setEditMode: () => {},
  updateTranslation: () => {}
});

const TranslationProvider = ({ children }: { children?: React.ReactNode }) => {
  const { showToast } = useToast();
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('ustago_lang') as Lang) || 'ru');
  const [editMode, setEditMode] = useState(false);
  const [dictionary, setDictionary] = useState(() => {
    const saved = localStorage.getItem('ustago_translations_sync');
    return saved ? JSON.parse(saved) : INITIAL_TRANSLATIONS;
  });

  useEffect(() => {
    localStorage.setItem('ustago_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('ustago_translations_sync', JSON.stringify(dictionary));
  }, [dictionary]);

  const updateTranslation = (key: string, value: string) => {
    setDictionary((prev: any) => {
      const next = { ...prev };
      next[lang] = { ...next[lang], [key]: value };
      return next;
    });
    showToast(`Global Protocol Updated: ${key}`, "success");
  };

  return (
    <TranslationContext.Provider value={{ dictionary, lang, setLang, editMode, setEditMode, updateTranslation }}>
      {children}
    </TranslationContext.Provider>
  );
};

// --- Editable Text Component ---
const T = ({ k, children }: { k: string, children: React.ReactNode }) => {
  const { editMode, updateTranslation } = useContext(TranslationContext);
  const spanRef = useRef<HTMLSpanElement>(null);

  if (!editMode) return <>{children}</>;

  return (
    <span 
      ref={spanRef}
      contentEditable 
      suppressContentEditableWarning
      onBlur={(e) => {
        const newVal = e.currentTarget.innerText.trim();
        if (newVal !== String(children)) {
          updateTranslation(k, newVal);
        }
      }}
      className="inline-block outline-dashed outline-2 outline-blue-400/50 hover:outline-blue-500 px-1 rounded transition-all focus:outline-solid focus:bg-blue-50 focus:text-black cursor-text"
    >
      {children}
    </span>
  );
};

// --- DB Simulation ---
const DB = {
  getUsers: async () => JSON.parse(localStorage.getItem('ustago_users') || '[]'),
  saveUser: async (user: any) => {
    const users = await DB.getUsers();
    const existingIdx = users.findIndex((u: any) => u.email === user.email);
    if (existingIdx !== -1) {
       users[existingIdx] = { ...users[existingIdx], ...user };
       localStorage.setItem('ustago_users', JSON.stringify(users));
       return users[existingIdx];
    }
    const newUser = { ...user, id: Date.now(), wallet: 0, rating: 5.0, completedJobs: 0, createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('ustago_users', JSON.stringify(users));
    return newUser;
  },
  getLeads: async () => JSON.parse(localStorage.getItem('ustago_leads') || '[]'),
  saveLead: async (lead: any) => {
    const leads = await DB.getLeads();
    leads.unshift({ ...lead, id: Date.now(), timestamp: new Date().toLocaleString(), status: 'pending' });
    localStorage.setItem('ustago_leads', JSON.stringify(leads));
  },
  updateLead: async (id: number, updates: any) => {
    const leads = await DB.getLeads();
    const idx = leads.findIndex((l: any) => l.id === id);
    if (idx !== -1) {
      leads[idx] = { ...leads[idx], ...updates };
      localStorage.setItem('ustago_leads', JSON.stringify(leads));
    }
  },
  getDynamicServices: () => {
    const s = localStorage.getItem('ustago_dynamic_services');
    return s ? JSON.parse(s) : INITIAL_SERVICES;
  },
  saveDynamicServices: (services: any[]) => {
    localStorage.setItem('ustago_dynamic_services', JSON.stringify(services));
  },
  getDynamicGeography: () => {
    const g = localStorage.getItem('ustago_dynamic_geo');
    return g ? JSON.parse(g) : INITIAL_GEOGRAPHY;
  },
  saveDynamicGeography: (geo: any) => {
    localStorage.setItem('ustago_dynamic_geo', JSON.stringify(geo));
  },
  rateOrder: async (leadId: number, masterId: number, rating: number) => {
    const leads = await DB.getLeads();
    const leadIdx = leads.findIndex((l: any) => l.id === leadId);
    if (leadIdx === -1) return;
    leads[leadIdx].rating = rating;
    localStorage.setItem('ustago_leads', JSON.stringify(leads));

    const users = await DB.getUsers();
    const masterIdx = users.findIndex((u: any) => u.id === masterId);
    if (masterIdx !== -1) {
      const masterLeads = leads.filter((l: any) => l.masterId === masterId && l.rating);
      const totalRating = masterLeads.reduce((acc: number, curr: any) => acc + curr.rating, 0);
      const avg = totalRating / (masterLeads.length || 1);
      users[masterIdx].rating = parseFloat(avg.toFixed(1));
      localStorage.setItem('ustago_users', JSON.stringify(users));
    }
  }
};

// --- Constants ---
const INITIAL_GEOGRAPHY = {
  regions: {
    en: ["Tashkent City", "Tashkent Region", "Samarkand", "Bukhara", "Fergana", "Andijan", "Namangan", "Navoi", "Jizzakh", "Syrdarya", "Kashkadarya", "Surkhandarya", "Khorezm", "Karakalpakstan"],
    ru: ["Ташкент Город", "Ташкентская Область", "Самарканд", "Бухара", "Фергана", "Андижан", "Наманган", "Навои", "Джизак", "Сырдарья", "Кашкадарья", "Сурхандарья", "Хорезм", "Каракалпакстан"],
    uz: ["Toshkent Shahri", "Toshkent Viloyati", "Samarqand", "Buxoro", "Farg'ona", "Andijon", "Namangan", "Navoiy", "Jizzax", "Sirdaryo", "Qashqadaryo", "Surxondaryo", "Xorazm", "Qoraqalpog'iston"]
  },
  districts: {
    "Tashkent City": ["Yunusabad", "Chilanzar", "Mirzo-Ulugbek", "Yashnabad", "Shaykhantakhur", "Almazar", "Sergeli", "Yakkasaray", "Mirabad", "Uchtepa", "Bektemir", "Yangihayot"],
    "Ташкент Город": ["Юнусабадский", "Чиланзарский", "Мирзо-Улугбекский", "Яшнабадский", "Шайхантахурский", "Алмазарский", "Сергелийский", "Яккасарайский", "Мирабадский", "Учтепинский", "Бектемирский", "Янгихаётский"],
    "Toshkent Shahri": ["Yunusobod", "Chilonzor", "Mirzo Ulug'bek", "Yashnobod", "Shayxontohur", "Olmazor", "Sergeli", "Yakkasaroy", "Mirobod", "Uchtepa", "Bektemir", "Yangihayot"],
    "Tashkent Region": ["Chirchiq", "Angren", "Olmaliq", "Bekobod", "Yangiyoʻl", "Piskent", "Parkent", "Boʻstonliq", "Zangiota", "Qibray", "Chinoz", "Oʻrtachirchiq"],
    "Ташкентская Область": ["Чирчик", "Ангрен", "Алмалык", "Бекабад", "Янгиюль", "Пскент", "Паркент", "Бостанлык", "З Зангиата", "Кибрай", "Чиназ", "Среднечирчикчикский"],
    "Toshkent Viloyati": ["Chirchiq", "Angren", "Olmaliq", "Bekobod", "Yangiyo'l", "Piskent", "Parkent", "Bo'stonliq", "Zangiota", "Qibray", "Chinoz", "O'rtachirchiq"]
  } as Record<string, string[]>
};

const INITIAL_SERVICES = [
  { id: 1, icon: "🔧", name: { en: "Oil Change", ru: "Замена масла", uz: "Moy almashtirish" }, price: 150000, commission: 10 },
  { id: 2, icon: "💻", name: { en: "Diagnostics", ru: "Диагностика", uz: "Diagnostika" }, price: 100000, commission: 15 },
  { id: 3, icon: "🛑", name: { en: "Brake System", ru: "Тормозная система", uz: "Tormoz tizimi" }, price: 200000, commission: 10 },
  { id: 4, icon: "🌫️", name: { en: "Fog/Visibility Check", ru: "Проверка видимости (Туман)", uz: "Ko'rinishni tekshirish (Tuman)" }, price: 120000, commission: 5 },
  { id: 5, icon: "🛞", name: { en: "Tires", ru: "Шиномонтаж", uz: "Shinomontaj" }, price: 80000, commission: 10 },
  { id: 6, icon: "🚗", name: { en: "Planned Inspection", ru: "Плановый осмотр", uz: "Rejali ko'rik" }, price: 180000, commission: 10 }
];

const CAR_DATA = {
  makes: ["Volkswagen", "Chevrolet", "BYD", "Kia", "Hyundai", "Toyota", "Lada", "Chery", "Jetour", "Exeed", "GWM", "Daewoo"],
  models: {
    "Volkswagen": ["Volkswagen 77", "ID.3", "ID.4", "ID.6", "Teramont", "Touareg", "Passat", "Tiguan", "Golf 7/8"],
    "Chevrolet": ["Onix", "Tracker", "Malibu 2", "Gentra", "Cobalt", "Spark", "Captiva", "Nexia 3", "Traverse", "Tahoe", "Equinox", "Damas", "Labo"],
    "BYD": ["Song Plus", "Han", "Chazor", "Yuan Plus", "Tang", "Seagull", "Destroyer", "Seal"],
    "Kia": ["K5", "K8", "Sportage", "Sorento", "Carnival", "Seltos", "Cerato", "EV6", "Bongo"],
    "Hyundai": ["Elantra", "Sonata", "Tucson", "Santa Fe", "Palisade", "Accent", "Staria", "Creta"],
    "Toyota": ["Camry", "Corolla", "Land Cruiser 300", "Prado", "RAV4", "Avalon", "Highlander", "Hilux"],
    "Lada": ["Vesta", "Granta", "Niva Legend", "Niva Travel", "Largus", "XRAY"],
    "Chery": ["Tiggo 7 Pro", "Tiggo 8 Pro", "Arrizo 6 Pro", "Tiggo 4 Pro"],
    "Jetour": ["X70", "X70 Plus", "X90 Plus", "Dashing"],
    "Exeed": ["LX", "TXL", "VX", " RX"],
    "GWM": ["Haval H6", "Haval Jolion", "Tank 300", "Tank 500", "Poer"],
    "Daewoo": ["Nexia 1/2", "Matiz", "Damas", "Tico", "Espero", "Prince"]
  } as Record<string, string[]>
};

// --- App Component ---
const App = () => {
  return (
    <ToastProvider>
      <TranslationProvider>
        <AppContent />
      </TranslationProvider>
    </ToastProvider>
  );
};

const AppContent = () => {
  const { lang, setLang, dictionary, editMode, setEditMode } = useContext(TranslationContext);
  const [view, setView] = useState<View>('landing');
  const [session, setSession] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [scrolled, setScrolled] = useState(false);
  const t = dictionary[lang];

  useEffect(() => {
    const s = localStorage.getItem('ustago_session');
    if (s) setSession(JSON.parse(s));
    
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('ustago_session');
    setSession(null);
    setView('landing');
  };

  const handleAuth = (u: any) => {
    // Admin Override
    if (u.email === 'firdavsbahtiyorov505@gmail.com') {
      u.role = 'admin';
    }
    localStorage.setItem('ustago_session', JSON.stringify(u));
    setSession(u);
    setView('dashboard');
  };

  return (
    <div className="min-h-screen bg-white pb-24 transition-colors duration-500 text-black">
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 h-20 px-6 flex justify-between items-center ${scrolled || view !== 'landing' ? 'glass-nav border-b border-gray-100 shadow-sm' : 'bg-transparent'}`}>
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('landing')}>
          <div className="bg-[#e31837] p-2.5 rounded-2xl shadow-lg group-hover:rotate-[360deg] transition-transform duration-700">
            <Wrench size={20} className="text-white"/>
          </div>
          <span className="text-xl md:text-2xl font-black uppercase tracking-tighter italic text-black">USTA.GO</span>
        </div>
        
        <div className="hidden lg:flex gap-8 items-center">
           <button onClick={() => setView('service')} className="text-[10px] font-black uppercase tracking-widest hover:text-[#e31837] transition-colors"><T k="serviceList">{t.serviceList}</T></button>
           <button onClick={() => setView('works')} className="text-[10px] font-black uppercase tracking-widest hover:text-[#e31837] transition-all"><T k="works">{t.works}</T></button>
           <button onClick={() => setView('prices')} className="text-[10px] font-black uppercase tracking-widest hover:text-[#e31837] transition-colors"><T k="prices">{t.prices}</T></button>
           <button onClick={() => setView('about')} className="text-[10px] font-black uppercase tracking-widest hover:text-[#e31837] transition-colors"><T k="about">{t.about}</T></button>
        </div>

        <div className="flex items-center gap-3">
          {session?.role === 'admin' && (
            <button onClick={() => setView('admin')} className="p-2 bg-black text-white rounded-xl hover:bg-[#e31837] transition-all"><BarChart3 size={18} /></button>
          )}
          {session?.role === 'admin' && (
            <button 
              onClick={() => setEditMode(!editMode)} 
              className={`p-2 rounded-xl transition-all ${editMode ? 'bg-[#e31837] text-white animate-pulse' : 'bg-gray-100 text-gray-500 hover:text-black'}`}
              title="Toggle Live Content Sync"
            >
              <Edit3 size={18} />
            </button>
          )}
          
          <div className="flex gap-1 p-1 bg-gray-100 rounded-2xl shadow-inner border border-gray-200/50 overflow-hidden">
            {(['en', 'ru', 'uz'] as const).map(l => (
              <button 
                key={l} 
                onClick={() => setLang(l)} 
                className={`px-4 py-2 text-[10px] font-black uppercase transition-all duration-300 relative ${lang === l ? 'text-white' : 'text-gray-400 hover:text-black'}`}
              >
                {lang === l && <div className="absolute inset-0 bg-[#e31837] shadow-lg animate-in fade-in zoom-in-95 duration-300"></div>}
                <span className="relative z-10">{l}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="text-center">
        {view === 'landing' && <LandingView t={t} lang={lang} step={step} setStep={setStep} session={session} setView={setView} />}
        {view === 'service' && <ServiceView t={t} lang={lang} setView={setView} setStep={setStep} />}
        {view === 'works' && <WorksView t={t} />}
        {view === 'prices' && <PricesView t={t} lang={lang} />}
        {view === 'about' && <AboutView t={t} />}
        {view === 'support' && <SupportView t={t} />}
        {view === 'auth' && <AuthView t={t} lang={lang} onAuth={handleAuth} />}
        {view === 'dashboard' && <DashboardView t={t} lang={lang} session={session} onLogout={handleLogout} setView={setView} onUpdateSession={(u: any) => setSession(u)} />}
        {view === 'master-docs' && <MasterDocsView t={t} setView={setView} />}
        {view === 'admin' && <AdminDashboardView t={t} lang={lang} session={session} setView={setView} />}
      </main>

      <nav className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-2xl border-t border-gray-100 px-6 py-4 z-40 flex justify-between items-center shadow-2xl rounded-t-[3rem]">
        <button onClick={() => setView('landing')} className={`flex flex-col items-center gap-1.5 transition-all active:scale-95 ${view === 'landing' ? 'text-[#e31837] scale-110' : 'text-gray-400'}`}>
          <Home size={26}/><span className="text-[9px] font-black uppercase text-center"><T k="home">{t.home}</T></span>
        </button>
        <button onClick={() => setView('service')} className={`flex flex-col items-center gap-1.5 transition-all active:scale-95 ${view === 'service' ? 'text-[#e31837] scale-110' : 'text-gray-400'}`}>
          <ZapIcon size={26}/><span className="text-[9px] font-black uppercase text-center"><T k="serviceList">{t.serviceList}</T></span>
        </button>
        <button onClick={() => setView(session ? 'dashboard' : 'auth')} className={`flex flex-col items-center gap-1.5 transition-all active:scale-95 ${view === 'dashboard' || view === 'auth' ? 'text-[#e31837] scale-110' : 'text-gray-400'}`}>
          <User size={26}/><span className="text-[9px] font-black uppercase text-center"><T k="profile">{t.profile}</T></span>
        </button>
        <button onClick={() => setView('support')} className={`flex flex-col items-center gap-1.5 transition-all active:scale-95 ${view === 'support' ? 'text-[#e31837] scale-110' : 'text-gray-400'}`}>
          <MessageCircle size={26}/><span className="text-[9px] font-black uppercase text-center"><T k="support">{t.support}</T></span>
        </button>
      </nav>
    </div>
  );
};

// --- Sub-Views ---

const LandingView = ({ t, lang, step, setStep, session, setView }: any) => {
  return (
    <div className="space-y-0 text-center">
      <section className="hero-bg text-black relative px-6 py-28 md:py-48 overflow-hidden border-b-[15px] border-[#e31837] rounded-b-[4rem]">
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 md:gap-20">
          <div className="flex-1 space-y-8 md:space-y-10 animate-in fade-in slide-in-from-left-12 duration-700">
            <h1 className="text-5xl md:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] italic text-black text-center">
              <T k="heroTitle">{t.heroTitle}</T>
            </h1>
            <p className="text-lg md:text-2xl text-black/90 italic font-medium max-w-xl mx-auto leading-relaxed text-center">
              <T k="heroDesc">{t.heroDesc}</T>
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-5">
               <button onClick={() => setView('service')} className="bg-black text-white px-8 md:px-10 py-4 md:py-5 rounded-[2rem] md:rounded-[2.5rem] font-black uppercase text-[10px] md:text-[11px] tracking-widest shadow-2xl hover:bg-[#e31837] active:scale-95 transition-all">
                 <T k="serviceList">{t.serviceList}</T>
               </button>
               <button onClick={() => setView('works')} className="bg-white/40 backdrop-blur-3xl px-8 md:px-10 py-4 md:py-5 rounded-[2rem] md:rounded-[2.5rem] border border-black/10 font-black uppercase text-[10px] md:text-[11px] tracking-widest hover:bg-white active:scale-95 transition-all text-black">
                 <T k="works">{t.works}</T>
               </button>
            </div>
          </div>
          <div className="w-full max-w-md">
            <QuoteFlow t={t} lang={lang} step={step} setStep={setStep} session={session} />
          </div>
        </div>
      </section>
      
      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
        {[{ icon: Truck, val: "500+", lbl: "Active Fleet" }, { icon: Award, val: "15k+", lbl: "Satisfied" }, { icon: Star, val: "5.0", lbl: "Avg Rating" }, { icon: ThumbsUp, val: "99%", lbl: "Success Rate" }].map((stat, i) => (
          <div key={i} className="text-center group p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] bg-white border border-gray-100 shadow-Elite hover:border-[#e31837]/40 transition-all hover:-translate-y-3">
            <div className="inline-flex p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] bg-gray-50 mb-6 md:mb-8 text-[#e31837] group-hover:bg-[#e31837] group-hover:text-white transition-all shadow-inner"><stat.icon size={28}/></div>
            <div className="text-3xl md:text-5xl font-black italic mb-2 leading-none text-black tracking-tighter">{stat.val}</div>
            <p className="text-[9px] md:text-[11px] font-black uppercase text-gray-400 tracking-[0.2em] md:tracking-[0.3em]">{stat.lbl}</p>
          </div>
        ))}
      </section>

      <section className="py-24 px-6 bg-gray-50/50">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-black"><T k="whyTrustTitle">{t.whyTrustTitle}</T></h2>
            <p className="text-gray-500 font-medium italic text-lg md:text-xl max-w-2xl mx-auto"><T k="whyTrustDesc">{t.whyTrustDesc}</T></p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: ShieldCheck, k: "benefit1Title", descK: "benefit1Desc" },
              { icon: DollarSign, k: "benefit2Title", descK: "benefit2Desc" },
              { icon: FileText, k: "benefit3Title", descK: "benefit3Desc" }
            ].map((benefit, i) => (
              <div key={i} className="bg-white p-12 rounded-[3.5rem] shadow-Elite border border-gray-100 flex flex-col items-center gap-6 hover:scale-105 transition-transform">
                <div className="p-6 bg-red-50 text-[#e31837] rounded-3xl"><benefit.icon size={36}/></div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-black"><T k={benefit.k}>{t[benefit.k]}</T></h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed italic text-center"><T k={benefit.descK}>{t[benefit.descK]}</T></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none w-full flex justify-center">
          <Target size={600} />
        </div>
        <div className="max-w-5xl mx-auto bg-black text-white p-16 md:p-24 rounded-[5rem] shadow-2xl relative z-10 space-y-10 border-t-8 border-[#e31837]">
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none"><T k="missionMainTitle">{t.missionMainTitle}</T></h2>
          <p className="text-xl md:text-3xl font-medium italic leading-relaxed opacity-80"><T k="missionMainDesc">{t.missionMainDesc}</T></p>
          <div className="flex justify-center gap-8 pt-8 opacity-40">
            <Eye size={48} />
            <Gem size={48} />
            <Award size={48} />
          </div>
        </div>
      </section>
    </div>
  );
};

const QuoteFlow = ({ t, lang, step, setStep, session }: any) => {
  const { showToast } = useToast();
  const dynamicServices = DB.getDynamicServices();
  const dynamicGeo = DB.getDynamicGeography();
  const regions = (dynamicGeo.regions as any)[lang];
  
  const [data, setData] = useState({ 
    services: [] as any[], 
    region: regions[0],
    district: (dynamicGeo.districts as any)[regions[0]]?.[0] || "",
    make: CAR_DATA.makes[0], 
    model: CAR_DATA.models[CAR_DATA.makes[0] as string][0], 
    year: '',
    phone: '', 
    plate: '',
    vin: '',
    date: '',
    isImmediate: false,
    lat: null as number | null,
    lng: null as number | null
  });

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  const toggleService = (s: any) => {
    const isSelected = data.services.find(x => x.id === s.id);
    const newServices = isSelected ? data.services.filter(x => x.id !== s.id) : [...data.services, s];
    setData({ ...data, services: newServices });
  };

  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      showToast("Geolocation not supported", "error");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setData({ ...data, lat: pos.coords.latitude, lng: pos.coords.longitude });
        showToast("Location Secured!", "success");
      },
      () => {
        showToast(t.locationError, "error");
      }
    );
  };

  const handleFinish = async () => {
    await DB.saveLead({ ...data, clientEmail: session?.email || 'guest@ustago.uz' });
    setStep(7);
    showToast("Booking Successful!", "success");
  };

  if (step === 7) return (
    <div className="bg-white p-10 md:p-12 rounded-[3rem] md:rounded-[4rem] shadow-Elite text-center space-y-8 md:space-y-10 animate-in zoom-in-95 border border-gray-100">
      <div className="w-20 h-20 md:w-24 md:h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce"><Check size={40} strokeWidth={3}/></div>
      <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-black"><T k="missionLocked">{t.missionLocked}</T></h3>
      <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed italic"><T k="missionTelemetry">{t.missionTelemetry}</T></p>
      <button onClick={() => setStep(1)} className="w-full bg-[#e31837] text-white py-6 md:py-7 rounded-[1.5rem] md:rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-xl active:scale-95 transition-all"><T k="back">{t.back}</T></button>
    </div>
  );

  return (
    <div className="bg-white p-6 md:p-8 rounded-[2.5rem] md:rounded-[3.5rem] shadow-Elite border border-gray-100 space-y-6 md:space-y-8 animate-in slide-in-from-bottom-6 text-center">
      <div className="flex justify-between items-end">
        <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-black text-center w-full"><T k="getQuote">{t.getQuote}</T></h2>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <p className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 tracking-widest"><T k="servicesTitle">{t.servicesTitle}</T></p>
          <div className="grid grid-cols-2 gap-3 md:gap-4 max-h-[250px] md:max-h-[300px] overflow-y-auto no-scrollbar p-1">
            {dynamicServices.map((s: any) => (
              <button key={s.id} onClick={() => toggleService(s)} className={`p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 transition-all flex flex-col items-center gap-2 md:gap-3 ${data.services.find(x => x.id === s.id) ? 'border-[#e31837] bg-[#e31837] text-white shadow-xl' : 'bg-gray-50 border-transparent text-gray-500'}`}>
                <span className="text-3xl md:text-4xl">{s.icon}</span>
                <span className="text-[9px] md:text-[10px] font-black uppercase text-center leading-tight">{(s.name as any)[lang]}</span>
              </button>
            ))}
          </div>
          <button onClick={next} disabled={data.services.length === 0} className="w-full bg-black text-white py-6 md:py-7 rounded-[1.5rem] md:rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-xl disabled:opacity-30"><T k="next">{t.next}</T></button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 text-center">
          <div className="space-y-1"><p className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 px-2 tracking-widest"><T k="regionLabel">{t.regionLabel}</T></p>
            <select value={data.region} onChange={e => {
              const r = e.target.value;
              setData({...data, region: r, district: (dynamicGeo.districts as any)[r]?.[0] || ""});
            }} className="w-full bg-gray-50 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] font-black text-sm uppercase text-center appearance-none">{regions.map((r: string) => <option key={r} value={r}>{r}</option>)}</select>
          </div>
          <div className="space-y-1"><p className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 px-2 tracking-widest"><T k="districtLabel">{t.districtLabel}</T></p>
            <select value={data.district} onChange={e => setData({...data, district: e.target.value})} className="w-full bg-gray-50 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] font-black text-sm uppercase text-center appearance-none">{(dynamicGeo.districts as any)[data.region as string]?.map((d: string) => <option key={d} value={d}>{d}</option>)}</select>
          </div>
          
          <button 
            onClick={handleShareLocation}
            className={`w-full py-4 rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 transition-all ${data.lat ? 'bg-green-50 text-green-600 border border-green-200 shadow-sm' : 'bg-gray-100 text-black hover:bg-gray-200'}`}
          >
            {data.lat ? <Check size={16} strokeWidth={3}/> : <MapPin size={16} strokeWidth={3}/>}
            {data.lat ? <T k="locationShared">{t.locationShared}</T> : <T k="shareLocation">{t.shareLocation}</T>}
          </button>

          <div className="flex gap-3 md:gap-4 pt-4"><button onClick={back} className="p-5 md:p-6 bg-gray-100 rounded-[1.5rem] md:rounded-[2rem] text-gray-400"><ArrowLeft size={20}/></button><button onClick={next} className="flex-1 bg-black text-white rounded-[1.5rem] md:rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-xl"><T k="next">{t.next}</T></button></div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="space-y-1"><p className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 px-2 tracking-widest"><T k="makeLabel">{t.makeLabel}</T></p>
            <select value={data.make} onChange={e => {
              const m = e.target.value;
              setData({...data, make: m, model: CAR_DATA.models[m as string][0]});
            }} className="w-full bg-gray-50 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] font-black text-sm uppercase text-center appearance-none">{CAR_DATA.makes.map(m => <option key={m} value={m}>{m}</option>)}</select>
          </div>
          <div className="space-y-1"><p className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 px-2 tracking-widest"><T k="modelLabel">{t.modelLabel}</T></p>
            <select value={data.model} onChange={e => setData({...data, model: e.target.value})} className="w-full bg-gray-50 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] font-black text-sm uppercase text-center appearance-none">{CAR_DATA.models[data.make as string].map(m => <option key={m} value={m}>{m}</option>)}</select>
          </div>
          <div className="space-y-1"><p className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 px-2 tracking-widest"><T k="yearLabel">{t.yearLabel}</T></p>
            <input type="number" placeholder="2020" value={data.year} className="w-full bg-gray-50 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] font-black text-sm text-center uppercase" onChange={e => setData({...data, year: e.target.value})} />
          </div>
          <div className="flex gap-3 md:gap-4 pt-4"><button onClick={back} className="p-5 md:p-6 bg-gray-100 rounded-[1.5rem] md:rounded-[2rem] text-gray-400"><ArrowLeft size={20}/></button><button onClick={next} disabled={!data.year || parseInt(data.year) < 1990} className="flex-1 bg-black text-white rounded-[1.5rem] md:rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-xl"><T k="next">{t.next}</T></button></div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <p className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 px-2 tracking-widest"><T k="arrivalProtocol">{t.arrivalProtocol}</T></p>
          
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <button 
              onClick={() => {
                setData({ ...data, isImmediate: true, date: new Date().toISOString() });
                next();
              }}
              className="p-6 md:p-8 bg-red-50 border-2 border-red-100 rounded-3xl flex flex-col items-center gap-3 group hover:border-[#e31837] transition-all"
            >
              <AlertCircle size={32} className="text-[#e31837] animate-pulse" />
              <div className="space-y-1 text-center">
                <p className="text-[11px] font-black uppercase tracking-tight text-black leading-none"><T k="helpNow">{t.helpNow}</T></p>
                <p className="text-[8px] font-medium text-gray-500 italic leading-tight"><T k="helpNowDesc">{t.helpNowDesc}</T></p>
              </div>
            </button>

            <button 
              onClick={() => setData({ ...data, isImmediate: false })}
              className={`p-6 md:p-8 border-2 rounded-3xl flex flex-col items-center gap-3 transition-all ${!data.isImmediate && data.date ? 'bg-black text-white border-black shadow-xl' : 'bg-gray-50 border-gray-100 text-gray-400'}`}
            >
              <Calendar size={32} className={!data.isImmediate && data.date ? 'text-white' : 'text-gray-300'} />
              <div className="space-y-1 text-center">
                <p className={`text-[11px] font-black uppercase tracking-tight leading-none ${!data.isImmediate && data.date ? 'text-white' : 'text-black'}`}><T k="planSync">{t.planSync}</T></p>
                <p className="text-[8px] font-medium italic leading-tight"><T k="planSyncDesc">{t.planSyncDesc}</T></p>
              </div>
            </button>
          </div>

          {!data.isImmediate && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
               <p className="text-[9px] font-black uppercase text-gray-400 px-2 tracking-widest"><T k="dateSelect">{t.dateSelect}</T></p>
               <input 
                type="datetime-local" 
                className="w-full bg-gray-50 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] font-black text-sm text-center outline-none border border-gray-100 focus:border-black transition-all" 
                onChange={e => setData({...data, date: e.target.value})} 
              />
            </div>
          )}

          <div className="flex gap-3 md:gap-4 pt-4">
            <button onClick={back} className="p-5 md:p-6 bg-gray-100 rounded-[1.5rem] md:rounded-[2rem] text-gray-400"><ArrowLeft size={20}/></button>
            {!data.isImmediate && (
              <button onClick={next} disabled={!data.date} className="flex-1 bg-black text-white rounded-[1.5rem] md:rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-xl disabled:opacity-20"><T k="next">{t.next}</T></button>
            )}
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-4">
          <div className="space-y-1"><p className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 px-2 tracking-widest"><T k="phoneLabel">{t.phoneLabel}</T>*</p>
            <input placeholder="+998" value={data.phone} className="w-full bg-gray-50 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] font-black text-sm text-center uppercase" onChange={e => setData({ ...data, phone: e.target.value })} />
          </div>
          <div className="space-y-1"><p className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 px-2 tracking-widest"><T k="plateLabel">{t.plateLabel}</T>*</p>
            <input placeholder="01 A 777 AA" value={data.plate} className="w-full bg-gray-50 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] font-black text-sm text-center uppercase" onChange={e => setData({...data, plate: e.target.value})} />
          </div>
          <div className="flex gap-3 md:gap-4 pt-4"><button onClick={back} className="p-5 md:p-6 bg-gray-100 rounded-[1.5rem] md:rounded-[2rem] text-gray-400"><ArrowLeft size={20}/></button><button onClick={next} disabled={!data.phone || !data.plate} className="flex-1 bg-black text-white rounded-[1.5rem] md:rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-xl"><T k="next">{t.next}</T></button></div>
        </div>
      )}

      {step === 6 && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 bg-black text-white rounded-[2rem] md:rounded-[3rem] space-y-4 relative overflow-hidden border-t-8 border-[#e31837] shadow-xl text-left">
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Protocol 1.0 Deployment</p>
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] md:text-xs font-black uppercase italic"><span>Services</span><span>{data.services.length}</span></div>
              <div className="flex justify-between text-[10px] md:text-xs font-black uppercase italic"><span>Car</span><span>{data.make} ({data.year})</span></div>
              <div className="flex justify-between text-[10px] md:text-xs font-black uppercase italic"><span>Arrival</span><span>{data.isImmediate ? <T k="immediateSync">{t.immediateSync}</T> : new Date(data.date).toLocaleString()}</span></div>
              <div className="flex justify-between text-[10px] md:text-xs font-black uppercase italic"><span>Node</span><span>{data.district}</span></div>
              <div className="flex justify-between text-[10px] md:text-xs font-black uppercase italic"><span>Status</span><span className="text-green-500">Authorized</span></div>
            </div>
            <div className="h-px bg-white/10 my-4"></div>
            <div className="text-center italic pt-2"><span className="text-xl md:text-2xl font-black uppercase tracking-tighter"><T k="readySync">{t.readySync}</T></span></div>
          </div>
          <div className="flex gap-3 md:gap-4"><button onClick={back} className="p-5 md:p-6 bg-gray-100 rounded-[1.5rem] md:rounded-[2rem] text-gray-400"><ArrowLeft size={20}/></button><button onClick={handleFinish} className="flex-1 bg-[#e31837] text-white rounded-[1.5rem] md:rounded-[2rem] font-black uppercase text-[10px] md:text-xs tracking-widest shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all"><CheckCircle2 size={18}/> <T k="submit">{t.submit}</T></button></div>
        </div>
      )}
    </div>
  );
};

const ServiceView = ({ t, lang, setView, setStep }: any) => {
  const services = DB.getDynamicServices();
  return (
    <div className="px-6 py-12 max-w-4xl mx-auto space-y-12 md:space-y-16 animate-in slide-in-from-bottom-8 text-center">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-black leading-none"><T k="serviceList">{t.serviceList}</T></h1>
        <p className="text-gray-400 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-sm">Professional Fleet Catalog</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {services.map((s: any) => (
          <div key={s.id} className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] shadow-Elite border border-gray-100 flex justify-between items-center group hover:border-[#e31837]/30 transition-all text-center">
            <div className="space-y-4 md:space-y-6 flex-1 flex flex-col items-center">
              <div className="text-5xl md:text-6xl group-hover:scale-110 transition-transform">{s.icon}</div>
              <div className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-black leading-none">{(s.name as any)[lang]}</h3>
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Expert Mobile Support</p>
              </div>
            </div>
            <button onClick={() => { setStep(1); setView('landing'); }} className="p-6 md:p-8 bg-black text-white rounded-[1.5rem] md:rounded-[2.5rem] hover:bg-[#e31837] active:scale-95 transition-all shadow-xl group-hover:translate-x-2"><ChevronRight size={24}/></button>
          </div>
        ))}
      </div>
    </div>
  );
};

const WorksView = ({ t }: any) => {
  const steps = [
    { icon: Zap, title: "worksStep1Title", desc: "worksStep1Desc", id: "01" },
    { icon: ShieldCheck, title: "worksStep2Title", desc: "worksStep2Desc", id: "02" },
    { icon: Truck, title: "worksStep3Title", desc: "worksStep3Desc", id: "03" },
    { icon: CheckCircle2, title: "worksStep4Title", desc: "worksStep4Desc", id: "04" }
  ];

  return (
    <div className="px-6 py-12 max-w-4xl mx-auto space-y-16 md:space-y-20 animate-in slide-in-from-bottom-8 text-center">
      <h1 className="text-6xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-black"><T k="works">{t.works}</T></h1>
      <div className="space-y-16 md:space-y-20">
        {steps.map((w, i) => (
          <div key={i} className="flex flex-col md:flex-row gap-8 md:gap-10 items-center text-center">
            <div className="text-7xl md:text-9xl font-black italic text-[#e31837]/5 leading-none">{w.id}</div>
            <div className="space-y-4 pt-2 md:pt-4 flex-1 flex flex-col items-center">
              <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
                <div className="p-4 bg-gray-50 rounded-2xl text-[#e31837] shadow-inner"><w.icon size={28}/></div>
                <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-black"><T k={w.title}>{t[w.title]}</T></h3>
              </div>
              <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed italic max-w-md text-center"><T k={w.desc}>{t[w.desc]}</T></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PricesView = ({ t, lang }: any) => {
  const services = DB.getDynamicServices();
  return (
    <div className="px-6 py-12 max-w-4xl mx-auto space-y-12 md:space-y-16 animate-in slide-in-from-bottom-8 text-center">
      <h1 className="text-6xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-black"><T k="prices">{t.prices}</T></h1>
      <div className="bg-black text-white p-8 md:p-12 rounded-[3.5rem] md:rounded-[5rem] space-y-8 md:space-y-10 shadow-2xl relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12 pointer-events-none"><DollarSign size={200}/></div>
        <div className="space-y-6 md:space-y-8 relative z-10">
          {services.map((s: any) => (
            <div key={s.id} className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/10 pb-6 md:pb-8 hover:bg-white/5 transition-colors p-4 rounded-2xl md:rounded-3xl group text-center md:text-left">
               <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                 <span className="text-4xl md:text-5xl group-hover:scale-110 transition-transform">{s.icon}</span>
                 <div className="space-y-1 flex flex-col items-center md:items-start">
                   <span className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">{(s.name as any)[lang]}</span>
                 </div>
               </div>
               <div className="text-center md:text-right">
                  <span className="text-4xl md:text-5xl font-black italic text-[#e31837] tracking-tighter leading-none">{s.price.toLocaleString()}</span>
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest block opacity-40 mt-1"><T k="uzsStarting">{t.uzsStarting}</T></span>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutView = ({ t }: any) => (
  <div className="px-6 py-12 max-w-4xl mx-auto space-y-16 md:space-y-20 animate-in slide-in-from-bottom-8 text-center">
    <h1 className="text-6xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-black"><T k="about">{t.about}</T></h1>
    <div className="p-10 md:p-16 bg-gray-50 rounded-[3.5rem] md:rounded-[5rem] border border-gray-100 space-y-10 md:space-y-12">
      <p className="text-2xl md:text-3xl font-medium leading-relaxed text-gray-700 italic text-center">
        USTA.GO is the next evolution of automotive care in Uzbekistan. We bridge elite expertise with instant accessibility through our mobile fleet.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        <div className="p-8 md:p-10 bg-white rounded-[2.5rem] md:rounded-[3rem] space-y-6 shadow-Elite flex flex-col items-center">
          <ZapIcon className="text-[#e31837]" size={40}/>
          <h4 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-black text-center"><T k="aboutStrategyTitle">{t.aboutStrategyTitle}</T></h4>
          <p className="text-sm text-gray-500 leading-relaxed font-medium italic text-center"><T k="aboutStrategyDesc">{t.aboutStrategyDesc}</T></p>
        </div>
        <div className="p-8 md:p-10 bg-white rounded-[2.5rem] md:rounded-[3rem] space-y-6 shadow-Elite flex flex-col items-center">
          <ShieldCheck className="text-[#e31837]" size={40}/>
          <h4 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-black text-center"><T k="aboutIntegrityTitle">{t.aboutIntegrityTitle}</T></h4>
          <p className="text-sm text-gray-500 leading-relaxed font-medium italic text-center"><T k="aboutIntegrityDesc">{t.aboutIntegrityDesc}</T></p>
        </div>
      </div>
    </div>
  </div>
);

const SupportView = ({ t }: any) => {
  const [messages, setMessages] = useState<any[]>(() => {
    const saved = localStorage.getItem('ustago_chat_v3');
    return saved ? JSON.parse(saved) : [{ id: 1, text: t.chatInit, sender: 'bot' }];
  });
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('ustago_chat_v3', JSON.stringify(messages));
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const newMsgs = [...messages, { id: Date.now(), text: input, sender: 'user' }];
    setMessages(newMsgs);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now()+1, text: t.chatWait, sender: 'bot' }]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 pt-20 pb-24 md:static md:px-6 md:py-12 max-w-4xl mx-auto flex flex-col bg-white text-center">
       <div className="flex-1 bg-white md:bg-gray-50 md:rounded-[4rem] flex flex-col overflow-hidden md:border border-gray-100 shadow-Elite">
          <div className="bg-black p-4 md:p-6 flex justify-between items-center text-white">
             <div className="flex items-center gap-3"><Activity size={18} className="text-[#e31837]"/><span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest"><T k="onlineStatus">{t.onlineStatus}</T></span></div>
             <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          <div ref={scrollRef} className="flex-1 p-6 md:p-10 space-y-6 md:space-y-8 overflow-y-auto no-scrollbar">
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] text-sm md:text-base font-medium italic shadow-sm leading-relaxed ${m.sender === 'user' ? 'bg-[#e31837] text-white' : 'bg-gray-100 md:bg-white text-gray-800'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 md:p-8 bg-white border-t border-gray-100 flex gap-3 md:gap-4">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Transmit protocol..." className="flex-1 bg-gray-50 p-4 md:p-5 rounded-xl md:rounded-2xl text-sm font-black uppercase text-center outline-none focus:ring-4 ring-[#e31837]/10" />
            <button onClick={send} className="p-4 md:p-5 bg-black text-white rounded-xl md:rounded-2xl hover:bg-[#e31837] transition-all shadow-xl active:scale-95"><Send size={20}/></button>
          </div>
       </div>
    </div>
  );
};

const AuthView = ({ t, lang, onAuth }: any) => {
  const { showToast } = useToast();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [authStep, setAuthStep] = useState(1);
  const [role, setRole] = useState<Role>('client');
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    specialtyId: 1, 
    region: (INITIAL_GEOGRAPHY.regions as any)[lang][0],
    experience: '',
    specializations: '',
    tools: ''
  });
  
  const dynamicGeo = DB.getDynamicGeography();
  const regions = (dynamicGeo.regions as any)[lang];

  const handleAuth = async () => {
    if (authMode === 'login') {
      if (!formData.email.trim() || !formData.password.trim()) {
        return showToast(t.errEnterCredentials, "error");
      }
      const users = await DB.getUsers();
      const user = users.find((u: any) => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        showToast("Access Granted", "success");
        onAuth(user);
      } else {
        showToast(t.errAuthFailed, "error");
      }
    } else {
      if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
        return showToast(t.errEnterCredentials, "error");
      }
      
      if (role === 'master') {
        const exp = parseInt(formData.experience);
        if (isNaN(exp) || exp <= 0) return showToast(t.errInvalidExperience, "error");
        if (!formData.specializations.trim()) return showToast(t.errEnterSpecializations, "error");
        if (!formData.tools.trim()) return showToast(t.errEnterTools, "error");
      }

      const user = await DB.saveUser({ ...formData, role: role });
      showToast("Node Authorized!", "success");
      onAuth(user);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 flex items-center justify-center bg-gray-50/20 text-center">
      <div className="max-w-md w-full bg-white p-10 md:p-12 rounded-[3.5rem] md:rounded-[4rem] shadow-Elite space-y-10 border border-gray-100 animate-in zoom-in-95">
        <div className="flex justify-center"><div className="bg-[#e31837] p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] shadow-xl animate-bounce"><Wrench size={32} className="text-white"/></div></div>
        
        <div className="flex justify-center gap-4 bg-gray-50 p-1 rounded-2xl">
           <button onClick={() => { setAuthMode('login'); setAuthStep(2); }} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${authMode === 'login' ? 'bg-black text-white shadow-lg' : 'text-gray-400'}`}><T k="login">{t.login}</T></button>
           <button onClick={() => { setAuthMode('register'); setAuthStep(1); }} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${authMode === 'register' ? 'bg-black text-white shadow-lg' : 'text-gray-400'}`}><T k="signUp">{t.signUp}</T></button>
        </div>

        {authMode === 'register' && authStep === 1 && (
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic leading-none"><T k="registerRole">{t.registerRole}</T></h2>
              <p className="text-gray-400 font-bold text-xs md:text-sm">Authorize your platform node credentials</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <button onClick={() => { setRole('client'); setAuthStep(2); }} className="p-6 md:p-8 bg-gray-50 rounded-[1.5rem] md:rounded-[2rem] border-2 border-transparent hover:border-[#e31837] transition-all flex items-center justify-between group text-left">
                <div className="flex flex-col items-start">
                  <p className="text-lg md:text-xl font-black uppercase italic text-black leading-none"><T k="demoUser">{t.demoUser}</T></p>
                  <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1"><T k="driver">{t.driver}</T></p>
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-[#e31837] group-hover:translate-x-1 transition-all"/>
              </button>
              <button onClick={() => { setRole('master'); setAuthStep(2); }} className="p-6 md:p-8 bg-gray-50 rounded-[1.5rem] md:rounded-[2rem] border-2 border-transparent hover:border-[#e31837] transition-all flex items-center justify-between group text-left">
                <div className="flex flex-col items-start">
                  <p className="text-lg md:text-xl font-black uppercase italic text-black leading-none"><T k="demoMaster">{t.demoMaster}</T></p>
                  <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1"><T k="fleetMember">{t.fleetMember}</T></p>
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-[#e31837] group-hover:translate-x-1 transition-all"/>
              </button>
            </div>
          </div>
        )}

        {authStep === 2 && (
          <div className="space-y-6 max-h-[65vh] overflow-y-auto no-scrollbar p-1 text-left">
            {authMode === 'register' && (
              <button onClick={() => setAuthStep(1)} className="text-[#e31837] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mb-4 mx-auto text-center"><ArrowLeft size={16}/> <T k="back">{t.back}</T></button>
            )}
            
            <div className="space-y-4">
              {authMode === 'register' && (
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center"><T k="fullName">{t.fullName}</T> *</p>
                  <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 p-5 rounded-[1.5rem] text-sm font-black uppercase text-center border border-gray-100 focus:ring-2 ring-[#e31837]/10 transition-all outline-none" />
                </div>
              )}
              
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center"><T k="emailProtocol">{t.emailProtocol}</T> *</p>
                <div className="relative">
                   <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                   <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 pl-14 pr-5 py-5 rounded-[1.5rem] text-sm font-black text-center border border-gray-100 focus:ring-2 ring-[#e31837]/10 transition-all outline-none" placeholder="node@ustago.uz" />
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center"><T k="passwordLabel">{t.passwordLabel}</T> *</p>
                <div className="relative">
                   <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                   <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-gray-50 pl-14 pr-5 py-5 rounded-[1.5rem] text-sm font-black text-center border border-gray-100 focus:ring-2 ring-[#e31837]/10 transition-all outline-none" placeholder="••••••••" />
                </div>
              </div>

              {authMode === 'register' && role === 'master' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center"><T k="operationalRegion">{t.operationalRegion}</T></p>
                    <select value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})} className="w-full bg-gray-50 p-5 rounded-[1.5rem] text-sm font-black uppercase text-center border border-gray-100 appearance-none focus:ring-2 ring-[#e31837]/10 outline-none">
                      {regions.map((r: string) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center"><T k="serviceSpecialty">{t.serviceSpecialty}</T></p>
                    <select value={formData.specialtyId} onChange={e => setFormData({...formData, specialtyId: parseInt(e.target.value)})} className="w-full bg-gray-50 p-5 rounded-[1.5rem] text-sm font-black uppercase text-center border border-gray-100 appearance-none focus:ring-2 ring-[#e31837]/10 outline-none">
                      {INITIAL_SERVICES.map(s => <option key={s.id} value={s.id}>{(s.name as any)[lang]}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center"><T k="experienceLabel">{t.experienceLabel}</T> *</p>
                    <input type="number" min="1" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} className="w-full bg-gray-50 p-5 rounded-[1.5rem] text-sm font-black text-center border border-gray-100 focus:ring-2 ring-[#e31837]/10 transition-all outline-none" placeholder="1+" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center"><T k="specializationsLabel">{t.specializationsLabel}</T> *</p>
                    <textarea value={formData.specializations} onChange={e => setFormData({...formData, specializations: e.target.value})} className="w-full bg-gray-50 p-5 rounded-[1.5rem] text-sm font-medium italic text-center border border-gray-100 min-h-[100px] focus:ring-2 ring-[#e31837]/10 transition-all outline-none no-scrollbar" placeholder="Engine Repair, Electronics, HVAC..." />
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center"><T k="toolsLabel">{t.toolsLabel}</T> *</p>
                    <textarea value={formData.tools} onChange={e => setFormData({...formData, tools: e.target.value})} className="w-full bg-gray-50 p-5 rounded-[1.5rem] text-sm font-medium italic text-center border border-gray-100 min-h-[100px] focus:ring-2 ring-[#e31837]/10 transition-all outline-none no-scrollbar" placeholder="Diagnostic Scanners, Pro Wrench Kit, Hydraulic Jacks..." />
                  </div>
                </div>
              )}
            </div>

            <button onClick={handleAuth} className="w-full bg-[#e31837] text-white py-6 rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest shadow-2xl active:scale-95 transition-all mt-8 flex items-center justify-center gap-3 mx-auto">
              <Verified size={20}/> <T k={authMode === 'login' ? 'loginNow' : 'authorizeMission'}>{authMode === 'login' ? t.loginNow : t.authorizeMission}</T>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const DashboardView = ({ t, lang, session, onLogout, setView, onUpdateSession }: any) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState(session.role === 'master' ? 'radar' : 'active');
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editData, setEditData] = useState({ ...session });

  const fetchLeads = async () => {
    setLoading(true);
    const all = await DB.getLeads();
    const filtered = session.role === 'master' ? all : all.filter((l: any) => l.clientEmail === session.email);
    setLeads(filtered);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, [session]);

  const acceptOrder = async (id: number) => {
    await DB.updateLead(id, { status: 'in-progress', masterId: session.id, masterName: session.name });
    showToast("Mission Accepted!", "success");
    fetchLeads();
  };

  const completeOrder = async (id: number) => {
    await DB.updateLead(id, { status: 'completed', completedAt: Date.now() });
    const updated = await DB.saveUser({ ...session, wallet: (session.wallet || 0) + 100, completedJobs: (session.completedJobs || 0) + 1 });
    localStorage.setItem('ustago_session', JSON.stringify(updated));
    onUpdateSession(updated);
    showToast("Mission Accomplished! Points synced.", "success");
    fetchLeads();
  };

  const handleRate = async (leadId: number, masterId: number, rating: number) => {
    await DB.rateOrder(leadId, masterId, rating);
    showToast(t.thankYouRating, "success");
    fetchLeads();
  };

  const handleSaveProfile = async () => {
    if (!editData.name.trim() || !editData.email.trim()) {
      return showToast(t.errEnterCredentials, "error");
    }
    if (session.role === 'master') {
      const exp = parseInt(editData.experience);
      if (isNaN(exp) || exp <= 0) return showToast(t.errInvalidExperience, "error");
      if (!editData.specializations.trim()) return showToast(t.errEnterSpecializations, "error");
      if (!editData.tools.trim()) return showToast(t.errEnterTools, "error");
    }

    const updated = await DB.saveUser(editData);
    localStorage.setItem('ustago_session', JSON.stringify(updated));
    onUpdateSession(updated);
    setIsEditingProfile(false);
    showToast(t.profileSynced, "success");
  };

  const weeklyStats = useMemo(() => {
    if (session.role !== 'master') return null;
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const weeklyCompleted = leads.filter(l => 
      l.status === 'completed' && 
      l.masterId === session.id && 
      (l.completedAt || l.id) >= sevenDaysAgo
    );
    
    const count = weeklyCompleted.length;
    const ratings = weeklyCompleted.filter(l => l.rating).map(l => l.rating);
    const avgRating = ratings.length > 0 
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
      : '5.0';
    const earnings = count * 100;
    
    return { count, avgRating, earnings };
  }, [leads, session]);

  const filtered = useMemo(() => {
    if (session.role === 'client') {
      return activeTab === 'active' ? leads.filter(l => l.status !== 'completed') : leads.filter(l => l.status === 'completed');
    }
    if (activeTab === 'radar') return leads.filter(l => l.status === 'pending');
    if (activeTab === 'missions') return leads.filter(l => l.status === 'in-progress' && l.masterId === session.id);
    if (activeTab === 'scheduled') return leads.filter(l => (l.status === 'pending' || l.status === 'in-progress') && l.date && new Date(l.date) > new Date());
    if (activeTab === 'history') return leads.filter(l => l.status === 'completed' && l.masterId === session.id);
    return [];
  }, [leads, activeTab, session]);

  const masterTabs = [
    { id: 'radar', label: t.radar, icon: ScanSearch },
    { id: 'missions', label: t.missions, icon: Zap },
    { id: 'scheduled', label: t.plannedChecks, icon: Calendar },
    { id: 'history', label: t.history, icon: Clock },
    { id: 'catalog', label: t.catalog, icon: BookOpen }
  ];

  return (
    <div className="min-h-screen pt-12 pb-40 px-6 max-w-3xl mx-auto space-y-10 md:space-y-12 animate-in fade-in duration-700 text-center">
      {/* Profile Header Card */}
      <div className="bg-black text-white p-8 md:p-12 rounded-[3.5rem] md:rounded-[4rem] relative overflow-hidden shadow-Elite border-b-[10px] border-[#e31837] text-center">
        <div className="absolute top-0 right-0 p-12 opacity-[0.08] rotate-12 pointer-events-none"><Activity size={300}/></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10">
          <div className="space-y-6 md:space-y-8 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-[#e31837] rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-xl">
              <Crown size={14}/> {session.role === 'master' ? <T k="fleetMember">{t.fleetMember}</T> : <T k="driver">{t.driver}</T>}
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none text-white">{session.name}</h1>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 items-center">
              {(session.role === 'master' || session.role === 'admin') && (
                <>
                  <div className="flex items-center gap-3 bg-white/10 px-5 md:px-6 py-2 md:py-3 rounded-[1.5rem] border border-white/5 backdrop-blur-xl">
                    <Star size={18} className="text-yellow-400 fill-yellow-400"/>
                    <span className="text-lg md:text-xl font-black text-white">{session.rating}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 px-5 md:px-6 py-2 md:py-3 rounded-[1.5rem] border border-white/5 backdrop-blur-xl">
                    <Wallet size={18} className="text-[#e31837]"/>
                    <span className="text-lg md:text-xl font-black italic text-white">{session.wallet || 0} <T k="pts">{t.pts}</T></span>
                  </div>
                </>
              )}
              <button 
                onClick={() => setIsEditingProfile(true)}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/20 px-5 md:px-6 py-2 md:py-3 rounded-[1.5rem] border border-white/10 transition-all active:scale-95 group"
              >
                <UserRoundPen size={18} className="group-hover:text-[#e31837] transition-colors" />
                <span className="text-[10px] font-black uppercase tracking-widest"><T k="editProfile">{t.editProfile}</T></span>
              </button>
            </div>
          </div>
          <button onClick={onLogout} className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center hover:bg-red-600/30 active:scale-90 transition-all border border-white/5 group shadow-inner text-white">
            <LogOut size={32} className="group-hover:text-red-500 transition-colors"/>
          </button>
        </div>
      </div>

      {isEditingProfile ? (
        <div className="bg-white p-8 md:p-12 rounded-[4rem] shadow-Elite border border-gray-100 space-y-8 animate-in zoom-in-95 text-left">
           <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-red-50 text-[#e31837] rounded-2xl"><UserRoundPen size={24}/></div>
              <h2 className="text-3xl font-black uppercase italic tracking-tighter text-black"><T k="editProfile">{t.editProfile}</T></h2>
           </div>
           
           <div className="space-y-5">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center"><T k="fullName">{t.fullName}</T> *</p>
                <input value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} className="w-full bg-gray-50 p-5 rounded-[1.5rem] text-sm font-black uppercase text-center border border-gray-100 focus:ring-2 ring-[#e31837]/10 transition-all outline-none" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center"><T k="emailProtocol">{t.emailProtocol}</T> *</p>
                <input value={editData.email} onChange={e => setEditData({...editData, email: e.target.value})} className="w-full bg-gray-50 p-5 rounded-[1.5rem] text-sm font-black text-center border border-gray-100 focus:ring-2 ring-[#e31837]/10 transition-all outline-none" />
              </div>

              {session.role === 'master' && (
                <div className="space-y-5">
                   <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center"><T k="experienceLabel">{t.experienceLabel}</T> *</p>
                    <input type="number" value={editData.experience} onChange={e => setEditData({...editData, experience: e.target.value})} className="w-full bg-gray-50 p-5 rounded-[1.5rem] text-sm font-black text-center border border-gray-100 focus:ring-2 ring-[#e31837]/10 transition-all outline-none" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center"><T k="specializationsLabel">{t.specializationsLabel}</T> *</p>
                    <textarea value={editData.specializations} onChange={e => setEditData({...editData, specializations: e.target.value})} className="w-full bg-gray-50 p-5 rounded-[1.5rem] text-sm font-medium italic text-center border border-gray-100 min-h-[100px] focus:ring-2 ring-[#e31837]/10 transition-all outline-none no-scrollbar" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center"><T k="toolsLabel">{t.toolsLabel}</T> *</p>
                    <textarea value={editData.tools} onChange={e => setEditData({...editData, tools: e.target.value})} className="w-full bg-gray-50 p-5 rounded-[1.5rem] text-sm font-medium italic text-center border border-gray-100 min-h-[100px] focus:ring-2 ring-[#e31837]/10 transition-all outline-none no-scrollbar" />
                  </div>
                </div>
              )}
           </div>

           <div className="flex flex-col gap-3 pt-4">
              <button onClick={handleSaveProfile} className="w-full bg-black text-white py-6 rounded-[2rem] font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95 hover:bg-[#e31837] transition-all flex items-center justify-center gap-3">
                <Save size={20}/> <T k="saveProfile">{t.saveProfile}</T>
              </button>
              <button onClick={() => { setIsEditingProfile(false); setEditData({...session}); }} className="w-full bg-gray-100 text-gray-500 py-6 rounded-[2rem] font-black uppercase text-[10px] tracking-widest active:scale-95 hover:bg-gray-200 transition-all">
                <T k="cancel">{t.cancel}</T>
              </button>
           </div>
        </div>
      ) : (
        <>
          {/* Master Performance Stats */}
          {session.role === 'master' && weeklyStats && (
            <div className="bg-white p-6 md:p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-6 text-left animate-in slide-in-from-bottom-4 duration-500">
               <div className="flex justify-between items-center">
                 <h2 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400"><T k="weeklyPerformance">{t.weeklyPerformance}</T></h2>
                 <span className="text-[10px] font-bold text-[#e31837] bg-red-50 px-3 py-1 rounded-full"><T k="last7Days">{t.last7Days}</T></span>
               </div>
               <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-gray-300"><T k="weeklyJobs">{t.weeklyJobs}</T></p>
                    <div className="flex items-center gap-2">
                       <span className="text-2xl font-black italic">{weeklyStats.count}</span>
                       <TargetIcon size={14} className="text-[#e31837]" />
                    </div>
                  </div>
                  <div className="space-y-1 border-x border-gray-50 px-4">
                    <p className="text-[10px] font-black uppercase text-gray-300"><T k="weeklyRating">{t.weeklyRating}</T></p>
                    <div className="flex items-center gap-2">
                       <span className="text-2xl font-black italic">{weeklyStats.avgRating}</span>
                       <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-gray-300"><T k="weeklyEarnings">{t.weeklyEarnings}</T></p>
                    <div className="flex items-center gap-2">
                       <span className="text-2xl font-black italic text-[#e31837]">{weeklyStats.earnings}</span>
                       <ArrowUpRight size={14} className="text-green-500" />
                    </div>
                  </div>
               </div>
            </div>
          )}

          <div className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar p-1">
            {(session.role === 'master' ? masterTabs : [{id:'active', label:t.activeMissions}, {id:'history', label:t.history}]).map(tab => (
              <button key={tab.id} onClick={() => tab.id === 'catalog' ? setView('master-docs') : setActiveTab(tab.id)} className={`px-8 md:px-12 py-4 md:py-6 rounded-[2rem] md:rounded-[3rem] font-black uppercase text-[10px] md:text-[11px] border-2 transition-all whitespace-nowrap tracking-[0.1em] md:tracking-[0.2em] shadow-sm active:scale-95 ${activeTab === tab.id ? 'bg-[#e31837] border-[#e31837] text-white shadow-xl scale-105' : 'bg-white border-gray-100 text-gray-900 hover:border-[#e31837]/30'}`}>
                <T k={tab.id}>{tab.label}</T>
              </button>
            ))}
          </div>

          <div className="space-y-8 md:space-y-10">
            {loading ? <div className="flex justify-center p-24 md:p-32 text-center"><Loader2 className="animate-spin text-[#e31837]" size={80} /></div> : (
              filtered.map(l => (
                <div key={l.id} className="bg-white p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] shadow-Elite border border-gray-100 space-y-8 md:space-y-10 text-center animate-in slide-in-from-bottom-8 hover:border-[#e31837]/20 transition-all group">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="space-y-4 flex flex-col items-center md:items-start">
                       <div className="flex flex-wrap gap-2 items-center justify-center">
                         <span className="text-[9px] md:text-[10px] bg-[#e31837] text-white px-3 md:px-4 py-2 rounded-xl font-black uppercase tracking-widest shadow-md flex items-center gap-2"><MapPin size={10}/> {l.district}</span>
                         <span className="text-[9px] md:text-[10px] text-black font-black uppercase tracking-[0.2em] md:tracking-[0.3em] bg-gray-50 px-3 md:px-4 py-2 rounded-xl border border-gray-100 italic">{l.plate}</span>
                       </div>
                       <h4 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none text-black text-center md:text-left">{l.make} {l.model} ({l.year})</h4>
                    </div>
                    <div className={`text-[9px] md:text-[10px] font-black uppercase px-5 md:px-6 py-2 md:py-2.5 rounded-full border shadow-sm ${l.status === 'completed' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-[#e31837] border-red-200 animate-pulse'}`}>
                      {l.status === 'completed' ? <T k="orderStatusCompleted">{t.orderStatusCompleted}</T> : <T k="orderStatusPending">{t.orderStatusPending}</T>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 text-[#e31837] font-black uppercase text-xs md:text-sm tracking-[0.1em] md:tracking-[0.2em] italic bg-red-50 p-4 rounded-[1.5rem] w-fit mx-auto md:mx-0 shadow-inner"><Calendar size={18}/><span className="text-center">{l.isImmediate ? <T k="immediateSync">{t.immediateSync}</T> : new Date(l.date).toLocaleString()}</span></div>
                  <div className="flex flex-wrap gap-2 md:gap-3 justify-center">{(l.services || []).map((s:any) => <span key={s.id} className="text-[9px] md:text-[10px] font-black uppercase px-4 md:px-6 py-2.5 md:py-3 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100 text-black shadow-inner">{(s.name as any)[lang]}</span>)}</div>
                  
                  {l.lat && (
                    <div className="text-[10px] font-black uppercase italic text-[#e31837] flex items-center gap-2 justify-center">
                      <MapPin size={12}/> Coordinates Logged: {l.lat.toFixed(4)}, {l.lng.toFixed(4)}
                    </div>
                  )}

                  {session.role === 'client' && l.status === 'completed' && !l.rating && (
                    <div className="pt-6 border-t border-gray-100 text-center flex flex-col items-center">
                      <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4"><T k="rateMaster">{t.rateMaster}</T></p>
                      <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button key={star} onClick={() => handleRate(l.id, l.masterId, star)} className="text-gray-300 hover:text-yellow-400 transition-colors"><Star size={28} className="fill-current" /></button>
                        ))}
                      </div>
                    </div>
                  )}

                  {l.rating && (
                    <div className="pt-4 flex items-center gap-2 justify-center md:justify-start">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-[10px] md:text-xs font-black uppercase italic">{l.rating}.0 <T k="vetted">{t.vetted}</T></span>
                    </div>
                  )}

                  {session.role === 'master' && (
                    <div className="pt-6 w-full flex flex-col items-center">
                      {l.status === 'pending' && <button onClick={() => acceptOrder(l.id)} className="w-full bg-black text-white py-5 md:py-7 rounded-[1.5rem] md:rounded-[2.5rem] font-black uppercase text-[10px] md:text-xs tracking-widest shadow-xl flex items-center justify-center gap-3 active:scale-95 hover:bg-[#e31837] transition-all"><Zap size={18}/> <T k="authorizeMission">{t.authorizeMission}</T></button>}
                      {l.status === 'in-progress' && <button onClick={() => completeOrder(l.id)} className="w-full bg-[#e31837] text-white py-5 md:py-7 rounded-[1.5rem] md:rounded-[2.5rem] font-black uppercase text-[10px] md:text-xs tracking-widest shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all"><CheckCircle2 size={18}/> <T k="complete">{t.complete}</T></button>}
                    </div>
                  )}
                </div>
              ))
            )}
            {!loading && filtered.length === 0 && (
              <div className="text-center py-24 md:py-32 bg-gray-50 rounded-[3.5rem] md:rounded-[5rem] border border-dashed border-gray-200 opacity-40 shadow-inner flex flex-col items-center">
                <ScanSearch size={80} className="text-[#e31837] mb-6 md:mb-8" />
                <p className="text-black font-black uppercase text-sm md:text-base tracking-[0.4em] md:tracking-[0.5em] text-center"><T k="onlineSignal">{t.onlineSignal}</T></p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// --- Master Protocol View ---
const MasterDocsView = ({ t, setView }: any) => {
  const docs = [
    { title: "docsTitle1", desc: "docsDesc1" },
    { title: "docsTitle2", desc: "docsDesc2" },
    { title: "docsTitle3", desc: "docsDesc3" },
    { title: "docsTitle4", desc: "docsDesc4" },
    { title: "docsTitle5", desc: "docsDesc5" }
  ];

  return (
    <div className="px-6 py-12 max-w-4xl mx-auto space-y-12 animate-in slide-in-from-bottom-8 text-center">
      <div className="flex items-center gap-6 mb-8 justify-center">
        <button onClick={() => setView('dashboard')} className="p-4 bg-gray-100 rounded-2xl text-gray-400 hover:text-black transition-all">
          <ArrowLeft size={24}/>
        </button>
        <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-black leading-none">
          <T k="masterDocs">{t.masterDocs}</T>
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {docs.map((doc, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-Elite border border-gray-100 space-y-4 flex flex-col items-center">
            <div className="w-12 h-12 bg-red-50 text-[#e31837] rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-black uppercase italic text-black">
              <T k={doc.title}>{t[doc.title]}</T>
            </h3>
            <p className="text-sm text-gray-500 font-medium italic leading-relaxed text-center">
              <T k={doc.desc}>{t[doc.desc]}</T>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Admin Dashboard View ---
const AdminDashboardView = ({ t, lang, session, setView }: any) => {
  const { showToast } = useToast();
  const [tab, setTab] = useState<'analytics' | 'services' | 'locations' | 'commissions'>('analytics');
  const [leads, setLeads] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>(DB.getDynamicServices());
  const [geo, setGeo] = useState<any>(DB.getDynamicGeography());
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetch = async () => {
      setLeads(await DB.getLeads());
      setUsers(await DB.getUsers());
    };
    fetch();
  }, []);

  const stats = useMemo(() => {
    const completed = leads.filter(l => l.status === 'completed');
    const turnover = completed.reduce((acc, curr) => {
      const servicePrices = curr.services?.reduce((sAcc: number, sCurr: any) => sAcc + (sCurr.price || 0), 0) || 0;
      return acc + servicePrices;
    }, 0);
    const activeFleet = users.filter(u => u.role === 'master').length;
    return { turnover, totalOrders: completed.length, activeFleet };
  }, [leads, users]);

  const filteredLeads = useMemo(() => {
    if (!searchQuery.trim()) return leads;
    const q = searchQuery.toLowerCase();
    return leads.filter(l => 
      l.make.toLowerCase().includes(q) || 
      l.model.toLowerCase().includes(q) || 
      l.year.toString().includes(q)
    );
  }, [leads, searchQuery]);

  const saveServices = (newServices: any[]) => {
    setServices(newServices);
    DB.saveDynamicServices(newServices);
    showToast("Services Updated", "success");
  };

  const addService = () => {
    const newId = Date.now();
    const newService = {
      id: newId,
      icon: "⚡",
      name: { en: "New Service", ru: "Новая услуга", uz: "Yangi xizmat" },
      price: 100000,
      commission: 10
    };
    saveServices([...services, newService]);
  };

  const removeService = (id: number) => {
    saveServices(services.filter(s => s.id !== id));
  };

  const tabs = [
    { id: 'analytics', label: 'analytics', icon: BarChart3 },
    { id: 'services', label: 'manageServices', icon: Layers },
    { id: 'locations', label: 'manageCities', icon: MapPin },
    { id: 'commissions', label: 'manageCommissions', icon: Settings }
  ];

  return (
    <div className="min-h-screen pt-24 pb-40 px-6 max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-center text-left">
        <div className="space-y-1">
          <h1 className="text-5xl font-black italic uppercase tracking-tighter"><T k="adminTerminal">{t.adminTerminal}</T></h1>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
            <Activity size={14} className="text-[#e31837]"/> System Online (UstaGo Node V3.4)
          </p>
        </div>
        <button onClick={() => setView('dashboard')} className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-black transition-all"><ArrowLeft size={24}/></button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: t.turnover, val: stats.turnover.toLocaleString() + " UZS", icon: DollarSign, k: "turnover" },
          { label: t.totalMissions, val: stats.totalOrders, icon: ZapIcon, k: "totalMissions" },
          { label: t.activeFleet, val: stats.activeFleet, icon: Users, k: "activeFleet" }
        ].map((s, i) => (
          <div key={i} className="bg-black text-white p-10 rounded-[3rem] shadow-Elite border-t-8 border-[#e31837] space-y-4 text-center md:text-left">
            <div className="flex justify-between items-center">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40"><T k={s.k}>{s.label}</T></p>
              <s.icon size={24} className="text-[#e31837]"/>
            </div>
            <p className="text-4xl font-black italic uppercase tracking-tighter">{s.val}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
        {tabs.map(item => (
          <button key={item.id} onClick={() => setTab(item.id as any)} className={`px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-3 transition-all whitespace-nowrap ${tab === item.id ? 'bg-[#e31837] text-white shadow-xl' : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50'}`}>
            <item.icon size={16}/> <T k={item.label}>{(t as any)[item.label] || item.id}</T>
          </button>
        ))}
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[4rem] shadow-Elite border border-gray-100">
        {tab === 'analytics' && (
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <h3 className="text-3xl font-black italic uppercase tracking-tighter text-black text-center md:text-left"><T k="liveTelemetry">{t.liveTelemetry}</T></h3>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full bg-gray-50 pl-12 pr-4 py-3 rounded-2xl text-[10px] font-black uppercase outline-none focus:ring-2 ring-[#e31837]/20 border border-gray-100 placeholder:text-gray-300"
                />
              </div>
            </div>
            <div className="space-y-6">
              {filteredLeads.map(l => (
                <div key={l.id} className="p-6 bg-gray-50 rounded-3xl flex justify-between items-center border border-gray-100 group hover:border-[#e31837]/30 transition-all text-left">
                  <div className="flex items-center gap-6">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${l.status === 'completed' ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}></div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{new Date(l.id).toLocaleString()}</p>
                      <p className="text-xl font-black italic uppercase tracking-tighter">{l.make} {l.model} ({l.year})</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black italic text-[#e31837]">{l.plate}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{l.district}</p>
                  </div>
                </div>
              ))}
              {filteredLeads.length === 0 && (
                <div className="text-center py-12 opacity-40 italic"><T k="noNodesFound">{t.noNodesFound}</T></div>
              )}
            </div>
          </div>
        )}

        {tab === 'services' && (
          <div className="space-y-10">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-black italic uppercase tracking-tighter text-black"><T k="manageServices">{t.manageServices}</T></h3>
              <button onClick={addService} className="bg-black text-white px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:bg-[#e31837] transition-all"><Plus size={16}/> <T k="addService">{t.addService}</T></button>
            </div>
            <div className="space-y-4">
              {services.map((s, idx) => (
                <div key={s.id} className="p-6 border border-gray-100 rounded-3xl grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl p-3 bg-gray-50 rounded-2xl">{s.icon}</div>
                    <div className="flex-1">
                      <input 
                        className="font-black italic uppercase w-full bg-transparent outline-none focus:text-[#e31837]" 
                        value={s.name[lang]} 
                        onChange={e => {
                          const n = [...services];
                          n[idx].name[lang] = e.target.value;
                          saveServices(n);
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest"><T k="basePrice">{t.basePrice}</T></p>
                    <input 
                      type="number"
                      className="font-black text-lg outline-none w-full"
                      value={s.price} 
                      onChange={e => {
                        const n = [...services];
                        n[idx].price = parseInt(e.target.value);
                        saveServices(n);
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest"><T k="commissionLabel">{t.commissionLabel}</T></p>
                    <input 
                      type="number"
                      className="font-black text-lg outline-none w-full"
                      value={s.commission} 
                      onChange={e => {
                        const n = [...services];
                        n[idx].commission = parseInt(e.target.value);
                        saveServices(n);
                      }}
                    />
                  </div>
                  <div className="text-right">
                    <button onClick={() => removeService(s.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={20}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'locations' && (
          <div className="space-y-8">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-black text-center md:text-left"><T k="manageCities">{t.manageCities}</T></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest text-center md:text-left">Active Regions ({lang})</p>
                <div className="space-y-2">
                  {(geo.regions as any)[lang].map((r: string, idx: number) => (
                    <div key={idx} className="flex gap-2">
                      <input 
                        className="flex-1 p-4 bg-gray-50 rounded-xl font-black uppercase text-xs" 
                        value={r} 
                        onChange={e => {
                          const n = {...geo};
                          (n.regions as any)[lang][idx] = e.target.value;
                          setGeo(n);
                          DB.saveDynamicGeography(n);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-4 border border-dashed border-gray-200">
                <Globe size={48} className="text-[#e31837] opacity-20"/>
                <p className="text-xs font-bold text-gray-400 uppercase italic">To manage detailed district nodes or add new languages, synchronize with the core UstaGo API. Regional expansions are locked to current active languages.</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'commissions' && (
          <div className="space-y-10 text-center flex flex-col items-center">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-black"><T k="financialProtocols">{t.financialProtocols}</T></h3>
            <div className="max-w-md w-full p-10 bg-black text-white rounded-[3rem] space-y-8 shadow-2xl relative overflow-hidden text-center md:text-left">
               <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><DollarSign size={100}/></div>
               <div className="relative z-10 space-y-6">
                 <p className="text-sm font-medium italic opacity-60 leading-relaxed text-center"><T k="financialDesc">{t.financialDesc}</T></p>
                 <div className="h-px bg-white/10"></div>
                 <div className="space-y-2 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40"><T k="fleetRetention">{t.fleetRetention}</T></p>
                    <p className="text-6xl font-black italic tracking-tighter">88.5%</p>
                 </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
