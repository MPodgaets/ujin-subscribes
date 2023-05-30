export default class SwapiService { 
    _subscribes = [
      {
        id: 1,
        name: 'Видеонаблюдение в подъезде',
        price: 1,
        description: 'Видеопоток с камеры, установленной на первом этаже у лифта'
      },
      {
        id: 2,
        name: 'Видеонаблюдение на паркинге',
        price: 10,
        description: 'Видеопоток с камеры, установленной на парковке.'
      },
      {
        id: 3,
        name: 'Оповещение об отключениях',
        price: 0,
        description: 'ЖК присылает сообщения на электронную почту жильца сообщения об отключении электричества, холодной или горячей воды.'
      },
      {
        id: 4,
        name: 'Видеонаблюдение во дворе',
        price: 20,
        description: 'Видеопоток с 2-х камер, установленных во дворе дома.'
      }
    ];

    _people = [
      {
        id: 1,
        firstname: 'Иван',
        middlename: 'Петрович',
        lastname: 'Иванов',
        email: 'ivanov_i_i@mail.ru',
        password: 'ivanov'
      },
      {
        id: 2,
        firstname: 'Петр',
        middlename: 'Сидорович',
        lastname: 'Петров',
        email: 'petrov_p_p@mail.ru',
        password: 'petrov'
      },
      {
        id: 3,
        firstname: 'Иван',
        middlename: 'Петрович',
        lastname: 'Сидоров',
        email: 'sidorov_i_p@mail.ru',
        password: 'sidorov'
      },
      {
        id: 4,
        firstname: 'Елена',
        middlename: 'Александровна',
        lastname: 'Саввина',
        email: 'savvina_e_a@mail.ru',
        password: 'savvina'
      },
      {
        id: 5,
        firstname: 'Нина',
        middlename: 'Петровна',
        lastname: 'Иванова',
        email: 'ivanova_n_p@mail.ru',
        password: 'ivanova'
      }
    ];

    _people_subscribes = [
      {
        personId: 1,
        subscribes: [
          {
            id: 1,
            on: false,
            paid: false
          },
          {
            id: 2,
            on: false,
            paid: false
          },
          {
            id: 3,
            on: true,
            paid: false
          },
          {
            id: 4,
            on: false,
            paid: false
          }
        ] 
      },
      {
        personId: 2,
        subscribes: [
          {
            id: 1,
            on: false,
            paid: true
          },
          {
            id: 2,
            on: true,
            paid: true
          },
          {
            id: 3,
            on: true,
            paid: true
          },
          {
            id: 4,
            on: false,
            paid: false
          }
        ]
      },
      {
        personId: 3,
        subscribes: [
          {
            id: 1,
            on: true,
            paid: true
          },
          {
            id: 2,
            on: false,
            paid: false
          },
          {
            id: 3,
            on: true,
            paid: true
          },
          {
            id: 4,
            on: false,
            paid: false
          }
        ]
      },
      {
        personId: 4,
        subscribes: [
          {
            id: 1,
            on: true,
            paid: true
          },
          {
            id: 2,
            on: true,
            paid: false
          },
          {
            id: 3,
            on: false,
            paid: true
          },
          {
            id: 4,
            on: false,
            paid: false
          }
        ]
      },
      {
        personId: 5,
        subscribes: [
          {
            id: 1,
            on: false,
            paid: true
          },
          {
            id: 2,
            on: true,
            paid: true
          },
          {
            id: 3,
            on: false,
            paid: true
          },
          {
            id: 4,
            on: true,
            paid: false
          }
        ]
      }
    ];

  //список подписок пользователя
    getPersonSubscribes = async (person) => {
      const personSubscribes = this._people_subscribes.find(
        (item, index) => item.personId === person.id);
       const {subscribes} = personSubscribes;
      return subscribes.map((item) => {
        const subscribe = this._subscribes.find(elem => elem.id === item.id);
        const {name} = subscribe;
        return {name, ...item};  
      }); 
    };

    //детальное описание подписки
    getDetailSubsrcibe = async (id, person) => {
      const subscribe_detail = this._subscribes.find(item => item.id === id);
      const indexPerson = this._people_subscribes.find(
        item => item.personId === person.id);
      const subscribe = indexPerson.subscribes.find(item => item.id === id);
      const {on, paid} = subscribe;
      const data = {on: on, paid: paid, ...subscribe_detail};
      return data;
    };

    getPersonByLoginPassword = async (login, password) => {
      const person = this._people.find(item => item.email === login);
      if ((person !== undefined) && (person.password === password)) {
        return person;
      }
      else {
        return null;
      }
    };

    getSubscribeBlob = ({id}) => {
      const subscribe_detail = this._subscribes.find(item => item.id === id);
      return subscribe_detail.description;
    };

    //Сохранить характеристики подписки
    saveSubscribe = async (person, data) => {
      //Получим индекс подписок пользователя
      const indexPerson = this._people_subscribes.find(
        item => item.personId === person.id);
      //Получим индекс подписки в массиве подписок пользователя  
      const indexSubscribe = indexPerson.subscribes.findIndex(item => item.id === data.id);
      console.log('id:', data.id, 'save indexSubscribe:', indexSubscribe);
      //Запишем изменения
      indexPerson.subscribes[indexSubscribe].paid = data.paid;
      indexPerson.subscribes[indexSubscribe].on = data.on;
      console.log('indexPerson: ', indexPerson);
    };

    //Оплатить подписку
    payPersonSubscribe = async (person, idSubscribe) => {
      //Получим индекс подписок пользователя
      const indexPerson = this._people_subscribes.find(
        item => item.personId === person.id);
      //Получим индекс подписки в массиве подписок пользователя  
      const indexSubscribe = indexPerson.subscribes.findIndex(item => item.id === idSubscribe);
      //Запишем оплату  
      indexPerson.subscribes[indexSubscribe].paid = true;
    };
    
  }
  