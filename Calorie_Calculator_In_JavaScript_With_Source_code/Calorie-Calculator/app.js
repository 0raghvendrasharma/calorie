document.getElementById('calorie-form').addEventListener('submit', function (e) {
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateCalories, 2000);
    e.preventDefault();
});

function calculateCalories() {
    const age = parseFloat(document.getElementById('age').value);
    const gender = document.querySelector('input[name="customRadioInline1"]:checked').id;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = parseFloat(document.getElementById('list').value);
    const region = document.getElementById('region').value; // Updated variable name
    const patientCondition = document.getElementById('patient').value;
    const totalCalories = document.getElementById('total-calories');

    if (isNaN(age) || isNaN(weight) || isNaN(height) || age < 15 || age > 80) {
        errorMessage('Please make sure the values you entered are correct');
    } else {
        let bmr;
        switch (region) {
            case 'Africa':
                bmr = (gender === 'male') ? 1.2 : 1.2 * 1.19;
                break;
            case 'Asia':
                bmr = (gender === 'male') ? 1.0 : 1.0 * 1.07;
                break;
            case 'Europe':
                bmr = (gender === 'male') ? 1.2 * 1.19 : 1.2 * 1.07;
                break;
            case 'North America':
                bmr = (gender === 'male') ? 1.2 * 1.20 : 1.2 * 1.20;
                break;
            case 'South America':
                bmr = (gender === 'male') ? 1.2 * 1.07 : 1.2 * 1.07;
                break;
            case 'Australia':
                bmr = (gender === 'male') ? 1.2 * 0.8085 : 1.2 * 0.8973;
                break;
            default:
                errorMessage('Invalid Region Selection');
                return;
        }

        const pal = getPalValue(activity);

        const patientFactor = getPatientFactor(patientCondition);
        const calories = bmr * pal * (66.5 + (13.75 * weight) + (5.003 * height) - (6.755 * age)) * patientFactor;

        totalCalories.value = calories.toFixed(2);
        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    }
}

function getPalValue(activityLevel) {
    switch (activityLevel) {
        case 1:
            return 1.2;
        case 2:
            return 1.375;
        case 3:
            return 1.55;
        case 4:
            return 1.725;
        case 5:
            return 1.9;
        default:
            return 1.2;
    }
}

function getPatientFactor(patientCondition) {
    switch (patientCondition) {
        case 'cancer':
            return 0.928;
        case 'diabetic':
            return 0.7143;
        case 'bp':
            return 0.75;
        case 'heart-disease':
            return 0.7143;
        case 'asthma':
            return 0.75;
        case 'normal':
            return 1;
        default:
            return 1;
    }
}

function errorMessage(error) {
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
    const errorDiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));
    card.insertBefore(errorDiv, heading);
    setTimeout(clearError, 4000);
}

function clearError() {
    document.querySelector('.alert').remove();
}
