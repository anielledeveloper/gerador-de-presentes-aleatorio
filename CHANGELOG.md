# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [2.1.0] - 2025-01-XX

### 🔄 Alterado
- **Removidas todas as referências à Amazon** - extensão agora é platform-agnostic
- **URLs de busca atualizadas** - agora usa URLs genéricas de exemplo
- **Documentação atualizada** - README e CHANGELOG sem referências específicas à Amazon
- **Funções renomeadas** - `generateAmazonSearchUrl` → `generateSearchUrl`, `openAmazonSearch` → `openSearch`

### 🎯 Melhorado
- **Flexibilidade de plataforma** - fácil adaptação para qualquer motor de busca
- **Código mais limpo** - removidas dependências específicas de plataforma
- **Manutenibilidade** - URLs e configurações centralizadas e facilmente modificáveis

## [2.0.0] - 2025-01-XX

### 🎉 Adicionado
- **Banco de dados interno de presentes** com mais de 50 opções categorizadas
- **Algoritmo inteligente de matching** com sistema de pontuação avançado
- **Formulário expandido** com 6 campos para máxima precisão:
  - Faixa etária (Criança, Adolescente, Adulto, Idoso)
  - Gênero (Masculino, Feminino, Indiferente)
  - Ocasião (Aniversário, Natal, Formatura, etc.)
- **Interface de resultados aprimorada** com:
  - Ranking de sugestões com percentual de compatibilidade
  - Explicações detalhadas do porquê cada presente foi escolhido
  - Categorização visual com emojis
  - Botões de busca online integrados
- **9 categorias de presentes**:
  - 💻 Tecnologia (Fones, Smartwatches, Carregadores)
  - 📚 Livros (Ficção, Culinária, Desenvolvimento Pessoal)
  - ⚽ Esportes (Academia, Futebol, Yoga)
  - 🏠 Casa (Cafeteiras, Panelas, Luminárias)
  - 👗 Moda (Relógios, Bolsas, Cintos)
  - 💄 Beleza (Skincare, Barbearia)
  - 🎨 Hobbies (Arte, Jardinagem, Costura)
  - 🎮 Jogos (Tabuleiro, Videogame)
  - 🏥 Saúde (Massageadores, Suplementos)
- **Sistema de pontuação inteligente** que considera:
  - Faixa etária (40% do peso)
  - Gênero (30% do peso)
  - Orçamento (25% do peso)
  - Interesses (35% do peso)
  - Ocasião (20% do peso)
  - Tipo de destinatário (15% do peso)
  - Popularidade (10% do peso)
- **Nova interface de nova aba** em vez de popup
- **Histórico de buscas aprimorado** com melhor visualização
- **Validação de formulário em tempo real** para todos os campos
- **Animações e transições suaves** na interface
- **Design responsivo** otimizado para diferentes tamanhos de tela

### 🔄 Alterado
- **Arquitetura completamente reformulada** para suportar banco de dados interno
- **Interface migrada** de popup para nova aba para melhor experiência
- **Sistema de busca** agora usa algoritmo interno em vez de redirecionamento direto
- **Validação de formulário** expandida para 6 campos obrigatórios
- **Sistema de armazenamento** otimizado para histórico de buscas
- **Estrutura de projeto** reorganizada com separação clara de responsabilidades

### 🐛 Corrigido
- **Problemas de validação** em formulários com múltiplos campos
- **Erros de TypeScript** relacionados a interfaces expandidas
- **Problemas de build** com novas dependências
- **Validação de campos obrigatórios** agora funciona corretamente
- **Feedback visual** melhorado para melhor UX

### 🗑️ Removido
- **Dependência de plataformas externas** - agora usa banco de dados interno
- **Redirecionamento automático** - substituído por sugestões inteligentes
- **Interface de popup** - migrada para nova aba
- **Sistema de busca simples** - substituído por algoritmo inteligente

### 🔧 Técnico
- **Nova estrutura de arquivos**:
  - `src/data/giftDatabase.ts` - Banco de dados de presentes
  - `src/utils/giftMatcher.ts` - Algoritmo de matching
  - `src/background/background.ts` - Service worker
- **Interfaces TypeScript expandidas** para suportar novos campos
- **Sistema de build otimizado** para novos módulos
- **Configuração de webpack atualizada** para novos assets

## [1.0.0] - 2025-01-XX

### 🎉 Adicionado
- **Interface inicial** com formulário de 3 campos
- **Integração com busca online** para encontrar presentes
- **Sistema de validação básico** para campos obrigatórios
- **Histórico de buscas simples** com armazenamento local
- **Design moderno** com gradientes e animações
- **Sistema de build** com Webpack e TypeScript
- **Documentação completa** com README e guias de instalação

### 🔧 Técnico
- **Configuração inicial** do projeto Chrome Extension
- **Manifest V3** para compatibilidade moderna
- **TypeScript** para tipagem estática
- **Webpack** para bundling e otimização
- **Chrome APIs** para funcionalidade de extensão

---

## Como Contribuir

Para contribuir com este projeto:

1. **Reporte bugs** abrindo uma issue com detalhes do problema
2. **Sugira funcionalidades** descrevendo o que gostaria de ver
3. **Envie pull requests** com melhorias ou correções
4. **Adicione presentes** ao banco de dados interno
5. **Melhore o algoritmo** de matching de presentes

## Versionamento

Este projeto usa [Versionamento Semântico](https://semver.org/lang/pt-BR/):
- **MAJOR** (X.0.0): Mudanças incompatíveis na API
- **MINOR** (0.X.0): Funcionalidades adicionadas de forma compatível
- **PATCH** (0.0.X): Correções de bugs compatíveis

## Links Úteis

- [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/)
- [Versionamento Semântico](https://semver.org/lang/pt-BR/)
- [Chrome Extensions](https://developer.chrome.com/docs/extensions/)