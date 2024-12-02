(function () {
    const Result = {
        showAnswersElement: null,
        storedResult: null,
        init () {
            const storedResultRaw = sessionStorage.getItem('storedResult');
            if (storedResultRaw) {
                this.storedResult = JSON.parse(storedResultRaw);
                const score = this.storedResult.score;
                const total = this.storedResult.total;
                document.getElementById('result-score').innerText = `${score}/${total}`;

                this.showAnswersElement = document.getElementById('right-answers')
                const that = this
                this.showAnswersElement.addEventListener('click', function () {
                    that.showAnswers()
                });
            } else {
                location.href = 'index.html';
            }

        },
        showAnswers () {
            let rightAnswers = []

            // getting right answers
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://testologia.ru/get-quiz-right?id='  + this.storedResult.testId, false);
            xhr.send();

            if (xhr.status === 200 && xhr.responseText) {
                try {
                    rightAnswers = JSON.parse(xhr.responseText);
                } catch (e) {
                    location.href = 'index.html';
                }
            } else {
                location.href = 'index.html';
            }

            const that = this
            // add attribute to chosen answer in question: 'success' if answer right, else 'wrong'
            if (rightAnswers.length > 0) {
                this.storedResult.results.forEach(function (answer, index) {
                    if (answer.chosenAnswerId && rightAnswers[index] === answer.chosenAnswerId) {
                        that.storedResult.quiz.questions[index].answers.find(item => item.id === answer.chosenAnswerId)
                            .result = 'success'
                    } else if (answer.chosenAnswerId && rightAnswers[index] !== answer.chosenAnswerId) {
                        that.storedResult.quiz.questions[index].answers.find(item => item.id === answer.chosenAnswerId)
                            .result = 'wrong'
                    }
                })
                console.log(rightAnswers);
            }

            // save data to session storage
            sessionStorage.setItem('storedResult', JSON.stringify(this.storedResult));

            location.href = 'answers.html';
        },
    }

    Result.init()
})();
