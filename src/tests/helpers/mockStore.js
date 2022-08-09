export const storeLogin = {
  loginReducer: {
    name: 'Person Name',
    assertions: 0,
    gravatarEmail: 'test@email.com',
  },
};

export const storePlayer = {
  player: {
    assertions: 0,
    score: 0,
    requestAPI: false,
    questions: [
      {
        category: 'Geography',
        type: 'multiple',
        difficulty: 'medium',
        question: 'Which European city has the highest mileage of canals in the world?',
        correct_answer: 'Birmingham',
        incorrect_answers: [
          'Venice',
          'Amsterdam',
          'Berlin',
        ],
      },
      {
        category: 'Entertainment: Video Games',
        type: 'multiple',
        difficulty: 'medium',
        question: 'How many different notes is the tune, &quot;Song of Healing&quot;, comprised of in &quot;The Legend of Zelda: Majora&#039;s Mask&quot;?',
        correct_answer: '3',
        incorrect_answers: [
          '4',
          '1',
          '6',
        ],
      },
      {
        category: 'History',
        type: 'multiple',
        difficulty: 'hard',
        question: 'What was the original name of New York City?',
        correct_answer: 'New Amsterdam',
        incorrect_answers: [
          'New London',
          'New Paris',
          'New Rome',
        ],
      },
      {
        category: 'Geography',
        type: 'multiple',
        difficulty: 'hard',
        question: 'What is the capital of Wisconsin, USA?',
        correct_answer: 'Madison',
        incorrect_answers: [
          'Milwaukee',
          'Wisconsin Dells',
          'Green Bay',
        ],
      },
      {
        category: 'Animals',
        type: 'multiple',
        difficulty: 'hard',
        question: 'To which biological phylum do all mammals, birds and reptiles belong?',
        correct_answer: 'Chordata',
        incorrect_answers: [
          'Echinodermata',
          'Annelida',
          'Placazoa',
        ],
      },
    ],
    randomArray: [
      [
        'Amsterdam',
        'Venice',
        'Birmingham',
        'Berlin',
      ],
      [
        '3',
        '6',
        '1',
        '4',
      ],
      [
        'New London',
        'New Paris',
        'New Rome',
        'New Amsterdam',
      ],
      [
        'Green Bay',
        'Madison',
        'Wisconsin Dells',
        'Milwaukee',
      ],
      [
        'Annelida',
        'Placazoa',
        'Echinodermata',
        'Chordata',
      ],
    ],
    requestState: 0,
  },
};

export const storeError = {
  player: {
    requestState: 0,
  },
};
