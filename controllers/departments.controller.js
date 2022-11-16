const Department = require('../models/department.model');


exports.getAll = async (req, res) => {
    try{
      res.json( await Department.find());
    }
    catch(err) {
      res.status(500).json({message: err})
    }
};

exports.random = async (req, res) => {
    try{
      const count = await Department.countDocuments();
      const rand = Math.floor(Math.random() * count)
      const dep = await Department.findOne().skip(rand);
      if(!dep) res.status(404).json({message: 'Not Found'})
    }
    catch(err){
      res.status(500).json({message: err});
    }
};

exports.getId = async(req, res) => {
    try{
        const dep = await Department.findById(req.params.id)
        if(!dep) res.status(404).json({message: 'Not Found'})
    }
    catch(err){
        res.status(500).json({message: err});
    }
};

exports.post = async (req, res) => {
    try{
      const count = await Department.countDocuments();
      const { name } = req.body;
      const newDepartment = new Department({name: name});
      await newDepartment.save();
      res.json(await Department.findOne().skip(count));
  
    }catch(err) {
      res.status(500).json({message: err})
    }
};

exports.putId = async (req, res) => {
  
    const { name } = req.body;
    
    try{
      const dep = await Department.findById(req.params.id);
      if(dep){
        await Department.updateOne({_id: req.params.id}, {$set: {name: name}});
        res.json({message: 'ok'});
      }
      else res.status(404).json({message: 'not found...'})
    }
    catch(err) {
      res.status(500).json({message: 'err'});
    }
};

exports.delete = async (req, res) => {

    try{
      const dep = await Department.findById(req.params.id);
      if(dep) {
        await Department.deleteOne({_id: req.params.id});
        res.json(await Department.find())
      }
      else res.status(404).json({message: 'Not found...'});
    }
    catch(err){
      res.status(500).json({message: err})
    }
};
  