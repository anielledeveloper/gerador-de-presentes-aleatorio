# Gerador de Presentes Aleatório 🎁

Uma extensão inteligente do Chrome que encontra o presente perfeito para quem você ama! Com base em critérios detalhados como destinatário, faixa etária, gênero, interesses, ocasião e orçamento, a extensão usa um algoritmo inteligente para sugerir os melhores presentes de um banco de dados interno com mais de 50 opções cuidadosamente selecionadas.

## 🎯 Funcionalidades

### 🧠 Algoritmo Inteligente de Recomendação
- **Sistema de Pontuação Avançado**: Analisa múltiplos critérios com pesos específicos
- **Banco de Dados Interno**: Mais de 50 presentes categorizados e detalhadamente descritos
- **Matching Inteligente**: Combina idade, gênero, interesses, ocasião e orçamento
- **Ranking Personalizado**: Presentes ordenados por compatibilidade e popularidade
- **Explicações Detalhadas**: Cada sugestão vem com razões específicas do porquê foi escolhida

### 📊 Formulário Completo (6 Campos)
- **Para quem?**: Amigo(a), Pai, Mãe, Namorado(a), Irmão/Irmã, Colega de Trabalho
- **Faixa Etária**: Criança, Adolescente, Adulto, Idoso
- **Gênero**: Masculino, Feminino, Indiferente
- **Interesses e Hobbies**: Campo livre para hobbies e paixões
- **Ocasião**: Aniversário, Natal, Formatura, Promoção, etc.
- **Orçamento**: Até R$50, R$50-200, R$200-500, Acima de R$500

### 🎨 Interface Moderna e Intuitiva
- **Design Responsivo**: Funciona perfeitamente em qualquer tamanho de tela
- **Validação em Tempo Real**: Feedback imediato sobre campos obrigatórios
- **Animações Suaves**: Transições elegantes e feedback visual
- **Histórico de Buscas**: Salva e exibe buscas recentes
- **Busca Online Integrada**: Clique para encontrar o presente online

## 🚀 Instalação

### Desenvolvimento
1. Instale as dependências:
   ```bash
   npm install
   ```

2. Construa o projeto:
   ```bash
   npm run build
   ```

3. Carregue a extensão no Chrome:
   - Abra `chrome://extensions/`
   - Ative o "Modo do desenvolvedor"
   - Clique em "Carregar sem compactação"
   - Selecione a pasta `dist`

### Produção
1. Baixe o arquivo ZIP da última versão
2. Extraia o arquivo
3. Siga os passos 3 da instalação de desenvolvimento

## 🛠️ Scripts Disponíveis

- `npm run build` - Constrói o projeto para produção
- `npm run dev` - Inicia o modo de desenvolvimento com watch
- `npm run clean` - Remove a pasta dist
- `npm run package` - Cria um arquivo ZIP para distribuição

## 🎮 Como Usar

### Uso Básico
1. **Clique no ícone** da extensão na barra de ferramentas
2. **Preencha todos os 6 campos** do formulário:
   - Selecione o destinatário
   - Escolha a faixa etária
   - Selecione o gênero
   - Digite os interesses (ex: "tecnologia, música, culinária")
   - Escolha a ocasião
   - Defina o orçamento
3. **Clique em "Encontrar Presentes Perfeitos"**
4. **Explore as sugestões** com explicações detalhadas
5. **Clique em "Buscar Online"** para encontrar online

### Dicas para Melhores Resultados
- **Seja específico nos interesses**: "livros de ficção científica" em vez de apenas "livros"
- **Mencione hobbies**: Inclua atividades favoritas da pessoa
- **Use vírgulas**: Separe múltiplos interesses com vírgulas
- **Considere a ocasião**: Diferentes ocasiões sugerem diferentes tipos de presentes

## 🎯 Categorias de Presentes Disponíveis

### 💻 Tecnologia
- Fones de ouvido Bluetooth premium
- Smartwatches com monitoramento de saúde
- Carregadores portáteis de alta capacidade
- E muito mais...

### 📚 Livros
- Ficção científica e fantasia
- Livros de culinária e receitas
- Desenvolvimento pessoal e motivação
- E muito mais...

### ⚽ Esportes
- Kits completos de academia
- Bolas de futebol oficiais
- Tapetes de yoga premium
- E muito mais...

### 🏠 Casa
- Cafeteiras elétricas automáticas
- Jogos de panelas antiaderentes
- Luminárias LED inteligentes
- E muito mais...

### 👗 Moda
- Relógios clássicos elegantes
- Bolsas de couro legítimo
- Cintos de couro com fivela clássica
- E muito mais...

### 💄 Beleza
- Kits de cuidados com a pele
- Kits de barbearia premium
- E muito mais...

### 🎨 Hobbies
- Kits de pintura completos
- Ferramentas de jardinagem
- Kits de costura e artesanato
- E muito mais...

### 🎮 Jogos
- Jogos de tabuleiro estratégicos
- Consoles de videogame portáteis
- E muito mais...

### 🏥 Saúde
- Massageadores elétricos
- Kits de suplementos vitamínicos
- E muito mais...

## 🧠 Algoritmo de Recomendação

O sistema usa um algoritmo inteligente que analisa e pontua:

- **Faixa Etária** (40% do peso): Garante adequação à idade
- **Gênero** (30% do peso): Considera preferências por gênero
- **Orçamento** (25% do peso): Respeita limites financeiros
- **Interesses** (35% do peso): Combina com hobbies e paixões
- **Ocasião** (20% do peso): Considera o contexto do presente
- **Tipo de Destinatário** (15% do peso): Adapta ao relacionamento
- **Popularidade** (10% do peso): Inclui bônus por avaliações

### Exemplo de Pontuação
**Cenário**: Presente para mãe, 45 anos, feminino, interessada em culinária, ocasião de aniversário, orçamento R$100-200

**Resultado**:
- Jogo de panelas antiaderentes (95% match)
- Livro de receitas tradicionais (88% match)
- Cafeteira elétrica premium (82% match)

**Explicações**:
- "Ideal para adultos"
- "Dentro do orçamento de R$100-200"
- "Combina com os interesses: culinária"
- "Categoria: Casa"
- "Muito popular e bem avaliado"

## 🏗️ Arquitetura

### Estrutura do Projeto
```
gerador-de-presentes-aleatorio/
├── src/
│   ├── newtab/                 # Interface principal
│   │   ├── newtab.html         # Estrutura HTML
│   │   └── newtab.ts           # Lógica principal
│   ├── background/             # Service worker
│   │   └── background.ts       # Lógica de background
│   ├── data/                   # Banco de dados
│   │   └── giftDatabase.ts     # Dados dos presentes
│   ├── utils/                  # Algoritmos
│   │   └── giftMatcher.ts      # Sistema de matching
│   ├── types/                  # Definições TypeScript
│   │   └── interfaces.ts
│   └── styles/                 # Estilos CSS
│       └── style.css
├── icons/                      # Ícones da extensão
├── manifest.json               # Configuração da extensão
└── package.json                # Dependências e scripts
```

### Tecnologias Utilizadas
- **TypeScript**: Tipagem estática e melhor experiência de desenvolvimento
- **Webpack**: Bundling e otimização de assets
- **Chrome Extension API**: Integração com o navegador
- **Chrome Tabs API**: Abertura de novas abas
- **Chrome Storage API**: Armazenamento de histórico
- **Algoritmo de Matching**: Sistema inteligente de recomendação
- **HTML5/CSS3**: Interface moderna e responsiva

## 🔧 Configuração

### Permissões
A extensão requer apenas uma permissão:
- `tabs`: Para abrir a busca online em nova aba

### Dados Armazenados
- **Histórico de Buscas**: Últimas 5 buscas realizadas (chrome.storage.local)
- **Nenhum dado pessoal**: A extensão não coleta informações pessoais

## 🎨 Personalização

### Configurações Disponíveis
- **Histórico de Buscas**: Mantém as últimas 5 buscas
- **Validação de Formulário**: Validação em tempo real
- **Feedback Visual**: Confirmações e mensagens de erro

### Temas e Estilos
- Interface moderna com gradientes
- Animações suaves e feedback visual
- Design responsivo para diferentes tamanhos
- Cores temáticas de presentes
- Cards elegantes para sugestões

## 🐛 Solução de Problemas

### Problemas Comuns

**A extensão não abre a nova aba:**
- Verifique se a extensão está ativada
- Tente recarregar a extensão em `chrome://extensions/`
- Verifique o console para erros

**Nenhum presente encontrado:**
- Tente ajustar os critérios de busca
- Seja mais específico nos interesses
- Verifique se todos os campos estão preenchidos

**O formulário não valida:**
- Certifique-se de preencher todos os 6 campos
- Verifique se os campos não estão vazios
- Tente recarregar a página

### Logs de Debug
Abra o console do navegador (F12) para ver logs detalhados da extensão.

## 🤝 Contribuindo

### Áreas para Contribuição
- Adicionar novos presentes ao banco de dados
- Melhorar o algoritmo de matching
- Sugerir novas funcionalidades
- Reportar bugs
- Melhorar a documentação

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- Chrome Extension API para funcionalidade de extensão
- Comunidade de desenvolvedores de extensões Chrome
- Todos os contribuidores do projeto

## 🔗 Links Úteis

- [Chrome Extensions Developer Guide](https://developer.chrome.com/docs/extensions/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

**Encontre o presente perfeito com inteligência artificial! 🎁✨**

**Contato:** contato@geradordepresentes.com