# App Pets 
>Atividade de programação de scripts

O **App Pets** tem o intuito de o usuário efetuar o registro de seus Pets, os gatos envolvendo os cuidados com seus Pets e os medicamentos utilizados.

## Estruturação das pastas
A estruturação tem o objetivo de organizar os arquivos do projeto, de maneira clara e de fácil manutentação.
Onde as pastas são separadas por:

- **assets:** imagens utilizadas.
- **components:** componentes que tendem a se repetirem em outras páginas, é criado em _components_.
- **contexts:** é a forma de passar os dados entre a árvore de componentes sem a necessidade de passar por **props** (de nível em nível).
- **hooks:** são funções que permitem usar e mudar os estados do componente funcional.
- **pages:** é onde são organizados as páginas/telas.
- **routes:** onde são criadas as rotas da navegação.
- **types:** é onde estão as _interfaces_ das páginas.
## Telas / **pages**
>Os dados são passados através do contexto entre as telas.

Os **estilos** das páginas são feitos para cada tela com o nome de _styles.js_.

Algumas páginas fazem o uso do componente ` Loading ` que tem a finalidade de exibir uma tela de "carregando" toda vez que algo estiver sendo processado.
### Login
>Tela designada a **autenticação** da conta usuário.

Utiliza-se a autenticação por meio da validação do **token** em _useAuth_
### Register
>Tela designada ao **cadastro** do usuário.

Utiliza-se o **userCreate** de _useAuth_ para cadastrar o usuário através do e-mail e senha informados.
### Home
>Tela inicial do usuário para efetuar o login ou cadastro.

A navegação ocorre pelos botões de _logar_ ou  _cadastrar_
### Dashboard
Tela onde é exibido a navegação do MaterialTopTab contendo as telas de **Pet**, **Payment** e **Medicine**.

- #### Pet
>Tela responsável pela criação, listagem e exclusão do Pet.

Utilizando o **usePet** e **PetType** é obtido as funcionalidades de `_pet, setPet, petCreate, petList, petRemove_`.

Ao criar (`petCreate`) um pet, ele é exibido (`petList`) na tela onde poderá ser "selecionado", para que possa excluir (`petRemove`) ou adicionar mais informações sobre ele como os "gastos" pagos que deverá clicar no ícone de pagamento para redirecionar a tela, ou adicionar um "medicamento" que foi utilizado no _Pet_, clicando no ícone de medicamento para redirecionar a tela.
- #### Payment
>Tela responsável pela criação, listagem e exclusão dos pagamentos.

Utilizando o **usePet** e **PaymentType** é obtido as funcionalidades de` _pet, paymentCreate, paymentList, paymentRemove_`.

Na tela de pagamento, logo após selecionar o _Pet_, é possível criar os gastos (`paymentCreate`) que o _Pet_ teve;
Onde é exibido (`paymentList`) o nome, o valor, a data do cadastro daquele gasto e a opção de deletar (`paymentRemove`) o pagamento criado.

- #### Medicine
>Tela responsável pela criação, listagem e exclusão dos medicamentos.

Utilizando o **usePet** e **MedicineType** é obtido as funcionalidades de `_pet, medicineCreate, medicineList, medicineRemove_`.

Na tela de medicamentos, logo após selecionar o _Pet_, é exibido o nome do _Pet_, onde será possível criar os medicamentos (`medicineCreate`) que o _Pet_ utilizou;
Onde é exibido (`medicineList`) o nome dos medicamentos, a data do cadastro daquele medicamento e a opção de deletar (`medicineRemove`) o medicamento criado.