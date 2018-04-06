$(document).ready(function() {
    var currentTab = 0;
    var finalOutput = {};
    var userFlow = [];
    var formConfig = [
        {
            label: 'Full Name',
            inputType: 'text',
            nextConfig: 1,
            previousConfig: false,
            placeholder: 'Enter name...',
            inputName : 'name',
            inputGroup : 'personalInfo'
        },{
            label: 'Email',
            inputType: 'email',
            nextConfig: 2,
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'Enter email',
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
            label: 'Date of birth',
            inputType: 'date',
            nextConfig: 4,
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'Enter DOB',
            inputName : 'dob',
            inputGroup : 'personalInfo'
        },{
            label: 'Height in cm',
            inputType: 'number',
            nextConfig: 5,
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'Enter Height',
            inputName : 'height',
            inputGroup : 'personalInfo'
        },{
            label: 'Weight in kg',
            inputType: 'number',
            nextConfig: 6,
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'Enter weight',
            inputName : 'weight',
            inputGroup : 'personalInfo'
        },{
            label: 'Gender',
            inputType: 'radio',
            radioConfig: ['Male', 'Female'],
            nextConfig: function (value) {
                console.log(value);
                console.log(value['gender']);
                if (value['gender'] == 'Male') return 7;
                else return 8;
            },
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'Enter weight',
            inputName : 'gender',
            inputGroup : 'personalInfo'
        },{
            label: 'Any Allergies',
            inputType: 'select',
            selectConfig: ['Nuts', 'Peanuts', 'Soy', 'Dairy', 'Fish', 'Shelfish', 'Eggs'],
            nextConfig: 9,
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'Enter weight',
            inputName : 'allergies',
            inputGroup : 'lifestyle'
        },{
            label: 'Current Status',
            inputType: 'radio',
            radioConfig: ['Pregnant', 'Planning', 'Breastfeeding'],
            nextConfig: 7,
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'Enter current status',
            inputName : 'current_status',
            inputGroup : 'personalInfo'
        },{
            label: 'Any special diet',
            inputType: 'select',
            selectConfig: ['Vegan', 'Vegetarian', 'Gluten Free'],
            nextConfig: function (value) {
                if (value['specialDiets'].indexOf('Vegan') > -1 ) {
                    if(value['allergies'].indexOf('Dairy') > -1) return 13;
                    else return 12;
                }
                else if (value['allergies'].indexOf('fish') > -1 ){
                    if(value['SpecialDiets'].indexOf('Vegetarian') > -1 ) {
                        if(value['allergies'].indexOf('Dairy') > -1) return 13;
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
                if(value['specialDiets'].indexOf('Vegetarian') > -1 ) {
                    if(value['allergies'].indexOf('Dairy') > -1) return 13;
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
                if(value['allergies'].indexOf('Dairy') > -1) return 13;
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
            nextConfig: 13,
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
            inputName : 'dairyPerWeek',
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
                if(value['computerScreen'].indexOf('yes') > -1) return 18;
                else return 19},
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'Do you smoke?',
            inputName : 'computerScreen',
            inputGroup : 'lifestyle'
        },{
            label: 'Eyes fell dry, red or inflamed ?',
            inputType: 'radio',
            radioConfig: ['rarely', 'sometimes','often'],
            nextConfig: 19,
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'Do you smoke?',
            inputName : 'dryEyes',
            inputGroup : 'lifestyle'
        },{
            label: 'Do you have any specific Goals',
            inputType: 'select',
            selectConfig: ['energy', 'brain','Heart','Immunity','stress','bone','digestion','skin'],
            nextConfig: 20,
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'Do you have any specific Goals',
            inputName : 'goals',
            inputGroup : null
        },{
            label: 'Please select your Primary Goal',
            inputType: 'radio',
            radioConfig: function () {
                return finalOutput['goals']
            },
            nextConfig: function (value) {
                if(value['goals'].indexOf('energy') > -1 ) return 21
                if(value['goals'].indexOf('brain') > -1 ) return 23
                if(value['goals'].indexOf('Heart') > -1 ) return 25
                if(value['goals'].indexOf('Immunity') > -1 ) return 30
                if(value['goals'].indexOf('stress') > -1 ) return 32
                if(value['goals'].indexOf('bone') > -1 ) return 27
                if(value['goals'].indexOf('digestion') > -1 ) return 33
                if(value['goals'].indexOf('skin') > -1 ) return 31
            },
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'Please select your Primary Goal',
            inputName : 'primaryGoal',
            inputGroup : null
        },
        // energy
        {
            label: 'Any trouble sleeping at night ?',
            inputType: 'radio',
            radioConfig: ['true','false'],
            nextConfig: 22,
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'Any trouble sleeping at night ?',
            inputName : 'sleepingTrouble',
            inputGroup : 'goalEnergy'
        },{
            label: 'Do you feel burned out or fatigued ?',
            inputType: 'radio',
            radioConfig: ['true','false'],
            nextConfig: function (value) {
                if(value['goals'].indexOf('brain') > -1 ) return 23
                if(value['goals'].indexOf('Heart') > -1 ) return 25
                if(value['goals'].indexOf('Immunity') > -1 ) return 30
                if(value['goals'].indexOf('stress') > -1 ) return 32
                if(value['goals'].indexOf('bone') > -1 ) return 27
                if(value['goals'].indexOf('digestion') > -1 ) return 33
                if(value['goals'].indexOf('skin') > -1 ) return 31
            },
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'Do you feel burned out or fatigued ?',
            inputName : 'burnedOutFeeling',
            inputGroup : 'goalEnergy'
        },
        // brain
        {
            label: 'Do you have trouble',
            inputType: 'select',
            selectConfig: ['multitasking','focusing'],
            nextConfig: 24,
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'Do you have trouble',
            inputName : 'triubleMultiTaskingFocusing',
            inputGroup : 'goalBrain'
        },{
            label: 'Concerned about short term memory loss ?',
            inputType: 'radio',
            radioConfig: ['yes','no'],
            nextConfig: function (value) {
                if(value['goals'].indexOf('Heart') > -1 ) return 25
                if(value['goals'].indexOf('Immunity') > -1 ) return 30
                if(value['goals'].indexOf('stress') > -1 ) return 32
                if(value['goals'].indexOf('bone') > -1 ) return 27
                if(value['goals'].indexOf('digestion') > -1 ) return 33
                if(value['goals'].indexOf('skin') > -1 ) return 31
            },
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'Concerned about short term memory loss ?',
            inputName : 'shortTermMemoryLoss',
            inputGroup : 'goalBrain'
        },
        // heart
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
            selectConfig: ['High Blood Pressure','High cholesterol', 'none'],
            nextConfig: function (value) {
                if(value['goals'].indexOf('Immunity') > -1 ) return 30
                if(value['goals'].indexOf('stress') > -1 ) return 32
                if(value['goals'].indexOf('bone') > -1 ) return 27
                if(value['goals'].indexOf('digestion') > -1 ) return 33
                if(value['goals'].indexOf('skin') > -1 ) return 31
            },
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'Any concerns about ',
            inputName : 'highBPhighCalestrol',
            inputGroup : 'goalHeart'
        },
        // bones
        {
            label: 'Rheumatoid Arthritis',
            inputType: 'radio',
            radioConfig: ['yes','no'],
            nextConfig: 28,
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'Rheumatoid Arthritis',
            inputName : 'arthritis',
            inputGroup : 'goalBones'
        },{
            label: 'Tendonitis',
            inputType: 'radio',
            radioConfig: ['yes','no'],
            nextConfig: 29,
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'Tendonitis',
            inputName : 'tendonitis',
            inputGroup : 'goalBones'
        },{
            label: 'Do you suffer from any of the following',
            inputType: 'select',
            selectConfig: ['Osteoporosis?','Osteoarthritis?', 'none'],
            nextConfig: function (value) {
                if(value['goals'].indexOf('Immunity') > -1 ) return 30
                if(value['goals'].indexOf('stress') > -1 ) return 32
                if(value['goals'].indexOf('digestion') > -1 ) return 33
                if(value['goals'].indexOf('skin') > -1 ) return 31
            },
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'Do you suffer from any of the following',
            inputName : 'osteoporosisOsteoarthritis',
            inputGroup : 'goalBones'
        },
        // Immunity
        {
            label: 'How often do you experience colds or flu on average in a year',
            inputType: 'number',
            nextConfig: function (value) {
                if(value['goals'].indexOf('stress') > -1 ) return 32
                if(value['goals'].indexOf('digestion') > -1 ) return 33
                if(value['goals'].indexOf('skin') > -1 ) return 31
            },
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'How often do you experience colds or flu on average in a year',
            inputName : 'illFrequency',
            inputGroup : 'goalImmunity'
        },
        // skin
        {
            label: 'Do you have any skin concerns',
            inputType: 'select',
            selectConfig: ['Wrinkles','Dry skin','General Aging', 'none'],
            nextConfig: function (value) {
                if(value['goals'].indexOf('stress') > -1 ) return 32
                if(value['goals'].indexOf('digestion') > -1 ) return 33
            },
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'Do you have any skin concerns',
            inputName : 'skinConcerns',
            inputGroup : 'goalSkin'
        },
        // stress
        {
            label: 'Do you have a stressful <br /> a)job causing <br />b)Mood Swings <br />c) burnout and fatigue?',
            inputType: 'radio',
            radioConfig: ['yes','no'],
            nextConfig: function (value) {
                if(value['goals'].indexOf('digestion') > -1 ) return 33
            },
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'Do you have a stressful',
            inputName : 'stressConcerns',
            inputGroup : 'goalStress'
        },
        // Digestive Health
        {
            label: 'Has any of the following digestive issues been a concern for you?',
            inputType: 'select',
            selectConfig: ['Heartburn','Indigestion', 'Acid reflux', 'None'],
            nextConfig: false,
            previousConfig: function (){ return userFlow.pop()},
            placeholder: 'Do you have a stressful',
            inputName : 'Has any of the following digestive issues been a concern for you?',
            inputGroup : 'goalDigestive'
        },
    ];
    makeForm(0);
    window.nextPrev = function (n, action) {
        var configLength = formConfig.length;
        var functionName;
        var nextPos;
        if (action === 'previous') {
            $('.form-html').html('');
            functionName = formConfig[n].previousConfig;
            if ($.isFunction(functionName)) {
                nextPos = functionName(finalOutput);
            } else {
                nextPos = formConfig[n].previousConfig
            }
            makeForm(nextPos);
        }
        if (action === 'next') {
            // validateForm(n);
            if (!validateForm(n)) return false;
            $('.form-html').html('');
            userFlow.push(n);
            functionName = formConfig[n].nextConfig;
            if ($.isFunction(functionName)) {
                nextPos = functionName(finalOutput);
            } else {
                nextPos = formConfig[n].nextConfig
            }
            makeForm(nextPos);
        }
    }
    function makeForm(position) {
        var labelText = formConfig[position].label;
        var placeholder = formConfig[position].placeholder;
        var nextConfig = formConfig[position].nextConfig;
        var previousConfig = formConfig[position].previousConfig;
        var inputName = formConfig[position].inputName;
        var inputType = formConfig[position].inputType;
        var htmlInput = '';
        if (inputType == 'radio') {
            var functionName = formConfig[position].radioConfig;
            var fnData;
            if ($.isFunction(functionName)) {
                fnData = functionName(finalOutput);
            } else {
                fnData = formConfig[position].radioConfig
            }
            fnData.map((radioOption) => {
                htmlInput += `<input name="${inputName}" type="${inputType}" value="${radioOption}" placeholder="${placeholder}" oninput="this.className = ''" ${finalOutput[inputName]? finalOutput[inputName].indexOf(radioOption)>-1? 'checked' : '':''}>${radioOption} <br />`
            });
        } else if (inputType == 'select'){
            htmlInput = `<select name="cars" multiple>
                            ${formConfig[position].selectConfig.map((selectOption) => {
                                return `<option value="${selectOption}" ${finalOutput[inputName]? finalOutput[inputName].indexOf(selectOption)>-1? 'selected' : '':''}>${selectOption}</option>`
                            })}
                        </select>`
        }else {
            htmlInput = `<input name="${inputName}" type="${inputType}" placeholder="${placeholder}" oninput="this.className = ''" value="${finalOutput[inputName]? finalOutput[inputName] : ''}">`;
        }
        var dynamicHtml = `<div class="tab">${labelText}:
                                <p>${htmlInput}</p>
                            </div>
                            <div style="overflow:auto;">
                                <div>
                                <button type="button" id="prevBtn" class="btn btn-primary" onclick="nextPrev(${position}, 'previous')">Previous</button>
                                <button type="button" id="nextBtn" class="btn btn-primary next-button" onclick="nextPrev(${position}, 'next')">Next</button>
                                </div>
                            </div>`;

        $('.form-html').append(dynamicHtml);
    }

    function validateForm(position) {
        var x, y, i, valid = true;
        var msg = 'This Field is required';
        var inputResponse;
        if (formConfig[position].inputType == 'text') {
            inputResponse = $(".form-html").find('input')[0].value;
            valid = inputResponse === '' ? false : true;
        } else if (formConfig[position].inputType == 'email') {
            inputResponse = $(".form-html").find('input')[0].value;
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            valid = inputResponse === '' ? false : regex.test(inputResponse) ? true : false;
        } else if (formConfig[position].inputType == 'password') {
            inputResponse = $(".form-html").find('input')[0].value;
            valid = inputResponse === '' ? false : true;
        } else if (formConfig[position].inputType == 'date') {
            inputResponse = $(".form-html").find('input')[0].value;
            valid = inputResponse === '' ? false : true;
        } else if (formConfig[position].inputType == 'number') {
            inputResponse = $(".form-html").find('input')[0].value;
            valid = inputResponse === '' ? false : true;
        } else if (formConfig[position].inputType == 'radio') {
            inputResponse = $(".form-html").find("input[type='radio']:checked").length>0 ? $(".form-html").find("input[type='radio']:checked")[0].value : '';
            valid = inputResponse ? true : false;
        } else if (formConfig[position].inputType == 'select') {
            inputResponse = $(".form-html").find("select").val();
            valid = inputResponse === '' ? false : true;
        } else {
            inputResponse = $(".form-html").find('input')[0].value;
            valid = inputResponse === '' ? false : true;
        }
        if(valid) {
            $('.validation-error').html('');
            finalOutput[formConfig[position].inputName] = inputResponse;
        } else {
            $('.validation-error').html(msg);
        }
        console.log(finalOutput);
        return valid;
    }

    function fixStepIndicator(n) {
        var i, x = document.getElementsByClassName("step");
        for (i = 0; i < x.length; i++) {
            x[i].className = x[i].className.replace(" active", "");
        }
        x[n].className += " active";
    }

})

   