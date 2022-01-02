let Userdb = require('../model/model');


// create...


exports.create = (req, res) => {

// is request valid?
if(!req.body)
{
    res.status(400).send({message: "Cant be empty!"});
    return;
    }
// creating an instance of Userdb model
const user = new Userdb({

    name:req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status 
})

// saving user
    user
    .save(user)
    .then(data=> {
        res.redirect('/add_user')

    })
    .catch(err =>{
        res.status(500).send({
            message: err.message || "Error occured "
        });
    });

}




// return users/user

exports.find = (req,res) => {

    if(req.query.id)
    {
        const id = req.query.id;
        Userdb.findById(id)
        .then(data => {
            if(!data)
            {
                res.status(404).send({message: err.message || "Cant find user with tht id"});
            }
            else
            {
                res.send(data)
            }
        })
            .catch(err=>{
                res.status(500).send({message: "Cant find a user with that id"});
            })

    }else{
    Userdb.find()
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        res.status(500).send({message: err.message || "Error ocurred"})
    })
}
}
// update 

exports.update = (req,res) => {
if(!req.body){
    return res
    .status(400)
    .send({message: "Desired data to updated cannot be empty"})
}


const id = req.params.id;
Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify: false})
    .then(data =>{
        if(!data)
        {
            res.status(404).send({message: `Cannot find user with ${id}`});
        }
        else{
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({message: "Error ocured,please try again later"});

    })

}




//delet
exports.delete = (req,res) => {
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({message: `Cant delete user with ${id}, maybe he is already deleted`});
            }
        else {
            res.send({
                message: "Deleted succesfuly"
            })
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Cannot delete user with id` + id"
            });
        });
}