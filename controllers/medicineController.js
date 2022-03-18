const {validationResult} = require('express-validator');
const medicine = require('../models/medicineSchema');

exports.getAllMedicine = (req,res,next)=>{
    medicine.find({}).then(data=>{
        res.status(200).json(data)
    }).catch(err=>{
        next(err);
    })
}


exports.createMedicine = (req,res,next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        let error = new Error();
        error.status = 422;
        error.message = errors
        .array()
        .reduce((current, object) => current + object.msg + " ", "");
        next(error);
    }
    let newMedicine = new medicine({
        name:req.body.name,
        company:req.body.company,
        description:req.body.description,
        quantity:req.body.quantity,
        category:req.body.category,
        rate:req.body.rate,
        customers:req.body.customers
    })

    newMedicine.save().then(data=>{
        res.status(201).json(data);
    }).catch(err=>next(err));
}

exports.updateMedicine = (req,res,next) =>{
    medicine.findByIdAndUpdate(
        req.params.medicineId,
        {
            $set:{
                name:req.body.name,
                company:req.body.company,
                description:req.body.description,
                quantity:req.body.quantity,
                category:req.body.category,
                rate:req.body.rate,
                customers:req.body.customers
            }
        },
        { new: true }
    ).then(data=>{
        if(data==null) throw new Error("Medicine Is not Found!")
        res.status(200).json(data)
    }).catch(err=>next(err))
}


exports.deleteMedicine = (req,res,next) =>{
    medicine.findByIdAndRemove(req.params.medicineId).then(data=>{
        res.status(201).json(data)
    }).catch(err=>next(err));
}


exports.addMedicineFeedback = (req,res,next)=>{
    let currentRate;
    medicine.findById(req.params.medicineId).then(data=>{
        medicine.findByIdAndUpdate(
            req.params.medicineId,
            {
                $set:{
                    rate:(req.body.rate + data.rate)
                }
            },
            {new:true}
        ).then(data=>{
            res.status(200).json(data)
        }).catch(err=>next(err))
    })

}