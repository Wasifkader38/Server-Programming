const MathOlympiad=require("../models/MathOlympiad.model")

const getMO=(req,res)=>{
    res.render("math-olympiad/register.ejs");
}

const postMO=(req,res)=>{
    res.render("math-olympiad/register.ejs");
}

const getMOList=(req,res)=>{
    res.render("math-olympiad/register.ejs");
}

const deleteMO=(req,res)=>{
    const id=req.params.id;
    console.log(id);
    res.render("math-olympiad/register.ejs");
}

module.exports={getMO, postMO, getMOList, deleteMO};