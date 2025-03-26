// import { Category } from '../interfaces/game-board.interfaces';
// import { generateId } from '../../../../utils';

// export const questionsMock = [
//   {
//     name: 'География',
//     id: generateId(),
//     questions: [
//       {
//         value: 100,
//         question: 'Эта страна является самой большой по площади в мире',
//         answer: 'Россия',
//         isAnswered: true,
//         id: generateId(),
//       },
//       {
//         value: 200,
//         question: 'Самая длинная река в мире',
//         answer: 'Нил',
//         isAnswered: false,
//         id: generateId(),
//       },
//       {
//         value: 300,
//         question: 'Столица Австралии',
//         answer: 'Канберра',
//         isAnswered: false,
//         id: generateId(),
//       },
//       {
//         value: 400,
//         question: 'Самая высокая гора в мире',
//         answer: 'Эверест',
//         isAnswered: false,
//         id: generateId(),
//       },
//       {
//         value: 500,
//         question: 'Это море является самым соленым на Земле',
//         answer: 'Мертвое море',
//         isAnswered: false,
//         id: generateId(),
//       },
//     ],
//   },
//   {
//     name: 'Кинематограф',
//     id: generateId(),
//     questions: [
//       {
//         value: 100,
//         question: '<p>Кто сыграл главную роль в фильме "Титаник"?</p>',
//         answer: '<p>Леонардо Ди Каприо</p>',
//         isAnswered: false,
//         id: generateId(),
//       },
//       {
//         value: 200,
//         question: 'Какой фильм получил "Оскар" как лучший фильм в 1994 году?',
//         answer: 'Форрест Гамп',
//         isAnswered: false,
//         id: generateId(),
//       },
//       {
//         value: 300,
//         question: 'Кто срежиссировал трилогию "Властелин колец"?',
//         answer: 'Питер Джексон',
//         isAnswered: false,
//         id: generateId(),
//       },
//       {
//         value: 400,
//         question:
//           'Какой актер известен ролью Джеймса Бонда в фильмах 1962-1967 годов?',
//         answer: 'Шон Коннери',
//         isAnswered: false,
//         id: generateId(),
//       },
//       {
//         value: 500,
//         question:
//           'Кто озвучил Симбу во взрослом возрасте в оригинальном "Короле Льве" 1994 года?',
//         answer: 'Мэттью Бродерик',
//         isAnswered: false,
//         id: generateId(),
//       },
//     ],
//   },
//   {
//     name: 'Наука',
//     id: generateId(),
//     questions: [
//       {
//         value: 100,
//         question: 'Химический символ золота',
//         answer: 'Au',
//         isAnswered: false,
//         id: generateId(),
//       },
//       {
//         value: 200,
//         question: 'Самая близкая к Земле звезда',
//         answer: 'Солнце',
//         isAnswered: false,
//         id: generateId(),
//       },
//       {
//         value: 300,
//         question:
//           'Какой элемент является самым распространенным в земной коре?',
//         answer: 'Кислород',
//         isAnswered: false,
//         id: generateId(),
//       },
//       {
//         value: 400,
//         question: 'Кто открыл пенициллин?',
//         answer: 'Александр Флеминг',
//         isAnswered: false,
//         id: generateId(),
//       },
//       {
//         value: 500,
//         question: 'Какая частица имеет положительный заряд в атоме?',
//         answer: 'Протон',
//         isAnswered: false,
//         id: generateId(),
//       },
//     ],
//   },
//   {
//     name: 'История',
//     id: generateId(),
//     questions: [
//       {
//         value: 100,
//         question: 'В каком году началась Вторая мировая война?',
//         answer: '1939',
//         isAnswered: false,
//         id: generateId(),
//       },
//       {
//         value: 200,
//         question: 'Кто был первым президентом США?',
//         answer: 'Джордж Вашингтон',
//         isAnswered: false,
//         id: generateId(),
//       },
//       {
//         value: 300,
//         question: 'В каком году пала Берлинская стена?',
//         answer: '1989',
//         isAnswered: false,
//         id: generateId(),
//       },
//       {
//         value: 400,
//         question:
//           'Какая империя пала в 1453 году после захвата Константинополя?',
//         answer: 'Византийская империя',
//         isAnswered: false,
//         id: generateId(),
//       },
//       {
//         value: 500,
//         question: 'Кто был последним фараоном Древнего Египта?',
//         answer: 'Клеопатра VII',
//         isAnswered: false,
//         id: generateId(),
//       },
//     ],
//   },
//   {
//     name: 'Искусство',
//     id: generateId(),
//     questions: [
//       {
//         value: 100,
//         question: 'Кто написал "Мону Лизу"?',
//         answer: 'Леонардо да Винчи',
//         isAnswered: false,
//         id: generateId(),
//       },
//       {
//         value: 200,
//         question: 'Какой художник отрезал себе ухо?',
//         answer: 'Винсент Ван Гог',
//         isAnswered: false,
//         id: generateId(),
//       },
//       {
//         value: 300,
//         question: 'В каком стиле писал Сальвадор Дали?',
//         answer: 'Сюрреализм',
//         isAnswered: false,
//         id: generateId(),
//       },
//       {
//         value: 400,
//         question: 'Кто написал "Герника"?',
//         answer: 'Пабло Пикассо',
//         isAnswered: false,
//         id: generateId(),
//       },
//       {
//         value: 500,
//         question: 'Какой русский художник известен своим "Черным квадратом"?',
//         answer: 'Казимир Малевич',
//         isAnswered: false,
//         id: generateId(),
//       },
//     ],
//   },
// ];
