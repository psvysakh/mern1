const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const Product=require('../models/product');


exports.productById = async (req,res,next,id)=>{
    try{
        const product=await Product.findById(id);
        req.product=product;
        next();
    }catch(error){
        error.msg="Product not found"
        return res.status(400).json({
            error:"Product not found"
        });
    }
}

exports.read=(req,res,next)=>{
    req.product.photo = undefined;
    return res.status(200).json(req.product);
}
 
exports.create = (req,res,next)=>{
   let form = new formidable.IncomingForm();
   form.keepExtensions=true;
   form.parse(req,(err,fields,files)=>{
       if(err){
           return res.status(400).json({error:'Image could not upload'})
       }
      
       let product = new Product(fields);
       if(files.photo){
           if(files.photo.size > 1000000){
            return res.status(400).json({error:'Image should be less than 1mb'})
           }
       }

       if(files.photo){
           product.photo.data=fs.readFileSync(files.photo.path);
           product.photo.contentType=files.photo.type;
       }
       product.save((err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        res.status(200).json({result});
    })
   });
   
}

exports.remove =async (req,res,next)=>{
  try{
    let product = req.product;
    await product.remove();
    res.status(200).json({message:"Product Deleted"});
  }catch(error){
    return res.status(400).json({error:err})
  }
}

exports.update = (req,res,next)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({error:'Image could not upload'})
        }
       
        let product = req.product;
        product=_.extend(product,fields);
        if(files.photo){
            if(files.photo.size > 1000000){
             return res.status(400).json({error:'Image should be less than 1mb'})
            }
        }
 
        if(files.photo){
            product.photo.data=fs.readFileSync(files.photo.path);
            product.photo.contentType=files.photo.type;
        }
        product.save((err,result)=>{
         if(err){
             return res.status(400).json({error:err})
         }
         res.status(200).json({result});
     })
    });
}

// Sold - > list?order=desc&sortBy=sold&limit=2
// Arrival - > list?order=desc&sortBy=createdAt&limit=2

exports.list = async(req,res,next)=>{
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit= req.query.limit ? +req.query.limit : 6;
    console.log(order,sortBy,typeof(limit));
    try{
       const product= await Product.find()
        .select("-photo")
        .populate('category')
        .sort([[sortBy,order]])
        .limit(limit);
        res.status(200).json(product);
    }catch(err){
        res.status(400).json({error:err});
    }
}

exports.listRelated = (req,res)=>{
    let limit= req.query.limit ? +req.query.limit : 6;
    Product.find({_id:{$ne:req.product},category:req.product.category})
    .limit(limit)
    .populate('category','_id,name')
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({error:err});
        }
        res.status(200).json(product);
    });
   
}

exports.listBySearch = async(req, res, next) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    try{
        for (let key in req.body.filters) {
            if (req.body.filters[key].length > 0) {
                if (key === "price") {
                  
                    findArgs[key] = {
                        $gte: req.body.filters[key][0],
                        $lte: req.body.filters[key][1]
                    };
                } else {
                    findArgs[key] = req.body.filters[key];
                }
            }
        }
    
        const data = await Product.find(findArgs)
            .select("-photo")
            .populate("category")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit);
        res.status(200).json({size: data.length,data});
           
    }catch(error){
        return res.status(400).json({
            error: "Products not found"
        });
    }
    
};

exports.photo = (req,res,next)=>{
    if(req.product.photo.data){
        res.set('Content-Type',req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
}