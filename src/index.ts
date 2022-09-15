import isEmail from 'validator/lib/isEmail';
const show_error = 'show-error-message';

const form = document.querySelector('.form') as HTMLFormElement;
const username = document.querySelector('.username') as HTMLInputElement;
const email = document.querySelector('.email') as HTMLInputElement;
const pass = document.querySelector('.password') as HTMLInputElement;
const pass2 = document.querySelector('.password2') as HTMLInputElement;

form.addEventListener('submit', function (event: Event) {
    event.preventDefault();
    hideErrorMessages(this);
    checkForEmptyFields(username, email, pass, pass2);
    checkUser(username);
    checkEmail(email);
    checkPass(pass, pass2);
    if (shouldSendForm(this)) console.log('form sended');
});

function checkForEmptyFields(...inputs: HTMLInputElement[]): void {
    inputs.forEach((input) => {
        if (!input.value) showErrorMessage(input, 'this field cannot be empty');
    });
}

function checkEmail(input: HTMLInputElement): void {
    if (!isEmail(input.value)) showErrorMessage(input, 'invalid email');
}

function checkPass(pass: HTMLInputElement, pass2: HTMLInputElement): void {
    if (pass.value !== pass2.value) {
        showErrorMessage(pass2, 'the passwords do not match');
    }
    if (pass.value.length < 6) {
        showErrorMessage(pass, 'the password must have 6 caracteres');
    }
}

function checkUser(user: HTMLInputElement): void {
    if (user.value.length < 3) {
        showErrorMessage(user, 'the username must have more than 3 caracters');
    }
    if (user.value.length > 16) {
        showErrorMessage(
            user,
            'the username cannot be longer than 16 characters',
        );
    }
}

function showErrorMessage(input: HTMLInputElement, msg: string): void {
    const formFields = input.parentElement as HTMLDivElement;
    const errorMessage = formFields.querySelector(
        '.error-message',
    ) as HTMLSpanElement;
    errorMessage.innerText = msg;
    formFields.classList.add(show_error);
}

function hideErrorMessages(form: HTMLElement): void {
    form.querySelectorAll('.' + show_error).forEach((item) =>
        item.classList.remove(show_error),
    );
}

function shouldSendForm(form: HTMLFormElement): boolean {
    let send = true;
    form.querySelectorAll('.' + show_error).forEach(() => (send = false));
    return send;
}
