/*const OptionsProvided = document.querySelectorAll('#options li');
let SelectedOptionValue = -1;

function SelectedOption(GivenOptionValue) {
  if (SelectedOptionValue !== -1) {
    OptionsProvided[SelectedOptionValue].classList.remove('active');
  }
  SelectedOptionValue = GivenOptionValue;
  OptionsProvided[SelectedOptionValue].classList.add('active');
}

function UnselectOption() {
  if (SelectedOptionValue !== -1) {
    OptionsProvided[SelectedOptionValue].classList.remove('active');
    SelectedOptionValue = -1;
  }
}

function showCustomAlert(message) {
  const toastElement = document.getElementById('customAlert');
  toastElement.textContent = message;
  toastElement.classList.add('toast--on');

  setTimeout(function() {
    toastElement.classList.remove('toast--on');
  }, 3000); // Adjust the timeout value (in milliseconds) as needed
}


document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case 'ArrowUp':
      if (SelectedOptionValue === -1) {
        SelectedOption(OptionsProvided.length - 1); // Wrap around to the last option
      } else {
        SelectedOption((SelectedOptionValue - 1 + OptionsProvided.length) % OptionsProvided.length);
      }
      break;
    case 'ArrowDown':
      if (SelectedOptionValue === -1) {
        SelectedOption(0); // Select the first option
      } else {
        SelectedOption((SelectedOptionValue + 1) % OptionsProvided.length); // Wrap around to the first option
      }
      break;
    case 'Enter':
      if (SelectedOptionValue !== -1) {
        // Perform action based on selected option
        const selectedOptionText = OptionsProvided[SelectedOptionValue].textContent;
        //alert(`You selected: ${selectedOptionText}`);
        showCustomAlert(`You selected: ${selectedOptionText}`);
      }
      break;
    case 'Backspace':
      UnselectOption();
      break;
  }
});*/
const OptionsProvided = document.querySelectorAll('#options li');
let SelectedOptionIndex = 0;
let isMatrixSelected = false;

function SelectOption(optionIndex) {
  OptionsProvided.forEach(option => option.classList.remove('active'));
  SelectedOptionIndex = optionIndex;
  OptionsProvided[SelectedOptionIndex].classList.add('active');
}

function UnselectOption() {
  OptionsProvided.forEach(option => option.classList.remove('active'));
  SelectedOptionIndex = -1;
  isMatrixSelected = false;
}

function GoToBlankPage() {
  const mainContent = document.querySelector('.kaios-content');
  mainContent.innerHTML = '<div class="blank-page">HELLO</div>';
}

function GoBackToOriginalState() {
  const mainContent = document.querySelector('.kaios-content');
  mainContent.innerHTML = '<ui id="options">' +
    '<li class="active">Matrix</li>' +
    '<li>Blue</li>' +
    '<li>Red</li>' +
    '</ui>';

  SelectedOptionIndex = 0;
  SelectOption(SelectedOptionIndex);
  isMatrixSelected = false;
}

function handleNavigation(event) {
  switch (event.key) {
    case 'ArrowUp':
      if (SelectedOptionIndex === -1) {
        SelectOption(OptionsProvided.length - 1); // Wrap around to the last option
      } else {
        SelectOption((SelectedOptionIndex - 1 + OptionsProvided.length) % OptionsProvided.length);
      }
      break;
    case 'ArrowDown':
      SelectOption((SelectedOptionIndex + 1) % OptionsProvided.length);
      break;
    case 'Enter':
      if (SelectedOptionIndex !== -1) {
        if (SelectedOptionIndex === 0) {
          isMatrixSelected = true;
          GoToBlankPage();
        } else {
          const selectedOptionText = OptionsProvided[SelectedOptionIndex].textContent;
          alert(`You selected: ${selectedOptionText}`);
        }
      }
      break;
    case 'Backspace':
      if (isMatrixSelected) {
        GoBackToOriginalState();
      } else {
        UnselectOption();
      }
      break;
  }
}

document.addEventListener('keydown', handleNavigation);

SelectOption(SelectedOptionIndex); // Select the initial option