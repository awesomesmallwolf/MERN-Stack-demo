require('dotenv').config();
const {MongoClient} = require('mongodb');

jest.setTimeout(8000)

describe('insert', () => {
    
    const connString = process.env.DB_CONN_STRING;
    let connection;
    let db;
  
    beforeAll(async () => {
        connection = await MongoClient.connect(connString, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        db = await connection.db();
        db.collection('airlines').deleteMany({});
    });

    afterAll(async () => {
      await connection.close();
    });
  
    it('should insert a doc into collection', async () => {
      const airlines = db.collection('airlines');
  
      await airlines.insertOne({
          _id: false,
          id:2,
          name:'interject'
      });

      const insertedAirline = await airlines.findOne({id:2});
      expect(insertedAirline.name).toEqual('interject');
    });
  });