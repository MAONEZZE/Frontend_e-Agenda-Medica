# e-AGENDA MÉDICA

## Descrição do Projeto

Uma clínica médica requer um sistema eficiente para gerenciar e organizar o cronograma de atividades, como consultas e cirurgias, realizadas por profissionais médicos. Neste contexto, os alunos da Academia do Programador 2023 foram contratados para desenvolver o aplicativo web "e-AGENDA MÉDICA".

## Tecnologias e Ferramentas de Frontend
- **Angular**: Framework JavaScript para construção do frontend da aplicação.
- **Bootstrap**: Biblioteca de design e estilos para facilitar a criação de interfaces responsivas.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **HTML**: Linguagem de marcação utilizada para estruturar o conteúdo da aplicação.
- **Sass**: Linguagem para estilizar a pagina.
- **Angular Material**: Biblioteca para auxiliar no componentes da pagina. 

## Tecnologias e Ferramentas de Backtend
- **C#**: Linguagem de programação principal para o desenvolvimento do backend.
- **Entity Framework Core**: Ferramenta de mapeamento objeto-relacional (ORM) para interação com o banco de dados.
- **SQL Server**: Sistema de gerenciamento de banco de dados relacional utilizado para armazenar dados.
- **Visual Studio**: Ambiente no qual se foi desenvolvido o projeto do backend.
- **.NET Core**: Framework no qual se foi desenvolvido o projeto do backend.
- **ASP.NET**: Plataforma da Microsoft para o desenvolvimento de aplicações Web.

## Cenário

Uma clínica médica é um centro onde diversas atividades médicas são realizadas diariamente. Existem dois tipos principais de atividades: "Realizar Consulta" (individual) e "Realizar Cirurgia" (individual ou em equipe).

## Escopo da Solução

### Funcionalidades Principais

- Agendamento: O aplicativo permite agendar atividades em qualquer momento, seja no futuro ou passado.
- Detalhes da Atividade: Ao criar uma atividade, é possível indicar os horários de início e término, o tipo de atividade e o médico (ou lista de médicos) responsável.

### Regras de Recuperação

- Cirurgia: Após realizar uma cirurgia, é necessário um período de recuperação de 4 horas.
- Consulta: Após realizar uma consulta médica, o período de recuperação é de 20 minutos.

### Horário de Atividades

- Os médicos têm disponibilidade para realizar atividades durante o dia inteiro, todos os dias do ano.

