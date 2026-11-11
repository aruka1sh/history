export interface ArchivalPhotoItem {
  id: string;
  src: string;
  year: string;
  title: string;
  caption: string;
  credit: string;
  location: string;
  category: 'aral' | 'semey' | 'industrial' | 'recovery';
}

export interface TimelineMilestone {
  year: string;
  title: string;
  subtitle: string;
  category: 'nuclear' | 'water' | 'movement' | 'policy';
  description: string;
  fact: string;
  archiveCode: string;
  location: string;
  photoSrc: string;
  photoCredit: string;
  imageCaption: string;
}

export interface AralTimelinePoint {
  year: number;
  areaKm2: number;
  volumeKm3: number;
  salinityGL: number;
  note: string;
  photoSrc: string;
}

export interface SemipalatinskMetric {
  year: string;
  atmospheric: number;
  underground: number;
  totalCumulative: number;
  eventNote: string;
}

export interface MapMarkerData {
  id: string;
  name: string;
  region: string;
  coordinates: [number, number]; // [lat, lng]
  svgCoords: { x: number; y: number }; // Fallback offline SVG coordinates (0-1000, 0-600)
  category: 'water' | 'nuclear' | 'industrial' | 'oil';
  dates: string;
  mainProblem: string;
  shortExplanation: string;
  keyFacts: string[];
  currentStatus: string;
  archiveRef: string;
  photoSrc: string;
  photoCredit: string;
  secondaryPhotoSrc?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceRef: string;
}

export interface DecisionChoice {
  id: string;
  label: string;
  summary: string;
  historicalConsequence: string;
  tradeOffs: {
    economy: string;
    ecology: string;
    humanCost: string;
  };
  historicalRealityNote: string;
}

export interface SimulationScenario {
  id: number;
  era: string;
  role: string;
  title: string;
  prompt: string;
  photoSrc: string;
  photoCaption: string;
  contextFacts: string[];
  choices: DecisionChoice[];
}

export interface SourceReference {
  id: number | string;
  organization: string;
  title: string;
  year: string;
  category: 'Aral Sea' | 'Semipalatinsk' | 'General Ecology' | 'Restoration';
  url: string;
  summary: string;
}

export const BEFORE_CRISIS_LANDSCAPES = [
  {
    id: 'steppe',
    title: 'The Great Steppe (Saryarka)',
    subtitle: 'Vast grasslands and migratory corridors',
    description:
      'For centuries, sustainable nomadic pastoralism worked in balance with seasonal water cycles across millions of hectares of feather-grass steppe.',
    metric: 2724900,
    metricSuffix: ' km²',
    metricLabel: 'Total land area of Kazakhstan',
    photoSrc: './images/kazakh-steppe-spring.jpg',
    photoCredit: 'Wikimedia Commons / CC BY-SA • Western Kazakhstan Steppe',
  },
  {
    id: 'aral-oasis',
    title: 'The Blue Aral Basin (Pre-1960)',
    subtitle: 'The fourth-largest inland lake on Earth',
    description:
      'Fed by the Amu Darya and Syr Darya rivers, the unified Aral Sea moderated desert climates and supported thriving fishing ports like Aralsk and Muynak.',
    metric: 68000,
    metricSuffix: ' km²',
    metricLabel: 'Surface area in 1960',
    photoSrc: './images/aral-1964-nasa.jpg',
    photoCredit: 'NASA Argon Satellite Photograph • August 1964 (Public Domain)',
  },
  {
    id: 'irtysh',
    title: 'The Irtysh & Chagan Valleys',
    subtitle: 'Sacred cultural heartland of East Kazakhstan',
    description:
      'Before 1947, the steppe west of Semipalatinsk—the birthplace of Abai Qunanbaiuly and Mukhtar Auezov—was home to vibrant farming and herding communities.',
    metric: 18500,
    metricSuffix: ' km²',
    metricLabel: 'Steppe later designated as the Polygon',
    photoSrc: './images/semey-polygon-steppe.jpg',
    photoCredit: 'Semipalatinsk Steppe Archive • East Kazakhstan',
  },
];

export const HISTORICAL_MILESTONES: TimelineMilestone[] = [
  {
    year: '1949',
    title: 'First Soviet Nuclear Test (RDS-1)',
    subtitle: 'August 29, 1949 • Semipalatinsk Test Site',
    category: 'nuclear',
    description:
      'At 7:00 AM on August 29, 1949, the Soviet Union detonated its first nuclear device (RDS-1, 22 kilotons) at the Semipalatinsk Polygon. Local villages were rarely evacuated or warned about radiation fallout.',
    fact: '116 atmospheric and surface nuclear tests were conducted between 1949 and 1962 before testing moved underground.',
    archiveCode: 'ARCHIVE REF: STS-1949-RDS1 / IAEA TECHNICAL REPORT',
    location: 'Semipalatinsk (Semey) Steppe, East Kazakhstan',
    photoSrc: './images/semey-rds1-1949.jpg',
    photoCredit: 'Archival Photograph • RDS-1 ("First Lightning"), August 29, 1949',
    imageCaption: 'Detonation of RDS-1 (22 kilotons) at Opytnoye Pole (Ground Zero), Semipalatinsk Test Site, August 29, 1949.',
  },
  {
    year: '1960s',
    title: 'Massive River Diversion for "White Gold"',
    subtitle: '1960–1970 • Amu Darya & Syr Darya Canal Expansion',
    category: 'water',
    description:
      'Soviet economic planners rapidly expanded water-intensive cotton ("white gold") and rice monocultures across Central Asia. Millions of cubic meters of water were diverted from the Syr Darya and Amu Darya into unlined desert canals.',
    fact: 'Between 1960 and 1970, the Aral Sea water level began dropping by an average of 20 cm per year—soon accelerating to over 80 cm per year in the 1970s.',
    archiveCode: 'ARCHIVE REF: HYDRO-1960-SYRDARYA / NASA EARTH OBSERVATORY',
    location: 'Kyzylorda Region & Aral Basin',
    photoSrc: './images/cotton-harvest-soviet.jpg',
    photoCredit: 'Wikimedia Commons / Aral Basin Cotton Cultivation',
    imageCaption: 'Water-intensive cotton ("White Gold") irrigation across the Aral Sea basin diverted the flow of the Syr Darya and Amu Darya rivers.',
  },
  {
    year: '1989',
    title: 'The Nevada–Semipalatinsk Movement',
    subtitle: 'February 28, 1989 • Citizen-Led Anti-Nuclear Protest',
    category: 'movement',
    description:
      'Following radiation leaks from underground tests at Chagan in February 1989, poet and public figure Olzhas Suleimenov went on live television to call for a public rally. Two days later, thousands gathered in Almaty to found the Nevada–Semipalatinsk anti-nuclear movement.',
    fact: 'Over 2 million citizens of Kazakhstan signed the first public petition demanding the immediate termination of nuclear testing.',
    archiveCode: 'ARCHIVE REF: KAZ-1989-NEVADA-SEMEY / NATIONAL ARCHIVES RK',
    location: 'Almaty & Semipalatinsk, Kazakhstan',
    photoSrc: './images/semey-ctbto-crater.jpg',
    photoCredit: 'CTBTO Official Photostream • Semipalatinsk Test Site Crater Inspection',
    imageCaption: 'Subsidence craters left across the Semipalatinsk steppe—public outrage over venting radiation sparked the 1989 Nevada–Semipalatinsk movement.',
  },
  {
    year: '1991',
    title: 'Official Closure of the Polygon',
    subtitle: 'August 29, 1991 • Decree No. 409',
    category: 'policy',
    description:
      'Exactly 42 years after the first atomic detonation, President Nursultan Nazarbayev signed Decree No. 409 officially closing the Semipalatinsk Nuclear Test Site. Kazakhstan later voluntarily renounced the world’s fourth-largest nuclear arsenal.',
    fact: 'August 29 was subsequently declared by the United Nations General Assembly as the International Day against Nuclear Tests.',
    archiveCode: 'ARCHIVE REF: DECREE-409-1991 / UN RES 64/35',
    location: 'Republic of Kazakhstan',
    photoSrc: './images/semey-nnsa-tunnel.jpg',
    photoCredit: 'U.S. NNSA / National Nuclear Center RK • Degelen Tunnel Portal Sealing',
    imageCaption: 'Decommissioning and concrete sealing of nuclear testing tunnels at Degelen Mountain following the 1991 closure decree.',
  },
];

export const ARAL_PHOTO_GALLERY: ArchivalPhotoItem[] = [
  {
    id: 'aral-1964',
    src: './images/aral-1964-nasa.jpg',
    year: '1964',
    title: 'The Unified Aral Sea from Space',
    caption: 'Declassified 1964 Argon satellite reconnaissance photograph showing the Aral Sea near its full 68,000 km² baseline extent.',
    credit: 'NASA / USGS Argon Satellite (Public Domain)',
    location: 'Aral Sea Basin',
    category: 'aral',
  },
  {
    id: 'aral-harbor',
    src: './images/aral-harbor-ships.jpg',
    year: '1990s',
    title: 'Abandoned Fleet at Aralsk Harbor',
    caption: 'Once a major Soviet fishing port supplying 43,000 tons of catch annually, Aralsk was left decenas of kilometers from the retreating shoreline.',
    credit: 'Wikimedia Commons / Archival Documentary Photo',
    location: 'Aralsk, Kyzylorda Region',
    category: 'aral',
  },
  {
    id: 'aral-ship-desert',
    src: './images/aral-ship-graveyard.jpg',
    year: '2003',
    title: 'Stranded Trawlers on the Dry Seabed',
    caption: 'Rusted hulls of fishing vessels resting directly on the salt-crusted sands of the newly formed Aralkum Desert.',
    credit: 'Wikimedia Commons / Staecker (Public Domain)',
    location: 'Former Aral Seabed',
    category: 'aral',
  },
  {
    id: 'aral-fisherman',
    src: './images/aral-fisherman.jpg',
    year: '2008',
    title: 'Return of Kazakh Fishermen to the North Aral',
    caption: 'Following the completion of the Kok-Aral Dam in 2005, salinity dropped and local fishermen resumed harvesting pike-perch and flounder.',
    credit: 'Wikimedia Commons / Evgeni Zotov (CC BY-SA)',
    location: 'North Aral Sea, Kazakhstan',
    category: 'aral',
  },
  {
    id: 'aral-dust',
    src: './images/aral-dust-storm.jpg',
    year: '2001',
    title: 'Toxic Salt & Dust Plume over the Aralkum',
    caption: 'NASA MODIS satellite capture of a massive white salt and pesticide dust storm blowing off the exposed southern and eastern seabed.',
    credit: 'NASA Earth Observatory / MODIS (Public Domain)',
    location: 'Aralkum Desert',
    category: 'aral',
  },
  {
    id: 'kok-aral-sentinel',
    src: './images/aral-kokaral-dam.jpg',
    year: '2021',
    title: 'The 13-km Kok-Aral Dam from Orbit',
    caption: 'Copernicus Sentinel-2 satellite view showing the Kok-Aral dike holding back and stabilizing the waters of the North Aral Sea in Kazakhstan.',
    credit: 'ESA Copernicus Sentinel-2 (CC BY-SA)',
    location: 'Kok-Aral Strait, Kazakhstan',
    category: 'aral',
  },
];

export const SEMIPALATINSK_PHOTO_GALLERY: ArchivalPhotoItem[] = [
  {
    id: 'semey-rds1',
    src: './images/semey-rds1-1949.jpg',
    year: 'Aug 29, 1949',
    title: 'RDS-1 ("First Lightning") Detonation',
    caption: 'The first Soviet atomic bomb test (22 kilotons) detonated at 7:00 AM on an instrumentation tower at Opytnoye Pole, Semipalatinsk.',
    credit: 'Historical Archive • Semipalatinsk Test Site',
    location: 'Opytnoye Pole (Ground Zero)',
    category: 'semey',
  },
  {
    id: 'semey-chagan',
    src: './images/semey-chagan-crater.jpg',
    year: 'Jan 15, 1965',
    title: 'The Chagan Underground Crater Blast',
    caption: 'A 140-kiloton underground nuclear explosion excavated a crater 408 meters wide and 100 meters deep, forming the radioactive "Atomic Lake".',
    credit: 'Archival Test Documentation • 1965',
    location: 'Balapan / Chagan River Sector',
    category: 'semey',
  },
  {
    id: 'semey-crater-modern',
    src: './images/semey-ctbto-crater.jpg',
    year: '2010',
    title: 'Subsidence Craters Across the Polygon',
    caption: 'International monitoring inspection of massive ground-subsidence craters left by 340 underground nuclear detonations between 1961 and 1989.',
    credit: 'Official CTBTO Photostream (CC BY 2.0)',
    location: 'Semipalatinsk Test Site',
    category: 'semey',
  },
  {
    id: 'semey-tunnel-seal',
    src: './images/semey-nnsa-tunnel.jpg',
    year: '1998',
    title: 'Sealing the Degelen Mountain Tunnels',
    caption: 'Joint Kazakh-U.S. disarmament engineers preparing to permanently seal one of the 181 horizontal nuclear test tunnels at Degelen Mountain.',
    credit: 'U.S. NNSA / National Nuclear Center RK',
    location: 'Degelen Mountain Massif',
    category: 'semey',
  },
  {
    id: 'semey-steppe-view',
    src: './images/semey-polygon-steppe.jpg',
    year: '2003',
    title: 'The Silent Steppe of East Kazakhstan',
    caption: 'Today the open feather-grass plains of the former Polygon appear peaceful, though restricted zones remain under continuous radiological monitoring.',
    credit: 'Wikimedia Commons / Archival Field Survey',
    location: 'Abai Region, East Kazakhstan',
    category: 'semey',
  },
  {
    id: 'semey-map-plate',
    src: './images/semey-map-overview.png',
    year: '1998',
    title: 'IAEA Radiological Survey Perimeter',
    caption: 'Cartographic overview of the 18,500 km² Polygon showing Ground Zero, Degelen Mountain, Balapan, and surrounding rural settlements.',
    credit: 'Wikimedia / IAEA Survey Data',
    location: 'Semipalatinsk Polygon',
    category: 'semey',
  },
];

export const ARAL_DECLINE_DATA: AralTimelinePoint[] = [
  {
    year: 1960,
    areaKm2: 68000,
    volumeKm3: 1083,
    salinityGL: 10,
    note: 'Baseline state: 4th largest inland body of water in the world. Annual commercial fish catch exceeds 43,000 tons.',
    photoSrc: './images/aral-1964-nasa.jpg',
  },
  {
    year: 1971,
    areaKm2: 60200,
    volumeKm3: 925,
    salinityGL: 11.5,
    note: 'Expanded irrigation canals significantly reduce inflow from Syr Darya and Amu Darya.',
    photoSrc: './images/cotton-harvest-soviet.jpg',
  },
  {
    year: 1976,
    areaKm2: 55700,
    volumeKm3: 763,
    salinityGL: 14,
    note: 'Sea level drops by 5 meters. Shallow spawning grounds dry up; commercial fishing declines sharply.',
    photoSrc: './images/aral-1985-sts.jpg',
  },
  {
    year: 1989,
    areaKm2: 39700,
    volumeKm3: 364,
    salinityGL: 28,
    note: 'Critical threshold: The Aral Sea splits into two separate water bodies—the North Aral Sea (in Kazakhstan) and the South Aral Sea.',
    photoSrc: './images/aral-1989-2014.jpg',
  },
  {
    year: 2000,
    areaKm2: 23400,
    volumeKm3: 149,
    salinityGL: 65,
    note: 'Exposed seabed forms the Aralkum Desert, generating toxic salt and pesticide dust storms.',
    photoSrc: './images/aral-dust-storm.jpg',
  },
  {
    year: 2005,
    areaKm2: 19200,
    volumeKm3: 112,
    salinityGL: 85,
    note: 'Completion of the Kok-Aral Dam (World Bank & Kazakhstan) stabilizes and begins restoring the North Aral Sea.',
    photoSrc: './images/aral-north-recovery.jpg',
  },
  {
    year: 2014,
    areaKm2: 11800,
    volumeKm3: 75,
    salinityGL: 100,
    note: 'The Eastern Basin of the South Aral dries completely for the first time in modern history, while the North Aral Sea remains intact and recovers.',
    photoSrc: './images/aral-2014-modis.jpg',
  },
  {
    year: 2024,
    areaKm2: 10500,
    volumeKm3: 68,
    salinityGL: 12,
    note: 'North Aral Sea (Kazakhstan) maintains ~3,300 km² with reduced salinity (~10-12 g/L in North Aral) and revived fisheries, though the South Aral remains critically depleted.',
    photoSrc: './images/aral-kokaral-dam.jpg',
  },
];

export const SEMIPALATINSK_TIMELINE_DATA: SemipalatinskMetric[] = [
  {
    year: '1949–1953',
    atmospheric: 11,
    underground: 0,
    totalCumulative: 11,
    eventNote: 'Includes RDS-1 (1949) and the first Soviet thermonuclear test RDS-6s (August 12, 1953, 400 kilotons).',
  },
  {
    year: '1954–1958',
    atmospheric: 45,
    underground: 0,
    totalCumulative: 56,
    eventNote: 'High-yield atmospheric testing causes widespread radioactive fallout across East Kazakhstan districts.',
  },
  {
    year: '1961–1962',
    atmospheric: 60,
    underground: 1,
    totalCumulative: 117,
    eventNote: 'Peak atmospheric testing before the 1963 Partial Test Ban Treaty bans above-ground nuclear explosions.',
  },
  {
    year: '1965 (Chagan)',
    atmospheric: 0,
    underground: 35,
    totalCumulative: 152,
    eventNote: 'January 15, 1965: The "Chagan" crater test creates an artificial radioactive lake ("Atomic Lake").',
  },
  {
    year: '1970–1979',
    atmospheric: 0,
    underground: 158,
    totalCumulative: 310,
    eventNote: 'Intensive underground testing inside the Degelen Mountain tunnels and Balapan boreholes.',
  },
  {
    year: '1980–1989',
    atmospheric: 0,
    underground: 146,
    totalCumulative: 456,
    eventNote: 'Final underground explosion occurs on October 19, 1989. Total verified tests: 456 (116 atmospheric/surface, 340 underground).',
  },
];

export const MAP_MARKERS: MapMarkerData[] = [
  {
    id: 'aral-sea',
    name: 'North Aral Sea & Aralsk Basin',
    region: 'Kyzylorda Region, Southwest Kazakhstan',
    coordinates: [46.3, 60.7],
    svgCoords: { x: 285, y: 405 },
    category: 'water',
    dates: '1960 – Present (Kok-Aral Dam completed 2005)',
    mainProblem: 'Massive River Diversion, Desiccation & Toxic Salt-Dust Storms',
    shortExplanation:
      'Diversion of the Syr Darya and Amu Darya rivers for Soviet irrigation caused over 80% of the entire Aral Sea basin to shrink. However, the Aral Sea did NOT completely disappear: Kazakhstan constructed the 13-km Kok-Aral Dam in 2005, saving the North Aral Sea.',
    keyFacts: [
      'Sea level in the North Aral rose by over 4 meters within a year of the Kok-Aral Dam completion (2005–2006).',
      'Over 60,000 km² of exposed seabed became the Aralkum Desert, scattering salt and agricultural pesticides across thousands of kilometers.',
      'Annual fish harvests in the North Aral Sea recovered from near zero in the 1990s to over 7,000–8,000 tons in recent years.',
    ],
    currentStatus: 'Active ecological recovery in the North Aral Sea; ongoing saxaul forest planting on the dry seabed.',
    archiveRef: 'NASA Earth Observatory / World Bank SIRAP Project',
    photoSrc: './images/aral-ship-graveyard.jpg',
    photoCredit: 'Wikimedia Commons • Stranded vessel in the Aral Basin',
    secondaryPhotoSrc: './images/aral-kokaral-dam.jpg',
  },
  {
    id: 'semipalatinsk',
    name: 'Semipalatinsk Nuclear Test Site (The Polygon)',
    region: 'Abai / East Kazakhstan Region',
    coordinates: [50.07, 78.43],
    svgCoords: { x: 745, y: 245 },
    category: 'nuclear',
    dates: 'August 29, 1949 – August 29, 1991',
    mainProblem: '456 Nuclear Detonations & Multigenerational Radiation Exposure',
    shortExplanation:
      'Spanning 18,500 km², the Semipalatinsk Polygon was the primary nuclear weapons testing ground of the USSR. Roughly 25% of all nuclear tests in human history took place here.',
    keyFacts: [
      '456 total nuclear tests: 116 atmospheric/surface (1949–1962) and 340 underground (1961–1989).',
      'Over 1.3 million people in surrounding districts (Abai, Beskaragai, Zhanasemey) were officially recognized as affected by radiation exposure.',
      'Closed on August 29, 1991 following the grassroots Nevada–Semipalatinsk anti-nuclear movement.',
    ],
    currentStatus: 'Permanently closed; monitored by the National Nuclear Center of Kazakhstan and the IAEA.',
    archiveRef: 'IAEA Radiological Assessment (1998) / NNC RK',
    photoSrc: './images/semey-ctbto-crater.jpg',
    photoCredit: 'CTBTO Official Photostream • Semipalatinsk Test Crater',
    secondaryPhotoSrc: './images/semey-rds1-1949.jpg',
  },
  {
    id: 'caspian-sea',
    name: 'Caspian Sea & Tengiz Coastal Zone',
    region: 'Atyrau & Mangystau Regions, West Kazakhstan',
    coordinates: [45.8, 52.2],
    svgCoords: { x: 115, y: 425 },
    category: 'oil',
    dates: '1979 – Present',
    mainProblem: 'Oil & Gas Extraction, Flooded Wells & Sea-Level Fluctuations',
    shortExplanation:
      'The Northeast Caspian shelf contains some of the world’s largest hydrocarbon reserves alongside critical habitats for the endangered Caspian seal (Pusa caspica) and sturgeon populations.',
    keyFacts: [
      'The 1985–1986 Tengiz Well No. 37 blowout burned for over a year, releasing millions of tons of hydrocarbons and hydrogen sulfide.',
      'Rising sea levels in the 1980s–1990s flooded legacy Soviet coastal oil wells, while 21st-century sea retreat now threatens shallow northern ecosystems.',
      'Caspian seal populations declined by more than 70% over the 20th century due to habitat stress, pollution, and industrial activity.',
    ],
    currentStatus: 'Strict environmental monitoring, capped legacy wells, and newly designated Caspian seal state nature reserves.',
    archiveRef: 'UNEP Caspian Environment Programme / Kazhydromet',
    photoSrc: './images/kazakh-steppe-spring.jpg',
    photoCredit: 'Western Kazakhstan Steppe & Caspian Basin Archive',
  },
  {
    id: 'lake-balkhash',
    name: 'Lake Balkhash & Metallurgical Complex',
    region: 'Almaty, Karaganda & Zhetysu Regions',
    coordinates: [46.5, 74.8],
    svgCoords: { x: 645, y: 390 },
    category: 'industrial',
    dates: '1938 – Present (Kapchagay Dam filled 1970)',
    mainProblem: 'Hydrological Stress & Copper Smelting Emissions',
    shortExplanation:
      'One of Asia’s largest endorheic lakes—uniquely half freshwater (west) and half saline (east)—faced severe water drops after the filling of the Kapchagay Reservoir on the Ili River in 1970 and heavy metal emissions from the Soviet-era Balkhash metallurgical complex.',
    keyFacts: [
      '80% of Lake Balkhash’s surface inflow comes from the transboundary Ili River.',
      'During the 1970s–1980s, filling the Kapchagay reservoir reduced Ili inflow and dropped Balkhash water levels by over 2 meters.',
      'Modern ecological programs focus on safeguarding the Ili delta wetlands and modernizing industrial filtration.',
    ],
    currentStatus: 'High priority national water security zone under the Balkhash-Alakol Basin Council.',
    archiveRef: 'UNDP Kazakhstan Water Governance Reports',
    photoSrc: './images/balkhash-copper-smelter.jpg',
    photoCredit: 'Wikimedia Commons • Balkhash Copper Smelting Complex on the lakeshore',
    secondaryPhotoSrc: './images/balkhash-nasa-satellite.jpg',
  },
  {
    id: 'baikonur-steppe',
    name: 'Baikonur Drop Zones & Central Steppe',
    region: 'Kyzylorda & Ulytau Regions',
    coordinates: [47.6, 65.8],
    svgCoords: { x: 430, y: 345 },
    category: 'industrial',
    dates: '1955 – Present',
    mainProblem: 'Spent Rocket Stages & Heptyl Propellant Contamination',
    shortExplanation:
      'Founded in 1955 in the desert steppe of Kazakhstan, Baikonur launched Sputnik 1 and Yuri Gagarin. However, heavy carrier rockets beginning in the 1960s used unsymmetrical dimethylhydrazine (UDMH / "heptyl"), dropping spent first stages across central steppe corridors.',
    keyFacts: [
      'Proton-class rockets historically carried toxic UDMH propellant, requiring dedicated decontamination teams in drop zones across central Kazakhstan.',
      'Post-1991 bilateral environmental protocols established mandatory soil testing, scrap recovery, and transition toward cleaner launch vehicles (Baiterek project).',
    ],
    currentStatus: 'Phasing out heptyl-based launches and conducting systematic steppe remediation.',
    archiveRef: 'Ministry of Ecology and Natural Resources of the RK',
    photoSrc: './images/balkhash-nasa-satellite.jpg',
    photoCredit: 'NASA Space Shuttle Earth Observations • Central Kazakhstan Steppe & Basin',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Was the Aral Sea once one of the world’s largest lakes?',
    options: [
      'Yes — until 1960 it was the 4th largest inland lake in the world.',
      'No — it was always a small seasonal desert marsh.',
      'Yes — it was the largest freshwater lake on Earth.',
      'No — it was artificially created in the 1930s.',
    ],
    correctIndex: 0,
    explanation:
      'Correct! In 1960, the Aral Sea covered roughly 68,000 square kilometers, making it the fourth-largest inland water body on Earth after the Caspian Sea, Lake Superior, and Lake Victoria.',
    sourceRef: 'NASA Earth Observatory — World of Change: Shrinking Aral Sea',
  },
  {
    id: 2,
    question: 'Were nuclear weapons tested in Kazakhstan during the 20th century?',
    options: [
      'No, nuclear weapons were only stored in Kazakhstan.',
      'Yes, the Soviet Union conducted hundreds of nuclear tests at Semipalatinsk and other sites in Kazakhstan.',
      'Only one test was conducted in 1949.',
      'Testing only took place in the Pacific Ocean.',
    ],
    correctIndex: 1,
    explanation:
      'Correct! Between 1949 and 1989, the Semipalatinsk Nuclear Test Site in East Kazakhstan was the primary nuclear testing ground of the Soviet Union, alongside smaller "peaceful nuclear explosions" at sites like Azgir and Mangystau.',
    sourceRef: 'International Atomic Energy Agency (IAEA) — Semipalatinsk Report',
  },
  {
    id: 3,
    question: 'Did the Aral Sea completely disappear?',
    options: [
      'Yes, 100% of the water is gone forever.',
      'No — while the South Aral shrank drastically, the North Aral Sea in Kazakhstan was partially restored thanks to the Kok-Aral Dam (2005).',
      'No, the entire Aral Sea returned to its 1960 size.',
      'It only dries up during summer months.',
    ],
    correctIndex: 1,
    explanation:
      'Important distinction! The Aral Sea did NOT completely disappear. While the Eastern Basin of the South Aral dried up in 2014, Kazakhstan and the World Bank built the Kok-Aral Dam in 2005, successfully stabilizing the North Aral Sea, lowering salinity, and bringing back native fish species.',
    sourceRef: 'World Bank — Syr Darya Control and Northern Aral Sea Project',
  },
  {
    id: 4,
    question: 'How many nuclear tests were officially conducted at the Semipalatinsk Test Site between 1949 and 1989?',
    options: [
      '45 tests',
      '116 tests',
      '456 tests',
      '1,024 tests',
    ],
    correctIndex: 2,
    explanation:
      'Correct! Exactly 456 nuclear tests were conducted at the Semipalatinsk Polygon between August 29, 1949 and October 19, 1989 — comprising 116 atmospheric/surface explosions and 340 underground tests.',
    sourceRef: 'National Nuclear Center of the Republic of Kazakhstan / United Nations',
  },
];

export const SIMULATION_SCENARIOS: SimulationScenario[] = [
  {
    id: 1,
    era: 'SCENARIO 01 • SOVIET IRRIGATION PLANNING (1960s)',
    role: 'Hydrological & Economic Advisor to State Planners',
    title: 'Cotton Quotas vs. The Aral Basin',
    prompt:
      'You are advising Soviet planners in the 1960s. Agricultural production is expanding rapidly across Central Asia, and Moscow demands record cotton harvests. However, unlined desert canals are already diverting huge volumes from the Syr Darya and Amu Darya rivers, threatening the Aral Sea. What would you recommend?',
    photoSrc: './images/cotton-harvest-soviet.jpg',
    photoCaption: 'Cotton harvesting in the Aral Sea basin — intensive irrigation drove river diversion.',
    contextFacts: [
      'Unlined desert canals lose 30% to 50% of diverted river water to evaporation and seepage before reaching fields.',
      'The Aral Sea relies entirely on river inflow to balance desert evaporation.',
    ],
    choices: [
      {
        id: '1a',
        label: 'Maximize Immediate Cotton Quotas',
        summary: 'Expand unlined irrigation canals rapidly to meet 5-year agricultural targets at minimal short-term construction cost.',
        historicalConsequence:
          'Cotton harvests surge in the 1960s and 1970s, fulfilling state quotas. However, river inflow to the Aral Sea collapses. By 1989, the sea splits in two, fishing towns like Aralsk are stranded tens of kilometers from water, and toxic salt storms poison surrounding farmland.',
        tradeOffs: {
          economy: 'Short-term agricultural boom followed by regional collapse of fisheries and salinized soils.',
          ecology: 'Catastrophic loss of over 60% of the sea surface within three decades.',
          humanCost: 'High rates of respiratory illness, anemia, and loss of 60,000+ fishing-related jobs.',
        },
        historicalRealityNote:
          'This closely mirrors what actually happened: planners prioritized immediate cotton quotas and regarded the shrinking of the Aral Sea as an acceptable economic trade-off.',
      },
      {
        id: '1b',
        label: 'Mandate Lined Canals & Strict Ecological Quotas',
        summary: 'Slow down farmland expansion, invest heavily in concrete-lined canals, and guarantee a minimum annual ecological inflow to the Aral Sea.',
        historicalConsequence:
          'Agricultural growth is slower and initial infrastructure costs are 3x higher. However, water waste drops by 40%, soil salinization is minimized, and the Aral Sea stabilizes at sustainable levels—preserving both the regional climate and the fishing industry.',
        tradeOffs: {
          economy: 'Lower short-term cotton output, but stable long-term multi-sector regional economy.',
          ecology: 'Preserves river delta wetlands, fish spawning grounds, and microclimate stability.',
          humanCost: 'Protects public health in Kyzylorda and Karakalpakstan from salt-dust exposure.',
        },
        historicalRealityNote:
          'Several Soviet hydrologists and Kazakh scientists warned about desiccation in the 1960s, but centralized production targets overrode conservation proposals.',
      },
      {
        id: '1c',
        label: 'Shift to Drought-Resistant Crops & Drip Irrigation',
        summary: 'Replace water-intensive cotton monoculture in northern basins with diverse, lower-water crops and modernized irrigation.',
        historicalConsequence:
          'Requires major agronomic reform and imported equipment, facing resistance from textile ministries. Over time, it prevents groundwater waterlogging and preserves Syr Darya river flow.',
        tradeOffs: {
          economy: 'Moderate transition cost; avoids monoculture dependency.',
          ecology: 'Significantly reduces pesticide runoff and river depletion.',
          humanCost: 'Sustains rural livelihoods and clean drinking water supplies.',
        },
        historicalRealityNote:
          'Crop diversification and canal modernization only began seriously in the 2000s alongside the Syr Darya Control Project.',
      },
    ],
  },
  {
    id: 2,
    era: 'SCENARIO 02 • PUBLIC HEALTH & RADIATION SAFETY (1950s–1980s)',
    role: 'Scientific & Public Safety Advisor near Semipalatinsk',
    title: 'Secrecy vs. Protecting Local Communities',
    prompt:
      'You are advising officials responsible for communities near a nuclear test site. Atmospheric and underground tests are taking place, and medical clinics in nearby districts report rising health concerns. What should be done to protect residents?',
    photoSrc: './images/semey-rds1-1949.jpg',
    photoCaption: 'Atmospheric nuclear testing at the Semipalatinsk Polygon (1949–1962).',
    contextFacts: [
      'Military secrecy laws classified radiation dose data for decades during the Cold War.',
      'Radioactive plumes from atmospheric tests (1949–1962) and underground venting events (up to 1989) drifted over inhabited rural settlements.',
    ],
    choices: [
      {
        id: '2a',
        label: 'Publish Radiological Data & Evacuate High-Risk Zones',
        summary: 'Declassify fallout maps, establish permanent buffer evacuations, and provide full medical screening and clean food/water supplies.',
        historicalConsequence:
          'Directly challenges Cold War military secrecy, risking political backlash from defense ministries. However, thousands of families in Abai, Beskaragai, and Zhanasemey are spared chronic internal radiation exposure through contaminated milk and water.',
        tradeOffs: {
          economy: 'High relocation and medical support costs.',
          ecology: 'Strict containment of contaminated pastures and water wells.',
          humanCost: 'Dramatically reduces multigenerational radiation-induced illnesses.',
        },
        historicalRealityNote:
          'In historical reality, Kazakh physician Kaimukhamed Atchabarov led a courageous scientific expedition in 1957–1958 that documented severe radiation sickness in local villages—though military authorities classified the findings for decades.',
      },
      {
        id: '2b',
        label: 'Maintain Strict Secrecy & Temporary Shelter Orders',
        summary: 'Keep fallout measurements classified for state security and only issue brief, temporary warnings during major tests.',
        historicalConsequence:
          'Testing continues on schedule without public scrutiny. Residents return immediately to pastures covered in radioactive fallout, leading to decades of unaddressed health trauma until the 1989 Nevada–Semipalatinsk protests force transparency.',
        tradeOffs: {
          economy: 'Zero disruption to military testing budgets in the short term.',
          ecology: 'Unmonitored bioaccumulation of radionuclides (Strontium-90, Cesium-137) in the food chain.',
          humanCost: 'Over 1.3 million citizens eventually affected by long-term health consequences.',
        },
        historicalRealityNote:
          'This reflects the tragic historical reality before 1989, when local communities lived adjacent to the Polygon without full knowledge of radiation hazards.',
      },
      {
        id: '2c',
        label: 'Halt All Testing & Mobilize Public Oversight',
        summary: 'Join scientists and citizens calling for an immediate moratorium on all nuclear explosions in the steppe.',
        historicalConsequence:
          'Creates a powerful alliance between medical researchers, writers, and citizens. Public pressure makes continued testing politically impossible, paving the way for the permanent closure of the site.',
        tradeOffs: {
          economy: 'Shifts state resources from military testing to environmental remediation.',
          ecology: 'Prevents further underground fractures and venting of radioactive gases.',
          humanCost: 'Restores dignity, transparency, and international medical aid to affected communities.',
        },
        historicalRealityNote:
          'In 1989, the Nevada–Semipalatinsk movement led by Olzhas Suleimenov united millions of citizens and successfully halted testing prior to the official 1991 closure.',
      },
    ],
  },
  {
    id: 3,
    era: 'SCENARIO 03 • POST-INDEPENDENCE RECOVERY (1991–2000s)',
    role: 'Environmental Recovery Strategist in Independent Kazakhstan',
    title: 'Prioritizing Limited National Resources',
    prompt:
      'You are planning environmental recovery after independence. Kazakhstan faces severe post-Soviet economic challenges, an open nuclear test site, and a shrinking Aral Sea split into two basins. Which actions should receive top priority?',
    photoSrc: './images/aral-kokaral-dam.jpg',
    photoCaption: 'Satellite view of the Kok-Aral Dam (completed 2005) stabilizing the North Aral Sea.',
    contextFacts: [
      'Saving the entire Aral Sea at once would require more water than the entire Syr Darya and Amu Darya currently carry to the delta.',
      'Unsecured nuclear test tunnels in the Degelen Mountains contain residual plutonium and fissile material.',
    ],
    choices: [
      {
        id: '3a',
        label: 'Build the Kok-Aral Dam & Secure the Polygon (Pragmatic Dual Strategy)',
        summary: 'Partner with international institutions to seal Semipalatinsk tunnels and build a 13-km dam to save the North Aral Sea while planting saxaul trees on the dry seabed.',
        historicalConsequence:
          'Rather than attempting an impossible overnight restoration of the entire basin, the Kok-Aral Dam (completed 2005) raises North Aral water levels by 4 meters, drops salinity by 70%, and revives 20+ fish species. Meanwhile, joint Kazakhstan–US–Russian–IAEA operations seal nuclear tunnels and secure fissile material.',
        tradeOffs: {
          economy: '$85M+ infrastructure investment yields sustainable regional fishery and international security partnerships.',
          ecology: 'Saves the North Aral ecosystem and stabilizes shifting toxic sands with drought-hardy saxaul forests.',
          humanCost: 'Fishing families return to Aralsk beaches; nuclear proliferation risks are eliminated.',
        },
        historicalRealityNote:
          'This was Kazakhstan’s real-world strategic path—often cited by the World Bank and UN as one of the most tangible environmental turnaround stories of the early 21st century.',
      },
      {
        id: '3b',
        label: 'Attempt Mega-Engineering to Refill the Entire Aral Basin',
        summary: 'Spend billions attempting to divert northern rivers or reconstruct the entire 1960 Aral shoreline at once.',
        historicalConsequence:
          'Massive capital is tied up in decade-long mega-projects that lack transboundary agreements and funding. In the meantime, the North Aral continues draining into the shallow South Basin and evaporating.',
        tradeOffs: {
          economy: 'Unsustainable financial burden during early independence.',
          ecology: 'Delays immediate conservation of the Syr Darya delta and North Aral.',
          humanCost: 'Local communities wait decades without tangible relief.',
        },
        historicalRealityNote:
          'Hydrologists recognized that stabilizing the North Aral Sea first via the Kok-Aral dike was the only scientifically viable way to prevent total loss.',
      },
      {
        id: '3c',
        label: 'Focus Exclusively on Industrial Growth First',
        summary: 'Postpone environmental cleanup and dam construction for 25 years until oil and mineral revenues mature.',
        historicalConsequence:
          'Without the Kok-Aral Dam, the North Aral Sea shrinks further into hypersaline ponds, destroying the remaining Syr Darya delta ecology and accelerating salt-dust desertification.',
        tradeOffs: {
          economy: 'Saves budget in the 1990s but multiplies long-term healthcare and desertification costs.',
          ecology: 'Irreversible loss of endemic aquatic species and delta wetlands.',
          humanCost: 'Continued out-migration and public health decline in Kyzylorda and Abai regions.',
        },
        historicalRealityNote:
          'Thankfully, early action in the 1990s and early 2000s prevented the complete loss of the North Aral Sea.',
      },
    ],
  },
];

export const HOPEFUL_RECOVERY_INITIATIVES = [
  {
    title: 'Kok-Aral Dam & North Aral Revival',
    year: '2005 – Present',
    metric: 42,
    metricPrefix: '+',
    metricSuffix: '%',
    metricLabel: 'Increase in North Aral water volume after dam completion',
    photoSrc: './images/aral-fisherman.jpg',
    photoCredit: 'Wikimedia Commons / Evgeni Zotov • North Aral Sea Fishery Revival',
    description:
      'Constructed by Kazakhstan with World Bank support, the 13-kilometer Kok-Aral Dam prevented Syr Darya waters from escaping into evaporation flats. Water salinity dropped from over 30 g/L to ~10–12 g/L, bringing fish and fishing vessels back toward Aralsk.',
  },
  {
    title: '1.1 Million Hectares of Saxaul Forests',
    year: '2021 – 2025+',
    metric: 1.1,
    metricPrefix: '',
    metricSuffix: 'M ha',
    metricDecimals: 1,
    metricLabel: 'Dry Aral seabed targeted for saxaul afforestation',
    photoSrc: './images/aral-north-recovery.jpg',
    photoCredit: 'NASA MODIS • North Aral Recovery & Seabed Stabilization',
    description:
      'To combat toxic salt and dust storms from the Aralkum Desert, ecologists and forestry teams plant drought-resistant black saxaul (Haloxylon ammodendron) shrubs directly on the dry seabed—a single mature saxaul bush can anchor up to 4 tons of shifting sand.',
  },
  {
    title: 'Global Nuclear Disarmament & Steppe Remediation',
    year: '1991 – Present',
    metric: 18500,
    metricPrefix: '',
    metricSuffix: ' km²',
    metricLabel: 'Radiological mapping & tunnel sealing by NNC RK',
    photoSrc: './images/semey-nnsa-tunnel.jpg',
    photoCredit: 'NNC RK / NNSA • Sealing of 181 Degelen Nuclear Test Tunnels',
    description:
      'After closing the Semipalatinsk Polygon on August 29, 1991, Kazakhstan partnered with the IAEA and international scientists to seal 181 nuclear test tunnels at Degelen Mountain, map soil radioactivity, and return safe lands to controlled use.',
  },
  {
    title: 'Altyn Dala Conservation Initiative (Earthshot Winner)',
    year: '2005 – Present',
    metric: 2.8,
    metricPrefix: '',
    metricSuffix: 'M+',
    metricDecimals: 1,
    metricLabel: 'Saiga antelopes restored from the brink of extinction',
    photoSrc: './images/saiga-antelope-steppe.jpg',
    photoCredit: 'Wikimedia Commons / Andrey Giljov • Saiga Antelope on the Steppe',
    description:
      'Recognized worldwide with the 2024 Earthshot Prize, Kazakhstan’s Altyn Dala ("Golden Steppe") partnership protected over 5 million hectares of steppe ecosystems and helped the critically endangered Saiga antelope rebound from under 40,000 in 2005 to over 2.8 million today.',
  },
];

export const VERIFIED_SOURCES: SourceReference[] = [
  {
    id: 'nasa-aral',
    organization: 'NASA Earth Observatory',
    title: 'World of Change: Shrinking Aral Sea (1960–2024 Satellite Series)',
    year: '2024',
    category: 'Aral Sea',
    url: 'https://earthobservatory.nasa.gov/world-of-change/AralSea',
    summary: 'Documented MODIS and Landsat satellite imagery tracking the separation of the North and South Aral Sea, the 2005 Kok-Aral Dam recovery, and the 2014 drying of the Eastern Basin.',
  },
  {
    id: 'world-bank-aral',
    organization: 'The World Bank',
    title: 'Syr Darya Control and Northern Aral Sea Project (SIRAP) Implementation Report',
    year: '2014 / 2022',
    category: 'Restoration',
    url: 'https://www.worldbank.org/en/news/feature/2014/07/18/improving-the-syr-darya-river-and-the-northern-aral-sea',
    summary: 'Official hydrological data on the construction of the Kok-Aral dike, showing water level rises from 38m to 42m Baltic Sea Level and the restoration of commercial fisheries in Kyzylorda.',
  },
  {
    id: 'iaea-semipalatinsk',
    organization: 'International Atomic Energy Agency (IAEA)',
    title: 'Radiological Conditions at the Semipalatinsk Test Site, Kazakhstan: Preliminary Assessment and Recommendations',
    year: '1998',
    category: 'Semipalatinsk',
    url: 'https://www-pub.iaea.org/MTCD/Publications/PDF/Pub1063_web.pdf',
    summary: 'Comprehensive peer-reviewed radiological survey of Ground Zero (Opytnoye Pole), Lake Chagan, and Degelen Mountain following the 456 nuclear tests conducted between 1949 and 1989.',
  },
  {
    id: 'un-nuclear-day',
    organization: 'United Nations Office for Disarmament Affairs (UNODA)',
    title: 'International Day against Nuclear Tests — 29 August (Resolution 64/35)',
    year: '2009',
    category: 'Semipalatinsk',
    url: 'https://www.un.org/en/observances/end-nuclear-tests-day/history',
    summary: 'Historical archive commemorating the August 29, 1991 closure of the Semipalatinsk Nuclear Test Site and the history of the 456 Soviet nuclear detonations in Kazakhstan.',
  },
  {
    id: 'nnc-rk',
    organization: 'National Nuclear Center of the Republic of Kazakhstan (NNC RK)',
    title: 'Semipalatinsk Test Site: Current State and Remediation Archive',
    year: '2021',
    category: 'Semipalatinsk',
    url: 'https://www.nnc.kz/en',
    summary: 'Official scientific records of the 116 atmospheric/surface and 340 underground nuclear tests, tunnel sealing operations, and ongoing environmental monitoring in East Kazakhstan.',
  },
  {
    id: 'micklin-peer-review',
    organization: 'Annual Review of Earth and Planetary Sciences (Peer-Reviewed)',
    title: 'Micklin, P. — "The Aral Sea Disaster" & "The Past, Present, and Future of the Aral Sea"',
    year: '2007 / 2016',
    category: 'Aral Sea',
    url: 'https://doi.org/10.1146/annurev.earth.35.031306.140120',
    summary: 'Foundational peer-reviewed hydrological research detailing 1960–2015 water volume, surface area, salinity curves, and Soviet cotton irrigation policies.',
  },
  {
    id: 'altyn-dala',
    organization: 'Altyn Dala Conservation Initiative / UNEP',
    title: 'Restoration of the Kazakh Steppe and Saiga Antelope Recovery',
    year: '2024',
    category: 'Restoration',
    url: 'https://altyndala.org/',
    summary: 'Documentation of large-scale steppe ecosystem conservation across central Kazakhstan.',
  },
];
