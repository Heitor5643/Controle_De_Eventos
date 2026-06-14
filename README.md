# EventFlow - Controle de Eventos 📅

Sistema web responsivo para gerenciamento e controle de eventos, desenvolvido como projeto prático para o **Trabalho II da disciplina de Programação Web**.

## 👥 Integrantes (Grupo 8)
* Ana Luiza Sousa Silva
* Heitor Ribeiro de Andrade
* Mara Dávila Beserra de Sousa
* Silvia Lopes Lima Nobre
* Vitor César Correira de Almeida

## 🛠️ Tecnologias Utilizadas
* **HTML5:** Estruturação semântica das páginas e formulários.
* **CSS3:** Estilização moderna utilizando variáveis, Grids, Flexbox e Media Queries para total responsividade.
* **JavaScript (Vanilla):** Lógica de negócios, manipulação dinâmica do DOM, validações e gerenciamento de estado.
* **LocalStorage:** Persistência de dados local tanto para a sessão do usuário quanto para o banco de dados de eventos.

## 🚀 Funcionalidades do Sistema

* **Página Inicial (Home):** Apresentação clara do objetivo do sistema focado no conceito **CRUD**.
* **Menu Lateral Dinâmico:** Links que se adaptam visualmente dependendo do estado de autenticação do usuário (Logado/Deslogado).
* **Autenticação Local:** * Cadastro de novos usuários com validação de e-mail único e senha forte (mínimo de 4 caracteres).
  * Tela de login integrada.
* **Segurança de Rotas (Proteção de Páginas):** Bloqueio de acesso às páginas de cadastro e listagem para usuários que não estão devidamente logados no sistema.
* **CRUD de Eventos Completo:**
  * **Create:** Cadastro com campos obrigatórios (`Nome` e `Responsável`) e opcionais.
  * **Read:** Listagem em formato de tabela responsiva, exibindo `N/A` em campos opcionais que foram deixados em branco, com formatação de data padrão brasileiro (`DD/MM/AAAA`).
  * **Update:** Edição de registros existentes no mesmo formulário de cadastro, com preenchimento automático e botão para cancelar a edição.
  * **Delete:** Exclusão de eventos com caixa de confirmação nativa.
* **Busca em Tempo Real:** Filtro inteligente por `nome`, `responsável` ou `local` à medida que o usuário digita.
* **Regra de Negócio de Unicidade:** O sistema impede o cadastro ou edição de eventos que possuam o mesmo nome (validação *case-insensitive*).
* **Feedback ao Usuário (Toast):** Sistema de notificações flutuantes temporizadas para ações bem-sucedidas ou erros.

## 🧠 Principais Aprendizados Práticos

O desenvolvimento deste projeto permitiu ao grupo consolidar diversos conceitos essenciais do ecossistema de Desenvolvimento Web Front-End:

### 1. Manipulação Avançada do DOM e Single Page Application (SPA)
* Aprendemos a criar uma experiência de **SPA** puramente com JS e CSS, alternando a visibilidade das seções (`.page`) através da adição e remoção da classe `.active`, evitando recarregamentos desnecessários de página.
* Criação de funções utilitárias como a arrow function `const $ = (id) => document.getElementById(id);` para otimizar e limpar a escrita do código.

### 2. Persistência de Dados e Tratamento de Erros com LocalStorage
* Implementação de múltiplas chaves no armazenamento local para separar a sessão ativa (`ef_session`), a lista de usuários (`ef_users`) e a base de eventos (`ef_events`).
* Uso de blocos `try/catch` para prevenir quebras no sistema caso ocorra alguma corrupção na leitura dos dados serializados em JSON.

### 3. CSS Moderno, Layouts Dinâmicos e Estados de Elementos
* Uso avançado de **CSS Grid** e **Flexbox** para alinhar elementos complexos (como o formulário e a tabela).
* Aprendizado sobre controle de visibilidade baseado em classes aplicadas na tag pai (`body:not(.logado) .guest`, `body.logado .auth`), permitindo esconder ou exibir elementos do menu de forma automatizada apenas alterando a classe do `body`.
* Implementação do conceito de design responsivo com `@media (max-width: 820px)` para adaptar o menu lateral fixo para o topo em telas menores de dispositivos móveis.

### 4. Lógica de Negócios e Manipulação de Arrays em JS
* Aplicação prática de métodos modernos de Arrays do JavaScript, tais como:
  * `.some()` para validar a existência de registros duplicados de usuários e eventos.
  * `.find()` para buscar credenciais de login corretas e carregar dados para edição.
  * `.filter()` para criar mecanismos de busca eficientes e remoção de itens.
  * `.map()` acoplado a *Template Literals* para renderizar de forma performática as linhas da tabela em HTML.

## 📂 Estrutura de Arquivos

```gfm
├── index.html   # Estrutura e marcação semântica das telas e formulários
├── style.css    # Identidade visual, responsividade e animações (Ex: Toast)
├── script.js    # Motor do sistema (Lógica do CRUD, Autenticação e LocalStorage)
└── README.md    # Documentação oficial do projeto

## ✨ Melhorias Adicionais

Após a conclusão dos requisitos obrigatórios do trabalho, foram realizadas algumas melhorias na interface e experiência do usuário:

- Adição de rodapsones visuais nos botões de edição e exclusão.
- Implementação de animações nos cards da página inicial.
- Exibição da data atual na tela inicial.
- Mensagem personalizada de boas-vindas para usuários autenticados.
- Melhoria dos placeholders dos campos dos formulários.
- Adição de contador de caracteres no campo de nome do evento.
- Destaque visual para os diferentes status dos eventos.
- Inclusão de um pre visualizador de imagens
- Atualização da descrição da página inicial para melhor apresentação do sistema.

Essas melhorias foram desenvolvidas com foco em usabilidade, organização visual e experiência do usuário, sem alterar as funcionalidades principais do CRUD.