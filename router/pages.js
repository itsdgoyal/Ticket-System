const router = require('express').Router()
const Entrydata = require('../models/entrydata')

router.get('/',(req,res)=>{
    res.render('home.ejs')
})

router.post('/entrydata',async(req,res)=>{
    const vehicleno = req.body.vehicleno
    const vehicletype = req.body.vehicletype
    const entrytime = req.body.time
    const exittime = 0
    const amount = 0
    const status = 'entrytaken'
    const entryrecord = new Entrydata({vehicleno:vehicleno,vehicletype:vehicletype,entrytime:entrytime,exittime:exittime,amount:amount,status:status})
    
    await entryrecord.save()
    console.log(entryrecord)
    res.redirect('/database')
    
})

router.get('/database',async(req,res)=>{
    const entrydata = await Entrydata.find()
    res.render('entrydata.ejs',{entrydata:entrydata})
})

router.get('/update/:id',async(req,res)=>{
    const id = req.params.id
    const xyz = await Entrydata.findById(id)
    res.render('update.ejs',{xyz:xyz})
})

router.post('/update/:id',async(req,res)=>{
    const exittime = Number(req.body.exittime)
    const id = req.params.id
    const status = 'Exit'
    const data = await Entrydata.findById(id)
    //console.log(data)
    let amount = 0
    console.log(typeof(exittime))
    if(data.vehicletype == 'car'){
        let enter = Number(data.entrytime)
        let totaltime = exittime-enter
        //console.log(totaltime)
        amount += (totaltime*20)
        console.log(amount)
    }else if(data.vehicletype == 'bike'){
        let enter = Number(data.entrytime)
        let totaltime = exittime-enter
        //console.log(totaltime)
        amount += (totaltime*10)
        console.log(amount)
    }else if(data.vehicletype == 'auto'){
        let enter = Number(data.entrytime)
        let totaltime = exittime-enter
        //console.log(totaltime)
        amount += (totaltime*15)
        console.log(amount)
    }
    await Entrydata.findByIdAndUpdate(id,{vehicleno:data.vehicleno,vehicletype:data.vehicletype,entrytime:data.entrytime,exittime:exittime,amount:amount,status:status})
    res.redirect('/database')
})


module.exports = router