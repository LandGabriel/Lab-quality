![Logo do projeto](https://raw.githubusercontent.com/LandGabriel/Lab-quality/main/LabQuality/labQuality/src/assets/Lab-image.png)
O Lab Quality é uma aplicação desenvolvida em React que permite aos usuários monitorar e controlar os valores de exames laboratoriais de forma simples e intuitiva. Com uma interface amigável, a aplicação oferece funcionalidades para registrar exames, adicionar valores diários, visualizar gráficos e receber feedback sobre as médias e tendências dos valores registrados.

- [Para acessar o projeto](https://lab-quality.vercel.app/)
- ### Funcionalidades Principais:

- **Cadastro de Exames**: O usuário pode cadastrar exames, definindo seus valores mínimos e máximos para facilitar o acompanhamento.
- **Adição de Valores Diários**: É possível adicionar os valores diários dos exames registrados, com a data correspondente.
- **Visualização de Gráficos**: Os valores diários dos exames são exibidos em gráficos dinâmicos, permitindo uma análise visual rápida.
- **Cálculo de Média e Tendência**: A aplicação calcula automaticamente a média dos valores diários inseridos, exibindo na tela se a tendência é para alta ou baixa, ajudando o usuário a entender rapidamente a direção dos resultados.
- **Edição e Remoção de Dados**: O usuário pode facilmente editar ou remover valores e exames já cadastrados, com a possibilidade de cancelar edições em andamento.
- **Armazenamento Local**: Todos os dados são armazenados no `localStorage`, garantindo que as informações persistam mesmo após o fechamento do navegador.

### Estrutura do Projeto:

- **Components**:
    - `Home`: Página inicial com um resumo dos controles de exames e alertas importantes.
    - `RegisterExam`: Componente para cadastrar exames, incluindo funcionalidades de edição e exclusão.
    - `AddDailyValues`: Componente para adicionar e gerenciar valores diários dos exames, com visualização de gráficos e cálculo de média e tendência.
    - `ExamChart`: Exibição gráfica dos valores diários registrados para cada exame.
- **Context**:
    - `ExamsContext`: Gerencia o estado global dos exames e valores diários, facilitando o acesso e manipulação dos dados em diferentes componentes.
- **Rotas**:
    - `AppRoutes`: Gerenciamento das rotas principais, incluindo páginas de cadastro de exames, adição de valores diários, e configurações.

### Tecnologias Utilizadas:

- **React**: Biblioteca JavaScript para construção da interface de usuário.
- **Chart.js**: Biblioteca para visualização de dados, utilizada na exibição dos gráficos dos exames.
- **React Icons**: Biblioteca para ícones, utilizados nas ações de editar e remover valores.
- **CSS**: Estilização da interface, proporcionando uma experiência de usuário agradável e responsiva.

### Como Executar o Projeto:

1. Clone o repositório:
    
    ```bash
    bashCopiar código
    git clone https://github.com/seu-usuario/HealthMonitor.git
    
    ```
    
2. Navegue até o diretório do projeto:
    
    ```bash
    bashCopiar código
    cd LabQuality
    
    ```
    
3. Instale as dependências:
    
    ```bash
    bashCopiar código
    npm install
    
    ```
    
4. Inicie a aplicação:
    
    ```bash
    bashCopiar código
    npm start
    
    ```
    
5. Acesse no navegador:
    
    ```bash
    bashCopiar código
    http://localhost:3000
    
    ```
    

### Próximos Passos:

- Implementar uma página de configurações com opções de personalização.
- Adicionar suporte a múltiplos usuários.
- Integrar com APIs externas para obter dados médicos em tempo real.
- Implementar um sistema de notificações para alertas críticos.
