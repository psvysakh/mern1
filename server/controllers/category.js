
const Category=require('../models/category');

exports.categoryById = async (req,res,next,id)=>{
   try{
    const category=await Category.findById(id);
    req.category=category;
    next();
   }catch(error){
       error.msg=`Category Not found`;
    return res.status(400).json({
        error:error
    });
   }
}

exports.read=(req,res,next)=>{
    const category = req.category;
    return res.status(200).json(category);

}

exports.create =async (req,res,next)=>{
    console.log(`I GOT RENDERED`,req.body);
   try{
        const category = new Category(req.body);
        const data = await category.save();
        res.status(200).json({message:`${data.name} is created`});
   }catch(error){
    return res.status(400).json({error:"Category Should be unique"});
   }
}
exports.remove = async (req,res,next)=>{
   try{
    const category = req.category;
    await category.remove();
    res.status(200).json({message:"Category Removed"});
   }catch(error){
    return res.status(400).json({error:error})
   }
}
exports.update = async (req,res,next)=>{
    try{
        const category = req.category;
        category.name = req.body.name;
        const updatedCategory=await category.save();
        return res.status(200).json({updatedCategory,message:"Category Updated"});
    }catch(error){
        return res.status(400).json({error:error})
    }
}
exports.list =async (req,res,next)=>{
    try{
        const data=await Category.find();
        console.log(data);
            return res.status(200).json({categories:data});
        
    }catch(error){
        return res.status(400).json({error:error})
    }
}