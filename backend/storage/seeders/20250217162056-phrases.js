'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('phrases', [
      {
        phrase: "Siempre parece imposible hasta que se hace.",
        author: "Nelson Mandela",
      },
      {
        phrase: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
        author: "Robert Collier",
      },
      {
        phrase: "No cuentes los días, haz que los días cuenten.",
        author: "Muhammad Ali",
      },
      {
        phrase: "La educación es el arma más poderosa que puedes usar para cambiar el mundo.",
        author: "Nelson Mandela",
      },
      {
        phrase: "No hay atajos para cualquier lugar que valga la pena.",
        author: "Beverly Sills",
      },
      {
        phrase: "No te compares con los demás. Compara tu hoy con tu ayer.",
        author: "Anónimo",
      },
      {
        phrase: "El fracaso es simplemente la oportunidad de comenzar de nuevo, esta vez de manera más inteligente.",
        author: "Henry Ford",
      },
      {
        phrase: "Cree en ti mismo y todo será posible.",
        author: "Anónimo",
      },
      {
        phrase: "No te detengas cuando estés cansado, detente cuando hayas terminado.",
        author: "Anónimo",
      },
      {
        phrase: "La motivación nos impulsa a comenzar y el hábito nos permite continuar.",
        author: "Jim Ryun",
      },
      {
        phrase: "Nunca dejes que el miedo decida tu futuro.",
        author: "Anónimo",
      },
      {
        phrase: "El conocimiento es poder.",
        author: "Francis Bacon",
      },
      {
        phrase: "No busques excusas, busca resultados.",
        author: "Anónimo",
      },
      {
        phrase: "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
        author: "Vidal Sassoon",
      },
      {
        phrase: "Haz de cada día tu obra maestra.",
        author: "John Wooden",
      },
      {
        phrase: "Aprender nunca agota la mente.",
        author: "Leonardo da Vinci",
      },
      {
        phrase: "No dejes que lo que no puedes hacer interfiera con lo que puedes hacer.",
        author: "John Wooden",
      },
      {
        phrase: "Cada logro comienza con la decisión de intentarlo.",
        author: "Gail Devers",
      },
      {
        phrase: "Persiste. Si todo fuera fácil, cualquiera lo haría.",
        author: "Anónimo",
      },
      {
        phrase: "El secreto para salir adelante es comenzar.",
        author: "Mark Twain",
      },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('phrases', null, {});
  }
};
