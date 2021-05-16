import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CountryDetails.css'

class CountryDetails extends Component {

  render() {
    const { countries ,match: { params: { country } } } = this.props;
    const nameCountry = country;
    const findCountry = countries.find((countrie) => countrie.name === nameCountry );
    const { nativeName, capital, flag, population, region ,subregion, languages, translations: { br } } = findCountry;

    return (
      <section className="country-content">
        <div className='country-card'>
          <div className='first-information'>
            <h2 className='country-title'>{br}</h2>
            <img className='country-flag' src={flag} width="150px" alt={br}/>
            <h4 className='native-name'>{ nativeName }</h4>
          </div>
          <div className='list-container'>
            <ul className='details-content'>
              <li>Região: { region }</li>
              <li>Subregião: { subregion }</li>
              <li>Capital: { capital }</li>
              <li>População: { population }</li>
              <li>Idiomas: {languages.map((language) => <p className='languages' key={language.name}>{language.name}</p> )}</li>
            </ul>
          </div>
        </div>
        <div className='link-container'>
          <Link className='link-home' to="/">Voltar</Link>
        </div>
      </section>
    );
  }
}

export default CountryDetails;
