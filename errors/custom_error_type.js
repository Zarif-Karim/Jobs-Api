class CustomErrorType extends Error {
    constructor(message){
        super(message);
    }
};

module.exports = CustomErrorType;