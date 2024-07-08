$(document).ready(function () {
	$('#day').focus();
	// get current date
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	let currentMonth = currentDate.getMonth() + 1;
	if (currentMonth < 10) {
		currentMonth = `0${currentMonth}`;
	}

	let currentDay = currentDate.getDate();
	if (currentDay < 10) {
		currentDay = `0${currentDay}`;
	}
	// ---------------------------------------------------
	// ------------------------------------------------------
	function checkInputValue(event1, num) {
		const currentElement = event1.target;
		// console.log($(currentElement).next());
		if (currentElement.value > num) {
			$(currentElement).val('');
			$(currentElement).addClass('red_border').removeClass('green_border');
			$(currentElement).next().html(`Must be < ${num}`);
			$(currentElement).next().removeClass('hide_err').addClass('show_err');
		} else {
			$(currentElement).removeClass('red_border').addClass('green_border');
			$(currentElement).next().html('');
			$(currentElement).next().addClass('hide_err').removeClass('show_err');
		}
	}
	(function checkInputGreen() {
		let isGreen = false;
        let allInputsObject = $('.common_input');
        let allInputsArr = [...allInputsObject]
        console.log(allInputsArr);
		setInterval(() => {
			allInputsArr.every((input) => {
				if (input.classList.contains('green_border')) {
					isGreen = true;
				} else {
					isGreen = false;
				}
			});
			if (isGreen) {
				$('.calculate_btn').removeClass('disabled');
			} else {
				$('.calculate_btn').addClass('disabled');
			}
		}, 1000);
	})();
	function getAge() {
		let inputYear = $('#year').val();
		let inputMonth = $('#month').val();
		let inputDay = $('#day').val();
		let inputDate = new Date(inputYear, inputMonth - 1, inputDay);
		let dateDiffInMilliSecs = currentDate - inputDate;

		// years---------------------
		let dateDiffInYears = Math.floor(
			dateDiffInMilliSecs / (1000 * 60 * 60 * 24 * 365.25)
		);
		$('.years').html(dateDiffInYears);

		// months-------------------
		let remainingSecondsForMonths =
			dateDiffInMilliSecs % (1000 * 60 * 60 * 24 * 365.25);
		let dateDiffInMonths = Math.floor(
			remainingSecondsForMonths / (1000 * 60 * 60 * 24 * 30.4375)
		);
		$('.months').html(dateDiffInMonths);

		// days-------------------
		let remainingSecondsForDays =
			remainingSecondsForMonths % (1000 * 60 * 60 * 24 * 30.4375);
		let dateDiffInDays = Math.floor(
			remainingSecondsForDays / (1000 * 60 * 60 * 24)
		);
		$('.days').html(dateDiffInDays);
	}
	function changeAppHead() {
		let userAge = +$('.years').text();
		// console.log(userAge);
		if (userAge < 30) {
			$('.app_head').html(
				`You're just ${userAge}, <span class="age_cate_one">do what you love!</span>`
			);
		} else {
			$('.app_head').html(
				`You're ${userAge}, <span class="age_cate_one">spend time with your family!</span>`
			);
		}
	}
	function resetApp() {
		$('.days, .months, .years').html('--');
		$('.calculate_btn').addClass('disabled');
		$('#day, #month, #year').removeClass('green_border');
		$('#day, #month, #year').val('');
		$('#day').focus();
	}

	$('#day').on('keyup', function (event1) {
		checkInputValue(event1, 32);
	});
	$('#month').on('keyup', function (event1) {
		checkInputValue(event1, 13);
	});
	$('#year').on('keyup', function (event1) {
		checkInputValue(event1, currentYear);
	});
	$('.calculate_btn').on('click', function () {
		getAge();
		changeAppHead();
	});
	$('.reset_app_btn').on('click', resetApp);
});
