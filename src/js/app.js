import '../css/style.css';
import './plugins/index.js';
import locations from './store/locations.js';
import formUI from './views/form.js';
import ticketsUI from './views/tickets.js';
import currencyUI from './views/currency.js';

document.addEventListener('DOMContentLoaded', () => {
  initApp();

  const form = formUI.form;


  // Events
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    onFormSubmit();
  })

  // handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiesList);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    console.log(origin, destination, depart_date, return_date);

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency
    })

    ticketsUI.renderTickets(locations.lastSearch);
  }

  

});