function toTitleCase(s) {
    var result = s.replace( /([A-Z])/g, " $1" );
    var finalResult = result.charAt(0).toUpperCase() + result.slice(1); 
    return finalResult;
}
function calculate_age(d) { 
    var dob = new Date(d);
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function getQuant(val) {
    switch (val) {
        case 'rarely': return 'low';
        case '1-2': return 'medium';
        case '3+': return 'high';

        case 'rarely': return 'low';
        case '0-5 unit': return 'medium';
        case '6-10 unit': return 'high';
        case '10+ unit': return 'drunk';

        default: return 'low';
    }
}

function createPayload(data) {

    var payload = {
        "goals": [],
        "goalBones": {
            "osteoarthritis": false,
            "osteoporosis": false,
            "tendonitis": false,
            "arthritis": false
        },
        "goalBrain": {
            "shortTermMemoryLoass": false,
            "troubleMultiFocusing": false,
            "troubleMultiTasking": false
        },
        "goalDigestive": {
            "acidReflux": false,
            "heartBurn": false,
            "indigestion": false
        },
        "goalEnergy": {
            "burnedOutFeeling": false,
            "sleepingTrouble": false
        },
        "goalHeart": {
            "familyHistory": false,
            "highBP": false,
            "highCholesterol": false
        },
        "goalImmunity": {
            "illFrequency": 0
        },
        "goalSkin": {
            "aeging": false,
            "drySkin": false,
            "wrinkles": false
        },
        "goalStress": {
            "stressfulLife": false
        },
        "lifestyle": {
            "allergies": [],
            "computerScreen": false,
            "dairyPerWeek": "",
            "drinkPerWeek": "",
            "dryEyes": false,
            "exercisePerWeek": "",
            "fishPerWeek": "",
            "meatPerWeek": "",
            "smoke": false,
            "soreMusclesPostExercise": false,
            "specialDiets": []
        },
        "personalInfo": {
            "height": 1,
            "weight": 1,
            "age": 1,
            "sex": ""
        },
        "primaryGoal": "",
        "primaryGoalWeight": 5
    };

    /**
     * Process Data
     */

    /**
     * Goals
     */
    payload.goals = _.map(data.goals, (val) => {
        return val.toLowerCase();
    });

    /**
     * Bones
     */
    payload.goalBones = {
        osteoarthritis: data.osteoporosisOsteoarthritis ? _.includes(data.osteoporosisOsteoarthritis, 'osteoarthritis') : false,
        osteoporosis: data.osteoporosisOsteoarthritis ? _.includes(data.osteoporosisOsteoarthritis, 'osteoporosis') : false,
        tendonitis: data.tendonitis ? data.tendonitis.toLowerCase() === 'yes' : false,
        arthritis: data.arthritis ? data.arthritis.toLowerCase() === 'yes' : false
    };

    /**
     * Brain
     */
    payload.goalBrain = {
        shortTermMemoryLoass: data.shortTermMemoryLoss ? data.shortTermMemoryLoss.toLowerCase() === 'yes' : false,
        troubleMultiFocusing: data.troubleMultiTaskingFocusing ? _.includes(data.troubleMultiTaskingFocusing, 'focusing') : false,
        troubleMultiTasking: data.troubleMultiTaskingFocusing ? _.includes(data.troubleMultiTaskingFocusing, 'multitasking') : false,
    };

    /**
     * Digestive System
     */
    payload.goalDigestive = {
        acidReflux: data.digestiveConcerns ? _.includes(data.digestiveConcerns, 'acidReflux') : false,
        heartBurn: data.digestiveConcerns ? _.includes(data.digestiveConcerns, 'heartburn') : false,
        indigestion: data.digestiveConcerns ? _.includes(data.digestiveConcerns, 'indigestion') : false,
    };

    /**
     * Energy
     */
    payload.goalEnergy = {
        burnedOutFeeling: data.burnedOutFeeling ? data.burnedOutFeeling.toLowerCase() === 'yes' : false,
        sleepingTrouble: data.sleepingTrouble ? data.sleepingTrouble.toLowerCase() === 'yes' : false,
    };

    /**
     * Heart
     */
    payload.goalHeart = {
        familyHistory: data.familyHistory ? data.familyHistory.toLowerCase() === 'yes' : false,
        highBP: data.highBPhighCalestrol ? _.includes(data.highBPhighCalestrol, 'highBloodPressure') : false,
        highCholesterol: data.highBPhighCalestrol ? _.includes(data.highBPhighCalestrol, 'highCholesterol') : false
    };

    /**
     * Immunity
     */
    payload.goalImmunity = {
        illFrequency: data.illFrequency ? data.illFrequency : 0
    };

    /**
     * Skin
     */
    payload.goalSkin = {
        aeging: data.skinConcerns ? _.includes(data.skinConcerns, 'generalAging') : false,
        drySkin: data.skinConcerns ? _.includes(data.skinConcerns, 'drySkin') : false,
        wrinkles: data.skinConcerns ? _.includes(data.skinConcerns, 'wrinkles') : false
    };

    /**
     * Stress
     */
    payload.goalStress = {
        stressfulLife: data.stressConcerns ? data.stressConcerns.toLowerCase() === 'yes' : false,
    };

    /**
     * Lifestyle
     */
    payload.lifestyle = {
        allergies: data.allergies ? data.allergies.map((val) => {return val.toLowerCase();}) : [],
        computerScreen: data.computerScreen ? data.computerScreen.toLowerCase() === 'yes' : false,
        dairyPerWeek: data.dairyPerWeek ? getQuant(data.dairyPerWeek) : 'low',
        drinkPerWeek: data.drinkPerWeek ? getQuant(data.drinkPerWeek) : 'low',
        dryEyes: data.dryEyes ? data.dryEyes === 'sometimes' || data.dryEyes === 'often' : false,
        exercisePerWeek: data.exercisePerWeek ? getQuant(data.exercisePerWeek) : 'low',
        fishPerWeek: data.fishPerWeek ? getQuant(data.fishPerWeek) : 'low',
        meatPerWeek: data.meatPerWeek ? getQuant(data.meatPerWeek) : 'low',
        smoke: data.smoke ? data.smoke.toLowerCase() === 'yes' : false,
        soreMusclesPostExercise: false,
        specialDiets: data.specialDiets ? data.specialDiets.map((val) => {return val.toLowerCase();}) : []
    };

    /**
     * Personal Info
     */
    payload.personalInfo = {
        age: data.age ? data.age : 1,
        height: data.height ? data.height : 1,
        name: data.name ? data.name : '',
        email: data.email ? data.email : '',
        sex: data.gender ? data.gender.toLowerCase() : 'male',
        weight: data.weight ? data.weight : 1,
        pregStatus: data.current_status ? data.current_status.toLowerCase() : 'none',
    };

    /**
     * Primary Goal
     */
    payload.primaryGoal = data.primaryGoal ? data.primaryGoal : null;
    console.log('final output', payload);
    return JSON.stringify(payload);

}
export const assessmentInit = function() {
    jQuery(document).on('keypress','.form-html', function(e) {
        // var tag = e.target.tagName.toLowerCase();
        if ( event.key === "Enter") 
            jQuery("#nextBtn").click();
    });
    jQuery(document).on('submit','#regForm',function(event){
        event.preventDefault();
        jQuery("#nextBtn").click();
    });
    jQuery('body').on('change', '.form-html input[type="checkbox"]', function() {
        jQuery(".form-html input[type='checkbox']:checked").each(function (){
            if (jQuery(this).val() === 'none') {
                jQuery(".form-html input[type='checkbox']:checked").each(function (){
                    if (jQuery(this).val() !== 'none') {
                        jQuery(this).prop("checked", false);
                    }
                });
            }
            // jQuery(this).prop("checked", false);
        });
    });
    
    window.addProduct = (product) => {
        return new Promise((resolve, reject) => {
            const {
                id: product_id,
                quantity
            } = product;
            jQuery.post("/?wc-ajax=add_to_cart", {
                product_id,
                quantity
            }, (data, status) => {
                if (status === 'error') {
                    reject();
                    return;
                }
                resolve(data);
                console.log("Data: " + data + "\nStatus: " + status);
            });
        });
    }


    window.add_product = function (product_id, quantity) {
        jQuery.post("/?wc-ajax=add_to_cart",
        {product_id: product_id,
                quantity: quantity},
        function(data, status){
            console.log("Data: " + data + "\nStatus: " + status);
        });
    }

     var currentTab = 0;
     var finalOutput = {};
     var userFlow = [];
     var formConfig = [
         {
             label: 'Full Name',
             inputType: 'text',
             nextConfig: 1,
             previousConfig: null,
             placeholder: 'Enter name...',
             inputName : 'name',
             inputGroup : 'personalInfo'
         },{
             label: 'Email',
             inputType: 'email',
             nextConfig: 3,
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Enter email...',
             inputName : 'email',
             inputGroup : 'personalInfo'
         },{
             label: 'Password',
             inputType: 'password',
             nextConfig: 3,
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Enter password',
             inputName : 'password',
             inputGroup : 'personalInfo'
         },{
             label: 'Age',
             inputType: 'number',
             nextConfig: 4,
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Enter Age...',
             inputName : 'dob',
             inputGroup : 'personalInfo'
         },{
             label: 'Height (cm)',
             inputType: 'number',
             nextConfig: 5,
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Enter Height',
             inputName : 'height',
             inputGroup : 'personalInfo'
         },{
             label: 'Weight (kg)',
             inputType: 'number',
             nextConfig: 6,
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Enter weight...',
             inputName : 'weight',
             inputGroup : 'personalInfo'
         },
         {
             label: 'Gender',
             inputType: 'radio',
             showImage: true,
             imageConfig: ["icons/male.svg", "icons/female.svg"],
             radioConfig: ['male', 'female'],
             nextConfig: function (value) {
                 if (value['gender'] == 'male') return 7;
                 else return 8;
             },
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Enter weight',
             inputName : 'gender',
             inputGroup : 'personalInfo'
         },{
             label: 'Any Allergies',
             inputType: 'select',
             selectConfig: ['nuts', 'peanuts', 'soy', 'dairy', 'fish', 'shelfish', 'eggs'],
             nextConfig: 9,
             showImage: true,
             imageConfig: ["icons/nuts.svg", "icons/peanut.svg", "icons/soybean.svg", "icons/dairy.svg", "icons/fish.svg", "icons/shellfish.svg", "icons/eggs.svg"],
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Enter weight',
             inputName : 'allergies',
             inputGroup : 'lifestyle'
         },{
             label: 'Are you',
             inputType: 'radio',
             radioConfig: ['pregnant', 'planning', 'breastfeeding','none'],
             nextConfig: 7,
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Enter current status',
             inputName : 'current_status',
             inputGroup : 'personalInfo'
         },{
             label: 'Any special diet',
             inputType: 'select',
             selectConfig: ['vegan', 'vegetarian', 'glutenFree'],
             nextConfig: function (value) {
                 if (value['specialDiets'] && value['specialDiets'].indexOf('vegan') > -1 ) {
                     if(value['allergies'].indexOf('dairy') > -1) {
                        var height = value['height'];
                        var weight = value['weight'];
                        var bmi = weight / (height*height);
                        if (value['gender'].indexOf('male') > -1 && bmi > 25) return 14
                        if (value['gender'].indexOf('female') > -1 && bmi > 18.5) return 14
                        return 13;
                     }
                     else return 12;
                 }
                 else if (value['allergies'].indexOf('Fish') > -1 ){
                     if(value['specialDiets'] && value['SpecialDiets'].indexOf('vegetarian') > -1 ) {
                         if(value['allergies'].indexOf('dairy') > -1) {
                            var height = value['height'];
                            var weight = value['weight'];
                            var bmi = weight / (height*height);
                            if (value['gender'].indexOf('male') > -1 && bmi > 25) return 14
                            if (value['gender'].indexOf('female') > -1 && bmi > 18.5) return 14
                            return 13
                         }
                         else return 12;
                     }
                     else return 11;
                 }
                 else return 10;
             },
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Enter any special diet',
             inputName : 'specialDiets',
             inputGroup : 'lifestyle'
         },{
             label: 'Avg Fish per week',
             inputType: 'radio',
             radioConfig: ['rarely', '1-2', '3+'],
             nextConfig: function (value) {
                 if(value['specialDiets'].indexOf('vegetarian') > -1 ) {
                     if(value['allergies'].indexOf('dairy') > -1) {
                        var height = value['height'];
                        var weight = value['weight'];
                        var bmi = weight / (height*height);
                        if (value['gender'].indexOf('male') > -1 && bmi > 25) return 14
                        if (value['gender'].indexOf('female') > -1 && bmi > 18.5) return 14
                        return 13
                     }
                     else return 12;
                 }
                 else return 11
             },
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Enter avg fish per week',
             inputName : 'fishPerWeek',
             inputGroup : 'lifestyle'
         },{
             label: 'Avg Meat per week',
             inputType: 'radio',
             radioConfig: ['rarely', '1-2', '3+'],
             nextConfig: function (value) {
                 if(value['allergies'].indexOf('dairy') > -1) {
                    var height = value['height'];
                    var weight = value['weight'];
                    var bmi = weight / (height*height);
                    if (value['gender'].indexOf('male') > -1 && bmi > 25) return 14
                    if (value['gender'].indexOf('female') > -1 && bmi > 18.5) return 14
                    return 13;
                 }
                 else return 12;
             },
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Enter avg meat per week',
             inputName : 'meatPerWeek',
             inputGroup : 'lifestyle'
         },{
             label: 'Avg dairy per week',
             inputType: 'radio',
             radioConfig: ['rarely', '1-2', '3+'],
             nextConfig: function(value) {
                 var height = value['height'];
                 var weight = value['weight'];
                 var bmi = weight / (height*height);
                 if (value['gender'].indexOf('male') > -1 && bmi > 25) return 14
                 if (value['gender'].indexOf('female') > -1 && bmi > 18.5) return 14
                 return 13
             },
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Enter avg dairy per week',
             inputName : 'dairyPerWeek',
             inputGroup : 'lifestyle'
         },{
             label: 'Are you looking for loose weight?',
             inputType: 'radio',
             radioConfig: ['yes', 'no'],
             nextConfig: 14,
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Enter avg dairy per week',
             inputName : 'weightLoss',
             inputGroup : 'lifestyle'
         },{
             label: 'Avg exercise per week',
             inputType: 'radio',
             radioConfig: ['rarely', '1-2', '3+'],
             nextConfig: 15,
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Enter avg exercise per week',
             inputName : 'exercisePerWeek',
             inputGroup : 'lifestyle'
         },{
             label: 'Avg drink per week',
             inputType: 'radio',
             radioConfig: ['rarely', '0-5 unit', '6-10 unit', '10+ unit'],
             nextConfig: 16,
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Enter avg exercise per week',
             inputName : 'drinkPerWeek',    
             inputGroup : 'lifestyle'
         },{
             label: 'Do you smoke?',
             inputType: 'radio',
             radioConfig: ['yes', 'no'],
             nextConfig: 17,
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Do you smoke?',
             inputName : 'smoke',
             inputGroup : 'lifestyle'
         },{
             label: 'Do you spend more than 3 hrs on computer screen?',
             inputType: 'radio',
             radioConfig: ['yes', 'no'],
             nextConfig: function (value) {
                 if(value['computerScreen'] && value['computerScreen'].indexOf('yes') > -1) return 18;
                 if(value['current_status'] && value['current_status'] !== 'none') return 'submit';
                 return 19
            },
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Do you spend more than 3 hrs on computer screen?',
             inputName : 'computerScreen',
             inputGroup : 'lifestyle'
         },{
             label: 'Eyes fell dry, red or inflamed ?',
             inputType: 'radio',
             radioConfig: ['rarely', 'sometimes','often'],
             nextConfig: function(value){
                if(value['current_status'] && value['current_status'] !== 'none') return 'submit';
                else return 19;
             },
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Eyes fell dry, red or inflamed ?',
             inputName : 'dryEyes',
             inputGroup : 'lifestyle'
         },{
             label: 'Do you have any specific Goals',
             inputType: 'select',
             selectConfig: ['energy', 'brain','heart','immunity','stress','bone','digestion','skin'],
             showImage: true,
             imageConfig: ["icons/energy.svg", "icons/brain.svg", "icons/heart.svg", "icons/immunity.svg", "icons/stress.svg", "icons/bone.svg", "icons/stomach.svg", "icons/skin.svg"],
             nextConfig: 20,
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Do you have any specific Goals',
             inputName : 'goals',
             inputGroup : null
         },
        //  20
         {
             label: 'Please select your Primary Goal',
             inputType: 'radio',
             radioConfig: function () {
                 return finalOutput['goals']
             },
             nextConfig: function (value) {
                 if(value['goals'].indexOf('energy') > -1 ) return 21
                 if(value['goals'].indexOf('brain') > -1 ) return 23
                 if(value['goals'].indexOf('heart') > -1 ) return 25
                 if(value['goals'].indexOf('immunity') > -1 ) return 27
                 if(value['goals'].indexOf('stress') > -1 ) return 28
                 if(value['goals'].indexOf('bone') > -1 ) return 29
                 if(value['goals'].indexOf('digestion') > -1 ) return 32
                 if(value['goals'].indexOf('skin') > -1 ) return 33
             },
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Please select your Primary Goal',
             inputName : 'primaryGoal',
             inputGroup : null
         },
         //21  energy
         {
             label: 'Any trouble sleeping at night ?',
             inputType: 'radio',
             radioConfig: ['yes','no'],
             nextConfig: 22,
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Any trouble sleeping at night ?',
             inputName : 'sleepingTrouble',
             inputGroup : 'goalEnergy'
         },{
             label: 'Do you feel burned out or fatigued ?',
             inputType: 'radio',
             radioConfig: ['yes','no'],
             nextConfig: function (value) {
                if(value['goals'].indexOf('brain') > -1 ) return 23
                if(value['goals'].indexOf('heart') > -1 ) return 25
                if(value['goals'].indexOf('immunity') > -1 ) return 27
                if(value['goals'].indexOf('stress') > -1 ) return 28
                if(value['goals'].indexOf('bone') > -1 ) return 29
                if(value['goals'].indexOf('digestion') > -1 ) return 32
                if(value['goals'].indexOf('skin') > -1 ) return 33
                 return 'submit'
             },
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Do you feel burned out or fatigued ?',
             inputName : 'burnedOutFeeling',
             inputGroup : 'goalEnergy'
         },
         // 23 brain
         {
             label: 'Do you have trouble',
             inputType: 'select',
             selectConfig: ['multitasking','focusing'],
             nextConfig: 24,
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Do you have trouble',
             inputName : 'troubleMultiTaskingFocusing',
             inputGroup : 'goalBrain'
         },{
             label: 'Concerned about short term memory loss ?',
             inputType: 'radio',
             radioConfig: ['yes','no'],
             nextConfig: function (value) {
                if(value['goals'].indexOf('heart') > -1 ) return 25
                if(value['goals'].indexOf('immunity') > -1 ) return 27
                if(value['goals'].indexOf('stress') > -1 ) return 28
                if(value['goals'].indexOf('bone') > -1 ) return 29
                if(value['goals'].indexOf('digestion') > -1 ) return 32
                if(value['goals'].indexOf('skin') > -1 ) return 33
                 return 'submit'
             },
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Concerned about short term memory loss ?',
             inputName : 'shortTermMemoryLoss',
             inputGroup : 'goalBrain'
         },
         // 25 heart
         {
             label: 'Family History of Heart problems',
             inputType: 'radio',
             radioConfig: ['yes','no'],
             nextConfig: 26,
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Family History of Heart problems',
             inputName : 'familyHistory',
             inputGroup : 'goalHeart'
         },{
             label: 'Any concerns about ',
             inputType: 'select',
             selectConfig: ['highBloodPressure','highCholesterol', 'none'],
             nextConfig: function (value) {
                if(value['goals'].indexOf('immunity') > -1 ) return 27
                if(value['goals'].indexOf('stress') > -1 ) return 28
                if(value['goals'].indexOf('bone') > -1 ) return 29
                if(value['goals'].indexOf('digestion') > -1 ) return 32
                if(value['goals'].indexOf('skin') > -1 ) return 33
                 return 'submit'
             },
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Any concerns about ',
             inputName : 'highBPhighCalestrol',
             inputGroup : 'goalHeart'
         },
         // 27 Immunity
         {
            label: 'How often do you experience colds or flu on average in a year',
            inputType: 'number',
            nextConfig: function (value) {
                if(value['goals'].indexOf('stress') > -1 ) return 28
                if(value['goals'].indexOf('bone') > -1 ) return 29
                if(value['goals'].indexOf('digestion') > -1 ) return 32
                if(value['goals'].indexOf('skin') > -1 ) return 33
                 return 'submit'
            },
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'How often do you experience colds or flu on average in a year',
            inputName : 'illFrequency',
            inputGroup : 'goalImmunity'
        },
        // 28 stress
        {
            label: 'Do you have a stressful <br /> a)Job causing <br />b)Mood Swings <br />c) Burnout and fatigue?',
            inputType: 'radio',
            radioConfig: ['yes','no'],
            nextConfig: function (value) {
                if(value['goals'].indexOf('bone') > -1 ) return 29
                if(value['goals'].indexOf('digestion') > -1 ) return 32
                if(value['goals'].indexOf('skin') > -1 ) return 33
                 return 'submit'
            },
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'Do you have a stressful',
            inputName : 'stressConcerns',
            inputGroup : 'goalStress'
        },
         //29 bones
         {
             label: 'Rheumatoid Arthritis',
             inputType: 'radio',
             radioConfig: ['yes','no'],
             nextConfig: 30,
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Rheumatoid Arthritis',
             inputName : 'arthritis',
             inputGroup : 'goalBones'
         },{
             label: 'Tendonitis',
             inputType: 'radio',
             radioConfig: ['yes','no'],
             nextConfig: 31,
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Tendonitis',
             inputName : 'tendonitis',
             inputGroup : 'goalBones'
         },{
             label: 'Do you suffer from any of the following',
             inputType: 'select',
             selectConfig: ['osteoporosis','osteoarthritis', 'none'],
             nextConfig: function (value) {
                if(value['goals'].indexOf('digestion') > -1 ) return 32
                if(value['goals'].indexOf('skin') > -1 ) return 33
                 return 'submit'
             },
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Do you suffer from any of the following',
             inputName : 'osteoporosisOsteoarthritis',
             inputGroup : 'goalBones'
         },
        // 32 Digestive Health
        {
            label: 'Has any of the following digestive issues been a concern for you?',
            inputType: 'select',
            selectConfig: ['heartburn','indigestion', 'acidReflux', 'none'],
            nextConfig: function (value) {
                if(value['goals'].indexOf('skin') > -1 ) return 33
                return 'submit'
            },
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'Has any of the following digestive issues been a concern for you?',
            inputName : 'digestiveConcerns',
            inputGroup : 'goalDigestive'
        },
         //33 skin
         {
             label: 'Do you have any skin concerns',
             inputType: 'select',
             selectConfig: ['wrinkles','drySkin','generalAging', 'none'],
             nextConfig: 'submit',
             previousConfig: function (){ return userFlow.pop()},
             placeholder: 'Do you have any skin concerns',
             inputName : 'skinConcerns',
             inputGroup : 'goalSkin'
         }
     ];
     makeForm(0);
     function checkIsFunction (functionName, action) {
         if (jQuery.isFunction(functionName)) {
             if (action && action === 'previous') return functionName();
             return functionName(finalOutput);
         } else {
             return functionName;
         }
     }
     window.nextPrev = function (position, action) {
         var functionName;
         var nextPos;
         if (action === 'submit') {
             jQuery.ajax({
                 type: 'POST',
                 url: "http://nzvit.chipserver.ml/api/v2/vitamins",
                 contentType: 'application/json',
                 data: createPayload(finalOutput),
                 success: function(resultData) {
                    Promise.all(resultData.products.map((product) => {
                            return addProduct(product);
                        })
                    ).then(() => {
                        window.location.href = '/cart';
                    });
                }
           });
         }
         if (action === 'previous') {
            jQuery('.form-html').html('');
            jQuery('.form-html .form-content').hide();
            nextPos = checkIsFunction(formConfig[position].previousConfig, 'previous');
            makeForm(nextPos);
         }
         if (action === 'next') {
             if (!validateForm(position)) return false;
             jQuery('.form-html').html('');
             jQuery('.form-html .form-content').hide();
             userFlow.push(position);
             nextPos = checkIsFunction(formConfig[position].nextConfig);
             makeForm(nextPos);
         }
     }
     function makeForm(position) {
         var labelText = formConfig[position].label,
             placeholder = formConfig[position].placeholder,
             nextConfig = checkIsFunction(formConfig[position].nextConfig),
             previousConfig = formConfig[position].previousConfig,
             inputName = formConfig[position].inputName,
             inputGroup = formConfig[position].inputGroup,
             showImage = formConfig[position].showImage? formConfig[position].showImage : false,
             inputType = formConfig[position].inputType,
             radioConfig = formConfig[position].radioConfig ? checkIsFunction(formConfig[position].radioConfig) : null,
             selectConfig = formConfig[position].selectConfig ? checkIsFunction(formConfig[position].selectConfig) : null,
             htmlInput = '',
             inputGroupImgUrl = 'icons/name.svg',
             submitbutton;
             if(inputGroup == 'personalInfo') inputGroupImgUrl = 'icons/name.svg';
             if(inputGroup == 'lifestyle') inputGroupImgUrl = 'icons/lifestyle.svg';
             if(inputGroup == 'goals') inputGroupImgUrl = 'icons/goals.svg';
            var previousButton = previousConfig != null ?
                             `<button type="button" id="prevBtn" class="action-buttons" onclick="nextPrev(${position}, 'previous')">Previous</button>`
                             : '';
            var nextButton = `<button type="button" id="nextBtn" class="action-buttons next-button" onclick="nextPrev(${position}, 'next')">Next</button>`;
            if (nextConfig === 'submit') {
                nextButton = `<button type="button" id="nextBtn" class="action-buttons next-button" onclick="nextPrev(${position}, 'submit')">Submit</button>`;
            }
            if (inputType == 'radio') {
                if(showImage) htmlInput += `<div class='checkbox-image-multiple row'>`;
                radioConfig.map((radioOption, index) => {
                    if (showImage) {
                        htmlInput += `<div class='col-md-3 col-xs-6 item-with-image'><label class="checkbox-container">
                                        <input type="radio" name='${inputName}' value="${radioOption}" ${finalOutput[inputName]? finalOutput[inputName] ===radioOption ? 'checked' : '':''}>
                                        <span class="checkmark" style="background-image:url(${formConfig[position].imageConfig[index]});">
                                        </span>
                                        <br>
                                        <span id="category_title">${toTitleCase(radioOption)}
                                        </span>
                                    </label></div>`;
                    } else {
                        htmlInput += `<label class="checkbox-container">
                                        <input name="${inputName}" type="${inputType}" value="${radioOption}" placeholder="${placeholder}"  ${finalOutput[inputName]? finalOutput[inputName] === radioOption ? 'checked' : '':''}>
                                        <span class="checkmark"></span>${toTitleCase(radioOption)}
                                    </label>`;
                    }
                }).join('');
                if(showImage) htmlInput += `</div>`;
            } else if (inputType == 'select'){
                if (showImage) {
                    htmlInput = `<div class='row checkbox-image-multiple item-with-image'>${selectConfig.map((selectOption, index) => {
                                    return `<div class='col-md-3 col-xs-6'><label class="checkbox-container">
                                        <input type="checkbox" value="${selectOption}" ${finalOutput[inputName]? finalOutput[inputName].indexOf(selectOption)>-1? 'checked' : '':''}>
                                        <span class="checkmark" style="background-image:url(${formConfig[position].imageConfig[index]});">
                                        </span>
                                        <br>
                                        <span id="category_title">${toTitleCase(selectOption)}
                                        </span>
                                    </label></div>`
                                }).join('')}</div>`;
                } else {
                    htmlInput = `${selectConfig.map((selectOption) => {
                                    return `<label class="checkbox-container multiple">
                                                <input type="checkbox" value="${selectOption}" ${finalOutput[inputName]? finalOutput[inputName].indexOf(selectOption)>-1? 'checked' : '':''}>
                                                <span class="checkmark"></span>${toTitleCase(selectOption)}
                                            </label>`
                                }).join('')}`;
                }
            }else {
                htmlInput = `<input name="${inputName}" type="${inputType}" placeholder="${placeholder}"  value="${finalOutput[inputName]? finalOutput[inputName] : ''}">`;
            }
         var dynamicHtml = `<div class="col-md-12 tab no-padding-mobile">
                                    <div class='circlar-image'>
                                        <div style="background-image: url(${inputGroupImgUrl})"></div>
                                    </div>
                                    <div class='col-md-12 form-content no-padding-mobile'>
                                        <h2>${labelText}</h2>
                                        <div class='col-md-12'>${htmlInput}</div>
                                        <div class='error validation-error'>&zwnj;</div>
                                    </div>
                             </div>
                             <div class='col-md-12'>
                                 ${previousButton}
                                 ${nextButton}
                             </div>`;
        jQuery('.form-html').html(dynamicHtml);
        jQuery('.form-html .form-content').hide();
        jQuery('.form-html .form-content').show("slide", { direction: "right" }, 500);
        //  if (inputType == 'select' && showImage) {
        //      jQuery("select").imagepicker();
        //  }
     }
 
     function validateForm(position) {
         var x, y, i, valid = true;
         var msg = 'This Field is required';
         var inputResponse;
         if (formConfig[position].inputType == 'text') {
             inputResponse = jQuery(".form-html").find('input')[0].value;
             valid = inputResponse === '' ? false : true;
         } else if (formConfig[position].inputType == 'email') {
             inputResponse = jQuery(".form-html").find('input')[0].value;
             var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
             valid = inputResponse === '' ? false : regex.test(inputResponse) ? true : false;
         } else if (formConfig[position].inputType == 'password') {
             inputResponse = jQuery(".form-html").find('input')[0].value;
             valid = inputResponse === '' ? false : true;
         } else if (formConfig[position].inputType == 'date') {
             inputResponse = jQuery(".form-html").find('input')[0].value;
             valid = inputResponse === '' ? false : true;
         } else if (formConfig[position].inputType == 'number') {
             inputResponse = jQuery(".form-html").find('input')[0].value;
             valid = inputResponse === '' ? false : true;
         } else if (formConfig[position].inputType == 'radio') {
             inputResponse = jQuery(".form-html").find("input[type='radio']:checked").length>0 ? jQuery(".form-html").find("input[type='radio']:checked")[0].value : '';
             valid = inputResponse ? true : false;
         } else if (formConfig[position].inputType == 'select') {
            inputResponse = [];
            jQuery(".form-html input[type='checkbox']:checked").each(function ()
            {
                inputResponse.push(jQuery(this).val());
            });
            valid = inputResponse === '' ? false : true;
         } else {
             inputResponse = jQuery(".form-html").find('input')[0].value;
             valid = inputResponse === '' ? false : true;
         }
         if(valid) {
             jQuery('.validation-error').html('&zwnj;');
             finalOutput[formConfig[position].inputName] = inputResponse;
             console.log(finalOutput);
         } else {
             jQuery('.validation-error').html(msg);
         }
         return valid;
     }
 
     function fixStepIndicator(n) {
         var i, x = document.getElementsByClassName("step");
         for (i = 0; i < x.length; i++) {
             x[i].className = x[i].className.replace(" active", "");
         }
         x[n].className += " active";
     }
}