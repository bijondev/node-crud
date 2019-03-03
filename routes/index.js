module.exports = {

    getHomePage: (req, res) => {
        let query = "SELECT * FROM `contacts` ORDER BY id ASC"; // query database to get all the players
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs',{
              contacts:result, title: 'My Frist CRUD'
            });
        });
    },
    getAddPage: (req, res)=>{
      res.render('add-contacts.ejs', {
            title: 'My Frist CRUD | Add a new Contacts'
            ,message: ''
        });
    },
    SaveContacts: (req, res)=>{
      let message = '';
        let name = req.body.name;
        let number = req.body.number;
        let notes = req.body.notes;

        let query = "INSERT INTO `contacts` (name, number, notes) VALUES ('" +name + "', '" + number + "', '" + notes + "')";
          db.query(query, (err, result) => {
              if (err) {
                  return res.status(500).send(err);
              }
              res.redirect('/');
          });
    },
    // deleteContacts
    deleteContacts: (req, res) => {
        let contactsId = req.params.id;
          let deleteUserQuery = 'DELETE FROM contacts WHERE id = "' + contactsId + '"';
          db.query(deleteUserQuery, (err, result) => {
              if (err) {
                  return res.status(500).send(err);
              }
              res.redirect('/');
          });
    },
    // editContacts
    editContacts: (req, res)=>{
      let contactsId = req.params.id;
      let query = 'SELECT * FROM `contacts` where id = "'+contactsId+'"';
      // execute query
      db.query(query, (err, result) => {
          if (err) {
              res.redirect('/');
          }
          res.render('edit-contact.ejs',{
            contact:result, title: 'My Frist CRUD || Edit Contact', message: ''
          });
      });
    },
    // updateContacts
    updateContacts: (req, res) => {
        let contactsId = req.params.id;
        let message = '';
          let name = req.body.name;
          let number = req.body.number;
          let notes = req.body.notes;

          let query = "UPDATE `contacts` SET `name` = '"+name+"', `number` = '"+number+"', `notes` = '"+number+"' WHERE `contacts`.`id` = '"+contactsId+"'";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });
    },
};
