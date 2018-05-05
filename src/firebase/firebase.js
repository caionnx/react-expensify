import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();

export {firebase, database as default}
/*
db.ref('expenses').on('child_changed', snapshot => {
    console.log(snapshot.key, snapshot.val());
});


db.ref('expenses').on('value', snapshot => {
    const expenses = [];
    snapshot.forEach(element => {
        expenses.push({
            id: element.key,
            ...element.val()
        });
    });
    console.log(expenses);
});


db.ref('expenses')
    .once('value')
    .then(snapshot => {
        const expenses = [];
        snapshot.forEach(element => {
            expenses.push({
                id: element.key,
                ...element.val()
            });
        });
        console.log(expenses);
    })


db.ref('expenses').push({
    description: 'Play',
    amount: 4574985,
    note: 'Exactly like that',
    createdAt: 115484
});


const onValueChange = db.ref().on('value', snapshot => {
    const data = snapshot.val();
    console.log(`${data.name} lives in ${data.location.city} and ${data.isSingle ? 'is': `it's not`} single`);
});

db.ref().on('value', (snapshot) => {
    console.log(snapshot.val());
});

setTimeout(() => {
    db.ref('age').set(55);
}, 4000);

db.ref('location')
    .once('value')
    .then((snapshot) => {
        console.log(snapshot.val());
    })
    .catch(err => {
        console.log(err);
    })

db.ref().set({
    name: 'Caio Nunes',
    age: 22,
    isSingle: false,
    location: {
        city: 'H',
        country: 'G'
    },
    attributes: {
        height: 1548,
        weight: 4447445
    }
}).then(() => {
    console.log('Data was saved')
}).catch((error) => {
    console.log(error);
});

db.ref().update({
    name: 'Opa',
    age: 88
});

/*db.ref('isSingle')
    .remove()
    .then(() => console.log('isSingleRemoved'))
    .catch((e) => console.log('could not remove'));
*/

