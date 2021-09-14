class UserNotFoundException extends Error {
  constructor(id) {
    super(`User with id (${id}) does not exists`);
    this.code = 'USER_NOT_FOUND';

    console.error(this.message);
  }
}

class ValidationException extends Error {
  constructor(message) {
    super(message);
    this.code = 'VALIDATION_EXCEPTION';

    console.error(message);
  }
}

module.exports = {
  UserNotFoundException,
  ValidationException
};
