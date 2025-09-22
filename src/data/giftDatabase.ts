/**
 * Comprehensive gift database for intelligent matching
 */

export interface Gift {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  priceRange: 'low' | 'medium' | 'high' | 'premium';
  ageGroup: 'child' | 'teen' | 'adult' | 'senior' | 'all';
  gender: 'male' | 'female' | 'unisex' | 'all';
  interests: string[];
  occasions: string[];
  recipientTypes: string[];
  tags: string[];
  imageUrl?: string;
  amazonUrl?: string;
  rating?: number;
  popularity: number; // 1-10 scale
}

export const GIFT_DATABASE: Gift[] = [
  // Technology & Electronics
  {
    id: 'tech-001',
    name: 'Fone de Ouvido Bluetooth Premium',
    description: 'Fone de ouvido sem fio com cancelamento de ruído e som de alta qualidade',
    category: 'Tecnologia',
    subcategory: 'Áudio',
    priceRange: 'high',
    ageGroup: 'adult',
    gender: 'unisex',
    interests: ['tecnologia', 'música', 'trabalho', 'estudo'],
    occasions: ['aniversário', 'natal', 'formatura', 'promoção'],
    recipientTypes: ['amigo', 'namorado', 'colega', 'irmão'],
    tags: ['bluetooth', 'sem fio', 'qualidade', 'profissional'],
    popularity: 9
  },
  {
    id: 'tech-002',
    name: 'Smartwatch Fitness',
    description: 'Relógio inteligente com monitoramento de saúde e fitness',
    category: 'Tecnologia',
    subcategory: 'Wearables',
    priceRange: 'high',
    ageGroup: 'adult',
    gender: 'unisex',
    interests: ['fitness', 'saúde', 'tecnologia', 'esporte'],
    occasions: ['aniversário', 'natal', 'promoção'],
    recipientTypes: ['amigo', 'namorado', 'pai', 'mãe'],
    tags: ['fitness', 'saúde', 'smartwatch', 'monitoramento'],
    popularity: 8
  },
  {
    id: 'tech-003',
    name: 'Carregador Portátil',
    description: 'Power bank de alta capacidade para carregar dispositivos móveis',
    category: 'Tecnologia',
    subcategory: 'Acessórios',
    priceRange: 'medium',
    ageGroup: 'adult',
    gender: 'unisex',
    interests: ['tecnologia', 'viagem', 'trabalho'],
    occasions: ['aniversário', 'natal', 'viagem'],
    recipientTypes: ['amigo', 'colega', 'irmão', 'pai'],
    tags: ['carregador', 'portátil', 'viagem', 'prático'],
    popularity: 7
  },

  // Books & Literature
  {
    id: 'book-001',
    name: 'Livro de Ficção Científica',
    description: 'Romance de ficção científica de autor renomado',
    category: 'Livros',
    subcategory: 'Ficção',
    priceRange: 'low',
    ageGroup: 'adult',
    gender: 'unisex',
    interests: ['leitura', 'ficção científica', 'fantasia', 'literatura'],
    occasions: ['aniversário', 'natal', 'formatura'],
    recipientTypes: ['amigo', 'namorado', 'irmão', 'pai'],
    tags: ['livro', 'ficção', 'ciência', 'leitura'],
    popularity: 6
  },
  {
    id: 'book-002',
    name: 'Livro de Culinária',
    description: 'Livro de receitas tradicionais e modernas',
    category: 'Livros',
    subcategory: 'Culinária',
    priceRange: 'low',
    ageGroup: 'adult',
    gender: 'unisex',
    interests: ['culinária', 'cozinha', 'receitas', 'gastronomia'],
    occasions: ['aniversário', 'natal', 'dia das mães'],
    recipientTypes: ['mãe', 'amigo', 'namorado', 'colega'],
    tags: ['culinária', 'receitas', 'cozinha', 'gastronomia'],
    popularity: 7
  },
  {
    id: 'book-003',
    name: 'Livro de Desenvolvimento Pessoal',
    description: 'Guia prático para crescimento pessoal e profissional',
    category: 'Livros',
    subcategory: 'Autoajuda',
    priceRange: 'low',
    ageGroup: 'adult',
    gender: 'unisex',
    interests: ['desenvolvimento', 'motivação', 'trabalho', 'crescimento'],
    occasions: ['aniversário', 'formatura', 'promoção'],
    recipientTypes: ['amigo', 'colega', 'irmão', 'pai'],
    tags: ['desenvolvimento', 'motivação', 'crescimento', 'profissional'],
    popularity: 8
  },
  {
    id: 'book-004',
    name: 'Livro de Memórias',
    description: 'Livro para registrar memórias e histórias de vida',
    category: 'Livros',
    subcategory: 'Memórias',
    priceRange: 'low',
    ageGroup: 'senior',
    gender: 'unisex',
    interests: ['memórias', 'história', 'família', 'escrita'],
    occasions: ['aniversário', 'natal', 'dia dos pais', 'dia das mães'],
    recipientTypes: ['pai', 'mãe', 'amigo', 'namorado'],
    tags: ['memórias', 'história', 'família', 'escrita'],
    popularity: 7
  },

  // Sports & Fitness
  {
    id: 'sport-001',
    name: 'Kit de Academia',
    description: 'Kit completo com garrafa, toalha e cintos de treino',
    category: 'Esportes',
    subcategory: 'Fitness',
    priceRange: 'medium',
    ageGroup: 'adult',
    gender: 'unisex',
    interests: ['fitness', 'academia', 'esporte', 'saúde'],
    occasions: ['aniversário', 'natal', 'promoção'],
    recipientTypes: ['amigo', 'namorado', 'irmão', 'pai'],
    tags: ['fitness', 'academia', 'treino', 'saúde'],
    popularity: 7
  },
  {
    id: 'sport-002',
    name: 'Bola de Futebol',
    description: 'Bola oficial de futebol de alta qualidade',
    category: 'Esportes',
    subcategory: 'Futebol',
    priceRange: 'low',
    ageGroup: 'teen',
    gender: 'unisex',
    interests: ['futebol', 'esporte', 'jogos', 'atividade'],
    occasions: ['aniversário', 'natal', 'dia das crianças'],
    recipientTypes: ['amigo', 'irmão', 'pai', 'filho'],
    tags: ['futebol', 'esporte', 'bola', 'jogos'],
    popularity: 6
  },
  {
    id: 'sport-003',
    name: 'Yoga Mat Premium',
    description: 'Tapete de yoga antiderrapante e confortável',
    category: 'Esportes',
    subcategory: 'Yoga',
    priceRange: 'medium',
    ageGroup: 'adult',
    gender: 'unisex',
    interests: ['yoga', 'meditação', 'bem-estar', 'relaxamento'],
    occasions: ['aniversário', 'natal', 'promoção'],
    recipientTypes: ['amigo', 'namorado', 'mãe', 'colega'],
    tags: ['yoga', 'meditação', 'bem-estar', 'relaxamento'],
    popularity: 8
  },

  // Home & Kitchen
  {
    id: 'home-001',
    name: 'Cafeteira Elétrica',
    description: 'Cafeteira automática com timer e função de gotejamento',
    category: 'Casa',
    subcategory: 'Cozinha',
    priceRange: 'medium',
    ageGroup: 'adult',
    gender: 'unisex',
    interests: ['café', 'culinária', 'cozinha', 'bebidas'],
    occasions: ['aniversário', 'natal', 'casa nova'],
    recipientTypes: ['amigo', 'namorado', 'pai', 'mãe'],
    tags: ['café', 'cozinha', 'bebidas', 'automático'],
    popularity: 9
  },
  {
    id: 'home-002',
    name: 'Jogo de Panelas Antiaderentes',
    description: 'Conjunto completo de panelas antiaderentes de alta qualidade',
    category: 'Casa',
    subcategory: 'Cozinha',
    priceRange: 'high',
    ageGroup: 'adult',
    gender: 'unisex',
    interests: ['culinária', 'cozinha', 'casa', 'gastronomia'],
    occasions: ['aniversário', 'natal', 'casa nova', 'casamento'],
    recipientTypes: ['mãe', 'amigo', 'namorado', 'colega'],
    tags: ['panelas', 'cozinha', 'antiaderente', 'qualidade'],
    popularity: 7
  },
  {
    id: 'home-003',
    name: 'Luminária LED Inteligente',
    description: 'Luminária com controle por app e diferentes tons de luz',
    category: 'Casa',
    subcategory: 'Iluminação',
    priceRange: 'medium',
    ageGroup: 'adult',
    gender: 'unisex',
    interests: ['decoração', 'tecnologia', 'casa', 'iluminação'],
    occasions: ['aniversário', 'natal', 'casa nova'],
    recipientTypes: ['amigo', 'namorado', 'mãe', 'colega'],
    tags: ['luminária', 'LED', 'inteligente', 'decoração'],
    popularity: 6
  },

  // Fashion & Accessories
  {
    id: 'fashion-001',
    name: 'Relógio Clássico',
    description: 'Relógio de pulso elegante e atemporal',
    category: 'Moda',
    subcategory: 'Acessórios',
    priceRange: 'high',
    ageGroup: 'adult',
    gender: 'unisex',
    interests: ['moda', 'elegância', 'acessórios', 'estilo'],
    occasions: ['aniversário', 'natal', 'formatura', 'promoção'],
    recipientTypes: ['amigo', 'namorado', 'pai', 'irmão'],
    tags: ['relógio', 'elegante', 'clássico', 'acessório'],
    popularity: 8
  },
  {
    id: 'fashion-002',
    name: 'Bolsa de Couro',
    description: 'Bolsa de couro legítimo com design moderno',
    category: 'Moda',
    subcategory: 'Bolsas',
    priceRange: 'high',
    ageGroup: 'adult',
    gender: 'female',
    interests: ['moda', 'acessórios', 'elegância', 'estilo'],
    occasions: ['aniversário', 'natal', 'dia das mães'],
    recipientTypes: ['mãe', 'amiga', 'namorada', 'irmã'],
    tags: ['bolsa', 'couro', 'elegante', 'moda'],
    popularity: 7
  },
  {
    id: 'fashion-003',
    name: 'Cinto de Couro',
    description: 'Cinto de couro legítimo com fivela clássica',
    category: 'Moda',
    subcategory: 'Acessórios',
    priceRange: 'medium',
    ageGroup: 'adult',
    gender: 'male',
    interests: ['moda', 'acessórios', 'elegância', 'estilo'],
    occasions: ['aniversário', 'natal', 'promoção'],
    recipientTypes: ['amigo', 'namorado', 'pai', 'irmão'],
    tags: ['cinto', 'couro', 'elegante', 'acessório'],
    popularity: 6
  },

  // Beauty & Personal Care
  {
    id: 'beauty-001',
    name: 'Kit de Cuidados com a Pele',
    description: 'Kit completo com cremes, sérums e protetor solar',
    category: 'Beleza',
    subcategory: 'Cuidados com a Pele',
    priceRange: 'high',
    ageGroup: 'adult',
    gender: 'female',
    interests: ['beleza', 'cuidados', 'pele', 'bem-estar'],
    occasions: ['aniversário', 'natal', 'dia das mães'],
    recipientTypes: ['mãe', 'amiga', 'namorada', 'irmã'],
    tags: ['beleza', 'pele', 'cuidados', 'bem-estar'],
    popularity: 8
  },
  {
    id: 'beauty-002',
    name: 'Kit de Barbearia Premium',
    description: 'Kit completo com navalha, creme de barbear e pós-barba',
    category: 'Beleza',
    subcategory: 'Barbearia',
    priceRange: 'medium',
    ageGroup: 'adult',
    gender: 'male',
    interests: ['beleza', 'barbearia', 'cuidados', 'masculino'],
    occasions: ['aniversário', 'natal', 'promoção'],
    recipientTypes: ['amigo', 'namorado', 'pai', 'irmão'],
    tags: ['barbearia', 'masculino', 'cuidados', 'premium'],
    popularity: 7
  },

  // Hobbies & Crafts
  {
    id: 'hobby-001',
    name: 'Kit de Pintura',
    description: 'Kit completo com tintas, pincéis e telas para pintura',
    category: 'Hobbies',
    subcategory: 'Arte',
    priceRange: 'medium',
    ageGroup: 'adult',
    gender: 'unisex',
    interests: ['arte', 'pintura', 'criatividade', 'hobbies'],
    occasions: ['aniversário', 'natal', 'formatura'],
    recipientTypes: ['amigo', 'namorado', 'mãe', 'irmão'],
    tags: ['arte', 'pintura', 'criatividade', 'hobbies'],
    popularity: 6
  },
  {
    id: 'hobby-002',
    name: 'Kit de Jardinagem',
    description: 'Kit completo com ferramentas e sementes para jardinagem',
    category: 'Hobbies',
    subcategory: 'Jardinagem',
    priceRange: 'medium',
    ageGroup: 'adult',
    gender: 'unisex',
    interests: ['jardinagem', 'plantas', 'natureza', 'hobbies'],
    occasions: ['aniversário', 'natal', 'dia das mães'],
    recipientTypes: ['mãe', 'amigo', 'pai', 'colega'],
    tags: ['jardinagem', 'plantas', 'natureza', 'ferramentas'],
    popularity: 7
  },
  {
    id: 'hobby-003',
    name: 'Kit de Costura',
    description: 'Kit completo com agulhas, linhas e acessórios para costura',
    category: 'Hobbies',
    subcategory: 'Costura',
    priceRange: 'low',
    ageGroup: 'adult',
    gender: 'female',
    interests: ['costura', 'artesanato', 'criatividade', 'hobbies'],
    occasions: ['aniversário', 'natal', 'dia das mães'],
    recipientTypes: ['mãe', 'amiga', 'irmã', 'colega'],
    tags: ['costura', 'artesanato', 'criatividade', 'ferramentas'],
    popularity: 5
  },

  // Games & Entertainment
  {
    id: 'game-001',
    name: 'Jogo de Tabuleiro Estratégico',
    description: 'Jogo de tabuleiro para 2-6 jogadores com estratégia e diversão',
    category: 'Jogos',
    subcategory: 'Tabuleiro',
    priceRange: 'medium',
    ageGroup: 'adult',
    gender: 'unisex',
    interests: ['jogos', 'estratégia', 'diversão', 'família'],
    occasions: ['aniversário', 'natal', 'família'],
    recipientTypes: ['amigo', 'namorado', 'pai', 'irmão'],
    tags: ['jogos', 'tabuleiro', 'estratégia', 'diversão'],
    popularity: 8
  },
  {
    id: 'game-002',
    name: 'Console de Videogame',
    description: 'Console de videogame portátil com jogos inclusos',
    category: 'Jogos',
    subcategory: 'Videogame',
    priceRange: 'high',
    ageGroup: 'teen',
    gender: 'unisex',
    interests: ['jogos', 'videogame', 'diversão', 'tecnologia'],
    occasions: ['aniversário', 'natal', 'formatura'],
    recipientTypes: ['amigo', 'namorado', 'irmão', 'filho'],
    tags: ['videogame', 'console', 'jogos', 'diversão'],
    popularity: 9
  },

  // Health & Wellness
  {
    id: 'health-001',
    name: 'Massageador Elétrico',
    description: 'Massageador elétrico para relaxamento e alívio de tensões',
    category: 'Saúde',
    subcategory: 'Relaxamento',
    priceRange: 'medium',
    ageGroup: 'adult',
    gender: 'unisex',
    interests: ['saúde', 'relaxamento', 'bem-estar', 'massagem'],
    occasions: ['aniversário', 'natal', 'promoção'],
    recipientTypes: ['amigo', 'namorado', 'pai', 'mãe'],
    tags: ['massagem', 'relaxamento', 'saúde', 'bem-estar'],
    popularity: 7
  },
  {
    id: 'health-003',
    name: 'Termômetro Digital',
    description: 'Termômetro digital preciso e fácil de usar',
    category: 'Saúde',
    subcategory: 'Monitoramento',
    priceRange: 'low',
    ageGroup: 'senior',
    gender: 'unisex',
    interests: ['saúde', 'monitoramento', 'bem-estar', 'medicina'],
    occasions: ['aniversário', 'natal', 'promoção'],
    recipientTypes: ['pai', 'mãe', 'amigo', 'namorado'],
    tags: ['termômetro', 'saúde', 'monitoramento', 'digital'],
    popularity: 6
  },
  {
    id: 'health-004',
    name: 'Medicador Semanal',
    description: 'Organizador de medicamentos para uma semana',
    category: 'Saúde',
    subcategory: 'Organização',
    priceRange: 'low',
    ageGroup: 'senior',
    gender: 'unisex',
    interests: ['saúde', 'organização', 'medicamentos', 'bem-estar'],
    occasions: ['aniversário', 'natal', 'promoção'],
    recipientTypes: ['pai', 'mãe', 'amigo', 'namorado'],
    tags: ['medicamentos', 'organização', 'saúde', 'semanal'],
    popularity: 7
  },
  {
    id: 'health-002',
    name: 'Kit de Suplementos',
    description: 'Kit com vitaminas e suplementos para saúde e bem-estar',
    category: 'Saúde',
    subcategory: 'Suplementos',
    priceRange: 'high',
    ageGroup: 'adult',
    gender: 'unisex',
    interests: ['saúde', 'fitness', 'bem-estar', 'nutrição'],
    occasions: ['aniversário', 'natal', 'promoção'],
    recipientTypes: ['amigo', 'namorado', 'pai', 'mãe'],
    tags: ['suplementos', 'vitaminas', 'saúde', 'bem-estar'],
    popularity: 6
  }
];

export const GIFT_CATEGORIES = [
  'Tecnologia',
  'Livros',
  'Esportes',
  'Casa',
  'Moda',
  'Beleza',
  'Hobbies',
  'Jogos',
  'Saúde'
];

export const PRICE_RANGES = {
  low: { min: 0, max: 50, label: 'Até R$50' },
  medium: { min: 50, max: 200, label: 'R$50 a R$200' },
  high: { min: 200, max: 500, label: 'R$200 a R$500' },
  premium: { min: 500, max: 1000, label: 'Acima de R$500' }
};

export const OCCASIONS = [
  'Aniversário',
  'Natal',
  'Dia das Mães',
  'Dia dos Pais',
  'Formatura',
  'Promoção',
  'Casa Nova',
  'Casamento',
  'Viagem',
  'Dia das Crianças'
];

export const INTERESTS = [
  'Tecnologia',
  'Música',
  'Leitura',
  'Culinária',
  'Fitness',
  'Esporte',
  'Arte',
  'Jardinagem',
  'Jogos',
  'Moda',
  'Beleza',
  'Viagem',
  'Fotografia',
  'Música',
  'Cinema',
  'Natureza',
  'Casa',
  'Decoração',
  'Trabalho',
  'Estudo'
];
