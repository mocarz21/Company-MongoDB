const Product = require('../models/product.model');

exports.getAll = async (req, res) => {
    try{
      res.json( await Product.find());
    }
    catch(err) {
      res.status(500).json({message: err})
    }

  //          MONGO DB             //
  // req.db.collection('products').find().toArray((err, data)=>{
  //   if(err) res.status(500).json({message: err})
  //   else res.json(data)
  // })
};

exports.random =async (req, res) => {
    try{
      const count = await Product.countDocuments();
      const rand = Math.floor(Math.random() * count)
      const dep = await Product.findOne().skip(rand);
      if(!dep) res.status(404).json({message: 'Not Found'})
    }
    catch(err){
      res.status(500).json({message: err});
    }
  
    //          MONGO DB             //
    // req.db.collecion('products').aggregate([{$sample: {size: 1}}]).toArray((err, data) =>{
    //   if(err) res.status(500).json({message: err})
    //   else res.json(data)
    // })
};

exports.getId = async (req, res) => {
    try{
      const dep = await Product.findById(req.params.id)
      if(!dep) res.status(404).json({message: 'Not Found'})
    }
    catch(err){
      res.status(500).json({message: err});
    }
  
    //          MONGO DB             //
    // req.db.collection('products').findOne({_id: ObjectId(req.params.id)}, (err, data)=>{
    //   if(err) res.status(500).json({message:  err})
    //   else res.json(data)
    // })
};

exports.post = async (req, res) => {
    try{
      const { name, client } = req.body;
      const newProduct = new Product({name: name, client: client});
      await newProduct.save();
      res.json({message:'ok'});
  
    }catch(err) {
      res.status(500).json({message: err})
    }
  
    //          MONGO DB             //
    // const {name, client} = req.body
    // req.db.collection('products').insertOne({ name: name, client: client }, err => {
    //   if (err) res.status(500).json({ message: err })
    //   else res.json({ message: 'OK' });
    // })
};

exports.putId = async (req, res) => {
    const { name, client } = req.body;

    try{
      const dep = await Product.findById(req.params.id);
      if(dep){
        await Product.updateOne({_id: req.params.id}, {$set: {name: name, client: client}});
        res.json({message: 'ok'});
      }
      else res.status(404).json({message: 'not found...'})
    }
    catch(err) {
      res.status(500).json({message: 'err'});
    }
  
    //          MONGO DB             //
    // const {name, client} = req.body
    // req.db.collection('products').updateOne({_id: ObjectId(req.params.id)},{$set:{name: name, client:client}}, err=>{
    //   if(err) res.status(500).json({message: err})
    //   else res.json({message: 'ok'})
    // })
};

exports.delete = async (req, res) => {
    try{
      const dep = await Product.findById(req.params.id);
      if(dep) {
        await Product.deleteOne({_id: req.params.id});
        res.json({message: 'ok'})
      }
      else res.status(404).json({message: 'Not found...'});
    }
    catch(err){
      res.status(500).json({message: err})
    }
  
    //          MONGO DB             //
    // req.db.collection('products').deleteOne({_id: ObjectId(req.params.id)},err =>{
    //   if(err) res.status(500).json({message:err});
    //   else res.json({message: 'ok'});
    // })
};

