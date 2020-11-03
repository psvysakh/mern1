


exports.secret=async (req,res,next)=>{
    console.log("Managed to reach here");
    res.status(200).json({data:"Server Data Loading Finished!!!"});
    }