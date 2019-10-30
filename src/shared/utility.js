export const checkFieldValueValidity = (value, rules) => {
    let isValid = true;
    
    if (!rules) {
        return true;
    }
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.trim().length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.trim().length <= rules.maxLength && isValid;
    }

    if (rules.match) {
        isValid = rules.match.test(value) && isValid;
    }
    return isValid;
};

export const updateObject = (object, newFields) => {
    return {
        ...object,
        ...newFields,
    };
};