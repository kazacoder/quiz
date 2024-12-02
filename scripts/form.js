(function ($) {
    const Form = {
        agreeElement: null,
        processElement: null,
        fields: [
            {
                name: "name",
                id: "name",
                element: null,
                regex: /^[А-Я][а-яё]+\s*$/,
                valid: false,
            },
            {
                name: "lastName",
                id: "last-name",
                element: null,
                regex: /^[А-Я][а-яё]+\s*$/,
                valid: false,
            },
            {
                name: "email",
                id: "email",
                element: null,
                regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                valid: false,
            },
        ],
        init() {
            const that = this;
            this.fields.forEach((item) => {
                item.element = document.getElementById(item.id);
                item.element.addEventListener("change", function () {
                    that.validateField.call(that, item, this);
                })
            });

            this.processElement = document.getElementById('process');
            this.processElement.addEventListener('click', function () {
                that.processForm()
            });

            this.agreeElement = document.getElementById('agree');
            this.agreeElement.addEventListener('change', function () {
                that.validateForm()
            })
        },
        validateField (field, element) {
            if (!element.value || !element.value.match(field.regex)) {
                element.parentNode.style.borderColor = 'red';
                field.valid = false;
            } else {
                element.parentNode.removeAttribute("style");
                field.valid = true;
            }
            this.validateForm();

        },
        validateForm () {
            const validForm = this.fields.every((item) => item.valid);
            const isValid = this.agreeElement.checked && validForm;
            if (isValid) {
                this.processElement.removeAttribute('disabled');
            } else {
                this.processElement.setAttribute('disabled', 'disabled');
            }
            return isValid

        },
        processForm() {
            if (this.validateForm()) {
                const storedUser = {}

                this.fields.forEach((item) => {
                    storedUser[item.name] = item.element.value
                })
                sessionStorage.setItem('storedResult', JSON.stringify(storedUser));
                location.href = 'choice.html';
            }
        }
    };

    Form.init();
})();