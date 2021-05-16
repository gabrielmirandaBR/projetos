import React, { Component } from 'react';
import Countrie from './Countrie';
import Input from './Input';
import './CountriesList.css';

class CountriesList extends Component {

  render() {
    const { countries, value, handleOnchange } = this.props;
    return (
      <section>
          <Input value ={ value } handleOnchange={ handleOnchange }/>
        <div className='list-content'>
          {
            countries
              .map(countrie => 
                <Countrie key={ countrie.name } countrie={ countrie } />)
          }
        </div>
      </section>
    )
  }
}

export default CountriesList;